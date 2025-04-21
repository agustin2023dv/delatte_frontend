import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

type Props = {
  text: string;
  color?: 'green' | 'red' | 'gray' | 'blue';
};

/**
 * 🏷️ Componente `DelatteBadge`
 *
 * Badge visual reutilizable con color y texto configurable.
 */
const DelatteBadge = ({ text, color = 'gray' }: Props) => {
  return (
    <View style={[styles.badge, styles[color]]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  green: {
    backgroundColor: '#2ecc71',
  },
  red: {
    backgroundColor: '#e74c3c',
  },
  gray: {
    backgroundColor: '#95a5a6',
  },
  blue: {
    backgroundColor: '#3498db',
  },
});

export default DelatteBadge;
