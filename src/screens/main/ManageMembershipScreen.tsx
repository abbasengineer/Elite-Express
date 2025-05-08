// src/screens/main/ManageMembershipScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/TabNavigator';

type Props = NativeStackScreenProps<HomeStackParamList, 'ManageMembership'>;

// Management options for dropdown
const managementOptions = [
  { id: 'select', label: 'Select request...' },
  { id: 'change', label: 'Change membership' },
  { id: 'email', label: 'Email latest receipt' },
  { id: 'payment', label: 'Update payment method' },
  { id: 'cancel', label: 'Cancel membership' },
  { id: 'pause', label: 'Pause membership' },
];

// Mock user data (in a real app, this would come from your backend)
const mockUserData = {
  id: '12345',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '(123) 456-7890',
  membershipType: 'Premium Unlimited',
  membershipStatus: 'Active',
  barcode: 'EE-12345-6789',
  licensePlate: 'ABC123',
  state: 'CA',
  location: 'Downtown',
  nextBillingDate: '06/01/2025',
  lastVisit: '05/01/2025',
};

export default function ManageMembershipScreen({ navigation }: Props) {
  // State
  const [userData, setUserData] = useState(mockUserData);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('select');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  // Action-specific states
  const [showChangeOptions, setShowChangeOptions] = useState(false);
  const [showReceiptConfirmation, setShowReceiptConfirmation] = useState(false);
  const [showPaymentUpdate, setShowPaymentUpdate] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showPauseOptions, setShowPauseOptions] = useState(false);
  
  // Success message
  const [successMessage, setSuccessMessage] = useState('');

  // Simulate loading user data from backend
  useEffect(() => {
    // In a real app, this would fetch data from your API
    const fetchUserData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchUserData();
  }, []);

  // Handle selection change
  useEffect(() => {
    // Reset all action screens
    setShowChangeOptions(false);
    setShowReceiptConfirmation(false);
    setShowPaymentUpdate(false);
    setShowCancelConfirmation(false);
    setShowPauseOptions(false);
    
    // Show appropriate screen based on selection
    if (selectedOption === 'change') {
      setShowChangeOptions(true);
    } else if (selectedOption === 'email') {
      setShowReceiptConfirmation(true);
    } else if (selectedOption === 'payment') {
      setShowPaymentUpdate(true);
    } else if (selectedOption === 'cancel') {
      setShowCancelConfirmation(true);
    } else if (selectedOption === 'pause') {
      setShowPauseOptions(true);
    }
  }, [selectedOption]);

  // Handle request submission
  const handleSubmitRequest = (action: string, details?: string) => {
    // In a real app, this would make an API call
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      const actionMap: {[key: string]: string} = {
        'change': 'change your membership',
        'email': 'email your latest receipt',
        'payment': 'update your payment method',
        'cancel': 'cancel your membership',
        'pause': 'pause your membership'
      };
      
      setSuccessMessage(`Your request to ${actionMap[action]} has been submitted. ${details || ''}`);
      setSelectedOption('select');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }, 1500);
  };

  // Get label for selected option
  const getOptionLabel = (id: string) => {
    const option = managementOptions.find(opt => opt.id === id);
    return option ? option.label : 'Select request...';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Manage My Unlimited Membership</Text>
        </View>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3498db" />
            <Text style={styles.loadingText}>Loading your membership details...</Text>
          </View>
        ) : (
          <>
            {/* Membership Information Card */}
            <View style={styles.membershipCard}>
              <Text style={styles.membershipTitle}>Current Membership</Text>
              <View style={styles.membershipInfoRow}>
                <Text style={styles.membershipLabel}>Member:</Text>
                <Text style={styles.membershipValue}>{userData.firstName} {userData.lastName}</Text>
              </View>
              <View style={styles.membershipInfoRow}>
                <Text style={styles.membershipLabel}>Plan:</Text>
                <Text style={styles.membershipValue}>{userData.membershipType}</Text>
              </View>
              <View style={styles.membershipInfoRow}>
                <Text style={styles.membershipLabel}>Status:</Text>
                <Text style={[
                  styles.membershipValue, 
                  styles.statusBadge,
                  userData.membershipStatus === 'Active' ? styles.statusActive : styles.statusInactive
                ]}>
                  {userData.membershipStatus}
                </Text>
              </View>
              <View style={styles.membershipInfoRow}>
                <Text style={styles.membershipLabel}>License Plate:</Text>
                <Text style={styles.membershipValue}>{userData.licensePlate} ({userData.state})</Text>
              </View>
              <View style={styles.membershipInfoRow}>
                <Text style={styles.membershipLabel}>Barcode:</Text>
                <Text style={styles.membershipValue}>{userData.barcode}</Text>
              </View>
              <View style={styles.membershipInfoRow}>
                <Text style={styles.membershipLabel}>Location:</Text>
                <Text style={styles.membershipValue}>{userData.location}</Text>
              </View>
              <View style={styles.membershipInfoRow}>
                <Text style={styles.membershipLabel}>Next Billing:</Text>
                <Text style={styles.membershipValue}>{userData.nextBillingDate}</Text>
              </View>
              <View style={styles.membershipInfoRow}>
                <Text style={styles.membershipLabel}>Last Visit:</Text>
                <Text style={styles.membershipValue}>{userData.lastVisit}</Text>
              </View>
            </View>
            
            {/* Request Type Dropdown */}
            <Text style={styles.sectionTitle}>I want to</Text>
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setDropdownVisible(!dropdownVisible)}
              >
                <Text style={styles.dropdownButtonText}>
                  {getOptionLabel(selectedOption)}
                </Text>
                <Text style={styles.dropdownIcon}>{dropdownVisible ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              
              {dropdownVisible && (
                <View style={styles.dropdownList}>
                  {managementOptions.map(option => (
                    option.id !== 'select' && (
                      <TouchableOpacity
                        key={option.id}
                        style={[
                          styles.dropdownItem,
                          selectedOption === option.id && styles.dropdownItemSelected
                        ]}
                        onPress={() => {
                          setSelectedOption(option.id);
                          setDropdownVisible(false);
                        }}
                      >
                        <Text style={[
                          styles.dropdownItemText,
                          selectedOption === option.id && styles.dropdownItemTextSelected
                        ]}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    )
                  ))}
                </View>
              )}
            </View>
            
            {/* Action-specific content */}
            {showChangeOptions && (
              <View style={styles.actionContainer}>
                <Text style={styles.actionTitle}>Change Membership Options</Text>
                <Text style={styles.actionDescription}>
                  Select a new membership plan below. Changes will take effect on your next billing date: {userData.nextBillingDate}.
                </Text>
                
                <TouchableOpacity 
                  style={[styles.planOption, styles.activePlan]}
                  disabled={true}
                >
                  <View style={styles.planOptionHeader}>
                    <Text style={styles.planOptionTitle}>{userData.membershipType}</Text>
                    <Text style={styles.planOptionPrice}>$24.99/mo</Text>
                  </View>
                  <Text style={styles.planOptionDescription}>Your current plan</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.planOption}>
                  <View style={styles.planOptionHeader}>
                    <Text style={styles.planOptionTitle}>Basic Unlimited</Text>
                    <Text style={styles.planOptionPrice}>$19.99/mo</Text>
                  </View>
                  <Text style={styles.planOptionDescription}>Unlimited basic washes with free vacuums</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.planOption}>
                  <View style={styles.planOptionHeader}>
                    <Text style={styles.planOptionTitle}>Elite Unlimited</Text>
                    <Text style={styles.planOptionPrice}>$29.99/mo</Text>
                  </View>
                  <Text style={styles.planOptionDescription}>Unlimited premium washes with all features</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleSubmitRequest('change', 'You will receive an email confirmation shortly.')}
                >
                  <Text style={styles.actionButtonText}>Confirm Change</Text>
                </TouchableOpacity>
              </View>
            )}
            
            {showReceiptConfirmation && (
              <View style={styles.actionContainer}>
                <Text style={styles.actionTitle}>Email Latest Receipt</Text>
                <Text style={styles.actionDescription}>
                  We will send your latest receipt to the email address on file: {userData.email}
                </Text>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleSubmitRequest('email', 'Check your email inbox for your receipt.')}
                >
                  <Text style={styles.actionButtonText}>Send Receipt</Text>
                </TouchableOpacity>
              </View>
            )}
            
            {showPaymentUpdate && (
              <View style={styles.actionContainer}>
                <Text style={styles.actionTitle}>Update Payment Method</Text>
                <Text style={styles.actionDescription}>
                  For security reasons, payment information must be updated through our secure payment portal.
                </Text>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleSubmitRequest('payment', 'You will receive an email with instructions to update your payment method.')}
                >
                  <Text style={styles.actionButtonText}>Send Payment Update Link</Text>
                </TouchableOpacity>
              </View>
            )}
            
            {showCancelConfirmation && (
              <View style={styles.actionContainer}>
                <Text style={styles.actionTitle}>Cancel Membership</Text>
                <Text style={styles.actionDescription}>
                  We're sorry to see you go! Your membership will remain active until the end of your current billing period on {userData.nextBillingDate}.
                </Text>
                
                <View style={styles.warningBox}>
                  <Text style={styles.warningText}>
                    Warning: This action cannot be undone. You will need to sign up again if you want to reactivate your membership.
                  </Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.actionButtonDanger}
                  onPress={() => handleSubmitRequest('cancel', 'Your membership will be cancelled at the end of the current billing period.')}
                >
                  <Text style={styles.actionButtonText}>Confirm Cancellation</Text>
                </TouchableOpacity>
              </View>
            )}
            
            {showPauseOptions && (
              <View style={styles.actionContainer}>
                <Text style={styles.actionTitle}>Pause Membership</Text>
                <Text style={styles.actionDescription}>
                  You can pause your membership for up to 3 months. During this time, you won't be charged and your membership benefits will be temporarily suspended.
                </Text>
                
                <Text style={styles.inputLabel}>Select pause duration:</Text>
                <View style={styles.pauseOptionsContainer}>
                  <TouchableOpacity style={[styles.pauseOption, styles.pauseOptionSelected]}>
                    <Text style={styles.pauseOptionText}>1 Month</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.pauseOption}>
                    <Text style={styles.pauseOptionText}>2 Months</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.pauseOption}>
                    <Text style={styles.pauseOptionText}>3 Months</Text>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleSubmitRequest('pause', 'Your membership will be paused for 1 month starting from your next billing date.')}
                >
                  <Text style={styles.actionButtonText}>Confirm Pause</Text>
                </TouchableOpacity>
              </View>
            )}
            
            {/* Success Message */}
            {successMessage ? (
              <View style={styles.successMessage}>
                <Text style={styles.successMessageText}>{successMessage}</Text>
              </View>
            ) : null}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0d0', // Light green background
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#3498db',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#222',
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  membershipCard: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  membershipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  membershipInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  membershipLabel: {
    fontWeight: 'bold',
    color: '#555',
    fontSize: 14,
  },
  membershipValue: {
    color: '#333',
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statusActive: {
    backgroundColor: '#dff2bf',
    color: '#4f8a10',
  },
  statusInactive: {
    backgroundColor: '#ffbaba',
    color: '#d8000c',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
  },
  dropdownContainer: {
    marginHorizontal: 15,
    marginVertical: 5,
    zIndex: 1000,
    position: 'relative',
  },
  dropdownButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonText: {
    color: '#444',
  },
  dropdownIcon: {
    color: '#444',
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 2,
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1001,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemSelected: {
    backgroundColor: '#e8f4f8',
  },
  dropdownItemText: {
    color: '#444',
  },
  dropdownItemTextSelected: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  actionContainer: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },
  actionDescription: {
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  actionButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  actionButtonDanger: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  warningBox: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeeba',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  warningText: {
    color: '#856404',
  },
  planOption: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  activePlan: {
    borderColor: '#3498db',
    borderWidth: 2,
    backgroundColor: '#ebf7ff',
  },
  planOptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  planOptionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  planOptionPrice: {
    fontWeight: 'bold',
    color: '#3498db',
  },
  planOptionDescription: {
    color: '#666',
    fontSize: 14,
  },
  inputLabel: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },
  pauseOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  pauseOption: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  pauseOptionSelected: {
    backgroundColor: '#e8f4f8',
    borderColor: '#3498db',
  },
  pauseOptionText: {
    color: '#444',
  },
  successMessage: {
    margin: 15,
    backgroundColor: '#dff2bf',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4f8a10',
  },
  successMessageText: {
    color: '#4f8a10',
  },
});