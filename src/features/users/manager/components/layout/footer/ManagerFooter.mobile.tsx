// src/features/manager/components/layout/footer/ManagerFooter.mobile.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import { LABELS_NAV } from '@shared/constants/labels.nav';

// Importa las pantallas específicas para managers

import ManagerRestaurantsScreen from '@app/(manager)/restaurants';
import ManagerProfileScreen from '@app/(manager)/profile';

const Tab = createBottomTabNavigator();

const CustomerBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap = 'help-circle-outline';

          if (route.name === LABELS_NAV.PROFILE) {
            iconName = focused ? 'home' : 'home-outline';
          } else {
            iconName = focused ? 'calendar-check' : 'calendar-check-outline';
          } 

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen name={LABELS_NAV.PROFILE} component={ManagerProfileScreen} />
      <Tab.Screen name={LABELS_NAV.RESTAURANTS} component={ManagerRestaurantsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
});

export default CustomerBottomTab;
