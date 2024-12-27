import { Section } from '@/components/common/Section';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function IdentifiedScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  // Función para manejar la solicitud de costos adicionales
  const handleRequestCosts = () => {
    console.log('Solicitando costos adicionales...');
    router.push('/orders/request-costs');
  };

  // Función para realizar el servicio
  const handlePerformService = () => {
    console.log('Realizando el servicio...');
    router.push('/orders/destiny');
  };

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Opciones del Servicio</Text>
      </View>

      {/* Contenido principal */}
      <Section
        title="¿Desea agregar costos adicionales?"
        subtitle="Puede solicitar costos adicionales o proceder a realizar el servicio. Estos deberán ser aprobados por el operador de cabina."
        footer={
          <View style={styles.buttonContainer}>
            {/* Botón para solicitar costos */}
            <TouchableOpacity onPress={handleRequestCosts} style={[styles.button, styles.outlinedButton]}>
              <Text style={[styles.buttonText, styles.outlinedText]}>Solicitar costos</Text>
            </TouchableOpacity>

            {/* Botón para realizar el servicio */}
            <TouchableOpacity onPress={handlePerformService} style={[styles.button, styles.primaryButton]}>
              <Text style={styles.buttonText}>Realizar servicio</Text>
            </TouchableOpacity>
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
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007bff', // Azul primary
  },
  outlinedButton: {
    backgroundColor: '#fff', // Fondo blanco
    borderWidth: 2, // Borde visible
    borderColor: '#007bff', // Azul primary
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Blanco para el texto
  },
  outlinedText: {
    color: '#007bff', // Azul primary para el texto
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 36,
  },
});
