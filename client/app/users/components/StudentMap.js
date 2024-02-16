import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const StudentMap = () => {
  const [location, setLocation] = useState(null);
  const [seatCapacity, setSeatCapacity] = useState(100);

  const fetchSeatCapacity = async () => {
    try {
      const response = await axios.get('http://192.168.29.205:3001/api/seatCapacity');
      const Data = response.data;
      setSeatCapacity(response.data);
    } catch (error) {
      console.error('Error fetching seat capacity:', error);
    }
  }
  fetchSeatCapacity();

  useEffect(() => {
    // Fetch initial location
    const fetchLocation = async () => {
      try {
        const response = await axios.get('http://192.168.29.205:3001/api/location');
        const locationData = response.data;
        console.log(locationData);
        setLocation(locationData);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };
    fetchLocation();
    fetchSeatCapacity();

    const fetchDataAndUpdate = async () => {
      await fetchLocation();
      await fetchSeatCapacity();
    };

    // Fetch location updates every 5 seconds
    const locationInterval = setInterval(fetchDataAndUpdate, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(locationInterval);
  }, [seatCapacity]);

  const vacancyColor = () => {
    if (seatCapacity == 100) {
      return "green";
    } else if (seatCapacity == 0) {
      return "red";
    } else if (seatCapacity > 50) {
      return "yellow";
    } else {
      return "orange";
    }
  }

  return (
    <View style={styles.container}>
      <Text>Student's Mobile App</Text>
      {location && (
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Crew's Location"
            description={`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
          >
            <Image
              source={require('../../../src/assets/bus-stop.png')}
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        </MapView>
      )}
      <Text style={styles.text}>Percentage Vacancy:{" "}
        <Text style={{...styles.percentage, color:vacancyColor()}}>{seatCapacity}%</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '80%',

     },
  text: {
    fontSize: 16,
    color: 'black',
  },
  percentage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StudentMap;
