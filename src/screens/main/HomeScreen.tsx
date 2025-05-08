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
        {/* Header with logo and black border bottom */}
        <View style={styles.header}>
          <Image
            source={require('../../../assets/ee_logo.png')}
            style={styles.logo}
          />
        </View>
        
        {/* Black section title */}
        <Text style={styles.sectionTitle}>Rewards Progress</Text>
        
        <View style={styles.rewardsProgress}>
          <Text style={styles.rewardsText}>0</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.rewardsText}>100</Text>
        </View>

        {/* Black section title */}
        <Text style={styles.sectionTitle}>Services</Text>
        
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItemPrimary}
            onPress={() => navigation.navigate('GoUnlimited')}
          >
            <Text style={styles.menuItemText}>Go Unlimited</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('BuySingleWash')}
          >
            <Text style={styles.menuItemText}>Buy Single Wash</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}
          onPress={() => navigation.navigate('ManageMembership')}>
            <Text style={styles.menuItemText}>Manage Membership</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Wash Wallet</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => navigation.navigate('Locations')}
          >
            <Text style={styles.menuItemText}>Our Locations</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Redeem Wash</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.signOutButton}
            onPress={signOut}
          >
            <Text style={styles.menuItemText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Black border top for tab bar */}
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
    backgroundColor: '#e6f0d0', // Light green background
  },
  header: {
    backgroundColor: '#3498db', // Blue header
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderBottomWidth: 3, // Added black border at bottom
    borderBottomColor: '#222', // Dark, almost black color
  },
  logo: {
    width: 180,
    height: 90,
    resizeMode: 'contain',
  },
  // New section title style with black
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222', // Dark, almost black
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1, // Subtle bottom border
    borderBottomColor: 'rgba(0,0,0,0.1)', // Very light black
  },
  rewardsProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1, // Very subtle black border
    borderColor: 'rgba(0,0,0,0.05)', // Very light black
  },
  rewardsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222', // Darker black text
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 10,
    borderWidth: 1, // Subtle border
    borderColor: 'rgba(0,0,0,0.1)', // Very light black
  },
  progressFill: {
    width: '30%',
    height: '100%',
    backgroundColor: '#a0ce4e',
    borderRadius: 5,
  },
  menuContainer: {
    padding: 15,
  },
  menuItem: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: "#000", // Black shadow
    shadowOffset: { width: 0, height: 4 }, // More pronounced shadow
    shadowOpacity: 0.2, // Stronger shadow
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1, // Subtle black border
    borderColor: 'rgba(0,0,0,0.1)', // Very light black
  },
  menuItemPrimary: {
    backgroundColor: '#a0ce4e',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: "#000", // Black shadow
    shadowOffset: { width: 0, height: 4 }, // More pronounced shadow
    shadowOpacity: 0.2, // Stronger shadow
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1, // Subtle black border
    borderColor: 'rgba(0,0,0,0.1)', // Very light black
  },
  menuItemText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.3)', // Subtle black text shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  signOutButton: {
    backgroundColor: '#e74c3c',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: "#000", // Black shadow
    shadowOffset: { width: 0, height: 4 }, // More pronounced shadow
    shadowOpacity: 0.2, // Stronger shadow
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1, // Subtle black border
    borderColor: 'rgba(0,0,0,0.2)', // Very light black
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1, // Thicker black border top
    borderTopColor: '#222', // Dark, almost black
    backgroundColor: 'white',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,

  },
  tabText: {
    fontSize: 14,
    color: '#888',
    padding: 0,
    margin:0,
  },
  activeTab: {
    color: '#3498db',
    fontWeight: 'bold',
  },
});