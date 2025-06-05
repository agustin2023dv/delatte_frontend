// src/features/customer/components/layout/footer/CustomerFooter.web.tsx

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { APP_NAME } from '@shared/constants/app';
import { FOOTER_LABELS } from '@shared/constants/labels.footer';

const ManagerFooter = () => {
  const year = String(new Date().getFullYear()); 

  return (
    <View style={{ padding: 24, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{APP_NAME}</Text>

      <View style={{ flexDirection: 'row', gap: 16, marginBottom: 12 }}>
        <TouchableOpacity>
          <Text>{FOOTER_LABELS.ABOUT_US}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>{FOOTER_LABELS.TERMS}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>{FOOTER_LABELS.CONTACT}</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 12, color: '#888' }}>
        © {year} {APP_NAME}. {FOOTER_LABELS.COPYRIGHT}
      </Text>
    </View>
  );
};

export default ManagerFooter;
