//  Author: Mohammad Jihad Hossain
//  Create Date: 17/08/2025
//  Modify Date: 02/08/2026
//  Description: AppNavigation file

// Library import
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Button,
  Alert,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider } from "./Auth/AuthContext";
import { useAuth } from "./Auth/AuthContext";

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
import PPrePrimaryClassScreen from "./screens/PPrePrimaryClassScreen";
import PLibraryReadingActivitiesScreen from "./screens/PLibraryReadingActivitiesScreen";

import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import LPOScreen from "./screens/LPOScreen";
import LFScreen from "./screens/LFScreen";
import SchoolMonitoringTool from "./screens/SchoolMonitoringTool";

export default function AppNavigation() {
  const { user, isLoading, logout } = useAuth();

  // Stop the navigator from rendering anything until storage verification completes
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        // 🚀 Add screenOptions here to apply global changes to all child screens
        screenOptions={{
          headerRight: () => (
            <Button
              onPress={() => {
                Alert.alert("Logout", "Are you sure you want to log out?", [
                  { text: "Cancel", style: "cancel" },
                  { text: "Log Out", onPress: logout, style: "destructive" },
                ]);
              }}
              title="Logout"
              color="#ff3b30" // Red color for system logout clarity
            />
          ),
        }}
      >
        {user ? (
          // Authenticated Routes
          <>
            {user.role &&
              user.role.some((r) =>
                [
                  "ROLE_ADMIN",
                  "ROLE_LPO",
                  "ROLE_CO_RME",
                  "ROLE_TA",
                  "ROLE_FM",
                  "ROLE_F_RME",
                  "ROLE_CMT",
                ].includes(r),
              ) && (
                <Stack.Screen
                  name="MainScreen"
                  component={MainScreen}
                  options={{
                    title: "", //Set Header Title
                  }}
                />
              )}

            {user.role &&
              user.role.some((r) =>
                [
                  "ROLE_ADMIN",
                  "ROLE_LPO",
                  "ROLE_CO_RME",
                  "ROLE_TA",
                  "ROLE_FM",
                  "ROLE_F_RME",
                  "ROLE_CMT",
                ].includes(r),
              ) && (
                <Stack.Screen
                  name="LPOScreen"
                  component={LPOScreen}
                  options={{
                    title: "LPO Screen", //Set Header Title
                  }}
                />
              )}

            {user.role &&
              user.role.some((r) =>
                [
                  "ROLE_ADMIN",
                  "ROLE_LPO",
                  "ROLE_CO_RME",
                  "ROLE_TA",
                  "ROLE_FM",
                  "ROLE_F_RME",
                  "ROLE_CMT",
                  "ROLE_LF",
                ].includes(r),
              ) && (
                <Stack.Screen
                  name="LFScreen"
                  component={LFScreen}
                  options={{
                    title: "LF Screen", //Set Header Title
                  }}
                />
              )}

            <Stack.Screen
              name="PLFObservationTool"
              component={PLFObservationScreen}
              options={{
                title: "LF Observation Tool", //Set Header Title
              }}
            />

            <Stack.Screen
              name="PBanglaTool"
              component={PBanglaClassObservationScreen}
              options={{
                title: "Bangla Observation Tool", //Set Header Title
              }}
            />

            <Stack.Screen
              name="PBookCheckoutTool"
              component={PBookCheckoutScreen}
              options={{
                title: "Book Checkout Tool", //Set Header Title
              }}
            />
            <Stack.Screen
              name="PPrePrimaryClass"
              component={PPrePrimaryClassScreen}
              options={{
                title: "PP Class Observation Form", //Set Header Title
              }}
            />

            <Stack.Screen
              name="PLibraryReadingActivities"
              component={PLibraryReadingActivitiesScreen}
              options={{
                title: "Library Reading Activity Form", //Set Header Title
              }}
            />

            <Stack.Screen
              name="PLibraryTool"
              component={PLibraryObservationScreen}
              options={{
                title: "Library Observation Tool", //Set Header Title
              }}
            />

            {/* Role-Based Authorization Guard */}
            {/* {user.role === "ADMIN" && (
              <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            )} */}
          </>
        ) : (
          // Unauthenticated Routes
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}

        {/* <Stack.Screen
          name="SchoolMonitoringTool"
          component={SchoolMonitoringTool}
          options={{
            title: "School Monitoring Tool", //Set Header Title
            headerStyle: {
              backgroundColor: "#f4511e", //Set Header color
            },
            headerTintColor: "#fff", //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        /> */}

        {/* <Stack.Screen
          name="BanglaTool"
          component={BanglaClassObservationScreen}
          options={{
            title: "Bangla Observation Tool", //Set Header Title
          }}
        /> */}

        {/* <Stack.Screen
          name="BanglaClass"
          component={BanglaClassObservationScreen}
          options={{
            title: "Bangla Class Observation Form", //Set Header Title
          }}
        /> */}
        {/* <Stack.Screen
          name="LibraryManagement"
          component={LibraryManagementObservationScreen}
          options={{
            title: "Library Management Observation Form", //Set Header Title
          }}
        /> */}

        {/* <Stack.Screen
          name="LibraryReading"
          component={LibraryReadingActivitiesObservationScreen}
          options={{
            title: "Library Reading Observation Form", //Set Header Title
          }}
        /> */}

        {/* <Stack.Screen
          name="BookCheckoutSchool"
          component={MonthlyBookCheckoutScreen}
          options={{
            title: "Book Checkout Observation Form for School", //Set Header Title
          }}
        /> */}
        {/* <Stack.Screen
          name="BookCheckoutCommunity"
          component={MonthlyBookCheckoutCommScreen}
          options={{
            title: "Book Checkout Observation Form for Community", //Set Header Title
          }}
        /> */}
        {/* <Stack.Screen
          name="OverallSchool"
          component={OverallSchoolObservationScreen}
          options={{
            title: "Overall School Observation Form", //Set Header Title
          }}
        /> */}
        {/* <Stack.Screen
          name="PrePrimaryClass"
          component={PrePrimaryClassScreen}
          options={{
            title: "PrePrimary Class Observation Form", //Set Header Title
          }}
        /> */}
        {/* <Stack.Screen
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
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
