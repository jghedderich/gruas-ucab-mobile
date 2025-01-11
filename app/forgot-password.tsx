import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');


  const handleRecoverPassword = () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu correo.');
      return;
    }

    // Aquí va la logica para el envio del correo
    Alert.alert(
      'Recuperación de contraseña',
      `Se ha enviado un correo de recuperación a: ${email}`
    );

    router.push('/enter-code'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>
      <TextInput
        placeholder="Ingresa tu correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Enviar correo de recuperación" onPress={handleRecoverPassword} />
      <View style={styles.backToLoginContainer}>
        <Button
          title="Volver al inicio de sesión"
          onPress={() => router.push('/')}
          color="#007BFF"
        />
      </View>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  backToLoginContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
});
