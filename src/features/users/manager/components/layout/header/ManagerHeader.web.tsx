// src/features/manager/components/layout/header/ManagerHeader.web.tsx

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { APP_NAME } from '@shared/constants/app';
import { MANAGER_ROUTES } from '@shared/constants/routes.manager'; 
import { MANAGER_PROFILE_TABS } from '@shared/constants/labels.manager.profile';

const CustomerHeader = () => {
  const router = useRouter();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
      <TouchableOpacity onPress={() => router.push(MANAGER_ROUTES.HOME)}>
        <Text>{APP_NAME}</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', gap: 24 }}>
        <TouchableOpacity onPress={() => router.push(MANAGER_ROUTES.HOME)}>
          <Text>{MANAGER_PROFILE_TABS.HOME}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(MANAGER_ROUTES.PROFILE)}>
          <Text>{MANAGER_PROFILE_TABS.PROFILE}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(MANAGER_ROUTES.RESTAURANTS)}>
          <Text>{MANAGER_PROFILE_TABS.RESTAURANTS}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(MANAGER_ROUTES.NOTIFICACIONS)}>
          <Text>{MANAGER_PROFILE_TABS.NOTIFICATIONS}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomerHeader;
