//  Author: Mohammad Jihad Hossain
//  Create Date: 17/08/2021
//  Modify Date: 11/05/2022
//  Description: Home screen component

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

const { width, height } = Dimensions.get("window");

function HomeScreen({ navigation }) {
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
          McGovern-Dole International Food for Education and Child Nutrition
          Programme
        </Text>
      </View>
      <Card style={{ padding: 10, margin: 10, flex: 1 }}>
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
                  height: "60%",
                  width: "100%",
                  resizeMode: "contain",
                  alignItems: "center",
                }}
                source={require("../assets/rtrwfp.png")}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
      </Card>

      <Card style={{ padding: 10, margin: 10, flex: 1, marginTop: 10 }}>
        <View style={{ flexDirection: "row", marginTop: 80 }}>
          <View style={{ flex: 1, padding: 2 }}>
            <View>
              <Button
                title="বিদ্যালয়ের বই চেক আউট/ইন তথ্য ফরম"
                onPress={() => navigation.navigate("BookCheckoutSchool")}
              ></Button>
            </View>
          </View>
          <View style={{ flex: 1, padding: 2 }}>
            <View>
              <Button
                title="কমিউনিটির বই চেক আউট/ইন তথ্য ফরম"
                onPress={() => navigation.navigate("BookCheckoutCommunity")}
              ></Button>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, padding: 2 }}>
            <View>
              <Button
                title="শ্রেণীকক্ষ পাঠাগার পর্যবেক্ষণ ফরম"
                onPress={() => navigation.navigate("LibraryManagement")}
              ></Button>
            </View>
          </View>
          <View style={{ flex: 1, padding: 2 }}>
            <View>
              <Button
                title="পড়ার ঘণ্টা কার্যক্রম পর্যবেক্ষণ ফরম"
                onPress={() => navigation.navigate("LibraryReading")}
              ></Button>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, padding: 2 }}>
            <View>
              <Button
                title="বাংলা ক্লাস পর্যবেক্ষণ ফরম"
                onPress={() => navigation.navigate("BanglaClass")}
              ></Button>
            </View>
          </View>
          <View style={{ flex: 1, padding: 2 }}>
            <View>
              <Button
                title="বিদ্যালয়ের সামগ্রিক পর্যবেক্ষণ ফরম"
                onPress={() => navigation.navigate("OverallSchool")}
              ></Button>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, padding: 2 }}>
            <View>
              <Button
                title="শ্রেণিকক্ষ কার্যক্রম  প্রাক-প্রাথমিক"
                onPress={() => navigation.navigate("PrePrimaryClass")}
              ></Button>
            </View>
          </View>
          <View style={{ flex: 1, padding: 2 }}></View>
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

export default HomeScreen;
