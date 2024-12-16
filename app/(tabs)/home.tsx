import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import OrderCard from '@/components/orders/OrderCard';
import { useUser } from '@/app/context/UserContext'; // Importamos el contexto de usuario
import  { orders }  from '@/app/data/data'; 

interface Order {
  orderId: string;
  driverName: string;
  carModel: string;
  origin: string;
  destination: string;
  distance_arrival: string;
  duration_arrival: string;
  distance_back: string;
  duration_back: string;
  userId: string;
}

export default function OrderScreen() {
  const { user } = useUser(); // Obtenemos el usuario logueado del contexto

  // Si no hay usuario logueado, mostramos un mensaje
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

  // Filtrar órdenes según el ID del usuario autenticado
  const userOrders: Order[] = orders.filter(order => order.userId === user.id);

  return (
    <ScrollView style={styles.mainContainer}>
      <ThemedText type="title" style={styles.title}>
        Lista de órdenes
      </ThemedText>
      <ThemedText type="default" style={styles.description}>
        Revisa todas las órdenes que te han sido asignadas.
      </ThemedText>
      {userOrders.length > 0 ? (
        userOrders.map((order) => (
          <OrderCard
            key={order.orderId} // Usa orderId como key
            orderId={order.orderId}
            driverName={order.driverName}
            carModel={order.carModel}
            origin={order.origin}
            destination={order.destination}
            distance_arrival={order.distance_arrival}
            duration_arrival={order.duration_arrival}
            distance_back={order.distance_back}
            duration_back={order.duration_back}
            userId={order.userId}
          />
        ))
      ) : (
        <ThemedText type="default" style={styles.description}>
          No tienes órdenes asignadas.
        </ThemedText>
      )}
      <ThemedText type="default" style={styles.footer}>
        Creado y diseñado por el Equipo Nro. 9
      </ThemedText>
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
