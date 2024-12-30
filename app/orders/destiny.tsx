import { Section } from '@/components/common/Section';
import { View, StyleSheet, Text, TouchableOpacity , Alert} from 'react-native';
import MapComponent from '@/components/orders/MapComponent';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import config from '@/app/config';
import { useOrder } from '@/app/context/OrderContext';

const updateOrderStatus = async (orderId: string, orderStatus: string) => {
    const apiUrl = config.apiBaseUrl; // Asegúrate de que config esté importado
    const requestBody = {
        order: {
            id: orderId,
            status: orderStatus
        }
    };

    try {
        const response = await fetch(`${apiUrl}/providers-service/drivers/order`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
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
    const { orders, getOrderById, selectedOrderId, fetchOrders } = useOrder();
    const order = selectedOrderId ? getOrderById(selectedOrderId) : undefined;
    if (!order || !order.id) {
        return;
    }
  const handlePerformService = async () => {
      // Aquí implementar lógica adicional
      try {
          const respuesta = await updateOrderStatus(order.id, 'Completed');
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalles de Solicitud</Text>
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        <Section
          title="Realice el servicio"
          subtitle="Revise la dirección del destino en el mapa y consulte con el cliente para obtener más información."
              >
                  <MapComponent latitude={Number(order?.destinationAddress.coordinates.latitude)} longitude={Number(order?.destinationAddress.coordinates.longitude)} />
        </Section>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handlePerformService} style={[styles.button, styles.primaryButton]}>
          <Text style={styles.buttonText}>He finalizado el servicio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 60,
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
    padding: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
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
