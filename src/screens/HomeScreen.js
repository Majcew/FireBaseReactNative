import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import firebase from "firebase";
import FirebaseList from "../components/FirebaseList";

const HomeScreen = () => {
  const [fullList, setFullList] = useState([]);
  const [fullName, setFullName] = useState("");
  const [search, setSearch] = useState([]);
  const [uid, setUid] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const { displayName, uid } = firebase.auth().currentUser;
    setFullName(displayName);
    setUid(uid);
    fetchData(uid);
  }, []);

  const fetchData = (uid) => {
    firebase
      .database()
      .ref("users")
      .child(uid)
      .on("value", (response) => {
        const info = [];
        response.forEach((item) => {
          info.push({
            info: item.val(),
            key: item.key,
          });
        });
        setData(info);
        setFullList(info);
      });
  };

  const fetchWithString = () => {
    if (search === "") {
      setData(fullList);
    } else {
      let temp = [];
      fullList.forEach((item) => {
        if (
          item.info.title.toLowerCase().includes(search.toLowerCase()) ||
          item.info.author.toLowerCase().includes(search.toLowerCase()) ||
          item.info.tag.toLowerCase().includes(search.toLowerCase())
        ) {
          temp.push({
            info: item.info,
            key: item.key,
          });
        }
      });
      setData(temp);
    }
  };

  return (
    <View style={(styles.container, { paddingTop: 32 })}>
      <Text style={[{ textAlign: "center" }]}>Welcome {fullName}</Text>
      <View style={[styles.form, { marginTop: 32 }]}>
        <View>
          <Text style={styles.inputTitle}>Search</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(filter) => {
              setSearch(filter);
              fetchWithString();
            }}
            value={search}
          ></TextInput>
          <FirebaseList data={data} uid={uid} />
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
    marginBottom: 255,
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
