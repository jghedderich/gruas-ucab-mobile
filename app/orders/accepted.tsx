import { LinkButton } from '@/components/common/LinkButton';
import { Section } from '@/components/common/Section';
import MapComponent from '@/components/orders/MapComponent';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export default function AcceptedOrderScreen() {
  return (
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
      <View style={styles.container}>
        <Ionicons name="person" size={16} color="#666" />
        <ThemedText type="default">Carlos Sousa</ThemedText>
      </View>
      <View style={styles.container}>
        <Ionicons name="car" size={16} color="#666" />
        <ThemedText type="default">BMW X5</ThemedText>
      </View>
      <View style={styles.container}>
        <Ionicons name="call" size={16} color="#666" />
        <ThemedText type="default">0412-3349273</ThemedText>
      </View>
      <View style={styles.container}>
        <Ionicons name="location" size={16} color="#666" />
        <ThemedText type="default">Chacao, La Castellana</ThemedText>
      </View>
      <ThemedText type="default" style={styles.description}>
        El vehiculo esta accidentado al borde de la calle
      </ThemedText>
      <MapComponent latitude={10.0} longitude={10.0} />
    </Section>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  description: {
    marginVertical: 16,
  },
});
