import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Modal } from 'react-native';
import { Section } from '@/components/common/Section';
import { useUser } from '@/app/context/UserContext';
import { useNavigation } from '@react-navigation/native';

export default function AccountScreen() {
  const { user, setUser } = useUser();
  const navigation = useNavigation();

  // Estados locales
  const [truck, setTruck] = useState<string>(user?.truck || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState<string>(user?.phone?.slice(3) || '');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  // Función para guardar cambios
  const handleSave = () => {
    if (!email || !phoneNumber || !truck || !currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos deben estar llenos.');
      return;
    }

    if (currentPassword !== user?.password) {
      Alert.alert('Error', 'La contraseña actual no es correcta.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'La nueva contraseña y su confirmación no coinciden.');
      return;
    }
    
    // // Actualizar usuario
    // setUser({
    //   ...user,
    //   truck,
    //   email,
    //   phone: phoneNumber,
    //   password: newPassword, 
    // });
    console.log('Usuario actualizado:', email, phoneNumber, truck, newPassword);
    // Mostrar modal por 3 segundos y luego redirigir
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      navigation.goBack(); // Redirigir a la pantalla anterior
    }, 3000);
  };

  return (
    
    <Section title="" subtitle="Editar datos de tu cuenta">
      <ScrollView contentContainerStyle={styles.container}>
        {/* Nombre del usuario */}
        <Text style={styles.name}>{user?.name || 'Usuario'}</Text>

        {/* Formulario */}
        <View style={styles.form}>
          {/* Campo de vehículo */}
          <Text style={styles.label}>Vehículo</Text>
          <TextInput
            style={styles.input}
            value={truck}
            onChangeText={setTruck}
            placeholder="Ingresa tu vehículo"
          />

          {/* Campo de correo */}
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Ingresa tu correo"
            keyboardType="email-address"
          />

          {/* Campo de teléfono */}
          <Text style={styles.label}>Teléfono</Text>  
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Número"
            keyboardType="numeric"
          />
        

          {/* Contraseña actual */}
          <Text style={styles.label}>Contraseña Actual</Text>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Ingresa tu contraseña actual"
            secureTextEntry
          />

          {/* Nueva contraseña */}
          <Text style={styles.label}>Nueva Contraseña</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Ingresa tu nueva contraseña"
            secureTextEntry
          />

          {/* Confirmar nueva contraseña */}
          <Text style={styles.label}>Confirmar Contraseña</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirma tu nueva contraseña"
            secureTextEntry
          />
        </View>
      </ScrollView>

      {/* Botón de guardar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Datos actualizados</Text>
            <Text style={styles.modalSubtitle}>
              Serás redirigido a su perfil en unos segundos.
            </Text>
          </View>
        </View>
      </Modal>
    </Section>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  form: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});
