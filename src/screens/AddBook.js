import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AddBook = () => {
  return (
    <View style={styles.container}>
      <Text>Here you will add Books!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddBook;
