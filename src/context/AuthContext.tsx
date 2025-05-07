// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: (phoneNumber: string) => Promise<void>;
  signUp: (userData: any) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Check if user is signed in
    const checkSignInStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        // Add a minimum 2-second delay to show the loading screen
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSignedIn(userToken !== null);
      } catch (error) {
        console.error('Error checking sign in status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSignInStatus();
  }, []);

  const signIn = async (phoneNumber: string) => {
    // In a real app, you would validate the phone and make an API call
    setIsLoading(true);
    try {
      // Mock authentication - in a real app this would be a server call
      await AsyncStorage.setItem('userToken', 'dummy-auth-token');
      await AsyncStorage.setItem('userPhone', phoneNumber);
      // Add a delay to show loading screen
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSignedIn(true);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: any) => {
    // In a real app, you would make an API call to register
    setIsLoading(true);
    try {
      // Mock registration
      await AsyncStorage.setItem('userToken', 'dummy-auth-token');
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      // Add a delay to show loading screen
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSignedIn(true);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      setIsSignedIn(false);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isSignedIn,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};