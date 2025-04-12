
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManagerHomeScreen from '../(manager)/ManagerHomeScreen';
const Stack = createNativeStackNavigator();

const ManagerNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ManagerHome" component={ManagerHomeScreen} />

    </Stack.Navigator>
  );
};

export default ManagerNavigator;