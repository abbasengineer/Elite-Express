// src/screens/auth/SignUpScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../context/AuthContext';

type RootStackParamList = {
  PhoneVerification: undefined;
  SignUp: undefined;
  MainApp: undefined;  // Changed from 'Main' to 'MainApp'
};

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  
  const { signUp } = useAuth();
  
  const handleSignUp = async () => {
    try {
      const userData = {
        firstName,
        lastName,
        phoneNumber,
        email,
        streetAddress,
        zipCode,
        state,
        city,
      };
      
      await signUp(userData);
      // The navigation to MainApp will happen automatically through the auth state change
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Sign Up</Text>
        
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
          placeholderTextColor="#aaa"
        />
        
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
          placeholderTextColor="#aaa"
        />
        
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number *"
          keyboardType="phone-pad"
          placeholderTextColor="#aaa"
        />
        
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail address *"
          keyboardType="email-address"
          placeholderTextColor="#aaa"
        />
        
        <TextInput
          style={styles.input}
          value={streetAddress}
          onChangeText={setStreetAddress}
          placeholder="Street Address"
          placeholderTextColor="#aaa"
        />
        
        <TextInput
          style={styles.input}
          value={zipCode}
          onChangeText={setZipCode}
          placeholder="ZipCode"
          keyboardType="numeric"
          placeholderTextColor="#aaa"
        />
        
        <TextInput
          style={styles.input}
          value={state}
          onChangeText={setState}
          placeholder="State"
          placeholderTextColor="#aaa"
        />
        
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="City"
          placeholderTextColor="#aaa"
        />
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 28,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'transparent',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});