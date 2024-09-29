import { View, Text, StyleSheet } from 'react-native';

export function InfoItem({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{icon}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoItem: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 8,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#757575',
  },
  infoValue: {
    color: '#212121',
  },
});
