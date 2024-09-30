import { Link, Href } from 'expo-router';
import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface LinkButtonProps {
  href: Href<string>;
  text: string;
}

export const LinkButton = ({ href, text }: LinkButtonProps) => {
  return (
    <View>
      <Link href={href} asChild>
        <TouchableOpacity style={styles.acceptButton}>
          <Text style={styles.buttonText}>
            <Text style={styles.buttonText}>{text}</Text>
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  acceptButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
