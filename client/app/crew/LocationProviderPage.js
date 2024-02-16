import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from "axios";
import * as Location from 'expo-location';

function LocationProviderPage() {
  const [location, setLocation] = useState(null);
  const [locationData, setLocationData] = useState({});

  let locationInterval;

  useEffect(() => {
    let locationInterval;
  
    const getLocationAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
  
      locationInterval = setInterval(async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        const newLocationData = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        };
        setLocationData(newLocationData);
        sendLocationToServer(newLocationData);
        console.log(newLocationData.latitude + " " + newLocationData.longitude);
      }, 5000);
    };
  
    const sendLocationToServer = async (newLocationData) => {
      try {
        const response = await axios.post('http://192.168.29.205:3001/api/location', { locationData: newLocationData });
      } catch (error) {
        console.error('Error sending location to server:', error);
      }
    };
  
    getLocationAsync();
  
    // Cleanup function
    return () => {
      if (locationInterval) {
        clearInterval(locationInterval);
        console.log('Location interval cleared');
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Crew's Mobile App</Text>
      {location && (
        <MapView
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Crew's Location"
            description={`Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`}
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationProviderPage;
