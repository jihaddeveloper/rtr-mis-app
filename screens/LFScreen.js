//  Author: Mohammad Jihad Hossain
//  Create Date: 17/08/2021
//  Modify Date: 11/05/2022
//  Description: LF screen component

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
} from "react-native";
import { Card } from "react-native-shadow-cards";

import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";

const screenDimensions = Dimensions.get("screen");
const windowDimensions = Dimensions.get("window");

const { height } = screenDimensions.height / 2;
const { width } = screenDimensions.width / 2;

function LFScreen({ navigation }) {
  const [isConnected, setIsConnected] = useState(null);

  const [school, setSchool] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [project, setProject] = useState(null);
  const [office, setOffice] = useState(null);

  const internet = NetInfo.fetch();

  const fetchDataAndSaveSchool = async () => {
    try {
      const response = await fetch(
        "http://118.179.80.51:8080/api/v1/p-school",
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      ); // Replace with your API endpoint
      const schoolData = await response.json();

      // Convert the data to a string before storing
      const stringValue = JSON.stringify(schoolData);

      removeItem("schoolData");
      await AsyncStorage.setItem("schoolData", stringValue); // Choose a unique key

      console.log("SchoolData saved successfully!");
    } catch (error) {
      console.error("Error fetching or saving data:", error);
    }
  };

  const fetchDataAndSaveTeacher = async () => {
    try {
      const response = await fetch(
        "http://118.179.80.51:8080/api/v1/p-teacher",
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      ); // Replace with your API endpoint
      const teacherData = await response.json();

      // Convert the data to a string before storing
      const stringValue = JSON.stringify(teacherData);
      removeItem("teacherData");
      await AsyncStorage.setItem("teacherData", stringValue); // Choose a unique key

      console.log("TeacherData saved successfully!");
    } catch (error) {
      console.error("Error fetching or saving data:", error);
    }
  };

  const fetchDataAndSaveEmployee = async () => {
    try {
      const response = await fetch(
        "http://118.179.80.51:8080/api/v1/p-employee",
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      ); // Replace with your API endpoint
      const employeeData = await response.json();

      // Convert the data to a string before storing
      const stringValue = JSON.stringify(employeeData);
      removeItem("employeeData");
      await AsyncStorage.setItem("employeeData", stringValue); // Choose a unique key

      console.log("EmployeeData saved successfully!");
    } catch (error) {
      console.error("Error fetching or saving data:", error);
    }
  };

  const fetchDataAndSaveProject = async () => {
    try {
      const response = await fetch(
        "http://118.179.80.51:8080/api/v1/projects",
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      ); // Replace with your API endpoint
      const projectData = await response.json();

      // Convert the data to a string before storing
      const stringValue = JSON.stringify(projectData);
      removeItem("projectData");
      await AsyncStorage.setItem("projectData", stringValue); // Choose a unique key

      console.log("ProjectData saved successfully!");
    } catch (error) {
      console.error("Error fetching or saving data:", error);
    }
  };

  const fetchDataAndSaveOffice = async () => {
    try {
      const response = await fetch("http://118.179.80.51:8080/api/v1/offices", {
        method: "GET",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }); // Replace with your API endpoint
      const officeData = await response.json();

      // Convert the data to a string before storing
      const stringValue = JSON.stringify(officeData);
      // Remove old data
      removeItem("officeData");
      // Add new data
      await AsyncStorage.setItem("officeData", stringValue); // Choose a unique key

      console.log("OfficeData saved successfully!");
    } catch (error) {
      console.error("Error fetching or saving data:", error);
    }
  };

  const retrieveDataSchool = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("schoolData");
      if (stringValue != null) {
        const schoolData = JSON.parse(stringValue); // Parse the string back to an object
        console.log("Retrieved SchoolData:", schoolData.length);
        return schoolData;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving schoolData:", error);
      return null;
    }
  };

  const retrieveDataTeacher = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("teacherData");
      if (stringValue != null) {
        const teacherData = JSON.parse(stringValue); // Parse the string back to an object
        console.log("Retrieved TeacherData:", teacherData.length);
        return teacherData;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving  teacherData:", error);
      return null;
    }
  };

  const retrieveDataEmployee = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("employeeData");
      if (stringValue != null) {
        const employeeData = JSON.parse(stringValue); // Parse the string back to an object
        console.log("Retrieved EmployeeData:", employeeData.length);
        return employeeData;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving employeeData:", error);
      return null;
    }
  };

  const retrieveDataProject = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("projectData");
      if (stringValue != null) {
        const projectData = JSON.parse(stringValue); // Parse the string back to an object
        console.log("Retrieved ProjectData:", projectData.length);
        return projectData;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving employeeData:", error);
      return null;
    }
  };

  const retrieveDataOffice = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("officeData");
      if (stringValue != null) {
        const officeData = JSON.parse(stringValue); // Parse the string back to an object
        console.log("Retrieved OfficeData:", officeData.length);
        return officeData;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving employeeData:", error);
      return null;
    }
  };

  const removeItem = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // remove error
      console.error("Error removing data:", e);
    }
  };

  React.useEffect(() => {
    // Subscribe to network state changes
    const setNetInfo = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);

      if (state.isConnected) {
        fetchDataAndSaveOffice();
        fetchDataAndSaveProject();
        fetchDataAndSaveTeacher();
        fetchDataAndSaveSchool();
        fetchDataAndSaveEmployee();
      } else {
        // Load data from AsyncStorage
        const loadData = async () => {
          const storedDataSchool = await retrieveDataSchool();
          const storedDataTeacher = await retrieveDataTeacher();
          const storedDataEmployee = await retrieveDataEmployee();
          const storedDataProject = await retrieveDataProject();
          const storedDataOffice = await retrieveDataOffice();

          // School Data
          if (storedDataSchool) {
            setSchool(storedDataSchool);
          } else {
            await fetchDataAndSaveSchool(); // Fetch and save if not already stored
            const freshDataSchool = await retrieveDataSchool(); // Retrieve the newly saved data

            setSchool(freshDataSchool);
          }
          // School Data

          // Teacher Data
          if (storedDataTeacher) {
            setTeacher(storedDataTeacher);
          } else {
            await fetchDataAndSaveTeacher(); // Fetch and save if not already stored
            const freshDataTeacher = await retrieveDataTeacher(); // Retrieve the newly saved data

            setTeacher(freshDataTeacher);
          }
          // Teacher Data

          // Employee Data
          if (storedDataEmployee) {
            setEmployee(storedDataEmployee);
          } else {
            await fetchDataAndSaveEmployee(); // Fetch and save if not already stored
            const freshDataEmployee = await retrieveDataEmployee(); // Retrieve the newly saved data

            setEmployee(freshDataEmployee);
          }
          // Employee Data

          // Project Data
          if (storedDataProject) {
            setProject(storedDataProject);
          } else {
            await fetchDataAndSaveProject(); // Fetch and save if not already stored
            const freshDataProject = await retrieveDataProject(); // Retrieve the newly saved data

            setProject(freshDataProject);
          }
          // Project Data

          // Office Data
          if (storedDataOffice) {
            setOffice(storedDataOffice);
          } else {
            await fetchDataAndSaveOffice(); // Fetch and save if not already stored
            const freshDataOffice = await retrieveDataOffice(); // Retrieve the newly saved data

            setEmployee(freshDataOffice);
          }
          // Office Data
        };
        loadData();
        // Load data from AsyncStorage
      }
    });
    setNetInfo();

    const unsubscribe = navigation.addListener("focus", () => {
      //Alert.alert("Refreshed");
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* <View style={{ flexShrink: 1 }}>
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
          Home
        </Text>
      </View> */}
      <Card style={{ padding: 10, margin: 10, flex: 1, marginTop: 50 }}>
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
                fontSize: 28,
              }}
            >
              Observation & Data-Collection Tools for Literacy Facilitator
            </Text>
          </View>

          {/* <View>
            {school ? (
              <Text>School Data: {school.length}</Text>
            ) : (
              <Text>Loading data...</Text>
            )}

            {teacher ? (
              <Text>Teacher Data: {teacher.length}</Text>
            ) : (
              <Text>Loading data...</Text>
            )}

            {employee ? (
              <Text>Employee Data: {employee.length}</Text>
            ) : (
              <Text>Loading data...</Text>
            )}

            {office ? (
              <Text>Office Data: {office.length}</Text>
            ) : (
              <Text>Loading data...</Text>
            )}

            {project ? (
              <Text>Project Data: {project.length}</Text>
            ) : (
              <Text>Loading data...</Text>
            )}
          </View> */}
        </View>
      </Card>

      <Card style={{ padding: 10, margin: 10, flex: 1, marginTop: 10 }}>
        <View style={{ marginTop: 40 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, padding: 2 }}>
              <View>
                <Button
                  title="বাংলা ক্লাস পর্যবেক্ষণ"
                  color="#006B4D"
                  onPress={() => navigation.navigate("PBanglaTool")}
                ></Button>
              </View>
            </View>
            <View style={{ flex: 1, padding: 2 }}>
              <View>
                <Button
                  title="পাঠাগার পর্যবেক্ষণ"
                  color="#006B4D"
                  onPress={() => navigation.navigate("PLibraryTool")}
                ></Button>
              </View>
            </View>
          </View>
          {/* <View style={{ flexDirection: "row", marginTop: 5 }}>
            <View style={{ flex: 1, padding: 2 }}>
              <View>
                <Button
                  title="কমিউনিটির বই চেক আউট/ইন তথ্য ফরম"
                  onPress={() => navigation.navigate("BookCheckoutCommunity")}
                ></Button>
              </View>
            </View>
          </View> */}

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, padding: 2 }}>
              <View>
                <Button
                  title="বই চেক আউট তথ্য"
                  color="#006B4D"
                  onPress={() => navigation.navigate("PBookCheckoutTool")}
                ></Button>
              </View>
            </View>

            <View style={{ flex: 1, padding: 2 }}>
              <View>
                <Button
                  title="শ্রেণিকক্ষ কার্যক্রম প্রাক-প্রাথমিক"
                  color="#006B4D"
                  onPress={() => navigation.navigate("PPrePrimaryClass")}
                ></Button>
              </View>
            </View>

            {/* <View style={{ flex: 1, padding: 2 }}>
              <View>
                <Button
                  title="পড়ার ঘণ্টা কার্যক্রম পর্যবেক্ষণ ফরম"
                  // onPress={() => navigation.navigate("LibraryReading")}
                ></Button>
              </View>
            </View> */}
          </View>

          {/* <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, padding: 2 }}>
              <View>
                <Button
                  title="শ্রেণিকক্ষ কার্যক্রম প্রাক-প্রাথমিক"
                  // onPress={() => navigation.navigate("PrePrimaryClass")}
                ></Button>
              </View>
            </View>
            <View style={{ flex: 1, padding: 2 }}>
              <View>
                <Button
                  title="বিদ্যালয়ের সামগ্রিক পর্যবেক্ষণ ফরম"
                  //onPress={() => navigation.navigate("OverallSchool")}
                ></Button>
              </View>
            </View>
          </View> */}
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

export default LFScreen;
