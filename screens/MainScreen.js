//  Author: Mohammad Jihad Hossain
//  Create Date: 28/08/2025
//  Modify Date: 14/10/2025
//  Description: Main screen component

import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  Linking,
  TouchableOpacity,
  Alert,
  Dimensions,
  BackHandler,
} from "react-native";
import { Card } from "react-native-shadow-cards";

const screenDimensions = Dimensions.get("screen");
const windowDimensions = Dimensions.get("window");

const { height } = screenDimensions.height / 2;
const { width } = screenDimensions.width / 2;

function MainScreen({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //Alert.alert("Refreshed");
    });

    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true; // return true means we handled it
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return unsubscribe(), backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={{ flexShrink: 1 }}>
        <Text
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: 20,
            padding: 10,
            alignContent: "center",
            textAlign: "center",
            alignSelf: "center",
            marginTop: 20,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          RoomtoRead Online Observation & Data-Collection Application
        </Text>
      </View>
      <Card
        style={{
          padding: 10,
          margin: 10,
          flex: 1,
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 10,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, alignContent: "center" }}>
            <TouchableOpacity>
              <Image
                style={{
                  height: "60%",
                  width: "100%",
                  resizeMode: "contain",
                  alignItems: "center",
                  marginTop: 5,
                  marginBottom: 5,
                }}
                source={require("../assets/rtrnew.png")}
              ></Image>
            </TouchableOpacity>
            <Text
              style={{
                alignItems: "center",
                textAlign: "center",
                alignSelf: "center",
                fontWeight: "bold",
                fontSize: 24,
                marginTop: 1,
                marginBottom: 1,
              }}
            >
              Observation & Data-Collection Tools
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 1,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 1,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Button
                title="LPO Tools"
                color="#006B4D"
                onPress={() => navigation.navigate("LPOScreen")}
              ></Button>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              padding: 2,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Button
                title="LF Tools"
                color="#006B4D"
                onPress={() => navigation.navigate("LFScreen")}
              ></Button>
            </View>
          </View>
        </View>
      </Card>

      <View>
        <Text>&copy; All Rights Reserved, RoomtoRead Bangladesh</Text>
      </View>
    </View>
  );
}

const loadInBrowser = (url) => {
  Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height,
    width: width,
  },
  logoMain: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  buttonView: {
    width: "100%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  buttonViewRed: {
    width: "100%",
    backgroundColor: "#FF0000",
    borderRadius: 25,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
});

export default MainScreen;
