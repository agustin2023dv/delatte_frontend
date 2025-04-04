
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerHomeScreen from '../features/customer/screens/CustomerHomeScreen';
const Stack = createNativeStackNavigator();

const ManagerNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomerHome" component={CustomerHomeScreen} />

    </Stack.Navigator>
  );
};

export default ManagerNavigator;