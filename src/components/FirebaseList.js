import React, { useState, useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import firebase from "firebase";
import { Checkmark } from "./Checkmark";

export const FirebaseList = (props) => {
  const [data, setData] = useState([]);
  const [navigation, setNavigation] = useState(null);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    setNavigation(props.navigation);
  }, [props.navigation]);

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

  const editItem = (item) => {
    switch (item.info.tag) {
      case "Serial":
        console.log("Serial");
        navigation.navigate("Serial", { data: item });
        break;
      case "Music":
        console.log("Music");
        navigation.navigate("Music", { data: item });
        break;
      case "Movie":
        console.log("Movie");
        navigation.navigate("Movie", { data: item });
        break;
      case "Book":
        console.log("Book");
        navigation.navigate("Book", { data: item });
        break;
      default:
        break;
    }
  };

  return (
    <FlatList
      style={[{ marginTop: 32 }, { backgroundColor: "orange" }]}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View>
          <TouchableOpacity
            onPress={() => editItem(item)}
            onLongPress={() => {
              deleteItem(item.key);
            }}
          >
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
  );
};
export default FirebaseList;
