import React from "react";
import { View, Button, StyleSheet } from "react-native";

function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Button
                title="7th Standard"
                onPress={() => navigation.navigate("7thStandard")}
                color="#6a11cb"
            />
            <Button
                title="8th Standard"
                onPress={() => navigation.navigate("8thStandard")}
                color="#ff7e5f"
            />
            <Button
                title="9th Standard"
                onPress={() => navigation.navigate("9thStandard")}
                color="#00b09b"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
});

export default HomeScreen;
