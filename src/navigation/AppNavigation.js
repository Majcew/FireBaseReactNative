import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import Logout from "../screens/Logout";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import firebase from "firebase";

import AddSerial from "../screens/AddSerial";
import AddBook from "../screens/AddBook";
import AddMovie from "../screens/AddMovie";
import AddMusic from "../screens/AddMusic";

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-home" size={24} color={tintColor} />
        ),
      },
    },
    Add: {
      screen: AddMovie,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-add" size={24} color={tintColor} />
        ),
        tabBarOnPress: () => {
          navigation.navigate("Adds");
        },
      }),
    },
    Logout: {
      screen: Logout,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-log-out" size={24} color={tintColor} />
        ),
        tabBarOnPress: () => {
          return Alert.alert(
            "Logout Attempt",
            "Do you REALLY want to log out?",
            [
              {
                text: "NO",
              },
              {
                text: "YES",
                onPress: () => {
                  firebase.auth().signOut();
                },
              },
            ]
          );
        },
      }),
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "orange",
      inactiveTintColor: "black",
    },
  }
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    headerMode: "none",
  }
);

const AddStack = createBottomTabNavigator({
  Movie: {
    screen: AddMovie,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-easel" size={24} color={tintColor} />
      ),
    },
  },
  Book: {
    screen: AddBook,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-book" size={24} color={tintColor} />
      ),
    },
  },
  Music: {
    screen: AddMusic,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-musical-note" size={24} color={tintColor} />
      ),
    },
  },
  Serial: {
    screen: AddSerial,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-play" size={24} color={tintColor} />
      ),
    },
  },
  Back: {
    screen: Logout,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-arrow-back" size={24} color={tintColor} />
      ),
      tabBarOnPress: () => {
        navigation.navigate("App");
      },
    }),
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppNavigator,
      Auth: AuthStack,
      Adds: AddStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
