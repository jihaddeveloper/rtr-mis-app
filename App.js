//  Author: Mohammad Jihad Hossain
//  Create Date: 17/04/2021
//  Modify Date: 15/03/2022
//  Description: Application index file

// Library import
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Navigation
const Stack = createNativeStackNavigator();

// Screen import

import RegistrationScreen from "./screens/RegistrationScreen";
import BanglaClassObservationScreen from "./screens/BanglaClassObservationScreen";
import LibraryManagementObservationScreen from "./screens/LibraryManagementObservationScreen";
import LibraryReadingActivitiesObservationScreen from "./screens/LibraryReadingActivitiesObservationScreen";
import MonthlyBookCheckoutScreen from "./screens/MonthlyBookCheckoutScreen";
import MonthlyBookCheckoutCommScreen from "./screens/MonthlyBookCheckoutCommunityScreen";
import OverallSchoolObservationScreen from "./screens/OverallSchoolObservationScreen";
import PrePrimaryClassScreen from "./screens/PrePrimaryClassScreen";
import HomeScreen2 from "./screens/HomeScreen2";
import LoginScreen2 from "./screens/LoginScreen2";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home2">
        <Stack.Screen
          name="Home2"
          component={HomeScreen2}
          options={{
            title: "Room to Read WFP Data-collection Application", //Set Header Title
            headerStyle: {
              backgroundColor: "#f4511e", //Set Header color
            },
            headerTintColor: "#fff", //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="BanglaClass"
          component={BanglaClassObservationScreen}
          options={{
            title: "Bangla Class Observation Form", //Set Header Title
          }}
        />
        <Stack.Screen
          name="LibraryManagement"
          component={LibraryManagementObservationScreen}
          options={{
            title: "Library Management Observation Form", //Set Header Title
          }}
        />

        <Stack.Screen
          name="LibraryReading"
          component={LibraryReadingActivitiesObservationScreen}
          options={{
            title: "Library Reading Observation Form", //Set Header Title
          }}
        />
        <Stack.Screen
          name="BookCheckoutSchool"
          component={MonthlyBookCheckoutScreen}
          options={{
            title: "Book Checkout Observation Form for School", //Set Header Title
          }}
        />
        <Stack.Screen
          name="BookCheckoutCommunity"
          component={MonthlyBookCheckoutCommScreen}
          options={{
            title: "Book Checkout Observation Form for Community", //Set Header Title
          }}
        />
        <Stack.Screen
          name="OverallSchool"
          component={OverallSchoolObservationScreen}
          options={{
            title: "Overall School Observation Form", //Set Header Title
          }}
        />
        <Stack.Screen
          name="PrePrimaryClass"
          component={PrePrimaryClassScreen}
          options={{
            title: "PrePrimary Class Observation Form", //Set Header Title
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{
            title: "Register Page", //Set Header Title
            headerShown: false,
            headerStyle: {
              backgroundColor: "#f4511e", //Set Header color
            },
            headerTintColor: "#fff", //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Login2"
          component={LoginScreen2}
          options={{
            title: "Login Page", //Set Header Title
            headerStyle: {
              backgroundColor: "#f4511e", //Set Header color
            },
            headerTintColor: "#fff", //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
