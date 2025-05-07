// src/screens/main/LocationsScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/TabNavigator';

type Props = NativeStackScreenProps<HomeStackParamList, 'Locations'>;

// Mock data for car wash locations
const carWashLocations = [
  {
    id: '1',
    name: 'Elite Express - Downtown',
    address: '123 Main St, Los Angeles, CA',
    latitude: 34.052235,
    longitude: -118.243683,
  },
  {
    id: '2',
    name: 'Elite Express - Burbank',
    address: '456 Oak Ave, Burbank, CA',
    latitude: 34.180840,
    longitude: -118.308968,
  },
  {
    id: '3',
    name: 'Elite Express - Santa Monica',
    address: '789 Beach Blvd, Santa Monica, CA',
    latitude: 34.019454,
    longitude: -118.491192,
  },
];

export default function LocationsScreen({ navigation }: Props) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Could not fetch location');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Our Locations</Text>
      </View>

      <View style={styles.mapContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#3498db" />
        ) : errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location?.coords.latitude || 34.052235,
              longitude: location?.coords.longitude || -118.243683,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
          >
            {carWashLocations.map(washLocation => (
              <Marker
                key={washLocation.id}
                coordinate={{
                  latitude: washLocation.latitude,
                  longitude: washLocation.longitude,
                }}
                title={washLocation.name}
                description={washLocation.address}
                pinColor="#3498db"
              />
            ))}
          </MapView>
        )}
      </View>

      <View style={styles.locationsList}>
        <Text style={styles.listTitle}>Nearby Locations</Text>
        {carWashLocations.map(washLocation => (
          <TouchableOpacity 
            key={washLocation.id}
            style={styles.locationItem}
          >
            <View>
              <Text style={styles.locationName}>{washLocation.name}</Text>
              <Text style={styles.locationAddress}>{washLocation.address}</Text>
            </View>
            <TouchableOpacity style={styles.directionsButton}>
              <Text style={styles.directionsButtonText}>Directions</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
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
  mapContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  locationsList: {
    flex: 1,
    padding: 15,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  locationItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  directionsButton: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  directionsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});