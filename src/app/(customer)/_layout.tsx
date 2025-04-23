// src/app/(customer)/_layout.tsx

import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import CustomerHeader from '@shared/components/layout/CustomerHeader';
import CustomerBottomTab from '@features/customer/components/CustomerBottomTab';

export default function CustomerLayout() {
  return (
    <View style={styles.container}>
      <CustomerHeader />
      {Platform.OS !== 'web' && <CustomerBottomTab />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
