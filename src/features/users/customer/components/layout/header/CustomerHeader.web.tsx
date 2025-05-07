// src/features/customer/components/layout/header/CustomerHeader.web.tsx

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LABELS_NAV } from '@shared/constants/labels.nav';
import { APP_NAME } from '@shared/constants/app';
import { CUSTOMER_ROUTES } from '@shared/constants/routes.customer';

const CustomerHeader = () => {
  const router = useRouter();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
      <TouchableOpacity onPress={() => router.push(CUSTOMER_ROUTES.HOME)}>
        <Text>{APP_NAME}</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', gap: 24 }}>
        <TouchableOpacity onPress={() => router.push(CUSTOMER_ROUTES.RESERVATIONS)}>
          <Text>{LABELS_NAV.RESERVATIONS}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(CUSTOMER_ROUTES.REVIEWS)}>
          <Text>{LABELS_NAV.REVIEWS}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(CUSTOMER_ROUTES.PROMOTIONS)}>
          <Text>{LABELS_NAV.PROMOTIONS}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(CUSTOMER_ROUTES.PROFILE)}>
          <Text>{LABELS_NAV.PROFILE}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomerHeader;
