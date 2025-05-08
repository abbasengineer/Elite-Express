// src/screens/main/subscription/GoUnlimitedScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/TabNavigator';

type Props = NativeStackScreenProps<HomeStackParamList, 'GoUnlimited'>;

// Mock data for subscription plans
const subscriptionPlans = [
  {
    id: '1',
    name: 'Express Unlimited',
    price: 24.99,
    features: ['Unlimited Express Washes', 'Valid for 1 vehicle', 'RFID tag for easy access'],
    recommended: false,
  },
  {
    id: '2',
    name: 'Elevate Unlimited',
    price: 29.99,
    features: ['Unlimited Elevate Washes', 'Valid for 1 vehicle', 'RFID tag for easy access', 'Rainbow Shine Wax'],
    recommended: false,
  },
  {
    id: '3',
    name: 'Elite Unlimited',
    price: 34.99,
    features: ['Unlimited Elite Washes', 'Valid for 1 vehicle', 'RFID tag for easy access', 'Rainbow Shine Wax', 'Armorall Ceramic Sealant'],
    recommended: true,
  },
  {
    id: '4',
    name: 'Elite Max Unlimited',
    price: 39.99,
    features: ['Unlimited Elite Max Washes', 'Valid for 1 vehicle', 'RFID tag for easy access', 'Rainbow Shine Wax', 'Armorall Ceramic Sealant', 'Rain-X Graphene Paint Protection'],
    recommended: false,
  }
];

export default function GoUnlimitedScreen({ navigation }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Unlimited Plans</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Select an Unlimited Subscription</Text>
        <Text style={styles.sectionSubtitle}>Wash your car as often as you like with our unlimited plans</Text>
        
        {subscriptionPlans.map(plan => (
          <TouchableOpacity 
            key={plan.id}
            style={[
              styles.planOption,
              selectedPlan === plan.id ? styles.selectedPlan : {},
              plan.recommended ? styles.recommendedPlan : {}
            ]}
            onPress={() => setSelectedPlan(plan.id)}
          >
            {plan.recommended && (
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedText}>Most Popular</Text>
              </View>
            )}
            
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.planPrice}>${plan.price}</Text>
                <Text style={styles.planPeriod}>/Month</Text>
              </View>
            </View>
            
            <View style={styles.planFeatures}>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <Text style={styles.featureText}>✓ {feature}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.disclaimer}>
          * Subscription will automatically renew each month. Cancel anytime.
        </Text>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selectedPlan ? styles.disabledButton : {}
          ]}
          disabled={!selectedPlan}
          onPress={() => {
            // In Phase 2, we'll navigate to vehicle selection
            // For now, just show an alert
            alert('You selected a subscription plan! In the future, you\'ll select a vehicle here.');
          }}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
  },
  planOption: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    position: 'relative',
  },
  selectedPlan: {
    borderColor: '#3498db',
  },
  recommendedPlan: {
    borderColor: '#8bc34a',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -10,
    right: 10,
    backgroundColor: '#8bc34a',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  recommendedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
  },
  planPeriod: {
    fontSize: 14,
    color: '#666',
    marginLeft: 2,
  },
  planFeatures: {
    marginTop: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  featureText: {
    color: '#555',
    fontSize: 14,
  },
  disclaimer: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 20,
  },
  footer: {
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  continueButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#b2d8f5',
  },
  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});