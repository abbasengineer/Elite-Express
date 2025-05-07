// src/screens/main/BuySingleWashScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/TabNavigator';

type Props = NativeStackScreenProps<HomeStackParamList, 'BuySingleWash'>;

// Mock data for wash types
const washTypes = [
    {
        id: '1',
        name: 'Express Single Wash',
        price: 10,
        features: ['Eco Wash', 'Spot-Free Rinse', 'Power Dry', 'Free Vacuums']
      },
      {
        id: '2',
        name: 'Elevate Single Wash',
        price: 18,
        features: ['Includes Express Plus:', 'Rainbow Shine Wax', 'Blue Coral Wheel Brightener']
      },
      {
        id: '3',
        name: 'Elite Wash',
        price: 22,
        features: ['Includes Elevate Plus:', 'Armorall Ceramic Sealant', 'Armorall Tire Dressing']
      },
      {
        id: '4',
        name: 'Elite Max Wash',
        price: 27,
        features: ['Includes Elite Plus:', 'Deep Clean Dirt Buster Soak', 'Rain-X Graphene Paint Protection']
      }
];

export default function BuySingleWashScreen({ navigation }: Props) {
  const [selectedWash, setSelectedWash] = useState<string | null>(null);
  
  const handlePurchase = () => {
    // In the future, this would integrate with a payment processor
    // For now, we'll just navigate back to the home screen
    alert('Thank you for your purchase!');
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buy Single Wash</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Select a Wash Package</Text>
        
        {washTypes.map(wash => (
          <TouchableOpacity 
            key={wash.id}
            style={[
              styles.washOption,
              selectedWash === wash.id ? styles.selectedWash : {}
            ]}
            onPress={() => setSelectedWash(wash.id)}
          >
            <View style={styles.washHeader}>
              <Text style={styles.washName}>{wash.name}</Text>
              <Text style={styles.washPrice}>${wash.price}</Text>
            </View>
            
            <View style={styles.washFeatures}>
              {wash.features.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <Text style={styles.featureText}>✓ {feature}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.purchaseButton,
            !selectedWash ? styles.disabledButton : {}
          ]}
          disabled={!selectedWash}
          onPress={handlePurchase}
        >
          <Text style={styles.purchaseButtonText}>Purchase Wash</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  washOption: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  selectedWash: {
    borderColor: '#3498db',
  },
  washHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  washName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  washPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  washFeatures: {
    marginTop: 5,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
  },
  featureText: {
    color: '#555',
    fontSize: 14,
  },
  footer: {
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  purchaseButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#b2d8f5',
  },
  purchaseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});