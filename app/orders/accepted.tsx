import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOrder } from '@/app/context/OrderContext';
import { useUser } from '@/app/context/UserContext';
import { Section } from '@/components/common/Section';
import { useRouter } from 'expo-router';
import MapComponent from '@/components/orders/MapComponent';
import { ThemedText } from '@/components/ThemedText';

export default function AcceptedOrderScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useUser(); // Obtener el usuario actual
  const { selectedOrderId, getOrderById } = useOrder(); // Obtener el ID de la orden seleccionada y la función para consultar los datos
  const order = getOrderById(selectedOrderId || ''); // Consultar la orden seleccionada

  // Función para manejar el evento de presionar el botón
  const handleArrival = () => {
    console.log('He llegado a la ubicación');
    // Aquí puedes agregar la lógica que necesites más adelante
    router.push('/orders/identified');
  };

  if (!order) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontró información de la orden seleccionada.</Text>
      </View>
    );
  }

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
          title="Orden Aceptada"
          subtitle="Diríjase a la ubicación del cliente y confirme su identidad."
        >
          <View style={styles.container}>
            <Ionicons name="person" size={16} color="#666" />
            <ThemedText type="default">{order?.driverName || 'Nombre no disponible'}</ThemedText>
          </View>
          <View style={styles.container}>
            <Ionicons name="car" size={16} color="#666" />
            <ThemedText type="default">{order.carModel}</ThemedText>
          </View>
          <View style={styles.container}>
            <Ionicons name="call" size={16} color="#666" />
            <ThemedText type="default">{order?.distance || 'Teléfono no disponible'}</ThemedText>
          </View>
          <View style={styles.container}>
            <Ionicons name="location" size={16} color="#666" />
            <ThemedText type="default">{order.origin}</ThemedText>
          </View>
          <MapComponent latitude={0} longitude={0} />
        </Section>
      </View>

      {/* Botón en el footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.arrivalButton} onPress={handleArrival}>
          <Text style={styles.arrivalButtonText}>He llegado a la ubicación</Text>
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
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    padding: 16,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
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
