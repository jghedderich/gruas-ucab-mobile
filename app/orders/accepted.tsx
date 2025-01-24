import Ionicons from '@expo/vector-icons/Ionicons';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOrder } from '@/app/context/OrderContext';
import { useUser, User} from '@/app/context/UserContext';
import { Section } from '@/components/common/Section';
import { useRouter } from 'expo-router';
import MapComponent from '@/components/orders/MapComponent';
import { ThemedText } from '@/components/ThemedText';
import config from '@/app/config';
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
    console.log(requestBody);
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
export default function AcceptedOrderScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useUser(); // Obtener el usuario actual
  const { selectedOrderId, getOrderById } = useOrder(); // Obtener el ID de la orden seleccionada y la función para consultar los datos
  const order = selectedOrderId ? getOrderById(selectedOrderId) : undefined;
  if (!order) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          No se encontró información de la orden seleccionada.
        </Text>
      </View>
    );
  }

  // Función para manejar el evento de presionar el botón
    const handleArrival = async () => {
        if (user == null) {
            router.push('/login');
            return;
        }
    try {
      const respuesta = await updateOrderStatus(order.id, 'Located', user);
      if (respuesta) {
        console.log('Cliente localizado', order?.id);
        router.push('/orders/identified');
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <View style={styles.screen}>
      <Header
        onBack={() => navigation.goBack()}
        title="Detalles de Solicitud"
      />

      <View style={styles.content}>
        <Section
          title="Orden Aceptada"
          subtitle="Diríjase a la ubicación del cliente y confirme su identidad."
        >
          <View style={styles.container}>
            <Ionicons name="person" size={16} color="#666" />
            <ThemedText type="default">
              {order?.client.name.firstName +
                ' ' +
                order?.client.name.lastName || 'Nombre no disponible'}
            </ThemedText>
          </View>
          <View style={styles.container}>
            <Ionicons name="car" size={16} color="#666" />
            <ThemedText type="default">
              {order?.client.clientVehicle.brand +
                ' ' +
                order?.client.clientVehicle.model}
            </ThemedText>
          </View>
          <View style={styles.container}>
            <Ionicons name="call" size={16} color="#666" />
            <ThemedText type="default">
              {order?.client.phone || 'Teléfono no disponible'}
            </ThemedText>
          </View>
          <View style={styles.container}>
            <Ionicons name="location" size={16} color="#666" />
            <ThemedText type="default">
              {order?.incidentAddress.addressLine1 +
                ', ' +
                order?.incidentAddress.addressLine2}
            </ThemedText>
          </View>
          <MapComponent
            latitude={Number(order?.incidentAddress.coordinates.latitude)}
            longitude={Number(order?.incidentAddress.coordinates.longitude)}
          />
        </Section>
      </View>

      <Footer>
        <TouchableOpacity style={styles.arrivalButton} onPress={handleArrival}>
          <Text style={styles.arrivalButtonText}>
            He llegado a la ubicación
          </Text>
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
    paddingHorizontal: 16,
    marginTop: 100,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  arrivalButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  arrivalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});
