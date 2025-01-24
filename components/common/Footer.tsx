import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type FooterProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const Footer = ({ children, style }: FooterProps) => {
  return <View style={[styles.footer, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    zIndex: 1,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 44,
  },
});

export default Footer;
