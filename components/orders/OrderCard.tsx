import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useOrder } from '@/app/context/OrderContext';
import { Link } from 'expo-router';

interface OrderCardProps {
  orderId: string;
  driverName: string;
  carModel: string;
  origin: string;
  destination: string;
  distance: string;
  duration: string;
  userId: string;
}

export default function OrderCard({
  orderId,
  driverName,
  carModel,
  origin,
  destination,
  distance,
  duration,
  userId,
}: OrderCardProps) {
  const { setSelectedOrderId } = useOrder();  // Utiliza la nueva función del contexto

  const handlePress = () => {
    setSelectedOrderId(orderId);  // Al hacer clic, guarda el ID en el contexto
    // console.log('ID de la orden seleccionada:', orderId);
  };

  return (
    <Link href={`/orders/${orderId}`} asChild>
      <TouchableOpacity onPress={handlePress} style={styles.card} activeOpacity={0.8}>
        <View style={styles.header}>
          <View>
            <Text style={styles.driverName}>{driverName}</Text>
            <View style={styles.carInfo}>
              <Ionicons name="car-outline" size={16} color="#666" />
              <Text style={styles.carModel}>{carModel}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </View>
        <View style={styles.divider} />
        <View style={styles.locationInfo}>
          <View style={styles.locationColumn}>
            <Text style={styles.locationLabel}>UBICACION</Text>
            <Text style={styles.locationName}>{origin}</Text>
            <View style={styles.distanceTime}>
              <Ionicons name="navigate" size={14} color="#666" />
              <Text style={styles.distanceTimeText}>{distance}</Text>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.distanceTimeText}>{duration}</Text>
            </View>
          </View>
          <View style={styles.locationColumn}>
            <Text style={styles.locationLabel}>DESTINO</Text>
            <Text style={styles.locationName}>{destination}</Text>
            <View style={styles.distanceTime}>
              <Ionicons name="navigate" size={14} color="#666" />
              <Text style={styles.distanceTimeText}>{distance}</Text>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.distanceTimeText}>{duration}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  carInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  carModel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
  },
  locationInfo: {
    flexDirection: 'column',
    gap: 24,
  },
  locationColumn: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  distanceTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceTimeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    marginRight: 8,
  },
});
