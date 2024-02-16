import { View, Text, Button, StyleSheet } from "react-native";
import { Link, router } from "expo-router";

const HomePage = () => {
    return (
        <View style={styles.container}>
            <Text >Where's My Bus</Text>
            <Button title="Student" onPress={() => {router.push(`/users/StudentApp`)}}/>
            <Button title="Crew" onPress={() => {router.push("/crew/CrewApp")}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default HomePage