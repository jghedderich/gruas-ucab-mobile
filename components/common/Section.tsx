import React from 'react';
import { ThemedText } from '../ThemedText';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native';

interface SectionProps {
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}

export const Section = ({
  title,
  subtitle,
  trailing,
  children,
}: SectionProps) => {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.header}>
        <View>
          <ThemedText type="title" style={styles.title}>
            {title}
          </ThemedText>
          <ThemedText type="default" style={styles.description}>
            {subtitle}
          </ThemedText>
        </View>
        {trailing}
      </View>
      {children}
      <ThemedText type="default" style={styles.footer}>
        Creado y diseñado por el Equipo Nro. 9
      </ThemedText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
  },
  title: {
    marginTop: 0,
  },
  description: {
    color: 'gray',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    color: 'gray',
    paddingTop: 46,
    paddingBottom: 36,
    textAlign: 'center',
    fontSize: 12,
  },
});
