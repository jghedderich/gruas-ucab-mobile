import { StyleSheet, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import OrderCard from '@/components/orders/OrderCard';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.mainContainer}>
      <ThemedText type="title" style={styles.title}>
        Lista de órdenes
      </ThemedText>
      <ThemedText type="default" style={styles.description}>
        Revisa todas las órdenes han sido asignadas a tu flota.
      </ThemedText>
      <OrderCard
        driverName="Carlos Sousa"
        carModel="BMW X5"
        origin="Chacao, La Castellana"
        destination="Baruta, La Trinidad"
        distance="10 km"
        duration="1 hr 30 min"
        id={'1'}
      />
      <OrderCard
        driverName="Enrique Gonzalez"
        carModel="Chevrolet Grand Vitara"
        origin="Chacao, La Castellana"
        destination="Baruta, La Trinidad"
        distance="10 km"
        duration="1 hr 30 min"
        id={'2'}
      />
      <OrderCard
        driverName="Carlos Sousa"
        carModel="BMW X5"
        origin="Chacao, La Castellana"
        destination="Baruta, La Trinidad"
        distance="10 km"
        duration="1 hr 30 min"
        id={'3'}
      />
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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
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
