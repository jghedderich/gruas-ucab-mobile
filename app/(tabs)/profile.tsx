import { Section } from '@/components/common/Section';
import OrderCard from '@/components/orders/OrderCard';
import { InfoItem } from '@/components/profile/InfoItem';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

type DriverStatus = 'available' | 'unavailable' | 'busy';

interface Order {
  id: string;
  date: string;
  location: string;
}

interface DriverProfileProps {
  name: string;
  company: string;
  truck: string;
  email: string;
  dni: string;
  phone: string;
  status: DriverStatus;
  completedOrders: Order[];
}

export default function DriverProfileScreen({
  name = 'John Doe',
  company = 'Quick Tow Inc.',
  truck = 'Truck #123',
  email = 'john.doe@quicktow.com',
  dni = 'V123456789',
  phone = '+1 (555) 123-4567',
  status = 'available',
  completedOrders = [
    { id: '1', date: '2023-09-27', location: '123 Main St' },
    { id: '2', date: '2023-09-26', location: '456 Elm St' },
    { id: '3', date: '2023-09-25', location: '789 Oak St' },
  ],
}: DriverProfileProps) {
  const [currentStatus, setCurrentStatus] = useState<DriverStatus>(status);

  const statusColors = {
    available: '#4CAF50',
    unavailable: '#F44336',
    busy: '#FFC107',
  };

  const toggleStatus = () => {
    const statusOrder: DriverStatus[] = ['available', 'unavailable', 'busy'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    setCurrentStatus(statusOrder[nextIndex]);
  };

  return (
    <Section
      title={name}
      subtitle={company}
      trailing={
        <View style={styles.header}>
          <TouchableOpacity
            style={[
              styles.statusBadge,
              { backgroundColor: statusColors[currentStatus] },
            ]}
            onPress={toggleStatus}
          >
            <Text style={styles.statusText}>{currentStatus}</Text>
          </TouchableOpacity>
        </View>
      }
    >
      <View style={styles.infoSection}>
        <InfoItem
          icon={<Ionicons name="car" size={20} color="#666" />}
          value={truck}
        />
        <InfoItem
          icon={<Ionicons name="mail" size={20} color="#666" />}
          value={email}
        />
        <InfoItem
          icon={<Ionicons name="id-card" size={20} color="#666" />}
          value={dni}
        />
        <InfoItem
          icon={<Ionicons name="call" size={20} color="#666" />}
          value={phone}
        />
      </View>

      <View style={styles.ordersSection}>
        <Text style={styles.sectionTitle}>Órdenes completadas</Text>
        <OrderCard
          driverName="Carlos Sousa"
          carModel="BMW X5"
          origin="Chacao, La Castellana"
          destination="Baruta, La Trinidad"
          distance="10 km"
          duration="1 hr 30 min"
          id={'1'}
        />
        <OrderCard
          driverName="Enrique Gonzalez"
          carModel="Chevrolet Grand Vitara"
          origin="Chacao, La Castellana"
          destination="Baruta, La Trinidad"
          distance="10 km"
          duration="1 hr 30 min"
          id={'2'}
        />
        <OrderCard
          driverName="Carlos Sousa"
          carModel="BMW X5"
          origin="Chacao, La Castellana"
          destination="Baruta, La Trinidad"
          distance="10 km"
          duration="1 hr 30 min"
          id={'3'}
        />
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginTop: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  infoSection: {
    paddingVertical: 8,
    borderRadius: 8,
  },
  ordersSection: {
    marginTop: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  orderDate: {
    fontWeight: 'bold',
  },
  orderLocation: {
    color: '#757575',
  },
});
