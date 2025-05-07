// src/features/customer/components/layout/footer/CustomerFooter.mobile.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import { LABELS_NAV } from '@shared/constants/labels.nav';

// Importa las pantallas específicas para clientes
import HomeScreen from '@app/(customer)/home';
import ReservationsScreen from '@app/(customer)/reservations';
import PromotionsScreen from '@app/(customer)/promotions';
import ReviewsScreen from '@app/(customer)/reviews';
import ProfileScreen from '@app/(customer)/profile';

const Tab = createBottomTabNavigator();

const CustomerBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap = 'help-circle-outline';

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === LABELS_NAV.RESERVATIONS) {
            iconName = focused ? 'calendar-check' : 'calendar-check-outline';
          } else if (route.name === LABELS_NAV.PROMOTIONS) {
            iconName = focused ? 'tag' : 'tag-outline';
          } else if (route.name === LABELS_NAV.REVIEWS) {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === LABELS_NAV.PROFILE) {
            iconName = focused ? 'account' : 'account-outline';
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
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name={LABELS_NAV.RESERVATIONS} component={ReservationsScreen} />
      <Tab.Screen name={LABELS_NAV.PROMOTIONS} component={PromotionsScreen} />
      <Tab.Screen name={LABELS_NAV.REVIEWS} component={ReviewsScreen} />
      <Tab.Screen name={LABELS_NAV.PROFILE} component={ProfileScreen} />
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
