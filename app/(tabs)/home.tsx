import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import OrderCard from '@/components/orders/OrderCard';
import { useUser } from '@/app/context/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import config from '@/app/config';
import { useOrder } from '@/app/context/OrderContext';
import { calculateDistanceAndDuration } from '@/components/orders/DistanceCalculator';
import { debounce } from 'lodash';

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
    costDetails: any[];
    isActive: boolean;
    distanceArrival?: string;
    durationArrival?: string;
}

export default function OrderScreen() {
    const apiUrl = config.apiBaseUrl;
    const { user } = useUser(); // Obtenemos el usuario logueado del contexto
    const { orders, setOrders } = useOrder(); // Estado para almacenar las órdenes
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores
    const fetchOrders = debounce(async () => {
        if (!user) {
            console.log('No user');
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${apiUrl}/orders-service/orders`);
            const data = await response.json();
            const userOrders1 = data.orders.data.filter((order: Order) => order.orderStatus != 'Completed');
            const userOrders2 = userOrders1.filter((order: Order) => order.orderStatus != 'Canceled');
            const userOrders = userOrders2.filter((order: Order) => order.driverId === user.id);
            setOrders(userOrders);
            // Calcular distancia y duración para cada orden
            //const updatedOrders = await Promise.all(
            //    userOrders.map(async (order: Order) => {
            //        const originCoords = [
            //            parseFloat(order.incidentAddress.coordinates.longitude),
            //            parseFloat(order.incidentAddress.coordinates.latitude),
            //        ];
            //        const destinationCoords = [
            //            parseFloat(order.destinationAddress.coordinates.longitude),
            //            parseFloat(order.destinationAddress.coordinates.latitude),
            //        ];
            //        console.log(originCoords, destinationCoords);
            //        const { distance, duration } = await calculateDistanceAndDuration(originCoords, destinationCoords);
            //        console.log(distance, duration);
            //        return {
            //            ...order,
            //            distanceArrival: distance ?? 'N/A',
            //            durationArrival: duration ?? 'N/A',
            //        };
            //    })
            //);
        } catch (err) {
            console.error('Error fetching orders home:', err);
            setError('Error fetching orders');
        } finally {
            setLoading(false);
        }
    }, 350);

    useFocusEffect(
        useCallback(() => {
            fetchOrders();
            return () => fetchOrders.cancel();
        }, [])
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
                        carModel={order.client.clientVehicle.brand + ' ' + order.client.clientVehicle.model}
            origin={`${order.incidentAddress.addressLine1}, ${order.incidentAddress.city}`}
            destination={`${order.destinationAddress.addressLine1}, ${order.destinationAddress.city}`}
            distance_arrival="N/A"
            duration_arrival="N/A"
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