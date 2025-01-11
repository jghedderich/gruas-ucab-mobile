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
import Empty from '@/components/common/Empty';

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
  distanceBack?: string;
  durationBack?: string;
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
        const response = await fetch(`${apiUrl}/orders-service/orders`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
        });
      const data = await response.json();
      const userOrders1 = data.orders.data.filter(
        (order: Order) => order.orderStatus != 'Completed'
      );
      const userOrders2 = userOrders1.filter(
        (order: Order) => order.orderStatus != 'Canceled'
      );
      const userOrders = userOrders2.filter(
        (order: Order) => order.driverId === user.id
      );
      //setOrders(userOrders);
      // Calcular distancia y duración para cada orden
      const updatedOrders = await Promise.all(
        userOrders.map(async (order: Order) => {
          const originCoords = [
            parseFloat(order.incidentAddress.coordinates.longitude),
            parseFloat(order.incidentAddress.coordinates.latitude),
          ];
          const destinationCoords = [
            parseFloat(order.destinationAddress.coordinates.longitude),
            parseFloat(order.destinationAddress.coordinates.latitude),
          ];
          const { distance, duration } = await calculateDistanceAndDuration(
            originCoords,
            destinationCoords
          );
          order.distanceBack = distance ?? 'N/A';
          order.durationBack = duration ?? 'N/A';
          return {
            ...order,
            distanceBack: distance ?? 'N/A',
            durationBack: duration ?? 'N/A',
          };
        })
      );
      setOrders(updatedOrders);
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
            carModel={
              order.client.clientVehicle.brand +
              ' ' +
              order.client.clientVehicle.model
            }
            origin={`${order.incidentAddress.addressLine1}, ${order.incidentAddress.city}`}
            destination={`${order.destinationAddress.addressLine1}, ${order.destinationAddress.city}`}
            distance_arrival=""
            duration_arrival=""
            distance_back={order.distanceBack} // Cambia si tienes este dato
            duration_back={order.durationBack} // Cambia si tienes este dato
            userId={user.id}
          />
        ))
      ) : (
        <Empty
          title="No tienes órdenes asignadas"
          description="Vuelve mas tarde. En caso de duda, ponte en contacto con el equipo de atención."
        />
      )}
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
