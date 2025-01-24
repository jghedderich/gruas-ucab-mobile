import React, {useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text } from 'react-native';
import { useRouter } from 'expo-router';
import config from './config';
import { useId } from '@/app/context/IdContext';

export default function EnterCodeScreen() {
    const router = useRouter();
    const [email, setEmail] = useState(''); // Añadir el email para enviar con el código
    const [code, setCode] = useState('');
    const apiUrl = config.apiBaseUrl;
    const { id, setId } = useId();
    const [isLoading, setIsLoading] = useState(false);

    const handleVerifyCode = async () => {
        if (code.trim() === '') {
            Alert.alert('Error', 'Por favor ingresa el código.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/providers-service/verify-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: email,
                    Code: code,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const verifyDto = data.verifyDto;
                setId(verifyDto.id); // Guardar el id en el contexto
                Alert.alert('Código verificado', 'El código es correcto.');
                router.push('/reset-password'); // Navegar a la pantalla de cambio de contraseña
            } else if (response.status === 404) {
                Alert.alert('Error', 'Usuario no encontrado');
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
            <Text style={styles.title}>Ingresa el código</Text>
            <Text style={styles.subtitle}>
                Por favor, revisa tu correo y escribe el código de recuperación.
            </Text>
            <TextInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Código de recuperación"
                value={code}
                onChangeText={setCode}
                style={styles.input}
                keyboardType="number-pad"
            />
            <Button title="Verificar código" onPress={handleVerifyCode} disabled={isLoading} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});