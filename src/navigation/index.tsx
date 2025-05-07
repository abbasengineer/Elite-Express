// src/navigation/index.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

// Auth Screens
import PhoneVerificationScreen from '../screens/auth/PhoneVerificationScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

// Main Screens
import TabNavigator from './TabNavigator';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../screens/main/LoadingScreen';

// Define the types for our navigation
export type RootStackParamList = {
  PhoneVerification: undefined;
  SignUp: undefined;
  MainApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const { isLoading, isSignedIn } = useAuth();
  
  if (isLoading) {
    // Use the loadingScreen component if it's accessible, otherwise use a fallback
    return <LoadingScreen />;
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: '#3498db' }
        }}
      >
        {!isSignedIn ? (
          // Auth screens
          <>
            <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          // Main app screens
          <Stack.Screen name="MainApp" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}