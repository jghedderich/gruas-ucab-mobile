
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, TextInput, Button, View, Alert } from 'react-native';
import { useUser } from '@/app/context/UserContext';

const users = [
  {
    id: "1",
    name: "Sofi Arasme",
    company: "Quick Tow Inc.",
    truck: "Corolla",
    placa: "ABC123",
    email: "sofi@gmail.com",
    dni: "12340000",
    phone: "0416-6666666",
    user: "sofi",
    password: "123",
    status: "available",
  },
  {
    id: "3",
    name: "Boffe GP",
    company: "Twich Kick.",
    truck: "Toyota",
    placa: "FGA754",
    email: "boffegp@gmail.com",
    dni: "12345678",
    phone: "0412-1234567",
    user: "agus",
    password: "12gp12",
    status: "available",
  },
];

export default function LoginScreen() {
  const router = useRouter();
  const { setUser } = useUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const foundUser = users.find(
      (u) => u.user === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      router.push('/home'); // Navegar a la pantalla principal
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
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
