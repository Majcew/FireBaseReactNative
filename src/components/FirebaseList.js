import React, { useState, useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity, Modal } from "react-native";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import { Checkmark } from "./Checkmark";
import { Popup } from "../components/Popup";

export const FirebaseList = (props) => {
  const [data, setData] = useState([]);
  const [uid, setUid] = useState(null);
  const [edit, setEdit] = useState(null);
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    setUid(props.uid);
  }, [props.uid]);

  const deleteItem = (key) => {
    firebase
      .database()
      .ref("users/" + uid)
      .child(key)
      .remove();
  };

  const handleReturn = (state) => {
    setVisibility(state);
  };

  const icon = (name) => {
    switch (name) {
      case "Book":
        return "md-book";
      case "Music":
        return "md-musical-note";
      case "Movie":
        return "md-easel";
      case "Serial":
        return "md-play";
      default:
        return;
    }
  };

  return (
    <View>
      <FlatList
        style={[{ marginTop: 32 }, { backgroundColor: "orange" }]}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                setVisibility(true);
                setEdit(item);
              }}
              onLongPress={() => {
                deleteItem(item.key);
              }}
            >
              <Ionicons name={icon(item.info.tag)} size={24} color="green" />
              <Text>
                Author: {item.info.author} Tag: {item.info.tag}
              </Text>
              <Text>Title: {item.info.title}</Text>
              <Text>
                Seen/Watched/Listened:{"   "}
                <Checkmark state={item.info.state} />
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Popup edit={edit} visibility={visibility} onChange={handleReturn} />
    </View>
  );
};
export default FirebaseList;
