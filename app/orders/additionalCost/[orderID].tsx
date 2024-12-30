import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useOrder } from '@/app/context/OrderContext';
import { useUser } from '@/app/context/UserContext';

// Define el tipo de los costos adicionales
type AdditionalCost = {
  name: string;
  price: string;
};

// Simula una función para obtener los costos adicionales por ID de orden
const simulateGetAdditionalCosts = (orderId: string): AdditionalCost[] => {
  const mockData: Record<string, AdditionalCost[]> = {
    '1': [
      { name: 'Costo de servicio extra', price: '$20' },
      { name: 'Reparación adicional', price: '$50' },
    ],
    '2': [],
  };
  return mockData[orderId] || [];
};


export default function ServiceRequestDetail() {
  const router = useRouter();
  const navigation = useNavigation();
  const { user } = useUser();
  const { getOrderById, selectedOrderId } = useOrder();

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Usuario no encontrado.</Text>
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
        <Text style={styles.errorText}>No se encontró la orden para este usuario.</Text>
      </SafeAreaView>
    );
  }

  const additionalCosts = simulateGetAdditionalCosts(order.id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Detalles de Orden</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>Detalles de la solicitud</Text>
          <Text style={styles.text}>ID de la Orden: {order.id}</Text>

          <Text style={styles.sectionTitle}>Costos Adicionales</Text>
          {additionalCosts.length > 0 ? (
            additionalCosts.map((cost, index) => (
              <View key={index} style={styles.costItem}>
                <Text style={styles.costName}>{cost.name}</Text>
                <Text style={styles.costPrice}>{cost.price}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>Sin costos adicionales registrados.</Text>
          )}

          <Text style={styles.sectionTitle}>Tiempo Total Transcurrido</Text>
          <Text style={styles.text}>28 minutos</Text>

          <Text style={styles.sectionTitle}>Observaciones</Text>
          <Text style={styles.text}>No hay</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
   
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginVertical: 8,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    
  },
  costItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  costName: {
    fontSize: 16,
    color: '#333',
  },
  costPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200EA',
  },
  errorText: {
    fontSize: 18,
    color: '#D32F2F',
    textAlign: 'center',
    marginTop: 20,
  },
});
