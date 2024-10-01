import { Section } from '@/components/common/Section';
import CompletedOrderCard from '@/components/orders/CompletedOrderCard';
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
  customerName: string;
  vehicleInfo: string;
  date: string;
  totalAmount: number;
  distance: number;
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
    <ScrollView style={styles.container}>
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
            icon={<Ionicons name="car" size={16} color="#666" />}
            value={truck}
          />
          <InfoItem
            icon={<Ionicons name="mail" size={16} color="#666" />}
            value={email}
          />
          <InfoItem
            icon={<Ionicons name="id-card" size={16} color="#666" />}
            value={dni}
          />
          <InfoItem
            icon={<Ionicons name="call" size={16} color="#666" />}
            value={phone}
          />
        </View>

        <View style={styles.ordersSection}>
          <Text style={styles.sectionTitle}>Órdenes completadas</Text>
          {completedOrders.map((order) => (
            <CompletedOrderCard
              customerName={order.customerName}
              vehicleInfo={order.vehicleInfo}
              date={order.date}
              totalAmount={order.totalAmount}
              distance={order.distance}
            />
          ))}
        </View>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 54,
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
    flexDirection: 'column',
    gap: 6,
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
