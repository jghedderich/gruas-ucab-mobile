import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import { Section } from '@/components/common/Section';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function CostsStatusScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [orderStatus, setOrderStatus] = useState<'approved' | 'rejected' | 'pending' | null>(null);
  const [showModal, setShowModal] = useState(false); // Control del modal

  const checkOrderStatus = () => {
    // Define los estados válidos
    const statuses: Array<'approved' | 'rejected' | 'pending'> = ['approved', 'rejected', 'pending'];
  
    // Simula un estado aleatorio
    const simulatedStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setOrderStatus(simulatedStatus); 
  
    setShowModal(true);
  
    if (simulatedStatus === 'approved') {
      setTimeout(() => {
        setShowModal(false);
        router.push('/orders/destiny'); // Redirige si está aprobada
      }, 5000);
    } else if (simulatedStatus === 'rejected') {
      setTimeout(() => {
        setShowModal(false);
        navigation.goBack(); // Redirige si está rechazada
      }, 5000);
    } else if (simulatedStatus === 'pending') {
      setTimeout(() => {
        setShowModal(false); 
      }, 5000);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Opciones del Servicio</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Section
          title="Su solicitud ha sido enviada"
          subtitle="El operador de cabina va a revisar su solicitud y podrá aprobarla o denegarla."
        >
          <Image
            source={require('@/assets/images/ingeniero-informatico.png')}
            style={styles.image}
          />
        </Section>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={checkOrderStatus} style={styles.checkButton}>
          <Text style={styles.checkButtonText}>Verificar estado</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {orderStatus === 'approved' && (
              <>
                <Text style={styles.modalTitle}>¡Solicitud aprobada!</Text>
                <Text style={styles.modalSubtitle}>
                  Serás redirigido para realizar el servicio.
                </Text>
              </>
            )}
            {orderStatus === 'rejected' && (
              <>
                <Text style={styles.modalTitle}>Solicitud rechazada</Text>
                <Text style={styles.modalSubtitle}>
                  Serás redirigido a la pantalla anterior.
                </Text>
              </>
            )}
            {orderStatus === 'pending' && (
              <>
                <Text style={styles.modalTitle}>Estado pendiente</Text>
                <Text style={styles.modalSubtitle}>
                  La solicitud aún no ha sido verificada. Intenta más tarde.
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginTop: 60,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    marginRight: 16,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginTop: 36,
  },
  footer: {
    width: '100%',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  checkButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
