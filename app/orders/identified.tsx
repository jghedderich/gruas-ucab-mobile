import { LinkButton } from '@/components/common/LinkButton';
import { Section } from '@/components/common/Section';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function IdentifiedScreen() {
  const navigation = useNavigation();

  return (
    <>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Opciones del Servicio</Text>
      </View>

      
      <Section
        title="¿Desea agregar costos adicionales?"
        subtitle="Puede solicitar costos adicionales o proceder a realizar el servicio. Estos deberán ser aprobados por el operador de cabina."
        footer={
          <View style={styles.buttonContainer}>
            <LinkButton
              href={'/orders/request-costs'}
              text="Solicitar costos"
              variant="outline"
            />
            <LinkButton
              href={'/orders/destiny'}
              text="Realizar servicio"
              variant="default"
            />
          </View>
        }
      >
        <Image
          source={require('@/assets/images/negocio.png')}
          style={styles.image}
        />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center', // Centrar imagen horizontalmente
    marginTop: 36,
  },
});
