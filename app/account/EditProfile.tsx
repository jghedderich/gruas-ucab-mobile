import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    Modal,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Section } from '@/components/common/Section';
import { useUser } from '@/app/context/UserContext';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import config from '@/app/config';

export default function AccountScreen() {
    const { user, setUser } = useUser();
    const navigation = useNavigation();
    const apiUrl = config.apiBaseUrl;
    // Estados locales
    const [nombre, setNombre] = useState<string>(user?.name.firstName || '');
    const [apellido, setApellido] = useState<string>(user?.name.lastName || '');
    const [phoneNumber, setPhoneNumber] = useState<string>(user?.phone || '');
    const [dniType, setDniType] = useState<string>(user?.dni.type || 'V');
    const [dni, setdni] = useState<string>(user?.dni.number || '');
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showModal, setShowModal] = useState(false);

    // Opciones para el dropdown
    const dropdownItems = [
        { label: 'V', value: 'V' },
        { label: 'E', value: 'E' },
        { label: 'J', value: 'J' },
    ];

    // Estado para manejar la apertura del dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Función para guardar cambios
    const handleSave = async () => {
        if (!nombre || !apellido || !dniType  || !dni || !phoneNumber) {
            Alert.alert('Error', 'Todos los campos deben estar llenos.');
            return;
        }


        if (currentPassword && newPassword && newPassword !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        if (nombre && apellido && dniType && dni && phoneNumber) {
            // Llamada a la API para actualizar los datos
            try {
                const updateDriverPayload = {
                    driver: {
                        id: user?.id,
                        name: {
                            firstName: nombre,
                            lastName: apellido,
                        },
                        providerId: user?.providerId,
                        vehicleId: user?.vehicleId,
                        phone: phoneNumber,
                        dni: {
                            type: dniType,
                            number: dni,
                        },
                    },
                };

                const response = await fetch(`${apiUrl}/providers-service/drivers`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${user?.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateDriverPayload),
                });

                const result = await response.json();

                if (response.ok && result.isSuccess) {
                    console.log('Usuario actualizado');
                } else {
                    Alert.alert('Error', 'No se pudo actualizar los datos.');
                }
            } catch (error) {
                console.error('Error al actualizar los datos:', error);
                Alert.alert('Error', 'No se pudo actualizar los datos.');
            }
        }

        if (currentPassword && newPassword && confirmPassword && (newPassword === confirmPassword) ) {
            // Llamada a la API para actualizar la contraseña del conductor
            const updatePasswordPayload = {
                driver: {
                    id: user?.id,
                    newPassword: newPassword,
                },
            };

            const response = await fetch(`${apiUrl}/providers-service/drivers/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatePasswordPayload),
            });

            const result = await response.json();

            if (response.ok && result.isSuccess) {
                console.log('Contraseña actualizada');
            } else {
                Alert.alert('Error', 'No se pudo actualizar la contraseña.');
            }
        }



        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            navigation.goBack();
        }, 3000);
    };

    return (
        <Section title="" subtitle="Editar datos de tu cuenta">
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    {/* Formulario */}
                    <View style={styles.form}>
                        {/* Campo de nombre */}
                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            value={nombre}
                            onChangeText={setNombre}
                            placeholder="Ingresa tu nombre"
                            keyboardType="default"
                        />

                        {/* Campo de apellido */}
                        <Text style={styles.label}>Apellido</Text>
                        <TextInput
                            style={styles.input}
                            value={apellido}
                            onChangeText={setApellido}
                            placeholder="Ingresa tu apellido"
                            keyboardType="default"
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

                        {/* Campo de DNI */}
                        <Text style={styles.label}>DNI</Text>
                        <View style={styles.dniContainer}>
                            {/* Dropdown */}
                            <DropDownPicker
                                open={isDropdownOpen}
                                value={dniType}
                                items={dropdownItems}
                                setOpen={setIsDropdownOpen}
                                setValue={setDniType}
                                style={styles.picker}
                                containerStyle={styles.pickerContainer}
                                dropDownContainerStyle={styles.dropdown}
                                listMode="SCROLLVIEW"
                            />
                            {/* Input de DNI */}
                            <TextInput
                                style={[styles.input, styles.dniInput]}
                                value={dni}
                                onChangeText={setdni}
                                placeholder="Ingresa tu DNI"
                                keyboardType="numeric"
                            />
                        </View>

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
            </KeyboardAvoidingView>
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
    dniContainer: {
        flexDirection: 'row',
    },
    pickerContainer: {
        flex: 1,
        marginRight: 10,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
    },
    dropdown: {

    },
    dniInput: {
        flex: 2,
        borderWidth: 1,
        borderColor: '#ccc',
 
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        height: 50,
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