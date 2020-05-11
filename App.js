import React from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import { FirebaseConfig } from "./src/config/FirebaseConfig";
import firebase from "firebase";

export default function App() {
  const firebaseConfig = FirebaseConfig;
  // Initialize Firebase
  !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

  return <AppNavigation />;
}
