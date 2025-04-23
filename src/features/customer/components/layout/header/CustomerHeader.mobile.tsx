// src/features/customer/components/layout/header/CustomerHeader.mobile.tsx

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { CUSTOMER_ROUTES } from '@shared/constants/routes.customer';

const CustomerHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push(CUSTOMER_ROUTES.PROFILE)}>
        <MaterialCommunityIcons name="account-circle-outline" size={28} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push(CUSTOMER_ROUTES.HOME)}>
        <MaterialCommunityIcons name="bell-outline" size={26} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
});

export default CustomerHeader;
