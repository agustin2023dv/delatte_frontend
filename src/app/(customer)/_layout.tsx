import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import CustomerHeader from '@shared/components/layout/CustomerHeader';

export default function CustomerLayout() {
  return (
    <View style={styles.container}>
      <CustomerHeader />
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
