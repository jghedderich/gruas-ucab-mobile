import { Section } from '@/components/common/Section'; 
import CompletedOrderCard from '@/components/orders/CompletedOrderCard';
import { InfoItem } from '@/components/profile/InfoItem';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@/app/context/UserContext'; 
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function DriverProfileScreen() {
  
  const { user, setUser } = useUser(); // Obtenemos el usuario logueado del contexto
  // console.log('Usuario logueado:', user);
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState<string>(
    user?.status || 'available'
  );

  const statusColors: Record<string, string> = {
    available: '#4CAF50',
    unavailable: '#F44336',
    busy: '#FFC107',
  };

  const completedOrders = [
    {
      customerName: 'Carlos Sousa',
      vehicleInfo: 'BMW X5',
      date: '23-09-27',
      totalAmount: 1000,
      distance: 10,
    },
    {
      customerName: 'Enrique Gonzalez',
      vehicleInfo: 'Chevrolet Grand Vitara',
      date: '23-09-26',
      totalAmount: 2000,
      distance: 35,
    },
    {
      customerName: 'Carlos Sousa',
      vehicleInfo: 'BMW X5',
      date: '23-09-25',
      totalAmount: 3000,
      distance: 30,
    },
  ];

  const toggleStatus = () => {
    const statusOrder: string[] = ['available', 'unavailable', 'busy'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    setCurrentStatus(statusOrder[nextIndex]);
  };

  const handleLogout = () => {
    setUser(null); // Borro el usuario del contexto
    router.push('/login'); // Vamos al login
  };

  return (
    <ScrollView style={styles.container}>
      {/* Botón para salir */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={40} color="#666" />
      </TouchableOpacity>

      <Section
        title={user?.name || 'Sin Nombre'}
        subtitle={user?.company || 'Sin Compañía'}
        leading={
          <Ionicons name="person-circle-outline" size={60} color="#666" />
        }
      >
        <View style={styles.statusSection}>
          <Link href="/account" asChild>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={14} color="#666" />
              <Text style={styles.editText}>Editar perfil</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity
            style={[
              styles.statusBadge,
              { backgroundColor: statusColors[currentStatus] || '#666' },
            ]}
            onPress={toggleStatus}
          >
            <Text style={styles.statusText}>{currentStatus}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoSection}>
          <InfoItem
            icon={<Ionicons name="car" size={16} color="#666" />}
            value={user?.truck || 'Sin vehículo'}
          />
          <InfoItem
            icon={<Ionicons name="mail" size={16} color="#666" />}
            value={user?.email || 'Sin correo'}
          />
          <InfoItem
            icon={<Ionicons name="id-card" size={16} color="#666" />}
            value={user?.dni || 'Sin DNI'}
          />
          <InfoItem
            icon={<Ionicons name="call" size={16} color="#666" />}
            value={user?.phone || 'Sin Teléfono'}
          />
        </View>
      </Section>

      <View style={styles.ordersSection}>
        <Text style={styles.sectionTitle}>Órdenes completadas</Text>
        {completedOrders.map((order) => (
          <CompletedOrderCard
            key={order.date}
            customerName={order.customerName}
            vehicleInfo={order.vehicleInfo}
            date={order.date}
            totalAmount={order.totalAmount}
            distance={order.distance}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 54,
    paddingHorizontal: 16,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 16,
    zIndex: 10,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'lightgray',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
  },
  editText: {
    color: '#666',
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    width: 110,
    borderRadius: 16,
  },
  statusText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  infoSection: {
    paddingVertical: 8,
    flexDirection: 'column',
    gap: 6,
  },
  ordersSection: {
    marginTop: -40,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});