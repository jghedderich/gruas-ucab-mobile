import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import MapComponent from '@/components/orders/MapComponent';
import { useOrder } from '@/app/context/OrderContext';
import { useUser, User} from '@/app/context/UserContext';
import config from '@/app/config';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

// Define los parámetros esperados en la ruta
type ServiceRequestDetailRouteParams = {
  orderId: string; // Esto asume que `orderId` es un string, ajusta el tipo si es necesario
};

const updateOrderStatus = async (orderId: string, orderStatus: string, user: User) => {
    const apiUrl = config.apiBaseUrl; // Asegúrate de que config esté importado
  const requestBody = {
    order: {
      id: orderId,
      status: orderStatus,
    },
  };

  try {
    const response = await fetch(`${apiUrl}/providers-service/drivers/order`, {
      method: 'PUT',
      headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
export default function ServiceRequestDetail() {
  const router = useRouter();
  const navigation = useNavigation();
  const { user } = useUser();
  const { getOrderById, selectedOrderId } = useOrder();

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Usuario no encontrado.</Text>
      </SafeAreaView>
    );
  }

  const order = selectedOrderId ? getOrderById(selectedOrderId) : undefined;
  if (!order || order.driverId !== user.id) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          onBack={() => navigation.goBack()}
          title="Detalles de Solicitud"
        />
        <Text>No se encontró la orden para este usuario.</Text>
      </SafeAreaView>
    );
  }

  const handleRejectOrder = async () => {
    try {
      const respuesta = await updateOrderStatus(order.id, 'Canceled', user);
      if (respuesta) {
        console.log('Orden rechazada', order.id);
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };

  const handleAcceptOrder = async () => {
    try {
      const respuesta = await updateOrderStatus(order.id, 'Accepted', user);
      if (respuesta) {
        console.log('Orden aceptada', order.id);
        router.push('/orders/accepted');
      }
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onBack={() => navigation.goBack()}
        title="Detalles de Solicitud"
      />

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.name}>
            {order.client.name.firstName + ' ' + order.client.name.lastName}
          </Text>
          <View style={styles.carInfo}>
            <Ionicons name="car-outline" size={16} color="#666" />
            <Text style={styles.carModel}>
              {order.client.clientVehicle.brand +
                ' ' +
                order.client.clientVehicle.model}{' '}
              del {order.client.clientVehicle.year}
            </Text>
          </View>

          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>LUGAR DEL INCIDENTE</Text>
            <Text style={styles.locationName}>
              {order.incidentAddress.addressLine1 +
                ', ' +
                order.incidentAddress.addressLine2}
            </Text>
          </View>
          <MapComponent
            latitude={Number(order.incidentAddress.coordinates.latitude)}
            longitude={Number(order.incidentAddress.coordinates.longitude)}
          />
          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>DESTINO</Text>
            <Text style={styles.locationName}>
              {order.destinationAddress.addressLine1 +
                ', ' +
                order.destinationAddress.addressLine2}
            </Text>
          </View>
          <MapComponent
            latitude={Number(order.destinationAddress.coordinates.latitude)}
            longitude={Number(order.destinationAddress.coordinates.longitude)}
          />
        </View>
      </ScrollView>

      <Footer style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={[styles.acceptButton, { backgroundColor: '#FF3B30' }]}
          onPress={handleRejectOrder}
        >
          <Text style={styles.buttonText}>Rechazar Orden</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={handleAcceptOrder}
        >
          <Text style={styles.buttonText}>Aceptar Orden</Text>
        </TouchableOpacity>
      </Footer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  carInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  carModel: {
    marginLeft: 4,
    color: 'gray',
  },
  issue: {
    marginBottom: 16,
  },
  locationInfo: {
    marginBottom: 16,
  },
  locationTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'gray',
    marginBottom: 4,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
