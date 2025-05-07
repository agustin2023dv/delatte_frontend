// src/app/(customer)/_layout.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomerHeader from '@features/users/customer/components/layout/header/CustomerHeader';
import CustomerFooter from '@features/users/customer/components/layout/footer/CustomerFooter'; // ← este es el selector
import { Slot } from 'expo-router';

export default function CustomerLayout() {
  return (
    <View style={styles.container}>
      <CustomerHeader />
      <View style={styles.content}>
        <Slot />
      </View>
      <CustomerFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});