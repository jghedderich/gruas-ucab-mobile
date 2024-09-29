import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { faker } from '@faker-js/faker';
import MapComponent from '@/components/orders/MapComponent';

// Styles object is assumed to be defined elsewhere

export default function ServiceRequestDetail() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Detalles de pedido',
    });
  }, [navigation]);

  // Generate mock data
  const mockData = React.useMemo(
    () => ({
      customerName: faker.person.fullName(),
      carModel: `${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`,
      issue: faker.lorem.sentence(),
      pickup: {
        location: faker.location.streetAddress(),
        distance: faker.number.int({ min: 1, max: 50 }),
        time: faker.number.int({ min: 5, max: 30 }),
        coordinates: {
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
        },
      },
      destination: {
        location: faker.location.streetAddress(),
        distance: faker.number.int({ min: 1, max: 50 }),
        time: faker.number.int({ min: 5, max: 30 }),
        coordinates: {
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
        },
      },
    }),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.name}>{mockData.customerName}</Text>
          <View style={styles.carInfo}>
            <Ionicons name="car-outline" size={16} color="#666" />
            <Text style={styles.carModel}>{mockData.carModel}</Text>
          </View>
          <Text style={styles.issue}>{mockData.issue}</Text>
          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>UBICACIÓN</Text>
            <Text style={styles.locationName}>{mockData.pickup.location}</Text>
            <View style={styles.locationDetails}>
              <Ionicons name="location-outline" size={14} color="#666" />
              <Text style={styles.locationText}>
                {mockData.pickup.distance} km
              </Text>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.locationText}>
                {mockData.pickup.time} min
              </Text>
            </View>
          </View>
          <MapComponent
            latitude={mockData.pickup.coordinates.latitude}
            longitude={mockData.pickup.coordinates.longitude}
          />
          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>DESTINO</Text>
            <Text style={styles.locationName}>
              {mockData.destination.location}
            </Text>
            <View style={styles.locationDetails}>
              <Ionicons name="location-outline" size={14} color="#666" />
              <Text style={styles.locationText}>
                {mockData.destination.distance} km
              </Text>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.locationText}>
                {mockData.destination.time} min
              </Text>
            </View>
          </View>
          <MapComponent
            latitude={mockData.destination.coordinates.latitude}
            longitude={mockData.destination.coordinates.longitude}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.extraCostsButton}>
          <Text style={styles.extraCostsButtonText}>Costos extra</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton}>
          <Text style={styles.buttonText}>Aceptar Orden</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  carInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  carModel: {
    marginLeft: 4,
    color: 'gray',
  },
  issue: {
    marginBottom: 16,
  },
  locationInfo: {
    marginBottom: 16,
  },
  locationTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'gray',
    marginBottom: 4,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  locationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    marginRight: 8,
    color: 'gray',
  },
  map: {
    height: 120,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
    padding: 16,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  extraCostsButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  extraCostsButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
