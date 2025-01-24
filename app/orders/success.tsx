import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Footer from '@/components/common/Footer';

export default function SuccessScreen() {
  const router = useRouter();
  const handleButtonPress = () => {
    console.log('Botón presionado. Ejecutando acción...');
    router.push('/home'); // Navegar a la pantalla principal
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Buen trabajo!</Text>
        <Text style={styles.subtitle}>
          La orden ha sido marcada como completada.
        </Text>
      </View>

      {/* Contenido: Imagen centrada */}
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/felicitar.png')}
          style={styles.image}
        />
      </View>

      <Footer>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    paddingTop: 40,
    marginTop: 30,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
