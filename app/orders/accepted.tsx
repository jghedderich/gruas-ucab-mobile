import { LinkButton } from '@/components/common/LinkButton';
import { Section } from '@/components/common/Section';
import MapComponent from '@/components/orders/MapComponent';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOrder } from '@/app/context/OrderContext';  // Importa el hook correcto
import { useUser } from '@/app/context/UserContext'; 

export default function AcceptedOrderScreen() {
  const navigation = useNavigation();
  const { user } = useUser(); // Obtener el usuario actual
  const { selectedOrderId, getOrderById } = useOrder(); // Obtener el ID de la orden seleccionada y la función para consultar los datos
  const order = getOrderById(selectedOrderId || ''); // Consultar la orden seleccionada

  if (!order) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontró información de la orden seleccionada.</Text>
      </View>
    );
  }

  return (
    <>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalles de Solicitud</Text>
      </View>

      {/* Sección principal */}
      <Section
        title="Orden Aceptada"
        subtitle="Diríjase a la ubicación del cliente y confirme su identidad."
        footer={
          <LinkButton
            href={'/orders/identified'}
            text="He llegado a la ubicación"
          />
        }
      >
        {/* Datos dinámicos */}
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
          <ThemedText type="default">{order?.distance|| 'Teléfono no disponible'}</ThemedText>
        </View>
        <View style={styles.container}>
          <Ionicons name="location" size={16} color="#666" />
          <ThemedText type="default">{order.origin}</ThemedText>
        </View>
        {/* <ThemedText type="default" style={styles.description}>
          {order.description || 'Sin descripción proporcionada'}
        </ThemedText> */}
        <MapComponent latitude={0} longitude={0} />
      </Section>
    </>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  description: {
    marginVertical: 16,
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
