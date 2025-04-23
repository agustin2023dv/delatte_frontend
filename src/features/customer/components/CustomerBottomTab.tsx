// src/features/customer/components/CustomerBottomTab.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

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
          } else if (route.name === 'Reservas') {
            iconName = focused ? 'calendar-check' : 'calendar-check-outline';
          } else if (route.name === 'Promociones') {
            iconName = focused ? 'tag' : 'tag-outline';
          } else if (route.name === 'Reseñas') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'Perfil') {
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
      <Tab.Screen name="Reservas" component={ReservationsScreen} />
      <Tab.Screen name="Promociones" component={PromotionsScreen} />
      <Tab.Screen name="Reseñas" component={ReviewsScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
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
