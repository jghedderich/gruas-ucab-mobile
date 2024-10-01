import { Link, Href } from 'expo-router';
import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface LinkButtonProps {
  href: Href<string>;
  text: string;
  variant?: 'default' | 'outline';
}

export const LinkButton = ({
  href,
  text,
  variant = 'default',
}: LinkButtonProps) => {
  if (variant === 'outline') {
    return (
      <View>
        <Link href={href} asChild>
          <TouchableOpacity style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>{text}</Text>
          </TouchableOpacity>
        </Link>
      </View>
    );
  }

  return (
    <View>
      <Link href={href} asChild>
        <TouchableOpacity style={styles.defaultButton}>
          <Text style={styles.defaultButtonText}>{text}</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  outlineButtonText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 16,
  },
  defaultButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonTextOutline: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
