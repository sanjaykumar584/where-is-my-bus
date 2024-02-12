import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LocationProviderPage from './src/components/LocationProviderPage';
import Login from './src/containers/Login';

const App = () => {
  return (
    <Login />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
