import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import { Section } from '@/components/common/Section';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useOrder } from '@/app/context/OrderContext';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function CostsStatusScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [orderStatus, setOrderStatus] = useState<
    'approved' | 'rejected' | 'pending' | null
  >(null);
  const [showModal, setShowModal] = useState(false); // Control del modal
  const { getOrderById, selectedOrderId, fetchOrders } = useOrder();

  const order = selectedOrderId ? getOrderById(selectedOrderId) : undefined;

  const checkOrderStatus = async () => {
    fetchOrders();
    if (!order || !order.costDetails) {
      setOrderStatus(null);
      setShowModal(true);
      return;
    }
    let hasRejected = false;
    let hasPending = false;
    for (let i = 0; i < order.costDetails.length; i++) {
      const costdetail = order.costDetails[i];
      if (costdetail.statusC === 'Rejected') {
        hasRejected = true;
        break;
      } else if (costdetail.statusC === 'Pending') {
        hasPending = true;
      }
    }
    if (hasRejected) {
      setOrderStatus('rejected');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigation.goBack(); // Redirige si está rechazada
      }, 3000);
    } else if (hasPending) {
      setOrderStatus('pending');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    } else {
      setOrderStatus('approved');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.push('/orders/destiny'); // Redirige si está aprobada
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Opciones del Servicio"
        onBack={() => navigation.goBack()}
      />

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

      <Footer>
        <TouchableOpacity onPress={checkOrderStatus} style={styles.checkButton}>
          <Text style={styles.checkButtonText}>Verificar estado</Text>
        </TouchableOpacity>
      </Footer>

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
