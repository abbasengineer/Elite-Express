// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import HomeScreen from '../screens/main/HomeScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import BuySingleWashScreen from '../screens/main/BuySingleWashScreen';
import LocationsScreen from '../screens/main/LocationsScreen';

// Define the types for our tab navigation
export type RootTabParamList = {
  HomeStack: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  BuySingleWash: undefined;
  Locations: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

// Create a stack navigator for the Home tab
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="BuySingleWash" component={BuySingleWashScreen} />
      <HomeStack.Screen name="Locations" component={LocationsScreen} />
    </HomeStack.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#eee',
        }
      }}
    >
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStackNavigator} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color, fontSize: 16 }}>🏠</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color, fontSize: 16 }}>👤</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}