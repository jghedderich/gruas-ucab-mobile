import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { ThemedText } from '../ThemedText';

interface SectionProps {
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  trailing,
  children,
  footer,
}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.header}>
            <View>
              <ThemedText type="title" style={styles.title}>
                {title}
              </ThemedText>
              {subtitle && (
                <ThemedText type="default" style={styles.description}>
                  {subtitle}
                </ThemedText>
              )}
            </View>
            {trailing}
          </View>
          {children}
        </ScrollView>
      </View>
      {footer && <View style={styles.footer}>{footer}</View>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 50, // Adjust this value based on your footer height
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    marginTop: 0,
    marginBottom: 8,
  },
  description: {
    color: 'gray',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 16,
    backgroundColor: 'white', // Adjust this to match your app's background
  },
  footerText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 12,
  },
});
