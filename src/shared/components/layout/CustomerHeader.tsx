import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuthContext } from 'src/context/AuthContext';

const CustomerHeader = () => {
  const { user } = useAuthContext();
  const direccion = user?.profile?.addresses?.[0] || 'Sin dirección';

  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <Text style={styles.address}>📍 {direccion} ▾</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="notifications-outline" size={24} color="#111" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  address: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CustomerHeader;
