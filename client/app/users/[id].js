// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import MapViewComponent from './components/MapViewComponent';

// const UserPage = () => {
//   const latitude = 13.0853742;
//   const longitude = 80.1827546;

//   return (
//     <View style={styles.container}>
//       <MapViewComponent latitude={latitude} longitude={longitude} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default UserPage;

import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const LiveMap = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocationAsync = async () => {
      let hasLocationPermission = await Geolocation.requestForegroundPermissions();

      if (!hasLocationPermission) {
        console.error('Permission to access location was denied');
        return;
      }

      Geolocation.watchPosition(
        (position) => {
          setLocation(position.coords);
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true, distanceFilter: 5 }
      );
    };

    getLocationAsync();
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      region={{
        latitude: location ? location.latitude : 37.78825,
        longitude: location ? location.longitude : -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {location && <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />}
    </MapView>
  );
};

export default LiveMap;
