import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Empty = ({ title = 'Oops!', description = 'No hay datos' }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/empty.png')}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 100,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    opacity: 0.7,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
  },
});

export default Empty;
