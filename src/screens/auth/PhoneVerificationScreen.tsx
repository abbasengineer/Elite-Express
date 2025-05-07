// src/screens/auth/PhoneVerificationScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../context/AuthContext';

type RootStackParamList = {
  PhoneVerification: undefined;
  SignUp: undefined;
  Main: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'PhoneVerification'>;

export default function PhoneVerificationScreen({ navigation }: Props) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [agreed, setAgreed] = useState(false);
    const { signIn } = useAuth();
    
    // Add a function to handle signing in:
    const handleNext = async () => {
      if (phoneNumber && agreed) {
        try {
          // Here you would typically verify the phone number with an SMS code
          // For now we'll just navigate to sign up
          navigation.navigate('SignUp');
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => {}}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/ee_logo.png')}
          style={styles.logo}
        />
        <Text style={styles.logoText}>ELITE EXPRESS</Text>
      </View>
      
      <Text style={styles.title}>Please enter your mobile phone number</Text>
      
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        placeholderTextColor="#aaa"
      />
      
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, agreed && styles.checkboxChecked]}
          onPress={() => setAgreed(!agreed)}
        >
          {agreed && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.termsText}>
          I agree (or if a minor, my parent or legal guardian agrees) to the{' '}
          <Text style={styles.linkText}>Terms of Use</Text> and{' '}
          <Text style={styles.linkText}>Privacy Statement</Text> and that Elite Express may send me autodialed
          text messages to authenticate my phone number.
        </Text>
      </View>
      
      <TouchableOpacity 
        style={[styles.button, phoneNumber && agreed ? styles.buttonActive : {}]}
        onPress={() => navigation.navigate('SignUp')}
        disabled={!phoneNumber || !agreed}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      
      <View style={styles.signUpContainer}>
        <Text style={styles.noAccountText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 20,
  },
  backButton: {
    marginTop: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 28,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: 'white',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#f5f5f5',
  },
  checkmark: {
    color: '#3498db',
    fontSize: 16,
  },
  termsText: {
    color: 'white',
    flex: 1,
    fontSize: 14,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#ccc',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonActive: {
    backgroundColor: '#f5f5f5',
  },
  buttonText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
  noAccountText: {
    color: 'white',
    marginBottom: 5,
  },
  signUpText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});