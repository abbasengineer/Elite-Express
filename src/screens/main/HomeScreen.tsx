// src/screens/main/HomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/TabNavigator';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeScreen'>;

export default function HomeScreen({ navigation }: Props) {
  const { signOut } = useAuth();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={require('../../../assets/ee_logo.png')}
            style={styles.logo}
          />
        </View>
        
        <View style={styles.rewardsProgress}>
          <Text style={styles.rewardsText}>0</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.rewardsText}>100</Text>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Go Unlimited</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('BuySingleWash')}
          >
            <Text style={styles.menuItemText}>Buy Single Wash</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Buy Washbook</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Wash Wallet</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Locations')}>
            <Text style={styles.menuItemText}>Our Locations</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Redeem Wash</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: '#e74c3c' }]}
            onPress={signOut}
          >
            <Text style={styles.menuItemText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={[styles.tabText, styles.activeTab]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>History</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
  },
  rewardsProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  rewardsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  progressFill: {
    width: '0%', // This would be dynamic based on rewards
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  menuContainer: {
    padding: 15,
  },
  menuItem: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2980b9',
  },
  menuItemText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: 'white',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 14,
    color: '#888',
  },
  activeTab: {
    color: '#3498db',
    fontWeight: 'bold',
  },
});