//  Author: Mohammad Jihad Hossain
//  Create Date: 6/12/2025
//  Modify Date: 17/12/2025
//  Description: PPrePrimaryClass observation component

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

import { Picker } from "@react-native-picker/picker";

import { divisions, districts, upazillas, unions } from "bd-geojs";

import { Card } from "react-native-shadow-cards";

import DateTimePicker from "@react-native-community/datetimepicker";

const { width, height } = Dimensions.get("window");

export default class PrePrimaryClassScreen extends React.Component {
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

      allProject: [],
      allSchool: [],
      allTeacher: [],
      allEmployee: [],
      allOffice: [],
      allDesignation: [],
      allLibraryIndicator: [],
      allPreprimaryIndicator: [],
      allLibraryObservationData: [],
      allPreprimaryClassObservationData: [],
      //Preloaded Data

      // previous visit data of the PrePrimary class
      preMonthData: [],
      // previous visit data of the PrePrimary class

      // Duplicate data check
      duplicatePreprimaryClassObservationData: [],
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

      pickerVisitorOffice: "",
      pickerLF: "",
      pickerLPO: "",
      pickerLFName: "",
      pickerLPOName: "",
      pickerMonth: "",
      pickerYear: "",
      visitor: "",
      visitorDesignation: "",
      classTeacher: "",

      grade: "",
      section: "",

      lessonNo: "",
      lessonName: "",

      storyName: "",
      pictureName: "",
      cardName: "",
      gameName: "",

      classStartTime: "",
      classEndTime: "",

      studentBoy: 0,
      studentGirl: 0,
      studentTotal: 0,
      studentSpecial: 0,

      note: "",

      lastFollowupTopic1: "",
      lastFollowupTopic2: "",
      lastFollowupTopic3: "",

      ind11UsedRtRMaterialStatus: "",
      ind11UsedRtRMaterialNote: "",

      ind12PlanWiseTeachingStatus: "",
      ind12PlanWiseTeachingNote: "",

      ind13FollowedIWeUDoStatus: "",
      ind13FollowedIWeUDoNote: "",

      ind14UsedStandardLanguageAllowPracticeStatus: "",
      ind14UsedStandardLanguageAllowPracticeNote: "",

      ind21UsedRtRReadingMaterialStatus: "",
      ind21UsedRtRReadingMaterialNote: "",

      ind22FollowedPlanContinuityStatus: "",
      ind22FollowedPlanContinuityNote: "",

      ind23AskedRelatedQuestionStatus: "",
      ind23AskedRelatedQuestionNote: "",

      ind24ShowedPictureAllowedSpeakingStatus: "",
      ind24ShowedPictureAllowedSpeakingNote: "",

      ind31UsedReadingMaterialForAssessmentStatus: "",
      ind31UsedReadingMaterialForAssessmentNote: "",

      ind32FollowedTeachingPlanStatus: "",
      ind32FollowedTeachingPlanNote: "",

      ind33AssessmentOn5StudentStatus: "",
      ind33AssessmentOn5StudentNote: "",

      ind34Allowed5StudentStoryTellingStatus: "",
      ind34Allowed5StudentStoryTellingNote: "",

      bestPracticeIndicator1: "",
      bestPracticeIndicator2: "",
      bestPracticeIndicator3: "",

      coachingSupportIndicator1: "",
      coachingSupportIndicator2: "",
      coachingSupportIndicator3: "",

      agreedStatement1: "",
      agreedStatement2: "",

      teacherStatus: "",

      // error message
      dateError: "",

      errorInd11: "",
      errorInd12: "",
      errorInd13: "",
      errorInd14: "",

      errorInd21: "",
      errorInd22: "",
      errorInd23: "",
      errorInd24: "",

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
    this.retrieveDataOffice();
    this.retrieveDataProject();
    this.retrieveDataSchool();
    this.retrieveDataTeacher();
    this.retrieveDataEmployee();

    this.getAllSchool();
    this.getAllEmployee();
    this.getAllDesignation();
    this.getAllPreprimaryIndicator();
    this.getAllPreprimaryClassObservation();
    this.getAllTeacher();

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

  // For Datepicker
  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === "ios" ? true : false,
      date,
    });
  };

  setStartTime = (event, value) => {
    const startTime = value || this.state.startTime;

    this.setState({
      startTime: startTime,
      show: Platform.OS === "ios" ? true : false,
    });
  };

  setEndTime = (event, value) => {
    const endTime = value || this.state.endTime;

    this.setState({
      endTime: endTime,
      show: Platform.OS === "ios" ? true : false,
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

      pickerLF: "",
      pickerLPO: "",
      pickerLFName: "",
      pickerLPOName: "",
      pickerMonth: "",
      pickerYear: "",
      visitor: "",
      visitorDesignation: "",
      classTeacher: "",

      grade: "",
      section: "",

      lessonNo: "",
      lessonName: "",

      storyName: "",
      pictureName: "",
      cardName: "",
      gameName: "",

      classStartTime: "",
      classEndTime: "",

      studentBoy: 0,
      studentGirl: 0,
      studentTotal: 0,
      studentSpecial: 0,

      note: "",

      lastFollowupTopic1: "",
      lastFollowupTopic2: "",
      lastFollowupTopic3: "",

      ind11UsedRtRMaterialStatus: "",
      ind11UsedRtRMaterialNote: "",

      ind12PlanWiseTeachingStatus: "",
      ind12PlanWiseTeachingNote: "",

      ind13FollowedIWeUDoStatus: "",
      ind13FollowedIWeUDoNote: "",

      ind14UsedStandardLanguageAllowPracticeStatus: "",
      ind14UsedStandardLanguageAllowPracticeNote: "",

      ind21UsedRtRReadingMaterialStatus: "",
      ind21UsedRtRReadingMaterialNote: "",

      ind22FollowedPlanContinuityStatus: "",
      ind22FollowedPlanContinuityNote: "",

      ind23AskedRelatedQuestionStatus: "",
      ind23AskedRelatedQuestionNote: "",

      ind24ShowedPictureAllowedSpeakingStatus: "",
      ind24ShowedPictureAllowedSpeakingNote: "",

      ind31UsedReadingMaterialForAssessmentStatus: "",
      ind31UsedReadingMaterialForAssessmentNote: "",

      ind32FollowedTeachingPlanStatus: "",
      ind32FollowedTeachingPlanNote: "",

      ind33AssessmentOn5StudentStatus: "",
      ind33AssessmentOn5StudentNote: "",

      ind34Allowed5StudentStoryTellingStatus: "",
      ind34Allowed5StudentStoryTellingNote: "",

      bestPracticeIndicator1: "",
      bestPracticeIndicator2: "",
      bestPracticeIndicator3: "",

      coachingSupportIndicator1: "",
      coachingSupportIndicator2: "",
      coachingSupportIndicator3: "",

      agreedStatement1: "",
      agreedStatement2: "",

      teacherStatus: "",
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
      const response = await axios("http://118.179.80.51:8080/api/v1/schools", {
        method: "GET",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      this.setState({ allSchool: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };
  // Get All School

  // Get All Teacher
  getAllTeacher = async () => {
    try {
      const response = await fetch("http://118.179.80.51:8080/api/v1/teachers");
      const json = await response.json();
      this.setState({ allTeacher: json });
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
        "http://118.179.80.51:8080/api/v1/employees",
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

  // Get All Preprimary Indicator
  getAllPreprimaryIndicator = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/preprimary-indicator",
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
        allPreprimaryIndicator: response.data,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // Get All Preprimary Indicator

  // Get All Preprimary Data for school
  getAllPreprimaryClassObservation = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/p-preprimary",
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
        allPreprimaryClassObservationData: response.data,
        isLoading: false,
      });
      console.log(
        "allPreprimaryClassObservationData Data: ",
        this.state.allPreprimaryClassObservationData.length
      );
    } catch (error) {
      console.log(error);
    }
  };
  // Get All Preprimary Data for school

  // Register new Preprimary Class data
  savePreprimaryClassObservation = async () => {
    const newPreprimary = {
      date: this.state.date,
      month: this.state.pickerMonth,
      year: this.state.pickerYear,
      district: this.state.pickerDistrict.name,
      upazilla: this.state.pickerUpazilla.name,
      office: this.state.pickerOffice,
      project: this.state.pickerProject,
      visitNo: Math.floor(Math.random() * 100),
      lpo: this.state.pickerLPO.employeeRegId,
      lpoName: this.state.pickerLPOName.name,
      lf: this.state.pickerLF.employeeRegId,
      lfName: this.state.pickerLFName.name,
      school: this.state.pickerSchool.name,
      visitor: this.state.visitor,
      visitorDesignation: this.state.visitorDesignation,
      classTeacher: this.state.classTeacher,
      grade: this.state.grade,
      section: this.state.section,
      rtrSchoolId: this.state.rtrSchoolId,
      yearOfSupport: this.state.yearOfSupport,

      lessonNo: this.state.lessonNo,
      lessonName: this.state.lessonName,
      storyName: this.state.storyName,
      pictureName: this.state.pictureName,
      cardName: this.state.cardName,
      gameName: this.state.gameName,

      classStartTime: this.state.classStartTime,
      classEndTime: this.state.classEndTime,

      totalPresentStudent: this.state.studentTotal,
      totalPresentGirl: this.state.studentGirl,
      totalPresentBoy: this.state.studentBoy,
      totalPresentSpecial: this.state.studentSpecial,

      note: this.state.note,

      lastFollowupIndicator1: this.state.lastFollowupTopic1,
      lastFollowupIndicator2: this.state.lastFollowupTopic2,
      lastFollowupIndicator3: this.state.lastFollowupTopic3,

      ind11UsedRtRMaterialStatus: this.state.ind11UsedRtRMaterialStatus,
      ind11UsedRtRMaterialNote: this.state.ind11UsedRtRMaterialNote,

      ind12PlanWiseTeachingStatus: this.state.ind12PlanWiseTeachingStatus,
      ind12PlanWiseTeachingNote: this.state.ind12PlanWiseTeachingNote,

      ind13FollowedIWeUDoStatus: this.state.ind13FollowedIWeUDoStatus,
      ind13FollowedIWeUDoNote: this.state.ind13FollowedIWeUDoNote,

      ind14UsedStandardLanguageAllowPracticeStatus:
        this.state.ind14UsedStandardLanguageAllowPracticeStatus,
      ind14UsedStandardLanguageAllowPracticeNote:
        this.state.ind14UsedStandardLanguageAllowPracticeNote,

      ind21UsedRtRReadingMaterialStatus:
        this.state.ind21UsedRtRReadingMaterialStatus,
      ind21UsedRtRReadingMaterialNote:
        this.state.ind21UsedRtRReadingMaterialNote,

      ind22FollowedPlanContinuityStatus:
        this.state.ind22FollowedPlanContinuityStatus,
      ind22FollowedPlanContinuityNote:
        this.state.ind22FollowedPlanContinuityNote,

      ind23AskedRelatedQuestionStatus:
        this.state.ind23AskedRelatedQuestionStatus,
      ind23AskedRelatedQuestionNote: this.state.ind23AskedRelatedQuestionNote,

      ind24ShowedPictureAllowedSpeakingStatus:
        this.state.ind24ShowedPictureAllowedSpeakingStatus,
      ind24ShowedPictureAllowedSpeakingNote:
        this.state.ind24ShowedPictureAllowedSpeakingNote,

      ind31UsedReadingMaterialForAssessmentStatus:
        this.state.ind31UsedReadingMaterialForAssessmentStatus,
      ind31UsedReadingMaterialForAssessmentNote:
        this.state.ind31UsedReadingMaterialForAssessmentNote,

      ind32FollowedTeachingPlanStatus:
        this.state.ind32FollowedTeachingPlanStatus,
      ind32FollowedTeachingPlanNote: this.state.ind32FollowedTeachingPlanNote,

      ind33AssessmentOn5StudentStatus:
        this.state.ind33AssessmentOn5StudentStatus,
      ind33AssessmentOn5StudentNote: this.state.ind33AssessmentOn5StudentNote,

      ind34Allowed5StudentStoryTellingStatus:
        this.state.ind34Allowed5StudentStoryTellingStatus,
      ind34Allowed5StudentStoryTellingNote:
        this.state.ind34Allowed5StudentStoryTellingNote,

      bestPracticeIndicator1: this.state.bestPracticeIndicator1,
      bestPracticeIndicator2: this.state.bestPracticeIndicator2,
      bestPracticeIndicator3: this.state.bestPracticeIndicator3,

      coachingSupportIndicator1: this.state.coachingSupportIndicator1,
      coachingSupportIndicator2: this.state.coachingSupportIndicator2,
      coachingSupportIndicator3: this.state.coachingSupportIndicator3,

      agreedStatement1: this.state.agreedStatement1,
      agreedStatement2: this.state.agreedStatement2,

      teacherStatus: this.state.teacherStatus,
    };

    // Validation

    //Check duplicate data
    this.state.duplicatePreprimaryClassObservationData =
      this.state.allPreprimaryClassObservationData.filter((item) => {
        return (
          item.visitNo === this.state.visitNo &&
          item.school === this.state.pickerSchool &&
          item.month === this.state.pickerMonth &&
          item.year === this.state.pickerYear &&
          item.grade === this.state.grade &&
          item.classTeacher.trim() === this.state.classTeacher.trim()
        );
      });

    console.log(
      "Duplicate Preprimary Class Data: ",
      this.state.duplicatePreprimaryClassObservationData.length
    );
    //Check duplicate data

    // Validation
    if (this.state.date === "") {
      this.setState({ dateError: "Date can not be empty" });
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
    } else if (this.state.grade === "") {
      Alert.alert("Alert", "Grade can not be empty");
      return;
    } else if (this.state.section === "") {
      Alert.alert("Alert", "Section can not be empty");
      return;
    } else if (this.state.lessonNo === "") {
      Alert.alert("Alert", "Lesson No can not be empty");
      return;
    } else if (this.state.lessonName === "") {
      Alert.alert("Alert", "Lesson name can not be empty");
      return;
    } else if (this.state.classStartTime === "") {
      Alert.alert("Alert", "ClassStartTime can not be empty");
      return;
    } else if (this.state.classEndTime === "") {
      Alert.alert("Alert", "ClassEndTime can not be empty");
      return;
    } else if (this.state.ind11UsedRtRMaterialStatus === "") {
      Alert.alert("Alert", "Indicator 1.1 can not be empty");
      return;
    } else if (this.state.ind12PlanWiseTeachingStatus === "") {
      Alert.alert("Alert", "Indicator 1.2 can not be empty");
      return;
    } else if (this.state.ind13FollowedIWeUDoStatus === "") {
      Alert.alert("Alert", "Indicator 1.3 can not be empty");
      return;
    } else if (this.state.ind14UsedStandardLanguageAllowPracticeStatus === "") {
      Alert.alert("Alert", "Indicator 1.4 can not be empty");
      return;
    } else if (this.state.ind21UsedRtRReadingMaterialStatus === "") {
      Alert.alert("Alert", "Indicator 2.1 can not be empty");
      return;
    } else if (this.state.ind22FollowedPlanContinuityStatus === "") {
      Alert.alert("Alert", "Indicator 2.2 can not be empty");
      return;
    } else if (this.state.ind23AskedRelatedQuestionStatus === "") {
      Alert.alert("Alert", "Indicator 2.3 can not be empty");
      return;
    } else if (this.state.ind24ShowedPictureAllowedSpeakingStatus === "") {
      Alert.alert("Alert", "Indicator 2.4 can not be empty");
      return;
    } else if (this.state.ind31UsedReadingMaterialForAssessmentStatus === "") {
      Alert.alert("Alert", "Indicator 3.1 can not be empty");
      return;
    } else if (this.state.ind32FollowedTeachingPlanStatus === "") {
      Alert.alert("Alert", "Indicator 3.2 can not be empty");
      return;
    } else if (this.state.ind33AssessmentOn5StudentStatus === "") {
      Alert.alert("Alert", "Indicator 3.3 can not be empty");
      return;
    } else if (this.state.ind34Allowed5StudentStoryTellingStatus === "") {
      Alert.alert("Alert", "Indicator 3.4 can not be empty");
      return;
    } else if (this.state.duplicatePreprimaryClassObservationData.length > 0) {
      Alert.alert("Alert", "Duplicate Preprimary Class Data !!");
      return;
    } else {
      // Send data to API
      try {
        let response = await fetch(
          "http://118.179.80.51:8080/api/v1/p-preprimary",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPreprimary),
          }
        );
        if (response.status >= 200 && response.status < 300) {
          Alert.alert(
            "Alert",
            "Preprimary class obsvervatio data saved successfully!!!",
            [
              // The "Cancel" button
              {
                text: "Cancel",
              },
              // The "Ok" button
              {
                text: "Ok",
              },
            ]
          );
          this.getAllPreprimaryClassObservation();
          this.updateToInitialState();
        } else {
          Alert.alert("Alert", "Error there !!!", [
            // The "Cancel" button
            {
              text: "Cancel",
            },
            // The "Ok" button
            {
              text: "Ok",
            },
          ]);
        }
      } catch (errors) {
        alert(errors);
      }
      // Send data to API
    }
  };
  // Register new Preprimary Class data

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
        onPress: this.savePreprimaryClassObservation,
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

  // Save form data locally
  storeLocally = async () => {
    const formData = {
      date: this.state.date,
      month: this.state.pickerMonth,
      year: this.state.pickerYear,
      district: this.state.pickerDistrict.name,
      upazilla: this.state.pickerUpazilla.name,
      office: this.state.pickerOffice,
      project: this.state.pickerProject,
      visitNo: Math.floor(Math.random() * 100),
      lpo: this.state.pickerLPO.employeeRegId,
      lpoName: this.state.pickerLPOName.name,
      lf: this.state.pickerLF.employeeRegId,
      lfName: this.state.pickerLFName.name,
      school: this.state.pickerSchool.name,
      visitor: this.state.visitor,
      visitorDesignation: this.state.visitorDesignation,
      classTeacher: this.state.classTeacher,
      grade: this.state.grade,
      section: this.state.section,
      rtrSchoolId: this.state.rtrSchoolId,
      yearOfSupport: this.state.yearOfSupport,

      lessonNo: this.state.lessonNo,
      lessonName: this.state.lessonName,
      storyName: this.state.storyName,
      pictureName: this.state.pictureName,
      cardName: this.state.cardName,
      gameName: this.state.gameName,

      classStartTime: this.state.classStartTime,
      classEndTime: this.state.classEndTime,

      totalPresentStudent: this.state.studentTotal,
      totalPresentGirl: this.state.studentGirl,
      totalPresentBoy: this.state.studentBoy,
      totalPresentSpecial: this.state.studentSpecial,

      note: this.state.note,

      lastFollowupIndicator1: this.state.lastFollowupTopic1,
      lastFollowupIndicator2: this.state.lastFollowupTopic2,
      lastFollowupIndicator3: this.state.lastFollowupTopic3,

      ind11UsedRtRMaterialStatus: this.state.ind11UsedRtRMaterialStatus,
      ind11UsedRtRMaterialNote: this.state.ind11UsedRtRMaterialNote,

      ind12PlanWiseTeachingStatus: this.state.ind12PlanWiseTeachingStatus,
      ind12PlanWiseTeachingNote: this.state.ind12PlanWiseTeachingNote,

      ind13FollowedIWeUDoStatus: this.state.ind13FollowedIWeUDoStatus,
      ind13FollowedIWeUDoNote: this.state.ind13FollowedIWeUDoNote,

      ind14UsedStandardLanguageAllowPracticeStatus:
        this.state.ind14UsedStandardLanguageAllowPracticeStatus,
      ind14UsedStandardLanguageAllowPracticeNote:
        this.state.ind14UsedStandardLanguageAllowPracticeNote,

      ind21UsedRtRReadingMaterialStatus:
        this.state.ind21UsedRtRReadingMaterialStatus,
      ind21UsedRtRReadingMaterialNote:
        this.state.ind21UsedRtRReadingMaterialNote,

      ind22FollowedPlanContinuityStatus:
        this.state.ind22FollowedPlanContinuityStatus,
      ind22FollowedPlanContinuityNote:
        this.state.ind22FollowedPlanContinuityNote,

      ind23AskedRelatedQuestionStatus:
        this.state.ind23AskedRelatedQuestionStatus,
      ind23AskedRelatedQuestionNote: this.state.ind23AskedRelatedQuestionNote,

      ind24ShowedPictureAllowedSpeakingStatus:
        this.state.ind24ShowedPictureAllowedSpeakingStatus,
      ind24ShowedPictureAllowedSpeakingNote:
        this.state.ind24ShowedPictureAllowedSpeakingNote,

      ind31UsedReadingMaterialForAssessmentStatus:
        this.state.ind31UsedReadingMaterialForAssessmentStatus,
      ind31UsedReadingMaterialForAssessmentNote:
        this.state.ind31UsedReadingMaterialForAssessmentNote,

      ind32FollowedTeachingPlanStatus:
        this.state.ind32FollowedTeachingPlanStatus,
      ind32FollowedTeachingPlanNote: this.state.ind32FollowedTeachingPlanNote,

      ind33AssessmentOn5StudentStatus:
        this.state.ind33AssessmentOn5StudentStatus,
      ind33AssessmentOn5StudentNote: this.state.ind33AssessmentOn5StudentNote,

      ind34Allowed5StudentStoryTellingStatus:
        this.state.ind34Allowed5StudentStoryTellingStatus,
      ind34Allowed5StudentStoryTellingNote:
        this.state.ind34Allowed5StudentStoryTellingNote,

      bestPracticeIndicator1: this.state.bestPracticeIndicator1,
      bestPracticeIndicator2: this.state.bestPracticeIndicator2,
      bestPracticeIndicator3: this.state.bestPracticeIndicator3,

      coachingSupportIndicator1: this.state.coachingSupportIndicator1,
      coachingSupportIndicator2: this.state.coachingSupportIndicator2,
      coachingSupportIndicator3: this.state.coachingSupportIndicator3,

      agreedStatement1: this.state.agreedStatement1,
      agreedStatement2: this.state.agreedStatement2,

      teacherStatus: this.state.teacherStatus,
    };

    // Validation
    if (this.state.date === "") {
      this.setState({ dateError: "Date can not be empty" });
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
    } else if (this.state.grade === "") {
      Alert.alert("Alert", "Grade can not be empty");
      return;
    } else if (this.state.section === "") {
      Alert.alert("Alert", "Section can not be empty");
      return;
    } else if (this.state.lessonNo === "") {
      Alert.alert("Alert", "Lesson No can not be empty");
      return;
    } else if (this.state.lessonName === "") {
      Alert.alert("Alert", "Lesson name can not be empty");
      return;
    } else if (this.state.classStartTime === "") {
      Alert.alert("Alert", "ClassStartTime can not be empty");
      return;
    } else if (this.state.classEndTime === "") {
      Alert.alert("Alert", "ClassEndTime can not be empty");
      return;
    } else if (this.state.ind11UsedRtRMaterialStatus === "") {
      Alert.alert("Alert", "Indicator 1.1 can not be empty");
      return;
    } else if (this.state.ind12PlanWiseTeachingStatus === "") {
      Alert.alert("Alert", "Indicator 1.2 can not be empty");
      return;
    } else if (this.state.ind13FollowedIWeUDoStatus === "") {
      Alert.alert("Alert", "Indicator 1.3 can not be empty");
      return;
    } else if (this.state.ind14UsedStandardLanguageAllowPracticeStatus === "") {
      Alert.alert("Alert", "Indicator 1.4 can not be empty");
      return;
    } else if (this.state.ind21UsedRtRReadingMaterialStatus === "") {
      Alert.alert("Alert", "Indicator 2.1 can not be empty");
      return;
    } else if (this.state.ind22FollowedPlanContinuityStatus === "") {
      Alert.alert("Alert", "Indicator 2.2 can not be empty");
      return;
    } else if (this.state.ind23AskedRelatedQuestionStatus === "") {
      Alert.alert("Alert", "Indicator 2.3 can not be empty");
      return;
    } else if (this.state.ind24ShowedPictureAllowedSpeakingStatus === "") {
      Alert.alert("Alert", "Indicator 2.4 can not be empty");
      return;
    } else if (this.state.ind31UsedReadingMaterialForAssessmentStatus === "") {
      Alert.alert("Alert", "Indicator 3.1 can not be empty");
      return;
    } else if (this.state.ind32FollowedTeachingPlanStatus === "") {
      Alert.alert("Alert", "Indicator 3.2 can not be empty");
      return;
    } else if (this.state.ind33AssessmentOn5StudentStatus === "") {
      Alert.alert("Alert", "Indicator 3.3 can not be empty");
      return;
    } else if (this.state.ind34Allowed5StudentStoryTellingStatus === "") {
      Alert.alert("Alert", "Indicator 3.4 can not be empty");
      return;
    } else if (this.state.duplicatePreprimaryClassObservationData.length > 0) {
      Alert.alert("Alert", "Duplicate Preprimary Class Data !!");
      return;
    } else {
      // Save data locally
      try {
        const existingData = await AsyncStorage.getItem(
          "offlineFormsPPrePrimary"
        );
        const forms = existingData ? JSON.parse(existingData) : [];
        forms.push(formData);
        await AsyncStorage.setItem(
          "offlineFormsPPrePrimary",
          JSON.stringify(forms)
        );
        console.log("Data stored locally: " + JSON.stringify(forms));
        Alert.alert("Data stored locally.");
        this.updateToInitialState();
      } catch (error) {
        console.error("Error storing data locally:", error);
        Alert.alert("Error storing data locally:", error);
      }
      // Save data locally
    }
  };
  // Save form data locally

  // Sync stored data
  syncPendingData = async () => {
    try {
      const existingData = await AsyncStorage.getItem(
        "offlineFormsPPrePrimary"
      );
      if (existingData) {
        const formsToSync = JSON.parse(existingData);
        for (const formData of formsToSync) {
          await fetch("http://118.179.80.51:8080/api/v1/p-preprimary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
        }
        console.log("PP Data syncing");
        await AsyncStorage.removeItem("offlineFormsPPrePrimary"); // Clear synced data
        console.log(
          "Pending data synced successfully: " + JSON.parse(existingData)
        );
        console.log("Pending data synced successfully!");
        Alert.alert("Pending data synced successfully!");
      }
    } catch (error) {
      console.error("Error syncing pending data:", error);
      Alert.alert("Error syncing pending data:", error);
    }
  };
  // Sync stored data

  // Calculate bestPractice  && coachingSupport
  bestPracticeIndCoachingSupportInd = () => {
    // Setup CoachingSupport
    const variablesInd = [
      this.state.ind11UsedRtRMaterialStatus,
      this.state.ind12PlanWiseTeachingStatus,
      this.state.ind13FollowedIWeUDoStatus,
      this.state.ind14UsedStandardLanguageAllowPracticeStatus,
      this.state.ind21UsedRtRReadingMaterialStatus,
      this.state.ind22FollowedPlanContinuityStatus,
      this.state.ind23AskedRelatedQuestionStatus,
      this.state.ind24ShowedPictureAllowedSpeakingStatus,
      this.state.ind31UsedReadingMaterialForAssessmentStatus,
      this.state.ind32FollowedTeachingPlanStatus,
      this.state.ind33AssessmentOn5StudentStatus,
      this.state.ind34Allowed5StudentStoryTellingStatus,
    ];

    const variablesIndValue = [
      "১ক. রুম টু রিড কর্তৃক প্রদত্ত পাঠ সংশ্লিষ্ট উপকরণ ব্যবহার করেছেন।",
      "১খ. শিক্ষক পরিকল্পনা অনুযায়ী দিনভিত্তিক পাঠ পরিচালনা করেছেন (গল্প/ কথোপকথন/ অভিজ্ঞতার গল্প/ ধ্বনি সচেতনতা)।",
      "১গ. শিক্ষক ক্লাসে আমি করি- আমরা করি- তুমি কর পদ্ধতি অনুসরণ করেছেন।",
      "১ঘ. শিক্ষক পাঠের প্রয়োজনে কথ্য ও প্রমিত ভাষার ব্যবহার করেছেন এবং শিক্ষার্থীদের কথ্য ও প্রমিত ভাষা চর্চার সুযোগ দিয়েছেন।",
      "২ক. রুম টু রিড কর্তৃক প্রদত্ত পাঠ সংশ্লিষ্ট উপকরণ ব্যবহার করে শিক্ষার্থীদের অংশগ্রহণে সু-স্পষ্ট নির্দেশনা দিয়েছেন।",
      "২খ. শিক্ষক পরিকল্পনা অনুযায়ী দিনভিত্তিক পাঠের ধারাবাহিকতা অনুসরণ করে পাঠ পরিচালনা করেছেন।",
      "২গ. শিক্ষক শিক্ষার্থীদের সক্রিয় অংশগ্রহণে পাঠ সম্পর্কিত প্রশ্ন করেছেন।",
      "২ঘ. শিক্ষক পাঠ সংশ্লিষ্ট ছবির বিষয়বস্তু নিয়ে প্রশ্ন করেছেন এবং শিক্ষার্থীদের বলার সুযোগ দিয়েছেন।",
      "৩ক. রুম টু রিড কর্তৃক প্রদত্ত পাঠ সংশ্লিষ্ট উপকরণ ব্যবহার করে শিখন যাচাই করেছেন।",
      "তখ. শিক্ষক পরিকল্পনা অনুযায়ী কাজের সঠিক ধাপ অনুসরণ করে পাঠ পরিচালনা করেছেন।",
      "তগ. শিক্ষক ছোট ছোট প্রশ্নের মাধ্যমে অন্তত ৫ জন শিক্ষার্থীর বোধগম্যতা যাচাই করেছেন।",
      "৩ঘ. শিক্ষক শিক্ষার্থীদেরকে নিজের মতো করে অন্তত ৫ জন শিক্ষার্থীর গল্প/ শব্দ/বাক্য/ অভিজ্ঞতার গল্প বলার সুযোগ দিয়েছেন।",
    ];

    let noCount = 0;

    for (let i = 0; i < variablesInd.length; i++) {
      if (variablesInd[i] === "No") {
        if (noCount === 0) {
          // Assign the first 'No' found to coachingSupport1
          this.setState({
            coachingSupportIndicator1: variablesIndValue[i],
          });
          noCount++;
        } else if (noCount === 1) {
          this.setState({
            coachingSupportIndicator2: variablesIndValue[i],
          }); // Assign the second 'No' found to coachingSupport2
          noCount++;
          // We found both, so we can stop the loop if needed (optional optimization)
          break;
        }
      } else if (variablesInd[i] === "Partial") {
        if (noCount === 0) {
          // Assign the first 'No' found to coachingSupport1
          this.setState({
            coachingSupportIndicator1: variablesIndValue[i],
          });
          noCount++;
        } else if (noCount === 1) {
          this.setState({
            coachingSupportIndicator2: variablesIndValue[i],
          }); // Assign the second 'No' found to coachingSupport2
          noCount++;
          // We found both, so we can stop the loop if needed (optional optimization)
          break;
        }
      }
    }
    // Setup CoachingSupport

    // Setup BestPractice

    const variables = [
      this.state.ind24ShowedPictureAllowedSpeakingStatus,
      this.state.ind23AskedRelatedQuestionStatus,
      this.state.ind22FollowedPlanContinuityStatus,
      this.state.ind21UsedRtRReadingMaterialStatus,
    ];

    const variables2 = [
      "২ঘ. শিক্ষক পাঠ সংশ্লিষ্ট ছবির বিষয়বস্তু নিয়ে প্রশ্ন করেছেন এবং শিক্ষার্থীদের বলার সুযোগ দিয়েছেন।",
      "২গ. শিক্ষক শিক্ষার্থীদের সক্রিয় অংশগ্রহণে পাঠ সম্পর্কিত প্রশ্ন করেছেন।",
      "২খ. শিক্ষক পরিকল্পনা অনুযায়ী দিনভিত্তিক পাঠের ধারাবাহিকতা অনুসরণ করে পাঠ পরিচালনা করেছেন।",
      "২ক. রুম টু রিড কর্তৃক প্রদত্ত পাঠ সংশ্লিষ্ট উপকরণ ব্যবহার করে শিক্ষার্থীদের অংশগ্রহণে সু-স্পষ্ট নির্দেশনা দিয়েছেন।",
    ];
    let yesCount = 0;

    for (let i = 0; i < variables.length; i++) {
      if (variables[i] === "Yes") {
        if (yesCount === 0) {
          // Assign the first 'yes' found to bestPracticeInd1
          this.setState({
            bestPracticeIndicator1: variables2[i],
          });
          yesCount++;
        } else if (yesCount === 1) {
          this.setState({
            bestPracticeIndicator2: variables2[i],
          }); // Assign the second 'yes' found to y
          yesCount++;
          // We found both, so we can stop the loop if needed (optional optimization)
          break;
        }
      }
    }
    // Setup BestPractice
  };
  // Calculate bestPractice  && coachingSupport

  // Save for later
  saveForLater = async () => {
    const formData = {
      date: this.state.date,
      month: this.state.pickerMonth,
      year: this.state.pickerYear,
      district: this.state.pickerDistrict.name,
      upazilla: this.state.pickerUpazilla.name,
      office: this.state.pickerOffice,
      project: this.state.pickerProject,
      visitNo: Math.floor(Math.random() * 100),
      lpo: this.state.pickerLPO.employeeRegId,
      lpoName: this.state.pickerLPOName.name,
      lf: this.state.pickerLF.employeeRegId,
      lfName: this.state.pickerLFName.name,
      school: this.state.pickerSchool.name,
      visitor: this.state.visitor,
      visitorDesignation: this.state.visitorDesignation,
      classTeacher: this.state.classTeacher,
      grade: this.state.grade,
      section: this.state.section,
      rtrSchoolId: this.state.rtrSchoolId,
      yearOfSupport: this.state.yearOfSupport,

      lessonNo: this.state.lessonNo,
      lessonName: this.state.lessonName,
      storyName: this.state.storyName,
      pictureName: this.state.pictureName,
      cardName: this.state.cardName,
      gameName: this.state.gameName,

      classStartTime: this.state.classStartTime,
      classEndTime: this.state.classEndTime,

      totalPresentStudent: this.state.studentTotal,
      totalPresentGirl: this.state.studentGirl,
      totalPresentBoy: this.state.studentBoy,
      totalPresentSpecial: this.state.studentSpecial,

      note: this.state.note,

      lastFollowupIndicator1: this.state.lastFollowupTopic1,
      lastFollowupIndicator2: this.state.lastFollowupTopic2,
      lastFollowupIndicator3: this.state.lastFollowupTopic3,

      ind11UsedRtRMaterialStatus: this.state.ind11UsedRtRMaterialStatus,
      ind11UsedRtRMaterialNote: this.state.ind11UsedRtRMaterialNote,

      ind12PlanWiseTeachingStatus: this.state.ind12PlanWiseTeachingStatus,
      ind12PlanWiseTeachingNote: this.state.ind12PlanWiseTeachingNote,

      ind13FollowedIWeUDoStatus: this.state.ind13FollowedIWeUDoStatus,
      ind13FollowedIWeUDoNote: this.state.ind13FollowedIWeUDoNote,

      ind14UsedStandardLanguageAllowPracticeStatus:
        this.state.ind14UsedStandardLanguageAllowPracticeStatus,
      ind14UsedStandardLanguageAllowPracticeNote:
        this.state.ind14UsedStandardLanguageAllowPracticeNote,

      ind21UsedRtRReadingMaterialStatus:
        this.state.ind21UsedRtRReadingMaterialStatus,
      ind21UsedRtRReadingMaterialNote:
        this.state.ind21UsedRtRReadingMaterialNote,

      ind22FollowedPlanContinuityStatus:
        this.state.ind22FollowedPlanContinuityStatus,
      ind22FollowedPlanContinuityNote:
        this.state.ind22FollowedPlanContinuityNote,

      ind23AskedRelatedQuestionStatus:
        this.state.ind23AskedRelatedQuestionStatus,
      ind23AskedRelatedQuestionNote: this.state.ind23AskedRelatedQuestionNote,

      ind24ShowedPictureAllowedSpeakingStatus:
        this.state.ind24ShowedPictureAllowedSpeakingStatus,
      ind24ShowedPictureAllowedSpeakingNote:
        this.state.ind24ShowedPictureAllowedSpeakingNote,

      ind31UsedReadingMaterialForAssessmentStatus:
        this.state.ind31UsedReadingMaterialForAssessmentStatus,
      ind31UsedReadingMaterialForAssessmentNote:
        this.state.ind31UsedReadingMaterialForAssessmentNote,

      ind32FollowedTeachingPlanStatus:
        this.state.ind32FollowedTeachingPlanStatus,
      ind32FollowedTeachingPlanNote: this.state.ind32FollowedTeachingPlanNote,

      ind33AssessmentOn5StudentStatus:
        this.state.ind33AssessmentOn5StudentStatus,
      ind33AssessmentOn5StudentNote: this.state.ind33AssessmentOn5StudentNote,

      ind34Allowed5StudentStoryTellingStatus:
        this.state.ind34Allowed5StudentStoryTellingStatus,
      ind34Allowed5StudentStoryTellingNote:
        this.state.ind34Allowed5StudentStoryTellingNote,

      bestPracticeIndicator1: this.state.bestPracticeIndicator1,
      bestPracticeIndicator2: this.state.bestPracticeIndicator2,
      bestPracticeIndicator3: this.state.bestPracticeIndicator3,

      coachingSupportIndicator1: this.state.coachingSupportIndicator1,
      coachingSupportIndicator2: this.state.coachingSupportIndicator2,
      coachingSupportIndicator3: this.state.coachingSupportIndicator3,

      agreedStatement1: this.state.agreedStatement1,
      agreedStatement2: this.state.agreedStatement2,

      teacherStatus: this.state.teacherStatus,
    };

    // Validation
    if (this.state.date === "") {
      this.setState({ dateError: "Date can not be empty" });
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
    } else if (this.state.grade === "") {
      Alert.alert("Alert", "Grade can not be empty");
      return;
    } else if (this.state.section === "") {
      Alert.alert("Alert", "Section can not be empty");
      return;
    } else if (this.state.lessonNo === "") {
      Alert.alert("Alert", "Lesson No can not be empty");
      return;
    } else if (this.state.lessonName === "") {
      Alert.alert("Alert", "Lesson name can not be empty");
      return;
    } else if (this.state.classStartTime === "") {
      Alert.alert("Alert", "ClassStartTime can not be empty");
      return;
    } else if (this.state.classEndTime === "") {
      Alert.alert("Alert", "ClassEndTime can not be empty");
      return;
    } else {
      try {
        const existingData = await AsyncStorage.getItem(
          "saveForLaterPPrePrimary"
        );
        const forms = existingData ? JSON.parse(existingData) : [];
        forms.push(formData);
        await AsyncStorage.setItem(
          "saveForLaterPPrePrimary",
          JSON.stringify(forms)
        );
        console.log("Data saved for later: " + JSON.stringify(forms));
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
      const existingData = await AsyncStorage.getItem(
        "saveForLaterPPrePrimary"
      );
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
            // visitor: formData.visitor,
            // visitorDesignation: formData.visitorDesignation,

            lessonNo: formData.lessonNo,
            lessonName: formData.lessonName,
            storyName: formData.storyName,
            pictureName: formData.pictureName,
            cardName: formData.cardName,
            gameName: formData.gameName,

            classStartTime: formData.classStartTime,
            classEndTime: formData.classEndTime,

            studentTotal: formData.totalPresentStudent,
            studentGirl: formData.totalPresentGirl,
            studentBoy: formData.totalPresentBoy,
            studentSpecial: formData.totalPresentSpecial,

            note: formData.note,

            lastFollowupIndicator1: formData.lastFollowupIndicator1,
            lastFollowupIndicator2: formData.lastFollowupIndicator2,
            lastFollowupIndicator3: formData.lastFollowupIndicator3,

            ind11UsedRtRMaterialStatus: formData.ind11UsedRtRMaterialStatus,
            ind11UsedRtRMaterialNote: formData.ind11UsedRtRMaterialNote,

            ind12PlanWiseTeachingStatus: formData.ind12PlanWiseTeachingStatus,
            ind12PlanWiseTeachingNote: formData.ind12PlanWiseTeachingNote,

            ind13FollowedIWeUDoStatus: formData.ind13FollowedIWeUDoStatus,
            ind13FollowedIWeUDoNote: formData.ind13FollowedIWeUDoNote,

            ind14UsedStandardLanguageAllowPracticeStatus:
              formData.ind14UsedStandardLanguageAllowPracticeStatus,
            ind14UsedStandardLanguageAllowPracticeNote:
              formData.ind14UsedStandardLanguageAllowPracticeNote,

            ind21UsedRtRReadingMaterialStatus:
              formData.ind21UsedRtRReadingMaterialStatus,
            ind21UsedRtRReadingMaterialNote:
              formData.ind21UsedRtRReadingMaterialNote,

            ind22FollowedPlanContinuityStatus:
              formData.ind22FollowedPlanContinuityStatus,
            ind22FollowedPlanContinuityNote:
              formData.ind22FollowedPlanContinuityNote,

            ind23AskedRelatedQuestionStatus:
              formData.ind23AskedRelatedQuestionStatus,
            ind23AskedRelatedQuestionNote:
              formData.ind23AskedRelatedQuestionNote,

            ind24ShowedPictureAllowedSpeakingStatus:
              formData.ind24ShowedPictureAllowedSpeakingStatus,
            ind24ShowedPictureAllowedSpeakingNote:
              formData.ind24ShowedPictureAllowedSpeakingNote,

            ind31UsedReadingMaterialForAssessmentStatus:
              formData.ind31UsedReadingMaterialForAssessmentStatus,
            ind31UsedReadingMaterialForAssessmentNote:
              formData.ind31UsedReadingMaterialForAssessmentNote,

            ind32FollowedTeachingPlanStatus:
              formData.ind32FollowedTeachingPlanStatus,
            ind32FollowedTeachingPlanNote:
              formData.ind32FollowedTeachingPlanNote,

            ind33AssessmentOn5StudentStatus:
              formData.ind33AssessmentOn5StudentStatus,
            ind33AssessmentOn5StudentNote:
              formData.ind33AssessmentOn5StudentNote,

            ind34Allowed5StudentStoryTellingStatus:
              formData.ind34Allowed5StudentStoryTellingStatus,
            ind34Allowed5StudentStoryTellingNote:
              formData.ind34Allowed5StudentStoryTellingNote,

            bestPracticeIndicator1: formData.bestPracticeIndicator1,
            bestPracticeIndicator2: formData.bestPracticeIndicator2,
            bestPracticeIndicator2: formData.bestPracticeIndicator2,

            coachingSupportIndicator1: formData.coachingSupportIndicator1,
            coachingSupportIndicator2: formData.coachingSupportIndicator2,
            coachingSupportIndicator3: formData.coachingSupportIndicator3,

            agreedStatement1: formData.agreedStatement1,
            agreedStatement2: formData.agreedStatement2,

            teacherStatus: formData.teacherStatus,
          });
        }
        await AsyncStorage.removeItem("saveForLaterPBangla"); // Clear synced data
        console.log("Saved data set successful: " + JSON.parse(existingData));
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
      ]
    );
  };
  // Alert before save for later

  render() {
    // For Datepicker
    const {
      show,
      date,
      mode,
      startTime,
      endTime,
      isConnected,
      connectionType,
    } = this.state;
    // For Datepicker

    return (
      <View style={styles.container}>
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 2,
              alignContent: "center",
              textAlign: "center",
              alignSelf: "center",
              marginLeft: 100,
              marginRight: 100,
            }}
          >
            শ্রেণি কার্যক্রম পর্যবেক্ষণ ফরম
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 0,
              alignContent: "center",
              textAlign: "center",
              alignSelf: "center",
              marginLeft: 100,
              marginRight: 100,
            }}
          >
            প্রাক-প্রাথমিক শ্রেণি
          </Text>
        </View>

        <ScrollView>
          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>সাধারণ তথ্য:</Text>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ flexDirection: "row", padding: 2, margin: 2 }}>
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
                    {String(this.state.date.toISOString().slice(0, 10))}
                  </Text>
                  <Button
                    style={{
                      height: 40,
                      width: 10,
                    }}
                    onPress={this.datepicker}
                    title="Select"
                  />
                  {show && (
                    <DateTimePicker
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display="default"
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
                      শ্রেণি: (Grade:)
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
                      // if (this.state.teacherTrained === "No") {
                      //   this.setState({ inputEnabled: false });
                      // } else {
                      //   this.setState({ inputEnabled: true });
                      // }
                      // Collasp variable

                      // Find perivious visit data
                      // this.setState({
                      //   preMonthData:
                      //     this.state.allBanglaClassObservationData.filter(
                      //       (item) => {
                      //         return (
                      //           // item.visitNo ===
                      //           //   parseInt(parseInt(this.state.visitNo) - 1) &&
                      //           item.rtrSchoolId === this.state.rtrSchoolId &&
                      //           item.project === this.state.pickerProject &&
                      //           item.year === this.state.pickerYear &&
                      //           item.grade === this.state.grade &&
                      //           item.section === this.state.section &&
                      //           item.classTeacher.toLowerCase().trim() ===
                      //             this.state.classTeacher.toLowerCase().trim()
                      //         );
                      //       }
                      //     ),
                      // });

                      // console.log(
                      //   "All values: ",
                      //   this.state.rtrSchoolId,
                      //   this.state.pickerProject,
                      //   this.state.pickerYear,
                      //   this.state.grade,
                      //   this.state.section,
                      //   this.state.classTeacher
                      // );
                      // Find perivious visit data
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"PP"} value={"PP"} />
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
                      শ্রেণি শিক্ষকের নাম: ( Teacher Name:)
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
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      পাঠের ক্রম: (Lesson No:)
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
                    editable={true}
                    onChangeText={(text) => this.setState({ lessonNo: text })}
                    value={this.state.lessonNo + ""}
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
                      পাঠ:(Lesson)
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
                    selectedValue={this.state.lessonName}
                    onValueChange={(value) => {
                      this.setState({ lessonName: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"গল্প"} value={"Stroy"} />
                    <Picker.Item label={"কথোপকথন"} value={"Speaking"} />
                    <Picker.Item
                      label={"অভিজ্ঞতার গল্প"}
                      value={"Experience Story"}
                    />
                    <Picker.Item label={"ভাষার খেলা"} value={"Language Game"} />
                  </Picker>
                </View>
              </View>

              <View style={{ flexDirection: "row", padding: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    গল্পের নাম:
                  </Text>
                  <TextInput
                    style={{
                      height: 30,
                      width: 200,
                      padding: 5,
                      borderWidth: 1,
                    }}
                    keyboardType="default"
                    placeholder=""
                    editable={true}
                    onChangeText={(text) => this.setState({ storyName: text })}
                    value={this.state.storyName + ""}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    ছবির নাম:
                  </Text>
                  <TextInput
                    style={{
                      height: 30,
                      width: 200,
                      padding: 5,
                      borderWidth: 1,
                    }}
                    keyboardType="default"
                    placeholder=""
                    editable={true}
                    onChangeText={(text) =>
                      this.setState({ pictureName: text })
                    }
                    value={this.state.pictureName + ""}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    কার্ডের নাম:
                  </Text>
                  <TextInput
                    style={{
                      height: 30,
                      width: 200,
                      padding: 5,
                      borderWidth: 1,
                    }}
                    keyboardType="default"
                    placeholder=""
                    editable={true}
                    onChangeText={(text) => this.setState({ cardName: text })}
                    value={this.state.cardName + ""}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    খেলার নাম:
                  </Text>
                  <TextInput
                    style={{
                      height: 30,
                      width: 200,
                      padding: 5,
                      borderWidth: 1,
                    }}
                    keyboardType="default"
                    placeholder=""
                    editable={true}
                    onChangeText={(text) => this.setState({ gameName: text })}
                    value={this.state.gameName + ""}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row", padding: 10 }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        ক্লাস শুরুর সময়:
                      </Text>
                      <TextInput
                        style={{
                          height: 30,
                          width: 200,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="default"
                        placeholder=""
                        editable={true}
                        onChangeText={(text) =>
                          this.setState({ classStartTime: text })
                        }
                        value={this.state.classStartTime + ""}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    ক্লাস শেষের সময়:
                  </Text>
                  <TextInput
                    style={{
                      height: 30,
                      width: 200,
                      padding: 5,
                      borderWidth: 1,
                    }}
                    keyboardType="default"
                    placeholder=""
                    editable={true}
                    onChangeText={(text) =>
                      this.setState({ classEndTime: text })
                    }
                    value={this.state.classEndTime + ""}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row", padding: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    উপস্থিত শিশুর সংখ্যা :
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text>মেয়ে:</Text>
                      <Text>ছেলে:</Text>
                      <Text>মোট:</Text>
                      <Text>প্রতিবন্ধী শিশু:</Text>
                    </View>
                    <View style={{ flex: 1 }}>
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
                        onChangeText={(text) =>
                          this.setState({
                            studentGirl: Number(text),
                            studentTotal: Number(text) + this.state.studentBoy,
                          })
                        }
                        value={this.state.studentGirl + ""}
                      />
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
                        onChangeText={(text) =>
                          this.setState({
                            studentBoy: Number(text),
                            studentTotal: Number(text) + this.state.studentGirl,
                          })
                        }
                        value={this.state.studentBoy + ""}
                      />
                      <TextInput
                        style={{
                          height: 30,
                          width: 100,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="numeric"
                        placeholder=""
                        editable={false}
                        value={this.state.studentTotal + ""}
                      />
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
                        onChangeText={(text) =>
                          this.setState({
                            studentSpecial: Number(text),
                          })
                        }
                        value={this.state.studentSpecial + ""}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: "row", padding: 10 }}>
                <View style={{ flex: 2 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    মন্তব্য :
                  </Text>
                  <TextInput
                    style={{
                      height: 80,
                      width: 520,
                      padding: 5,
                      borderWidth: 1,
                    }}
                    keyboardType="default"
                    placeholder=""
                    editable={true}
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

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>ইনডিকেটর</Text>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5, flexDirection: "row" }}>
                <Text
                  style={{
                    backgroundColor: "",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  প্রায়োরিটি এরিয়া-১: পাঠদান পরিকল্পনা অনুসরণ
                </Text>
              </View>
              <View style={{ padding: 5 }}>
                <Card
                  style={{
                    padding: 5,
                    margin: 5,
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
                    <Text>
                      ১ক রুম টু রিড কর্তৃক প্রদত্ত পাঠ সংশ্লিষ্ট উপকরণ ব্যবহার
                      করেছেন
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
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          selectedValue={this.state.ind11UsedRtRMaterialStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind11UsedRtRMaterialStatus: value,
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
                              (this.state.ind12PlanWiseTeachingStatus ===
                                "Yes" ||
                                this.state.ind12PlanWiseTeachingStatus ===
                                  "N/A") &&
                              (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                                this.state.ind13FollowedIWeUDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14UsedStandardLanguageAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state.ind21UsedRtRReadingMaterialStatus ===
                                "Yes" ||
                                this.state.ind21UsedRtRReadingMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind22FollowedPlanContinuityStatus ===
                                "Yes" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "N/A") &&
                              (this.state.ind23AskedRelatedQuestionStatus ===
                                "Yes" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Yes" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Yes" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "No" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "Partial" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "Yes" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "No" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "N/A" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "Partial" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "Yes" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "No" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "N/A" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "No" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind12PlanWiseTeachingStatus ===
                                "Yes" ||
                                this.state.ind12PlanWiseTeachingStatus ===
                                  "N/A") &&
                              (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                                this.state.ind13FollowedIWeUDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14UsedStandardLanguageAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state.ind21UsedRtRReadingMaterialStatus ===
                                "Yes" ||
                                this.state.ind21UsedRtRReadingMaterialStatus ===
                                  "No" ||
                                this.state.ind21UsedRtRReadingMaterialStatus ===
                                  "N/A" ||
                                this.state.ind21UsedRtRReadingMaterialStatus ===
                                  "Partial" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "Yes" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "No" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "N/A" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "Partial" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "Yes" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "No" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "N/A" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "No" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "No" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "Partial" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "Yes" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "No" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "N/A" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "Partial" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "Yes" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "No" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "N/A" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "No" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 1",
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
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
                        {!!this.state.errorInd11 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd11}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 350,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({ ind11UsedRtRMaterialNote: text })
                          }
                          value={this.state.ind11UsedRtRMaterialNote + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

                <Card
                  style={{
                    padding: 5,
                    margin: 5,
                    flex: 1,
                    alignSelf: "center",
                  }}
                >
                  <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ১খ শিক্ষক পরিকল্পনা অনুযায়ী দিনভিত্তিক পাঠ পরিচালনা
                      করেছেন (গল্প/ কথোপকথন/ অভিজ্ঞতার গল্প/ ধ্বনি সচেতনতা)
                    </Text>
                  </Card>
                  <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          selectedValue={this.state.ind12PlanWiseTeachingStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind12PlanWiseTeachingStatus: value,
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
                              (this.state.ind11UsedRtRMaterialStatus ===
                                "Yes" ||
                                this.state.ind11UsedRtRMaterialStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                                this.state.ind13FollowedIWeUDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14UsedStandardLanguageAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state.ind21UsedRtRReadingMaterialStatus ===
                                "Yes" ||
                                this.state.ind21UsedRtRReadingMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind22FollowedPlanContinuityStatus ===
                                "Yes" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "N/A") &&
                              (this.state.ind23AskedRelatedQuestionStatus ===
                                "Yes" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Yes" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Yes" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "No" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "Partial" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "Yes" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "No" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "N/A" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "Partial" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "Yes" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "No" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "N/A" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "No" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11UsedRtRMaterialStatus ===
                                "Yes" ||
                                this.state.ind11UsedRtRMaterialStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                                this.state.ind13FollowedIWeUDoStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14UsedStandardLanguageAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state.ind21UsedRtRReadingMaterialStatus ===
                                "Yes" ||
                                this.state.ind21UsedRtRReadingMaterialStatus ===
                                  "No" ||
                                this.state.ind21UsedRtRReadingMaterialStatus ===
                                  "N/A" ||
                                this.state.ind21UsedRtRReadingMaterialStatus ===
                                  "Partial" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "Yes" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "No" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "N/A" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "Partial" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "Yes" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "No" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "N/A" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "No" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "No" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "Partial" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "Yes" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "No" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "N/A" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "Partial" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "Yes" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "No" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "N/A" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "No" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 1",
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
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
                        {!!this.state.errorInd12 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd12}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 350,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind12PlanWiseTeachingNote: text,
                            })
                          }
                          value={this.state.ind12PlanWiseTeachingNote + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

                <Card
                  style={{
                    padding: 5,
                    margin: 5,
                    flex: 1,
                    alignSelf: "center",
                  }}
                >
                  <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ১গ শিক্ষক ক্লাসে আমি করি- আমরা করি- তুমি কর পদ্ধতি অনুসরণ
                      করেছেন
                    </Text>
                  </Card>
                  <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          selectedValue={this.state.ind13FollowedIWeUDoStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind13FollowedIWeUDoStatus: value,
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
                              (this.state.ind11UsedRtRMaterialStatus ===
                                "Yes" ||
                                this.state.ind11UsedRtRMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12PlanWiseTeachingStatus ===
                                "Yes" ||
                                this.state.ind12PlanWiseTeachingStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14UsedStandardLanguageAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state.ind21UsedRtRReadingMaterialStatus ===
                                "Yes" ||
                                this.state.ind21UsedRtRReadingMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind22FollowedPlanContinuityStatus ===
                                "Yes" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "N/A") &&
                              (this.state.ind23AskedRelatedQuestionStatus ===
                                "Yes" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Yes" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Yes" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "No" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "Partial" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "Yes" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "No" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "N/A" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "Partial" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "Yes" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "No" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "N/A" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "No" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11UsedRtRMaterialStatus ===
                                "Yes" ||
                                this.state.ind11UsedRtRMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12PlanWiseTeachingStatus ===
                                "Yes" ||
                                this.state.ind12PlanWiseTeachingStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "Yes" ||
                                this.state
                                  .ind14UsedStandardLanguageAllowPracticeStatus ===
                                  "N/A") &&
                              (this.state.ind21UsedRtRReadingMaterialStatus ===
                                "Yes" ||
                                this.state.ind21UsedRtRReadingMaterialStatus ===
                                  "No" ||
                                this.state.ind21UsedRtRReadingMaterialStatus ===
                                  "N/A" ||
                                this.state.ind21UsedRtRReadingMaterialStatus ===
                                  "Partial" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "Yes" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "No" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "N/A" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "Partial" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "Yes" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "No" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "N/A" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "No" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "No" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "Partial" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "Yes" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "No" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "N/A" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "Partial" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "Yes" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "No" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "N/A" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "No" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 1",
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
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
                        {!!this.state.errorInd13 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd13}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 350,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind13FollowedIWeUDoNote: text,
                            })
                          }
                          value={this.state.ind13FollowedIWeUDoNote + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>

                <Card
                  style={{
                    padding: 5,
                    margin: 5,
                    flex: 1,
                    alignSelf: "center",
                  }}
                >
                  <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ১ঘ শিক্ষক পাঠের প্রয়োজনে কথ্য ও প্রমিত ভাষার ব্যবহার
                      করেছেন এবং শিক্ষার্থীদের | কথ্য ও প্রমিত ভাষা চর্চার সুযোগ
                      দিয়েছেন
                    </Text>
                  </Card>
                  <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 150,
                          }}
                          selectedValue={
                            this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind14UsedStandardLanguageAllowPracticeStatus:
                                value,
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
                              (this.state.ind11UsedRtRMaterialStatus ===
                                "Yes" ||
                                this.state.ind11UsedRtRMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12PlanWiseTeachingStatus ===
                                "Yes" ||
                                this.state.ind12PlanWiseTeachingStatus ===
                                  "N/A") &&
                              (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                                this.state.ind13FollowedIWeUDoStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind21UsedRtRReadingMaterialStatus ===
                                "Yes" ||
                                this.state.ind21UsedRtRReadingMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind22FollowedPlanContinuityStatus ===
                                "Yes" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "N/A") &&
                              (this.state.ind23AskedRelatedQuestionStatus ===
                                "Yes" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Yes" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Yes" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "No" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "Partial" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "Yes" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "No" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "N/A" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "Partial" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "Yes" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "No" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "N/A" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "No" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11UsedRtRMaterialStatus ===
                                "Yes" ||
                                this.state.ind11UsedRtRMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12PlanWiseTeachingStatus ===
                                "Yes" ||
                                this.state.ind12PlanWiseTeachingStatus ===
                                  "N/A") &&
                              (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                                this.state.ind13FollowedIWeUDoStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind21UsedRtRReadingMaterialStatus ===
                                "Yes" ||
                                this.state.ind21UsedRtRReadingMaterialStatus ===
                                  "No" ||
                                this.state.ind21UsedRtRReadingMaterialStatus ===
                                  "N/A" ||
                                this.state.ind21UsedRtRReadingMaterialStatus ===
                                  "Partial" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "Yes" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "No" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "N/A" ||
                                this.state.ind22FollowedPlanContinuityStatus ===
                                  "Partial" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "Yes" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "No" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "N/A" ||
                                this.state.ind23AskedRelatedQuestionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "No" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24ShowedPictureAllowedSpeakingStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "No" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31UsedReadingMaterialForAssessmentStatus ===
                                  "Partial" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "Yes" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "No" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "N/A" ||
                                this.state.ind32FollowedTeachingPlanStatus ===
                                  "Partial" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "Yes" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "No" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "N/A" ||
                                this.state.ind33AssessmentOn5StudentStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "No" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34Allowed5StudentStoryTellingStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                teacherStatus: "Priority 1",
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
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
                        {!!this.state.errorInd14 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd14}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 350,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind14UsedStandardLanguageAllowPracticeNote: text,
                            })
                          }
                          value={
                            this.state
                              .ind14UsedStandardLanguageAllowPracticeNote + ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
              <View style={{ padding: 5, flexDirection: "row" }}>
                <Text
                  style={{
                    backgroundColor: "",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  প্রায়োরিটি এরিয়া-২: মৌলিক পাঠদান দক্ষতা
                </Text>
              </View>
              <Card
                style={{
                  padding: 5,
                  margin: 5,
                  flex: 1,
                  alignSelf: "center",
                }}
              >
                <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                  <Text>
                    ২ক রুম টু রিড কর্তৃক প্রদত্ত পাঠ সংশ্লিষ্ট উপকরণ ব্যবহার করে
                    শিক্ষার্থীদের অংশগ্রহণে সু-স্পষ্ট নির্দেশনা দিয়েছেন
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
                      <Text>পর্যবেক্ষণ: </Text>
                      {!!this.state.errorInd11 && (
                        <Text style={{ color: "red", fontSize: 20 }}>
                          {this.state.errorInd11}
                        </Text>
                      )}
                      <Picker
                        style={{
                          height: 50,
                          width: 150,
                        }}
                        selectedValue={
                          this.state.ind21UsedRtRReadingMaterialStatus
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind21UsedRtRReadingMaterialStatus: value,
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
                            (this.state.ind11UsedRtRMaterialStatus === "Yes" ||
                              this.state.ind11UsedRtRMaterialStatus ===
                                "N/A") &&
                            (this.state.ind12PlanWiseTeachingStatus === "Yes" ||
                              this.state.ind12PlanWiseTeachingStatus ===
                                "N/A") &&
                            (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                              this.state.ind13FollowedIWeUDoStatus === "N/A") &&
                            (this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus ===
                              "Yes" ||
                              this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "N/A") &&
                            (value === "Yes" || value === "N/A") &&
                            (this.state.ind22FollowedPlanContinuityStatus ===
                              "Yes" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "N/A") &&
                            (this.state.ind23AskedRelatedQuestionStatus ===
                              "Yes" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "N/A") &&
                            (this.state
                              .ind24ShowedPictureAllowedSpeakingStatus ===
                              "Yes" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "N/A") &&
                            (this.state
                              .ind31UsedReadingMaterialForAssessmentStatus ===
                              "Yes" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "No" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "N/A" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Partial" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Yes" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "No" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "N/A" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Partial" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Yes" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "No" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "N/A" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Partial" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Yes" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "No" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "N/A" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 3",
                            });
                          } else if (
                            (this.state.ind11UsedRtRMaterialStatus === "Yes" ||
                              this.state.ind11UsedRtRMaterialStatus ===
                                "N/A") &&
                            (this.state.ind12PlanWiseTeachingStatus === "Yes" ||
                              this.state.ind12PlanWiseTeachingStatus ===
                                "N/A") &&
                            (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                              this.state.ind13FollowedIWeUDoStatus === "N/A") &&
                            (this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus ===
                              "Yes" ||
                              this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "N/A") &&
                            (value === "Yes" ||
                              value === "No" ||
                              value === "N/A" ||
                              value === "Partial" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "Yes" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "No" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "N/A" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "Partial" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "Yes" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "No" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "N/A" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "Partial" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Yes" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "No" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "N/A" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Partial" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Yes" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "No" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "N/A" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Partial" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Yes" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "No" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "N/A" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Partial" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Yes" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "No" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "N/A" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Partial" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Yes" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "No" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "N/A" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 2",
                            });
                          } else {
                            this.setState({
                              teacherStatus: "Priority 1",
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
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text>মন্তব্য: </Text>
                      {!!this.state.errorInd21 && (
                        <Text style={{ color: "red", fontSize: 20 }}>
                          {this.state.errorInd21}
                        </Text>
                      )}
                      <TextInput
                        style={{
                          height: 100,
                          width: 350,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="default"
                        placeholder=""
                        editable={true}
                        onChangeText={(text) =>
                          this.setState({
                            ind21UsedRtRReadingMaterialNote: text,
                          })
                        }
                        value={this.state.ind21UsedRtRReadingMaterialNote + ""}
                      ></TextInput>
                    </View>
                  </View>
                </Card>
              </Card>

              <Card
                style={{
                  padding: 5,
                  margin: 5,
                  flex: 1,
                  alignSelf: "center",
                }}
              >
                <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                  <Text>
                    ২খ শিক্ষক পরিকল্পনা অনুযায়ী দিনভিত্তিক পাঠের ধারাবাহিকতা
                    অনুসরণ করে পাঠ পরিচালনা করেছেন
                  </Text>
                </Card>
                <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, padding: 2 }}>
                      <Text>পর্যবেক্ষণ: </Text>
                      <Picker
                        style={{
                          height: 50,
                          width: 150,
                        }}
                        selectedValue={
                          this.state.ind22FollowedPlanContinuityStatus
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind22FollowedPlanContinuityStatus: value,
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
                            (this.state.ind11UsedRtRMaterialStatus === "Yes" ||
                              this.state.ind11UsedRtRMaterialStatus ===
                                "N/A") &&
                            (this.state.ind12PlanWiseTeachingStatus === "Yes" ||
                              this.state.ind12PlanWiseTeachingStatus ===
                                "N/A") &&
                            (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                              this.state.ind13FollowedIWeUDoStatus === "N/A") &&
                            (this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus ===
                              "Yes" ||
                              this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "N/A") &&
                            (this.state.ind21UsedRtRReadingMaterialStatus ===
                              "Yes" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "N/A") &&
                            (value === "Yes" || value === "N/A") &&
                            (this.state.ind23AskedRelatedQuestionStatus ===
                              "Yes" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "N/A") &&
                            (this.state
                              .ind24ShowedPictureAllowedSpeakingStatus ===
                              "Yes" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "N/A") &&
                            (this.state
                              .ind31UsedReadingMaterialForAssessmentStatus ===
                              "Yes" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "No" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "N/A" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Partial" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Yes" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "No" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "N/A" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Partial" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Yes" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "No" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "N/A" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Partial" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Yes" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "No" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "N/A" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 3",
                            });
                          } else if (
                            (this.state.ind11UsedRtRMaterialStatus === "Yes" ||
                              this.state.ind11UsedRtRMaterialStatus ===
                                "N/A") &&
                            (this.state.ind12PlanWiseTeachingStatus === "Yes" ||
                              this.state.ind12PlanWiseTeachingStatus ===
                                "N/A") &&
                            (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                              this.state.ind13FollowedIWeUDoStatus === "N/A") &&
                            (this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus ===
                              "Yes" ||
                              this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "N/A") &&
                            (this.state.ind21UsedRtRReadingMaterialStatus ===
                              "Yes" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "No" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "N/A" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "Partial" ||
                              value === "Yes" ||
                              value === "No" ||
                              value === "N/A" ||
                              value === "Partial" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "Yes" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "No" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "N/A" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "Partial" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Yes" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "No" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "N/A" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Partial" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Yes" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "No" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "N/A" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Partial" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Yes" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "No" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "N/A" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Partial" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Yes" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "No" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "N/A" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Partial" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Yes" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "No" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "N/A" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 2",
                            });
                          } else {
                            this.setState({
                              teacherStatus: "Priority 1",
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
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text>মন্তব্য: </Text>
                      {!!this.state.errorInd22 && (
                        <Text style={{ color: "red", fontSize: 20 }}>
                          {this.state.errorInd22}
                        </Text>
                      )}
                      <TextInput
                        style={{
                          height: 100,
                          width: 350,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="default"
                        placeholder=""
                        editable={true}
                        onChangeText={(text) =>
                          this.setState({
                            ind22FollowedPlanContinuityNote: text,
                          })
                        }
                        value={this.state.ind22FollowedPlanContinuityNote + ""}
                      ></TextInput>
                    </View>
                  </View>
                </Card>
              </Card>

              <Card
                style={{
                  padding: 5,
                  margin: 5,
                  flex: 1,
                  alignSelf: "center",
                }}
              >
                <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                  <Text>
                    ২গ শিক্ষক শিক্ষার্থীদের সক্রিয় অংশগ্রহণে পাঠ সম্পর্কিত
                    প্রশ্ন করেছেন
                  </Text>
                </Card>
                <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, padding: 2 }}>
                      <Text>পর্যবেক্ষণ: </Text>
                      <Picker
                        style={{
                          height: 50,
                          width: 150,
                        }}
                        selectedValue={
                          this.state.ind23AskedRelatedQuestionStatus
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind23AskedRelatedQuestionStatus: value,
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
                            (this.state.ind11UsedRtRMaterialStatus === "Yes" ||
                              this.state.ind11UsedRtRMaterialStatus ===
                                "N/A") &&
                            (this.state.ind12PlanWiseTeachingStatus === "Yes" ||
                              this.state.ind12PlanWiseTeachingStatus ===
                                "N/A") &&
                            (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                              this.state.ind13FollowedIWeUDoStatus === "N/A") &&
                            (this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus ===
                              "Yes" ||
                              this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "N/A") &&
                            (this.state.ind21UsedRtRReadingMaterialStatus ===
                              "Yes" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "N/A") &&
                            (this.state.ind22FollowedPlanContinuityStatus ===
                              "Yes" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "N/A") &&
                            (value === "Yes" || value === "N/A") &&
                            (this.state
                              .ind24ShowedPictureAllowedSpeakingStatus ===
                              "Yes" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "N/A") &&
                            (this.state
                              .ind31UsedReadingMaterialForAssessmentStatus ===
                              "Yes" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "No" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "N/A" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Partial" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Yes" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "No" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "N/A" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Partial" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Yes" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "No" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "N/A" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Partial" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Yes" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "No" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "N/A" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 3",
                            });
                          } else if (
                            (this.state.ind11UsedRtRMaterialStatus === "Yes" ||
                              this.state.ind11UsedRtRMaterialStatus ===
                                "N/A") &&
                            (this.state.ind12PlanWiseTeachingStatus === "Yes" ||
                              this.state.ind12PlanWiseTeachingStatus ===
                                "N/A") &&
                            (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                              this.state.ind13FollowedIWeUDoStatus === "N/A") &&
                            (this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus ===
                              "Yes" ||
                              this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "N/A") &&
                            (this.state.ind21UsedRtRReadingMaterialStatus ===
                              "Yes" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "No" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "N/A" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "Partial" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "Yes" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "No" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "N/A" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "Partial" ||
                              value === "Yes" ||
                              value === "No" ||
                              value === "N/A" ||
                              value === "Partial" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Yes" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "No" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "N/A" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Partial" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Yes" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "No" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "N/A" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Partial" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Yes" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "No" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "N/A" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Partial" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Yes" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "No" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "N/A" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Partial" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Yes" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "No" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "N/A" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 2",
                            });
                          } else {
                            this.setState({
                              teacherStatus: "Priority 1",
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
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text>মন্তব্য: </Text>
                      {!!this.state.errorInd23 && (
                        <Text style={{ color: "red", fontSize: 20 }}>
                          {this.state.errorInd23}
                        </Text>
                      )}
                      <TextInput
                        style={{
                          height: 100,
                          width: 350,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="default"
                        placeholder=""
                        editable={true}
                        onChangeText={(text) =>
                          this.setState({
                            ind23AskedRelatedQuestionNote: text,
                          })
                        }
                        value={this.state.ind23AskedRelatedQuestionNote + ""}
                      ></TextInput>
                    </View>
                  </View>
                </Card>
              </Card>

              <Card
                style={{
                  padding: 5,
                  margin: 5,
                  flex: 1,
                  alignSelf: "center",
                }}
              >
                <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                  <Text>
                    ২ঘ শিক্ষক পাঠ সংশ্লিষ্ট ছবির বিষয়বস্তু নিয়ে প্রশ্ন করেছেন
                    এবং শিক্ষার্থীদের বলার সুযোগ দিয়েছেন
                  </Text>
                </Card>
                <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, padding: 2 }}>
                      <Text>পর্যবেক্ষণ: </Text>
                      <Picker
                        style={{
                          height: 50,
                          width: 150,
                        }}
                        selectedValue={
                          this.state.ind24ShowedPictureAllowedSpeakingStatus
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind24ShowedPictureAllowedSpeakingStatus: value,
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
                            (this.state.ind11UsedRtRMaterialStatus === "Yes" ||
                              this.state.ind11UsedRtRMaterialStatus ===
                                "N/A") &&
                            (this.state.ind12PlanWiseTeachingStatus === "Yes" ||
                              this.state.ind12PlanWiseTeachingStatus ===
                                "N/A") &&
                            (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                              this.state.ind13FollowedIWeUDoStatus === "N/A") &&
                            (this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus ===
                              "Yes" ||
                              this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "N/A") &&
                            (this.state.ind21UsedRtRReadingMaterialStatus ===
                              "Yes" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "N/A") &&
                            (this.state.ind22FollowedPlanContinuityStatus ===
                              "Yes" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "N/A") &&
                            (this.state.ind23AskedRelatedQuestionStatus ===
                              "Yes" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "N/A") &&
                            (value === "Yes" || value === "N/A") &&
                            (this.state
                              .ind31UsedReadingMaterialForAssessmentStatus ===
                              "Yes" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "No" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "N/A" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Partial" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Yes" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "No" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "N/A" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Partial" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Yes" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "No" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "N/A" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Partial" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Yes" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "No" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "N/A" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 3",
                            });
                          } else if (
                            (this.state.ind11UsedRtRMaterialStatus === "Yes" ||
                              this.state.ind11UsedRtRMaterialStatus ===
                                "N/A") &&
                            (this.state.ind12PlanWiseTeachingStatus === "Yes" ||
                              this.state.ind12PlanWiseTeachingStatus ===
                                "N/A") &&
                            (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                              this.state.ind13FollowedIWeUDoStatus === "N/A") &&
                            (this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus ===
                              "Yes" ||
                              this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "N/A") &&
                            (this.state.ind21UsedRtRReadingMaterialStatus ===
                              "Yes" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "No" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "N/A" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "Partial" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "Yes" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "No" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "N/A" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "Partial" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "Yes" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "No" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "N/A" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "Partial" ||
                              value === "Yes" ||
                              value === "No" ||
                              value === "N/A" ||
                              value === "Partial" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Yes" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "No" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "N/A" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Partial" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Yes" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "No" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "N/A" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Partial" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Yes" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "No" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "N/A" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Partial" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Yes" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "No" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "N/A" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 2",
                            });
                          } else {
                            this.setState({
                              teacherStatus: "Priority 1",
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
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text>মন্তব্য: </Text>
                      {!!this.state.errorInd24 && (
                        <Text style={{ color: "red", fontSize: 20 }}>
                          {this.state.errorInd24}
                        </Text>
                      )}
                      <TextInput
                        style={{
                          height: 100,
                          width: 350,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="default"
                        placeholder=""
                        editable={true}
                        onChangeText={(text) =>
                          this.setState({
                            ind24ShowedPictureAllowedSpeakingNote: text,
                          })
                        }
                        value={
                          this.state.ind24ShowedPictureAllowedSpeakingNote + ""
                        }
                      ></TextInput>
                    </View>
                  </View>
                </Card>
              </Card>
              <View style={{ padding: 5, flexDirection: "row" }}>
                <Text
                  style={{
                    backgroundColor: "",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  প্রায়োরিটি এরিয়া -৩: উচ্চতর দক্ষতা অর্জন
                </Text>
              </View>
              <Card
                style={{
                  padding: 5,
                  margin: 5,
                  flex: 1,
                  alignSelf: "center",
                }}
              >
                <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                  <Text>
                    ৩ক রুম টু রিড কর্তৃক প্রদত্ত পাঠ সংশ্লিষ্ট উপকরণ ব্যবহার করে
                    শিখন যাচাই করেছেন
                  </Text>
                </Card>
                <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, padding: 2 }}>
                      <Text>পর্যবেক্ষণ: </Text>
                      <Picker
                        style={{
                          height: 50,
                          width: 150,
                        }}
                        selectedValue={
                          this.state.ind31UsedReadingMaterialForAssessmentStatus
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind31UsedReadingMaterialForAssessmentStatus: value,
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
                            (this.state.ind11UsedRtRMaterialStatus === "Yes" ||
                              this.state.ind11UsedRtRMaterialStatus ===
                                "N/A") &&
                            (this.state.ind12PlanWiseTeachingStatus === "Yes" ||
                              this.state.ind12PlanWiseTeachingStatus ===
                                "N/A") &&
                            (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                              this.state.ind13FollowedIWeUDoStatus === "N/A") &&
                            (this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus ===
                              "Yes" ||
                              this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "N/A") &&
                            (this.state.ind21UsedRtRReadingMaterialStatus ===
                              "Yes" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "N/A") &&
                            (this.state.ind22FollowedPlanContinuityStatus ===
                              "Yes" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "N/A") &&
                            (this.state.ind23AskedRelatedQuestionStatus ===
                              "Yes" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "N/A") &&
                            (value === "Yes" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "N/A") &&
                            (value === "Yes" ||
                              value === "No" ||
                              value === "N/A" ||
                              value === "Partial" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Yes" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "No" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "N/A" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Partial" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Yes" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "No" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "N/A" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Partial" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Yes" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "No" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "N/A" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 3",
                            });
                          } else if (
                            (this.state.ind11UsedRtRMaterialStatus === "Yes" ||
                              this.state.ind11UsedRtRMaterialStatus ===
                                "N/A") &&
                            (this.state.ind12PlanWiseTeachingStatus === "Yes" ||
                              this.state.ind12PlanWiseTeachingStatus ===
                                "N/A") &&
                            (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                              this.state.ind13FollowedIWeUDoStatus === "N/A") &&
                            (this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus ===
                              "Yes" ||
                              this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "N/A") &&
                            (this.state.ind21UsedRtRReadingMaterialStatus ===
                              "Yes" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "No" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "N/A" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "Partial" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "Yes" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "No" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "N/A" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "Partial" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "Yes" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "No" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "N/A" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "Partial" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Yes" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "No" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "N/A" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Partial" ||
                              value === "Yes" ||
                              value === "No" ||
                              value === "N/A" ||
                              value === "Partial" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Yes" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "No" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "N/A" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Partial" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Yes" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "No" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "N/A" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Partial" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Yes" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "No" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "N/A" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 2",
                            });
                          } else {
                            this.setState({
                              teacherStatus: "Priority 1",
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
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text>মন্তব্য: </Text>
                      {!!this.state.errorInd31 && (
                        <Text style={{ color: "red", fontSize: 20 }}>
                          {this.state.errorInd31}
                        </Text>
                      )}
                      <TextInput
                        style={{
                          height: 100,
                          width: 350,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="default"
                        placeholder=""
                        editable={true}
                        onChangeText={(text) =>
                          this.setState({
                            ind31UsedReadingMaterialForAssessmentNote: text,
                          })
                        }
                        value={
                          this.state.ind31UsedReadingMaterialForAssessmentNote +
                          ""
                        }
                      ></TextInput>
                    </View>
                  </View>
                </Card>
              </Card>

              <Card
                style={{
                  padding: 5,
                  margin: 5,
                  flex: 1,
                  alignSelf: "center",
                }}
              >
                <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                  <Text>
                    ৩খ শিক্ষক পরিকল্পনা অনুযায়ী কাজের সঠিক ধাপ অনুসরণ করে পাঠ
                    পরিচালনা করেছেন
                  </Text>
                </Card>
                <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, padding: 2 }}>
                      <Text>পর্যবেক্ষণ: </Text>
                      <Picker
                        style={{
                          height: 50,
                          width: 150,
                        }}
                        selectedValue={
                          this.state.ind32FollowedTeachingPlanStatus
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind32FollowedTeachingPlanStatus: value,
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
                            (this.state.ind11UsedRtRMaterialStatus === "Yes" ||
                              this.state.ind11UsedRtRMaterialStatus ===
                                "N/A") &&
                            (this.state.ind12PlanWiseTeachingStatus === "Yes" ||
                              this.state.ind12PlanWiseTeachingStatus ===
                                "N/A") &&
                            (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                              this.state.ind13FollowedIWeUDoStatus === "N/A") &&
                            (this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus ===
                              "Yes" ||
                              this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "N/A") &&
                            (this.state.ind21UsedRtRReadingMaterialStatus ===
                              "Yes" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "N/A") &&
                            (this.state.ind22FollowedPlanContinuityStatus ===
                              "Yes" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "N/A") &&
                            (this.state.ind23AskedRelatedQuestionStatus ===
                              "Yes" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "N/A") &&
                            (this.state
                              .ind24ShowedPictureAllowedSpeakingStatus ===
                              "Yes" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "N/A") &&
                            (this.state
                              .ind31UsedReadingMaterialForAssessmentStatus ===
                              "Yes" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "No" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "N/A" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Partial" ||
                              value === "Yes" ||
                              value === "No" ||
                              value === "N/A" ||
                              value === "Partial" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Yes" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "No" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "N/A" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Partial" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Yes" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "No" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "N/A" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 3",
                            });
                          } else if (
                            (this.state.ind11UsedRtRMaterialStatus === "Yes" ||
                              this.state.ind11UsedRtRMaterialStatus ===
                                "N/A") &&
                            (this.state.ind12PlanWiseTeachingStatus === "Yes" ||
                              this.state.ind12PlanWiseTeachingStatus ===
                                "N/A") &&
                            (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                              this.state.ind13FollowedIWeUDoStatus === "N/A") &&
                            (this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus ===
                              "Yes" ||
                              this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "N/A") &&
                            (this.state.ind21UsedRtRReadingMaterialStatus ===
                              "Yes" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "No" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "N/A" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "Partial" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "Yes" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "No" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "N/A" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "Partial" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "Yes" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "No" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "N/A" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "Partial" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Yes" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "No" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "N/A" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Partial" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Yes" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "No" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "N/A" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Partial" ||
                              value === "Yes" ||
                              value === "No" ||
                              value === "N/A" ||
                              value === "Partial" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Yes" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "No" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "N/A" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Partial" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Yes" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "No" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "N/A" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 2",
                            });
                          } else {
                            this.setState({
                              teacherStatus: "Priority 1",
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
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text>মন্তব্য: </Text>
                      {!!this.state.errorInd32 && (
                        <Text style={{ color: "red", fontSize: 20 }}>
                          {this.state.errorInd32}
                        </Text>
                      )}
                      <TextInput
                        style={{
                          height: 100,
                          width: 350,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="default"
                        placeholder=""
                        editable={true}
                        onChangeText={(text) =>
                          this.setState({
                            ind32FollowedTeachingPlanNote: text,
                          })
                        }
                        value={this.state.ind32FollowedTeachingPlanNote + ""}
                      ></TextInput>
                    </View>
                  </View>
                </Card>
              </Card>

              <Card
                style={{
                  padding: 5,
                  margin: 5,
                  flex: 1,
                  alignSelf: "center",
                }}
              >
                <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                  <Text>
                    ৩গ শিক্ষক ছোট ছোট প্রশ্নের মাধ্যমে অন্তত ৫ জন শিক্ষার্থীর
                    বোধগম্যতা যাচাই করেছেন
                  </Text>
                </Card>
                <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, padding: 2 }}>
                      <Text>পর্যবেক্ষণ: </Text>
                      <Picker
                        style={{
                          height: 50,
                          width: 150,
                        }}
                        selectedValue={
                          this.state.ind33AssessmentOn5StudentStatus
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind33AssessmentOn5StudentStatus: value,
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
                            (this.state.ind11UsedRtRMaterialStatus === "Yes" ||
                              this.state.ind11UsedRtRMaterialStatus ===
                                "N/A") &&
                            (this.state.ind12PlanWiseTeachingStatus === "Yes" ||
                              this.state.ind12PlanWiseTeachingStatus ===
                                "N/A") &&
                            (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                              this.state.ind13FollowedIWeUDoStatus === "N/A") &&
                            (this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus ===
                              "Yes" ||
                              this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "N/A") &&
                            (this.state.ind21UsedRtRReadingMaterialStatus ===
                              "Yes" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "N/A") &&
                            (this.state.ind22FollowedPlanContinuityStatus ===
                              "Yes" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "N/A") &&
                            (this.state.ind23AskedRelatedQuestionStatus ===
                              "Yes" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "N/A") &&
                            (this.state
                              .ind24ShowedPictureAllowedSpeakingStatus ===
                              "Yes" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "N/A") &&
                            (this.state
                              .ind31UsedReadingMaterialForAssessmentStatus ===
                              "Yes" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "No" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "N/A" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Partial" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Yes" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "No" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "N/A" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Partial" ||
                              value === "Yes" ||
                              value === "No" ||
                              value === "N/A" ||
                              value === "Partial" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Yes" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "No" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "N/A" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 3",
                            });
                          } else if (
                            (this.state.ind11UsedRtRMaterialStatus === "Yes" ||
                              this.state.ind11UsedRtRMaterialStatus ===
                                "N/A") &&
                            (this.state.ind12PlanWiseTeachingStatus === "Yes" ||
                              this.state.ind12PlanWiseTeachingStatus ===
                                "N/A") &&
                            (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                              this.state.ind13FollowedIWeUDoStatus === "N/A") &&
                            (this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus ===
                              "Yes" ||
                              this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "N/A") &&
                            (this.state.ind21UsedRtRReadingMaterialStatus ===
                              "Yes" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "No" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "N/A" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "Partial" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "Yes" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "No" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "N/A" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "Partial" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "Yes" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "No" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "N/A" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "Partial" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Yes" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "No" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "N/A" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Partial" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Yes" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "No" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "N/A" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Partial" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Yes" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "No" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "N/A" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Partial" ||
                              value === "Yes" ||
                              value === "No" ||
                              value === "N/A" ||
                              value === "Partial" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Yes" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "No" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "N/A" ||
                              this.state
                                .ind34Allowed5StudentStoryTellingStatus ===
                                "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 2",
                            });
                          } else {
                            this.setState({
                              teacherStatus: "Priority 1",
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
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text>মন্তব্য: </Text>
                      {!!this.state.errorInd33 && (
                        <Text style={{ color: "red", fontSize: 20 }}>
                          {this.state.errorInd33}
                        </Text>
                      )}
                      <TextInput
                        style={{
                          height: 100,
                          width: 350,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="default"
                        placeholder=""
                        editable={true}
                        onChangeText={(text) =>
                          this.setState({
                            ind33AssessmentOn5StudentNote: text,
                          })
                        }
                        value={this.state.ind33AssessmentOn5StudentNote + ""}
                      ></TextInput>
                    </View>
                  </View>
                </Card>
              </Card>

              <Card
                style={{
                  padding: 5,
                  margin: 5,
                  flex: 1,
                  alignSelf: "center",
                }}
              >
                <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                  <Text>
                    ৩ঘ শিক্ষক শিক্ষার্থীদেরকে নিজের মতো করে অন্তত ৫ জন
                    শিক্ষার্থীর গল্প/ শব্দ/বাক্য/ অভিজ্ঞতার গল্প বলার সুযোগ
                    দিয়েছেন
                  </Text>
                </Card>
                <Card style={{ padding: 5, flex: 1, alignSelf: "center" }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, padding: 2 }}>
                      <Text>পর্যবেক্ষণ: </Text>
                      <Picker
                        style={{
                          height: 50,
                          width: 150,
                        }}
                        selectedValue={
                          this.state.ind34Allowed5StudentStoryTellingStatus
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind34Allowed5StudentStoryTellingStatus: value,
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
                            (this.state.ind11UsedRtRMaterialStatus === "Yes" ||
                              this.state.ind11UsedRtRMaterialStatus ===
                                "N/A") &&
                            (this.state.ind12PlanWiseTeachingStatus === "Yes" ||
                              this.state.ind12PlanWiseTeachingStatus ===
                                "N/A") &&
                            (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                              this.state.ind13FollowedIWeUDoStatus === "N/A") &&
                            (this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus ===
                              "Yes" ||
                              this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "N/A") &&
                            (this.state.ind21UsedRtRReadingMaterialStatus ===
                              "Yes" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "N/A") &&
                            (this.state.ind22FollowedPlanContinuityStatus ===
                              "Yes" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "N/A") &&
                            (this.state.ind23AskedRelatedQuestionStatus ===
                              "Yes" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "N/A") &&
                            (this.state
                              .ind24ShowedPictureAllowedSpeakingStatus ===
                              "Yes" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "N/A") &&
                            (this.state
                              .ind31UsedReadingMaterialForAssessmentStatus ===
                              "Yes" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "No" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "N/A" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Partial" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Yes" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "No" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "N/A" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Partial" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Yes" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "No" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "N/A" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Partial" ||
                              value === "Yes" ||
                              value === "No" ||
                              value === "N/A" ||
                              value === "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 3",
                            });
                          } else if (
                            (this.state.ind11UsedRtRMaterialStatus === "Yes" ||
                              this.state.ind11UsedRtRMaterialStatus ===
                                "N/A") &&
                            (this.state.ind12PlanWiseTeachingStatus === "Yes" ||
                              this.state.ind12PlanWiseTeachingStatus ===
                                "N/A") &&
                            (this.state.ind13FollowedIWeUDoStatus === "Yes" ||
                              this.state.ind13FollowedIWeUDoStatus === "N/A") &&
                            (this.state
                              .ind14UsedStandardLanguageAllowPracticeStatus ===
                              "Yes" ||
                              this.state
                                .ind14UsedStandardLanguageAllowPracticeStatus ===
                                "N/A") &&
                            (this.state.ind21UsedRtRReadingMaterialStatus ===
                              "Yes" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "No" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "N/A" ||
                              this.state.ind21UsedRtRReadingMaterialStatus ===
                                "Partial" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "Yes" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "No" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "N/A" ||
                              this.state.ind22FollowedPlanContinuityStatus ===
                                "Partial" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "Yes" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "No" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "N/A" ||
                              this.state.ind23AskedRelatedQuestionStatus ===
                                "Partial" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Yes" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "No" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "N/A" ||
                              this.state
                                .ind24ShowedPictureAllowedSpeakingStatus ===
                                "Partial" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Yes" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "No" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "N/A" ||
                              this.state
                                .ind31UsedReadingMaterialForAssessmentStatus ===
                                "Partial" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Yes" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "No" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "N/A" ||
                              this.state.ind32FollowedTeachingPlanStatus ===
                                "Partial" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Yes" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "No" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "N/A" ||
                              this.state.ind33AssessmentOn5StudentStatus ===
                                "Partial" ||
                              value === "Yes" ||
                              value === "No" ||
                              value === "N/A" ||
                              value === "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 2",
                            });
                          } else {
                            this.setState({
                              teacherStatus: "Priority 1",
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
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text>মন্তব্য: </Text>
                      {!!this.state.errorInd34 && (
                        <Text style={{ color: "red", fontSize: 20 }}>
                          {this.state.errorInd34}
                        </Text>
                      )}
                      <TextInput
                        style={{
                          height: 100,
                          width: 350,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="default"
                        placeholder=""
                        editable={true}
                        onChangeText={(text) =>
                          this.setState({
                            ind34Allowed5StudentStoryTellingNote: text,
                          })
                        }
                        value={
                          this.state.ind34Allowed5StudentStoryTellingNote + ""
                        }
                      ></TextInput>
                    </View>
                  </View>
                </Card>
              </Card>
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
                শ্রেণি শিক্ষকের সাথে আলোচনার জন্য গুরুত্বপূর্ণ কিছু বিষয়:
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
                      শিক্ষক ভালো করেছেন এমন ২/৩টি সূচক (অগ্রাধিকার এরিয়ার
                      নম্বর) উল্লেখ করুন।
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
                      {this.state.bestPracticeIndicator1}
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
                      {this.state.bestPracticeIndicator2}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      অগ্রাধিকারভিত্তিতে শিক্ষককে তার নিজস্ব উন্নয়নের জন্য যে
                      ২/৩টি ইন্ডিকেটর (এরিয়ার নম্বর) চিহ্নিত করেছেন তা উল্লেখ
                      করুন এবং তিনি তার উন্নয়নে কীভাবে এটি করবেন সেটি উল্লেখ
                      করুন। কিভাবে করবেন:
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
                      {this.state.coachingSupportIndicator1}
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
                      {this.state.coachingSupportIndicator2}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1, padding: 2, flexDirection: "row" }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text>কিভাবে করবেন:</Text>
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
                          agreedStatement1: text,
                        })
                      }
                      value={this.state.agreedStatement1 + ""}
                    ></TextInput>
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2, flexDirection: "row" }}>
                    <Text>
                      ১ বা ২ টি ইন্ডিকেটর যেগুলো উন্নয়নের জন্য শ্রেণিশিক্ষক
                      একমত হয়েছেন সেটি/সেগুলো উল্লেখ করুন ।
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
                          agreedStatement2: text,
                        })
                      }
                      value={this.state.agreedStatement2 + ""}
                    ></TextInput>
                  </View>
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
          </View>

          {/* <View style={{ padding: 10 }}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "60%",
                backgroundColor: "#fb5b5a",
                borderRadius: 25,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 40,
                marginLeft: 100,
                marginBottom: 20,
              }}
              submitOnEnter={false}
              onPress={this.showConfirmDialog.bind(this)}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View> */}
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
    fontSize: 15,
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
