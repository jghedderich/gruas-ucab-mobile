import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function EnterCodeScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');

  const handleVerifyCode = () => {
    const validCode = '123456'; // Simulación de código válido
    if (code === validCode) {
      Alert.alert('Código verificado', 'El código es correcto.');
      router.push('/reset-password'); // Navegar a la pantalla de cambio de contraseña
    } else {
      Alert.alert('Error', 'El código ingresado no es válido.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresa el código</Text>
      <Text style={styles.subtitle}>
        Por favor, revisa tu correo y escribe el código de recuperación.
      </Text>
      <TextInput
        placeholder="Código de recuperación"
        value={code}
        onChangeText={setCode}
        style={styles.input}
        keyboardType="number-pad"
      />
      <Button title="Verificar código" onPress={handleVerifyCode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
