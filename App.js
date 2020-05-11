import React from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import firebase from "firebase";

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyD1LoRQ1SleKp4hU7m2ApeRlU9mVXuLoPQ",
    authDomain: "feuerbase-6356c.firebaseapp.com",
    databaseURL: "https://feuerbase-6356c.firebaseio.com",
    projectId: "feuerbase-6356c",
    storageBucket: "feuerbase-6356c.appspot.com",
    messagingSenderId: "161084976380",
    appId: "1:161084976380:web:8e3cebdda1888cde30fb79",
  };
  // Initialize Firebase
  !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

  return <AppNavigation />;
}
