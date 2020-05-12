import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AddSerial = () => {
  return (
    <View style={styles.container}>
      <Text>Here you will add Serials</Text>
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

export default AddSerial;
