import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Login = () => {
    const [user, setUser] = useState();

    crewButtonClick = () => {
        setUser("crew");
    }

    studentButtonClick = () => {
        setUser("student");
    }

    useEffect(() => {
      console.log(user)
    }, [user])
    

  return (
    <View style={styles.container}>
        <Button title='Crew' onPress={crewButtonClick} />
        <Button title='Student' onPress={studentButtonClick} />
    </View>
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

export default Login;