import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import MapComponent from '@/components/orders/MapComponent';
import { useOrder } from '@/app/context/OrderContext';  
import { useUser } from '@/app/context/UserContext';  

// Define los parámetros esperados en la ruta
type ServiceRequestDetailRouteParams = {
  orderId: string; // Esto asume que `orderId` es un string, ajusta el tipo si es necesario
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

  if (!order || order.userId !== user.id) {
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
  const handleRejectOrder = () => {
    console.log('Orden rechazada', order);
    navigation.goBack(); // Vuelve a la pantalla anterior
  };

  // Función para manejar la aceptación de la orden
  const handleAcceptOrder = () => {
    router.push('/orders/accepted');
    console.log('Orden aceptada', order);
    // Aquí puedes implementar la lógica adicional cuando sea necesario
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
          <Text style={styles.name}>{order.driverName}</Text>
          <View style={styles.carInfo}>
            <Ionicons name="car-outline" size={16} color="#666" />
            <Text style={styles.carModel}>{order.carModel}</Text>
          </View>
          <Text style={styles.issue}>{order.origin}</Text>

          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>ORIGEN</Text>
            <Text style={styles.locationName}>{order.origin}</Text>
            <View style={styles.locationDetails}>
              <Ionicons name="location-outline" size={14} color="#666" />
              <Text style={styles.locationText}>
                {order.distance} km
              </Text>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.locationText}>
                {order.duration} min
              </Text>
            </View>
          </View>
          <MapComponent
            latitude={0} 
            longitude={0} 
          />
          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>DESTINO</Text>
            <Text style={styles.locationName}>{order.destination}</Text>
            <View style={styles.locationDetails}>
              <Ionicons name="location-outline" size={14} color="#666" />
              <Text style={styles.locationText}>
                {order.distance} km
              </Text>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.locationText}>
                {order.duration} min
              </Text>
            </View>
          </View>
          <MapComponent
            latitude={0} 
            longitude={0} 
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
