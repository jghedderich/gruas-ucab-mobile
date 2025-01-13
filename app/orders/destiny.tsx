import { Section } from '@/components/common/Section';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import MapComponent from '@/components/orders/MapComponent';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import config from '@/app/config';
import { useUser, User } from '@/app/context/UserContext';
import { useOrder } from '@/app/context/OrderContext';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { getLocation } from '@/app/metodos';

const updateOrderStatus = async (orderId: string, orderStatus: string, user: User) => {
    const apiUrl = config.apiBaseUrl; // Asegúrate de que config esté importado
    const address = await getLocation(); 
    const requestBody = {
        order: {
            id: orderId,
            orderStatus: orderStatus,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            zip: address.zip,
            city: address.city,
            state: address.state,
            latitude: address.latitude.toFixed(5).toString().slice(0, 8),
            longitude: address.longitude.toFixed(5).toString().slice(0, 8)
        },
    };

  try {
      const response = await fetch(`${apiUrl}/orders-service/orders/progress`, {
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
export default function DestinyScreen() {
  const navigation = useNavigation();
    const router = useRouter();
    const { user } = useUser(); // Obtenemos el usuario logueado del contexto
  const { orders, getOrderById, selectedOrderId, fetchOrders } = useOrder();
  const order = selectedOrderId ? getOrderById(selectedOrderId) : undefined;
  if (!order || !order.id) {
    return;
  }
  const handlePerformService = async () => {
      // Aquí implementar lógica adicional
      if (user == null) {
          router.push('/login');
          return;
      }
    try {
      const respuesta = await updateOrderStatus(order.id, 'Completed', user);
      if (respuesta) {
        console.log('Conductor ha confirmado que ha realizado el servicio.');
        router.push('/orders/success');
      }
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };
  return (
    <View style={styles.screen}>
      <Header
        onBack={() => navigation.goBack()}
        title="Detalles de Solicitud"
      />

      {/* Contenido principal */}
      <View style={styles.content}>
        <Section
          title="Realice el servicio"
          subtitle="Revise la dirección del destino en el mapa y consulte con el cliente para obtener más información."
        >
          <MapComponent
            latitude={Number(order?.destinationAddress.coordinates.latitude)}
            longitude={Number(order?.destinationAddress.coordinates.longitude)}
          />
        </Section>
      </View>

      <Footer>
        <TouchableOpacity
          onPress={handlePerformService}
          style={[styles.button, styles.primaryButton]}
        >
          <Text style={styles.buttonText}>He finalizado el servicio</Text>
        </TouchableOpacity>
      </Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backButton: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    marginTop: 100,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007bff', // Azul primary
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Texto blanco
  },
});
