import { Section } from '@/components/common/Section';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  dni = '123456789',
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
    <Section title="Perfil" subtitle="Información del conductor">
      <Text style={styles.name}>{name}</Text>
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

      <View style={styles.infoSection}>
        <InfoItem label="Company" value={company} />
        <InfoItem label="Assigned Truck" value={truck} />
        <InfoItem label="Email" value={email} />
        <InfoItem label="DNI" value={dni} />
        <InfoItem label="Phone" value={phone} />
      </View>

      <View style={styles.ordersSection}>
        <Text style={styles.sectionTitle}>Completed Orders</Text>
        {completedOrders.map((order) => (
          <View key={order.id} style={styles.orderItem}>
            <Text style={styles.orderDate}>{order.date}</Text>
            <Text style={styles.orderLocation}>{order.location}</Text>
          </View>
        ))}
      </View>
    </Section>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
    backgroundColor: '#ffffff',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#757575',
  },
  infoValue: {
    color: '#212121',
  },
  ordersSection: {
    backgroundColor: '#ffffff',
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
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
