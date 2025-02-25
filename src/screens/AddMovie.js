import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, CheckBox } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tag, setTag] = useState("Movie");
  const [state, setState] = useState(false);
  const [uid, setUid] = useState("");

  useEffect(() => {
    setUid(firebase.auth().currentUser.uid);
  });

  const addToFirebase = () => {
    //funkcja dodająca obiekt do firebase (tylko dla danego użytkownika)
    firebase
      .database()
      .ref("users/" + uid)
      .push({
        title: title,
        author: author,
        tag: tag,
        state: state,
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Text style={[{ marginTop: 32 }, { textAlign: "center" }]}>
        Here you will add Movies !
      </Text>
      <View style={[styles.form, { marginTop: 32 }]}>
        <View>
          <Text style={styles.inputTitle}>Title</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(name) => setTitle(name)}
            value={title}
          ></TextInput>
        </View>

        <View style={{ marginTop: 32 }}>
          <Text style={styles.inputTitle}>Author</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(name) => setAuthor(name)}
            value={author}
          ></TextInput>
        </View>
        <View
          style={[
            { marginTop: 32 },
            { alignItems: "center" },
            { flexDirection: "row" },
          ]}
        >
          <CheckBox
            value={state}
            onValueChange={() => {
              setState(!state);
            }}
          />
          <Text style={{ marginLeft: 32 }}>Have you seen the movie?</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={addToFirebase}>
        <Text style={{ color: "#FFF", fontWeight: "500" }}>
          Add to Firebase
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default AddMovie;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
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
