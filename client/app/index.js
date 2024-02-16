import { View, Text, Button, StyleSheet } from "react-native";
import { Link, router } from "expo-router";

const App = () => {
    return (
        <View style={styles.container}>
            <Text >Where's My Bus</Text>
            <Button title="Student" onPress={() => {router.push(`/users/components/StudentMap`)}}/>
            <Button title="Crew" onPress={() => {router.push("/crew/components/CrewMap")}}/>
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

export default App