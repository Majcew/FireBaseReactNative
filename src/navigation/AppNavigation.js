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
import SearchScreen from "../screens/SearchScreen";

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
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-search" size={24} color={tintColor} />
        ),
      },
    },
    Logout: {
      screen: Logout,
      navigationOptions: ({ navigation, tintColor }) => ({
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
                  navigation.dispatch(NavigationActions.navigate("Login"));
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

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
