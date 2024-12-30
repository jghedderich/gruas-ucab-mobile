import { StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { ThemedText } from '@/components/ThemedText';
import OrderCard from '@/components/orders/OrderCard';
import { useUser } from '@/app/context/UserContext'; // Importamos el contexto de usuario
import  { completedOrderss }  from '@/app/data/data'; 
import CompletedOrderCard from '@/components/orders/CompletedOrderCard';
import { debounce } from 'lodash';
import config from '@/app/config';
import { useOrder } from '@/app/context/OrderContext';
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
    costDetails: any[];
    isActive: boolean;
    distanceArrival?: string;
    durationArrival?: string;
}

export default function OrderScreen() {
    const apiUrl = config.apiBaseUrl;
    const { user } = useUser(); // Obtenemos el usuario logueado del contexto
    const { orders, setOrders, fetchOrders } = useOrder(); // Estado para almacenar las órdenes
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  // Si no hay usuario logueado, mostramos un mensaje
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

    const fetchOrdersCompleted = debounce(async () => {
        if (!user) {
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${apiUrl}/orders-service/orders`);
            const data = await response.json();
            const userOrders1 = data.orders.data.filter((order: Order) => order.orderStatus === 'Completed');
            const userOrders = userOrders1.filter((order: Order) => order.driverId === user.id);
            setOrders(userOrders);
        } catch (err) {
            console.error('Error fetching orders home:', err);
            setError('Error fetching orders');
        } finally {
            setLoading(false);
        }
    }, 350);

    useFocusEffect(
        useCallback(() => {
            fetchOrdersCompleted();
            return () => fetchOrdersCompleted.cancel();
        }, [])
    );

  return (
    <ScrollView style={styles.mainContainer}>
      <ThemedText type="title" style={styles.title}>
        Órdenes completadas
      </ThemedText>

          {orders.length > 0 ? (
              orders.map((order) => (
          <CompletedOrderCard
            key={order.id} 
                      orderId={order.id}
                      driverName={order.client.name.firstName + ' ' + order.client.name.lastName}
                      carModel={order.client.clientVehicle.brand + ' ' + order.client.clientVehicle.model}
                      origin={order.incidentAddress.addressLine1 + ', ' + order.incidentAddress.addressLine2}
                      destination={order.destinationAddress.addressLine1 + ', ' + order.destinationAddress.addressLine2}
            distance_arrival={"N/A"}
            duration_arrival={"N/A"}
            distance_back={"N/A"}
            duration_back={"N/A"}
            userId={user.id}
          />
        ))
      ) : (
        <ThemedText type="default" style={styles.description}>
          No has realizado aún ningún servicio.
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
