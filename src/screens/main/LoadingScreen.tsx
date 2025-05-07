// src/screens/LoadingScreen.tsx
import React from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/ee_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>ELITE EXPRESS</Text>
      <Text style={styles.subtitle}>CAR WASH</Text>
      <ActivityIndicator 
        size="large" 
        color="white" 
        style={styles.loader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  }
});