import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
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
              <View style={style.item}>
                <Ionicons
                  style={{ width: 50, height: 50, marginLeft: 12 }}
                  name={icon(item.info.tag)}
                  size={50}
                  color="green"
                />
                <View
                  style={{ flex: 1, justifyContent: "center", marginLeft: 10 }}
                >
                  <Text style={{ fontSize: 14, color: "green", marginTop: 2 }}>
                    {item.info.title}
                  </Text>
                  <Text style={{ fontSize: 14, color: "red", marginTop: 2 }}>
                    {item.info.author}
                  </Text>
                </View>
                <View style={{ alignSelf: "center", marginRight: 10 }}>
                  <Checkmark state={item.info.state} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      <Popup edit={edit} visibility={visibility} onChange={handleReturn} />
    </View>
  );
};

const style = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 8,
    margin: 10,
    elevation: 2,
  },
  text: {
    flexDirection: "column",
  },
});
export default FirebaseList;
