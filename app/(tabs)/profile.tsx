import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfile } from '@/app/context/ProfileContext'; // Importa el hook
import { useUser } from '@/app/context/UserContext'; // Contexto de usuario
import { useFocusEffect } from '@react-navigation/native';
import config from '@/app/config';
import { debounce } from 'lodash';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function DriverProfileScreen() {
    const apiUrl = config.apiBaseUrl;
    const { user, setUser } = useUser();
    const router = useRouter();
    const statusColors: Record<string, string> = {
        Available: '#4CAF50',
        Unavailable: '#F44336',
    };

    const [currentStatus, setCurrentStatus] = useState<string>(user?.status || 'Available');
    const { provider, vehicle } = useProfile();

    const toggleStatus = async () => {
        const statusOrder: string[] = ['Available', 'Unavailable'];
        const currentIndex = statusOrder.indexOf(currentStatus);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        const newStatus = statusOrder[nextIndex];

        setCurrentStatus(newStatus);

        try {
            const response = await fetch(`${apiUrl}/providers-service/drivers/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    driver: {
                        id: user?.id,
                        status: newStatus,
                    },
                }),
            });

            const data = await response.json();

        } catch (error) {
            console.error('Error de red al intentar actualizar el estado:', error);
            setCurrentStatus(currentStatus);
        }
    };

    const handleLogout = () => {
        setUser(null);
        router.push('/login');
    };

    const fetchDriverData = debounce(async () => {
        // Cada vez que vuelva el foco volvemos a pedir el conductor para ver si algo cambio!
        try {
            const driverResponse = await fetch(
                `${apiUrl}/providers-service/drivers/${user?.id}`
            );
            const driverData = await driverResponse.json();
            setUser(driverData.driver);
        } catch (error) {
            console.error('Error de red al intentar encontrar el conductor:', error);
        }
    }, 300);

    useFocusEffect(
        useCallback(() => {
            fetchDriverData();         
        }, []) // Dependencias
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={require('@/assets/images/Gruas_profile.jpg')} style={styles.profileImage} />
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={30} color="#666" />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.name}>{user?.name.firstName + ' ' + user?.name.lastName || 'Sin Nombre'}</Text>
                <Text style={styles.subtitle}>{provider?.company.name || 'Sin compañía'}</Text>
                <View style={styles.statusContainer}>
                    <TouchableOpacity
                        style={[styles.statusBadge, { backgroundColor: statusColors[currentStatus] || '#666' }]}
                        onPress={toggleStatus}
                    >
                        <Text style={styles.statusText}>{currentStatus}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => router.push('/account/EditProfile')}
                    >
                        <Ionicons name="pencil" size={16} color="#fff" />
                        <Text style={styles.editText}>Editar Perfil</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Información Adicional</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Ionicons name="car" size={28} color="#444444" style={styles.infoIcon} />
                        <Text style={styles.infoText}>
                            {vehicle?.brand + ' ' + vehicle?.model || 'Sin vehículo'}
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Ionicons name="mail" size={28} color="#444444" style={styles.infoIcon} />
                        <Text style={styles.infoText}>
                            {user?.email || 'Sin correo'}
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Ionicons name="id-card" size={28} color="#444444" style={styles.infoIcon} />
                        <Text style={styles.infoText}>
                            {user?.dni.type + '-' + user?.dni.number || 'Sin DNI'}
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Ionicons name="call" size={28} color="#444444" style={styles.infoIcon} />
                        <Text style={styles.infoText}>
                            {user?.phone || 'Sin Teléfono'}
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'column',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  profileImage: {
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
