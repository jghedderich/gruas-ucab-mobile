import { Section } from '@/components/common/Section';
import CompletedOrderCard from '@/components/orders/CompletedOrderCard';
import { InfoItem } from '@/components/profile/InfoItem';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@/app/context/UserContext';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function DriverProfileScreen() {
  const { user, setUser } = useUser(); // Obtenemos el usuario logueado del contexto
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState<string>(
    user?.status || 'available'
  );

  const statusColors: Record<string, string> = {
    available: '#4CAF50',
    unavailable: '#F44336',
    busy: '#FFC107',
  };

  // función para actualizar el estado del gruero
  const toggleStatus = () => {
    const statusOrder: string[] = ['available', 'unavailable', 'busy'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    setCurrentStatus(statusOrder[nextIndex]);
    // Aquí está donde se guarda la actualización del estado
    console.log('Nuevo estado:', statusOrder[nextIndex]);
  };

  const handleLogout = () => {
    setUser(null); // Borro el usuario del contexto
    router.push('/login'); // Vamos al login
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado con el botón de cierre de sesión */}
      <View style={styles.header}>
        <Image 
          source={require('@/assets/images/Gruas_profile.jpg')}
          style={styles.profileImage} 
        />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={30} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Información del Usuario */}
      <View style={styles.section}>
        <Text style={styles.name}>{user?.name || 'Sin Nombre'}</Text>
        <Text style={styles.subtitle}>{user?.company || 'Sin Compañía'}</Text>
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

      {/* Información Adicional */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Adicional</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Ionicons name="car" size={28} color="#444444" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {user?.truck || 'Sin vehículo'}
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
              {user?.dni || 'Sin DNI'}
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
});
