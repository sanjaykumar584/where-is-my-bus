import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from "axios";
import * as Location from 'expo-location';

function LocationProviderPage() {  
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://192.168.29.205:3001/api');
  //       setData(response.data);
  //       console.log("New Login")
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  // }, [])

  
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        getLocation();
      }
    })();
  }, []);

  const getLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      locationCoords = location.coords
      setLocation(locationCoords);
      console.log(locationCoords.latitude + " " + locationCoords.longitude)
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* {data ? (
        <Text>{data}</Text>
      ) : (
        <Text>Loading...</Text>
      )} */}
      <Text>Welcome to WhereIsMyBus</Text>
      <Text>Latitude: {location?.latitude}</Text>
      <Text>Longitude: {location?.longitude}</Text>
      <Button title="Get Location" onPress={getLocation} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LocationProviderPage