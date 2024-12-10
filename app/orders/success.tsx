import { LinkButton } from '@/components/common/LinkButton';
import { View, Image, StyleSheet, Text } from 'react-native';

export default function SuccessScreen() {
  return (
    <View style={styles.screen}>
      {/* Cabecera: Título y Subtítulo */}
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

      {/* Footer: Botón */}
      <View style={styles.footer}>
        <LinkButton href={'/'} text="Continuar" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    paddingTop: 40, // Espaciado desde la parte superior
    // paddingBottom: 20,
    marginTop: 30,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28, // Más grande para destacar
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
    flex: 1, // Ocupa el espacio restante
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
  },
  image: {
    width: 250,
    height: 250,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
});
