import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

const StudentApp = () => {
  const [busList, setBusList] = useState([]);

  const fetchBusList = async () => {
    try {
      const response = await axios.get('http://192.168.29.205:3001/api/busList');
      const busData = response.data;
      setBusList(busData);
    } catch (error) {
      console.error('Error fetching bus data:', error);
    }
  };

  useEffect(() => {
    fetchBusList();
  }, []);

  const busButton = async (busNumber) => {
    try {
      const response = await axios.post('http://192.168.29.205:3001/api/getBusLocation', {
        busNumber: busNumber,
        method: "get"
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error('Error fetching bus data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>This is the Student's app</Text>
      {busList.map((busNumber, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => busButton(busNumber)}
          style={{ marginVertical: 10, padding: 10, backgroundColor: 'grey' }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>{busNumber}</Text>
        </TouchableOpacity>
      ))}
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

export default StudentApp;
