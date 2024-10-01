import React, { useState } from 'react';
import { Input } from '../common/Input';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

const fees = [
  { label: 'Acceso difícil', value: 'difficult-access' },
  { label: 'Zonas rojas', value: 'red-zone' },
  { label: 'Peaje', value: 'toll' },
  { label: 'Terreno complejo', value: 'complex-terrain' },
  { label: 'Vehículo volteado', value: 'reverse-vehicle' },
];

export const ExtraFeesForm = () => {
  const [selectedFees, setSelectedFees] = useState([]);
  const getFeeLabel = (fee: string) => fees.find((f) => f.value === fee)?.label;

  return (
    <View>
      <MultiSelect
        value={selectedFees}
        labelField="label"
        style={styles.dropdown}
        data={fees}
        placeholder="Agregar costos"
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        selectedStyle={styles.selectedStyle}
        onChange={(fee: any) => {
          setSelectedFees(fee);
        }}
        valueField="value"
      />
      {selectedFees.map((fee) => (
        <Input
          key={fee}
          type="numeric"
          label={`Costo ${getFeeLabel(fee)}`}
          placeholder={`Costo ${getFeeLabel(fee)}`}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#3b82f6',
  },
  selectedStyle: {
    borderRadius: 8,
    borderWidth: 0,
    backgroundColor: '#dbeafe',
  },
});
