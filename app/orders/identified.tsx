import { Section } from '@/components/common/Section';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

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
      <Header
        title="Opciones del Servicio"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Section
          title="¿Desea agregar costos adicionales?"
          subtitle="Puede solicitar costos adicionales o proceder a realizar el servicio. Estos deberán ser aprobados por el operador de cabina."
        >
          <Image
            source={require('@/assets/images/negocio.png')}
            style={styles.image}
          />
        </Section>
        <Footer
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <TouchableOpacity
            onPress={handleRequestCosts}
            style={[styles.button, styles.outlinedButton]}
          >
            <Text style={[styles.buttonText, styles.outlinedText]}>
              Solicitar costos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePerformService}
            style={[styles.button, styles.primaryButton]}
          >
            <Text style={styles.buttonText}>Realizar servicio</Text>
          </TouchableOpacity>
        </Footer>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 100,
  },
  backButton: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
