import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import firebase from "firebase";

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState({ data: "nothing", name: "something" });

  useEffect(() => {
    const { email, displayName } = firebase.auth().currentUser;
    setEmail(email);
    setFullName(displayName);
  }, []);

  return (
    <View style={(styles.container, { marginTop: 52 })}>
      <Text style={[{ textAlign: "center" }]}>Welcome {fullName}</Text>
      <View style={[styles.form, { marginTop: 32 }]}>
        <View>
          <Text style={styles.inputTitle}>Search</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(filter) => setSearch(filter)}
            value={search}
          ></TextInput>
        </View>
        <View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text>Kupa {index}</Text>}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
});
