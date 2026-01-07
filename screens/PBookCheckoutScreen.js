//  Author: Mohammad Jihad Hossain
//  Create Date: 16/09/2025
//  Modify Date: 6/12/2025
//  Description: PBookCheckoutScreen component

import React from "react";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from "react-native";

import { divisions, districts, upazillas, unions } from "bd-geojs";

import { Picker } from "@react-native-picker/picker";

import { Card } from "react-native-shadow-cards";

import DateTimePicker from "@react-native-community/datetimepicker";

import Collapsible from "react-native-collapsible";

const { height } = Dimensions.get("window").height / 2;
const { width } = Dimensions.get("window").width / 2;

export default class PBookCheckoutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Network Connection
      isConnected: null,
      connectionType: null,
      // Network Connection

      //Preloaded Data
      school: [],
      teacher: [],
      employee: [],
      project: [],
      office: [],
      //Preloaded Data

      //Preloaded Data
      allProject: [],
      allSchool: [],
      allTeacher: [],
      allEmployee: [],
      allOffice: [],
      allDesignation: [],
      //Preloaded Data

      // All Book-checkout Data
      allBookcheckoutSchoolData: [],
      // All Book-checkout Data

      // Duplicate data check
      duplicateBookCheckoutSchool: [],
      // Duplicate data check

      isCollapsedGeneral: false,
      isCollapsedPP: true,
      isCollapsedOne: false,
      isCollapsedTwo: false,
      isCollapsedThree: false,
      isCollapsedFour: false,
      isCollapsedFive: false,

      isLoading: true,

      // checked: false,
      // option: "yes",
      // choosenIndex: 0,

      // Input value
      // Date picker property
      date: new Date(),
      mode: "date",
      show: false,
      // Date picker property

      // General data

      rtrSchoolId: "",
      yearOfSupport: "",
      visitNo: 0,
      pickerOffice: "",
      pickerProject: "",
      pickerDistrict: "",
      pickerDistrictKey: "",
      pickerUpazilla: "",
      pickerUpazillaKey: "",
      pickerSchool: "",
      phase: "",
      pickerHeadTeacher: "",
      pickerGender: "",
      pickerLF: "",
      pickerLPO: "",
      visitor: "",
      visitorDesignation: "",
      pointTeacher: "",
      pickerLFName: "",
      pickerLPOName: "",
      pickerMonth: "",
      pickerYear: "",
      yearOfEstablished: "",
      note: "",
      // General data

      //School Data
      //Book checkout data
      priPrimaryBoy: 0,
      priPrimaryGirl: 0,
      priPrimaryTotal: 0,

      priPrimaryNoBoyBC: 0,
      priPrimaryNoGirlBC: 0,
      priPrimaryNoTotalBC: 0,

      priPrimaryNoBookBoyBC: 0,
      priPrimaryNoBookGirlBC: 0,
      priPrimaryNoBookTotalBC: 0,

      classOneBoy: 0,
      classOneGirl: 0,
      classOneTotal: 0,

      classOneNoBoyBC: 0,
      classOneNoGirlBC: 0,
      classOneNoTotalBC: 0,

      classOneNoBookBoyBC: 0,
      classOneNoBookGirlBC: 0,
      classOneNoBookTotalBC: 0,

      classTwoBoy: 0,
      classTwoGirl: 0,
      classTwoTotal: 0,

      classTwoNoBoyBC: 0,
      classTwoNoGirlBC: 0,
      classTwoNoTotalBC: 0,

      classTwoNoBookBoyBC: 0,
      classTwoNoBookGirlBC: 0,
      classTwoNoBookTotalBC: 0,

      classThreeBoy: 0,
      classThreeGirl: 0,
      classThreeTotal: 0,

      classThreeNoBoyBC: 0,
      classThreeNoGirlBC: 0,
      classThreeNoTotalBC: 0,

      classThreeNoBookBoyBC: 0,
      classThreeNoBookGirlBC: 0,
      classThreeNoBookTotalBC: 0,

      classFourBoy: 0,
      classFourGirl: 0,
      classFourTotal: 0,

      classFourNoBoyBC: 0,
      classFourNoGirlBC: 0,
      classFourNoTotalBC: 0,

      classFourNoBookBoyBC: 0,
      classFourNoBookGirlBC: 0,
      classFourNoBookTotalBC: 0,

      classFiveBoy: 0,
      classFiveGirl: 0,
      classFiveTotal: 0,

      classFiveNoBoyBC: 0,
      classFiveNoGirlBC: 0,
      classFiveNoTotalBC: 0,

      classFiveNoBookBoyBC: 0,
      classFiveNoBookGirlBC: 0,
      classFiveNoBookTotalBC: 0,

      //Book checkout data

      //School Total data
      // schoolTotalNoTitle: 0,
      // schoolTotalNoBook: 0,

      schoolTotalNoGirl: 0,
      schoolTotalNoBoy: 0,
      schoolTotalNoStudent: 0,

      schoolTotalNoGirlBC: 0,
      schoolTotalNoBoyBC: 0,
      schoolTotalNoStudentBC: 0,

      schoolTotalNoBookGirlBC: 0,
      schoolTotalNoBookBoyBC: 0,
      schoolTotalNoBookBC: 0,

      //School Total data

      //School Data
      // Input value

      // Validation message
      dateError: "",
      fieldOfficeError: "",
      projectError: "",
      districtError: "",
      upazillaError: "",
      visitNoError: "",
      visitorNameError: "",
      visitorDesignationError: "",
      visitorOfficeError: "",
      lpoError: "",
      lfError: "",
      schoolError: "",
      headTeacherError: "",
      genderError: "",
      monthError: "",
      yearError: "",
      // Validation message
    };
  }

  //Geo values
  divisions = divisions;
  districts = districts;
  upazillas = upazillas;
  unions = unions;
  //Geo values

  //Load data from server
  componentDidMount() {
    // Fetch initial network state
    NetInfo.fetch().then((state) => {
      this.setState({
        isConnected: state.isConnected,
        connectionType: state.type,
      });

      if (state.isConnected) {
        this.syncPendingData();
      }
    });
    // Fetch initial network state

    this.retrieveDataOffice();
    this.retrieveDataProject();
    this.retrieveDataSchool();
    this.retrieveDataTeacher();
    this.retrieveDataEmployee();

    this.getAllSchool();
    this.getAllEmployee();
    this.getAllDesignation();
    this.getAllProject();
    this.getAllOffice();
    this.getAllTeacher();
    this.getAllBookCheckoutSchool();
    console.log("Component mounted");
    console.log(
      "Duplicate Bookcheckout Data: ",
      this.state.duplicateBookCheckoutSchool.length
    );
    //console.log("Duplicate Data: ", this.state.duplicateBookCheckoutSchool);

    // Alert in back-button press of device
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
    // Alert in back-button press of device
  }
  //Load data from server

  componentWillUnmount() {
    this.backHandler.remove();
  }

  // Alert in back-button press of device function
  handleBackPress = () => {
    Alert.alert(
      "Hold on!",
      "Are you sure you want to exit the app?",
      [
        {
          text: "Cancel",
          onPress: () => null, // Do nothing on cancel
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => BackHandler.exitApp(), // Exit the app on YES
        },
      ],
      { cancelable: false } // Prevent dismissing the alert by tapping outside
    );
    return true; // Return true to prevent default back button behavior
  };
  // Alert in back-button press of device function

  // Update state
  updateState = () => {
    this.setState({
      // General data

      rtrSchoolId: "",
      yearOfSupport: "",
      visitNo: 0,
      pickerOffice: "",
      pickerProject: "",
      pickerDistrict: "",
      pickerDistrictKey: "",
      pickerUpazilla: "",
      pickerUpazillaKey: "",
      pickerSchool: "",
      phase: "",
      pickerHeadTeacher: "",
      pickerGender: "",
      pickerLF: "",
      pickerLPO: "",
      visitor: "",
      visitorDesignation: "",
      pointTeacher: "",
      pickerLFName: "",
      pickerLPOName: "",
      pickerMonth: "",
      pickerYear: "",
      yearOfEstablished: "",
      note: "",
      // General data

      //School Data
      //Book checkout data
      priPrimaryBoy: 0,
      priPrimaryGirl: 0,
      priPrimaryTotal: 0,

      priPrimaryNoBoyBC: 0,
      priPrimaryNoGirlBC: 0,
      priPrimaryNoTotalBC: 0,

      priPrimaryNoBookBoyBC: 0,
      priPrimaryNoBookGirlBC: 0,
      priPrimaryNoBookTotalBC: 0,

      classOneBoy: 0,
      classOneGirl: 0,
      classOneTotal: 0,

      classOneNoBoyBC: 0,
      classOneNoGirlBC: 0,
      classOneNoTotalBC: 0,

      classOneNoBookBoyBC: 0,
      classOneNoBookGirlBC: 0,
      classOneNoBookTotalBC: 0,

      classTwoBoy: 0,
      classTwoGirl: 0,
      classTwoTotal: 0,

      classTwoNoBoyBC: 0,
      classTwoNoGirlBC: 0,
      classTwoNoTotalBC: 0,

      classTwoNoBookBoyBC: 0,
      classTwoNoBookGirlBC: 0,
      classTwoNoBookTotalBC: 0,

      classThreeBoy: 0,
      classThreeGirl: 0,
      classThreeTotal: 0,

      classThreeNoBoyBC: 0,
      classThreeNoGirlBC: 0,
      classThreeNoTotalBC: 0,

      classThreeNoBookBoyBC: 0,
      classThreeNoBookGirlBC: 0,
      classThreeNoBookTotalBC: 0,

      classFourBoy: 0,
      classFourGirl: 0,
      classFourTotal: 0,

      classFourNoBoyBC: 0,
      classFourNoGirlBC: 0,
      classFourNoTotalBC: 0,

      classFourNoBookBoyBC: 0,
      classFourNoBookGirlBC: 0,
      classFourNoBookTotalBC: 0,

      classFiveBoy: 0,
      classFiveGirl: 0,
      classFiveTotal: 0,

      classFiveNoBoyBC: 0,
      classFiveNoGirlBC: 0,
      classFiveNoTotalBC: 0,

      classFiveNoBookBoyBC: 0,
      classFiveNoBookGirlBC: 0,
      classFiveNoBookTotalBC: 0,

      //Book checkout data

      //School Total data
      // schoolTotalNoTitle: 0,
      // schoolTotalNoBook: 0,

      schoolTotalNoGirl: 0,
      schoolTotalNoBoy: 0,
      schoolTotalNoStudent: 0,

      schoolTotalNoGirlBC: 0,
      schoolTotalNoBoyBC: 0,
      schoolTotalNoStudentBC: 0,

      schoolTotalNoBookGirlBC: 0,
      schoolTotalNoBookBoyBC: 0,
      schoolTotalNoBookBC: 0,

      //School Total data

      //School Data
      // Input value

      // Validation message
      dateError: "",
      fieldOfficeError: "",
      projectError: "",
      districtError: "",
      upazillaError: "",
      visitNoError: "",
      visitorNameError: "",
      visitorDesignationError: "",
      visitorOfficeError: "",
      lpoError: "",
      lfError: "",
      schoolError: "",
      headTeacherError: "",
      genderError: "",
      monthError: "",
      // Validation message
    });
  };
  // Update state

  // For Datepicker
  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === "ios" ? true : false,
      date,
    });
  };

  show = (mode) => {
    this.setState({
      show: true,
      mode,
    });
  };

  datepicker = () => {
    this.show("date");
  };

  timepicker = () => {
    this.show("time");
  };
  // For Datepicker

  // Update state
  updateState = () => {
    this.setState({
      rtrSchoolId: "",
      yearOfSupport: "",
      visitNo: 0,
      pickerOffice: "",
      pickerProject: "",
      pickerDistrict: "",
      pickerDistrictKey: "",
      pickerUpazilla: "",
      pickerUpazillaKey: "",
      pickerSchool: "",
      phase: "",
      pickerHeadTeacher: "",
      pickerGender: "",
      pickerLF: "",
      pickerLPO: "",
      visitor: "",
      visitorDesignation: "",
      pointTeacher: "",
      pickerLFName: "",
      pickerLPOName: "",
      pickerMonth: "",
      pickerYear: "",
      yearOfEstablished: "",
      note: "",
      // General data

      //School Data
      //Book checkout data
      priPrimaryBoy: 0,
      priPrimaryGirl: 0,
      priPrimaryTotal: 0,

      priPrimaryNoBoyBC: 0,
      priPrimaryNoGirlBC: 0,
      priPrimaryNoTotalBC: 0,

      priPrimaryNoBookBoyBC: 0,
      priPrimaryNoBookGirlBC: 0,
      priPrimaryNoBookTotalBC: 0,

      classOneBoy: 0,
      classOneGirl: 0,
      classOneTotal: 0,

      classOneNoBoyBC: 0,
      classOneNoGirlBC: 0,
      classOneNoTotalBC: 0,

      classOneNoBookBoyBC: 0,
      classOneNoBookGirlBC: 0,
      classOneNoBookTotalBC: 0,

      classTwoBoy: 0,
      classTwoGirl: 0,
      classTwoTotal: 0,

      classTwoNoBoyBC: 0,
      classTwoNoGirlBC: 0,
      classTwoNoTotalBC: 0,

      classTwoNoBookBoyBC: 0,
      classTwoNoBookGirlBC: 0,
      classTwoNoBookTotalBC: 0,

      classThreeBoy: 0,
      classThreeGirl: 0,
      classThreeTotal: 0,

      classThreeNoBoyBC: 0,
      classThreeNoGirlBC: 0,
      classThreeNoTotalBC: 0,

      classThreeNoBookBoyBC: 0,
      classThreeNoBookGirlBC: 0,
      classThreeNoBookTotalBC: 0,

      classFourBoy: 0,
      classFourGirl: 0,
      classFourTotal: 0,

      classFourNoBoyBC: 0,
      classFourNoGirlBC: 0,
      classFourNoTotalBC: 0,

      classFourNoBookBoyBC: 0,
      classFourNoBookGirlBC: 0,
      classFourNoBookTotalBC: 0,

      classFiveBoy: 0,
      classFiveGirl: 0,
      classFiveTotal: 0,

      classFiveNoBoyBC: 0,
      classFiveNoGirlBC: 0,
      classFiveNoTotalBC: 0,

      classFiveNoBookBoyBC: 0,
      classFiveNoBookGirlBC: 0,
      classFiveNoBookTotalBC: 0,

      //Book checkout data

      //School Total data
      // schoolTotalNoTitle: 0,
      // schoolTotalNoBook: 0,

      schoolTotalNoGirl: 0,
      schoolTotalNoBoy: 0,
      schoolTotalNoStudent: 0,

      schoolTotalNoGirlBC: 0,
      schoolTotalNoBoyBC: 0,
      schoolTotalNoStudentBC: 0,

      schoolTotalNoBookGirlBC: 0,
      schoolTotalNoBookBoyBC: 0,
      schoolTotalNoBookBC: 0,

      //School Total data
    });
  };
  // Update state

  // Get All General Data
  retrieveDataSchool = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("schoolData");
      if (stringValue != null) {
        const schoolData = JSON.parse(stringValue); // Parse the string back to an object
        console.log("Retrieved SchoolData:", schoolData.length);
        this.setState({ school: schoolData });
        return schoolData;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving schoolData:", error);
      return null;
    }
  };

  retrieveDataTeacher = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("teacherData");
      if (stringValue != null) {
        const teacherData = JSON.parse(stringValue); // Parse the string back to an object
        console.log("Retrieved TeacherData:", teacherData.length);
        this.setState({ teacher: teacherData });
        return teacherData;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving  teacherData:", error);
      return null;
    }
  };

  retrieveDataEmployee = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("employeeData");
      if (stringValue != null) {
        const employeeData = JSON.parse(stringValue); // Parse the string back to an object
        console.log("Retrieved EmployeeData:", employeeData.length);
        this.setState({ employee: employeeData });
        return employeeData;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving employeeData:", error);
      return null;
    }
  };

  retrieveDataProject = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("projectData");
      if (stringValue != null) {
        const projectData = JSON.parse(stringValue); // Parse the string back to an object
        console.log("Retrieved projectData:", projectData.length);
        this.setState({ project: projectData });
        return projectData;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving ProjectData:", error);
      return null;
    }
  };

  retrieveDataOffice = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("officeData");
      if (stringValue != null) {
        const officeData = JSON.parse(stringValue); // Parse the string back to an object
        console.log("Retrieved OfficeData:", officeData.length);
        this.setState({ office: officeData });
        return officeData;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving OfficeData:", error);
      return null;
    }
  };
  // Get All General Data

  // Get All Project
  getAllProject = async () => {
    try {
      const response = await fetch("http://118.179.80.51:8080/api/v1/projects");
      const json = await response.json();
      this.setState({ allProject: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  // Get All Project

  // Get All Office
  getAllOffice = async () => {
    try {
      const response = await fetch("http://118.179.80.51:8080/api/v1/offices");
      const json = await response.json();
      this.setState({ allOffice: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  // Get All Office

  // Get All School
  getAllSchool = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/di-school",
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      this.setState({ allSchool: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };
  // Get All School

  // Get All Teacher
  getAllTeacher = async () => {
    try {
      const response = await fetch(
        "http://118.179.80.51:8080/api/v1/di-teacher",
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      this.setState({ allTeacher: json, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };
  // Get All Teacher

  // Get All Employee
  getAllEmployee = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/di-employee",
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      this.setState({ allEmployee: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };
  // Get All Employee

  // Get All Designation
  getAllDesignation = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/designations",
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      this.setState({ allDesignation: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };
  // Get All Designation

  // Get All Book-checkout Data for school
  getAllBookCheckoutSchool = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/p-book-checkout",
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      this.setState({
        allBookcheckoutSchoolData: response.data,
        isLoading: false,
      });
      console.log("All Bookcheckout Data: ", response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  // Get All Book-checkout Data for school

  // Register new book-checkout data
  saveBookCheckout = async () => {
    const newBookCheckout = {
      date: this.state.date,
      office: this.state.pickerOffice,
      project: this.state.pickerProject,
      district: this.state.pickerDistrict.name,
      upazilla: this.state.pickerUpazilla.name,
      visitNo: Math.floor(Math.random() * 100),
      visitor: this.state.visitor,
      visitorDesignation: this.state.visitorDesignation,
      lpo: this.state.pickerLPO.employeeRegId,
      lf: this.state.pickerLF.employeeRegId,
      lpoName: this.state.pickerLPOName.name,
      lfName: this.state.pickerLFName.name,
      school: this.state.pickerSchool.name,
      phase: this.state.phase,
      pointTeacher: this.state.pointTeacher,
      month: this.state.pickerMonth,
      year: this.state.pickerYear,
      yearOfEstablished: this.state.yearOfEstablished,
      rtrSchoolId: this.state.rtrSchoolId,
      yearOfSupport: this.state.yearOfSupport,
      note: this.state.note,

      priPrimaryBoy: this.state.priPrimaryBoy,
      priPrimaryGirl: this.state.priPrimaryGirl,
      priPrimaryTotal: this.state.priPrimaryTotal,
      priPrimaryNoBoyBC: this.state.priPrimaryNoBoyBC,
      priPrimaryNoGirlBC: this.state.priPrimaryNoGirlBC,
      priPrimaryNoTotalBC: this.state.priPrimaryNoTotalBC,
      priPrimaryNoBookBoyBC: this.state.priPrimaryNoBookBoyBC,
      priPrimaryNoBookGirlBC: this.state.priPrimaryNoBookGirlBC,
      priPrimaryNoBookTotalBC: this.state.priPrimaryNoBookTotalBC,

      classOneBoy: this.state.classOneBoy,
      classOneGirl: this.state.classOneGirl,
      classOneTotal: this.state.classOneTotal,
      classOneNoBoyBC: this.state.classOneNoBoyBC,
      classOneNoGirlBC: this.state.classOneNoGirlBC,
      classOneNoTotalBC: this.state.classOneNoTotalBC,
      classOneNoBookBoyBC: this.state.classOneNoBookBoyBC,
      classOneNoBookGirlBC: this.state.classOneNoBookGirlBC,
      classOneNoBookTotalBC: this.state.classOneNoBookTotalBC,

      classTwoBoy: this.state.classTwoBoy,
      classTwoGirl: this.state.classTwoGirl,
      classTwoTotal: this.state.classTwoTotal,
      classTwoNoBoyBC: this.state.classTwoNoBoyBC,
      classTwoNoGirlBC: this.state.classTwoNoGirlBC,
      classTwoNoTotalBC: this.state.classTwoNoTotalBC,
      classTwoNoBookBoyBC: this.state.classTwoNoBookBoyBC,
      classTwoNoBookGirlBC: this.state.classTwoNoBookGirlBC,
      classTwoNoBookTotalBC: this.state.classTwoNoBookTotalBC,

      classThreeBoy: this.state.classThreeBoy,
      classThreeGirl: this.state.classThreeGirl,
      classThreeTotal: this.state.classThreeTotal,
      classThreeNoBoyBC: this.state.classThreeNoBoyBC,
      classThreeNoGirlBC: this.state.classThreeNoGirlBC,
      classThreeNoTotalBC: this.state.classThreeNoTotalBC,
      classThreeNoBookBoyBC: this.state.classThreeNoBookBoyBC,
      classThreeNoBookGirlBC: this.state.classThreeNoBookGirlBC,
      classThreeNoBookTotalBC: this.state.classThreeNoBookTotalBC,

      classFourBoy: this.state.classFourBoy,
      classFourGirl: this.state.classFourGirl,
      classFourTotal: this.state.classFourTotal,
      classFourNoBoyBC: this.state.classFourNoBoyBC,
      classFourNoGirlBC: this.state.classFourNoGirlBC,
      classFourNoTotalBC: this.state.classFourNoTotalBC,
      classFourNoBookBoyBC: this.state.classFourNoBookBoyBC,
      classFourNoBookGirlBC: this.state.classFourNoBookGirlBC,
      classFourNoBookTotalBC: this.state.classFourNoBookTotalBC,

      classFiveBoy: this.state.classFiveBoy,
      classFiveGirl: this.state.classFiveGirl,
      classFiveTotal: this.state.classFiveTotal,
      classFiveNoBoyBC: this.state.classFiveNoBoyBC,
      classFiveNoGirlBC: this.state.classFiveNoGirlBC,
      classFiveNoTotalBC: this.state.classFiveNoTotalBC,
      classFiveNoBookBoyBC: this.state.classFiveNoBookBoyBC,
      classFiveNoBookGirlBC: this.state.classFiveNoBookGirlBC,
      classFiveNoBookTotalBC: this.state.classFiveNoBookTotalBC,

      // School total data

      schoolTotalNoGirl: this.state.schoolTotalNoGirl,
      schoolTotalNoBoy: this.state.schoolTotalNoBoy,
      schoolTotalNoStudent: this.state.schoolTotalNoStudent,

      schoolTotalNoGirlBC: this.state.schoolTotalNoGirlBC,
      schoolTotalNoBoyBC: this.state.schoolTotalNoBoyBC,
      schoolTotalNoStudentBC: this.state.schoolTotalNoStudentBC,

      schoolTotalNoBookGirlBC: this.state.schoolTotalNoBookGirlBC,
      schoolTotalNoBookBoyBC: this.state.schoolTotalNoBookBoyBC,
      schoolTotalNoBookBC: this.state.schoolTotalNoBookBC,

      // School total data
    };

    // Validation

    // Check duplicate data
    this.state.duplicateBookCheckoutSchool =
      this.state.allBookcheckoutSchoolData.filter((item) => {
        return (
          item.visitNo == this.state.visitNo &&
          item.school == this.state.pickerSchool &&
          item.month == this.state.pickerMonth &&
          item.year == this.state.pickerYear
        );
      });
    console.log(
      "Duplicate Bookcheckout School Data: ",
      this.state.duplicateBookCheckoutSchool.length
    );
    // Check duplicate data

    // Check empty fields
    if (this.state.date === "") {
      Alert.alert("Alert", "Date can not be empty");
      return;
    } else if (this.state.pickerOffice === "") {
      Alert.alert("Alert", "Field office can not be empty");
      return;
    } else if (this.state.pickerProject === "") {
      Alert.alert("Alert", "Project can not be empty");
      return;
    } else if (this.state.pickerDistrict === "") {
      Alert.alert("Alert", "District can not be empty");
      return;
    } else if (this.state.pickerUpazilla === "") {
      Alert.alert("Alert", "Upazilla can not be empty");
      return;
    } else if (this.state.pickerLPO === "") {
      Alert.alert("Alert", "LPO can not be empty");
      return;
    } else if (this.state.pickerLF === "") {
      Alert.alert("Alert", "LF can not be empty");
      return;
    } else if (this.state.pickerSchool === "") {
      Alert.alert("Alert", "School can not be empty");
      return;
    } else if (this.state.pointTeacher === "") {
      Alert.alert("Alert", "Point teacher can not be empty");
      return;
    } else if (this.state.pickerMonth === "") {
      Alert.alert("Alert", "Month can not be empty");
      return;
    } else if (this.state.pickerYear === "") {
      Alert.alert("Alert", "Year can not be empty");
      return;
    } else if (this.state.pickerPhase === "") {
      Alert.alert("Alert", "Phase can not be empty");
      return;
    } else if (this.state.yearOfEstablished === "") {
      Alert.alert("Alert", "Establish Year can not be empty");
      return;
    } else if (this.state.duplicateBookCheckoutSchool.length > 0) {
      Alert.alert("Alert", "Data already inserted and can't be duplicate");
      return;
    } else {
      // Check empty fields

      // Send data to API
      try {
        let response = await fetch(
          "http://118.179.80.51:8080/api/v1/p-book-checkout",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBookCheckout),
          }
        );
        if (response.status >= 200 && response.status < 300) {
          Alert.alert("Alert", "Book checkout data saved successfully!!!");
          //this.getAllBookCheckoutSchool();
          this.updateState();
          this.forceUpdate();
        } else {
          Alert.alert("Alert", "Error there !!!");
          console.log("Error to save data: " + response.status);
        }
      } catch (errors) {
        alert(errors);
      }
      // Send data to API
    }
  };
  // Register new book-checkout data

  // Alert before submit
  showConfirmDialog = () => {
    return Alert.alert("Alert !!", "Are you sure you want to save data ?", [
      // The "Cancel" button
      {
        text: "Cancel",
      },
      // The "Yes" button
      {
        text: "Yes",
        onPress: this.saveBookCheckout,
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ]);
  };
  // Alert before submit

  // Alert before submit
  showConfirmDialogOffline = () => {
    return Alert.alert("Alert !!", "Are you sure you want to save data ?", [
      // The "Cancel" button
      {
        text: "Cancel",
      },
      // The "Yes" button
      {
        text: "Yes",
        onPress: this.storeLocally,
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ]);
  };
  // Alert before submit

  // Sync stored data
  syncPendingData = async () => {
    try {
      const existingData = await AsyncStorage.getItem(
        "offlineFormsPBookCheckout"
      );
      if (existingData) {
        const formsToSync = JSON.parse(existingData);
        for (const formData of formsToSync) {
          await fetch("http://118.179.80.51:8080/api/v1/p-book-checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
        }
        console.log("LF Data syncing");
        await AsyncStorage.removeItem("offlineFormsPBookCheckout"); // Clear synced data
        console.log(
          "Pending data synced successfully: " + JSON.parse(existingData)
        );
        Alert.alert("Pending data synced successfully!");
      }
    } catch (error) {
      console.error("Error syncing pending data:", error);
      Alert.alert("Error syncing pending data:", error);
    }
  };
  // Sync stored data

  // Save form data locally
  storeLocally = async () => {
    const formData = {
      date: this.state.date,
      office: this.state.pickerOffice,
      project: this.state.pickerProject,
      district: this.state.pickerDistrict.name,
      upazilla: this.state.pickerUpazilla.name,
      visitNo: Math.floor(Math.random() * 100),
      visitor: this.state.visitor,
      visitorDesignation: this.state.visitorDesignation,
      lpo: this.state.pickerLPO.employeeRegId,
      lf: this.state.pickerLF.employeeRegId,
      lpoName: this.state.pickerLPOName.name,
      lfName: this.state.pickerLFName.name,
      school: this.state.pickerSchool.name,
      phase: this.state.phase,
      pointTeacher: this.state.pointTeacher,
      month: this.state.pickerMonth,
      year: this.state.pickerYear,
      yearOfEstablished: this.state.yearOfEstablished,
      rtrSchoolId: this.state.rtrSchoolId,
      yearOfSupport: this.state.yearOfSupport,
      note: this.state.note,

      priPrimaryBoy: this.state.priPrimaryBoy,
      priPrimaryGirl: this.state.priPrimaryGirl,
      priPrimaryTotal: this.state.priPrimaryTotal,
      priPrimaryNoBoyBC: this.state.priPrimaryNoBoyBC,
      priPrimaryNoGirlBC: this.state.priPrimaryNoGirlBC,
      priPrimaryNoTotalBC: this.state.priPrimaryNoTotalBC,
      priPrimaryNoBookBoyBC: this.state.priPrimaryNoBookBoyBC,
      priPrimaryNoBookGirlBC: this.state.priPrimaryNoBookGirlBC,
      priPrimaryNoBookTotalBC: this.state.priPrimaryNoBookTotalBC,

      classOneBoy: this.state.classOneBoy,
      classOneGirl: this.state.classOneGirl,
      classOneTotal: this.state.classOneTotal,
      classOneNoBoyBC: this.state.classOneNoBoyBC,
      classOneNoGirlBC: this.state.classOneNoGirlBC,
      classOneNoTotalBC: this.state.classOneNoTotalBC,
      classOneNoBookBoyBC: this.state.classOneNoBookBoyBC,
      classOneNoBookGirlBC: this.state.classOneNoBookGirlBC,
      classOneNoBookTotalBC: this.state.classOneNoBookTotalBC,

      classTwoBoy: this.state.classTwoBoy,
      classTwoGirl: this.state.classTwoGirl,
      classTwoTotal: this.state.classTwoTotal,
      classTwoNoBoyBC: this.state.classTwoNoBoyBC,
      classTwoNoGirlBC: this.state.classTwoNoGirlBC,
      classTwoNoTotalBC: this.state.classTwoNoTotalBC,
      classTwoNoBookBoyBC: this.state.classTwoNoBookBoyBC,
      classTwoNoBookGirlBC: this.state.classTwoNoBookGirlBC,
      classTwoNoBookTotalBC: this.state.classTwoNoBookTotalBC,

      classThreeBoy: this.state.classThreeBoy,
      classThreeGirl: this.state.classThreeGirl,
      classThreeTotal: this.state.classThreeTotal,
      classThreeNoBoyBC: this.state.classThreeNoBoyBC,
      classThreeNoGirlBC: this.state.classThreeNoGirlBC,
      classThreeNoTotalBC: this.state.classThreeNoTotalBC,
      classThreeNoBookBoyBC: this.state.classThreeNoBookBoyBC,
      classThreeNoBookGirlBC: this.state.classThreeNoBookGirlBC,
      classThreeNoBookTotalBC: this.state.classThreeNoBookTotalBC,

      classFourBoy: this.state.classFourBoy,
      classFourGirl: this.state.classFourGirl,
      classFourTotal: this.state.classFourTotal,
      classFourNoBoyBC: this.state.classFourNoBoyBC,
      classFourNoGirlBC: this.state.classFourNoGirlBC,
      classFourNoTotalBC: this.state.classFourNoTotalBC,
      classFourNoBookBoyBC: this.state.classFourNoBookBoyBC,
      classFourNoBookGirlBC: this.state.classFourNoBookGirlBC,
      classFourNoBookTotalBC: this.state.classFourNoBookTotalBC,

      classFiveBoy: this.state.classFiveBoy,
      classFiveGirl: this.state.classFiveGirl,
      classFiveTotal: this.state.classFiveTotal,
      classFiveNoBoyBC: this.state.classFiveNoBoyBC,
      classFiveNoGirlBC: this.state.classFiveNoGirlBC,
      classFiveNoTotalBC: this.state.classFiveNoTotalBC,
      classFiveNoBookBoyBC: this.state.classFiveNoBookBoyBC,
      classFiveNoBookGirlBC: this.state.classFiveNoBookGirlBC,
      classFiveNoBookTotalBC: this.state.classFiveNoBookTotalBC,

      // School total data

      schoolTotalNoGirl: this.state.schoolTotalNoGirl,
      schoolTotalNoBoy: this.state.schoolTotalNoBoy,
      schoolTotalNoStudent: this.state.schoolTotalNoStudent,

      schoolTotalNoGirlBC: this.state.schoolTotalNoGirlBC,
      schoolTotalNoBoyBC: this.state.schoolTotalNoBoyBC,
      schoolTotalNoStudentBC: this.state.schoolTotalNoStudentBC,

      schoolTotalNoBookGirlBC: this.state.schoolTotalNoBookGirlBC,
      schoolTotalNoBookBoyBC: this.state.schoolTotalNoBookBoyBC,
      schoolTotalNoBookBC: this.state.schoolTotalNoBookBC,
    };

    // Validation
    if (this.state.date === "") {
      Alert.alert("Alert", "Date can not be empty");
      return;
    } else if (this.state.pickerOffice === "") {
      Alert.alert("Alert", "Field office can not be empty");
      return;
    } else if (this.state.pickerProject === "") {
      Alert.alert("Alert", "Project can not be empty");
      return;
    } else if (this.state.pickerDistrict === "") {
      Alert.alert("Alert", "District can not be empty");
      return;
    } else if (this.state.pickerUpazilla === "") {
      Alert.alert("Alert", "Upazilla can not be empty");
      return;
    } else if (this.state.pickerLPO === "") {
      Alert.alert("Alert", "LPO can not be empty");
      return;
    } else if (this.state.pickerLF === "") {
      Alert.alert("Alert", "LF can not be empty");
      return;
    } else if (this.state.pickerSchool === "") {
      Alert.alert("Alert", "School can not be empty");
      return;
    } else if (this.state.pointTeacher === "") {
      Alert.alert("Alert", "Point teacher can not be empty");
      return;
    } else if (this.state.pickerMonth === "") {
      Alert.alert("Alert", "Month can not be empty");
      return;
    } else if (this.state.pickerYear === "") {
      Alert.alert("Alert", "Year can not be empty");
      return;
    } else if (this.state.pickerPhase === "") {
      Alert.alert("Alert", "Phase can not be empty");
      return;
    } else if (this.state.yearOfEstablished === "") {
      Alert.alert("Alert", "Establish Year can not be empty");
      return;
    } else if (this.state.duplicateBookCheckoutSchool.length > 0) {
      Alert.alert("Alert", "Data already inserted and can't be duplicate");
      return;
    } else {
      // Save data locally
      try {
        const existingData = await AsyncStorage.getItem(
          "offlineFormsPBookCheckout"
        );
        const forms = existingData ? JSON.parse(existingData) : [];
        forms.push(formData);
        await AsyncStorage.setItem(
          "offlineFormsPBookCheckout",
          JSON.stringify(forms)
        );
        //console.log("Data stored locally: " + JSON.stringify(forms));
        console.log("Data stored locally.");
        Alert.alert("Data stored locally.");
        this.updateState();
      } catch (error) {
        console.error("Error storing data locally:", error);
        Alert.alert("Error storing data locally:", error);
      }
      // Save data locally
    }
  };
  // Save form data locally

  render() {
    const { checked } = this.state;

    // For Datepicker
    const {
      // Network
      isConnected,
      connectionType,
      // Network

      show,
      date,
      mode,
      isCollapsedGeneral,
      isCollapsedPP,
      isCollapsedOne,
      isCollapsedTwo,
      isCollapsedThree,
      isCollapsedFour,
      isCollapsedFive,
    } = this.state;
    // For Datepicker

    // navigation
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 10 }}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  marginTop: 2,
                  marginBottom: 2,
                  alignContent: "center",
                  textAlign: "center",
                  alignSelf: "center",
                  marginLeft: 100,
                  marginRight: 100,
                }}
              >
                PREVAIL মাসিক বই চেক-আউট ফরম (Monthly Book Checkout Form)
              </Text>
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>
              সাধারণ তথ্য: (General Information:)
            </Text>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ flexDirection: "row", padding: 10 }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      তারিখ: (Date:)
                    </Text>
                    <Text
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Text style={{ fontSize: 14 }}>
                    {String(this.state.date.toISOString().slice(0, 10))}
                  </Text>
                  <Button onPress={this.datepicker} title="Select" />
                  {show && (
                    <DateTimePicker
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={this.setDate}
                    />
                  )}
                </View>
                <View style={{ flex: 1 }}></View>
              </View>
              <View style={{ flexDirection: "row", padding: 10 }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      মাস: (Month:)
                    </Text>
                    <Text
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 170,
                    }}
                    selectedValue={this.state && this.state.pickerMonth}
                    onValueChange={(value) => {
                      this.setState({ pickerMonth: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"January"} value={"January"} />
                    <Picker.Item label={"February"} value={"February"} />
                    <Picker.Item label={"March"} value={"March"} />
                    <Picker.Item label={"April"} value={"April"} />
                    <Picker.Item label={"May"} value={"May"} />
                    <Picker.Item label={"June"} value={"June"} />
                    <Picker.Item label={"July"} value={"July"} />
                    <Picker.Item label={"August"} value={"August"} />
                    <Picker.Item label={"September"} value={"September"} />
                    <Picker.Item label={"October"} value={"October"} />
                    <Picker.Item label={"November"} value={"November"} />
                    <Picker.Item label={"December"} value={"December"} />
                  </Picker>
                  {/* <Text style={{ color: "red" }}>
                    {this.state.projectError}
                  </Text> */}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      বছর: (Year:)
                    </Text>
                    <Text
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 170,
                    }}
                    selectedValue={this.state.pickerYear}
                    onValueChange={(value) => {
                      this.setState({ pickerYear: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"2018"} value={"2018"} />
                    <Picker.Item label={"2019"} value={"2019"} />
                    <Picker.Item label={"2020"} value={"2020"} />
                    <Picker.Item label={"2021"} value={"2021"} />
                    <Picker.Item label={"2022"} value={"2022"} />
                    <Picker.Item label={"2023"} value={"2023"} />
                    <Picker.Item label={"2024"} value={"2024"} />
                    <Picker.Item label={"2025"} value={"2025"} />
                    <Picker.Item label={"2026"} value={"2026"} />
                    <Picker.Item label={"2027"} value={"2027"} />
                    <Picker.Item label={"2028"} value={"2028"} />
                  </Picker>
                  {/* <Text style={{ color: "red" }}>
                    {this.state.projectError}
                  </Text> */}
                </View>
              </View>

              <View style={{ flexDirection: "row", padding: 2, margin: 2 }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      জেলা: (District:)
                    </Text>
                    <Text
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 170,
                    }}
                    selectedValue={this.state && this.state.pickerDistrict}
                    onValueChange={(item, key) => {
                      // console.log(item, key);
                      this.setState({
                        pickerDistrict: item,
                        pickerDistrictKey: item.id,
                      });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item key={""} label={"Select"} value={""} />
                    {districts
                      .filter(
                        (item) =>
                          item.name == "Jamalpur" ||
                          item.name == "Narail" ||
                          item.name == "Brahmanbaria" ||
                          item.name == "Coxsbazar" ||
                          item.name == "Dhaka" ||
                          item.name == "Natore" ||
                          item.name == "Moulvibazar" ||
                          item.name == "Jhalakathi" ||
                          item.name == "Habiganj" ||
                          item.name == "Sirajganj"
                      )
                      .map((item) => {
                        //console.log(item);
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.name}
                            value={item}
                          />
                        );
                      })}
                  </Picker>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      উপজেলা: (Upazilla:)
                    </Text>
                    <Text
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 170,
                    }}
                    selectedValue={this.state && this.state.pickerUpazilla}
                    onValueChange={(item, key) => {
                      this.setState({
                        pickerUpazilla: item,
                        pickerUpazillaKey: item.id,
                      });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item key={""} label={"Select"} value={""} />
                    {upazillas
                      .filter(
                        (item) =>
                          item.district_id == this.state.pickerDistrictKey
                      )
                      .map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.name}
                            value={item}
                          />
                        );
                      })}
                  </Picker>
                </View>
              </View>

              <View style={{ flexDirection: "row", padding: 2, margin: 2 }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      ফিল্ড অফিস: (Field Office:)
                    </Text>
                    <Text
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 140,
                    }}
                    selectedValue={this.state.pickerOffice}
                    onValueChange={(value) => {
                      this.setState({ pickerOffice: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.office
                      .filter((item) => {
                        return item.address.includes(
                          this.state.pickerDistrict.name
                        );
                      })
                      .map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.name}
                            value={item.name}
                          />
                        );
                      })}
                  </Picker>
                </View>
                <View style={{ flex: 2 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      প্রোজেক্ট: (Project/Program:)
                    </Text>
                    <Text
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 280,
                    }}
                    selectedValue={this.state && this.state.pickerProject}
                    onValueChange={(value) => {
                      this.setState({ pickerProject: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.project
                      .filter((item) => {
                        return item.projectDetail.includes(
                          this.state.pickerOffice
                        );
                      })
                      .map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.name}
                            value={item.name}
                          />
                        );
                      })}
                  </Picker>
                </View>
              </View>

              <View style={{ flexDirection: "row", padding: 2, margin: 2 }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      পরিদর্শক এর নাম: (Visitor:)
                    </Text>
                  </View>
                  <TextInput
                    style={{
                      height: 50,
                      width: 250,
                      padding: 5,
                      borderWidth: 1,
                    }}
                    keyboardType="default"
                    placeholder=""
                    editable={true}
                    onChangeText={(text) => this.setState({ visitor: text })}
                    value={this.state.visitor + ""}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      পদবী: (Designation:)
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 170,
                    }}
                    selectedValue={this.state.visitorDesignation}
                    onValueChange={(value) => {
                      this.setState({ visitorDesignation: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"LF"} value={"LF"} />
                    <Picker.Item label={"LPO"} value={"LPO"} />
                    <Picker.Item label={"Other"} value={"Other"} />
                  </Picker>
                </View>
              </View>

              <View style={{ flexDirection: "row", padding: 2, margin: 2 }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      দায়িত্ব প্রাপ্ত এলপিও : (LPO:)
                    </Text>
                    <Text
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 230,
                    }}
                    selectedValue={this.state.pickerLPO}
                    onValueChange={(value) => {
                      this.setState({ pickerLPO: value, pickerLPOName: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.employee
                      .filter((item) => {
                        return item.designation.includes("PO");
                        // &&
                        // item.project === this.state.pickerProject
                      })
                      .map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.name}
                            value={item}
                          />
                        );
                      })}
                  </Picker>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      দায়িত্ব প্রাপ্ত এলএফ : (LF:)
                    </Text>
                    <Text
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 230,
                    }}
                    selectedValue={this.state && this.state.pickerLF}
                    onValueChange={(value) => {
                      this.setState({
                        pickerLF: value,
                        pickerLFName: value,
                      });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.employee
                      .filter((item) => {
                        return (
                          item.designation == "LF" &&
                          item.supervisor == this.state.pickerLPO.employeeRegId
                        );
                      })
                      .map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.name}
                            value={item}
                          />
                        );
                      })}
                  </Picker>
                </View>
              </View>

              <View style={{ flexDirection: "row", padding: 2, margin: 2 }}>
                <View style={{ flex: 2 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      বিদ্যালয়ের নাম: (School:)
                    </Text>
                    <Text
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 320,
                    }}
                    selectedValue={this.state.pickerSchool}
                    onValueChange={(value) => {
                      this.setState({
                        pickerSchool: value,
                        rtrSchoolId: value.gsdId,
                        yearOfSupport: value.supportYear.toString(),
                      });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.school
                      .filter((item) => {
                        return item.lf == this.state.pickerLF.employeeRegId;
                      })
                      .map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.name}
                            value={item}
                          />
                        );
                      })}
                  </Picker>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      ফেইজ: (Phase:)
                    </Text>
                    <Text
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 150,
                    }}
                    selectedValue={this.state.phase}
                    onValueChange={(value) => {
                      this.setState({ phase: value });
                      //console.log("pickerPhase ==" + this.state.pickerPhase);
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"Phase 1"} value={"Phase 1"} />
                    <Picker.Item label={"Phase 2,3"} value={"Phase 2"} />
                  </Picker>
                </View>
              </View>

              <View style={{ flexDirection: "row", padding: 2, margin: 2 }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      স্কুল আইডি
                    </Text>
                    <Text
                      style={{
                        textAlign: "right",
                        color: "red",
                        fontSize: 16,
                      }}
                    >
                      *
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    (School ID:)
                  </Text>
                  <Text></Text>
                  <Text>{this.state.rtrSchoolId}</Text>
                  {/* <Picker
                    style={{
                      height: 60,
                      width: 180,
                    }}
                    selectedValue={this.state.rtrSchoolId}
                    onValueChange={(value) => {
                      this.setState({
                        rtrSchoolId: value,
                      });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.allSchool
                      .filter((item) => {
                        return item.name === this.state.pickerSchool;
                      })
                      .map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.gsdId}
                            value={item.gsdId}
                          />
                        );
                      })}
                  </Picker> */}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      সাপোর্ট ইয়ার
                    </Text>
                    <Text
                      style={{
                        textAlign: "right",
                        color: "red",
                        fontSize: 16,
                      }}
                    >
                      *
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    (Year of Support:)
                  </Text>
                  <Text></Text>
                  <Text>{this.state.yearOfSupport}</Text>
                  {/* <Picker
                    style={{
                      height: 60,
                      width: 160,
                    }}
                    selectedValue={this.state.yearOfSupport}
                    onValueChange={(value) => {
                      this.setState({
                        yearOfSupport: value,
                      });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    {this.state.allSchool
                      .filter((item) => {
                        return item.name === this.state.pickerSchool;
                      })
                      .map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.supportYear.toString()}
                            value={item.supportYear.toString()}
                          />
                        );
                      })}
                  </Picker> */}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      প্রতিষ্ঠার সন: (Established:)
                    </Text>
                    <Text
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 160,
                    }}
                    selectedValue={this.state.yearOfEstablished}
                    onValueChange={(value) => {
                      this.setState({ yearOfEstablished: value });
                      //console.log("pickerPhase ==" + this.state.pickerPhase);
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"2023"} value={"2023"} />
                    <Picker.Item label={"2024"} value={"2024"} />
                    <Picker.Item label={"2025"} value={"2025"} />
                    <Picker.Item label={"2026"} value={"2026"} />
                    <Picker.Item label={"2027"} value={"2027"} />
                    <Picker.Item label={"2028"} value={"2028"} />
                  </Picker>
                </View>
              </View>

              <View style={{ flexDirection: "row", padding: 2, margin: 2 }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      পয়েন্ট শিক্ষকের নাম: (Point Teacher:)
                    </Text>
                    <Text
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 250,
                    }}
                    enabled={true}
                    selectedValue={this.state.pointTeacher}
                    onValueChange={(value) => {
                      this.setState({
                        pointTeacher: value,
                      });
                      // Find perivious visit data
                      // this.setState({
                      //   preMonthData:
                      //     this.state.allLibraryObservationData.filter(
                      //       (item) => {
                      //         return (
                      //           item.rtrSchoolId === this.state.rtrSchoolId &&
                      //           item.project === this.state.pickerProject &&
                      //           item.year === this.state.pickerYear
                      //         );
                      //       }
                      //     ),
                      // });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.teacher
                      .filter((item) => {
                        return (
                          item.schoolId === this.state.rtrSchoolId
                          // &&
                          // (item.instructionG1 === "Yes" ||
                          //   item.instructionG2 === "Yes")
                        );
                      })
                      .map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.name}
                            value={item.name}
                          />
                        );
                      })}
                  </Picker>
                  <TextInput
                    style={{
                      height: 40,
                      width: 250,
                      padding: 5,
                      borderWidth: 1,
                    }}
                    placeholder=""
                    onChangeText={(text) =>
                      this.setState({ pointTeacher: text })
                    }
                    value={this.state.pointTeacher + ""}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row", padding: 2, margin: 2 }}>
                <View style={{ flex: 1 }}></View>
              </View>

              <View style={{ flexDirection: "row", padding: 2, margin: 2 }}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    মন্তব্য : (Comment:)
                  </Text>

                  <TextInput
                    style={{
                      height: 80,
                      width: 530,
                      padding: 5,
                      borderWidth: 1,
                    }}
                    keyboardType="default"
                    placeholder=""
                    editable={true}
                    multiline={true}
                    onChangeText={(text) =>
                      this.setState({
                        note: text,
                      })
                    }
                    value={this.state.note + ""}
                  />
                </View>
              </View>
            </Card>
          </View>

          {/* <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>নির্দেশনা </Text>
            <Card style={{ padding: 10, margin: 10 }}>
              <Text style={{ padding: 5, fontWeight: "bold", fontSize: 18 }}>
                পূর্ববর্তী মাসে বই চেক-আউট হয়েছে (নিচের টেবিল অনুযায়ী প্রতিটি
                বিদ্যালয় থেকে তথ্য সংগ্রহ করুন এবং প্রতি মাসের তথ্য পরের মাসের
                ১৫ তারিখের মধ্যে সিস্টেমে ইনপুট করুন) ।
              </Text>
            </Card>
          </View> */}

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>
              শ্রেণি অনুযায়ী সকল শিক্ষার্থীর বই চেক-আউট ও চেক-ইন তথ্য
            </Text>

            {/* <Button
              title="Press me"
              onPress={() => this.setState({ isCollapsedPP: false })}
            ></Button>
            <Collapsible collapsed={isCollapsedPP}></Collapsible> */}
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <Card
                  style={{
                    padding: 10,
                    margin: 10,
                    flex: 1,
                    alignSelf: "center",
                  }}
                >
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={styles.bigGreenText}>
                      প্রাক-প্রাথমিক শ্রেণি
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      শ্রেণিকক্ষ পাঠাগারের বইয়ের চেক-আউট তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          placeholder=""
                          value={this.state.priPrimaryBoy + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            if (isNaN(value)) return false;

                            this.setState({
                              priPrimaryBoy: value,
                              priPrimaryTotal:
                                value + this.state.priPrimaryGirl,
                              schoolTotalNoStudent:
                                value +
                                this.state.priPrimaryGirl +
                                this.state.classFiveTotal +
                                this.state.classFourTotal +
                                this.state.classThreeTotal +
                                this.state.classTwoTotal +
                                this.state.classOneTotal,
                              schoolTotalNoBoy:
                                value +
                                this.state.classOneBoy +
                                this.state.classTwoBoy +
                                this.state.classThreeBoy +
                                this.state.classFourBoy +
                                this.state.classFiveBoy,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          placeholder=""
                          value={this.state.priPrimaryGirl + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            if (isNaN(value)) return false;

                            this.setState({
                              priPrimaryGirl: value,
                              priPrimaryTotal: value + this.state.priPrimaryBoy,
                              schoolTotalNoStudent:
                                value +
                                this.state.priPrimaryBoy +
                                this.state.classFiveTotal +
                                this.state.classFourTotal +
                                this.state.classThreeTotal +
                                this.state.classTwoTotal +
                                this.state.classOneTotal,
                              schoolTotalNoGirl:
                                value +
                                this.state.classOneGirl +
                                this.state.classTwoGirl +
                                this.state.classThreeGirl +
                                this.state.classFourGirl +
                                this.state.classFiveGirl,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryTotal + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.priPrimaryNoBoyBC + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoBoyBC: value,
                              priPrimaryNoTotalBC:
                                value + this.state.priPrimaryNoGirlBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.priPrimaryNoGirlBC +
                                this.state.classOneNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFourNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoBoyBC:
                                value +
                                this.state.classOneNoBoyBC +
                                this.state.classTwoNoBoyBC +
                                this.state.classThreeNoBoyBC +
                                this.state.classFourNoBoyBC +
                                this.state.classFiveNoBoyBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.priPrimaryNoGirlBC + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoGirlBC: value,
                              priPrimaryNoTotalBC:
                                value + this.state.priPrimaryNoBoyBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.priPrimaryNoBoyBC +
                                this.state.classOneNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFourNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoGirlBC:
                                value +
                                this.state.classOneNoGirlBC +
                                this.state.classTwoNoGirlBC +
                                this.state.classThreeNoGirlBC +
                                this.state.classFourNoGirlBC +
                                this.state.classFiveNoGirlBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoTotalBC + ""}
                          editable={false}
                          onChangeText={(text) =>
                            this.setState({
                              priPrimaryNoTotalBC: text,
                            })
                          }
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoBookBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoBookBoyBC: value,
                              priPrimaryNoBookTotalBC:
                                value + this.state.priPrimaryNoBookGirlBC,
                              schoolTotalNoBookBoyBC:
                                value +
                                this.state.classOneNoBookBoyBC +
                                this.state.classTwoNoBookBoyBC +
                                this.state.classThreeNoBookBoyBC +
                                this.state.classFourNoBookBoyBC +
                                this.state.classFiveNoBookBoyBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.priPrimaryNoBookGirlBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFourNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoBookGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoBookGirlBC: value,
                              priPrimaryNoBookTotalBC:
                                value + this.state.priPrimaryNoBookBoyBC,
                              schoolTotalNoBookGirlBC:
                                value +
                                this.state.classOneNoBookGirlBC +
                                this.state.classTwoNoBookGirlBC +
                                this.state.classThreeNoBookGirlBC +
                                this.state.classFourNoBookGirlBC +
                                this.state.classFiveNoBookGirlBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.priPrimaryNoBookBoyBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFourNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoBookTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              priPrimaryNoBookTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <Card
                  style={{
                    padding: 10,
                    margin: 10,
                    flex: 1,
                    alignSelf: "center",
                  }}
                >
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={styles.bigGreenText}>প্রথম শ্রেণি</Text>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      শ্রেণিকক্ষ পাঠাগারের বইয়ের চেক আউট তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneBoy + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneBoy: value,
                              classOneTotal: value + this.state.classOneGirl,
                              schoolTotalNoStudent:
                                value +
                                this.state.classOneGirl +
                                this.state.classFiveTotal +
                                this.state.classFourTotal +
                                this.state.classThreeTotal +
                                this.state.classTwoTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoBoy:
                                value +
                                this.state.priPrimaryBoy +
                                this.state.classTwoBoy +
                                this.state.classThreeBoy +
                                this.state.classFourBoy +
                                this.state.classFiveBoy,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneGirl + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneGirl: value,
                              classOneTotal: value + this.state.classOneBoy,
                              schoolTotalNoStudent:
                                value +
                                this.state.classOneBoy +
                                this.state.classFiveTotal +
                                this.state.classFourTotal +
                                this.state.classThreeTotal +
                                this.state.classTwoTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoGirl:
                                value +
                                this.state.priPrimaryGirl +
                                this.state.classTwoGirl +
                                this.state.classThreeGirl +
                                this.state.classFourGirl +
                                this.state.classFiveGirl,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneTotal + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classOneTotal: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoBoyBC: value,
                              classOneNoTotalBC:
                                value + this.state.classOneNoGirlBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classOneNoGirlBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFourNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoBoyBC:
                                value +
                                this.state.priPrimaryNoBoyBC +
                                this.state.classTwoNoBoyBC +
                                this.state.classThreeNoBoyBC +
                                this.state.classFourNoBoyBC +
                                this.state.classFiveNoBoyBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoGirlBC: value,
                              classOneNoTotalBC:
                                value + this.state.classOneNoBoyBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classOneNoBoyBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFourNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoGirlBC:
                                value +
                                this.state.priPrimaryNoGirlBC +
                                this.state.classTwoNoGirlBC +
                                this.state.classThreeNoGirlBC +
                                this.state.classFourNoGirlBC +
                                this.state.classFiveNoGirlBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classOneNoTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBookBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoBookBoyBC: value,
                              classOneNoBookTotalBC:
                                value + this.state.classOneNoBookGirlBC,
                              schoolTotalNoBookBoyBC:
                                this.state.priPrimaryNoBookBoyBC +
                                value +
                                this.state.classTwoNoBookBoyBC +
                                this.state.classThreeNoBookBoyBC +
                                this.state.classFourNoBookBoyBC +
                                this.state.classFiveNoBookBoyBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classOneNoBookGirlBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFourNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBookGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoBookGirlBC: value,
                              classOneNoBookTotalBC:
                                value + this.state.classOneNoBookBoyBC,
                              schoolTotalNoBookGirlBC:
                                this.state.priPrimaryNoBookGirlBC +
                                value +
                                this.state.classTwoNoBookGirlBC +
                                this.state.classThreeNoBookGirlBC +
                                this.state.classFourNoBookGirlBC +
                                this.state.classFiveNoBookGirlBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classOneNoBookBoyBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFourNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBookTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classOneNoBookTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <Card
                  style={{
                    padding: 10,
                    margin: 10,
                    flex: 1,
                    alignSelf: "center",
                  }}
                >
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={styles.bigGreenText}>দ্বিতীয় শ্রেণি</Text>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      শ্রেণিকক্ষ পাঠাগারের বইয়ের চেক আউট তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoBoy + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoBoy: value,
                              classTwoTotal: value + this.state.classTwoGirl,
                              schoolTotalNoStudent:
                                value +
                                this.state.classTwoGirl +
                                this.state.classFiveTotal +
                                this.state.classFourTotal +
                                this.state.classThreeTotal +
                                this.state.classOneTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoBoy:
                                value +
                                this.state.priPrimaryBoy +
                                this.state.classOneBoy +
                                this.state.classThreeBoy +
                                this.state.classFourBoy +
                                this.state.classFiveBoy,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoGirl + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoGirl: value,
                              classTwoTotal: value + this.state.classTwoBoy,
                              schoolTotalNoStudent:
                                value +
                                this.state.classTwoBoy +
                                this.state.classFiveTotal +
                                this.state.classFourTotal +
                                this.state.classThreeTotal +
                                this.state.classOneTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoGirl:
                                value +
                                this.state.classOneGirl +
                                this.state.priPrimaryGirl +
                                this.state.classThreeGirl +
                                this.state.classFourGirl +
                                this.state.classFiveGirl,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoTotal + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classTwoTotal: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoBoyBC: value,
                              classTwoNoTotalBC:
                                value + this.state.classTwoNoGirlBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classTwoNoGirlBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classOneNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFourNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoBoyBC:
                                value +
                                this.state.priPrimaryNoBoyBC +
                                this.state.classOneNoBoyBC +
                                this.state.classThreeNoBoyBC +
                                this.state.classFourNoBoyBC +
                                this.state.classFiveNoBoyBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoGirlBC: value,
                              classTwoNoTotalBC:
                                value + this.state.classTwoNoBoyBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classTwoNoBoyBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classOneNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFourNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoGirlBC:
                                value +
                                this.state.priPrimaryNoGirlBC +
                                this.state.classOneNoGirlBC +
                                this.state.classThreeNoGirlBC +
                                this.state.classFourNoGirlBC +
                                this.state.classFiveNoGirlBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classTwoNoTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBookBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoBookBoyBC: value,
                              classTwoNoBookTotalBC:
                                value + this.state.classTwoNoBookGirlBC,
                              schoolTotalNoBookBoyBC:
                                this.state.priPrimaryNoBookBoyBC +
                                this.state.classOneNoBookBoyBC +
                                value +
                                this.state.classThreeNoBookBoyBC +
                                this.state.classFourNoBookBoyBC +
                                this.state.classFiveNoBookBoyBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classTwoNoBookGirlBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFourNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBookGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoBookGirlBC: value,
                              classTwoNoBookTotalBC:
                                value + this.state.classTwoNoBookBoyBC,
                              schoolTotalNoBookGirlBC:
                                this.state.priPrimaryNoBookGirlBC +
                                this.state.classOneNoBookGirlBC +
                                value +
                                this.state.classThreeNoBookGirlBC +
                                this.state.classFourNoBookGirlBC +
                                this.state.classFiveNoBookGirlBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classTwoNoBookBoyBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFourNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBookTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classTwoNoBookTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <Card
                  style={{
                    padding: 10,
                    margin: 10,
                    flex: 1,
                    alignSelf: "center",
                  }}
                >
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={styles.bigGreenText}>তৃতীয় শ্রেণি</Text>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      শ্রেণিকক্ষ পাঠাগারের বইয়ের চেক আউট তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeBoy + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeBoy: value,
                              classThreeTotal:
                                value + this.state.classThreeGirl,
                              schoolTotalNoStudent:
                                value +
                                this.state.classThreeGirl +
                                this.state.classFiveTotal +
                                this.state.classFourTotal +
                                this.state.classTwoTotal +
                                this.state.classOneTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoBoy:
                                value +
                                this.state.priPrimaryBoy +
                                this.state.classOneBoy +
                                this.state.classTwoBoy +
                                this.state.classFourBoy +
                                this.state.classFiveBoy,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeGirl + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeGirl: value,
                              classThreeTotal: value + this.state.classThreeBoy,
                              schoolTotalNoStudent:
                                value +
                                this.state.classThreeBoy +
                                this.state.classFiveTotal +
                                this.state.classFourTotal +
                                this.state.classTwoTotal +
                                this.state.classOneTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoGirl:
                                value +
                                this.state.classOneGirl +
                                this.state.classTwoGirl +
                                this.state.priPrimaryGirl +
                                this.state.classFourGirl +
                                this.state.classFiveGirl,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeTotal + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classThreeTotal: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoBoyBC: value,
                              classThreeNoTotalBC:
                                value + this.state.classThreeNoGirlBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classThreeNoGirlBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classOneNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classFourNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoBoyBC:
                                value +
                                this.state.priPrimaryNoBoyBC +
                                this.state.classTwoNoBoyBC +
                                this.state.classOneNoBoyBC +
                                this.state.classFourNoBoyBC +
                                this.state.classFiveNoBoyBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoGirlBC: value,
                              classThreeNoTotalBC:
                                value + this.state.classThreeNoBoyBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classThreeNoBoyBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classOneNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classFourNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoGirlBC:
                                value +
                                this.state.priPrimaryNoGirlBC +
                                this.state.classTwoNoGirlBC +
                                this.state.classOneNoGirlBC +
                                this.state.classFourNoGirlBC +
                                this.state.classFiveNoGirlBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classThreeNoTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBookBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoBookBoyBC: value,
                              classThreeNoBookTotalBC:
                                value + this.state.classThreeNoBookGirlBC,
                              schoolTotalNoBookBoyBC:
                                this.state.priPrimaryNoBookBoyBC +
                                this.state.classOneNoBookBoyBC +
                                this.state.classTwoNoBookBoyBC +
                                value +
                                this.state.classFourNoBookBoyBC +
                                this.state.classFiveNoBookBoyBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classThreeNoBookGirlBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classFourNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBookGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoBookGirlBC: value,
                              classThreeNoBookTotalBC:
                                value + this.state.classThreeNoBookBoyBC,
                              schoolTotalNoBookGirlBC:
                                this.state.priPrimaryNoBookGirlBC +
                                this.state.classOneNoBookGirlBC +
                                this.state.classTwoNoBookGirlBC +
                                value +
                                this.state.classFourNoBookGirlBC +
                                this.state.classFiveNoBookGirlBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classThreeNoBookBoyBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classFourNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBookTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classThreeNoBookTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <Card
                  style={{
                    padding: 10,
                    margin: 10,
                    flex: 1,
                    alignSelf: "center",
                  }}
                >
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={styles.bigGreenText}>চতুর্থ শ্রেণি</Text>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      শ্রেণিকক্ষ পাঠাগারের বইয়ের চেক আউট তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourBoy + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourBoy: value,
                              classFourTotal: value + this.state.classFourGirl,
                              schoolTotalNoStudent:
                                value +
                                this.state.classFourGirl +
                                this.state.classFiveTotal +
                                this.state.classThreeTotal +
                                this.state.classTwoTotal +
                                this.state.classOneTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoBoy:
                                value +
                                this.state.priPrimaryBoy +
                                this.state.classOneBoy +
                                this.state.classTwoBoy +
                                this.state.classThreeBoy +
                                this.state.classFiveBoy,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourGirl + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourGirl: value,
                              classFourTotal: value + this.state.classFourBoy,
                              schoolTotalNoStudent:
                                value +
                                this.state.classFourBoy +
                                this.state.classFiveTotal +
                                this.state.classThreeTotal +
                                this.state.classTwoTotal +
                                this.state.classOneTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoGirl:
                                value +
                                this.state.classOneGirl +
                                this.state.classTwoGirl +
                                this.state.classThreeGirl +
                                this.state.priPrimaryGirl +
                                this.state.classFiveGirl,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourTotal + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classFourTotal: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoBoyBC: value,
                              classFourNoTotalBC:
                                value + this.state.classFourNoGirlBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classFourNoGirlBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classOneNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoBoyBC:
                                value +
                                this.state.priPrimaryNoBoyBC +
                                this.state.classTwoNoBoyBC +
                                this.state.classThreeNoBoyBC +
                                this.state.classOneNoBoyBC +
                                this.state.classFiveNoBoyBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoGirlBC: value,
                              classFourNoTotalBC:
                                value + this.state.classFourNoBoyBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classFourNoBoyBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classOneNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoGirlBC:
                                value +
                                this.state.priPrimaryNoGirlBC +
                                this.state.classTwoNoGirlBC +
                                this.state.classThreeNoGirlBC +
                                this.state.classOneNoGirlBC +
                                this.state.classFiveNoGirlBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classFourNoTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBookBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoBookBoyBC: value,
                              classFourNoBookTotalBC:
                                value + this.state.classFourNoBookGirlBC,
                              schoolTotalNoBookBoyBC:
                                this.state.priPrimaryNoBookBoyBC +
                                this.state.classOneNoBookBoyBC +
                                this.state.classTwoNoBookBoyBC +
                                this.state.classThreeNoBookBoyBC +
                                value +
                                this.state.classFiveNoBookBoyBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classFourNoBookGirlBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBookGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoBookGirlBC: value,
                              classFourNoBookTotalBC:
                                value + this.state.classFourNoBookBoyBC,
                              schoolTotalNoBookGirlBC:
                                this.state.priPrimaryNoBookGirlBC +
                                this.state.classOneNoBookGirlBC +
                                this.state.classTwoNoBookGirlBC +
                                this.state.classThreeNoBookGirlBC +
                                value +
                                this.state.classFiveNoBookGirlBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classFourNoBookBoyBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBookTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classFourNoBookTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <Card
                  style={{
                    padding: 10,
                    margin: 10,
                    flex: 1,
                    alignSelf: "center",
                  }}
                >
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={styles.bigGreenText}>পঞ্চম শ্রেণি</Text>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      শ্রেণিকক্ষ পাঠাগারের বইয়ের চেক আউট তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveBoy + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveBoy: value,
                              classFiveTotal: value + this.state.classFiveGirl,
                              schoolTotalNoStudent:
                                value +
                                this.state.classFiveGirl +
                                this.state.classFourTotal +
                                this.state.classThreeTotal +
                                this.state.classTwoTotal +
                                this.state.classOneTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoBoy:
                                value +
                                this.state.priPrimaryBoy +
                                this.state.classOneBoy +
                                this.state.classTwoBoy +
                                this.state.classThreeBoy +
                                this.state.classFourBoy,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveGirl + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveGirl: value,
                              classFiveTotal: value + this.state.classFiveBoy,
                              schoolTotalNoStudent:
                                value +
                                this.state.classFiveBoy +
                                this.state.classFourTotal +
                                this.state.classThreeTotal +
                                this.state.classTwoTotal +
                                this.state.classOneTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoGirl:
                                value +
                                this.state.classOneGirl +
                                this.state.classTwoGirl +
                                this.state.classThreeGirl +
                                this.state.classFourGirl +
                                this.state.priPrimaryGirl,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveTotal + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classFiveTotal: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoBoyBC: value,
                              classFiveNoTotalBC:
                                value + this.state.classFiveNoGirlBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classFiveNoGirlBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classOneNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFourNoTotalBC,
                              schoolTotalNoBoyBC:
                                value +
                                this.state.priPrimaryNoBoyBC +
                                this.state.classTwoNoBoyBC +
                                this.state.classThreeNoBoyBC +
                                this.state.classFourNoBoyBC +
                                this.state.classOneNoBoyBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoGirlBC: value,
                              classFiveNoTotalBC:
                                value + this.state.classFiveNoBoyBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classFiveNoBoyBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classOneNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFourNoTotalBC,
                              schoolTotalNoGirlBC:
                                value +
                                this.state.priPrimaryNoGirlBC +
                                this.state.classTwoNoGirlBC +
                                this.state.classThreeNoGirlBC +
                                this.state.classFourNoGirlBC +
                                this.state.classOneNoGirlBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classFiveNoTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBookBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoBookBoyBC: value,
                              classFiveNoBookTotalBC:
                                value + this.state.classFiveNoBookGirlBC,
                              schoolTotalNoBookBoyBC:
                                this.state.priPrimaryNoBookBoyBC +
                                this.state.classOneNoBookBoyBC +
                                this.state.classTwoNoBookBoyBC +
                                this.state.classThreeNoBookBoyBC +
                                this.state.classFourNoBookBoyBC +
                                value,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classFiveNoBookGirlBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFourNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBookGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoBookGirlBC: value,
                              classFiveNoBookTotalBC:
                                value + this.state.classFiveNoBookBoyBC,
                              schoolTotalNoBookGirlBC:
                                this.state.priPrimaryNoBookGirlBC +
                                this.state.classOneNoBookGirlBC +
                                this.state.classTwoNoBookGirlBC +
                                this.state.classThreeNoBookGirlBC +
                                this.state.classFourNoBookGirlBC +
                                value,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classFiveNoBookBoyBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFourNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 100,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBookTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classFiveNoBookTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <Card
                  style={{
                    padding: 10,
                    margin: 10,
                    flex: 1,
                    alignSelf: "center",
                  }}
                >
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={styles.bigGreenText}>বিদ্যালয়ের মোট তথ্য</Text>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      বিদ্যালয়ের শ্রেণিকক্ষ পাঠাগারের মোট তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>বিদ্যালয়ের মোট মেয়ে শিক্ষার্থীর সংখ্যা:</Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoGirl + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>বিদ্যালয়ের মোট ছেলে শিক্ষার্থীর সংখ্যা:</Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoBoy + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>বিদ্যালয়ের মোট শিক্ষার্থীর সংখ্যা: </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoStudent + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>
                          বিদ্যালয়ের মোট বই চেক আউট করা মেয়ে শিক্ষার্থীর সংখ্যা:
                        </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoGirlBC + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>
                          বিদ্যালয়ের মোট বই চেক আউট করা ছেলে শিক্ষার্থীর সংখ্যা:
                        </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoBoyBC + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>
                          বিদ্যালয়ের মোট বই চেক আউট করা শিক্ষার্থীর সংখ্যা:
                        </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoStudentBC + ""}
                        />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>
                          বিদ্যালয়ের চেক আউট করা মেয়ে শিক্ষার্থীর মোট বইয়ের
                          সংখ্যা:
                        </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoBookGirlBC + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>
                          বিদ্যালয়ের চেক আউট করা ছেলে শিক্ষার্থীর মোট বইয়ের
                          সংখ্যা:
                        </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoBookBoyBC + ""}
                        />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>বিদ্যালয়ের চেক আউটকৃত মোট বইয়ের সংখ্যা: </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoBookBC + ""}
                        />
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>
          </View>
          <View style={{ padding: 10 }}>
            {isConnected ? (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "60%",
                  backgroundColor: "#A3C754",
                  borderRadius: 25,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                  marginLeft: 100,
                  marginBottom: 20,
                }}
                onPress={this.showConfirmDialog}
              >
                <Text>Submit Online</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "60%",
                  backgroundColor: "#CC8285",
                  borderRadius: 25,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                  marginLeft: 100,
                  marginBottom: 20,
                }}
                onPress={this.showConfirmDialogOffline}
              >
                <Text>Submit Offline</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        <View>
          <Text style={{ alignItems: "center", justifyContent: "center" }}>
            &copy; All Rights Reserved, RoomtoRead Bangladesh
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    height: height,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoMain: {
    height: 80,
    width: 80,
    resizeMode: "contain",
  },
  textStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  bigBlueText: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 20,
  },
  bigRedText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 12,
    alignSelf: "center",
    alignContent: "center",
  },
  bigGreenText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
  },
  pickerStyle: {
    height: 150,
    width: "80%",
    color: "#344953",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
});
