
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Section } from '@/components/common/Section';
import { additionalCosts } from '@/app/data/data';
import { LinkButton } from '@/components/common/LinkButton';
import { useRouter } from 'expo-router';

export default function RequestCostsScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const [costs, setCosts] = useState<{ [key: string]: string }>({});
  const [isModalVisible, setModalVisible] = useState(false);

  const handleInputChange = (costId: string, value: string) => {
    setCosts((prev) => ({
      ...prev,
      [costId]: value,
    }));
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSendRequest = () => {
    // Aquí la lógica para enviar los costos
    handleCloseModal();
    router.push('/orders/costs-status');
  };

  const enteredCosts = Object.entries(costs)
    .filter(([_, value]) => value)
    .map(([key, value]) => {
      const costName = additionalCosts.find((cost) => cost.costId === key)?.name;
      return { name: costName, value };
    });

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Opciones del Servicio</Text>
      </View>

      <ScrollView>
        <Section
          title="Agregar costos adicionales"
          subtitle="Reporte todos los costos adicionales requeridos para realizar el servicio. Estos deberán ser aprobados por el operador de cabina."
        >
          <View style={styles.formContainer}>
            {additionalCosts.map((cost) => (
              <View key={cost.costId} style={styles.row}>
                <Text style={styles.costName}>{cost.name}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Monto extra"
                  keyboardType="numeric"
                  value={costs[cost.costId] || ''}
                  onChangeText={(value) => handleInputChange(cost.costId, value)}
                />
              </View>
            ))}
          </View>
        </Section>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleOpenModal} style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Enviar solicitud</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {enteredCosts.length > 0 ? (
              <>
                <Text style={styles.modalTitle}>Resumen de costos adicionales</Text>
                {enteredCosts.map((cost, index) => (
                  <View key={index} style={styles.modalRow}>
                    <Text style={styles.modalCostName}>{cost.name}</Text>
                    <Text style={styles.modalCostValue}>${cost.value}</Text>
                  </View>
                ))}

                {/* Línea separadora */}
                <View style={styles.divider} />

                {/* Total */}
                <View style={styles.modalRow}>
                  <Text style={[styles.modalCostName, styles.totalText]}>Total</Text>
                  <Text style={[styles.modalCostValue, styles.totalValue]}>
                    ${enteredCosts.reduce((sum, cost) => sum + parseFloat(cost.value || '0'), 0).toFixed(2)}
                  </Text>
                </View>
              </>
            ) : (
              <Text style={styles.modalTitle}>
                ¿Seguro que desea enviar sin costos adicionales?
              </Text>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleCloseModal} style={[styles.modalButton, styles.modalCloseButton]}>
                <Text style={styles.modalButtonText}>Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSendRequest} style={[styles.modalButton, styles.modalSendButton]}>
                <Text style={styles.modalButtonText}>Enviar Solicitud</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 60,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 12,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  totalValue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#007bff',
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  costName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  input: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalCostName: {
    fontSize: 16,
    color: '#333',
  },
  modalCostValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  modalButtons: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20,
  },
  modalButton: {
    flex: 1, 
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseButton: {
    backgroundColor: 'red', 
    marginRight: 10, 
  },
  modalSendButton: {
    backgroundColor: 'green', 
    marginLeft: 10, 
  },
  modalButtonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  footerButton: {
    backgroundColor: '#007BFF', 
    paddingVertical: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
  },
  footerButtonText: {
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
  },
});


