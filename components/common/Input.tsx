import React from 'react';
import { TextInput, StyleSheet, View, KeyboardTypeOptions } from 'react-native';
import { ThemedText } from '../ThemedText';

interface InputProps {
  label: string;
  placeholder: string;
  type?: KeyboardTypeOptions;
}

export const Input = ({ label, placeholder, type = 'default' }: InputProps) => {
  return (
    <View style={styles.container}>
      <ThemedText type="default" style={styles.label}>
        {label}
      </ThemedText>
      <TextInput
        keyboardType={type}
        style={styles.input}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 4,
    fontWeight: '500',
  },
});
