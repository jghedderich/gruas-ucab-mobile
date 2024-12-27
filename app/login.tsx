import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, TextInput, Button, View, Alert } from 'react-native';
import { useUser } from '@/app/context/UserContext';

export default function LoginScreen() {
    const router = useRouter();
    const { setUser } = useUser();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('http://192.168.18.211:6004/providers-service/drivers/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: email,
                    Password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.driver); // Guardar la información del conductor autenticado
                router.push('/home'); // Navegar a la pantalla principal
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});