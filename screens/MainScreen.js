//  Author: Mohammad Jihad Hossain
//  Create Date: 28/08/2024
//  Modify Date: 28/08/2024
//  Description: Main screen component

import React from "react";
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
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={{ flexShrink: 1 }}>
        <Text
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: 20,
            padding: 25,
            alignContent: "center",
            textAlign: "center",
            alignSelf: "center",
            marginTop: 50,
            marginLeft: 100,
            marginRight: 100,
          }}
        >
          RoomtoRead Online Data Collection Application
        </Text>
      </View>
      <Card
        style={{
          padding: 10,
          margin: 10,
          flex: 1,
          marginBottom: 10,
          marginTop: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 30,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, alignContent: "center" }}>
            <TouchableOpacity>
              <Image
                style={{
                  height: "50%",
                  width: "100%",
                  resizeMode: "contain",
                  alignItems: "center",
                  marginBottom: 50,
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
                fontSize: 20,
                marginTop: 5,
                marginBottom: 30,
              }}
            >
              Data Collection Tools for LF & LPO
            </Text>
          </View>
        </View>
      </Card>

      <Card
        style={{
          padding: 10,
          margin: 10,
          flex: 1,
          marginTop: 30,
          marginBottom: 100,
        }}
      >
        <View style={{ marginTop: 50, marginBottom: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, padding: 2 }}>
              <View>
                <Button
                  title="LPO Tools"
                  onPress={() => navigation.navigate("LPOScreen")}
                ></Button>
              </View>
            </View>
            <View style={{ flex: 1, padding: 2 }}>
              <View>
                <Button
                  title="LF Tools"
                  onPress={() => navigation.navigate("LFScreen")}
                ></Button>
              </View>
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