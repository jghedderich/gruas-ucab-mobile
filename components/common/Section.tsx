import React from 'react';
import { ThemedText } from '../ThemedText';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Section = ({ title, subtitle, children }: SectionProps) => {
  return (
    <ScrollView style={styles.mainContainer}>
      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText type="default" style={styles.description}>
        {subtitle}
      </ThemedText>
      {children}
      <ThemedText type="default" style={styles.footer}>
        Creado y diseñado por el Equipo Nro. 9
      </ThemedText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 24,
  },
  title: {
    marginTop: 54,
  },
  description: {
    color: 'gray',
    marginBottom: 16,
  },
  footer: {
    color: 'gray',
    paddingTop: 46,
    paddingBottom: 36,
    textAlign: 'center',
    fontSize: 12,
  },
});
