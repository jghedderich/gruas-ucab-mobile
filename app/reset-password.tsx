import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text } from 'react-native';
import { useRouter } from 'expo-router';
import config from './config'; // Asegúrate de que la URL base del API esté en config
import { useId } from '@/app/context/IdContext';
export default function ResetPasswordScreen() {
    const router = useRouter();
    const apiUrl = config.apiBaseUrl;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { id, setId } = useId();

    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert('Error', 'Por favor completa ambos campos.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }
        setIsLoading(true);

        try {
            const response = await fetch(`${apiUrl}/providers-service/drivers/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    driver: {
                        id: id,
                        newPassword: newPassword,
                    },
                }),
            });
            if (response.ok) {
                const data = await response.json();
                Alert.alert('Éxito', 'Tu contraseña ha sido cambiada con éxito.');
                router.push('/'); // Redirige al login
            } else {
                Alert.alert('Error', 'Ocurrió un error al actualizar la contraseña.');
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
            <Text style={styles.title}>Nueva contraseña</Text>
            <TextInput
                placeholder="Nueva contraseña"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                placeholder="Confirma tu nueva contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Establecer contraseña" onPress={handleResetPassword} disabled={isLoading} />
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
});