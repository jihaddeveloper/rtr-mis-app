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
import PLFObservationScreen from "./screens/PLFObservationScreen";
import PBanglaClassObservationScreen from "./screens/PBanglaClassObservationScreen";
import PLibraryObservationScreen from "./screens/PLibraryObservationScreen";
import PBookCheckoutScreen from "./screens/PBookCheckoutScreen";

import LoginScreen2 from "./screens/LoginScreen2";
import MainScreen from "./screens/MainScreen";
import LPOScreen from "./screens/LPOScreen";
import LFScreen from "./screens/LFScreen";
import SchoolMonitoringTool from "./screens/SchoolMonitoringTool";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            title: "", //Set Header Title
          }}
        />
        <Stack.Screen
          name="LPOScreen"
          component={LPOScreen}
          options={{
            title: "LPO Screen", //Set Header Title
          }}
        />
        <Stack.Screen
          name="SchoolMonitoringTool"
          component={SchoolMonitoringTool}
          options={{
            title: "School Monitoring Tool", //Set Header Title
          }}
        />
        <Stack.Screen
          name="LFScreen"
          component={LFScreen}
          options={{
            title: "LF Screen", //Set Header Title
            // headerStyle: {
            //   backgroundColor: "#f4511e", //Set Header color
            // },
            // headerTintColor: "#fff", //Set Header text color
            // headerTitleStyle: {
            //   fontWeight: "bold", //Set Header text style
            // },
          }}
        />

        <Stack.Screen
          name="PLFObservationTool"
          component={PLFObservationScreen}
          options={{
            title: "PREVAIL LF Observation Tool", //Set Header Title
          }}
        />

        <Stack.Screen
          name="PBanglaTool"
          component={PBanglaClassObservationScreen}
          options={{
            title: "PREVAIL Bangla Observation Tool", //Set Header Title
          }}
        />

        <Stack.Screen
          name="PLibraryTool"
          component={PLibraryObservationScreen}
          options={{
            title: "PREVAIL Library Observation Tool", //Set Header Title
          }}
        />

        <Stack.Screen
          name="PBookCheckoutTool"
          component={PBookCheckoutScreen}
          options={{
            title: "PREVAIL Book Checkout Tool", //Set Header Title
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
