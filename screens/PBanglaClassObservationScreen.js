//  Author: Mohammad Jihad Hossain
//  Create Date: 22/09/2025
//  Modify Date: 06/10/2025
//  Description: PBanglaClassObservationScreen component

import React, { useRef, useEffect, useState } from "react";
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
  Animated,
  Dimensions,
  BackHandler,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { divisions, districts, upazillas, unions } from "bd-geojs";

import { Card } from "react-native-shadow-cards";

import DateTimePicker from "@react-native-community/datetimepicker";

import CollapsibleView from "@eliav2/react-native-collapsible-view";

import ExpandableView from "react-native-expandable-view";

import Collapsible from "react-native-collapsible";

import LFScreen from "./LFScreen";

const screenDimensions = Dimensions.get("screen");
const windowDimensions = Dimensions.get("window");

const { screenwHeight } = screenDimensions.height;
const { screenWidth } = screenDimensions.width;

const { windowHeight } = Dimensions.get("window").height;
const { windowWidth } = Dimensions.get("window").width;

export default class PBanglaClassObservationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Network Connection
      isConnected: null,
      connectionType: null,
      // Network Connection

      inputEnabled: true,
      isCollapsed: false,

      //Preloaded Data

      school: [],
      teacher: [],
      employee: [],
      project: [],
      office: [],

      allProject: [],
      allOffice: [],

      allDesignation: [],
      allLibraryIndicator: [],
      allBanglaIndicator: [],
      allLibraryObservationData: [],
      allBanglaClassObservationData: [],
      //Preloaded Data

      // previous visit data of the bangla class
      preMonthData: [],
      // previous visit data of the bangla class

      // Duplicate data check
      duplicateBanglaClassObservationData: [],
      // Duplicate data check

      //button status
      buttonState: false,
      //button status

      isLoading: true,

      checked: false,

      option: "yes",

      choosenIndex: 0,

      // Date picker property
      date: new Date(),
      selectedDate: new Date(),
      time: new Date(Date.now()),
      mode: "date",
      show: false,
      startTime: "",
      endTime: "",
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
      pickerVisitor: "",
      pickerDesignation: "",
      pickerVisitorOffice: "",
      pickerLF: "",
      pickerLPO: "",
      pickerLFName: "",
      pickerLPOName: "",
      pickerMonth: "",
      pickerYear: "",

      classTeacher: "",
      classTeacherGender: "",
      teacherTrained: "",
      grade: "",
      section: "",
      classStartTime: "",
      classEndTime: "",
      teachingTopic: "",
      teachingDay: "",
      studentBoy: 0,
      studentGirl: 0,
      studentTotal: 0,
      presentBoy: 0,
      presentGirl: 0,
      presentTotal: 0,

      visitor: "",
      visitorDesignation: "",

      note: "",

      // General data

      typeOfReading: "",

      lastFollowupTopic1: "",
      lastFollowupTopic2: "",
      lastFollowupTopic3: "",

      ind11TeacherFollowedTeacherGuideInClassStatus: "",
      ind11TeacherFollowedTeacherGuideInClassNote: "",

      ind12FollowedIDoWeDoYouDoStatus: "",
      ind12FollowedIDoWeDoYouDoNote: "",

      ind13FollowedContinuityOfLessonStatus: "",
      ind13FollowedContinuityOfLessonNote: "",

      ind14ImplementedAllTaskInTimeStatus: "",
      ind14ImplementedAllTaskInTimeNote: "",

      ind15InstructedToUseWorkbookStatus: "",
      ind15InstructedToUseWorkbookNote: "",

      ind16IndependentReadingOpportunityStatus: "",
      ind16IndependentReadingOpportunityNote: "",

      ind21CorrectlyPronouncedStatus: "",
      ind21CorrectlyPronouncedNote: "",

      ind22TaughtCorrectlyAllowPracticeStatus: "",
      ind22TaughtCorrectlyAllowPracticeNote: "",

      ind23DemonstratesFluentReadingStatus: "",
      ind23DemonstratesFluentReadingNote: "",

      ind24AllowReadIndividuallyPairGroupsStatus: "",
      ind24AllowReadIndividuallyPairGroupsNote: "",

      ind25FollowsInstructionsInWritingStatus: "",
      ind25FollowsInstructionsInWritingNote: "",

      ind31AskedHelpfulQuestionsStatus: "",
      ind31AskedHelpfulQuestionsNote: "",

      ind32TaughtVocabularyNewSentenceStatus: "",
      ind32TaughtVocabularyNewSentenceNote: "",

      ind33CheckWritingSpellingPunctuationStatus: "",
      ind33CheckWritingSpellingPunctuationNote: "",

      ind34CheckedWeDoYouDoStatus: "",
      ind34CheckedWeDoYouDoNote: "",

      bestPracticeInd1: "",
      bestPracticeInd2: "",
      bestPracticeInd3: "",

      coachingSupportInd1: "",
      coachingSupportInd2: "",
      coachingSupportDetailsInd1: "",
      coachingSupportDetailsInd2: "",

      coachingSupportTeacher: "",
      coachingSupportLF: "",

      agreedStatement1: "",
      agreedStatement2: "",

      question1: "",

      student1: "",
      student2: "",
      student3: "",
      student4: "",
      student5: "",

      noRightFor1: 0,
      noWrongFor1: 0,
      totalFor1: 0,
      noRightFor2: 0,
      noWrongFor2: 0,
      totalFor2: 0,
      noRightFor3: 0,
      noWrongFor3: 0,
      totalFor3: 0,
      noRightFor4: 0,
      noWrongFor4: 0,
      totalFor4: 0,
      noRightFor5: 0,
      noWrongFor5: 0,
      totalFor5: 0,

      teacherStatus: "",

      // error message
      dateError: "",
      errorInd11: "",
      errorInd12: "",
      errorInd13: "",
      errorInd14: "",
      errorInd15: "",
      errorInd16: "",

      errorInd21: "",
      errorInd22: "",
      errorInd23: "",
      errorInd24: "",
      errorInd25: "",

      errorInd31: "",
      errorInd32: "",
      errorInd33: "",
      errorInd34: "",
      // error message
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

    // this.getAllSchool();
    // this.getAllTeacher();
    // this.getAllEmployee();
    // this.getAllOffice();
    // this.getAllProject();

    this.retrieveDataOffice();
    this.retrieveDataProject();
    this.retrieveDataSchool();
    this.retrieveDataTeacher();
    this.retrieveDataEmployee();

    this.getAllDesignation();
    this.getAllBanglaIndicator();
    this.getAllBanglaClassObservation();

    // Alert in back-button press of device
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress,
    );
    // Alert in back-button press of device

    console.log("Component mounted");
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
      { cancelable: false }, // Prevent dismissing the alert by tapping outside
    );
    return true; // Return true to prevent default back button behavior
  };
  // Alert in back-button press of device function

  // For Datepicker
  setDate = (event, value) => {
    this.setState({
      show: false,
    }); // Hide picker after selection

    this.setState({
      selectedDate: value,
      pickerMonth: value.toLocaleString("default", { month: "long" }),
      pickerYear: value.getFullYear().toString(),
    });
  };

  setStartTime = (event, value) => {
    this.setState({
      show: false,
    }); // Hide picker after selection

    this.setState({
      schoolEntryTime: value,
    });
  };

  setEndTime = (event, value) => {
    this.setState({
      show: false,
    }); // Hide picker after selection

    this.setState({
      schoolExitTime: value,
    });
  };

  show = (mode) => {
    this.setState({
      show: true,
      mode: mode,
    });
  };

  datepicker = () => {
    this.show("date");
  };

  timepicker = () => {
    this.show("time");
  };
  // For Datepicker

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

  // fetchDataAndSave = async () => {
  //   try {
  //     const response = await fetch("YOUR_API_ENDPOINT"); // Replace with your API endpoint
  //     const data = await response.json();

  //     // Convert the data to a string before storing
  //     const jsonValue = JSON.stringify(data);

  //     await AsyncStorage.setItem("YOUR_STORAGE_KEY", jsonValue); // Choose a unique key
  //     console.log("Data saved successfully!");
  //   } catch (error) {
  //     console.error("Error fetching or saving data:", error);
  //   }
  // };

  // retrieveData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem("YOUR_STORAGE_KEY");
  //     if (jsonValue != null) {
  //       const data = JSON.parse(jsonValue); // Parse the string back to an object
  //       console.log("Retrieved data:", data);
  //       return data;
  //     }
  //     return null;
  //   } catch (error) {
  //     console.error("Error retrieving data:", error);
  //     return null;
  //   }
  // };
  // Get All General Data

  // Update state
  updateToInitialState = () => {
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
      pickerVisitor: "",
      pickerDesignation: "",
      pickerVisitorOffice: "",
      pickerLF: "",
      pickerLPO: "",
      pickerLFName: "",
      pickerLPOName: "",
      pickerMonth: "",
      pickerYear: "",

      classTeacher: "",
      classTeacherGender: "",
      teacherTrained: "",
      grade: "",
      section: "",
      classStartTime: "",
      classEndTime: "",
      teachingTopic: "",
      teachingDay: "",

      studentTotal: 0,

      presentTotal: 0,

      visitor: "",
      visitorDesignation: "",

      note: "",

      // General data

      lastFollowupTopic1: "",
      lastFollowupTopic2: "",
      lastFollowupTopic3: "",

      ind11TeacherFollowedTeacherGuideInClassStatus: "",
      ind11TeacherFollowedTeacherGuideInClassNote: "",

      ind12FollowedIDoWeDoYouDoStatus: "",
      ind12FollowedIDoWeDoYouDoNote: "",

      ind13FollowedContinuityOfLessonStatus: "",
      ind13FollowedContinuityOfLessonNote: "",

      ind14ImplementedAllTaskInTimeStatus: "",
      ind14ImplementedAllTaskInTimeNote: "",

      ind15InstructedToUseWorkbookStatus: "",
      ind15InstructedToUseWorkbookNote: "",

      ind16IndependentReadingOpportunityStatus: "",
      ind16IndependentReadingOpportunityNote: "",

      ind21CorrectlyPronouncedStatus: "",
      ind21CorrectlyPronouncedNote: "",

      ind22TaughtCorrectlyAllowPracticeStatus: "",
      ind22TaughtCorrectlyAllowPracticeNote: "",

      ind23DemonstratesFluentReadingStatus: "",
      ind23DemonstratesFluentReadingNote: "",

      ind24AllowReadIndividuallyPairGroupsStatus: "",
      ind24AllowReadIndividuallyPairGroupsNote: "",

      ind25FollowsInstructionsInWritingStatus: "",
      ind25FollowsInstructionsInWritingNote: "",

      ind31AskedHelpfulQuestionsStatus: "",
      ind31AskedHelpfulQuestionsNote: "",

      ind32TaughtVocabularyNewSentenceStatus: "",
      ind32TaughtVocabularyNewSentenceNote: "",

      ind33CheckWritingSpellingPunctuationStatus: "",
      ind33CheckWritingSpellingPunctuationNote: "",

      ind34CheckedWeDoYouDoStatus: "",
      ind34CheckedWeDoYouDoNote: "",

      bestPracticeInd1: "",
      bestPracticeInd2: "",
      bestPracticeInd3: "",

      coachingSupportInd1: "",
      coachingSupportInd2: "",
      coachingSupportDetailsInd1: "",
      coachingSupportDetailsInd2: "",

      coachingSupportTeacher: "",
      coachingSupportLF: "",

      agreedStatement1: "",
      agreedStatement2: "",

      question1: "",

      student1: "",
      student2: "",
      student3: "",
      student4: "",
      student5: "",

      noRightFor1: 0,
      noWrongFor1: 0,
      totalFor1: 0,
      noRightFor2: 0,
      noWrongFor2: 0,
      totalFor2: 0,
      noRightFor3: 0,
      noWrongFor3: 0,
      totalFor3: 0,
      noRightFor4: 0,
      noWrongFor4: 0,
      totalFor4: 0,
      noRightFor5: 0,
      noWrongFor5: 0,
      totalFor5: 0,

      teacherStatus: "",

      // error message
      dateError: "",
      errorInd11: "",
      errorInd12: "",
      errorInd13: "",
      errorInd14: "",
      errorInd15: "",
      errorInd16: "",

      errorInd21: "",
      errorInd22: "",
      errorInd23: "",
      errorInd24: "",
      errorInd25: "",

      errorInd31: "",
      errorInd32: "",
      errorInd33: "",
      errorInd34: "",
      // error message
    });
  };
  // Update state

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
  // Get All Office}

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
        },
      );

      this.setState({ school: response.data, isLoading: false });
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
      );
      const json = await response.json();
      this.setState({ teacher: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
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
        },
      );

      this.setState({ employee: response.data, isLoading: false });
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
        },
      );

      this.setState({ allDesignation: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };
  // Get All Designation

  // Get All Bangla Indicator
  getAllBanglaIndicator = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/di-bangla-indicator",
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      this.setState({ allBanglaIndicator: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };
  // Get All Bangla Indicator

  // Get All Bangla Class Data for school
  getAllBanglaClassObservation = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/p-bangla-class",
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      this.setState({
        allBanglaClassObservationData: response.data,
        isLoading: false,
      });
      console.log(
        "All Bangla-class Data: ",
        this.state.allBanglaClassObservationData.length,
      );
    } catch (error) {
      console.log(error);
    }
  };
  // Get All Bangla Class Data for school

  // Register new Bangla Class data
  saveBanglaClassObservation = async () => {
    const newBanglaClass = {
      date: this.state.selectedDate,
      month: this.state.pickerMonth,
      year: this.state.pickerYear,
      district: this.state.pickerDistrict.name,
      upazilla: this.state.pickerUpazilla.name,
      fieldOffice: this.state.pickerOffice,
      project: this.state.pickerProject,
      visitNo: Math.floor(Math.random() * 100),
      lpo: this.state.pickerLPO.employeeRegId,
      lpoName: this.state.pickerLPOName.name,
      lf: this.state.pickerLF.employeeRegId,
      lfName: this.state.pickerLFName.name,
      school: this.state.pickerSchool.name,
      rtrSchoolId: this.state.rtrSchoolId,
      yearOfSupport: this.state.yearOfSupport,
      classTeacher: this.state.classTeacher,
      grade: this.state.grade,
      section: this.state.section,
      classStartTime: this.state.classStartTime,
      classEndTime: this.state.classEndTime,
      contentName: this.state.teachingTopic,
      periodDay: this.state.teachingDay,
      totalAdmittedStudent: this.state.studentTotal,
      totalPresentStudent: this.state.presentTotal,

      visitor: this.state.visitor,
      visitorDesignation: this.state.visitorDesignation,

      note: this.state.note,

      lastFollowupTopic1: this.state.lastFollowupTopic1,
      lastFollowupTopic2: this.state.lastFollowupTopic2,
      lastFollowupTopic3: this.state.lastFollowupTopic3,

      ind11TeacherFollowedTeacherGuideInClassStatus:
        this.state.ind11TeacherFollowedTeacherGuideInClassStatus,
      ind11TeacherFollowedTeacherGuideInClassNote:
        this.state.ind11TeacherFollowedTeacherGuideInClassNote,

      ind12FollowedIDoWeDoYouDoStatus:
        this.state.ind12FollowedIDoWeDoYouDoStatus,
      ind12FollowedIDoWeDoYouDoNote: this.state.ind12FollowedIDoWeDoYouDoNote,

      ind13FollowedContinuityOfLessonStatus:
        this.state.ind13FollowedContinuityOfLessonStatus,
      ind13FollowedContinuityOfLessonNote:
        this.state.ind13FollowedContinuityOfLessonNote,

      ind14ImplementedAllTaskInTimeStatus:
        this.state.ind14ImplementedAllTaskInTimeStatus,
      ind14ImplementedAllTaskInTimeNote:
        this.state.ind14ImplementedAllTaskInTimeNote,

      ind15InstructedToUseWorkbookStatus:
        this.state.ind15InstructedToUseWorkbookStatus,
      ind15InstructedToUseWorkbookNote:
        this.state.ind15InstructedToUseWorkbookNote,

      ind16IndependentReadingOpportunityStatus:
        this.state.ind16IndependentReadingOpportunityStatus,
      ind16IndependentReadingOpportunityNote:
        this.state.ind16IndependentReadingOpportunityNote,

      ind21CorrectlyPronouncedStatus: this.state.ind21CorrectlyPronouncedStatus,
      ind21CorrectlyPronouncedNote: this.state.ind21CorrectlyPronouncedNote,

      ind22TaughtCorrectlyAllowPracticeStatus:
        this.state.ind22TaughtCorrectlyAllowPracticeStatus,
      ind22TaughtCorrectlyAllowPracticeNote:
        this.state.ind22TaughtCorrectlyAllowPracticeNote,

      ind23DemonstratesFluentReadingStatus:
        this.state.ind23DemonstratesFluentReadingStatus,
      ind23DemonstratesFluentReadingNote:
        this.state.ind23DemonstratesFluentReadingNote,

      ind24AllowReadIndividuallyPairGroupsStatus:
        this.state.ind24AllowReadIndividuallyPairGroupsStatus,
      ind24AllowReadIndividuallyPairGroupsNote:
        this.state.ind24AllowReadIndividuallyPairGroupsNote,

      ind25FollowsInstructionsInWritingStatus:
        this.state.ind25FollowsInstructionsInWritingStatus,
      ind25FollowsInstructionsInWritingNote:
        this.state.ind25FollowsInstructionsInWritingNote,

      ind31AskedHelpfulQuestionsStatus:
        this.state.ind31AskedHelpfulQuestionsStatus,
      ind31AskedHelpfulQuestionsNote: this.state.ind31AskedHelpfulQuestionsNote,

      ind32TaughtVocabularyNewSentenceStatus:
        this.state.ind32TaughtVocabularyNewSentenceStatus,
      ind32TaughtVocabularyNewSentenceNote:
        this.state.ind32TaughtVocabularyNewSentenceNote,

      ind33CheckWritingSpellingPunctuationStatus:
        this.state.ind33CheckWritingSpellingPunctuationStatus,
      ind33CheckWritingSpellingPunctuationNote:
        this.state.ind33CheckWritingSpellingPunctuationNote,

      ind34CheckedWeDoYouDoStatus: this.state.ind34CheckedWeDoYouDoStatus,
      ind34CheckedWeDoYouDoNote: this.state.ind34CheckedWeDoYouDoNote,

      bestPracticeInd1: this.state.bestPracticeInd1,
      bestPracticeInd2: this.state.bestPracticeInd2,
      bestPracticeInd3: this.state.bestPracticeInd3,

      coachingSupportInd1: this.state.coachingSupportInd1,
      coachingSupportInd2: this.state.coachingSupportInd2,
      coachingSupportDetailsInd1: this.state.coachingSupportDetailsInd1,
      coachingSupportDetailsInd2: this.state.coachingSupportDetailsInd2,

      coachingSupportTeacher: this.state.coachingSupportTeacher,
      coachingSupportLF: this.state.coachingSupportLF,

      agreedStatement1: this.state.agreedStatement1,
      agreedStatement2: this.state.agreedStatement2,

      question1: this.state.question1,

      student1: this.state.student1,
      student2: this.state.student2,
      student3: this.state.student3,

      noRightFor1: this.state.noRightFor1,
      noWrongFor1: this.state.noWrongFor1,
      totalFor1: this.state.totalFor1,
      noRightFor2: this.state.noRightFor2,
      noWrongFor2: this.state.noWrongFor2,
      totalFor2: this.state.totalFor2,
      noRightFor3: this.state.noRightFor3,
      noWrongFor3: this.state.noWrongFor3,
      totalFor3: this.state.totalFor3,

      teacherStatus: this.state.teacherStatus,
    };

    // Validation

    //Check duplicate data
    // this.state.duplicateBanglaClassObservationData =
    //   this.state.allBanglaClassObservationData.filter((item) => {
    //     return (
    //       item.date === this.state.date &&
    //       item.school === this.state.pickerSchool &&
    //       item.month === this.state.pickerMonth &&
    //       item.year === this.state.pickerYear &&
    //       item.grade === this.state.grade &&
    //       item.section === this.state.section &&
    //       item.classTeacher.trim() === this.state.classTeacher.trim()
    //     );
    //   });

    // console.log(
    //   "Duplicate Bangla Class Data: ",
    //   this.state.duplicateBanglaClassObservationData.length
    // );
    //Check duplicate data

    // Validation
    if (this.state.selectedDate === "") {
      Alert.alert("Alert", "Date can not be empty");
      return;
    } else if (this.state.pickerMonth === "") {
      Alert.alert("Alert", "Month can not be empty");
      return;
    } else if (this.state.pickerYear === "") {
      Alert.alert("Alert", "Year can not be empty");
      return;
    } else if (this.state.pickerDistrict === "") {
      Alert.alert("Alert", "District can not be empty");
      return;
    } else if (this.state.pickerUpazilla === "") {
      Alert.alert("Alert", "Upazilla can not be empty");
      return;
    } else if (this.state.pickerOffice === "") {
      Alert.alert("Alert", "Office can not be empty");
      return;
    } else if (this.state.pickerProject === "") {
      Alert.alert("Alert", "Project can not be empty");
      return;
    } else if (this.state.pickerLF === "") {
      Alert.alert("Alert", "LF can not be empty");
      return;
    } else if (this.state.pickerLPO === "") {
      Alert.alert("Alert", "LPO can not be empty");
      return;
    } else if (this.state.pickerSchool === "") {
      Alert.alert("Alert", "School can not be empty");
      return;
    } else if (this.state.classTeacher === "") {
      Alert.alert("Alert", "Class Teacher can not be empty");
      return;
    } else if (this.state.classStartTime === "") {
      Alert.alert("Alert", "Class start time can not be empty");
      return;
    } else if (this.state.classEndTime === "") {
      Alert.alert("Alert", "Class end time can not be empty");
      return;
    } else if (this.state.teachingTopic === "") {
      Alert.alert("Alert", "Lesson can not be empty");
      return;
    } else if (this.state.teachingDay === "") {
      Alert.alert("Alert", "Period can not be empty");
      return;
    } else if (this.state.grade === "") {
      Alert.alert("Alert", "Grade can not be empty");
      return;
    } else if (this.state.section === "") {
      Alert.alert("Alert", "Section can not be empty");
      return;
    } else if (this.state.studentTotal === "") {
      Alert.alert("Alert", "Admitted student can not be empty");
      return;
    } else if (this.state.presentTotal === "") {
      Alert.alert("Alert", "Pressent student can not be empty");
      return;
    } else if (
      this.state.ind11TeacherFollowedTeacherGuideInClassStatus === ""
    ) {
      Alert.alert("Alert", "Indicator-1.1 can not be empty");
      return;
    } else if (this.state.ind12FollowedIDoWeDoYouDoStatus === "") {
      Alert.alert("Alert", "Indicator-1.2 can not be empty");
      return;
    } else if (this.state.ind13FollowedContinuityOfLessonStatus === "") {
      Alert.alert("Alert", "Indicator-1.3 can not be empty");
      return;
    } else if (this.state.ind14ImplementedAllTaskInTimeStatus === "") {
      Alert.alert("Alert", "Indicator-1.4 can not be empty");
      return;
    } else if (this.state.ind15InstructedToUseWorkbookStatus === "") {
      Alert.alert("Alert", "Indicator-1.5 can not be empty");
      return;
    } else if (this.state.ind16IndependentReadingOpportunityStatus === "") {
      Alert.alert("Alert", "Indicator-1.6 can not be empty");
      return;
    } else if (this.state.ind21CorrectlyPronouncedStatus === "") {
      Alert.alert("Alert", "Indicator-2.1 can not be empty");
      return;
    } else if (this.state.ind22TaughtCorrectlyAllowPracticeStatus === "") {
      Alert.alert("Alert", "Indicator-2.2 can not be empty");
      return;
    } else if (this.state.ind23DemonstratesFluentReadingStatus === "") {
      Alert.alert("Alert", "Indicator-2.3 can not be empty");
      return;
    } else if (this.state.ind24AllowReadIndividuallyPairGroupsStatus === "") {
      Alert.alert("Alert", "Indicator-2.4 can not be empty");
      return;
    } else if (this.state.ind25FollowsInstructionsInWritingStatus === "") {
      Alert.alert("Alert", "Indicator-2.5 can not be empty");
      return;
    } else if (this.state.ind31AskedHelpfulQuestionsStatus === "") {
      Alert.alert("Alert", "Indicator-3.1 can not be empty");
      return;
    } else if (this.state.ind32TaughtVocabularyNewSentenceStatus === "") {
      Alert.alert("Alert", "Indicator-3.2 can not be empty");
      return;
    } else if (this.state.ind33CheckWritingSpellingPunctuationStatus === "") {
      Alert.alert("Alert", "Indicator-3.2 can not be empty");
      return;
    } else if (this.state.ind34CheckedWeDoYouDoStatus === "") {
      Alert.alert("Alert", "Indicator-3.2 can not be empty");
      return;
    } else if (this.state.coachingSupportTeacher === "") {
      Alert.alert("Alert", "Teacher to-do can not be empty");
      return;
    } else if (this.state.coachingSupportLF === "") {
      Alert.alert("Alert", "LF to-do can not be empty");
      return;
    } else if (this.state.duplicateBanglaClassObservationData.length > 0) {
      Alert.alert("Alert", "Duplicate Bangla Class data !!");
      return;
    } else {
      // Send data to API
      if (this.state.isConnected) {
        try {
          let response = await fetch(
            "http://118.179.80.51:8080/api/v1/p-bangla-class",
            {
              method: "POST",
              mode: "no-cors",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newBanglaClass),
            },
          );
          if (response.status >= 200 && response.status < 300) {
            Alert.alert(
              "Alert",
              "Bangla class obsvervatio data saved successfully to online!!!",
            );
            //this.getAllBanglaClassObservation();
            this.updateToInitialState();
          } else {
            Alert.alert("Alert", "Error to save data online !!!");
          }
        } catch (errors) {
          alert(errors);
          // Offline: Store data locally
          this.storeLocally();
        }
      } else {
        // Offline: Store data locally
        this.storeLocally();
      }

      // Send data to API
    }
  };
  // Register new Bangla Class data

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
        onPress: this.saveBanglaClassObservation,
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ]);
  };
  // Alert before submit

  // Alert before offline submit
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
  // Alert before offline submit

  // Save form data
  // handleSubmit = async (formData) => {
  //   const state = await NetInfo.fetch();

  //   if (state.isConnected) {
  //     // Online: Send data to server
  //     try {
  //       await fetch("YOUR_API_ENDPOINT", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(formData),
  //       });
  //       console.log("Data synced successfully!");
  //     } catch (error) {
  //       console.error("Error syncing data:", error);
  //       // If sync fails, store locally for later retry
  //       await storeLocally(formData);
  //     }
  //   } else {
  //     // Offline: Store data locally
  //     await storeLocally(formData);
  //   }
  // };
  // Save form data

  // Save form data locally
  storeLocally = async () => {
    const formData = {
      date: this.state.selectedDate,
      month: this.state.pickerMonth,
      year: this.state.pickerYear,
      district: this.state.pickerDistrict.name,
      upazilla: this.state.pickerUpazilla.name,
      fieldOffice: this.state.pickerOffice,
      project: this.state.pickerProject,
      visitNo: Math.floor(Math.random() * 100),
      lpo: this.state.pickerLPO.employeeRegId,
      lpoName: this.state.pickerLPOName.name,
      lf: this.state.pickerLF.employeeRegId,
      lfName: this.state.pickerLFName.name,
      school: this.state.pickerSchool.name,
      rtrSchoolId: this.state.rtrSchoolId,
      yearOfSupport: this.state.yearOfSupport,
      classTeacher: this.state.classTeacher,
      grade: this.state.grade,
      section: this.state.section,
      classStartTime: this.state.classStartTime,
      classEndTime: this.state.classEndTime,
      contentName: this.state.teachingTopic,
      periodDay: this.state.teachingDay,
      totalAdmittedStudent: this.state.studentTotal,
      totalPresentStudent: this.state.presentTotal,

      visitor: this.state.visitor,
      visitorDesignation: this.state.visitorDesignation,

      note: this.state.note,

      lastFollowupTopic1: this.state.lastFollowupTopic1,
      lastFollowupTopic2: this.state.lastFollowupTopic2,
      lastFollowupTopic3: this.state.lastFollowupTopic3,

      ind11TeacherFollowedTeacherGuideInClassStatus:
        this.state.ind11TeacherFollowedTeacherGuideInClassStatus,
      ind11TeacherFollowedTeacherGuideInClassNote:
        this.state.ind11TeacherFollowedTeacherGuideInClassNote,

      ind12FollowedIDoWeDoYouDoStatus:
        this.state.ind12FollowedIDoWeDoYouDoStatus,
      ind12FollowedIDoWeDoYouDoNote: this.state.ind12FollowedIDoWeDoYouDoNote,

      ind13FollowedContinuityOfLessonStatus:
        this.state.ind13FollowedContinuityOfLessonStatus,
      ind13FollowedContinuityOfLessonNote:
        this.state.ind13FollowedContinuityOfLessonNote,

      ind14ImplementedAllTaskInTimeStatus:
        this.state.ind14ImplementedAllTaskInTimeStatus,
      ind14ImplementedAllTaskInTimeNote:
        this.state.ind14ImplementedAllTaskInTimeNote,

      ind15InstructedToUseWorkbookStatus:
        this.state.ind15InstructedToUseWorkbookStatus,
      ind15InstructedToUseWorkbookNote:
        this.state.ind15InstructedToUseWorkbookNote,

      ind16IndependentReadingOpportunityStatus:
        this.state.ind16IndependentReadingOpportunityStatus,
      ind16IndependentReadingOpportunityNote:
        this.state.ind16IndependentReadingOpportunityNote,

      ind21CorrectlyPronouncedStatus: this.state.ind21CorrectlyPronouncedStatus,
      ind21CorrectlyPronouncedNote: this.state.ind21CorrectlyPronouncedNote,

      ind22TaughtCorrectlyAllowPracticeStatus:
        this.state.ind22TaughtCorrectlyAllowPracticeStatus,
      ind22TaughtCorrectlyAllowPracticeNote:
        this.state.ind22TaughtCorrectlyAllowPracticeNote,

      ind23DemonstratesFluentReadingStatus:
        this.state.ind23DemonstratesFluentReadingStatus,
      ind23DemonstratesFluentReadingNote:
        this.state.ind23DemonstratesFluentReadingNote,

      ind24AllowReadIndividuallyPairGroupsStatus:
        this.state.ind24AllowReadIndividuallyPairGroupsStatus,
      ind24AllowReadIndividuallyPairGroupsNote:
        this.state.ind24AllowReadIndividuallyPairGroupsNote,

      ind25FollowsInstructionsInWritingStatus:
        this.state.ind25FollowsInstructionsInWritingStatus,
      ind25FollowsInstructionsInWritingNote:
        this.state.ind25FollowsInstructionsInWritingNote,

      ind31AskedHelpfulQuestionsStatus:
        this.state.ind31AskedHelpfulQuestionsStatus,
      ind31AskedHelpfulQuestionsNote: this.state.ind31AskedHelpfulQuestionsNote,

      ind32TaughtVocabularyNewSentenceStatus:
        this.state.ind32TaughtVocabularyNewSentenceStatus,
      ind32TaughtVocabularyNewSentenceNote:
        this.state.ind32TaughtVocabularyNewSentenceNote,

      ind33CheckWritingSpellingPunctuationStatus:
        this.state.ind33CheckWritingSpellingPunctuationStatus,
      ind33CheckWritingSpellingPunctuationNote:
        this.state.ind33CheckWritingSpellingPunctuationNote,

      ind34CheckedWeDoYouDoStatus: this.state.ind34CheckedWeDoYouDoStatus,
      ind34CheckedWeDoYouDoNote: this.state.ind34CheckedWeDoYouDoNote,

      bestPracticeInd1: this.state.bestPracticeInd1,
      bestPracticeInd2: this.state.bestPracticeInd2,
      bestPracticeInd3: this.state.bestPracticeInd3,

      coachingSupportInd1: this.state.coachingSupportInd1,
      coachingSupportInd2: this.state.coachingSupportInd2,
      coachingSupportDetailsInd1: this.state.coachingSupportDetailsInd1,
      coachingSupportDetailsInd2: this.state.coachingSupportDetailsInd2,

      coachingSupportTeacher: this.state.coachingSupportTeacher,
      coachingSupportLF: this.state.coachingSupportLF,

      agreedStatement1: this.state.agreedStatement1,
      agreedStatement2: this.state.agreedStatement2,

      question1: this.state.question1,

      student1: this.state.student1,
      student2: this.state.student2,
      student3: this.state.student3,

      noRightFor1: this.state.noRightFor1,
      noWrongFor1: this.state.noWrongFor1,
      totalFor1: this.state.totalFor1,
      noRightFor2: this.state.noRightFor2,
      noWrongFor2: this.state.noWrongFor2,
      totalFor2: this.state.totalFor2,
      noRightFor3: this.state.noRightFor3,
      noWrongFor3: this.state.noWrongFor3,
      totalFor3: this.state.totalFor3,

      teacherStatus: this.state.teacherStatus,
    };

    // Validation
    if (this.state.selectedDate === "") {
      Alert.alert("Alert", "Date can not be empty");
      return;
    } else if (this.state.pickerMonth === "") {
      Alert.alert("Alert", "Month can not be empty");
      return;
    } else if (this.state.pickerYear === "") {
      Alert.alert("Alert", "Year can not be empty");
      return;
    } else if (this.state.pickerDistrict === "") {
      Alert.alert("Alert", "District can not be empty");
      return;
    } else if (this.state.pickerUpazilla === "") {
      Alert.alert("Alert", "Upazilla can not be empty");
      return;
    } else if (this.state.pickerOffice === "") {
      Alert.alert("Alert", "Office can not be empty");
      return;
    } else if (this.state.pickerProject === "") {
      Alert.alert("Alert", "Project can not be empty");
      return;
    } else if (this.state.pickerLF === "") {
      Alert.alert("Alert", "LF can not be empty");
      return;
    } else if (this.state.pickerLPO === "") {
      Alert.alert("Alert", "LPO can not be empty");
      return;
    } else if (this.state.pickerSchool === "") {
      Alert.alert("Alert", "School can not be empty");
      return;
    } else if (this.state.classTeacher === "") {
      Alert.alert("Alert", "Class Teacher can not be empty");
      return;
    } else if (this.state.classStartTime === "") {
      Alert.alert("Alert", "Class start time can not be empty");
      return;
    } else if (this.state.classEndTime === "") {
      Alert.alert("Alert", "Class end time can not be empty");
      return;
    } else if (this.state.teachingTopic === "") {
      Alert.alert("Alert", "Lesson can not be empty");
      return;
    } else if (this.state.teachingDay === "") {
      Alert.alert("Alert", "Period can not be empty");
      return;
    } else if (this.state.grade === "") {
      Alert.alert("Alert", "Grade can not be empty");
      return;
    } else if (this.state.section === "") {
      Alert.alert("Alert", "Section can not be empty");
      return;
    } else if (this.state.studentTotal === "") {
      Alert.alert("Alert", "Admitted student can not be empty");
      return;
    } else if (this.state.presentTotal === "") {
      Alert.alert("Alert", "Pressent student can not be empty");
      return;
    } else if (
      this.state.ind11TeacherFollowedTeacherGuideInClassStatus === ""
    ) {
      Alert.alert("Alert", "Indicator-1.1 can not be empty");
      return;
    } else if (this.state.ind12FollowedIDoWeDoYouDoStatus === "") {
      Alert.alert("Alert", "Indicator-1.2 can not be empty");
      return;
    } else if (this.state.ind13FollowedContinuityOfLessonStatus === "") {
      Alert.alert("Alert", "Indicator-1.3 can not be empty");
      return;
    } else if (this.state.ind14ImplementedAllTaskInTimeStatus === "") {
      Alert.alert("Alert", "Indicator-1.4 can not be empty");
      return;
    } else if (this.state.ind15InstructedToUseWorkbookStatus === "") {
      Alert.alert("Alert", "Indicator-1.5 can not be empty");
      return;
    } else if (this.state.ind16IndependentReadingOpportunityStatus === "") {
      Alert.alert("Alert", "Indicator-1.6 can not be empty");
      return;
    } else if (this.state.ind21CorrectlyPronouncedStatus === "") {
      Alert.alert("Alert", "Indicator-2.1 can not be empty");
      return;
    } else if (this.state.ind22TaughtCorrectlyAllowPracticeStatus === "") {
      Alert.alert("Alert", "Indicator-2.2 can not be empty");
      return;
    } else if (this.state.ind23DemonstratesFluentReadingStatus === "") {
      Alert.alert("Alert", "Indicator-2.3 can not be empty");
      return;
    } else if (this.state.ind24AllowReadIndividuallyPairGroupsStatus === "") {
      Alert.alert("Alert", "Indicator-2.4 can not be empty");
      return;
    } else if (this.state.ind25FollowsInstructionsInWritingStatus === "") {
      Alert.alert("Alert", "Indicator-2.5 can not be empty");
      return;
    } else if (this.state.ind31AskedHelpfulQuestionsStatus === "") {
      Alert.alert("Alert", "Indicator-3.1 can not be empty");
      return;
    } else if (this.state.ind32TaughtVocabularyNewSentenceStatus === "") {
      Alert.alert("Alert", "Indicator-3.2 can not be empty");
      return;
    } else if (this.state.ind33CheckWritingSpellingPunctuationStatus === "") {
      Alert.alert("Alert", "Indicator-3.2 can not be empty");
      return;
    } else if (this.state.ind34CheckedWeDoYouDoStatus === "") {
      Alert.alert("Alert", "Indicator-3.2 can not be empty");
      return;
    } else if (this.state.coachingSupportTeacher === "") {
      Alert.alert("Alert", "Teacher to-do can not be empty");
      return;
    } else if (this.state.coachingSupportLF === "") {
      Alert.alert("Alert", "LF to-do can not be empty");
      return;
    } else if (this.state.duplicateBanglaClassObservationData.length > 0) {
      Alert.alert("Alert", "Duplicate Bangla Class data !!");
      return;
    } else {
      try {
        const existingData = await AsyncStorage.getItem("offlineFormsPBangla");
        const forms = existingData ? JSON.parse(existingData) : [];
        forms.push(formData);
        await AsyncStorage.setItem(
          "offlineFormsPBangla",
          JSON.stringify(forms),
        );
        console.log("Data stored locally: " + JSON.stringify(forms));
        console.log("Data stored locally.");
        Alert.alert("Data stored locally.");
        this.updateToInitialState();
      } catch (error) {
        console.error("Error storing data locally:", error);
        Alert.alert("Error storing data locally:", error);
      }
    }
  };
  // Save form data locally

  // Sync stored data
  syncPendingData = async () => {
    try {
      const existingData = await AsyncStorage.getItem("offlineFormsPBangla");
      if (existingData) {
        const formsToSync = JSON.parse(existingData);
        for (const formData of formsToSync) {
          await fetch("http://118.179.80.51:8080/api/v1/p-bangla-class", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
        }
        await AsyncStorage.removeItem("offlineFormsPBangla"); // Clear synced data
        console.log(
          "Pending data synced successfully: " + JSON.parse(existingData),
        );
        console.log("Pending data synced successfully to server!");
        Alert.alert("Pending data synced successfully to server!");
      }
    } catch (error) {
      console.error("Error syncing pending data:", error);
      Alert.alert("Error syncing pending data:", error);
    }
  };
  // Sync stored data

  // Save for later
  saveForLater = async () => {
    const formData = {
      date: this.state.selectedDate,
      month: this.state.pickerMonth,
      year: this.state.pickerYear,
      district: this.state.pickerDistrict.name,
      upazilla: this.state.pickerUpazilla.name,
      fieldOffice: this.state.pickerOffice,
      project: this.state.pickerProject,
      visitNo: Math.floor(Math.random() * 100),
      lpo: this.state.pickerLPO.employeeRegId,
      lpoName: this.state.pickerLPOName.name,
      lf: this.state.pickerLF.employeeRegId,
      lfName: this.state.pickerLFName.name,
      school: this.state.pickerSchool.name,
      rtrSchoolId: this.state.rtrSchoolId,
      yearOfSupport: this.state.yearOfSupport,
      classTeacher: this.state.classTeacher,
      grade: this.state.grade,
      section: this.state.section,
      classStartTime: this.state.classStartTime,
      classEndTime: this.state.classEndTime,
      contentName: this.state.teachingTopic,
      periodDay: this.state.teachingDay,
      totalAdmittedStudent: this.state.studentTotal,
      totalPresentStudent: this.state.presentTotal,

      visitor: this.state.visitor,
      visitorDesignation: this.state.visitorDesignation,

      note: this.state.note,

      lastFollowupTopic1: this.state.lastFollowupTopic1,
      lastFollowupTopic2: this.state.lastFollowupTopic2,
      lastFollowupTopic3: this.state.lastFollowupTopic3,

      ind11TeacherFollowedTeacherGuideInClassStatus:
        this.state.ind11TeacherFollowedTeacherGuideInClassStatus,
      ind11TeacherFollowedTeacherGuideInClassNote:
        this.state.ind11TeacherFollowedTeacherGuideInClassNote,

      ind12FollowedIDoWeDoYouDoStatus:
        this.state.ind12FollowedIDoWeDoYouDoStatus,
      ind12FollowedIDoWeDoYouDoNote: this.state.ind12FollowedIDoWeDoYouDoNote,

      ind13FollowedContinuityOfLessonStatus:
        this.state.ind13FollowedContinuityOfLessonStatus,
      ind13FollowedContinuityOfLessonNote:
        this.state.ind13FollowedContinuityOfLessonNote,

      ind14ImplementedAllTaskInTimeStatus:
        this.state.ind14ImplementedAllTaskInTimeStatus,
      ind14ImplementedAllTaskInTimeNote:
        this.state.ind14ImplementedAllTaskInTimeNote,

      ind15InstructedToUseWorkbookStatus:
        this.state.ind15InstructedToUseWorkbookStatus,
      ind15InstructedToUseWorkbookNote:
        this.state.ind15InstructedToUseWorkbookNote,

      ind16IndependentReadingOpportunityStatus:
        this.state.ind16IndependentReadingOpportunityStatus,
      ind16IndependentReadingOpportunityNote:
        this.state.ind16IndependentReadingOpportunityNote,

      ind21CorrectlyPronouncedStatus: this.state.ind21CorrectlyPronouncedStatus,
      ind21CorrectlyPronouncedNote: this.state.ind21CorrectlyPronouncedNote,

      ind22TaughtCorrectlyAllowPracticeStatus:
        this.state.ind22TaughtCorrectlyAllowPracticeStatus,
      ind22TaughtCorrectlyAllowPracticeNote:
        this.state.ind22TaughtCorrectlyAllowPracticeNote,

      ind23DemonstratesFluentReadingStatus:
        this.state.ind23DemonstratesFluentReadingStatus,
      ind23DemonstratesFluentReadingNote:
        this.state.ind23DemonstratesFluentReadingNote,

      ind24AllowReadIndividuallyPairGroupsStatus:
        this.state.ind24AllowReadIndividuallyPairGroupsStatus,
      ind24AllowReadIndividuallyPairGroupsNote:
        this.state.ind24AllowReadIndividuallyPairGroupsNote,

      ind25FollowsInstructionsInWritingStatus:
        this.state.ind25FollowsInstructionsInWritingStatus,
      ind25FollowsInstructionsInWritingNote:
        this.state.ind25FollowsInstructionsInWritingNote,

      ind31AskedHelpfulQuestionsStatus:
        this.state.ind31AskedHelpfulQuestionsStatus,
      ind31AskedHelpfulQuestionsNote: this.state.ind31AskedHelpfulQuestionsNote,

      ind32TaughtVocabularyNewSentenceStatus:
        this.state.ind32TaughtVocabularyNewSentenceStatus,
      ind32TaughtVocabularyNewSentenceNote:
        this.state.ind32TaughtVocabularyNewSentenceNote,

      ind33CheckWritingSpellingPunctuationStatus:
        this.state.ind33CheckWritingSpellingPunctuationStatus,
      ind33CheckWritingSpellingPunctuationNote:
        this.state.ind33CheckWritingSpellingPunctuationNote,

      ind34CheckedWeDoYouDoStatus: this.state.ind34CheckedWeDoYouDoStatus,
      ind34CheckedWeDoYouDoNote: this.state.ind34CheckedWeDoYouDoNote,

      bestPracticeInd1: this.state.bestPracticeInd1,
      bestPracticeInd2: this.state.bestPracticeInd2,
      bestPracticeInd3: this.state.bestPracticeInd3,

      coachingSupportInd1: this.state.coachingSupportInd1,
      coachingSupportInd2: this.state.coachingSupportInd2,
      coachingSupportDetailsInd1: this.state.coachingSupportDetailsInd1,
      coachingSupportDetailsInd2: this.state.coachingSupportDetailsInd2,

      coachingSupportTeacher: this.state.coachingSupportTeacher,
      coachingSupportLF: this.state.coachingSupportLF,

      agreedStatement1: this.state.agreedStatement1,
      agreedStatement2: this.state.agreedStatement2,

      question1: this.state.question1,

      student1: this.state.student1,
      student2: this.state.student2,
      student3: this.state.student3,

      noRightFor1: this.state.noRightFor1,
      noWrongFor1: this.state.noWrongFor1,
      totalFor1: this.state.totalFor1,
      noRightFor2: this.state.noRightFor2,
      noWrongFor2: this.state.noWrongFor2,
      totalFor2: this.state.totalFor2,
      noRightFor3: this.state.noRightFor3,
      noWrongFor3: this.state.noWrongFor3,
      totalFor3: this.state.totalFor3,

      teacherStatus: this.state.teacherStatus,
    };

    // Validation
    if (this.state.selectedDate === "") {
      Alert.alert("Alert", "Date can not be empty");
      return;
    } else if (this.state.pickerMonth === "") {
      Alert.alert("Alert", "Month can not be empty");
      return;
    } else if (this.state.pickerYear === "") {
      Alert.alert("Alert", "Year can not be empty");
      return;
    } else if (this.state.pickerDistrict === "") {
      Alert.alert("Alert", "District can not be empty");
      return;
    } else if (this.state.pickerUpazilla === "") {
      Alert.alert("Alert", "Upazilla can not be empty");
      return;
    } else if (this.state.pickerOffice === "") {
      Alert.alert("Alert", "Office can not be empty");
      return;
    } else if (this.state.pickerProject === "") {
      Alert.alert("Alert", "Project can not be empty");
      return;
    } else if (this.state.pickerLF === "") {
      Alert.alert("Alert", "LF can not be empty");
      return;
    } else if (this.state.pickerLPO === "") {
      Alert.alert("Alert", "LPO can not be empty");
      return;
    } else if (this.state.pickerSchool === "") {
      Alert.alert("Alert", "School can not be empty");
      return;
    } else if (this.state.classTeacher === "") {
      Alert.alert("Alert", "Class Teacher can not be empty");
      return;
    } else if (this.state.classStartTime === "") {
      Alert.alert("Alert", "Class start time can not be empty");
      return;
    } else if (this.state.classEndTime === "") {
      Alert.alert("Alert", "Class end time can not be empty");
      return;
    } else if (this.state.teachingTopic === "") {
      Alert.alert("Alert", "Lesson can not be empty");
      return;
    } else if (this.state.teachingDay === "") {
      Alert.alert("Alert", "Period can not be empty");
      return;
    } else if (this.state.grade === "") {
      Alert.alert("Alert", "Grade can not be empty");
      return;
    } else if (this.state.section === "") {
      Alert.alert("Alert", "Section can not be empty");
      return;
    } else if (this.state.studentTotal === "") {
      Alert.alert("Alert", "Admitted student can not be empty");
      return;
    } else if (this.state.presentTotal === "") {
      Alert.alert("Alert", "Pressent student can not be empty");
      return;
    } else {
      try {
        const existingData = await AsyncStorage.getItem("saveForLaterPBangla");
        const forms = existingData ? JSON.parse(existingData) : [];
        forms.push(formData);
        await AsyncStorage.setItem(
          "saveForLaterPBangla",
          JSON.stringify(forms),
        );
        console.log("Data saved for later: " + JSON.stringify(forms));
        console.log("Data saved for later");
        Alert.alert("Data saved for later.");
        this.updateToInitialState();
      } catch (error) {
        console.error("Error Data saved for later:", error);
        Alert.alert("Error Data saved for later:", error);
      }
    }
  };
  // Save for later

  // Load saved data
  loadSavedData = async () => {
    try {
      const existingData = await AsyncStorage.getItem("saveForLaterPBangla");
      if (existingData) {
        const formsToSync = JSON.parse(existingData);
        for (const formData of formsToSync) {
          this.setState({
            //date: formData.date,
            // pickerMonth: formData.month,
            // pickerYear: formData.year,
            // pickerDistrict: formData.district,
            // pickerUpazilla: formData.upazilla,
            // pickerOffice: formData.fieldOffice,
            // pickerProject: formData.project,
            // visitNo: formData.visitNo,
            // lpo: formData.lpo,
            // pickerLPO: formData.lpoName,
            // lf: formData.lf,
            // pickerLF: formData.lfName,
            // pickerSchool: formData.school,
            // rtrSchoolId: formData.rtrSchoolId,
            // yearOfSupport: formData.yearOfSupport,
            // classTeacher: formData.classTeacher,
            // grade: formData.grade,
            // section: formData.section,

            classStartTime: formData.classStartTime,
            classEndTime: formData.classEndTime,
            teachingTopic: formData.contentName,
            teachingDay: formData.periodDay,
            studentTotal: formData.totalAdmittedStudent,
            presentTotal: formData.totalPresentStudent,

            visitor: formData.visitor,
            visitorDesignation: formData.visitorDesignation,

            note: formData.note,

            lastFollowupTopic1: formData.lastFollowupTopic1,
            lastFollowupTopic2: formData.lastFollowupTopic2,
            lastFollowupTopic3: formData.lastFollowupTopic3,

            ind11TeacherFollowedTeacherGuideInClassStatus:
              formData.ind11TeacherFollowedTeacherGuideInClassStatus,
            ind11TeacherFollowedTeacherGuideInClassNote:
              formData.ind11TeacherFollowedTeacherGuideInClassNote,

            ind12FollowedIDoWeDoYouDoStatus:
              formData.ind12FollowedIDoWeDoYouDoStatus,
            ind12FollowedIDoWeDoYouDoNote:
              formData.ind12FollowedIDoWeDoYouDoNote,

            ind13FollowedContinuityOfLessonStatus:
              formData.ind13FollowedContinuityOfLessonStatus,
            ind13FollowedContinuityOfLessonNote:
              formData.ind13FollowedContinuityOfLessonNote,

            ind14ImplementedAllTaskInTimeStatus:
              formData.ind14ImplementedAllTaskInTimeStatus,
            ind14ImplementedAllTaskInTimeNote:
              formData.ind14ImplementedAllTaskInTimeNote,

            ind15InstructedToUseWorkbookStatus:
              formData.ind15InstructedToUseWorkbookStatus,
            ind15InstructedToUseWorkbookNote:
              formData.ind15InstructedToUseWorkbookNote,

            ind16IndependentReadingOpportunityStatus:
              formData.ind16IndependentReadingOpportunityStatus,
            ind16IndependentReadingOpportunityNote:
              formData.ind16IndependentReadingOpportunityNote,

            ind21CorrectlyPronouncedStatus:
              formData.ind21CorrectlyPronouncedStatus,
            ind21CorrectlyPronouncedNote: formData.ind21CorrectlyPronouncedNote,

            ind22TaughtCorrectlyAllowPracticeStatus:
              formData.ind22TaughtCorrectlyAllowPracticeStatus,
            ind22TaughtCorrectlyAllowPracticeNote:
              formData.ind22TaughtCorrectlyAllowPracticeNote,

            ind23DemonstratesFluentReadingStatus:
              formData.ind23DemonstratesFluentReadingStatus,
            ind23DemonstratesFluentReadingNote:
              formData.ind23DemonstratesFluentReadingNote,

            ind24AllowReadIndividuallyPairGroupsStatus:
              formData.ind24AllowReadIndividuallyPairGroupsStatus,
            ind24AllowReadIndividuallyPairGroupsNote:
              formData.ind24AllowReadIndividuallyPairGroupsNote,

            ind25FollowsInstructionsInWritingStatus:
              formData.ind25FollowsInstructionsInWritingStatus,
            ind25FollowsInstructionsInWritingNote:
              formData.ind25FollowsInstructionsInWritingNote,

            ind31AskedHelpfulQuestionsStatus:
              formData.ind31AskedHelpfulQuestionsStatus,
            ind31AskedHelpfulQuestionsNote:
              formData.ind31AskedHelpfulQuestionsNote,

            ind32TaughtVocabularyNewSentenceStatus:
              formData.ind32TaughtVocabularyNewSentenceStatus,
            ind32TaughtVocabularyNewSentenceNote:
              formData.ind32TaughtVocabularyNewSentenceNote,

            ind33CheckWritingSpellingPunctuationStatus:
              formData.ind33CheckWritingSpellingPunctuationStatus,
            ind33CheckWritingSpellingPunctuationNote:
              formData.ind33CheckWritingSpellingPunctuationNote,

            ind34CheckedWeDoYouDoStatus: formData.ind34CheckedWeDoYouDoStatus,
            ind34CheckedWeDoYouDoNote: formData.ind34CheckedWeDoYouDoNote,

            bestPracticeInd1: formData.bestPracticeInd1,
            bestPracticeInd2: formData.bestPracticeInd2,
            bestPracticeInd3: formData.bestPracticeInd3,

            coachingSupportInd1: formData.coachingSupportInd1,
            coachingSupportInd2: formData.coachingSupportInd2,
            coachingSupportDetailsInd1: formData.coachingSupportDetailsInd1,
            coachingSupportDetailsInd2: formData.coachingSupportDetailsInd2,

            coachingSupportTeacher: formData.coachingSupportTeacher,
            coachingSupportLF: formData.coachingSupportLF,

            agreedStatement1: formData.agreedStatement1,
            agreedStatement2: formData.agreedStatement2,

            question1: formData.question1,

            student1: formData.student1,
            student2: formData.student2,
            student3: formData.student3,

            noRightFor1: formData.noRightFor1,
            noWrongFor1: formData.noWrongFor1,
            totalFor1: formData.totalFor1,
            noRightFor2: formData.noRightFor2,
            noWrongFor2: formData.noWrongFor2,
            totalFor2: formData.totalFor2,
            noRightFor3: formData.noRightFor3,
            noWrongFor3: formData.noWrongFor3,
            totalFor3: formData.totalFor3,

            teacherStatus: formData.teacherStatus,
          });
        }
        await AsyncStorage.removeItem("saveForLaterPBangla"); // Clear synced data
        console.log("Saved data set successful: " + JSON.parse(existingData));
        console.log("Saved data set successful!");
        Alert.alert("Saved data set successful!");
      }
    } catch (error) {
      console.error("Error Saved data set successful", error);
      Alert.alert("Error Saved data set successful", error);
    }
  };
  // Load saved data

  // Alert before save for later
  showConfirmDialogSaveForLater = () => {
    return Alert.alert(
      "Alert !!",
      "Are you sure you want to save data for later ?",
      [
        // The "Cancel" button
        {
          text: "Cancel",
        },
        // The "Yes" button
        {
          text: "Yes",
          onPress: this.saveForLater,
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ],
    );
  };
  // Alert before save for later

  // Calculate bestPractice  && coachingSupport
  bestPracticeIndCoachingSupportInd = () => {
    // this.setState({
    //   coachingSupportInd1: "N/A",
    //   coachingSupportDetailsInd1: "N/A",
    //   coachingSupportInd2: "N/A",
    //   coachingSupportDetailsInd2: "N/A",
    // });

    // this.setState({
    //   bestPracticeInd1: "N/A",
    //   bestPracticeInd2: "N/A",
    // });

    if (this.state.ind11TeacherFollowedTeacherGuideInClassStatus === "") {
      Alert.alert("Alert", "Indicator-1.1 can not be empty");
      return;
    } else if (this.state.ind12FollowedIDoWeDoYouDoStatus === "") {
      Alert.alert("Alert", "Indicator-1.2 can not be empty");
      return;
    } else if (this.state.ind13FollowedContinuityOfLessonStatus === "") {
      Alert.alert("Alert", "Indicator-1.3 can not be empty");
      return;
    } else if (this.state.ind14ImplementedAllTaskInTimeStatus === "") {
      Alert.alert("Alert", "Indicator-1.4 can not be empty");
      return;
    } else if (this.state.ind15InstructedToUseWorkbookStatus === "") {
      Alert.alert("Alert", "Indicator-1.5 can not be empty");
      return;
    } else if (this.state.ind16IndependentReadingOpportunityStatus === "") {
      Alert.alert("Alert", "Indicator-1.6 can not be empty");
      return;
    } else if (this.state.ind21CorrectlyPronouncedStatus === "") {
      Alert.alert("Alert", "Indicator-2.1 can not be empty");
      return;
    } else if (this.state.ind22TaughtCorrectlyAllowPracticeStatus === "") {
      Alert.alert("Alert", "Indicator-2.2 can not be empty");
      return;
    } else if (this.state.ind23DemonstratesFluentReadingStatus === "") {
      Alert.alert("Alert", "Indicator-2.3 can not be empty");
      return;
    } else if (this.state.ind24AllowReadIndividuallyPairGroupsStatus === "") {
      Alert.alert("Alert", "Indicator-2.4 can not be empty");
      return;
    } else if (this.state.ind25FollowsInstructionsInWritingStatus === "") {
      Alert.alert("Alert", "Indicator-2.5 can not be empty");
      return;
    } else if (this.state.ind31AskedHelpfulQuestionsStatus === "") {
      Alert.alert("Alert", "Indicator-3.1 can not be empty");
      return;
    } else if (this.state.ind32TaughtVocabularyNewSentenceStatus === "") {
      Alert.alert("Alert", "Indicator-3.2 can not be empty");
      return;
    } else if (this.state.ind33CheckWritingSpellingPunctuationStatus === "") {
      Alert.alert("Alert", "Indicator-3.2 can not be empty");
      return;
    } else if (this.state.ind34CheckedWeDoYouDoStatus === "") {
      Alert.alert("Alert", "Indicator-3.2 can not be empty");
      return;
    } else {
      // Setup CoachingSupport
      const variablesInd = [
        this.state.ind11TeacherFollowedTeacherGuideInClassStatus,
        this.state.ind12FollowedIDoWeDoYouDoStatus,
        this.state.ind13FollowedContinuityOfLessonStatus,
        this.state.ind14ImplementedAllTaskInTimeStatus,
        this.state.ind15InstructedToUseWorkbookStatus,
        this.state.ind16IndependentReadingOpportunityStatus,
        this.state.ind21CorrectlyPronouncedStatus,
        this.state.ind22TaughtCorrectlyAllowPracticeStatus,
        this.state.ind23DemonstratesFluentReadingStatus,
        this.state.ind24AllowReadIndividuallyPairGroupsStatus,
        this.state.ind25FollowsInstructionsInWritingStatus,
        this.state.ind31AskedHelpfulQuestionsStatus,
        this.state.ind32TaughtVocabularyNewSentenceStatus,
        this.state.ind33CheckWritingSpellingPunctuationStatus,
        this.state.ind34CheckedWeDoYouDoStatus,
      ];

      const variablesIndValue = [
        "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
        "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
        "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
        "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
        "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
        "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
        "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
        "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
        "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
        "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
        "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
        "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
        "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন ।",
        "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
        "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
      ];

      const variables3 = [
        "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ ।",
        "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে ।",
        "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয় ।",
        "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে ।",
        "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে ।",
        "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন ।",
        "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে ।",
        "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে ।",
        "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে ।",
        "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে ।",
        "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে ।",
        "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা ।",
        "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে ।",
        "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ ।",
        "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন ।",
      ];

      let noCount = 0;

      for (let i = 0; i < variablesInd.length; i++) {
        if (variablesInd[i] === "No") {
          if (noCount === 0) {
            // Assign the first 'No' found to coachingSupport1
            this.setState({
              coachingSupportInd1: variablesIndValue[i],
              coachingSupportDetailsInd1: variables3[i],
            });
            noCount++;
          } else if (noCount === 1) {
            this.setState({
              coachingSupportInd2: variablesIndValue[i],
              coachingSupportDetailsInd2: variables3[i],
            }); // Assign the second 'No' found to coachingSupport2
            noCount++;
            // We found both, so we can stop the loop if needed (optional optimization)
            break;
          }
        } else if (variablesInd[i] === "Partial") {
          if (noCount === 0) {
            // Assign the first 'No' found to coachingSupport1
            this.setState({
              coachingSupportInd1: variablesIndValue[i],
              coachingSupportDetailsInd1: variables3[i],
            });
            noCount++;
          } else if (noCount === 1) {
            this.setState({
              coachingSupportInd2: variablesIndValue[i],
              coachingSupportDetailsInd2: variables3[i],
            }); // Assign the second 'No' found to coachingSupport2
            noCount++;
            // We found both, so we can stop the loop if needed (optional optimization)
            break;
          }
        }
      }

      // Setup CoachingSupport

      // Setup BestPractice test2
      if (
        this.state.teacherStatus === "Priority 3" ||
        this.state.teacherStatus === "Priority 2"
      ) {
        const variables = [
          this.state.ind34CheckedWeDoYouDoStatus,
          this.state.ind33CheckWritingSpellingPunctuationStatus,
          this.state.ind32TaughtVocabularyNewSentenceStatus,
          this.state.ind31AskedHelpfulQuestionsStatus,
        ];

        const variables2 = [
          "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
          "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
          "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন ।",
          "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
        ];
        let yesCount = 0;

        for (let i = 0; i < variables.length; i++) {
          if (variables[i] === "Yes") {
            if (yesCount === 0) {
              // Assign the first 'yes' found to bestPracticeInd1
              this.setState({
                bestPracticeInd1: variables2[i],
              });
              yesCount++;
            } else if (yesCount === 1) {
              this.setState({
                bestPracticeInd2: variables2[i],
              }); // Assign the second 'yes' found to y
              yesCount++;
              // We found both, so we can stop the loop if needed (optional optimization)
              break;
            }
          }
        }
      } else if (this.state.teacherStatus === "Priority 1") {
        const variables = [
          this.state.ind25FollowsInstructionsInWritingStatus,
          this.state.ind24AllowReadIndividuallyPairGroupsStatus,
          this.state.ind23DemonstratesFluentReadingStatus,
          this.state.ind22TaughtCorrectlyAllowPracticeStatus,
          this.state.ind21CorrectlyPronouncedStatus,
        ];

        const variables2 = [
          "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
          "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
          "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
          "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
          "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
        ];

        let yesCount = 0;

        for (let i = 0; i < variables.length; i++) {
          if (variables[i] === "Yes") {
            if (yesCount === 0) {
              // Assign the first 'yes' found to bestPracticeInd1
              this.setState({
                bestPracticeInd1: variables2[i],
              });

              yesCount++;
            } else if (yesCount === 1) {
              this.setState({
                bestPracticeInd2: variables2[i],
              }); // Assign the second 'yes' found to y
              yesCount++;
              // We found both, so we can stop the loop if needed (optional optimization)
              break;
            }
          }
        }
      } else if (this.state.teacherStatus === "Priority 0") {
        const variables = [
          this.state.ind16IndependentReadingOpportunityStatus,
          this.state.ind15InstructedToUseWorkbookStatus,
          this.state.ind14ImplementedAllTaskInTimeStatus,
          this.state.ind13FollowedContinuityOfLessonStatus,
          this.state.ind12FollowedIDoWeDoYouDoStatus,
          this.state.ind11TeacherFollowedTeacherGuideInClassStatus,
        ];

        const variables2 = [
          "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
          "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
          "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
          "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
          "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
          "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
        ];
        let yesCount = 0;

        for (let i = 0; i < variables.length; i++) {
          if (variables[i] === "Yes") {
            if (yesCount === 0) {
              // Assign the first 'yes' found to bestPracticeInd1
              this.setState({
                bestPracticeInd1: variables2[i],
              });

              yesCount++;
            } else if (yesCount === 1) {
              this.setState({
                bestPracticeInd2: variables2[i],
              }); // Assign the second 'yes' found to y
              yesCount++;
              // We found both, so we can stop the loop if needed (optional optimization)
              break;
            }
          }
        }
      }
      // Setup BestPractice test2
    }
  };
  // Calculate bestPractice  && coachingSupport

  render() {
    // For Datepicker
    const {
      // Network
      isConnected,
      connectionType,
      // Network

      isCollapsed,
      inputEnabled,

      show,
      date,
      mode,
      startTime,
      endTime,
      selectedDate,
      pickerMonth,
      pickerYear,

      employee,
      school,
      teacher,
      office,
      project,

      ind11TeacherFollowedTeacherGuideInClassStatus,
      ind11TeacherFollowedTeacherGuideInClassNote,

      ind12FollowedIDoWeDoYouDoStatus,
      ind12FollowedIDoWeDoYouDoNote,

      ind13FollowedContinuityOfLessonStatus,
      ind13FollowedContinuityOfLessonNote,

      ind14ImplementedAllTaskInTimeStatus,
      ind14ImplementedAllTaskInTimeNote,

      ind15InstructedToUseWorkbookStatus,
      ind15InstructedToUseWorkbookNote,

      ind16IndependentReadingOpportunityStatus,
      ind16IndependentReadingOpportunityNote,

      ind21CorrectlyPronouncedStatus,
      ind21CorrectlyPronouncedNote,

      ind22TaughtCorrectlyAllowPracticeStatus,
      ind22TaughtCorrectlyAllowPracticeNote,

      ind23DemonstratesFluentReadingStatus,
      ind23DemonstratesFluentReadingNote,

      ind24AllowReadIndividuallyPairGroupsStatus,
      ind24AllowReadIndividuallyPairGroupsNote,

      ind25FollowsInstructionsInWritingStatus,
      ind25FollowsInstructionsInWritingNote,

      ind31AskedHelpfulQuestionsStatus,
      ind31AskedHelpfulQuestionsNote,

      ind32TaughtVocabularyNewSentenceStatus,
      ind32TaughtVocabularyNewSentenceNote,

      ind33CheckWritingSpellingPunctuationStatus,
      ind33CheckWritingSpellingPunctuationNote,

      ind34CheckedWeDoYouDoStatus,
      ind34CheckedWeDoYouDoNote,
    } = this.state;
    // For Datepicker

    const indicator = [
      ind11TeacherFollowedTeacherGuideInClassStatus,
      ind12FollowedIDoWeDoYouDoStatus,
      ind13FollowedContinuityOfLessonStatus,
      ind14ImplementedAllTaskInTimeStatus,
      ind15InstructedToUseWorkbookStatus,
      ind16IndependentReadingOpportunityStatus,
      ind21CorrectlyPronouncedStatus,
      ind22TaughtCorrectlyAllowPracticeStatus,
      ind23DemonstratesFluentReadingStatus,
      ind24AllowReadIndividuallyPairGroupsStatus,
      ind25FollowsInstructionsInWritingStatus,
      ind31AskedHelpfulQuestionsStatus,
      ind32TaughtVocabularyNewSentenceStatus,
      ind33CheckWritingSpellingPunctuationStatus,
      ind34CheckedWeDoYouDoStatus,
    ];

    let yesCount = 0;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 10 }}>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginTop: 2,
                  alignContent: "center",
                  textAlign: "center",
                  alignSelf: "center",
                  marginLeft: 100,
                  marginRight: 100,
                  marginBottom: 0,
                }}
              >
                PREVAIL বাংলা ক্লাস পর্যবেক্ষণ ফরম (Bangla Class Observation)
              </Text>
            </View>
          </View>
          <View style={{ padding: 10, justifyContent: "center" }}>
            <Text style={styles.bigRedText}>
              সাধারণ তথ্য: (General Information:)
            </Text>

            {/* <ExpandableView>
              <View>
                <Text>My expandable view</Text>
              </View>
            </ExpandableView> */}
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ flexDirection: "row", padding: 2, margin: 2 }}>
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
                      style={{
                        textAlign: "right",
                        color: "red",
                        fontSize: 16,
                      }}
                    >
                      *
                    </Text>
                  </View>

                  <Text style={{ fontSize: 14 }}>
                    {String(selectedDate.toDateString())}
                  </Text>
                  <Button
                    style={{
                      height: 40,
                      width: 10,
                    }}
                    onPress={this.datepicker}
                    title="Select Date"
                  />
                  {show && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      is24Hour={true}
                      display="spinner"
                      onChange={this.setDate}
                      style={{
                        height: 40,
                        width: 10,
                      }}
                    />
                  )}
                </View>
                <View style={{ flex: 1 }}></View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  padding: 2,
                  margin: 2,
                  justifyContent: "center",
                }}
              >
                <View style={{ flex: 1, justifyContent: "center" }}>
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
                      style={{
                        textAlign: "right",
                        color: "red",
                        fontSize: 16,
                      }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 170,
                    }}
                    selectedValue={this.state.pickerMonth}
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
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
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
                      style={{
                        textAlign: "right",
                        color: "red",
                        fontSize: 16,
                      }}
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
                      style={{
                        textAlign: "right",
                        color: "red",
                        fontSize: 16,
                      }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 170,
                    }}
                    selectedValue={this.state.pickerDistrict}
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
                          item.name == "Sirajganj",
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
                      style={{
                        textAlign: "right",
                        color: "red",
                        fontSize: 16,
                      }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 170,
                    }}
                    selectedValue={this.state.pickerUpazilla}
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
                          item.district_id == this.state.pickerDistrictKey,
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
                      style={{
                        textAlign: "right",
                        color: "red",
                        fontSize: 16,
                      }}
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
                      console.log(this.state.pickerDistrict.name);
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.office
                      .filter((item) => {
                        return item.address.includes(
                          this.state.pickerDistrict.name,
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
                      style={{
                        textAlign: "right",
                        color: "red",
                        fontSize: 16,
                      }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 280,
                    }}
                    selectedValue={this.state.pickerProject}
                    onValueChange={(value) => {
                      this.setState({ pickerProject: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.project
                      .filter((item) => {
                        return item.projectDetail.includes(
                          this.state.pickerOffice,
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
                      দায়িত্ব প্রাপ্ত এলপিও (LPO:)
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

                  <View>
                    {/* {employee ? (
                      <Text>Employee Data: {employee.length}</Text>
                    ) : (
                      <Text>Loading data...</Text>
                    )} */}
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 230,
                    }}
                    selectedValue={this.state.pickerLPO}
                    onValueChange={(value) => {
                      this.setState({
                        pickerLPO: value,
                        pickerLPOName: value,
                      });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.employee
                      .filter((item) => {
                        return item.designation.includes("PO");
                        // &&
                        // item.project.includes(this.state.pickerProject)
                      })
                      .map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.name}
                            value={item}
                            //item.employeeRegId
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
                      দায়িত্ব প্রাপ্ত এলএফ (LF:)
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

                  <Picker
                    style={{
                      height: 60,
                      width: 230,
                    }}
                    selectedValue={this.state.pickerLF}
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
                <View style={{ flex: 1 }}>
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
                      style={{
                        textAlign: "right",
                        color: "red",
                        fontSize: 16,
                      }}
                    >
                      *
                    </Text>
                  </View>

                  <Picker
                    style={{
                      height: 60,
                      width: 340,
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
                        return item.lf === this.state.pickerLF.employeeRegId;
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
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      স্কুল আইডি (School ID:)
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

                  <Text></Text>
                  <Text>{this.state.rtrSchoolId}</Text>
                  {/* <Picker
                    style={{
                      height: 60,
                      width: 220,
                    }}
                    itemStyle={{ color: "white" }}
                    selectedValue={this.state.rtrSchoolId}
                    onValueChange={(value) => {
                      this.setState({
                        rtrSchoolId: value,
                      });
                    }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.school
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
                      সাপোর্ট ইয়ার (Year of Support:)
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
                  <Text></Text>
                  <Text>{this.state.yearOfSupport}</Text>
                  {/* <Picker
                    style={{
                      height: 60,
                      width: 170,
                    }}
                    selectedValue={this.state.yearOfSupport}
                    onValueChange={(value) => {
                      this.setState({
                        yearOfSupport: value,
                      });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />

                    {this.state.school
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
                      শ্রেণি : (Grade:)
                    </Text>
                    <Text
                      style={{
                        color: "red",
                        fontSize: 16,
                        textAlign: "auto",
                      }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 170,
                    }}
                    enabled={true}
                    selectedValue={this.state.grade}
                    onValueChange={(value) => {
                      this.setState({ grade: value });

                      // Collasp variable
                      if (this.state.teacherTrained === "No") {
                        this.setState({ inputEnabled: false });
                      } else {
                        this.setState({ inputEnabled: true });
                      }
                      // Collasp variable

                      // Find perivious visit data
                      this.setState({
                        preMonthData:
                          this.state.allBanglaClassObservationData.filter(
                            (item) => {
                              return (
                                // item.visitNo ===
                                //   parseInt(parseInt(this.state.visitNo) - 1) &&
                                item.rtrSchoolId === this.state.rtrSchoolId &&
                                item.project === this.state.pickerProject &&
                                item.year === this.state.pickerYear &&
                                item.grade === this.state.grade &&
                                item.section === this.state.section &&
                                item.classTeacher.toLowerCase().trim() ===
                                  this.state.classTeacher.toLowerCase().trim()
                              );
                            },
                          ),
                      });

                      console.log(
                        "All values: ",
                        this.state.rtrSchoolId,
                        this.state.pickerProject,
                        this.state.pickerYear,
                        this.state.grade,
                        this.state.section,
                        this.state.classTeacher,
                      );
                      // Find perivious visit data
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"G1"} value={"G1"} />
                    <Picker.Item label={"G2"} value={"G2"} />
                    <Picker.Item label={"G3"} value={"G3"} />
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
                      শাখা: (Section:)
                    </Text>
                    <Text
                      style={{
                        color: "red",
                        fontSize: 16,
                      }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 170,
                    }}
                    enabled={true}
                    selectedValue={this.state.section}
                    onValueChange={(value) => {
                      this.setState({ section: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"A"} value={"A"} />
                    <Picker.Item label={"B"} value={"B"} />
                    <Picker.Item label={"C"} value={"C"} />
                    <Picker.Item label={"N/A"} value={"N/A"} />
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
                      শিক্ষকের নাম: ( Teacher Name:)
                    </Text>
                    <Text
                      style={{
                        color: "red",
                        fontSize: 16,
                      }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 60,
                      width: 340,
                    }}
                    enabled={true}
                    selectedValue={this.state.classTeacher}
                    onValueChange={(value) => {
                      this.setState({
                        classTeacher: value,
                      });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.teacher
                      .filter((item) => {
                        return (
                          item.schoolId === this.state.rtrSchoolId
                          // &&
                          // item.grade.includes(this.state.grade)
                          // &&
                          // item.section === this.state.section
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
                  <View>
                    <TextInput
                      style={{
                        height: 30,
                        width: 340,
                        padding: 5,
                        borderWidth: 2,
                      }}
                      keyboardType="default"
                      placeholder=""
                      editable={true}
                      onChangeText={(text) =>
                        this.setState({
                          classTeacher: text,
                        })
                      }
                      value={this.state.classTeacher + ""}
                    />
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: "row", padding: 2, margin: 2 }}>
                <View style={{ flex: 1 }}></View>
              </View>

              <TouchableOpacity
                style={{
                  alignItems: "center",
                  width: "40%",
                  backgroundColor: "#CC8285",
                  borderRadius: 25,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 0,
                  marginLeft: 170,
                  marginBottom: 2,
                }}
                onPress={this.loadSavedData}
              >
                <Text>Load Saved Data</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: "row", padding: 2, margin: 2 }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          ক্লাস শুরুর সময়: (Start Time:)
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
                      <TextInput
                        style={{
                          height: 50,
                          width: 220,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="default"
                        placeholder=""
                        editable={this.state.inputEnabled}
                        onChangeText={(text) =>
                          this.setState({ classStartTime: text })
                        }
                        value={this.state.classStartTime + ""}
                      />
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          ক্লাস শেষের সময়: (End Time:)
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
                      <TextInput
                        style={{
                          height: 50,
                          width: 220,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="default"
                        placeholder=""
                        editable={this.state.inputEnabled}
                        onChangeText={(text) =>
                          this.setState({ classEndTime: text })
                        }
                        value={this.state.classEndTime + ""}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      পাঠ নং: (Lesson:)
                    </Text>
                    <Text
                      style={{
                        color: "red",
                        fontSize: 16,
                      }}
                    >
                      *
                    </Text>
                  </View>
                  <TextInput
                    style={{
                      height: 50,
                      width: 220,
                      padding: 5,
                      borderWidth: 1,
                    }}
                    keyboardType="default"
                    placeholder=""
                    multiline={true}
                    editable={this.state.inputEnabled}
                    onChangeText={(text) =>
                      this.setState({ teachingTopic: text })
                    }
                    value={this.state.teachingTopic + ""}
                  />
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      পিরিয়ড:(Period:)
                    </Text>
                    <Text
                      style={{
                        color: "red",
                        fontSize: 16,
                      }}
                    >
                      *
                    </Text>
                  </View>
                  <TextInput
                    style={{
                      height: 50,
                      width: 220,
                      padding: 5,
                      borderWidth: 1,
                    }}
                    keyboardType="default"
                    placeholder=""
                    multiline={true}
                    editable={this.state.inputEnabled}
                    onChangeText={(text) =>
                      this.setState({ teachingDay: text })
                    }
                    value={this.state.teachingDay + ""}
                  />
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
                      ভর্তিকৃত শিশুর সংখ্যা: (Admitted Student:)
                    </Text>
                    <Text
                      style={{
                        color: "red",
                        fontSize: 16,
                      }}
                    >
                      *
                    </Text>
                  </View>
                  <Text></Text>
                  <TextInput
                    style={{
                      height: 30,
                      width: 100,
                      padding: 5,
                      borderWidth: 1,
                    }}
                    keyboardType="numeric"
                    placeholder=""
                    editable={true}
                    value={this.state.studentTotal + ""}
                    onChangeText={(text) =>
                      this.setState({
                        studentTotal: Number(text),
                      })
                    }
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
                      উপস্থিত শিশুর সংখ্যা: (Present Student:)
                    </Text>
                    <Text
                      style={{
                        color: "red",
                        fontSize: 16,
                      }}
                    >
                      *
                    </Text>
                  </View>
                  <Text></Text>
                  {this.state.studentTotal < this.state.presentTotal && (
                    <Text style={{ color: "red", fontSize: 20 }}>
                      Admitted will be greater or equal to Present
                    </Text>
                  )}
                  <TextInput
                    style={{
                      height: 30,
                      width: 100,
                      padding: 5,
                      borderWidth: 1,
                    }}
                    keyboardType="numeric"
                    placeholder=""
                    editable={true}
                    value={this.state.presentTotal + ""}
                    onChangeText={(text) =>
                      this.setState({
                        presentTotal: Number(text),
                      })
                    }
                  />
                </View>
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

              {/* <CollapsibleView title="Click to open"></CollapsibleView> */}
            </Card>
          </View>

          {/* <Collapsible collapsed={isCollapsed}></Collapsible> */}

          {/* <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>ফলো-আপ (Follow-up)</Text>
            <Card style={{ padding: 10, margin: 10 }}>
              <Text style={{ justifyContent: "flex-end", fontWeight: "bold" }}>
                ফলো-আপ করার জন্য গত পরিদর্শন থেকে প্রাপ্ত ১-২ টি বিষয় উল্লেখ
                করুন যেখানে উন্নতি প্রয়োজন ছিল:
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <View style={{ padding: 5 }}>
                    <Text>১.</Text>
                    <TextInput
                      style={{ height: 100, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      value={this.state.lastFollowupTopic1 + ""}
                    ></TextInput>
                  </View>
                </View>
              </View>
            </Card>
          </View> */}

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>ইনডিকেটর (Indicator)</Text>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <Text
                  style={{
                    backgroundColor: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  প্রায়োরিটি এরিয়া - ১: পাঠদান পরিকল্পনা অনুসরণ (Priority Area
                  - 1: Following the lesson plan)
                </Text>
              </View>
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
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      ১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে
                      শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।
                      (1a. The teacher conducted the class activities following
                      the guidelines for use of the workbook and observed as
                      necessary.)
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১ (Priority Area: 1)
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                      //backgroundColor: "#6ab8b0ff",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>পর্যবেক্ষণ: (Observation:)</Text>
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

                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          enabled={this.state.inputEnabled}
                          onValueChange={(value) => {
                            this.setState({
                              ind11TeacherFollowedTeacherGuideInClassStatus:
                                value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd11: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd11: "",
                              });
                            }
                            // Set error message

                            // Set teacher status
                            if (
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A") &&
                              (this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A") &&
                              (this.state.ind34CheckedWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "No" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "No" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 0",
                              });
                            }
                            // Set teacher status

                            // Setup BestPractice test2
                            // if (
                            //   this.state.teacherStatus === "Priority 3" ||
                            //   this.state.teacherStatus === "Priority 2"
                            // ) {
                            //   const variables = [
                            //     ind34CheckedWeDoYouDoStatus,
                            //     ind33CheckWritingSpellingPunctuationStatus,
                            //     ind32TaughtVocabularyNewSentenceStatus,
                            //     ind31AskedHelpfulQuestionsStatus,
                            //   ];

                            //   const variables2 = [
                            //     "ind34",
                            //     "ind33",
                            //     "ind32",
                            //     "ind31",
                            //   ];
                            //   let yesCount = 0;

                            //   for (const value of variables) {
                            //     if (value === "Yes") {
                            //       if (yesCount === 0) {
                            //         // Assign the first 'yes' found to bestPracticeInd1
                            //         this.setState({
                            //           bestPracticeInd1: variables2[yesCount],
                            //         });
                            //         yesCount++;
                            //       } else if (yesCount === 1) {
                            //         this.setState({
                            //           bestPracticeInd2: variables2[yesCount],
                            //         }); // Assign the second 'yes' found to y
                            //         yesCount++;
                            //         // We found both, so we can stop the loop if needed (optional optimization)
                            //         break;
                            //       }
                            //     }
                            //   }
                            // } else if (
                            //   this.state.teacherStatus === "Priority 1"
                            // ) {
                            //   const variables = [
                            //     ind25FollowsInstructionsInWritingStatus,
                            //     ind24AllowReadIndividuallyPairGroupsStatus,
                            //     ind23DemonstratesFluentReadingStatus,
                            //     ind22TaughtCorrectlyAllowPracticeStatus,
                            //     ind21CorrectlyPronouncedStatus,
                            //   ];

                            //   const variables2 = [
                            //     "ind25",
                            //     "ind24",
                            //     "ind23",
                            //     "ind22",
                            //     "ind21",
                            //   ];

                            //   let yesCount = 0;

                            //   for (const value of variables) {
                            //     if (value === "Yes") {
                            //       if (yesCount === 0) {
                            //         // Assign the first 'yes' found to bestPracticeInd1
                            //         this.setState({
                            //           bestPracticeInd1: variables2[yesCount],
                            //         });

                            //         yesCount++;
                            //       } else if (yesCount === 1) {
                            //         this.setState({
                            //           bestPracticeInd2: variables2[yesCount],
                            //         }); // Assign the second 'yes' found to y
                            //         yesCount++;
                            //         // We found both, so we can stop the loop if needed (optional optimization)
                            //         break;
                            //       }
                            //     }
                            //   }
                            // } else if (
                            //   this.state.teacherStatus === "Priority 0"
                            // ) {
                            //   const variables = [
                            //     ind16IndependentReadingOpportunityStatus,
                            //     ind15InstructedToUseWorkbookStatus,
                            //     ind14ImplementedAllTaskInTimeStatus,
                            //     ind13FollowedContinuityOfLessonStatus,
                            //     ind12FollowedIDoWeDoYouDoStatus,
                            //     value,
                            //   ];

                            //   const variables2 = [
                            //     "ind16",
                            //     "ind15",
                            //     "ind14",
                            //     "ind13",
                            //     "ind12",
                            //     "ind11",
                            //   ];
                            //   let yesCount = 0;

                            //   for (const value of variables) {
                            //     if (value === "Yes") {
                            //       if (yesCount === 0) {
                            //         // Assign the first 'yes' found to bestPracticeInd1
                            //         this.setState({
                            //           bestPracticeInd1: variables2[yesCount],
                            //         });

                            //         yesCount++;
                            //       } else if (yesCount === 1) {
                            //         this.setState({
                            //           bestPracticeInd2: variables2[yesCount],
                            //         }); // Assign the second 'yes' found to y
                            //         yesCount++;
                            //         // We found both, so we can stop the loop if needed (optional optimization)
                            //         break;
                            //       }
                            //     }
                            //   }
                            // } else {
                            //   this.setState({
                            //     bestPracticeInd1: "N/A",
                            //     bestPracticeInd2: "N/A",
                            //   });
                            // }
                            // Setup BestPractice test2

                            // // Setup BestPractice test
                            // if (
                            //   this.state.teacherStatus === "Priority 3" ||
                            //   this.state.teacherStatus === "Priority 2"
                            // ) {
                            //   if (
                            //     this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeInd1:
                            //         "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind33CheckWritingSpellingPunctuationStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeInd1:
                            //         "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind32TaughtVocabularyNewSentenceStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeInd1:
                            //         "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                            //       bestPracticeInd2: "",
                            //     });
                            //   } else if (
                            //     this.state.ind31AskedHelpfulQuestionsStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeInd1:
                            //         "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                            //     });
                            //   }
                            // } else if (
                            //   this.state.teacherStatus === "Priority 1"
                            // ) {
                            //   if (
                            //     this.state
                            //       .ind25FollowsInstructionsInWritingStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeInd1:
                            //         "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind24AllowReadIndividuallyPairGroupsStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeInd1:
                            //         "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind23DemonstratesFluentReadingStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeInd1:
                            //         "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind22TaughtCorrectlyAllowPracticeStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeInd1:
                            //         "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                            //     });
                            //   } else if (
                            //     this.state.ind21CorrectlyPronouncedStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeInd1:
                            //         "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                            //     });
                            //   }
                            // } else if (
                            //   this.state.teacherStatus === "Priority 0"
                            // ) {
                            //   if (
                            //     this.state
                            //       .ind16IndependentReadingOpportunityStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeInd1:
                            //         "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind15InstructedToUseWorkbookStatus === "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeInd1:
                            //         "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind14ImplementedAllTaskInTimeStatus === "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeInd1:
                            //         "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind13FollowedContinuityOfLessonStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeInd1:
                            //         "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                            //     });
                            //   } else if (
                            //     this.state.ind12FollowedIDoWeDoYouDoStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeInd1:
                            //         "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                            //     });
                            //   } else if (value === "Yes") {
                            //     this.setState({
                            //       bestPracticeInd1:
                            //         "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                            //     });
                            //   }
                            // } else {
                            //   this.setState({
                            //     bestPracticeInd1: "N/A",
                            //   });
                            // }
                            // // Setup BestPractice test

                            // // Setup BestPractice
                            // if (
                            //   this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            // ) {
                            //   this.setState({
                            //     bestPracticeInd1:
                            //       "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind33CheckWritingSpellingPunctuationStatus ===
                            //   "Yes"
                            // ) {
                            //   this.setState({
                            //     bestPracticeInd1:
                            //       "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind32TaughtVocabularyNewSentenceStatus ===
                            //   "Yes"
                            // ) {
                            //   this.setState({
                            //     bestPracticeInd1:
                            //       "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                            //     bestPracticeInd2: "",
                            //   });
                            // } else if (
                            //   this.state.ind31AskedHelpfulQuestionsStatus ===
                            //   "Yes"
                            // ) {
                            //   this.setState({
                            //     bestPracticeInd1:
                            //       "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind25FollowsInstructionsInWritingStatus ===
                            //   "Yes"
                            // ) {
                            //   this.setState({
                            //     bestPracticeInd1:
                            //       "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind24AllowReadIndividuallyPairGroupsStatus ===
                            //   "Yes"
                            // ) {
                            //   this.setState({
                            //     bestPracticeInd1:
                            //       "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind23DemonstratesFluentReadingStatus === "Yes"
                            // ) {
                            //   this.setState({
                            //     bestPracticeInd1:
                            //       "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind22TaughtCorrectlyAllowPracticeStatus ===
                            //   "Yes"
                            // ) {
                            //   this.setState({
                            //     bestPracticeInd1:
                            //       "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                            //   });
                            // } else if (
                            //   this.state.ind21CorrectlyPronouncedStatus ===
                            //   "Yes"
                            // ) {
                            //   this.setState({
                            //     bestPracticeInd1:
                            //       "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind16IndependentReadingOpportunityStatus ===
                            //   "Yes"
                            // ) {
                            //   this.setState({
                            //     bestPracticeInd1:
                            //       "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                            //   });
                            // } else if (
                            //   this.state.ind15InstructedToUseWorkbookStatus ===
                            //   "Yes"
                            // ) {
                            //   this.setState({
                            //     bestPracticeInd1:
                            //       "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                            //   });
                            // } else if (
                            //   this.state.ind14ImplementedAllTaskInTimeStatus ===
                            //   "Yes"
                            // ) {
                            //   this.setState({
                            //     bestPracticeInd1:
                            //       "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind13FollowedContinuityOfLessonStatus === "Yes"
                            // ) {
                            //   this.setState({
                            //     bestPracticeInd1:
                            //       "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                            //   });
                            // } else if (
                            //   this.state.ind12FollowedIDoWeDoYouDoStatus ===
                            //   "Yes"
                            // ) {
                            //   this.setState({
                            //     bestPracticeInd1:
                            //       "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                            //   });
                            // } else if (value === "Yes") {
                            //   this.setState({
                            //     bestPracticeInd1:
                            //       "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                            //   });
                            // } else {
                            //   this.setState({
                            //     bestPracticeInd1: "N/A",
                            //   });
                            // }
                            // // Setup BestPractice

                            // // Setup CoachingSupport
                            // if (value === "No" || value === "Partial") {
                            //   this.setState({
                            //     coachingSupportInd1:
                            //       "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                            //     coachingSupportInd2:
                            //       "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                            //   });
                            // } else if (
                            //   this.state.ind12FollowedIDoWeDoYouDoStatus ===
                            //     "No" ||
                            //   this.state.ind12FollowedIDoWeDoYouDoStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportInd1:
                            //       "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                            //     coachingSupportInd2:
                            //       "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind13FollowedContinuityOfLessonStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind13FollowedContinuityOfLessonStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportInd1:
                            //       "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                            //     coachingSupportInd2:
                            //       "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                            //   });
                            // } else if (
                            //   this.state.ind14ImplementedAllTaskInTimeStatus ===
                            //     "No" ||
                            //   this.state.ind14ImplementedAllTaskInTimeStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportInd1:
                            //       "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                            //     coachingSupportInd2:
                            //       "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                            //   });
                            // } else if (
                            //   this.state.ind15InstructedToUseWorkbookStatus ===
                            //     "No" ||
                            //   this.state.ind15InstructedToUseWorkbookStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportInd1:
                            //       "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                            //     coachingSupportInd2:
                            //       "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind16IndependentReadingOpportunityStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind16IndependentReadingOpportunityStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportInd1:
                            //       "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                            //     coachingSupportInd2:
                            //       "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                            //   });
                            // } else if (
                            //   this.state.ind21CorrectlyPronouncedStatus ===
                            //     "No" ||
                            //   this.state.ind21CorrectlyPronouncedStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportInd1:
                            //       "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                            //     coachingSupportInd2:
                            //       "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind22TaughtCorrectlyAllowPracticeStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind22TaughtCorrectlyAllowPracticeStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportInd1:
                            //       "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                            //     coachingSupportInd2:
                            //       "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind23DemonstratesFluentReadingStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind23DemonstratesFluentReadingStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportInd1:
                            //       "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                            //     coachingSupportInd2:
                            //       "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind24AllowReadIndividuallyPairGroupsStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind24AllowReadIndividuallyPairGroupsStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportInd1:
                            //       "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                            //     coachingSupportInd2:
                            //       "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind25FollowsInstructionsInWritingStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind25FollowsInstructionsInWritingStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportInd1:
                            //       "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                            //     coachingSupportInd2:
                            //       "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                            //   });
                            // } else if (
                            //   this.state.ind31AskedHelpfulQuestionsStatus ===
                            //     "No" ||
                            //   this.state.ind31AskedHelpfulQuestionsStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportInd1:
                            //       "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                            //     coachingSupportInd2:
                            //       "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind32TaughtVocabularyNewSentenceStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind32TaughtVocabularyNewSentenceStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportInd1:
                            //       "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                            //     coachingSupportInd2:
                            //       "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind33CheckWritingSpellingPunctuationStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind33CheckWritingSpellingPunctuationStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportInd1:
                            //       "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                            //     coachingSupportInd2:
                            //       "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                            //   });
                            // } else if (
                            //   this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                            //   this.state.ind34CheckedWeDoYouDoStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportInd1:
                            //       "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                            //     coachingSupportInd2:
                            //       "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                            //   });
                            // } else {
                            //   this.setState({
                            //     coachingSupportInd1: "N/A",
                            //     coachingSupportInd2: "N/A",
                            //   });
                            // }
                            // // Setup CoachingSupport
                          }}
                          selectedValue={
                            this.state
                              .ind11TeacherFollowedTeacherGuideInClassStatus
                          }
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                          <Picker.Item label={"Partial"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মন্তব্য: (Comment:)</Text>
                        {!!this.state.errorInd11 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd11}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline={true}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind11TeacherFollowedTeacherGuideInClassNote: text,
                            })
                          }
                          value={
                            this.state
                              .ind11TeacherFollowedTeacherGuideInClassNote + ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

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
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      ১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ
                      করেছেন । (1b. Teachers follow the 'I do-we do-you do'
                      method in the classroom)
                    </Text>

                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১ (Priority Area: 1)
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>পর্যবেক্ষণ: (Observation:)</Text>
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
                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind12FollowedIDoWeDoYouDoStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind12FollowedIDoWeDoYouDoStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd12: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd12: "",
                              });
                            }
                            // Set error message

                            // Set teacher status
                            if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A") &&
                              (this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A") &&
                              (this.state.ind34CheckedWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "No" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "No" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 0",
                              });
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                          <Picker.Item label={"Partial"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মন্তব্য: (Comment:)</Text>
                        {!!this.state.errorInd12 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd12}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline={true}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind12FollowedIDoWeDoYouDoNote: text,
                            })
                          }
                          value={this.state.ind12FollowedIDoWeDoYouDoNote + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

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
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      ১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর
                      গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক
                      ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন । (1c. The past
                      observation form of students' workbook work, books,
                      notebooks and LF showed that the teacher followed the
                      lesson consistently after the last visit.)
                    </Text>

                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১ (Priority Area: 1)
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>পর্যবেক্ষণ: (Observation:)</Text>
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

                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind13FollowedContinuityOfLessonStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind13FollowedContinuityOfLessonStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd13: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd13: "",
                              });
                            }
                            // Set error message

                            // Set teacher status
                            if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A") &&
                              (this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A") &&
                              (this.state.ind34CheckedWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "No" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "No" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 0",
                              });
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                          <Picker.Item label={"Partial"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মন্তব্য: (Comment:)</Text>
                        {!!this.state.errorInd13 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd13}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline={true}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind13FollowedContinuityOfLessonNote: text,
                            })
                          }
                          value={
                            this.state.ind13FollowedContinuityOfLessonNote + ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

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
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      ১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ
                      ধারাবাহিভাবে বাস্তবায়ন করেছেন । (1d. The teacher has
                      consistently implemented all the tasks of the lesson
                      within the stipulated time.)
                    </Text>

                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১ (Priority Area: 1)
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>পর্যবেক্ষণ: (Observation:)</Text>
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

                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind14ImplementedAllTaskInTimeStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind14ImplementedAllTaskInTimeStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd14: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd14: "",
                              });
                            }
                            // Set error message

                            // Set teacher status
                            if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A") &&
                              (this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A") &&
                              (this.state.ind34CheckedWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "No" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "No" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 0",
                              });
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                          <Picker.Item label={"Partial"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মন্তব্য: (Comment:)</Text>
                        {!!this.state.errorInd14 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd14}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline={true}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind14ImplementedAllTaskInTimeNote: text,
                            })
                          }
                          value={
                            this.state.ind14ImplementedAllTaskInTimeNote + ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

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
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      ১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা
                      দিয়েছেন । (1e. Teachers guide students to work in the
                      workbook)
                    </Text>
                    <Text></Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১ (Priority Area: 1)
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>পর্যবেক্ষণ: (Observation:)</Text>
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
                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind15InstructedToUseWorkbookStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind15InstructedToUseWorkbookStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd15: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd15: "",
                              });
                            }
                            // Set error message

                            // Set teacher status
                            if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A") &&
                              (this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A") &&
                              (this.state.ind34CheckedWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "No" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "No" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 0",
                              });
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                          <Picker.Item label={"Partial"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মন্তব্য: (Comment:)</Text>
                        {!!this.state.errorInd15 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd15}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline={true}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind15InstructedToUseWorkbookNote: text,
                            })
                          }
                          value={
                            this.state.ind15InstructedToUseWorkbookNote + ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

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
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      ১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার
                      সুযোগ দিয়েছেন । (1f. The teacher gave students the
                      opportunity to read independently during the class.)
                    </Text>

                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১ (Priority Area: 1)
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>পর্যবেক্ষণ: (Observation:)</Text>
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
                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind16IndependentReadingOpportunityStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind16IndependentReadingOpportunityStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd16: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd16: "",
                              });
                            }
                            // Set error message

                            // Set teacher status
                            if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A") &&
                              (this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A") &&
                              (this.state.ind34CheckedWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "No" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "No" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 0",
                              });
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                          <Picker.Item label={"Partial"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মন্তব্য: (Comment:)</Text>
                        {!!this.state.errorInd16 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd16}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline={true}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind16IndependentReadingOpportunityNote: text,
                            })
                          }
                          value={
                            this.state.ind16IndependentReadingOpportunityNote +
                            ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

                <View style={{ padding: 5 }}>
                  <Text
                    style={{
                      backgroundColor: "white",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    প্রায়োরিটি এরিয়া - ২: মৌলিক পাঠদান দক্ষতা (Priority Area -
                    2: Basic Teaching Skills)
                  </Text>
                </View>

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
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      ২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের
                      ধ্বনি সঠিকভাবে উচ্চারণ করেছেন । (2a. The teacher has
                      correctly pronounced the sounds of all the letters and
                      words used in the phonics activity.)
                    </Text>

                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ২ (Priority Area: 2)
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>পর্যবেক্ষণ: (Observation:)</Text>
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

                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind21CorrectlyPronouncedStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind21CorrectlyPronouncedStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd21: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd21: "",
                              });
                            }
                            // Set error message

                            // Set teacher status
                            if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A") &&
                              (this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A") &&
                              (this.state.ind34CheckedWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "No" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "No" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 0",
                              });
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                          <Picker.Item label={"Partial"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মন্তব্য: (Comment:)</Text>
                        {!!this.state.errorInd21 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd21}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline={true}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind21CorrectlyPronouncedNote: text,
                            })
                          }
                          value={this.state.ind21CorrectlyPronouncedNote + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

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
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      ২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/
                      যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং
                      শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন । (2b. The teacher
                      taught correct letter/hybrid reading or letter/hyphen and
                      syllable reading and gave the students an opportunity to
                      practice.)
                    </Text>

                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ২ (Priority Area: 2)
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>পর্যবেক্ষণ: (Observation:)</Text>
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

                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind22TaughtCorrectlyAllowPracticeStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind22TaughtCorrectlyAllowPracticeStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd22: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd22: "",
                              });
                            }
                            // Set error message

                            // Set teacher status
                            if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A") &&
                              (this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A") &&
                              (this.state.ind34CheckedWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "No" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 0",
                              });
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                          <Picker.Item label={"Partial"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মন্তব্য: (Comment:)</Text>
                        {!!this.state.errorInd22 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd22}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline={true}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind22TaughtCorrectlyAllowPracticeNote: text,
                            })
                          }
                          value={
                            this.state.ind22TaughtCorrectlyAllowPracticeNote +
                            ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

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
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      ২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ
                      উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে
                      দেখিয়েছেন । (2c. The teacher demonstrates fluent reading
                      (reading with correct pace, correct pronunciation and
                      expression) to the students.)
                    </Text>

                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ২ (Priority Area: 2)
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>পর্যবেক্ষণ: (Observation:)</Text>
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

                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind23DemonstratesFluentReadingStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind23DemonstratesFluentReadingStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd23: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd23: "",
                              });
                            }
                            // Set error message

                            // Set teacher status
                            if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (value === "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A") &&
                              (this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A") &&
                              (this.state.ind34CheckedWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "No" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "No" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 0",
                              });
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                          <Picker.Item label={"Partial"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মন্তব্য: (Comment:)</Text>
                        {!!this.state.errorInd23 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd23}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline={true}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind23DemonstratesFluentReadingNote: text,
                            })
                          }
                          value={
                            this.state.ind23DemonstratesFluentReadingNote + ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

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
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      ২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে
                      পড়ার সুযোগ দিয়েছেন । (2d. The teacher gave students the
                      opportunity to read several times individually or in pairs
                      or groups.)
                    </Text>

                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ২ (Priority Area: 2)
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>পর্যবেক্ষণ: (Observation:)</Text>
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

                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state
                              .ind24AllowReadIndividuallyPairGroupsStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind24AllowReadIndividuallyPairGroupsStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd24: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd24: "",
                              });
                            }
                            // Set error message

                            // Set teacher status
                            if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A") &&
                              (this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A") &&
                              (this.state.ind34CheckedWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "No" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 0",
                              });
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                          <Picker.Item label={"Partial"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মন্তব্য: (Comment:)</Text>
                        {!!this.state.errorInd24 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd24}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline={true}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind24AllowReadIndividuallyPairGroupsNote: text,
                            })
                          }
                          value={
                            this.state
                              .ind24AllowReadIndividuallyPairGroupsNote + ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

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
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      ২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য
                      লেখার কাজ করিয়েছেন । (2e. The teacher has done the work
                      of writing letters/hyphens/words/sentences as per
                      instructions.)
                    </Text>

                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ২ (Priority Area: 2)
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>পর্যবেক্ষণ: (Observation:)</Text>
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

                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind25FollowsInstructionsInWritingStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind25FollowsInstructionsInWritingStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd25: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd25: "",
                              });
                            }
                            // Set error message

                            // Set teacher status
                            if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (value === "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A") &&
                              (this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A") &&
                              (this.state.ind34CheckedWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "No" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "No" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 0",
                              });
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                          <Picker.Item label={"Partial"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মন্তব্য: (Comment:)</Text>
                        {!!this.state.errorInd25 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd25}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline={true}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind25FollowsInstructionsInWritingNote: text,
                            })
                          }
                          value={
                            this.state.ind25FollowsInstructionsInWritingNote +
                            ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

                <View style={{ padding: 5 }}>
                  <Text
                    style={{
                      backgroundColor: "white",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    প্রায়োরিটি এরিয়া - ৩: উচ্চতর দক্ষতা অর্জন (Priority Area -
                    3: Achieving Higher Teaching Skills)
                  </Text>
                </View>

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
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      ৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন
                      করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন । (3a. For correct
                      answers, the teacher asked students helpful questions or
                      taught them strategies for finding answers.)
                    </Text>

                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ৩ (Priority Area: 3)
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>পর্যবেক্ষণ: (Observation:)</Text>
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

                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind31AskedHelpfulQuestionsStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind31AskedHelpfulQuestionsStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd31: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd31: "",
                              });
                            }
                            // Set error message

                            // Set teacher status
                            if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A") &&
                              (this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A") &&
                              (this.state.ind34CheckedWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "No" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "No" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 0",
                              });
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                          <Picker.Item label={"Partial"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মন্তব্য: (Comment:)</Text>
                        {!!this.state.errorInd31 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd31}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline={true}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind31AskedHelpfulQuestionsNote: text,
                            })
                          }
                          value={this.state.ind31AskedHelpfulQuestionsNote + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

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
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      ৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং
                      শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক
                      শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন। (3b. The
                      teacher taught the vocabulary words with meaning and gave
                      students opportunities to form new sentences using the
                      words.)
                    </Text>

                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ৩ (Priority Area: 3)
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>পর্যবেক্ষণ: (Observation:)</Text>
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

                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind32TaughtVocabularyNewSentenceStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind32TaughtVocabularyNewSentenceStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd32: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd32: "",
                              });
                            }
                            // Set error message

                            // Set teacher status
                            if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A") &&
                              (this.state.ind34CheckedWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "No" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "No" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 0",
                              });
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                          <Picker.Item label={"Partial"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মন্তব্য: (Comment:)</Text>
                        {!!this.state.errorInd32 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd32}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline={true}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind32TaughtVocabularyNewSentenceNote: text,
                            })
                          }
                          value={
                            this.state.ind32TaughtVocabularyNewSentenceNote + ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

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
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      ৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি
                      চিহ্নের ব্যবহার নিশ্চিত করেছেন । (3c. The teacher checked
                      the students' writing to ensure correct spelling and
                      punctuation.)
                    </Text>

                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ৩ (Priority Area: 3)
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>পর্যবেক্ষণ: (Observation:)</Text>
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

                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state
                              .ind33CheckWritingSpellingPunctuationStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind33CheckWritingSpellingPunctuationStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd33: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd33: "",
                              });
                            }
                            // Set error message

                            // Set teacher status
                            if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind34CheckedWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "No" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "No" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 0",
                              });
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                          <Picker.Item label={"Partial"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মন্তব্য: (Comment:)</Text>
                        {!!this.state.errorInd33 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd33}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline={true}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind33CheckWritingSpellingPunctuationNote: text,
                            })
                          }
                          value={
                            this.state
                              .ind33CheckWritingSpellingPunctuationNote + ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

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
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      ৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ
                      গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন । (3d. During
                      the 'we do-you do' task, the teacher checks whether the
                      students have participated properly.)
                    </Text>

                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ৩ (Priority Area: 3)
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 5,
                      margin: 5,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>পর্যবেক্ষণ: (Observation:)</Text>
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

                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          // placeholder="Pick a single option"
                          enabled={this.state.inputEnabled}
                          selectedValue={this.state.ind34CheckedWeDoYouDoStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind34CheckedWeDoYouDoStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd34: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd34: "",
                              });
                            }
                            // Set error message

                            // Set teacher status
                            if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A") &&
                              (this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A") &&
                              (this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A") &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" ||
                                this.state
                                  .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                  "N/A") &&
                              (this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" ||
                                this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" ||
                                this.state
                                  .ind13FollowedContinuityOfLessonStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14ImplementedAllTaskInTimeStatus ===
                                  "N/A") &&
                              (this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" ||
                                this.state
                                  .ind15InstructedToUseWorkbookStatus ===
                                  "N/A") &&
                              (this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" ||
                                this.state
                                  .ind16IndependentReadingOpportunityStatus ===
                                  "N/A") &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "No" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22TaughtCorrectlyAllowPracticeStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "No" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24AllowReadIndividuallyPairGroupsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "N/A" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentenceStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 0",
                              });
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                          <Picker.Item label={"Partial"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মন্তব্য: (Comment:)</Text>
                        {!!this.state.errorInd34 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd34}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline={true}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind34CheckedWeDoYouDoNote: text,
                            })
                          }
                          value={this.state.ind34CheckedWeDoYouDoNote + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>
              শিক্ষকের অবস্থা (Teacher Status)
            </Text>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 2, padding: 2 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      ইনডিকেটর অনুযায়ী শিক্ষকের অবস্থা (Status of teachers
                      according to indicators)
                    </Text>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      {this.state.teacherStatus}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <Text
                style={{
                  backgroundColor: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                শিক্ষককে পরামর্শ দেয়ার জন্য গুরুত্বপূর্ণ কিছু বিষয় : (Some
                important points to suggest to the teacher:)
              </Text>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  width: "40%",
                  backgroundColor: "#994263",
                  borderRadius: 25,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 0,
                  marginLeft: 170,
                  marginBottom: 2,
                }}
                onPress={this.bestPracticeIndCoachingSupportInd}
              >
                <Text style={{ color: "#ffff" }}>Click to Generate</Text>
              </TouchableOpacity>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      ক্লাস চলাকালীন শিক্ষক ভালো করেছেন এমন ১/২ টি বিষয় উল্লেখ
                      করুন । (Mention 1/2 things the teacher did well during the
                      class.)
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>ইনডিকেটর 1</Text>
                    <Text></Text>
                    <Text
                      style={{
                        backgroundColor: "white",
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      {this.state.bestPracticeInd1}
                    </Text>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>ইনডিকেটর 2</Text>
                    <Text></Text>
                    <Text
                      style={{
                        backgroundColor: "white",
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      {this.state.bestPracticeInd2}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      প্রায়োরিটি এরিয়ার আলোকে যে বিষয়গুলোতে শিক্ষকের আরো ভালো
                      করার সুযোগ আছে তা উল্লেখ করুন । (Based on the priority
                      areas, mention the areas where the teacher has room to
                      improve.)
                    </Text>
                  </View>
                </View>

                <Text>প্রায়োরিটি এরিয়ার বিষয়: (Priority Area)</Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>ইনডিকেটর 1</Text>
                    <Text></Text>
                    <Text
                      style={{
                        backgroundColor: "white",
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      {this.state.coachingSupportInd1}
                    </Text>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>ইনডিকেটর 2</Text>
                    <Text></Text>
                    <Text
                      style={{
                        backgroundColor: "white",
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      {this.state.coachingSupportInd2}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1, padding: 2, flexDirection: "row" }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text>শিক্ষকের করনীয়: ( Teacher to do:)</Text>
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
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="লিখুন(Word limit 50)"
                      keyboardType="default"
                      editable={this.state.inputEnabled}
                      multiline={true}
                      onChangeText={(text) =>
                        this.setState({
                          coachingSupportTeacher: text,
                        })
                      }
                      value={this.state.coachingSupportTeacher + ""}
                    ></TextInput>
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2, flexDirection: "row" }}>
                    <Text>এলএফ-এর করনীয়: (LF to do:)</Text>
                    <Text
                      style={{
                        color: "red",
                        fontSize: 16,
                      }}
                    >
                      *
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="লিখুন(Word limit 50)"
                      keyboardType="default"
                      editable={this.state.inputEnabled}
                      multiline={true}
                      onChangeText={(text) =>
                        this.setState({
                          coachingSupportLF: text,
                        })
                      }
                      value={this.state.coachingSupportLF + ""}
                    ></TextInput>
                  </View>
                </View>
              </View>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>মূল্যায়ন: (Assessment:)</Text>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text
                      style={{
                        backgroundColor: "white",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      দৈবচয়ন পদ্ধতিতে ৩ জন শিক্ষার্থী নির্বাচন করুন এবং
                      সংক্ষিপ্ত মূল্যায়ন করুন: (Randomly select 3 students and
                      do a brief evaluation:)
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      মূল্যায়নের জন্য নির্বাচিত বর্ণ, শব্দ অথবা বাক্য এখানে
                      লিখুন: (Enter the letter, word or sentence selected for
                      assessment here:)
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{
                        height: 150,
                        padding: 5,
                        borderWidth: 1,
                        fontSize: 36,
                        color: "red",
                        fontWeight: "bold",
                        textAlign: "center",
                        backgroundColor: "#a9ddc7ff",
                      }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      keyboardType="default"
                      editable={this.state.inputEnabled}
                      onChangeText={(text) =>
                        this.setState({
                          question1: text,
                        })
                      }
                      value={this.state.question1 + ""}
                    ></TextInput>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>শিক্ষার্থীর নাম/রোল: (Student Name/Roll:)</Text>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 70, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="default"
                      editable={this.state.inputEnabled}
                      onChangeText={(text) =>
                        this.setState({
                          student1: text,
                        })
                      }
                      value={this.state.student1 + ""}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 70, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="default"
                      editable={this.state.inputEnabled}
                      onChangeText={(text) =>
                        this.setState({
                          student2: text,
                        })
                      }
                      value={this.state.student2 + ""}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 70, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="default"
                      editable={this.state.inputEnabled}
                      onChangeText={(text) =>
                        this.setState({
                          student3: text,
                        })
                      }
                      value={this.state.student3 + ""}
                    ></TextInput>
                  </View>
                  {/* <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 70, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="default"
                      editable={true}
                      onChangeText={(text) =>
                        this.setState({
                          student4: text,
                        })
                      }
                      value={this.state.student4 + ""}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 70, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="default"
                      editable={true}
                      onChangeText={(text) =>
                        this.setState({
                          student5: text,
                        })
                      }
                      value={this.state.student5 + ""}
                    ></TextInput>
                  </View> */}
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>সঠিক বলেছে: (Correctly said:)</Text>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={this.state.inputEnabled}
                      onChangeText={(text) =>
                        this.setState({
                          noRightFor1: Number(text),
                          totalFor1: Number(text) + this.state.noWrongFor1,
                        })
                      }
                      value={this.state.noRightFor1 + ""}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={this.state.inputEnabled}
                      onChangeText={(text) =>
                        this.setState({
                          noRightFor2: Number(text),
                          totalFor2: Number(text) + this.state.noWrongFor2,
                        })
                      }
                      value={this.state.noRightFor2 + ""}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={this.state.inputEnabled}
                      onChangeText={(text) =>
                        this.setState({
                          noRightFor3: Number(text),
                          totalFor3: Number(text) + this.state.noWrongFor3,
                        })
                      }
                      value={this.state.noRightFor3 + ""}
                    ></TextInput>
                  </View>
                  {/* <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={true}
                      onChangeText={(text) =>
                        this.setState({
                          noRightFor4: Number(text),
                          totalFor4: Number(text) + this.state.noWrongFor4,
                        })
                      }
                      value={this.state.noRightFor4 + ""}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={true}
                      onChangeText={(text) =>
                        this.setState({
                          noRightFor5: Number(text),
                          totalFor5: Number(text) + this.state.noWrongFor5,
                        })
                      }
                      value={this.state.noRightFor5 + ""}
                    ></TextInput>
                  </View> */}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>ভুল বলেছে: ( Wrong said:)</Text>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={this.state.inputEnabled}
                      onChangeText={(text) =>
                        this.setState({
                          noWrongFor1: Number(text),
                          totalFor1: Number(text) + this.state.noRightFor1,
                        })
                      }
                      value={this.state.noWrongFor1 + ""}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={this.state.inputEnabled}
                      onChangeText={(text) =>
                        this.setState({
                          noWrongFor2: Number(text),
                          totalFor2: Number(text) + this.state.noRightFor2,
                        })
                      }
                      value={this.state.noWrongFor2 + ""}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={this.state.inputEnabled}
                      onChangeText={(text) =>
                        this.setState({
                          noWrongFor3: Number(text),
                          totalFor3: Number(text) + this.state.noRightFor3,
                        })
                      }
                      value={this.state.noWrongFor3 + ""}
                    ></TextInput>
                  </View>
                  {/* <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={true}
                      onChangeText={(text) =>
                        this.setState({
                          noWrongFor4: Number(text),
                          totalFor4: Number(text) + this.state.noRightFor4,
                        })
                      }
                      value={this.state.noWrongFor4 + ""}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={true}
                      onChangeText={(text) =>
                        this.setState({
                          noWrongFor5: Number(text),
                          totalFor5: Number(text) + this.state.noRightFor5,
                        })
                      }
                      value={this.state.noWrongFor5 + ""}
                    ></TextInput>
                  </View> */}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>মোট সংখ্যা: (Total Number:)</Text>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={false}
                      value={this.state.totalFor1 + ""}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={false}
                      value={this.state.totalFor2 + ""}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={false}
                      value={this.state.totalFor3 + ""}
                    ></TextInput>
                  </View>
                  {/* <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={false}
                      value={this.state.totalFor4 + ""}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={false}
                      value={this.state.totalFor5 + ""}
                    ></TextInput>
                  </View> */}
                </View>
              </View>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
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
                marginBottom: 10,
              }}
              onPress={this.showConfirmDialogSaveForLater}
            >
              <Text>Save for later</Text>
            </TouchableOpacity>
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

            {/* <Text>
              Connected:
              {isConnected !== null
                ? isConnected
                  ? "Yes"
                  : "No"
                : "Checking..."}
            </Text>
            <Text>Connection Type: {connectionType}</Text> */}
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
    height: screenwHeight,
    width: screenWidth,
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
  input: {
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
