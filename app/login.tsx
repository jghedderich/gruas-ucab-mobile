import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, TextInput, Button, View, Alert, Text } from 'react-native';
import { useUser } from '@/app/context/UserContext';
import config from './config';
import { registerForPushNotificationsAsync } from '../notifications/pushnotifications';

export default function LoginScreen() {
  const apiUrl = config.apiBaseUrl;
    const router = useRouter();
    const { user , setUser, updateUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async () => {
        setIsLoading(true);
        const token = await registerForPushNotificationsAsync();
        try {
            const response = await fetch(`https://9b98-149-102-244-105.ngrok-free.app/providers-service/drivers/authenticate`, {
                method: 'POST',
                headers: {
                    'ngrok-skip-browser-warning': '1',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: email,
                    Password: password,
                    Token: token,
                }),
            });
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                updateUser(data.driver, data.token); 
                router.push('/home');
            } else if (response.status === 404) {
                Alert.alert('Error', 'Usuario no encontrado');
            } else if (response.status === 401) {
                Alert.alert('Error', 'Credenciales incorrectas');
            } else {
                Alert.alert('Error', 'Ocurrió un error inesperado');
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', `No se pudo conectar al servidor: ${error.message}`);
            } else {
                Alert.alert('Error', 'No se pudo conectar al servidor');
            }
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
      router.push('/forgot-password'); // Navegar a la pantalla de recuperación de contraseña

    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <Text style={styles.subTitle}>
        Ingrese sus credenciales para iniciar sesión
      </Text>
      <TextInput
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <View style={styles.forgotPasswordContainer}>
        <Button
          title="¿Olvidaste tu contraseña?"
          onPress={handleForgotPassword}
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
    textAlign: 'center',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  forgotPasswordContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
});
