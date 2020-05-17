import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import firebase from "firebase";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged((user) => {
        navigation.navigate(user ? "App" : "Auth");
      });
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Loading the app!</Text>
      <Image
        style={{ width: 300, height: 200 }}
        source={{
          uri:
            "https://i.pinimg.com/originals/71/0f/da/710fda642bedd21a8279e3c1899f11e8.gif",
        }}
      />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
