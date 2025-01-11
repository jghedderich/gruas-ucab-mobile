import { StyleSheet, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { useUser } from '@/app/context/UserContext';
import CompletedOrderCard from '@/components/orders/CompletedOrderCard';
import { debounce } from 'lodash';
import config from '@/app/config';
import { useOrder } from '@/app/context/OrderContext';
import { useFocusEffect } from '@react-navigation/native';
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
  distanceArrival?: string;
  durationArrival?: string;
}

export default function OrderScreen() {
  const apiUrl = config.apiBaseUrl;
  const { user } = useUser();
  const { orders, setOrders } = useOrder();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrdersCompleted = debounce(async () => {
    if (!user) {
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
        (order: Order) => order.orderStatus === 'Completed'
      );
      const userOrders = userOrders1.filter(
        (order: Order) => order.driverId === user.id
      );
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

  return (
    <ScrollView style={styles.mainContainer}>
      <ThemedText type="title" style={styles.title}>
        Órdenes completadas
      </ThemedText>
      <ThemedText type="default" style={styles.description}>
        Revisa todas las órdenes que te has realizado.
      </ThemedText>

      {orders.length > 0 ? (
        orders.map((order) => (
          <CompletedOrderCard
            key={order.id}
            orderId={order.id}
            driverName={
              order.client.name.firstName + ' ' + order.client.name.lastName
            }
            carModel={
              order.client.clientVehicle.brand +
              ' ' +
              order.client.clientVehicle.model
            }
            origin={
              order.incidentAddress.addressLine1 +
              ', ' +
              order.incidentAddress.addressLine2
            }
            destination={
              order.destinationAddress.addressLine1 +
              ', ' +
              order.destinationAddress.addressLine2
            }
            distance_arrival={'N/A'}
            duration_arrival={'N/A'}
            distance_back={'N/A'}
            duration_back={'N/A'}
            userId={user.id}
          />
        ))
      ) : (
        <Empty
          title="No has realizado órdenes"
          description="Las órdenes que completes aparecerán aquí."
        />
      )}
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
