import React, { useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import firebase from "firebase";

const HomeScreen = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [search, setSearch] = useState("");
  const [uid, setUid] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const { email, displayName, uid } = firebase.auth().currentUser;
    setEmail(email);
    setFullName(displayName);
    setUid(uid);
    firebase
      .database()
      .ref("users/" + uid)
      .once("value")
      .then((response) => {
        setData(response.val());
      });
  }, []);

  useLayoutEffect(() => {}, [data]);

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
          <FlatList
            style={[{ marginTop: 32 }, { backgroundColor: "orange" }]}
            data={data}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>
                  Author: {item.author} Tag: {item.tag}
                </Text>
                <Text>Title: {item.title}</Text>
              </View>
            )}
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
