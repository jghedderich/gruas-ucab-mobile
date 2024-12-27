import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import OrderCard from '@/components/orders/OrderCard';
import { useUser } from '@/app/context/UserContext'; // Importamos el contexto de usuario
import { useFocusEffect } from '@react-navigation/native';

interface Coordinates {
    latitude: string;
    longitude: string;
}

interface Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zip: string;
    coordinates: Coordinates;
}

interface ClientVehicle {
    brand: string;
    model: string;
    year: number;
    type: string;
}

interface Client {
    name: {
        firstName: string;
        lastName: string;
    };
    dni: {
        type: string;
        number: string;
    };
    phone: string;
    email: string;
    clientVehicle: ClientVehicle;
}

interface Order {
    id: string;
    operatorId: string;
    policyId: string;
    driverId: string;
    client: Client;
    orderStatus: string;
    incidentAddress: Address;
    destinationAddress: Address;
    costDetails: any[]; // Puedes definir una interfaz específica si conoces la estructura de costDetails
    isActive: boolean;
}

export default function OrderScreen() {
    const { user } = useUser(); // Obtenemos el usuario logueado del contexto
    const [orders, setOrders] = useState<Order[]>([]); // Estado para almacenar las órdenes
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores

    const fetchOrders = async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://192.168.18.211:6004/orders-service/orders'); // Cambia <TU_BACKEND_URL> por tu URL
            const data = await response.json();

            // Filtrar las órdenes por driverId
            const userOrders = data.orders.data.filter((order: Order) => order.driverId === user.id);
            setOrders(userOrders);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Error fetching orders');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchOrders();
        }, [user])
    );

    // Mostrar mensaje si no hay usuario logueado
    if (!user) {
        return (
            <ScrollView style={styles.mainContainer}>
                <ThemedText type="title" style={styles.title}>
                    No estás autenticado
                </ThemedText>
                <ThemedText type="default" style={styles.description}>
                    Por favor, inicia sesión para ver tus órdenes.
                </ThemedText>
            </ScrollView>
        );
    }

    // Mostrar spinner mientras se cargan las órdenes
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <ThemedText type="default">Cargando órdenes...</ThemedText>
            </View>
        );
    }

    // Mostrar mensaje de error si ocurre un problema
    if (error) {
        return (
            <ScrollView style={styles.mainContainer}>
                <ThemedText type="title" style={styles.title}>
                    Error
                </ThemedText>
                <ThemedText type="default" style={styles.description}>
                    {error}
                </ThemedText>
            </ScrollView>
        );
    }

    // Mostrar las órdenes filtradas
    return (
        <ScrollView style={styles.mainContainer}>
            <ThemedText type="title" style={styles.title}>
                Lista de órdenes
            </ThemedText>
            <ThemedText type="default" style={styles.description}>
                Revisa todas las órdenes que te han sido asignadas.
            </ThemedText>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <OrderCard
                        key={order.id}
                        orderId={order.id}
                        clientName={`${order.client.name.firstName} ${order.client.name.lastName}`}
                        carModel={order.client.clientVehicle.model}
                        origin={`${order.incidentAddress.addressLine1}, ${order.incidentAddress.city}`}
                        destination={`${order.destinationAddress.addressLine1}, ${order.destinationAddress.city}`}
                        distance_arrival="N/A" // Cambia si tienes este dato
                        duration_arrival="N/A" // Cambia si tienes este dato
                        distance_back="N/A" // Cambia si tienes este dato
                        duration_back="N/A" // Cambia si tienes este dato
                        userId={user.id}
                    />
                ))
            ) : (
                <ThemedText type="default" style={styles.description}>
                    No tienes órdenes asignadas.
                </ThemedText>
            )}
            <ThemedText type="default" style={styles.footer}>
                Creado y diseñado por el Equipo Nro. 9
            </ThemedText>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 24,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: 54,
    },
    description: {
        color: 'gray',
        marginBottom: 16,
    },
    footer: {
        color: 'gray',
        paddingTop: 46,
        paddingBottom: 36,
        textAlign: 'center',
        fontSize: 12,
    },
});