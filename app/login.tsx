import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, TextInput, Button, View, Alert, Text } from 'react-native';
import { useUser } from '@/app/context/UserContext';
import config from './config';
import { registerForPushNotificationsAsync } from '../notifications/pushnotifications';

export default function LoginScreen() {
  const apiUrl = config.apiBaseUrl;
  const router = useRouter();
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async () => {
        setIsLoading(true);
        const token = await registerForPushNotificationsAsync();
        try {
            const response = await fetch(`${ apiUrl }/providers-service/drivers/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: email,
                    Password: password,
                    Token: token,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.driver);
                router.push('/home');
            } else if (response.status === 404) {
                Alert.alert('Error', 'Usuario no encontrado');
            } else if (response.status === 401) {
                Alert.alert('Error', 'Credenciales incorrectas');
            } else {
                Alert.alert('Error', 'Ocurrió un error inesperado');
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar al servidor');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
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
      <Button
        title={isLoading ? 'Cargando...' : 'Iniciar sesión'}
        onPress={handleLogin}
        disabled={isLoading}
      />
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
});
