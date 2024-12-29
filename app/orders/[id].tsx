import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import MapComponent from '@/components/orders/MapComponent';
import { useOrder } from '@/app/context/OrderContext';  
import { useUser } from '@/app/context/UserContext';  
import config from '@/app/config';

// Define los parámetros esperados en la ruta
type ServiceRequestDetailRouteParams = {
  orderId: string; // Esto asume que `orderId` es un string, ajusta el tipo si es necesario
};

const updateOrderStatus = async (orderId: string, orderStatus: string) => {
    const apiUrl = config.apiBaseUrl; // Asegúrate de que config esté importado
    const requestBody = {
        order: {
            id: orderId,
            orderStatus: orderStatus
        }
    };

    try {
        const response = await fetch(`${apiUrl}/orders-service/orders/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Failed to update order status');
        }

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
    const { orders, getOrderById, selectedOrderId, fetchOrders } = useOrder();
    useEffect(() => {
        fetchOrders();
    }, []);
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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Detalles de Solicitud</Text>
        </View>
        <Text>No se encontró la orden para este usuario.</Text>
      </SafeAreaView>
    );
    }

    // Función para manejar el rechazo de la orden
    const handleRejectOrder = async () => {
        try {
            await updateOrderStatus(order.id, 'Canceled');
            console.log('Orden rechazada', order.id);
            navigation.goBack(); // Vuelve a la pantalla anterior
        } catch (error) {
            console.error('Error rejecting order:', error);
        }
    };

    // Función para manejar la aceptación de la orden
    const handleAcceptOrder = async () => {
        try {
            await updateOrderStatus(order.id, 'Accepted');
            console.log('Orden aceptada', order.id);
            router.push('/orders/accepted');
        } catch (error) {
            console.error('Error accepting order:', error);
        }
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalles de Solicitud</Text>
      </View>

      <ScrollView style={styles.content}>
              <View style={styles.card}>
                  <Text style={styles.name}>{order.client.name.firstName + ' ' + order.client.name.lastName}</Text>
          <View style={styles.carInfo}>
                      <Ionicons name="car-outline" size={16} color="#666" />
                      <Text style={styles.carModel}>{order.client.clientVehicle.brand + ' ' + order.client.clientVehicle.model}</Text>
                  </View>
                  <Text style={styles.issue}>{order.incidentAddress.addressLine1 + ', ' + order.incidentAddress.addressLine2}</Text>

          <View style={styles.locationInfo}>
                      <Text style={styles.locationTitle}>ORIGEN</Text>
                      <Text style={styles.locationName}>{order.incidentAddress.addressLine1 + ', ' + order.incidentAddress.addressLine2}</Text>
            <View style={styles.locationDetails}>
              <Ionicons name="location-outline" size={14} color="#666" />
              <Text style={styles.locationText}>
                {"N/A"} km
              </Text>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.locationText}>
                              {"N/A"}  min
              </Text>
            </View>
          </View>
          <MapComponent
                      latitude={Number(order.incidentAddress.coordinates.latitude)} 
                      longitude={Number(order.incidentAddress.coordinates.longitude)} 
          />
          <View style={styles.locationInfo}>
                      <Text style={styles.locationTitle}>DESTINO</Text>
                      <Text style={styles.locationName}>{order.destinationAddress.addressLine1 + ', ' + order.destinationAddress.addressLine2}</Text>
            <View style={styles.locationDetails}>
              <Ionicons name="location-outline" size={14} color="#666" />
              <Text style={styles.locationText}>
                {"N/A"} km
              </Text>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.locationText}>
                              {"N/A"} min
              </Text>
            </View>
          </View>
                  <MapComponent
                      latitude={Number(order.destinationAddress.coordinates.latitude)}
                      longitude={Number(order.destinationAddress.coordinates.longitude)} 
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
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
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
  locationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    marginRight: 8,
    color: 'gray',
  },
  map: {
    height: 120,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
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
