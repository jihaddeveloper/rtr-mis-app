//  Author: Mohammad Jihad Hossain
//  Create Date: 15/01/2026
//  Modify Date: 15/01/2026
//  Description: PLibraryReadingActivitiesScreen component

import React from "react";
import axios from "axios";
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
  TouchableOpacity,
  Alert,
  Dimensions,
  BackHandler,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import { Picker } from "@react-native-picker/picker";
import { divisions, districts, upazillas, unions } from "bd-geojs";

import { Checkbox } from "react-native-paper";

import { Card } from "react-native-shadow-cards";

import DateTimePicker from "@react-native-community/datetimepicker";

const { height } = Dimensions.get("window").height / 2;
const { width } = Dimensions.get("window").width / 2;

export default class PLibraryReadingActivitiesScreen extends React.Component {
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
      allLibraryIndicator: [],
      allBanglaIndicator: [],
      allSRMIndicator: [],
      allLibraryObservationData: [],
      allSRMClassData: [],
      //Preloaded Data

      // previous visit data of the SRM class
      preMonthData: [],
      // previous visit data of the SRM class

      // Duplicate data check
      duplicateSRMClassObservationData: [],
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
      pickerPhase: "",

      visitor: "",
      visitorDesignation: "",

      pointTeacher: "",
      rtrSchoolId: "",
      yearOfSupport: "",
      yearOfEstablish: "",

      totalAdmittedStudent: 0,
      totalPresentStudent: 0,

      note: "",
      // General data

      lastFollowupTopic1: "",
      lastFollowupTopic2: "",
      lastFollowupTopic3: "",

      typeOfReadingPartA: "",

      partAInd11TeacherHelpedStudentToSeatStatus: "",
      partAInd11TeacherHelpedStudentToSeatNote: "",

      partAInd12TeacherShowedABookDetailStatus: "",
      partAInd12TeacherShowedABookDetailNote: "",

      partAInd13TeacherTeachesWordWithMeaningStatus: "",
      partAInd13TeacherTeachesWordWithMeaningNote: "",

      partAInd21TeacherInspireToParticipateStatus: "",
      partAInd21TeacherInspireToParticipateNote: "",

      partAInd22TeacherShowedPictureTextStatus: "",
      partAInd22TeacherShowedPictureTextNote: "",

      partAInd23TeacherTeachesByActionStatus: "",
      partAInd23TeacherTeachesByActionNote: "",

      partAInd24TeacherAskedNextStepStatus: "",
      partAInd24TeacherAskedNextStepNote: "",

      partAInd25TeacherSelectedBookAsLevelStatus: "",
      partAInd25TeacherSelectedBookAsLevelNote: "",

      partAInd26TeacherAskedToParticipateInReadingStatus: "",
      partAInd26TeacherAskedToParticipateInReadingNote: "",

      partAInd31TeacherAllowToBCOStatus: "",
      partAInd31TeacherAllowToBCONote: "",

      partAInd32TeacherAskedQuestionForAssessmentStatus: "",
      partAInd32TeacherAskedQuestionForAssessmentNote: "",

      partAInd33TeacherParticipateStudentToSRMStatus: "",
      partAInd33TeacherParticipateStudentToSRMNote: "",

      partAInd34TeacherCongratulatedStudentStatus: "",
      partAInd34TeacherCongratulatedStudentNote: "",

      // Discussion topic
      bestPracticeIndicator1PartA: "",
      bestPracticeIndicator2PartA: "",

      coachingSupportIndicator1PartA: "",
      coachingSupportIndicator2PartA: "",

      agreedStatementTeacherPartA: "",
      agreedStatementLFPartA: "",
      // Discussion topic

      ///////

      typeOfReadingPartB: "",

      partBInd11TeacherHelpedStudentToSeatStatus: "",
      partBInd11TeacherHelpedStudentToSeatNote: "",

      partBInd12TeacherInstructSRMStatus: "",
      partBInd12TeacherInstructSRMNote: "",

      partBInd13TeacherCheckedBookLevelStatus: "",
      partBInd13TeacherCheckedBookLevelNote: "",

      partBInd21TeacherListenAndAskQuestionStatus: "",
      partBInd21TeacherListenAndAskQuestionNote: "",

      partBInd22TeacherCheckedStudentParticipationStatus: "",
      partBInd22TeacherCheckedStudentParticipationNote: "",

      partBInd31TeacherHelpedStudentToShareStatus: "",
      partBInd31TeacherHelpedStudentToShareNote: "",

      partBInd32TeacherInspiredStudentEffortStatus: "",
      partBInd32TeacherInspiredStudentEffortNote: "",

      partBInd33TeacherInspiredStudentForSRMStatus: "",
      partBInd33TeacherInspiredStudentForSRMNote: "",

      partBInd34TeacherAlloedStudentToBCOStatus: "",
      partBInd34TeacherAlloedStudentToBCONote: "",

      // Discussion topic
      bestPracticeIndicator1PartB: "",
      bestPracticeIndicator2PartB: "",

      coachingSupportIndicator1PartB: "",
      coachingSupportIndicator2PartB: "",

      agreedStatementTeacherPartB: "",
      agreedStatementLFPartB: "",
      // Discussion topic

      teacherStatus: "",

      dateError: "",
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
    this.getAllSRMIndicator();
    this.getAllSRMClassObservation();
    this.getAllTeacher();

    // Alert in back-button press of device
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress,
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
      { cancelable: false }, // Prevent dismissing the alert by tapping outside
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

  // Update state
  updateToInitialState = () => {
    this.setState({
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
      pickerPhase: "",

      visitor: "",
      visitorDesignation: "",

      pointTeacher: "",
      rtrSchoolId: "",
      yearOfSupport: "",
      yearOfEstablish: "",

      totalAdmittedStudent: 0,
      totalPresentStudent: 0,

      note: "",
      // General data

      lastFollowupTopic1: "",
      lastFollowupTopic2: "",
      lastFollowupTopic3: "",

      typeOfReadingPartA: "",

      partAInd11TeacherHelpedStudentToSeatStatus: "",
      partAInd11TeacherHelpedStudentToSeatNote: "",

      partAInd12TeacherShowedABookDetailStatus: "",
      partAInd12TeacherShowedABookDetailNote: "",

      partAInd13TeacherTeachesWordWithMeaningStatus: "",
      partAInd13TeacherTeachesWordWithMeaningNote: "",

      partAInd21TeacherInspireToParticipateStatus: "",
      partAInd21TeacherInspireToParticipateNote: "",

      partAInd22TeacherShowedPictureTextStatus: "",
      partAInd22TeacherShowedPictureTextNote: "",

      partAInd23TeacherTeachesByActionStatus: "",
      partAInd23TeacherTeachesByActionNote: "",

      partAInd24TeacherAskedNextStepStatus: "",
      partAInd24TeacherAskedNextStepNote: "",

      partAInd25TeacherSelectedBookAsLevelStatus: "",
      partAInd25TeacherSelectedBookAsLevelNote: "",

      partAInd26TeacherAskedToParticipateInReadingStatus: "",
      partAInd26TeacherAskedToParticipateInReadingNote: "",

      partAInd31TeacherAllowToBCOStatus: "",
      partAInd31TeacherAllowToBCONote: "",

      partAInd32TeacherAskedQuestionForAssessmentStatus: "",
      partAInd32TeacherAskedQuestionForAssessmentNote: "",

      partAInd33TeacherParticipateStudentToSRMStatus: "",
      partAInd33TeacherParticipateStudentToSRMNote: "",

      partAInd34TeacherCongratulatedStudentStatus: "",
      partAInd34TeacherCongratulatedStudentNote: "",

      // Discussion topic
      bestPracticeIndicator1PartA: "",
      bestPracticeIndicator2PartA: "",

      coachingSupportIndicator1PartA: "",
      coachingSupportIndicator2PartA: "",

      agreedStatementTeacherPartA: "",
      agreedStatementLFPartA: "",
      // Discussion topic

      ///////

      typeOfReadingPartB: "",

      partBInd11TeacherHelpedStudentToSeatStatus: "",
      partBInd11TeacherHelpedStudentToSeatNote: "",

      partBInd12TeacherInstructSRMStatus: "",
      partBInd12TeacherInstructSRMNote: "",

      partBInd13TeacherCheckedBookLevelStatus: "",
      partBInd13TeacherCheckedBookLevelNote: "",

      partBInd21TeacherListenAndAskQuestionStatus: "",
      partBInd21TeacherListenAndAskQuestionNote: "",

      partBInd22TeacherCheckedStudentParticipationStatus: "",
      partBInd22TeacherCheckedStudentParticipationNote: "",

      partBInd31TeacherHelpedStudentToShareStatus: "",
      partBInd31TeacherHelpedStudentToShareNote: "",

      partBInd32TeacherInspiredStudentEffortStatus: "",
      partBInd32TeacherInspiredStudentEffortNote: "",

      partBInd33TeacherInspiredStudentForSRMStatus: "",
      partBInd33TeacherInspiredStudentForSRMNote: "",

      partBInd34TeacherAlloedStudentToBCOStatus: "",
      partBInd34TeacherAlloedStudentToBCONote: "",

      // Discussion topic
      bestPracticeIndicator1PartB: "",
      bestPracticeIndicator2PartB: "",

      coachingSupportIndicator1PartB: "",
      coachingSupportIndicator2PartB: "",

      agreedStatementTeacherPartB: "",
      agreedStatementLFPartB: "",
      // Discussion topic

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
        },
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
        },
      );

      this.setState({ allDesignation: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };
  // Get All Designation

  // Get All SRM Indicator
  getAllSRMIndicator = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/srm-indicator",
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      this.setState({ allSRMIndicator: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };
  // Get All SRM Indicator

  // Get All SRM Data for school
  getAllSRMClassObservation = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/srm-class",
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
        allSRMClassData: response.data,
        isLoading: false,
      });
      console.log("All SRM Data: ", this.state.allSRMClassData.length);
    } catch (error) {
      console.log(error);
    }
  };
  // Get All SRM Data for school

  // Register new book-checkout data
  saveSRMClassObservation = async () => {
    const newSRMClass = {
      date: this.state.selectedDate,
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
      rtrSchoolId: this.state.rtrSchoolId,
      yearOfSupport: this.state.yearOfSupport,
      yearOfEstablish: this.state.yearOfEstablish,
      phase: this.state.pickerPhase,
      visitor: this.state.visitor,
      visitorDesignation: this.state.visitorDesignation,

      pointTeacher: this.state.pointTeacher,

      totalAdmittedStudent: this.state.totalAdmittedStudent,
      totalPresentStudent: this.state.totalPresentStudent,

      note: this.state.note,

      lastFollowupTopic1: this.state.lastFollowupTopic1,
      lastFollowupTopic2: this.state.lastFollowupTopic2,
      lastFollowupTopic3: this.state.lastFollowupTopic3,

      typeOfReadingPartA: this.state.typeOfReadingPartA,

      partAInd11TeacherHelpedStudentToSeatStatus:
        this.state.partAInd11TeacherHelpedStudentToSeatStatus,
      partAInd11TeacherHelpedStudentToSeatNote:
        this.state.partAInd11TeacherHelpedStudentToSeatNote,

      partAInd12TeacherShowedABookDetailStatus:
        this.state.partAInd12TeacherShowedABookDetailStatus,
      partAInd12TeacherShowedABookDetailNote:
        this.state.partAInd12TeacherShowedABookDetailNote,

      partAInd13TeacherTeachesWordWithMeaningStatus:
        this.state.partAInd13TeacherTeachesWordWithMeaningStatus,
      partAInd13TeacherTeachesWordWithMeaningNote:
        this.state.partAInd13TeacherTeachesWordWithMeaningNote,

      partAInd21TeacherInspireToParticipateStatus:
        this.state.partAInd21TeacherInspireToParticipateStatus,
      partAInd21TeacherInspireToParticipateNote:
        this.state.partAInd21TeacherInspireToParticipateNote,

      partAInd22TeacherShowedPictureTextStatus:
        this.state.partAInd22TeacherShowedPictureTextStatus,
      partAInd22TeacherShowedPictureTextNote:
        this.state.partAInd22TeacherShowedPictureTextNote,

      partAInd23TeacherTeachesByActionStatus:
        this.state.partAInd23TeacherTeachesByActionStatus,
      partAInd23TeacherTeachesByActionNote:
        this.state.partAInd23TeacherTeachesByActionNote,

      partAInd24TeacherAskedNextStepStatus:
        this.state.partAInd24TeacherAskedNextStepStatus,
      partAInd24TeacherAskedNextStepNote:
        this.state.partAInd24TeacherAskedNextStepNote,

      partAInd25TeacherSelectedBookAsLevelStatus:
        this.state.partAInd25TeacherSelectedBookAsLevelStatus,
      partAInd25TeacherSelectedBookAsLevelNote:
        this.state.partAInd25TeacherSelectedBookAsLevelNote,

      partAInd26TeacherAskedToParticipateInReadingStatus:
        this.state.partAInd26TeacherAskedToParticipateInReadingStatus,
      partAInd26TeacherAskedToParticipateInReadingNote:
        this.state.partAInd26TeacherAskedToParticipateInReadingNote,

      partAInd31TeacherAllowToBCOStatus:
        this.state.partAInd31TeacherAllowToBCOStatus,
      partAInd31TeacherAllowToBCONote:
        this.state.partAInd31TeacherAllowToBCONote,

      partAInd32TeacherAskedQuestionForAssessmentStatus:
        this.state.partAInd32TeacherAskedQuestionForAssessmentStatus,
      partAInd32TeacherAskedQuestionForAssessmentNote:
        this.state.partAInd32TeacherAskedQuestionForAssessmentNote,

      partAInd33TeacherParticipateStudentToSRMStatus:
        this.state.partAInd33TeacherParticipateStudentToSRMStatus,
      partAInd33TeacherParticipateStudentToSRMNote:
        this.state.partAInd33TeacherParticipateStudentToSRMNote,

      partAInd34TeacherCongratulatedStudentStatus:
        this.state.partAInd34TeacherCongratulatedStudentStatus,
      partAInd34TeacherCongratulatedStudentNote:
        this.state.partAInd34TeacherCongratulatedStudentNote,

      bestPracticeIndicator1PartA: this.state.bestPracticeIndicator1PartA,
      bestPracticeIndicator2PartA: this.state.bestPracticeIndicator2PartA,

      coachingSupportIndicator1PartA: this.state.coachingSupportIndicator1PartA,
      coachingSupportIndicator2PartA: this.state.coachingSupportIndicator2PartA,

      agreedStatementTeacherPartA: this.state.agreedStatementTeacherPartA,
      agreedStatementLFPartA: this.state.agreedStatementLFPartA,

      typeOfReadingPartB: this.state.typeOfReadingPartB,

      partBInd11TeacherHelpedStudentToSeatStatus:
        this.state.partBInd11TeacherHelpedStudentToSeatStatus,
      partBInd11TeacherHelpedStudentToSeatNote:
        this.state.partBInd11TeacherHelpedStudentToSeatNote,

      partBInd12TeacherInstructSRMStatus:
        this.state.partBInd12TeacherInstructSRMStatus,
      partBInd12TeacherInstructSRMNote:
        this.state.partBInd12TeacherInstructSRMNote,

      partBInd13TeacherCheckedBookLevelStatus:
        this.state.partBInd13TeacherCheckedBookLevelStatus,
      partBInd13TeacherCheckedBookLevelNote:
        this.state.partBInd13TeacherCheckedBookLevelNote,

      partBInd21TeacherListenAndAskQuestionStatus:
        this.state.partBInd21TeacherListenAndAskQuestionStatus,
      partBInd21TeacherListenAndAskQuestionNote:
        this.state.partBInd21TeacherListenAndAskQuestionNote,

      partBInd22TeacherCheckedStudentParticipationStatus:
        this.state.partBInd22TeacherCheckedStudentParticipationStatus,
      partBInd22TeacherCheckedStudentParticipationNote:
        this.state.partBInd22TeacherCheckedStudentParticipationNote,

      partBInd31TeacherHelpedStudentToShareStatus:
        this.state.partBInd31TeacherHelpedStudentToShareStatus,
      partBInd31TeacherHelpedStudentToShareNote:
        this.state.partBInd31TeacherHelpedStudentToShareNote,

      partBInd32TeacherInspiredStudentEffortStatus:
        this.state.partBInd32TeacherInspiredStudentEffortStatus,
      partBInd32TeacherInspiredStudentEffortNote:
        this.state.partBInd32TeacherInspiredStudentEffortNote,

      partBInd33TeacherInspiredStudentForSRMStatus:
        this.state.partBInd33TeacherInspiredStudentForSRMStatus,
      partBInd33TeacherInspiredStudentForSRMNote:
        this.state.partBInd33TeacherInspiredStudentForSRMNote,

      partBInd34TeacherAllowedStudentToBCOStatus:
        this.state.partBInd34TeacherAlloedStudentToBCOStatus,
      partBInd34TeacherAllowedStudentToBCONote:
        this.state.partBInd34TeacherAlloedStudentToBCONote,

      bestPracticeIndicator1PartB: this.state.bestPracticeIndicator1PartB,
      bestPracticeIndicator2PartB: this.state.bestPracticeIndicator2PartB,

      coachingSupportIndicator1PartB: this.state.coachingSupportIndicator1PartB,
      coachingSupportIndicator2PartB: this.state.coachingSupportIndicator2PartB,

      agreedStatementTeacherPartB: this.state.agreedStatementTeacherPartB,
      agreedStatementLFPartB: this.state.agreedStatementLFPartB,

      teacherStatus: this.state.teacherStatus,
    };

    //Check duplicate data
    this.state.duplicateSRMClassObservationData =
      this.state.allSRMClassData.filter((item) => {
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
      "Duplicate SRM Class Data: ",
      this.state.duplicateSRMClassObservationData.length,
    );
    //Check duplicate data

    // Validation
    if (this.state.selectedDate === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Date can not be empty");
      return;
    } else if (this.state.pickerMonth === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Month can not be empty");
      return;
    } else if (this.state.pickerYear === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Year can not be empty");
      return;
    } else if (this.state.pickerDistrict === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "District can not be empty");
      return;
    } else if (this.state.pickerUpazilla === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Upazilla can not be empty");
      return;
    } else if (this.state.pickerOffice === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Office can not be empty");
      return;
    } else if (this.state.pickerProject === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Project can not be empty");
      return;
    } else if (this.state.pickerLF === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "LF can not be empty");
      return;
    } else if (this.state.pickerLPO === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "LPO can not be empty");
      return;
    } else if (this.state.pickerSchool === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "School can not be empty");
      return;
    } else if (this.state.pointTeacher === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Point Teacher can not be empty");
      return;
    } else if (this.state.grade === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Grade can not be empty");
      return;
    } else if (this.state.section === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Section can not be empty");
      return;
    } else if (this.state.duplicateSRMClassObservationData.length > 0) {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Duplicate SRM Class data !!");
      return;
    } else {
      this.setState({ dateError: "" });
      // Send data to API

      try {
        let response = await fetch(
          "http://118.179.80.51:8080/api/v1/p-srm-class",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newSRMClass),
          },
        );

        //console.log("response:" + JSON.stringify(newSRMClass));

        if (response.status >= 200 && response.status < 300) {
          Alert.alert(
            "SRM class obsvervatio data saved successfully to online!!!",
          );
          this.getAllSRMClassObservation();
          this.updateToInitialState();
        } else {
          Alert.alert("Alert", "Error there !!!");
        }
      } catch (errors) {
        alert(errors);
      }
      // Send data to API
    }
  };
  // Register new bangla class data

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
        onPress: this.saveSRMClassObservation,
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
      date: this.state.selectedDate,
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
      rtrSchoolId: this.state.rtrSchoolId,
      yearOfSupport: this.state.yearOfSupport,
      yearOfEstablish: this.state.yearOfEstablish,
      phase: this.state.pickerPhase,
      visitor: this.state.pickerVisitor,
      visitorDesignation: this.state.pickerDesignation,

      pointTeacher: this.state.pointTeacher,

      totalAdmittedStudent: this.state.totalAdmittedStudent,
      totalPresentStudent: this.state.totalPresentStudent,

      note: this.state.note,

      lastFollowupTopic1: this.state.lastFollowupTopic1,
      lastFollowupTopic2: this.state.lastFollowupTopic2,
      lastFollowupTopic3: this.state.lastFollowupTopic3,

      typeOfReadingPartA: this.state.typeOfReadingPartA,

      partAInd11TeacherHelpedStudentToSeatStatus:
        this.state.partAInd11TeacherHelpedStudentToSeatStatus,
      partAInd11TeacherHelpedStudentToSeatNote:
        this.state.partAInd11TeacherHelpedStudentToSeatNote,

      partAInd12TeacherShowedABookDetailStatus:
        this.state.partAInd12TeacherShowedABookDetailStatus,
      partAInd12TeacherShowedABookDetailNote:
        this.state.partAInd12TeacherShowedABookDetailNote,

      partAInd13TeacherTeachesWordWithMeaningStatus:
        this.state.partAInd13TeacherTeachesWordWithMeaningStatus,
      partAInd13TeacherTeachesWordWithMeaningNote:
        this.state.partAInd13TeacherTeachesWordWithMeaningNote,

      partAInd21TeacherInspireToParticipateStatus:
        this.state.partAInd21TeacherInspireToParticipateStatus,
      partAInd21TeacherInspireToParticipateNote:
        this.state.partAInd21TeacherInspireToParticipateNote,

      partAInd22TeacherShowedPictureTextStatus:
        this.state.partAInd22TeacherShowedPictureTextStatus,
      partAInd22TeacherShowedPictureTextNote:
        this.state.partAInd22TeacherShowedPictureTextNote,

      partAInd23TeacherTeachesByActionStatus:
        this.state.partAInd23TeacherTeachesByActionStatus,
      partAInd23TeacherTeachesByActionNote:
        this.state.partAInd23TeacherTeachesByActionNote,

      partAInd24TeacherAskedNextStepStatus:
        this.state.partAInd24TeacherAskedNextStepStatus,
      partAInd24TeacherAskedNextStepNote:
        this.state.partAInd24TeacherAskedNextStepNote,

      partAInd25TeacherSelectedBookAsLevelStatus:
        this.state.partAInd25TeacherSelectedBookAsLevelStatus,
      partAInd25TeacherSelectedBookAsLevelNote:
        this.state.partAInd25TeacherSelectedBookAsLevelNote,

      partAInd26TeacherAskedToParticipateInReadingStatus:
        this.state.partAInd26TeacherAskedToParticipateInReadingStatus,
      partAInd26TeacherAskedToParticipateInReadingNote:
        this.state.partAInd26TeacherAskedToParticipateInReadingNote,

      partAInd31TeacherAllowToBCOStatus:
        this.state.partAInd31TeacherAllowToBCOStatus,
      partAInd31TeacherAllowToBCONote:
        this.state.partAInd31TeacherAllowToBCONote,

      partAInd32TeacherAskedQuestionForAssessmentStatus:
        this.state.partAInd32TeacherAskedQuestionForAssessmentStatus,
      partAInd32TeacherAskedQuestionForAssessmentNote:
        this.state.partAInd32TeacherAskedQuestionForAssessmentNote,

      partAInd33TeacherParticipateStudentToSRMStatus:
        this.state.partAInd33TeacherParticipateStudentToSRMStatus,
      partAInd33TeacherParticipateStudentToSRMNote:
        this.state.partAInd33TeacherParticipateStudentToSRMNote,

      partAInd34TeacherCongratulatedStudentStatus:
        this.state.partAInd34TeacherCongratulatedStudentStatus,
      partAInd34TeacherCongratulatedStudentNote:
        this.state.partAInd34TeacherCongratulatedStudentNote,

      bestPracticeIndicator1PartA: this.state.bestPracticeIndicator1PartA,
      bestPracticeIndicator2PartA: this.state.bestPracticeIndicator2PartA,

      coachingSupportIndicator1PartA: this.state.coachingSupportIndicator1PartA,
      coachingSupportIndicator2PartA: this.state.coachingSupportIndicator2PartA,

      agreedStatementTeacherPartA: this.state.agreedStatementTeacherPartA,
      agreedStatementLFPartA: this.state.agreedStatementLFPartA,

      typeOfReadingPartB: this.state.typeOfReadingPartB,

      partBInd11TeacherHelpedStudentToSeatStatus:
        this.state.partBInd11TeacherHelpedStudentToSeatStatus,
      partBInd11TeacherHelpedStudentToSeatNote:
        this.state.partBInd11TeacherHelpedStudentToSeatNote,

      partBInd12TeacherInstructSRMStatus:
        this.state.partBInd12TeacherInstructSRMStatus,
      partBInd12TeacherInstructSRMNote:
        this.state.partBInd12TeacherInstructSRMNote,

      partBInd13TeacherCheckedBookLevelStatus:
        this.state.partBInd13TeacherCheckedBookLevelStatus,
      partBInd13TeacherCheckedBookLevelNote:
        this.state.partBInd13TeacherCheckedBookLevelNote,

      partBInd21TeacherListenAndAskQuestionStatus:
        this.state.partBInd21TeacherListenAndAskQuestionStatus,
      partBInd21TeacherListenAndAskQuestionNote:
        this.state.partBInd21TeacherListenAndAskQuestionNote,

      partBInd22TeacherCheckedStudentParticipationStatus:
        this.state.partBInd22TeacherCheckedStudentParticipationStatus,
      partBInd22TeacherCheckedStudentParticipationNote:
        this.state.partBInd22TeacherCheckedStudentParticipationNote,

      partBInd31TeacherHelpedStudentToShareStatus:
        this.state.partBInd31TeacherHelpedStudentToShareStatus,
      partBInd31TeacherHelpedStudentToShareNote:
        this.state.partBInd31TeacherHelpedStudentToShareNote,

      partBInd32TeacherInspiredStudentEffortStatus:
        this.state.partBInd32TeacherInspiredStudentEffortStatus,
      partBInd32TeacherInspiredStudentEffortNote:
        this.state.partBInd32TeacherInspiredStudentEffortNote,

      partBInd33TeacherInspiredStudentForSRMStatus:
        this.state.partBInd33TeacherInspiredStudentForSRMStatus,
      partBInd33TeacherInspiredStudentForSRMNote:
        this.state.partBInd33TeacherInspiredStudentForSRMNote,

      partBInd34TeacherAllowedStudentToBCOStatus:
        this.state.partBInd34TeacherAlloedStudentToBCOStatus,
      partBInd34TeacherAllowedStudentToBCONote:
        this.state.partBInd34TeacherAlloedStudentToBCONote,

      bestPracticeIndicator1PartB: this.state.bestPracticeIndicator1PartB,
      bestPracticeIndicator2PartB: this.state.bestPracticeIndicator2PartB,

      coachingSupportIndicator1PartB: this.state.coachingSupportIndicator1PartB,
      coachingSupportIndicator2PartB: this.state.coachingSupportIndicator2PartB,

      agreedStatementTeacherPartB: this.state.agreedStatementTeacherPartB,
      agreedStatementLFPartB: this.state.agreedStatementLFPartB,

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
    } else if (this.state.rtrSchoolId === "") {
      Alert.alert("Alert", "School ID can not be empty");
      return;
    } else if (this.state.yearOfSupport === "") {
      Alert.alert("Alert", "Year of Support Office can not be empty");
      return;
    } else {
      // Save data locally
      try {
        const existingData = await AsyncStorage.getItem("offlineFormsPSRM");
        const forms = existingData ? JSON.parse(existingData) : [];
        forms.push(formData);
        await AsyncStorage.setItem("offlineFormsPSRM", JSON.stringify(forms));
        //console.log("Data stored locally: " + JSON.stringify(forms));
        console.log("Data stored locally.");
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
      const existingData = await AsyncStorage.getItem("offlineFormsPSRM");
      if (existingData) {
        const formsToSync = JSON.parse(existingData);
        for (const formData of formsToSync) {
          await fetch("http://118.179.80.51:8080/api/v1/p-srm-class", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
        }
        console.log("LF Data syncing");
        await AsyncStorage.removeItem("offlineFormsPSRM"); // Clear synced data
        // console.log(
        //   "Pending data synced successfully: " + JSON.parse(existingData),
        // );
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
  // Part A
  bestPracticeIndcoachingSupportIndPartA = () => {
    // Initially set all value to N/A
    this.setState({
      coachingSupportIndicator1PartA: "N/A",
      coachingSupportIndicator2PartA: "N/A",
    });
    this.setState({
      bestPracticeIndicator1PartA: "N/A",
      bestPracticeIndicator2PartA: "N/A",
    });
    // Initially set all value to N/A

    if (this.state.typeOfReadingPartA === "Read Aloud") {
      // Setup CoachingSupport
      const variablesIndAA = [
        this.state.partAInd21TeacherInspireToParticipateStatus,
        this.state.partAInd22TeacherShowedPictureTextStatus,
        this.state.partAInd23TeacherTeachesByActionStatus,
        this.state.partAInd31TeacherAllowToBCOStatus,
        this.state.partAInd11TeacherHelpedStudentToSeatStatus,
        this.state.partAInd12TeacherShowedABookDetailStatus,
        this.state.partAInd13TeacherTeachesWordWithMeaningStatus,
        this.state.partAInd24TeacherAskedNextStepStatus,
        this.state.partAInd32TeacherAskedQuestionForAssessmentStatus,
        this.state.partAInd33TeacherParticipateStudentToSRMStatus,
        this.state.partAInd34TeacherCongratulatedStudentStatus,
      ];

      const variablesIndValueAA = [
        "২ক. শিক্ষক পড়ার সময়ে শিক্ষার্থীদের অংশগ্রহণ উৎসাহিত করেছেন । এমনকি শিক্ষার্থীদের ভুল ভুল উত্তরকেও নিরুৎসাহিত করেননি।",
        "২খ. শিক্ষক পড়ার সময়ে বইয়ের ছবি ও টেক্সট দেখিয়ে এমন স্বরে পড়েছেন যা সকল শিক্ষার্থী শুনতে পেয়েছে এবং অংশগ্রহণমূলক পড়ার সময় শিক্ষক বইয়ের টেক্সট নির্দেশ করে পড়েছেন।",
        "২গ. পড়ার সাথে সাথে শিক্ষক যথাযথ অভিব্যক্তি ও অঙ্গভঙ্গি করে দেখিয়েছেন।",
        "৩ক. শিক্ষক অন্তত কয়েকজন শিক্ষার্থীকে বই চেক-আউট করার সুযোগ দিয়েছেন।",
        "১ক. শিক্ষক শিক্ষার্থীদের পড়ার ঘণ্টা কার্যক্রম শুরুর আগে শান্ত ও সুশৃঙ্খলভাবে বসিয়েছেন।",
        "১খ. শিক্ষক পাঠাগার থেকে একটি বই নিয়ে শিক্ষার্থীদের বইয়ের প্রচ্ছদ দেখিয়েছেন এবং বইয়ের নাম ও লেখকের নাম বলেছেন। এরপর বইটির বিষয় কী হতে পারে তা শিক্ষার্থীদের কাছে জানতে চেয়েছেন।",
        "১গ. শিক্ষক বই থেকে ১/২টি শব্দ অর্থসহ সুস্পষ্টভাবে শিক্ষার্থীদের শিখিয়েছেন।",
        "২ঘ. শিক্ষক পড়ার সময় ‘এরপর কী ঘটতে পারে' এমন দু-তিনটি প্রশ্ন করেছেন।",
        "৩খ. শিক্ষক কখন, কোথায়, কী এবং কে দিয়ে প্রশ্ন করে শিক্ষার্থীদের পড়ার বোধগম্যতা যাচাই করেছেন।",
        "৩গ. শিক্ষক পড়ার ঘণ্টা কার্যক্রমে শিক্ষার্থীদের সক্রিয় অংশগ্রহণ করিয়েছেন।",
        "৩ঘ. শিক্ষক শিক্ষার্থীদের পড়ার সকল প্রচেষ্টার প্রশংসা করেছেন।",
      ];

      let noCount = 0;

      for (let i = 0; i < variablesIndAA.length; i++) {
        if (variablesIndAA[i] === "No") {
          if (noCount === 0) {
            // Assign the first 'No' found to coachingSupport1
            this.setState({
              coachingSupportIndicator1PartA: variablesIndValueAA[i],
            });
            noCount++;
          } else if (noCount === 1) {
            this.setState({
              coachingSupportIndicator2PartA: variablesIndValueAA[i],
            }); // Assign the second 'No' found to coachingSupport2
            noCount++;
            // We found both, so we can stop the loop if needed (optional optimization)
            break;
          }
        }
      }
      // Setup CoachingSupport

      // Setup BestPractice
      if (
        this.state.teacherStatus === "Priority 3" ||
        this.state.teacherStatus === "Priority 2"
      ) {
        const variablesIndAA = [
          this.state.partAInd11TeacherHelpedStudentToSeatStatus,
          this.state.partAInd12TeacherShowedABookDetailStatus,
          this.state.partAInd13TeacherTeachesWordWithMeaningStatus,
          this.state.partAInd24TeacherAskedNextStepStatus,
          this.state.partAInd32TeacherAskedQuestionForAssessmentStatus,
          this.state.partAInd33TeacherParticipateStudentToSRMStatus,
          this.state.partAInd34TeacherCongratulatedStudentStatus,
        ];

        const variablesIndValueAA = [
          "১ক. শিক্ষক শিক্ষার্থীদের পড়ার ঘণ্টা কার্যক্রম শুরুর আগে শান্ত ও সুশৃঙ্খলভাবে বসিয়েছেন।",
          "১খ. শিক্ষক পাঠাগার থেকে একটি বই নিয়ে শিক্ষার্থীদের বইয়ের প্রচ্ছদ দেখিয়েছেন এবং বইয়ের নাম ও লেখকের নাম বলেছেন। এরপর বইটির বিষয় কী হতে পারে তা শিক্ষার্থীদের কাছে জানতে চেয়েছেন।",
          "১গ. শিক্ষক বই থেকে ১/২টি শব্দ অর্থসহ সুস্পষ্টভাবে শিক্ষার্থীদের শিখিয়েছেন।",
          "২ঘ. শিক্ষক পড়ার সময় ‘এরপর কী ঘটতে পারে' এমন দু-তিনটি প্রশ্ন করেছেন।",
          "৩খ. শিক্ষক কখন, কোথায়, কী এবং কে দিয়ে প্রশ্ন করে শিক্ষার্থীদের পড়ার বোধগম্যতা যাচাই করেছেন।",
          "৩গ. শিক্ষক পড়ার ঘণ্টা কার্যক্রমে শিক্ষার্থীদের সক্রিয় অংশগ্রহণ করিয়েছেন।",
          "৩ঘ. শিক্ষক শিক্ষার্থীদের পড়ার সকল প্রচেষ্টার প্রশংসা করেছেন।",
        ];

        let yesCount = 0;

        for (let i = variablesIndAA.length; i >= 0; i--) {
          if (variablesIndAA[i] === "Yes") {
            if (yesCount === 0) {
              // Assign the first 'yes' found to bestPracticeInd1
              this.setState({
                bestPracticeIndicator1PartA: variablesIndValueAA[i],
              });
              yesCount++;
            } else if (yesCount === 1) {
              this.setState({
                bestPracticeIndicator2PartA: variablesIndValueAA[i],
              }); // Assign the second 'yes' found to y
              yesCount++;
              // We found both, so we can stop the loop if needed (optional optimization)
              break;
            }
          }
        }
      } else if (this.state.teacherStatus === "Priority 1") {
        const variablesIndAA = [
          this.state.partAInd11TeacherHelpedStudentToSeatStatus,
          this.state.partAInd12TeacherShowedABookDetailStatus,
        ];

        const variablesIndValueAA = [
          "১ক. শিক্ষক শিক্ষার্থীদের পড়ার ঘণ্টা কার্যক্রম শুরুর আগে শান্ত ও সুশৃঙ্খলভাবে বসিয়েছেন।",
          "১খ. শিক্ষক পাঠাগার থেকে একটি বই নিয়ে শিক্ষার্থীদের বইয়ের প্রচ্ছদ দেখিয়েছেন এবং বইয়ের নাম ও লেখকের নাম বলেছেন। এরপর বইটির বিষয় কী হতে পারে তা শিক্ষার্থীদের কাছে জানতে চেয়েছেন।",
        ];

        let yesCount = 0;

        for (let i = variablesIndAA.length; i >= 0; i--) {
          if (variablesIndAA[i] === "Yes") {
            if (yesCount === 0) {
              // Assign the first 'yes' found to bestPracticeInd1
              this.setState({
                bestPracticeIndicator1PartA: variablesIndValueAA[i],
              });
              yesCount++;
            } else if (yesCount === 1) {
              this.setState({
                bestPracticeIndicator2PartA: variablesIndValueAA[i],
              }); // Assign the second 'yes' found to y
              yesCount++;
              // We found both, so we can stop the loop if needed (optional optimization)
              break;
            }
          }
        }
      }
      // Setup BestPractice
    } else if (this.state.typeOfReadingPartA === "Participatory Reading") {
      // Setup CoachingSupport
      const variablesIndAB = [
        this.state.partAInd21TeacherInspireToParticipateStatus,
        this.state.partAInd22TeacherShowedPictureTextStatus,
        this.state.partAInd23TeacherTeachesByActionStatus,
        this.state.partAInd25TeacherSelectedBookAsLevelStatus,
        this.state.partAInd31TeacherAllowToBCOStatus,
        this.state.partAInd11TeacherHelpedStudentToSeatStatus,
        this.state.partAInd12TeacherShowedABookDetailStatus,
        this.state.partAInd13TeacherTeachesWordWithMeaningStatus,
        this.state.partAInd24TeacherAskedNextStepStatus,
        this.state.partAInd26TeacherAskedToParticipateInReadingStatus,
        this.state.partAInd32TeacherAskedQuestionForAssessmentStatus,
        this.state.partAInd33TeacherParticipateStudentToSRMStatus,
        this.state.partAInd34TeacherCongratulatedStudentStatus,
      ];

      const variablesIndValueAB = [
        "২ক. শিক্ষক পড়ার সময়ে শিক্ষার্থীদের অংশগ্রহণ উৎসাহিত করেছেন । এমনকি শিক্ষার্থীদের ভুল ভুল উত্তরকেও নিরুৎসাহিত করেননি।",
        "২খ. শিক্ষক পড়ার সময়ে বইয়ের ছবি ও টেক্সট দেখিয়ে এমন স্বরে পড়েছেন যা সকল শিক্ষার্থী শুনতে পেয়েছে এবং অংশগ্রহণমূলক পড়ার সময় শিক্ষক বইয়ের টেক্সট নির্দেশ করে পড়েছেন।",
        "২গ. পড়ার সাথে সাথে শিক্ষক যথাযথ অভিব্যক্তি ও অঙ্গভঙ্গি করে দেখিয়েছেন।",
        "২ঙ. বই নির্বাচনের সময় শিক্ষার্থীদের পড়ার লেভেল অনুযায়ী উপযুক্ত বই নির্বাচন করেছেন।",
        "৩ক. শিক্ষক অন্তত কয়েকজন শিক্ষার্থীকে বই চেক-আউট করার সুযোগ দিয়েছেন।",
        "১ক. শিক্ষক শিক্ষার্থীদের পড়ার ঘণ্টা কার্যক্রম শুরুর আগে শান্ত ও সুশৃঙ্খলভাবে বসিয়েছেন।",
        "১খ. শিক্ষক পাঠাগার থেকে একটি বই নিয়ে শিক্ষার্থীদের বইয়ের প্রচ্ছদ দেখিয়েছেন এবং বইয়ের নাম ও লেখকের নাম বলেছেন। এরপর বইটির বিষয় কী হতে পারে তা শিক্ষার্থীদের কাছে জানতে চেয়েছেন।",
        "১গ. শিক্ষক বই থেকে ১/২টি শব্দ অর্থসহ সুস্পষ্টভাবে শিক্ষার্থীদের শিখিয়েছেন।",
        "২ঘ. শিক্ষক পড়ার সময় ‘এরপর কী ঘটতে পারে' এমন দু-তিনটি প্রশ্ন করেছেন।",
        "২চ. শিক্ষক শিক্ষার্থীদের পড়ায় অংশগ্রহণের জন্য আহ্বান জানিয়েছেন (শিক্ষকের সাথে সাথে শব্দ পড়া এবং অন্যান্য শব্দ, যেমন: পাখির ডাক, পশুর আওয়াজ ইত্যাদি নকল করা) । তবে শিক্ষক পড়ায় অংশগ্রহণ করার জন্য কোনো শিক্ষার্থীকে বাধ্য করেননি।",
        "৩খ. শিক্ষক কখন, কোথায়, কী এবং কে দিয়ে প্রশ্ন করে শিক্ষার্থীদের পড়ার বোধগম্যতা যাচাই করেছেন।",
        "৩গ. শিক্ষক পড়ার ঘণ্টা কার্যক্রমে শিক্ষার্থীদের সক্রিয় অংশগ্রহণ করিয়েছেন।",
        "৩ঘ. শিক্ষক শিক্ষার্থীদের পড়ার সকল প্রচেষ্টার প্রশংসা করেছেন।",
      ];

      let noCount = 0;

      for (let i = 0; i < variablesIndAB.length; i++) {
        if (variablesIndAB[i] === "No") {
          if (noCount === 0) {
            // Assign the first 'No' found to coachingSupport1
            this.setState({
              coachingSupportIndicator1PartA: variablesIndValueAB[i],
            });
            noCount++;
          } else if (noCount === 1) {
            this.setState({
              coachingSupportIndicator2PartA: variablesIndValueAB[i],
            }); // Assign the second 'No' found to coachingSupport2
            noCount++;
            // We found both, so we can stop the loop if needed (optional optimization)
            break;
          }
        }
      }
      // Setup CoachingSupport

      // Setup BestPractice
      if (
        this.state.teacherStatus === "Priority 3" ||
        this.state.teacherStatus === "Priority 2"
      ) {
        const variablesIndAA = [
          this.state.partAInd11TeacherHelpedStudentToSeatStatus,
          this.state.partAInd12TeacherShowedABookDetailStatus,
          this.state.partAInd13TeacherTeachesWordWithMeaningStatus,
          this.state.partAInd24TeacherAskedNextStepStatus,
          this.state.partAInd32TeacherAskedQuestionForAssessmentStatus,
          this.state.partAInd33TeacherParticipateStudentToSRMStatus,
          this.state.partAInd34TeacherCongratulatedStudentStatus,
        ];

        const variablesIndValueAA = [
          "১ক. শিক্ষক শিক্ষার্থীদের পড়ার ঘণ্টা কার্যক্রম শুরুর আগে শান্ত ও সুশৃঙ্খলভাবে বসিয়েছেন।",
          "১খ. শিক্ষক পাঠাগার থেকে একটি বই নিয়ে শিক্ষার্থীদের বইয়ের প্রচ্ছদ দেখিয়েছেন এবং বইয়ের নাম ও লেখকের নাম বলেছেন। এরপর বইটির বিষয় কী হতে পারে তা শিক্ষার্থীদের কাছে জানতে চেয়েছেন।",
          "১গ. শিক্ষক বই থেকে ১/২টি শব্দ অর্থসহ সুস্পষ্টভাবে শিক্ষার্থীদের শিখিয়েছেন।",
          "২ঘ. শিক্ষক পড়ার সময় ‘এরপর কী ঘটতে পারে' এমন দু-তিনটি প্রশ্ন করেছেন।",
          "৩খ. শিক্ষক কখন, কোথায়, কী এবং কে দিয়ে প্রশ্ন করে শিক্ষার্থীদের পড়ার বোধগম্যতা যাচাই করেছেন।",
          "৩গ. শিক্ষক পড়ার ঘণ্টা কার্যক্রমে শিক্ষার্থীদের সক্রিয় অংশগ্রহণ করিয়েছেন।",
          "৩ঘ. শিক্ষক শিক্ষার্থীদের পড়ার সকল প্রচেষ্টার প্রশংসা করেছেন।",
        ];

        let yesCount = 0;

        for (let i = variablesIndAA.length; i >= 0; i--) {
          if (variablesIndAA[i] === "Yes") {
            if (yesCount === 0) {
              // Assign the first 'yes' found to bestPracticeInd1
              this.setState({
                bestPracticeIndicator1PartA: variablesIndValueAA[i],
              });
              yesCount++;
            } else if (yesCount === 1) {
              this.setState({
                bestPracticeIndicator2PartA: variablesIndValueAA[i],
              }); // Assign the second 'yes' found to y
              yesCount++;
              // We found both, so we can stop the loop if needed (optional optimization)
              break;
            }
          }
        }
      } else if (this.state.teacherStatus === "Priority 1") {
        const variablesIndAA = [
          this.state.partAInd11TeacherHelpedStudentToSeatStatus,
          this.state.partAInd12TeacherShowedABookDetailStatus,
          this.state.partAInd26TeacherAskedToParticipateInReadingStatus,
        ];

        const variablesIndValueAA = [
          "১ক. শিক্ষক শিক্ষার্থীদের পড়ার ঘণ্টা কার্যক্রম শুরুর আগে শান্ত ও সুশৃঙ্খলভাবে বসিয়েছেন।",
          "১খ. শিক্ষক পাঠাগার থেকে একটি বই নিয়ে শিক্ষার্থীদের বইয়ের প্রচ্ছদ দেখিয়েছেন এবং বইয়ের নাম ও লেখকের নাম বলেছেন। এরপর বইটির বিষয় কী হতে পারে তা শিক্ষার্থীদের কাছে জানতে চেয়েছেন।",
          "২চ. শিক্ষক শিক্ষার্থীদের পড়ায় অংশগ্রহণের জন্য আহ্বান জানিয়েছেন (শিক্ষকের সাথে সাথে শব্দ পড়া এবং অন্যান্য শব্দ, যেমন: পাখির ডাক, পশুর আওয়াজ ইত্যাদি নকল করা) । তবে শিক্ষক পড়ায় অংশগ্রহণ করার জন্য কোনো শিক্ষার্থীকে বাধ্য করেননি।",
        ];

        let yesCount = 0;

        for (let i = variablesIndAA.length; i >= 0; i--) {
          if (variablesIndAA[i] === "Yes") {
            if (yesCount === 0) {
              // Assign the first 'yes' found to bestPracticeInd1
              this.setState({
                bestPracticeIndicator1PartA: variablesIndValueAA[i],
              });
              yesCount++;
            } else if (yesCount === 1) {
              this.setState({
                bestPracticeIndicator2PartA: variablesIndValueAA[i],
              }); // Assign the second 'yes' found to y
              yesCount++;
              // We found both, so we can stop the loop if needed (optional optimization)
              break;
            }
          }
        }
      }
      // Setup BestPractice
    } else {
      this.setState({
        coachingSupportIndicator1PartA: "N/A",
        coachingSupportIndicator2PartA: "N/A",
      });
      this.setState({
        bestPracticeIndicator1PartA: "N/A",
        bestPracticeIndicator2PartA: "N/A",
      });
    }
  };
  // Part A

  // Part B
  bestPracticeIndcoachingSupportIndPartB = () => {
    // Initially set all value to N/A
    this.setState({
      coachingSupportIndicator1PartB: "N/A",
      coachingSupportIndicator2PartB: "N/A",
    });
    this.setState({
      bestPracticeIndicator1PartB: "N/A",
      bestPracticeIndicator2PartB: "N/A",
    });
    // Initially set all value to N/A
    if (this.state.typeOfReadingPartB === "Pair Reading") {
      // Setup CoachingSupport
      const variablesIndBA = [
        this.state.partBInd12TeacherInstructSRMStatus,
        this.state.partBInd33TeacherInspiredStudentForSRMStatus,
        this.state.partBInd34TeacherAlloedStudentToBCOStatus,
        this.state.partBInd11TeacherHelpedStudentToSeatStatus,
        this.state.partBInd22TeacherCheckedStudentParticipationStatus,
        this.state.partBInd31TeacherHelpedStudentToShareStatus,
        this.state.partBInd21TeacherListenAndAskQuestionStatus,
        this.state.partBInd32TeacherInspiredStudentEffortStatus,
      ];

      const variablesIndValueBA = [
        "১খ. শিক্ষক পড়ার ঘণ্টা কার্যক্রম সম্পর্কে সুস্পষ্ট নির্দেশাবলি দিয়েছেন।",
        "৩গ. শিক্ষক পড়ার ঘণ্টা কার্যক্রমে শিক্ষার্থীদের অংশগ্রহণকে উৎসাহিত করেন । এমনকি ভুল উত্তরকেও নিরুৎসাহিত করেননি।",
        "৩ঘ. শিক্ষক অন্তত কয়েকজন শিক্ষার্থীকে বই চেক-আউট করার সময় দিয়েছেন।",
        "১ক. শিক্ষক শিক্ষার্থীদের পড়ার ঘণ্টা কার্যক্রম শুরুর আগে শান্ত ও সুশৃঙ্খলভাবে বসিয়েছেন।",
        "২খ. শিক্ষক পড়া চলাকালীন শিক্ষার্থীরা পড়ায় সক্রিয় অংশগ্রহণ করেছে কিনা তা ঘুরে ঘুরে দেখেছেন।",
        "৩ক. শিক্ষার্থীরা যাতে তাদের পড়া অন্যের সাথে শেয়ার করতে শিক্ষক শিক্ষার্থীদের সহযোগিতা করেন।",
        "২ক. শিক্ষক শিক্ষার্থীদের পড়া মনোযোগ দিয়ে শোনেন এবং প্রয়োজনে প্রশ্ন জিজ্ঞেস করেন।",
        "৩খ. শিক্ষক শিক্ষার্থীদের পড়ার সকল প্রচেষ্টার প্রশংসা করেন।",
      ];

      let noCount = 0;

      for (let i = 0; i < variablesIndBA.length; i++) {
        if (variablesIndBA[i] === "No") {
          if (noCount === 0) {
            // Assign the first 'No' found to coachingSupport1
            this.setState({
              coachingSupportIndicator1PartB: variablesIndValueBA[i],
            });
            noCount++;
          } else if (noCount === 1) {
            this.setState({
              coachingSupportIndicator2PartB: variablesIndValueBA[i],
            }); // Assign the second 'No' found to coachingSupport2
            noCount++;
            // We found both, so we can stop the loop if needed (optional optimization)
            break;
          }
        }
      }
      // Setup CoachingSupport

      // Setup BestPractice
      if (
        this.state.teacherStatus === "Priority 3" ||
        this.state.teacherStatus === "Priority 2"
      ) {
        const variablesIndBA = [
          this.state.partBInd11TeacherHelpedStudentToSeatStatus,
          this.state.partBInd22TeacherCheckedStudentParticipationStatus,
          this.state.partBInd31TeacherHelpedStudentToShareStatus,
          this.state.partBInd21TeacherListenAndAskQuestionStatus,
          this.state.partBInd32TeacherInspiredStudentEffortStatus,
        ];

        const variablesIndValueBA = [
          "১ক. শিক্ষক শিক্ষার্থীদের পড়ার ঘণ্টা কার্যক্রম শুরুর আগে শান্ত ও সুশৃঙ্খলভাবে বসিয়েছেন।",
          "২খ. শিক্ষক পড়া চলাকালীন শিক্ষার্থীরা পড়ায় সক্রিয় অংশগ্রহণ করেছে কিনা তা ঘুরে ঘুরে দেখেছেন।",
          "৩ক. শিক্ষার্থীরা যাতে তাদের পড়া অন্যের সাথে শেয়ার করতে শিক্ষক শিক্ষার্থীদের সহযোগিতা করেন।",
          "২ক. শিক্ষক শিক্ষার্থীদের পড়া মনোযোগ দিয়ে শোনেন এবং প্রয়োজনে প্রশ্ন জিজ্ঞেস করেন।",
          "৩খ. শিক্ষক শিক্ষার্থীদের পড়ার সকল প্রচেষ্টার প্রশংসা করেন।",
        ];

        let yesCount = 0;

        for (let i = variablesIndBA.length; i >= 0; i--) {
          if (variablesIndBA[i] === "Yes") {
            if (yesCount === 0) {
              // Assign the first 'yes' found to bestPracticeInd1
              this.setState({
                bestPracticeIndicator1PartB: variablesIndValueBA[i],
              });
              yesCount++;
            } else if (yesCount === 1) {
              this.setState({
                bestPracticeIndicator2PartB: variablesIndValueBA[i],
              }); // Assign the second 'yes' found to y
              yesCount++;
              // We found both, so we can stop the loop if needed (optional optimization)
              break;
            }
          }
        }
      } else if (this.state.teacherStatus === "Priority 1") {
        const variablesIndBA = [
          this.state.partBInd11TeacherHelpedStudentToSeatStatus,
          this.state.partBInd22TeacherCheckedStudentParticipationStatus,
          this.state.partBInd31TeacherHelpedStudentToShareStatus,
        ];

        const variablesIndValueBA = [
          "১ক. শিক্ষক শিক্ষার্থীদের পড়ার ঘণ্টা কার্যক্রম শুরুর আগে শান্ত ও সুশৃঙ্খলভাবে বসিয়েছেন।",
          "২খ. শিক্ষক পড়া চলাকালীন শিক্ষার্থীরা পড়ায় সক্রিয় অংশগ্রহণ করেছে কিনা তা ঘুরে ঘুরে দেখেছেন।",
          "৩ক. শিক্ষার্থীরা যাতে তাদের পড়া অন্যের সাথে শেয়ার করতে শিক্ষক শিক্ষার্থীদের সহযোগিতা করেন।",
        ];

        let yesCount = 0;

        for (let i = variablesIndBA.length; i >= 0; i--) {
          if (variablesIndBA[i] === "Yes") {
            if (yesCount === 0) {
              // Assign the first 'yes' found to bestPracticeInd1
              this.setState({
                bestPracticeIndicator1PartB: variablesIndValueBA[i],
              });
              yesCount++;
            } else if (yesCount === 1) {
              this.setState({
                bestPracticeIndicator2PartB: variablesIndValueBA[i],
              }); // Assign the second 'yes' found to y
              yesCount++;
              // We found both, so we can stop the loop if needed (optional optimization)
              break;
            }
          }
        }
      }
      // Setup BestPractice
    } else if (this.state.typeOfReadingPartB === "Independent Reading") {
      // Setup CoachingSupport
      const variablesIndBA = [
        this.state.partBInd12TeacherInstructSRMStatus,
        this.state.partBInd13TeacherCheckedBookLevelStatus,
        this.state.partBInd33TeacherInspiredStudentForSRMStatus,
        this.state.partBInd34TeacherAlloedStudentToBCOStatus,
        this.state.partBInd11TeacherHelpedStudentToSeatStatus,
        this.state.partBInd22TeacherCheckedStudentParticipationStatus,
        this.state.partBInd31TeacherHelpedStudentToShareStatus,
        this.state.partBInd21TeacherListenAndAskQuestionStatus,
        this.state.partBInd32TeacherInspiredStudentEffortStatus,
      ];

      const variablesIndValueBA = [
        "১খ. শিক্ষক পড়ার ঘণ্টা কার্যক্রম সম্পর্কে সুস্পষ্ট নির্দেশাবলি দিয়েছেন।",
        "১গ. শিক্ষার্থীরা পড়ার লেভেল অনুযায়ী বই নিয়েছে কিনা শিক্ষক তা দেখেছেন।",
        "৩গ. শিক্ষক পড়ার ঘণ্টা কার্যক্রমে শিক্ষার্থীদের অংশগ্রহণকে উৎসাহিত করেন । এমনকি ভুল উত্তরকেও নিরুৎসাহিত করেননি।",
        "৩ঘ. শিক্ষক অন্তত কয়েকজন শিক্ষার্থীকে বই চেক-আউট করার সময় দিয়েছেন।",
        "১ক. শিক্ষক শিক্ষার্থীদের পড়ার ঘণ্টা কার্যক্রম শুরুর আগে শান্ত ও সুশৃঙ্খলভাবে বসিয়েছেন।",
        "২খ. শিক্ষক পড়া চলাকালীন শিক্ষার্থীরা পড়ায় সক্রিয় অংশগ্রহণ করেছে কিনা তা ঘুরে ঘুরে দেখেছেন।",
        "৩ক. শিক্ষার্থীরা যাতে তাদের পড়া অন্যের সাথে শেয়ার করতে শিক্ষক শিক্ষার্থীদের সহযোগিতা করেন।",
        "২ক. শিক্ষক শিক্ষার্থীদের পড়া মনোযোগ দিয়ে শোনেন এবং প্রয়োজনে প্রশ্ন জিজ্ঞেস করেন।",
        "৩খ. শিক্ষক শিক্ষার্থীদের পড়ার সকল প্রচেষ্টার প্রশংসা করেন।",
      ];

      let noCount = 0;

      for (let i = 0; i < variablesIndBA.length; i++) {
        if (variablesIndBA[i] === "No") {
          if (noCount === 0) {
            // Assign the first 'No' found to coachingSupport1
            this.setState({
              coachingSupportIndicator1PartB: variablesIndValueBA[i],
            });
            noCount++;
          } else if (noCount === 1) {
            this.setState({
              coachingSupportIndicator2PartB: variablesIndValueBA[i],
            }); // Assign the second 'No' found to coachingSupport2
            noCount++;
            // We found both, so we can stop the loop if needed (optional optimization)
            break;
          }
        }
      }
      // Setup CoachingSupport

      // Setup BestPractice
      if (
        this.state.teacherStatus === "Priority 3" ||
        this.state.teacherStatus === "Priority 2"
      ) {
        const variablesIndBA = [
          this.state.partBInd11TeacherHelpedStudentToSeatStatus,
          this.state.partBInd22TeacherCheckedStudentParticipationStatus,
          this.state.partBInd31TeacherHelpedStudentToShareStatus,
          this.state.partBInd21TeacherListenAndAskQuestionStatus,
          this.state.partBInd32TeacherInspiredStudentEffortStatus,
        ];

        const variablesIndValueBA = [
          "১ক. শিক্ষক শিক্ষার্থীদের পড়ার ঘণ্টা কার্যক্রম শুরুর আগে শান্ত ও সুশৃঙ্খলভাবে বসিয়েছেন।",
          "২খ. শিক্ষক পড়া চলাকালীন শিক্ষার্থীরা পড়ায় সক্রিয় অংশগ্রহণ করেছে কিনা তা ঘুরে ঘুরে দেখেছেন।",
          "৩ক. শিক্ষার্থীরা যাতে তাদের পড়া অন্যের সাথে শেয়ার করতে শিক্ষক শিক্ষার্থীদের সহযোগিতা করেন।",
          "২ক. শিক্ষক শিক্ষার্থীদের পড়া মনোযোগ দিয়ে শোনেন এবং প্রয়োজনে প্রশ্ন জিজ্ঞেস করেন।",
          "৩খ. শিক্ষক শিক্ষার্থীদের পড়ার সকল প্রচেষ্টার প্রশংসা করেন।",
        ];

        let yesCount = 0;

        for (let i = variablesIndBA.length; i >= 0; i--) {
          if (variablesIndBA[i] === "Yes") {
            if (yesCount === 0) {
              // Assign the first 'yes' found to bestPracticeInd1
              this.setState({
                bestPracticeIndicator1PartB: variablesIndValueBA[i],
              });
              yesCount++;
            } else if (yesCount === 1) {
              this.setState({
                bestPracticeIndicator2PartB: variablesIndValueBA[i],
              }); // Assign the second 'yes' found to y
              yesCount++;
              // We found both, so we can stop the loop if needed (optional optimization)
              break;
            }
          }
        }
      } else if (this.state.teacherStatus === "Priority 1") {
        const variablesIndBA = [
          this.state.partBInd11TeacherHelpedStudentToSeatStatus,
          this.state.partBInd22TeacherCheckedStudentParticipationStatus,
          this.state.partBInd31TeacherHelpedStudentToShareStatus,
        ];

        const variablesIndValueBA = [
          "১ক. শিক্ষক শিক্ষার্থীদের পড়ার ঘণ্টা কার্যক্রম শুরুর আগে শান্ত ও সুশৃঙ্খলভাবে বসিয়েছেন।",
          "২খ. শিক্ষক পড়া চলাকালীন শিক্ষার্থীরা পড়ায় সক্রিয় অংশগ্রহণ করেছে কিনা তা ঘুরে ঘুরে দেখেছেন।",
          "৩ক. শিক্ষার্থীরা যাতে তাদের পড়া অন্যের সাথে শেয়ার করতে শিক্ষক শিক্ষার্থীদের সহযোগিতা করেন।",
        ];

        let yesCount = 0;

        for (let i = variablesIndBA.length; i >= 0; i--) {
          if (variablesIndBA[i] === "Yes") {
            if (yesCount === 0) {
              // Assign the first 'yes' found to bestPracticeInd1
              this.setState({
                bestPracticeIndicator1PartB: variablesIndValueBA[i],
              });
              yesCount++;
            } else if (yesCount === 1) {
              this.setState({
                bestPracticeIndicator2PartB: variablesIndValueBA[i],
              }); // Assign the second 'yes' found to y
              yesCount++;
              // We found both, so we can stop the loop if needed (optional optimization)
              break;
            }
          }
        }
      }
      // Setup BestPractice
    } else {
      this.setState({
        coachingSupportIndicator1PartB: "N/A",
        coachingSupportIndicator2PartB: "N/A",
      });
      this.setState({
        bestPracticeIndicator1PartB: "N/A",
        bestPracticeIndicator2PartB: "N/A",
      });
    }
  };
  // Part B
  // Calculate bestPractice  && coachingSupport

  render() {
    const { checked, isConnected } = this.state;

    // For Datepicker
    const { show, date, selectedDate, mode } = this.state;
    // For Datepicker

    return (
      <View style={styles.container}>
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
          PREVAIL পড়ার ঘণ্টা কার্যক্রম পর্যবেক্ষণ ফরম
        </Text>

        <ScrollView style={{ flex: 1 }}>
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
                    {String(selectedDate.toDateString())}
                  </Text>
                  <Button onPress={this.datepicker} title="Select" />
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
                    selectedValue={this.state.pickerPhase}
                    onValueChange={(value) => {
                      this.setState({ pickerPhase: value });
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
                      লাইব্রেরি প্রতিষ্ঠার সন: (Established:)
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
                    selectedValue={this.state.yearOfEstablish}
                    onValueChange={(value) => {
                      this.setState({ yearOfEstablish: value });
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
                    value={this.state.totalAdmittedStudent + ""}
                    onChangeText={(text) =>
                      this.setState({
                        totalAdmittedStudent: Number(text),
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
                  {this.state.totalAdmittedStudent <
                    this.state.totalPresentStudent && (
                    <Text style={{ color: "red", fontSize: 20 }}>
                      Present will be smaller or equal to Admitted
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
                    value={this.state.totalPresentStudent + ""}
                    onChangeText={(text) =>
                      this.setState({
                        totalPresentStudent: Number(text),
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
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>পড়ার ধরন </Text>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <Card
                style={{
                  padding: 5,
                  margin: 5,
                  flex: 1,
                  alignSelf: "center",
                }}
              >
                <View style={{ padding: 5, flexDirection: "row" }}>
                  <Text
                    style={{
                      backgroundColor: "white",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    পড়ার ধরন নির্বাচন করুন (সরব পাঠ/অংশগ্রহণমূলক পড়া)
                  </Text>
                </View>
              </Card>
              <Card
                style={{
                  padding: 5,
                  margin: 5,
                  flex: 1,
                  alignSelf: "center",
                }}
              >
                <View style={{ padding: 5, flexDirection: "row" }}>
                  <Picker
                    style={{
                      height: 50,
                      width: 250,
                    }}
                    onValueChange={(value) => {
                      this.setState({ typeOfReadingPartA: value });
                    }}
                    selectedValue={this.state.typeOfReadingPartA}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"সরব পাঠ"} value={"Read Aloud"} />
                    <Picker.Item
                      label={"অংশগ্রহণমূলক পড়া"}
                      value={"Participatory Reading"}
                    />
                  </Picker>
                </View>
              </Card>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>পর্যবেক্ষণ/ইনডিকেটর</Text>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View
                style={{
                  padding: 5,
                  flexDirection: "row",
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    backgroundColor: "",
                    fontWeight: "bold",
                    alignItems: "center",
                    alignSelf: "center",
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  ১ পড়ার আগে
                </Text>
              </View>
              <View style={{ padding: 5 }}>
                {/* pointerEvents="none" */}

                <Card
                  style={{
                    padding: 10,
                    margin: 10,
                    flex: 1,
                    alignSelf: "center",
                    disabled: true,
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
                      ১ক. শিক্ষক শিক্ষার্থীদের পড়ার ঘণ্টা কার্যক্রম শুরুর আগে
                      শান্ত ও সুশৃঙ্খলভাবে বসিয়েছেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ২
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
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state
                              .partAInd11TeacherHelpedStudentToSeatStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partAInd11TeacherHelpedStudentToSeatStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartA === "Read Aloud"
                            ) {
                              if (
                                value === "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            ///////

                            if (
                              this.state.typeOfReadingPartA ===
                              "Participatory Reading"
                            ) {
                              if (
                                value === "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partAInd11TeacherHelpedStudentToSeatNote: text,
                            })
                          }
                          value={
                            this.state
                              .partAInd11TeacherHelpedStudentToSeatNote + ""
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ১খ. শিক্ষক পাঠাগার থেকে একটি বই নিয়ে শিক্ষার্থীদের বইয়ের
                      প্রচ্ছদ দেখিয়েছেন এবং বইয়ের নাম ও লেখকের নাম বলেছেন।
                      এরপর বইটির বিষয় কী হতে পারে তা শিক্ষার্থীদের কাছে জানতে
                      চেয়েছেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ২
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state.partAInd12TeacherShowedABookDetailStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partAInd12TeacherShowedABookDetailStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartA === "Read Aloud"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            ///////

                            if (
                              this.state.typeOfReadingPartA ===
                              "Participatory Reading"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partAInd12TeacherShowedABookDetailNote: text,
                            })
                          }
                          value={
                            this.state.partAInd12TeacherShowedABookDetailNote +
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ১গ. শিক্ষক বই থেকে ১/২টি শব্দ অর্থসহ সুস্পষ্টভাবে
                      শিক্ষার্থীদের শিখিয়েছেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state
                              .partAInd13TeacherTeachesWordWithMeaningStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partAInd13TeacherTeachesWordWithMeaningStatus:
                                value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartA === "Read Aloud"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (value === "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            ///////

                            if (
                              this.state.typeOfReadingPartA ===
                              "Participatory Reading"
                            ) {
                              if (
                                value === "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partAInd13TeacherTeachesWordWithMeaningNote: text,
                            })
                          }
                          value={
                            this.state
                              .partAInd13TeacherTeachesWordWithMeaningNote + ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
              <View
                style={{
                  padding: 5,
                  flexDirection: "row",
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    backgroundColor: "",
                    fontWeight: "bold",
                    alignItems: "center",
                    alignSelf: "center",
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  ২ পড়া চলাকালীন
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ২ক. শিক্ষক পড়ার সময়ে শিক্ষার্থীদের অংশগ্রহণ উৎসাহিত
                      করেছেন । এমনকি শিক্ষার্থীদের ভুল ভুল উত্তরকেও নিরুৎসাহিত
                      করেননি।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state
                              .partAInd21TeacherInspireToParticipateStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partAInd21TeacherInspireToParticipateStatus:
                                value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartA === "Read Aloud"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                value === "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            ///////

                            if (
                              this.state.typeOfReadingPartA ===
                              "Participatory Reading"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                value === "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partAInd21TeacherInspireToParticipateNote: text,
                            })
                          }
                          value={
                            this.state
                              .partAInd21TeacherInspireToParticipateNote + ""
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ২খ. শিক্ষক পড়ার সময়ে বইয়ের ছবি ও টেক্সট দেখিয়ে এমন
                      স্বরে পড়েছেন যা সকল শিক্ষার্থী শুনতে পেয়েছে এবং
                      অংশগ্রহণমূলক পড়ার সময় শিক্ষক বইয়ের টেক্সট নির্দেশ করে
                      পড়েছেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state.partAInd22TeacherShowedPictureTextStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partAInd22TeacherShowedPictureTextStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartA === "Read Aloud"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            ///////

                            if (
                              this.state.typeOfReadingPartA ===
                              "Participatory Reading"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partAInd22TeacherShowedPictureTextNote: text,
                            })
                          }
                          value={
                            this.state.partAInd22TeacherShowedPictureTextNote +
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ২গ. পড়ার সাথে সাথে শিক্ষক যথাযথ অভিব্যক্তি ও অঙ্গভঙ্গি
                      করে দেখিয়েছেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state.partAInd23TeacherTeachesByActionStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partAInd23TeacherTeachesByActionStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartA === "Read Aloud"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            ///////

                            if (
                              this.state.typeOfReadingPartA ===
                              "Participatory Reading"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partAInd23TeacherTeachesByActionNote: text,
                            })
                          }
                          value={
                            this.state.partAInd23TeacherTeachesByActionNote + ""
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ২ঘ শিক্ষক পড়ার সময় ‘এরপর কী ঘটতে পারে' এমন দু-তিনটি
                      প্রশ্ন করেছেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ৩
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state.partAInd24TeacherAskedNextStepStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partAInd24TeacherAskedNextStepStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartA === "Read Aloud"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            ///////

                            if (
                              this.state.typeOfReadingPartA ===
                              "Participatory Reading"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partAInd24TeacherAskedNextStepNote: text,
                            })
                          }
                          value={
                            this.state.partAInd24TeacherAskedNextStepNote + ""
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text style={{ fontWeight: "bold", color: "red" }}>
                      শুধু অংশগ্রহণমূলক পড়ার ক্ষেত্রে:
                    </Text>
                    <Text>
                      ২ঙ. বই নির্বাচনের সময় শিক্ষার্থীদের পড়ার লেভেল অনুযায়ী
                      উপযুক্ত বই নির্বাচন করেছেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state
                              .partAInd25TeacherSelectedBookAsLevelStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partAInd25TeacherSelectedBookAsLevelStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartA === "Read Aloud"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            ///////

                            if (
                              this.state.typeOfReadingPartA ===
                              "Participatory Reading"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partAInd25TeacherSelectedBookAsLevelNote: text,
                            })
                          }
                          value={
                            this.state
                              .partAInd25TeacherSelectedBookAsLevelNote + ""
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text style={{ fontWeight: "bold", color: "red" }}>
                      শুধু অংশগ্রহণমূলক পড়ায় (দ্বিতীয়বার পড়ার ক্ষেত্রে):
                    </Text>
                    <Text>
                      ২চ. শিক্ষক শিক্ষার্থীদের পড়ায় অংশগ্রহণের জন্য আহ্বান
                      জানিয়েছেন (শিক্ষকের সাথে সাথে শব্দ পড়া এবং অন্যান্য
                      শব্দ, যেমন: পাখির ডাক, পশুর আওয়াজ ইত্যাদি নকল করা) । তবে
                      শিক্ষক পড়ায় অংশগ্রহণ করার জন্য কোনো শিক্ষার্থীকে বাধ্য
                      করেননি।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ২
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state
                              .partAInd26TeacherAskedToParticipateInReadingStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partAInd26TeacherAskedToParticipateInReadingStatus:
                                value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartA === "Read Aloud"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            ///////

                            if (
                              this.state.typeOfReadingPartA ===
                              "Participatory Reading"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partAInd26TeacherAskedToParticipateInReadingNote:
                                text,
                            })
                          }
                          value={
                            this.state
                              .partAInd26TeacherAskedToParticipateInReadingNote +
                            ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
              <View
                style={{
                  padding: 5,
                  flexDirection: "row",
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    backgroundColor: "#ADD8E6",
                    fontWeight: "bold",
                    alignItems: "center",
                    alignSelf: "center",
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  ৩ পড়া শেষে
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ৩ক. শিক্ষক অন্তত কয়েকজন শিক্ষার্থীকে বই চেক-আউট করার
                      সুযোগ দিয়েছেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state.partAInd31TeacherAllowToBCOStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partAInd31TeacherAllowToBCOStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartA === "Read Aloud"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            ///////

                            if (
                              this.state.typeOfReadingPartA ===
                              "Participatory Reading"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partAInd31TeacherAllowToBCONote: text,
                            })
                          }
                          value={
                            this.state.partAInd31TeacherAllowToBCONote + ""
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ৩খ. শিক্ষক কখন, কোথায়, কী এবং কে দিয়ে প্রশ্ন করে
                      শিক্ষার্থীদের পড়ার বোধগম্যতা যাচাই করেছেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ৩
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state
                              .partAInd32TeacherAskedQuestionForAssessmentStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partAInd32TeacherAskedQuestionForAssessmentStatus:
                                value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartA === "Read Aloud"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            ///////

                            if (
                              this.state.typeOfReadingPartA ===
                              "Participatory Reading"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partAInd32TeacherAskedQuestionForAssessmentNote:
                                text,
                            })
                          }
                          value={
                            this.state
                              .partAInd32TeacherAskedQuestionForAssessmentNote +
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ৩গ. শিক্ষক পড়ার ঘণ্টা কার্যক্রমে শিক্ষার্থীদের সক্রিয়
                      অংশগ্রহণ করিয়েছেন।
                    </Text>

                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ৩
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                            disabled: true,
                          }}
                          selectedValue={
                            this.state
                              .partAInd33TeacherParticipateStudentToSRMStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partAInd33TeacherParticipateStudentToSRMStatus:
                                value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartA === "Read Aloud"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            ///////

                            if (
                              this.state.typeOfReadingPartA ===
                              "Participatory Reading"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd34TeacherCongratulatedStudentStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partAInd33TeacherParticipateStudentToSRMNote:
                                text,
                            })
                          }
                          value={
                            this.state
                              .partAInd33TeacherParticipateStudentToSRMNote + ""
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ৩ঘ. শিক্ষক শিক্ষার্থীদের পড়ার সকল প্রচেষ্টার প্রশংসা
                      করেছেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ৩
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state
                              .partAInd34TeacherCongratulatedStudentStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partAInd34TeacherCongratulatedStudentStatus:
                                value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartA === "Read Aloud"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            ///////

                            if (
                              this.state.typeOfReadingPartA ===
                              "Participatory Reading"
                            ) {
                              if (
                                this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd12TeacherShowedABookDetailStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partAInd21TeacherInspireToParticipateStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd22TeacherShowedPictureTextStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd23TeacherTeachesByActionStatus ===
                                  "Yes" &&
                                this.state
                                  .partAInd25TeacherSelectedBookAsLevelStatus ===
                                  "Yes" &&
                                this.state.partAInd31TeacherAllowToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partAInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd12TeacherShowedABookDetailStatus ===
                                    "" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd13TeacherTeachesWordWithMeaningStatus ===
                                    "" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd24TeacherAskedNextStepStatus ===
                                    "" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd26TeacherAskedToParticipateInReadingStatus ===
                                    "" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd32TeacherAskedQuestionForAssessmentStatus ===
                                    "" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "Yes" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "No" ||
                                  this.state
                                    .partAInd33TeacherParticipateStudentToSRMStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partAInd34TeacherCongratulatedStudentNote: text,
                            })
                          }
                          value={
                            this.state
                              .partAInd34TeacherCongratulatedStudentNote + ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>শিক্ষকের অবস্থা</Text>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 3, padding: 2 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      ইনডিকেটর অনুযায়ী শিক্ষকের অবস্থা
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
            <Text style={styles.bigRedText}>আলোচনা</Text>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ flex: 1, padding: 2 }}>
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
                  onPress={this.bestPracticeIndcoachingSupportIndPartA}
                >
                  <Text style={{ color: "#ffff" }}>Click to Generate</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ backgroundColor: "#ADD8E6", fontWeight: "bold" }}>
                শিক্ষককে পরামর্শ প্রদানের জন্য কিছু গুরুত্বপূর্ণ বিষয়
              </Text>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      শিক্ষক ভালো করেছেন এমন দু-তিনটি বিষয় উল্লেখ করুন:
                    </Text>
                  </View>
                </View>
                <Text></Text>
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
                      {this.state.bestPracticeIndicator1PartA}
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
                      {this.state.bestPracticeIndicator2PartA}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      কোন কোন ইন্ডিকেটরে আরো উন্নতির জন্য শিক্ষককে যত্নবান হতে
                      হবে উল্লেখ করুন ।
                    </Text>
                  </View>
                </View>
                <Text></Text>
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
                      {this.state.coachingSupportIndicator1PartA}
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
                      {this.state.coachingSupportIndicator2PartA}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>এর জন্য শিক্ষককে কী কী উদ্যোগ নিতে হবে?</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="১."
                      keyboardType="default"
                      editable={true}
                      onChangeText={(text) =>
                        this.setState({
                          agreedStatementTeacherPartA: text,
                        })
                      }
                      value={this.state.agreedStatementTeacherPartA + ""}
                    ></TextInput>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      এ কাজে শিক্ষককে সহযোগিতা করার জন্য এলএফ-কে কী কী উদ্যোগ
                      গ্রহণ করতে হবে?
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="২."
                      keyboardType="default"
                      editable={true}
                      onChangeText={(text) =>
                        this.setState({
                          agreedStatementLFPartA: text,
                        })
                      }
                      value={this.state.agreedStatementLFPartA + ""}
                    ></TextInput>
                  </View>
                </View>
              </View>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>পড়ার ধরন </Text>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <Card
                style={{
                  padding: 5,
                  margin: 5,
                  flex: 1,
                  alignSelf: "center",
                }}
              >
                <View style={{ padding: 5, flexDirection: "row" }}>
                  <Text
                    style={{
                      backgroundColor: "white",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    পড়ার ধরন নির্বাচন করুন (জুটিতে পড়া/স্বাধীনভাবে পড়া)
                  </Text>
                </View>
              </Card>
              <Card
                style={{
                  padding: 5,
                  margin: 5,
                  flex: 1,
                  alignSelf: "center",
                }}
              >
                <View style={{ padding: 5, flexDirection: "row" }}>
                  <Picker
                    style={{
                      height: 50,
                      width: 250,
                    }}
                    onValueChange={(value) => {
                      this.setState({ typeOfReadingPartB: value });
                    }}
                    selectedValue={this.state.typeOfReadingPartB}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"জুটিতে পড়া"} value={"Pair Reading"} />
                    <Picker.Item
                      label={"স্বাধীনভাবে পড়া"}
                      value={"Independent Reading"}
                    />
                  </Picker>
                </View>
              </Card>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>পর্যবেক্ষণ/ইনডিকেটর</Text>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View
                style={{
                  padding: 5,
                  flexDirection: "row",
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    backgroundColor: "",
                    fontWeight: "bold",
                    alignItems: "center",
                    alignSelf: "center",
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  ১ পড়ার আগে
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ১ক. শিক্ষক শিক্ষার্থীদের পড়ার ঘণ্টা কার্যক্রম শুরুর আগে
                      শান্ত এবং সুশৃংখলভাবে বসিয়েছেন৷
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ২
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state
                              .partBInd11TeacherHelpedStudentToSeatStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partBInd11TeacherHelpedStudentToSeatStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartB === "Pair Reading"
                            ) {
                              if (
                                value === "Yes" &&
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd22TeacherCheckedStudentParticipationStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd31TeacherHelpedStudentToShareStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd21TeacherListenAndAskQuestionStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            //////

                            if (
                              this.state.typeOfReadingPartB ===
                              "Independent Reading"
                            ) {
                              if (
                                value === "Yes" &&
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd13TeacherCheckedBookLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd22TeacherCheckedStudentParticipationStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd31TeacherHelpedStudentToShareStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd21TeacherListenAndAskQuestionStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd13TeacherCheckedBookLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partBInd11TeacherHelpedStudentToSeatNote: text,
                            })
                          }
                          value={
                            this.state
                              .partBInd11TeacherHelpedStudentToSeatNote + ""
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ১খ. শিক্ষক পড়ার ঘণ্টা কার্যক্রম সম্পর্কে সুস্পষ্ট
                      নির্দেশাবলি দিয়েছেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state.partBInd12TeacherInstructSRMStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partBInd12TeacherInstructSRMStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartB === "Pair Reading"
                            ) {
                              if (
                                this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partBInd22TeacherCheckedStudentParticipationStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd31TeacherHelpedStudentToShareStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd21TeacherListenAndAskQuestionStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                value === "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            //////

                            if (
                              this.state.typeOfReadingPartB ===
                              "Independent Reading"
                            ) {
                              if (
                                this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partBInd13TeacherCheckedBookLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd22TeacherCheckedStudentParticipationStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd31TeacherHelpedStudentToShareStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd21TeacherListenAndAskQuestionStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                value === "Yes" &&
                                this.state
                                  .partBInd13TeacherCheckedBookLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partBInd12TeacherInstructSRMNote: text,
                            })
                          }
                          value={
                            this.state.partBInd12TeacherInstructSRMNote + ""
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text style={{ fontWeight: "bold", color: "red" }}>
                      শুধুমাত্র স্বাধীনভাবে পড়ার ক্ষেত্রে:
                    </Text>
                    <Text>
                      ১গ. শিক্ষার্থীরা পড়ার লেভেল অনুযায়ী বই নিয়েছে কিনা
                      শিক্ষক তা দেখেছেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state.partBInd13TeacherCheckedBookLevelStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partBInd13TeacherCheckedBookLevelStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartB === "Pair Reading"
                            ) {
                              if (
                                this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd22TeacherCheckedStudentParticipationStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd31TeacherHelpedStudentToShareStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd21TeacherListenAndAskQuestionStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            //////

                            if (
                              this.state.typeOfReadingPartB ===
                              "Independent Reading"
                            ) {
                              if (
                                this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partBInd22TeacherCheckedStudentParticipationStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd31TeacherHelpedStudentToShareStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd21TeacherListenAndAskQuestionStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partBInd13TeacherCheckedBookLevelNote: text,
                            })
                          }
                          value={
                            this.state.partBInd13TeacherCheckedBookLevelNote +
                            ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
              <View
                style={{
                  padding: 5,
                  flexDirection: "row",
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    backgroundColor: "",
                    fontWeight: "bold",
                    alignItems: "center",
                    alignSelf: "center",
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  ২ পড়া চলাকালীন
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ২ক. শিক্ষক শিক্ষার্থীদের পড়া মনোযোগ দিয়ে শোনেন এবং
                      প্রয়োজনে প্রশ্ন জিজ্ঞেস করেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ৩
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state
                              .partBInd21TeacherListenAndAskQuestionStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partBInd21TeacherListenAndAskQuestionStatus:
                                value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartB === "Pair Reading"
                            ) {
                              if (
                                this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd22TeacherCheckedStudentParticipationStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd31TeacherHelpedStudentToShareStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            //////

                            if (
                              this.state.typeOfReadingPartB ===
                              "Independent Reading"
                            ) {
                              if (
                                this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd13TeacherCheckedBookLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd22TeacherCheckedStudentParticipationStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd31TeacherHelpedStudentToShareStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd13TeacherCheckedBookLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partBInd21TeacherListenAndAskQuestionNote: text,
                            })
                          }
                          value={
                            this.state
                              .partBInd21TeacherListenAndAskQuestionNote + ""
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ২খ. শিক্ষক পড়া চলাকালীন শিক্ষার্থীরা পড়ায় সক্রিয়
                      অংশগ্রহণ করেছে কিনা তা ঘুরে ঘুরে দেখেছেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ২
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state
                              .partBInd22TeacherCheckedStudentParticipationStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partBInd22TeacherCheckedStudentParticipationStatus:
                                value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartB === "Pair Reading"
                            ) {
                              if (
                                this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partBInd31TeacherHelpedStudentToShareStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd21TeacherListenAndAskQuestionStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            //////

                            if (
                              this.state.typeOfReadingPartB ===
                              "Independent Reading"
                            ) {
                              if (
                                this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd13TeacherCheckedBookLevelStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partBInd31TeacherHelpedStudentToShareStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd21TeacherListenAndAskQuestionStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd13TeacherCheckedBookLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partBInd22TeacherCheckedStudentParticipationNote:
                                text,
                            })
                          }
                          value={
                            this.state
                              .partBInd22TeacherCheckedStudentParticipationNote +
                            ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
              <View
                style={{
                  padding: 5,
                  flexDirection: "row",
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    backgroundColor: "",
                    fontWeight: "bold",
                    alignItems: "center",
                    alignSelf: "center",
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  ৩ পড়া শেষে
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ৩ক. শিক্ষার্থীরা যাতে তাদের পড়া অন্যের সাথে শেয়ার করতে
                      শিক্ষক শিক্ষার্থীদের সহযোগিতা করেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ২
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
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
                              .partBInd31TeacherHelpedStudentToShareStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partBInd31TeacherHelpedStudentToShareStatus:
                                value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartB === "Pair Reading"
                            ) {
                              if (
                                this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd22TeacherCheckedStudentParticipationStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd21TeacherListenAndAskQuestionStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            //////

                            if (
                              this.state.typeOfReadingPartB ===
                              "Independent Reading"
                            ) {
                              if (
                                this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd13TeacherCheckedBookLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd22TeacherCheckedStudentParticipationStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd21TeacherListenAndAskQuestionStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd13TeacherCheckedBookLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 350,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              partBInd31TeacherHelpedStudentToShareNote: text,
                            })
                          }
                          value={
                            this.state
                              .partBInd31TeacherHelpedStudentToShareNote + ""
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ৩খ. শিক্ষক শিক্ষার্থীদের পড়ার সকল প্রচেষ্টার প্রশংসা
                      করেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ৩
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state
                              .partBInd32TeacherInspiredStudentEffortStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partBInd32TeacherInspiredStudentEffortStatus:
                                value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartB === "Pair Reading"
                            ) {
                              if (
                                this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd22TeacherCheckedStudentParticipationStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd31TeacherHelpedStudentToShareStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd21TeacherListenAndAskQuestionStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            //////

                            if (
                              this.state.typeOfReadingPartB ===
                              "Independent Reading"
                            ) {
                              if (
                                this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd13TeacherCheckedBookLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd22TeacherCheckedStudentParticipationStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd31TeacherHelpedStudentToShareStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd21TeacherListenAndAskQuestionStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd13TeacherCheckedBookLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "" ||
                                  value === "Yes" ||
                                  value === "No" ||
                                  value === "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partBInd32TeacherInspiredStudentEffortNote: text,
                            })
                          }
                          value={
                            this.state
                              .partBInd32TeacherInspiredStudentEffortNote + ""
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ৩গ. শিক্ষক পড়ার ঘণ্টা কার্যক্রমে শিক্ষার্থীদের অংশগ্রহণকে
                      উৎসাহিত করেন । এমনকি ভুল উত্তরকেও নিরুৎসাহিত করেননি।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state
                              .partBInd33TeacherInspiredStudentForSRMStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partBInd33TeacherInspiredStudentForSRMStatus:
                                value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartB === "Pair Reading"
                            ) {
                              if (
                                this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd22TeacherCheckedStudentParticipationStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd31TeacherHelpedStudentToShareStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd21TeacherListenAndAskQuestionStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            //////

                            if (
                              this.state.typeOfReadingPartB ===
                              "Independent Reading"
                            ) {
                              if (
                                this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd13TeacherCheckedBookLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd22TeacherCheckedStudentParticipationStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd31TeacherHelpedStudentToShareStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd21TeacherListenAndAskQuestionStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd13TeacherCheckedBookLevelStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                this.state
                                  .partBInd34TeacherAlloedStudentToBCOStatus ===
                                  "Yes" &&
                                (this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partBInd33TeacherInspiredStudentForSRMNote: text,
                            })
                          }
                          value={
                            this.state
                              .partBInd33TeacherInspiredStudentForSRMNote + ""
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ৩ঘ. শিক্ষক অন্তত কয়েকজন শিক্ষার্থীকে বই চেক-আউট করার সময়
                      দিয়েছেন।
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
                    </Text>
                  </Card>
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>পর্যবেক্ষণ: </Text>
                        <Picker
                          style={{
                            height: 60,
                            width: 150,
                          }}
                          selectedValue={
                            this.state.partBInd34TeacherAlloedStudentToBCOStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              partBInd34TeacherAlloedStudentToBCOStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReadingPartB === "Pair Reading"
                            ) {
                              if (
                                this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd22TeacherCheckedStudentParticipationStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd31TeacherHelpedStudentToShareStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                (this.state
                                  .partBInd21TeacherListenAndAskQuestionStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                (this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }

                            //////

                            if (
                              this.state.typeOfReadingPartB ===
                              "Independent Reading"
                            ) {
                              if (
                                this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd13TeacherCheckedBookLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd22TeacherCheckedStudentParticipationStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd31TeacherHelpedStudentToShareStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                (this.state
                                  .partBInd21TeacherListenAndAskQuestionStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 3",
                                });
                              } else if (
                                this.state
                                  .partBInd12TeacherInstructSRMStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd13TeacherCheckedBookLevelStatus ===
                                  "Yes" &&
                                this.state
                                  .partBInd33TeacherInspiredStudentForSRMStatus ===
                                  "Yes" &&
                                value === "Yes" &&
                                (this.state
                                  .partBInd11TeacherHelpedStudentToSeatStatus ===
                                  "Yes" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd11TeacherHelpedStudentToSeatStatus ===
                                    "" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd21TeacherListenAndAskQuestionStatus ===
                                    "" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd22TeacherCheckedStudentParticipationStatus ===
                                    "" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd31TeacherHelpedStudentToShareStatus ===
                                    "" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "Yes" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "No" ||
                                  this.state
                                    .partBInd32TeacherInspiredStudentEffortStatus ===
                                    "")
                              ) {
                                this.setState({
                                  teacherStatus: "Priority 2",
                                });
                              } else {
                                this.setState({
                                  teacherStatus: "Priority 1",
                                });
                              }
                            }
                            // Set teacher status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
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
                              partBInd34TeacherAlloedStudentToBCONote: text,
                            })
                          }
                          value={
                            this.state.partBInd34TeacherAlloedStudentToBCONote +
                            ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>শিক্ষকের অবস্থা</Text>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 3, padding: 2 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      ইনডিকেটর অনুযায়ী শিক্ষকের অবস্থা
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
            <Text style={styles.bigRedText}>আলোচনা</Text>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ flex: 1, padding: 2 }}>
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
                  onPress={this.bestPracticeIndcoachingSupportIndPartB}
                >
                  <Text style={{ color: "#ffff" }}>Click to Generate</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ backgroundColor: "#ADD8E6", fontWeight: "bold" }}>
                শিক্ষককে পরামর্শ প্রদানের জন্য কিছু গুরুত্বপূর্ণ বিষয়
              </Text>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      শিক্ষক ভালো করেছেন এমন দু-তিনটি বিষয় উল্লেখ করুন:
                    </Text>
                  </View>
                </View>
                <Text></Text>
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
                      {this.state.bestPracticeIndicator1PartB}
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
                      {this.state.bestPracticeIndicator2PartB}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      কোন কোন ইন্ডিকেটরে আরো উন্নতির জন্য শিক্ষককে যত্নবান হতে
                      হবে উল্লেখ করুন ।
                    </Text>
                  </View>
                </View>
                <Text></Text>
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
                      {this.state.coachingSupportIndicator1PartB}
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
                      {this.state.coachingSupportIndicator2PartB}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>এর জন্য শিক্ষককে কী কী উদ্যোগ নিতে হবে?</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="১."
                      keyboardType="default"
                      editable={true}
                      onChangeText={(text) =>
                        this.setState({
                          agreedStatementTeacherPartB: text,
                        })
                      }
                      value={this.state.agreedStatementTeacherPartB + ""}
                    ></TextInput>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      এ কাজে শিক্ষককে সহযোগিতা করার জন্য এলএফ-কে কী কী উদ্যোগ
                      গ্রহণ করতে হবে?
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="২."
                      keyboardType="default"
                      editable={true}
                      onChangeText={(text) =>
                        this.setState({
                          agreedStatementLFPartB: text,
                        })
                      }
                      value={this.state.agreedStatementLFPartB + ""}
                    ></TextInput>
                  </View>
                </View>
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
                  marginTop: 40,
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
                  marginTop: 40,
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
