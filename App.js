//  Author: Mohammad Jihad Hossain
//  Create Date: 17/08/2025
//  Modify Date: 02/08/2026
//  Description: Application index file

if (typeof global !== "undefined" && !global.MessageQueue) {
  global.MessageQueue = {
    spy: () => {},
    getSpying: () => false,
    registerCallableModule: () => {},
    registerLazyCallableModule: () => {},
  };
}

// Library import
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider } from "./Auth/AuthContext";
import AppNavigation from "./AppNavigation";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
