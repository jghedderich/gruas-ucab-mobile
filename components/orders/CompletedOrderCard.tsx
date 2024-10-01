import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CompletedOrderCardProps {
  customerName: string;
  vehicleInfo: string;
  date: string;
  totalAmount: number;
  distance: number;
}

export default function CompletedOrderCard({
  customerName,
  vehicleInfo,
  date,
  totalAmount,
  distance,
}: CompletedOrderCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        <Text style={styles.customerName}>{customerName}</Text>
        <View style={styles.vehicleInfo}>
          <Ionicons name="car" size={16} color="#6B7280" />
          <Text style={styles.vehicleText}>{vehicleInfo}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.totalAmount}>${totalAmount.toFixed(1)}</Text>
        <Text style={styles.distance}>{distance} km</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  vehicleText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6B7280',
  },
  date: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'semibold',
    color: '#111827',
  },
  distance: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
  },
});
