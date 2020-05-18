import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  CheckBox,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";

export const Popup = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tag, setTag] = useState("Book");
  const [state, setState] = useState(false);
  const [uid, setUid] = useState("");
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    setVisibility(props.visibility);
    setUid(firebase.auth().currentUser.uid);
  }, [props.visibility]);

  useEffect(() => {
    if (props.edit) {
      setAuthor(props.edit.info.author);
      setState(props.edit.info.state);
      setTag(props.edit.info.tag);
      setTitle(props.edit.info.title);
    }
  }, [props.edit]);

  const updateRecord = () => {
    firebase
      .database()
      .ref("users/" + uid + "/" + props.edit.key)
      .set({
        title: title,
        author: author,
        tag: tag,
        state: state,
      })
      .catch((error) => console.log(error));
    setVisibility(false);
    props.onChange(false);
  };

  return (
    <Modal
      animationType="fade"
      visible={visibility}
      onRequestClose={() => {
        setVisibility(false);
        props.onChange(false);
      }}
    >
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
          <Text style={{ marginLeft: 32 }}>
            Do you want to change the state?
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { marginTop: 32 }]}
          onPress={updateRecord}
        >
          <Text style={{ color: "#FFF", fontWeight: "500" }}>
            Submit Changes
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

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
export default Popup;
