// src/features/manager/components/layout/header/ManagerHeader.mobile.tsx

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { MANAGER_ROUTES } from '@shared/constants/routes.manager';

const ManagerHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push(MANAGER_ROUTES.HOME)}>
        <MaterialCommunityIcons name="account-circle-outline" size={28} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push(MANAGER_ROUTES.NOTIFICACIONS)}>
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

export default ManagerHeader;
