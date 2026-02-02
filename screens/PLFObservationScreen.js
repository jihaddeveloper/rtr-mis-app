//  Author: Mohammad Jihad Hossain
//  Create Date: 15/09/2025
//  Modify Date: 20/10/2025
//  Description: LFObservationScreen component

import React, { useRef } from "react";
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

const screenDimensions = Dimensions.get("screen");
const windowDimensions = Dimensions.get("window");

const { height } = screenDimensions.height / 2;
const { width } = screenDimensions.width / 2;

export default class PLFObservationScreen extends React.Component {
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
      allSchool: [],
      allTeacher: [],
      allEmployee: [],
      allOffice: [],
      allDesignation: [],
      allLibraryIndicator: [],
      allBanglaIndicator: [],
      allLibraryObservationData: [],
      allBanglaClassObservationData: [],
      allLFObservationData: [],
      //Preloaded Data

      // previous visit data of the bangla class
      preMonthData: [],
      // previous visit data of the bangla class

      // Duplicate data check

      duplicateLFObservationData: [],
      // Duplicate data check

      //button status
      buttonState: false,
      //button status

      isLoading: true,
      checked: false,
      option: "yes",
      choosenIndex: 0,

      // Date picker property

      time: new Date(Date.now()),
      mode: "date",
      show: false,
      startTime: "",
      endTime: "",
      // Date picker property

      // General data

      visitNo: 0,
      date: new Date(),
      // office: "",
      // project: "",
      district: "",
      upazilla: "",
      lf: "",
      lfName: "",
      lpo: "",
      lpoName: "",
      // school: "",

      rtrSchoolId: "",
      yearOfSupport: "",

      grade: "",
      section: "",
      month: "",
      year: "",
      schoolEntryTime: "",
      schoolExitTime: "",
      teachingTopic: "",
      teachingDay: "",

      visitor: "",
      visitorDesignation: "",

      note: "",

      pickerProject: "",
      pickerDistrict: "",
      pickerDistrictKey: "",
      pickerUpazilla: "",
      pickerUpazillaKey: "",
      pickerSchool: "",
      rtrSchoolId: "",
      yearOfSupport: "",
      pickerVisitor: "",
      pickerDesignation: "",
      pickerVisitorOffice: "",
      pickerLF: "",
      pickerLPO: "",
      pickerLFName: "",
      pickerLPOName: "",
      pickerMonth: "",
      pickerYear: "",

      // General data

      ind11IsCarriedAllMaterialStatus: "",
      ind11IsCarriedAllMaterialNote: "",

      ind12IsCheckedInRightTimeStatus: "",
      ind12IsCheckedInRightTimeNote: "",

      ind13IsObservedBanglaLibraryStatus: "",
      ind13IsObservedBanglaLibraryNote: "",

      ind14FeedbackSessionWithTeacherStatus: "",
      ind14FeedbackSessionWithTeacherNote: "",

      ind15MeetingWithHeadTeacherStatus: "",
      ind15MeetingWithHeadTeacherNote: "",

      ind16FilledAllFormProperlyStatus: "",
      ind16FilledAllFormProperlyNote: "",

      ind17ObservedClassSilentlyStatus: "",
      ind17ObservedClassSilentlyNote: "",

      ind21LFTeacherMaintainGoodRelationshipStatus: "",
      ind21LFTeacherMaintainGoodRelationshipNote: "",

      ind22LFDiscussGoodPracticeIndicatorStatus: "",
      ind22LFDiscussGoodPracticeIndicatorNote: "",

      ind23LFDiscussCoachingSupportIndicatorStatus: "",
      ind23LFDiscussCoachingSupportIndicatorNote: "",

      ind24LFDiscussLastFollowupIndicatorStatus: "",
      ind24LFDiscussLastFollowupIndicatorNote: "",

      ind25LFInstructIdealLessonStatus: "",
      ind25LFInstructIdealLessonNote: "",

      ind26LFObserveStudentOrGroupStatus: "",
      ind26LFObserveStudentOrGroupNote: "",

      ind27LFVerifyWorkbookStatus: "",
      ind27LFVerifyWorkbookNote: "",

      ind28LFTrack3StudentStatus: "",
      ind28LFTrack3StudentNote: "",

      ind29LFTeacherAgreedNextPlanStatus: "",
      ind29LFTeacherAgreedNextPlanNote: "",

      ind31LFIdentifyGoodImprovablePointStatus: "",
      ind31LFIdentifyGoodImprovablePointNote: "",

      ind32LFInstructDevelopmentPlanStatus: "",
      ind32LFInstructDevelopmentPlanNote: "",

      ind33LFDiscussAboutDevelopmentPlanStatus: "",
      ind33LFDiscussAboutDevelopmentPlanNote: "",

      ind34LFAllowToChangeTeachingPatternStatus: "",
      ind34LFAllowToChangeTeachingPatternNote: "",

      ind35LFAllowTeacherForDiscussionStatus: "",
      ind35LFAllowTeacherForDiscussionNote: "",

      bestPracticeIndicator1: "",
      bestPracticeIndicator2: "",
      bestPracticeIndicator3: "",

      bestPracticeIndicator1Details: "",
      bestPracticeIndicator2Details: "",
      bestPracticeIndicator3Details: "",

      lastFollowupIndicator1: "",
      lastFollowupIndicator2: "",
      lastFollowupIndicator3: "",

      coachingSupportIndicator1: "",
      coachingSupportIndicator2: "",
      coachingSupportIndicator1Details: "",
      coachingSupportIndicator2Details: "",

      coachingSupportLF: "",
      coachingSupportLPO: "",

      agreedStatement1: "",
      agreedStatement2: "",

      lfStatus: "",

      isChecked: "",
      isActive: "",
      isDeleted: "",

      // error message
      errorInd11: "",
      errorInd12: "",
      errorInd13: "",
      errorInd14: "",
      errorInd15: "",
      errorInd16: "",
      errorInd17: "",
      errorInd21: "",
      errorInd22: "",
      errorInd23: "",
      errorInd24: "",
      errorInd25: "",
      errorInd26: "",
      errorInd27: "",
      errorInd28: "",
      errorInd29: "",
      errorInd31: "",
      errorInd32: "",
      errorInd33: "",
      errorInd34: "",
      errorInd35: "",
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
        console.log("data synced");
      }
    });

    // this.getAllSchool();
    // this.getAllEmployee();
    // this.getAllTeacher();
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
    this.getAllLFObservation();

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

      visitor: "",
      visitorDesignation: "",

      note: "",

      // General data

      ind11IsCarriedAllMaterialStatus: "",
      ind11IsCarriedAllMaterialNote: "",

      ind12IsCheckedInRightTimeStatus: "",
      ind12IsCheckedInRightTimeNote: "",

      ind13IsObservedBanglaLibraryStatus: "",
      ind13IsObservedBanglaLibraryNote: "",

      ind14FeedbackSessionWithTeacherStatus: "",
      ind14FeedbackSessionWithTeacherNote: "",

      ind15MeetingWithHeadTeacherStatus: "",
      ind15MeetingWithHeadTeacherNote: "",

      ind16FilledAllFormProperlyStatus: "",
      ind16FilledAllFormProperlyNote: "",

      ind17ObservedClassSilentlyStatus: "",
      ind17ObservedClassSilentlyNote: "",

      ind21LFTeacherMaintainGoodRelationshipStatus: "",
      ind21LFTeacherMaintainGoodRelationshipNote: "",

      ind22LFDiscussGoodPracticeIndicatorStatus: "",
      ind22LFDiscussGoodPracticeIndicatorNote: "",

      ind23LFDiscussCoachingSupportIndicatorStatus: "",
      ind23LFDiscussCoachingSupportIndicatorNote: "",

      ind24LFDiscussLastFollowupIndicatorStatus: "",
      ind24LFDiscussLastFollowupIndicatorNote: "",

      ind25LFInstructIdealLessonStatus: "",
      ind25LFInstructIdealLessonNote: "",

      ind26LFObserveStudentOrGroupStatus: "",
      ind26LFObserveStudentOrGroupNote: "",

      ind27LFVerifyWorkbookStatus: "",
      ind27LFVerifyWorkbookNote: "",

      ind28LFTrack3StudentStatus: "",
      ind28LFTrack3StudentNote: "",

      ind29LFTeacherAgreedNextPlanStatus: "",
      ind29LFTeacherAgreedNextPlanNote: "",

      ind31LFIdentifyGoodImprovablePointStatus: "",
      ind31LFIdentifyGoodImprovablePointNote: "",

      ind32LFInstructDevelopmentPlanStatus: "",
      ind32LFInstructDevelopmentPlanNote: "",

      ind33LFDiscussAboutDevelopmentPlanStatus: "",
      ind33LFDiscussAboutDevelopmentPlanNote: "",

      ind34LFAllowToChangeTeachingPatternStatus: "",
      ind34LFAllowToChangeTeachingPatternNote: "",

      ind35LFAllowTeacherForDiscussionStatus: "",
      ind35LFAllowTeacherForDiscussionNote: "",

      bestPracticeIndicator1: "",
      bestPracticeIndicator2: "",
      bestPracticeIndicator3: "",

      bestPracticeIndicator1Details: "",
      bestPracticeIndicator2Details: "",
      bestPracticeIndicator3Details: "",

      lastFollowupIndicator1: "",
      lastFollowupIndicator2: "",
      lastFollowupIndicator3: "",

      coachingSupportIndicator1: "",
      coachingSupportIndicator2: "",
      coachingSupportIndicator1Details: "",
      coachingSupportIndicator2Details: "",

      coachingSupportLF: "",
      coachingSupportLPO: "",

      agreedStatement1: "",
      agreedStatement2: "",

      lfStatus: "",
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
      );
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

  // Get All Bangla Class Data
  getAllBanglaClassObservation = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/di-bangla-class",
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
  // Get All Bangla Class Data

  // Get All LFObservation Data
  getAllLFObservation = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/p-lf-observation",
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
        allLFObservationData: response.data,
        isLoading: false,
      });
      console.log(
        "All LFObservation Data: ",
        this.state.allLFObservationData.length,
      );
    } catch (error) {
      console.log(error);
    }
  };
  // Get All LFObservation Data

  // Register new LFObservation data
  saveLFObservation = async () => {
    const newLFObservation = {
      date: this.state.date,
      month: this.state.pickerMonth,
      year: this.state.pickerYear,
      rtrSchoolId: this.state.rtrSchoolId,
      yearOfSupport: this.state.yearOfSupport,
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
      grade: this.state.grade,
      section: this.state.section,
      schoolEntryTime: this.state.schoolEntryTime,
      schoolExitTime: this.state.schoolExitTime,

      visitor: this.state.visitor,
      visitorDesignation: this.state.visitorDesignation,

      note: this.state.note,

      lastFollowupIndicator1: this.state.lastFollowupIndicator1,
      lastFollowupIndicator2: this.state.lastFollowupIndicator2,

      ind11IsCarriedAllMaterialStatus:
        this.state.ind11IsCarriedAllMaterialStatus,
      ind11IsCarriedAllMaterialNote: this.state.ind11IsCarriedAllMaterialNote,

      ind12IsCheckedInRightTimeStatus:
        this.state.ind12IsCheckedInRightTimeStatus,
      ind12IsCheckedInRightTimeNote: this.state.ind12IsCheckedInRightTimeNote,

      ind13IsObservedBanglaLibraryStatus:
        this.state.ind13IsObservedBanglaLibraryStatus,
      ind13IsObservedBanglaLibraryNote:
        this.state.ind13IsObservedBanglaLibraryNote,

      ind14FeedbackSessionWithTeacherStatus:
        this.state.ind14FeedbackSessionWithTeacherStatus,
      ind14FeedbackSessionWithTeacherNote:
        this.state.ind14FeedbackSessionWithTeacherNote,

      ind15MeetingWithHeadTeacherStatus:
        this.state.ind15MeetingWithHeadTeacherStatus,
      ind15MeetingWithHeadTeacherNote:
        this.state.ind15MeetingWithHeadTeacherNote,

      ind16FilledAllFormProperlyStatus:
        this.state.ind16FilledAllFormProperlyStatus,
      ind16FilledAllFormProperlyNote: this.state.ind16FilledAllFormProperlyNote,

      ind17ObservedClassSilentlyStatus:
        this.state.ind17ObservedClassSilentlyStatus,
      ind17ObservedClassSilentlyNote: this.state.ind17ObservedClassSilentlyNote,

      ind21LFTeacherMaintainGoodRelationshipStatus:
        this.state.ind21LFTeacherMaintainGoodRelationshipStatus,
      ind21LFTeacherMaintainGoodRelationshipNote:
        this.state.ind21LFTeacherMaintainGoodRelationshipNote,

      ind22LFDiscussGoodPracticeIndicatorStatus:
        this.state.ind22LFDiscussGoodPracticeIndicatorStatus,
      ind22LFDiscussGoodPracticeIndicatorNote:
        this.state.ind22LFDiscussGoodPracticeIndicatorNote,

      ind23LFDiscussCoachingSupportIndicatorStatus:
        this.state.ind23LFDiscussCoachingSupportIndicatorStatus,
      ind23LFDiscussCoachingSupportIndicatorNote:
        this.state.ind23LFDiscussCoachingSupportIndicatorNote,

      ind24LFDiscussLastFollowupIndicatorStatus:
        this.state.ind24LFDiscussLastFollowupIndicatorStatus,
      ind24LFDiscussLastFollowupIndicatorNote:
        this.state.ind24LFDiscussLastFollowupIndicatorNote,

      ind25LFInstructIdealLessonStatus:
        this.state.ind25LFInstructIdealLessonStatus,
      ind25LFInstructIdealLessonNote: this.state.ind25LFInstructIdealLessonNote,

      ind26LFObserveStudentOrGroupStatus:
        this.state.ind26LFObserveStudentOrGroupStatus,
      ind26LFObserveStudentOrGroupNote:
        this.state.ind26LFObserveStudentOrGroupNote,

      ind27LFVerifyWorkbookStatus: this.state.ind27LFVerifyWorkbookStatus,
      ind27LFVerifyWorkbookNote: this.state.ind27LFVerifyWorkbookNote,

      ind28LFTrack3StudentStatus: this.state.ind28LFTrack3StudentStatus,
      ind28LFTrack3StudentNote: this.state.ind28LFTrack3StudentNote,

      ind29LFTeacherAgreedNextPlanStatus:
        this.state.ind29LFTeacherAgreedNextPlanStatus,
      ind29LFTeacherAgreedNextPlanNote:
        this.state.ind29LFTeacherAgreedNextPlanNote,

      ind31LFIdentifyGoodImprovablePointStatus:
        this.state.ind31LFIdentifyGoodImprovablePointStatus,
      ind31LFIdentifyGoodImprovablePointNote:
        this.state.ind31LFIdentifyGoodImprovablePointNote,

      ind32LFInstructDevelopmentPlanStatus:
        this.state.ind32LFInstructDevelopmentPlanStatus,
      ind32LFInstructDevelopmentPlanNote:
        this.state.ind32LFInstructDevelopmentPlanNote,

      ind33LFDiscussAboutDevelopmentPlanStatus:
        this.state.ind33LFDiscussAboutDevelopmentPlanStatus,
      ind33LFDiscussAboutDevelopmentPlanNote:
        this.state.ind33LFDiscussAboutDevelopmentPlanNote,

      ind34LFAllowToChangeTeachingPatternStatus:
        this.state.ind34LFAllowToChangeTeachingPatternStatus,
      ind34LFAllowToChangeTeachingPatternNote:
        this.state.ind34LFAllowToChangeTeachingPatternNote,

      ind35LFAllowTeacherForDiscussionStatus:
        this.state.ind35LFAllowTeacherForDiscussionStatus,
      ind35LFAllowTeacherForDiscussionNote:
        this.state.ind35LFAllowTeacherForDiscussionNote,

      bestPracticeIndicator1: this.state.bestPracticeIndicator1,
      bestPracticeIndicator2: this.state.bestPracticeIndicator2,

      coachingSupportIndicator1: this.state.coachingSupportIndicator1,
      coachingSupportIndicator2: this.state.coachingSupportIndicator2,

      coachingSupportLF: this.state.coachingSupportLF,
      coachingSupportLPO: this.state.coachingSupportLPO,

      agreedStatement1: this.state.agreedStatement1,
      agreedStatement2: this.state.agreedStatement2,

      lfStatus: this.state.lfStatus,
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
    if (this.state.date === "") {
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
    } else if (this.state.schoolEntryTime === "") {
      Alert.alert("Alert", "School entry time can not be empty");
      return;
    } else if (this.state.schoolExitTime === "") {
      Alert.alert("Alert", "School exit time can not be empty");
      return;
    } else if (this.state.grade === "") {
      Alert.alert("Alert", "Grade can not be empty");
      return;
    } else if (this.state.section === "") {
      Alert.alert("Alert", "Section can not be empty");
      return;
    } else if (this.state.ind11IsCarriedAllMaterialStatus === "") {
      Alert.alert("Alert", "Indicator-1.1 can not be empty");
      return;
    } else if (this.state.ind12IsCheckedInRightTimeStatus === "") {
      Alert.alert("Alert", "Indicator-1.2 can not be empty");
      return;
    } else if (this.state.ind13IsObservedBanglaLibraryStatus === "") {
      Alert.alert("Alert", "Indicator-1.3 can not be empty");
      return;
    } else if (this.state.ind14FeedbackSessionWithTeacherStatus === "") {
      Alert.alert("Alert", "Indicator-1.4 can not be empty");
      return;
    } else if (this.state.ind15MeetingWithHeadTeacherStatus === "") {
      Alert.alert("Alert", "Indicator-1.5 can not be empty");
      return;
    } else if (this.state.ind16FilledAllFormProperlyStatus === "") {
      Alert.alert("Alert", "Indicator-1.6 can not be empty");
      return;
    } else if (this.state.ind17ObservedClassSilentlyStatus === "") {
      Alert.alert("Alert", "Indicator-1.7 can not be empty");
      return;
    } else if (this.state.ind21LFTeacherMaintainGoodRelationshipStatus === "") {
      Alert.alert("Alert", "Indicator-2.1 can not be empty");
      return;
    } else if (this.state.ind22LFDiscussGoodPracticeIndicatorStatus === "") {
      Alert.alert("Alert", "Indicator-2.2 can not be empty");
      return;
    } else if (this.state.ind23LFDiscussCoachingSupportIndicatorStatus === "") {
      Alert.alert("Alert", "Indicator-2.3 can not be empty");
      return;
    } else if (this.state.ind24LFDiscussLastFollowupIndicatorStatus === "") {
      Alert.alert("Alert", "Indicator-2.4 can not be empty");
      return;
    } else if (this.state.ind25LFInstructIdealLessonStatus === "") {
      Alert.alert("Alert", "Indicator-2.5 can not be empty");
      return;
    } else if (this.state.ind26LFObserveStudentOrGroupStatus === "") {
      Alert.alert("Alert", "Indicator-2.6 can not be empty");
      return;
    } else if (this.state.ind27LFVerifyWorkbookStatus === "") {
      Alert.alert("Alert", "Indicator-2.7 can not be empty");
      return;
    } else if (this.state.ind28LFTrack3StudentStatus === "") {
      Alert.alert("Alert", "Indicator-2.8 can not be empty");
      return;
    } else if (this.state.ind29LFTeacherAgreedNextPlanStatus === "") {
      Alert.alert("Alert", "Indicator-2.9 can not be empty");
      return;
    } else if (this.state.ind31LFIdentifyGoodImprovablePointStatus === "") {
      Alert.alert("Alert", "Indicator-3.1 can not be empty");
      return;
    } else if (this.state.ind32LFInstructDevelopmentPlanStatus === "") {
      Alert.alert("Alert", "Indicator-3.2 can not be empty");
      return;
    } else if (this.state.ind33LFDiscussAboutDevelopmentPlanStatus === "") {
      Alert.alert("Alert", "Indicator-3.3 can not be empty");
      return;
    } else if (this.state.ind34LFAllowToChangeTeachingPatternStatus === "") {
      Alert.alert("Alert", "Indicator-3.4 can not be empty");
      return;
    } else if (this.state.ind35LFAllowTeacherForDiscussionStatus === "") {
      Alert.alert("Alert", "Indicator-3.5 can not be empty");
      return;
    } else if (this.state.lastFollowupIndicator1 === "") {
      Alert.alert("Alert", "Follow-up can not be empty");
      return;
    } else if (this.state.coachingSupportLF === "") {
      Alert.alert("Alert", "LF to do can not be empty");
      return;
    } else if (this.state.coachingSupportLPO === "") {
      Alert.alert("Alert", "LPO to do can not be empty");
      return;
    } else if (this.state.duplicateLFObservationData.length > 0) {
      Alert.alert("Alert", "Duplicate Bangla Class data !!");
      return;
    } else {
      // Set error message empty

      // Send data to API
      try {
        let response = await fetch(
          "http://118.179.80.51:8080/api/v1/p-lf-observation",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newLFObservation),
          },
        );
        if (response.status >= 200 && response.status < 300) {
          Alert.alert("Alert", "LF obsvervatio data saved successfully!!!");
          this.updateToInitialState();
        } else {
          Alert.alert("Alert", "Error to save data online !!!");
          console.log("newLFObservation: " + JSON.stringify(newLFObservation));
          console.log("response: " + response.status);
          // Offline: Store data locally
          this.storeLocally();
        }
      } catch (errors) {
        alert(errors);
        // Offline: Store data locally
        this.storeLocally();
        console.log("errors: " + errors);
      }
      // Send data to API
    }
  };
  // Register new LFObservation Data

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
        onPress: this.saveLFObservation,
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
      rtrSchoolId: this.state.rtrSchoolId,
      yearOfSupport: this.state.yearOfSupport,
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
      grade: this.state.grade,
      section: this.state.section,
      schoolEntryTime: this.state.schoolEntryTime,
      schoolExitTime: this.state.schoolExitTime,

      visitor: this.state.visitor,
      visitorDesignation: this.state.visitorDesignation,

      note: this.state.note,

      lastFollowupIndicator1: this.state.lastFollowupIndicator1,
      lastFollowupIndicator2: this.state.lastFollowupIndicator2,

      ind11IsCarriedAllMaterialStatus:
        this.state.ind11IsCarriedAllMaterialStatus,
      ind11IsCarriedAllMaterialNote: this.state.ind11IsCarriedAllMaterialNote,

      ind12IsCheckedInRightTimeStatus:
        this.state.ind12IsCheckedInRightTimeStatus,
      ind12IsCheckedInRightTimeNote: this.state.ind12IsCheckedInRightTimeNote,

      ind13IsObservedBanglaLibraryStatus:
        this.state.ind13IsObservedBanglaLibraryStatus,
      ind13IsObservedBanglaLibraryNote:
        this.state.ind13IsObservedBanglaLibraryNote,

      ind14FeedbackSessionWithTeacherStatus:
        this.state.ind14FeedbackSessionWithTeacherStatus,
      ind14FeedbackSessionWithTeacherNote:
        this.state.ind14FeedbackSessionWithTeacherNote,

      ind15MeetingWithHeadTeacherStatus:
        this.state.ind15MeetingWithHeadTeacherStatus,
      ind15MeetingWithHeadTeacherNote:
        this.state.ind15MeetingWithHeadTeacherNote,

      ind16FilledAllFormProperlyStatus:
        this.state.ind16FilledAllFormProperlyStatus,
      ind16FilledAllFormProperlyNote: this.state.ind16FilledAllFormProperlyNote,

      ind17ObservedClassSilentlyStatus:
        this.state.ind17ObservedClassSilentlyStatus,
      ind17ObservedClassSilentlyNote: this.state.ind17ObservedClassSilentlyNote,

      ind21LFTeacherMaintainGoodRelationshipStatus:
        this.state.ind21LFTeacherMaintainGoodRelationshipStatus,
      ind21LFTeacherMaintainGoodRelationshipNote:
        this.state.ind21LFTeacherMaintainGoodRelationshipNote,

      ind22LFDiscussGoodPracticeIndicatorStatus:
        this.state.ind22LFDiscussGoodPracticeIndicatorStatus,
      ind22LFDiscussGoodPracticeIndicatorNote:
        this.state.ind22LFDiscussGoodPracticeIndicatorNote,

      ind23LFDiscussCoachingSupportIndicatorStatus:
        this.state.ind23LFDiscussCoachingSupportIndicatorStatus,
      ind23LFDiscussCoachingSupportIndicatorNote:
        this.state.ind23LFDiscussCoachingSupportIndicatorNote,

      ind24LFDiscussLastFollowupIndicatorStatus:
        this.state.ind24LFDiscussLastFollowupIndicatorStatus,
      ind24LFDiscussLastFollowupIndicatorNote:
        this.state.ind24LFDiscussLastFollowupIndicatorNote,

      ind25LFInstructIdealLessonStatus:
        this.state.ind25LFInstructIdealLessonStatus,
      ind25LFInstructIdealLessonNote: this.state.ind25LFInstructIdealLessonNote,

      ind26LFObserveStudentOrGroupStatus:
        this.state.ind26LFObserveStudentOrGroupStatus,
      ind26LFObserveStudentOrGroupNote:
        this.state.ind26LFObserveStudentOrGroupNote,

      ind27LFVerifyWorkbookStatus: this.state.ind27LFVerifyWorkbookStatus,
      ind27LFVerifyWorkbookNote: this.state.ind27LFVerifyWorkbookNote,

      ind28LFTrack3StudentStatus: this.state.ind28LFTrack3StudentStatus,
      ind28LFTrack3StudentNote: this.state.ind28LFTrack3StudentNote,

      ind29LFTeacherAgreedNextPlanStatus:
        this.state.ind29LFTeacherAgreedNextPlanStatus,
      ind29LFTeacherAgreedNextPlanNote:
        this.state.ind29LFTeacherAgreedNextPlanNote,

      ind31LFIdentifyGoodImprovablePointStatus:
        this.state.ind31LFIdentifyGoodImprovablePointStatus,
      ind31LFIdentifyGoodImprovablePointNote:
        this.state.ind31LFIdentifyGoodImprovablePointNote,

      ind32LFInstructDevelopmentPlanStatus:
        this.state.ind32LFInstructDevelopmentPlanStatus,
      ind32LFInstructDevelopmentPlanNote:
        this.state.ind32LFInstructDevelopmentPlanNote,

      ind33LFDiscussAboutDevelopmentPlanStatus:
        this.state.ind33LFDiscussAboutDevelopmentPlanStatus,
      ind33LFDiscussAboutDevelopmentPlanNote:
        this.state.ind33LFDiscussAboutDevelopmentPlanNote,

      ind34LFAllowToChangeTeachingPatternStatus:
        this.state.ind34LFAllowToChangeTeachingPatternStatus,
      ind34LFAllowToChangeTeachingPatternNote:
        this.state.ind34LFAllowToChangeTeachingPatternNote,

      ind35LFAllowTeacherForDiscussionStatus:
        this.state.ind35LFAllowTeacherForDiscussionStatus,
      ind35LFAllowTeacherForDiscussionNote:
        this.state.ind35LFAllowTeacherForDiscussionNote,

      bestPracticeIndicator1: this.state.bestPracticeIndicator1,
      bestPracticeIndicator2: this.state.bestPracticeIndicator2,

      coachingSupportIndicator1: this.state.coachingSupportIndicator1,
      coachingSupportIndicator2: this.state.coachingSupportIndicator2,

      coachingSupportLF: this.state.coachingSupportLF,
      coachingSupportLPO: this.state.coachingSupportLPO,

      agreedStatement1: this.state.agreedStatement1,
      agreedStatement2: this.state.agreedStatement2,

      lfStatus: this.state.lfStatus,
    };

    // Validation
    if (this.state.date === "") {
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
    } else if (this.state.schoolEntryTime === "") {
      Alert.alert("Alert", "School entry time can not be empty");
      return;
    } else if (this.state.schoolExitTime === "") {
      Alert.alert("Alert", "School exit time can not be empty");
      return;
    } else if (this.state.grade === "") {
      Alert.alert("Alert", "Grade can not be empty");
      return;
    } else if (this.state.section === "") {
      Alert.alert("Alert", "Section can not be empty");
      return;
    } else if (this.state.ind11IsCarriedAllMaterialStatus === "") {
      Alert.alert("Alert", "Indicator-1.1 can not be empty");
      return;
    } else if (this.state.ind12IsCheckedInRightTimeStatus === "") {
      Alert.alert("Alert", "Indicator-1.2 can not be empty");
      return;
    } else if (this.state.ind13IsObservedBanglaLibraryStatus === "") {
      Alert.alert("Alert", "Indicator-1.3 can not be empty");
      return;
    } else if (this.state.ind14FeedbackSessionWithTeacherStatus === "") {
      Alert.alert("Alert", "Indicator-1.4 can not be empty");
      return;
    } else if (this.state.ind15MeetingWithHeadTeacherStatus === "") {
      Alert.alert("Alert", "Indicator-1.5 can not be empty");
      return;
    } else if (this.state.ind16FilledAllFormProperlyStatus === "") {
      Alert.alert("Alert", "Indicator-1.6 can not be empty");
      return;
    } else if (this.state.ind17ObservedClassSilentlyStatus === "") {
      Alert.alert("Alert", "Indicator-1.7 can not be empty");
      return;
    } else if (this.state.ind21LFTeacherMaintainGoodRelationshipStatus === "") {
      Alert.alert("Alert", "Indicator-2.1 can not be empty");
      return;
    } else if (this.state.ind22LFDiscussGoodPracticeIndicatorStatus === "") {
      Alert.alert("Alert", "Indicator-2.2 can not be empty");
      return;
    } else if (this.state.ind23LFDiscussCoachingSupportIndicatorStatus === "") {
      Alert.alert("Alert", "Indicator-2.3 can not be empty");
      return;
    } else if (this.state.ind24LFDiscussLastFollowupIndicatorStatus === "") {
      Alert.alert("Alert", "Indicator-2.4 can not be empty");
      return;
    } else if (this.state.ind25LFInstructIdealLessonStatus === "") {
      Alert.alert("Alert", "Indicator-2.5 can not be empty");
      return;
    } else if (this.state.ind26LFObserveStudentOrGroupStatus === "") {
      Alert.alert("Alert", "Indicator-2.6 can not be empty");
      return;
    } else if (this.state.ind27LFVerifyWorkbookStatus === "") {
      Alert.alert("Alert", "Indicator-2.7 can not be empty");
      return;
    } else if (this.state.ind28LFTrack3StudentStatus === "") {
      Alert.alert("Alert", "Indicator-2.8 can not be empty");
      return;
    } else if (this.state.ind29LFTeacherAgreedNextPlanStatus === "") {
      Alert.alert("Alert", "Indicator-2.9 can not be empty");
      return;
    } else if (this.state.ind31LFIdentifyGoodImprovablePointStatus === "") {
      Alert.alert("Alert", "Indicator-3.1 can not be empty");
      return;
    } else if (this.state.ind32LFInstructDevelopmentPlanStatus === "") {
      Alert.alert("Alert", "Indicator-3.2 can not be empty");
      return;
    } else if (this.state.ind33LFDiscussAboutDevelopmentPlanStatus === "") {
      Alert.alert("Alert", "Indicator-3.3 can not be empty");
      return;
    } else if (this.state.ind34LFAllowToChangeTeachingPatternStatus === "") {
      Alert.alert("Alert", "Indicator-3.4 can not be empty");
      return;
    } else if (this.state.ind35LFAllowTeacherForDiscussionStatus === "") {
      Alert.alert("Alert", "Indicator-3.5 can not be empty");
      return;
    } else if (this.state.lastFollowupIndicator1 === "") {
      Alert.alert("Alert", "Follow-up can not be empty");
      return;
    } else if (this.state.coachingSupportLF === "") {
      Alert.alert("Alert", "LF to do can not be empty");
      return;
    } else if (this.state.coachingSupportLPO === "") {
      Alert.alert("Alert", "LPO to do can not be empty");
      return;
    } else if (this.state.duplicateLFObservationData.length > 0) {
      Alert.alert("Alert", "Duplicate LFObservation data !!");
      return;
    } else {
      // Save data locally
      try {
        const existingData = await AsyncStorage.getItem(
          "offlineFormsPLFObservation",
        );
        const forms = existingData ? JSON.parse(existingData) : [];
        forms.push(formData);
        await AsyncStorage.setItem(
          "offlineFormsPLFObservation",
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
      // Save data locally
    }
  };
  // Save form data locally

  // Sync stored data
  syncPendingData = async () => {
    try {
      const existingData = await AsyncStorage.getItem(
        "offlineFormsPLFObservation",
      );
      if (existingData) {
        const formsToSync = JSON.parse(existingData);
        for (const formData of formsToSync) {
          await fetch("http://118.179.80.51:8080/api/v1/p-lf-observation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
        }
        console.log("LF Data syncing");
        await AsyncStorage.removeItem("offlineFormsPLFObservation"); // Clear synced data
        console.log(
          "Pending data synced successfully: " + JSON.parse(existingData),
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
  bestPracticeIndcoachingSupportInd = () => {
    // Setup CoachingSupport
    const variablesInd = [
      this.state.ind11IsCarriedAllMaterialStatus,
      this.state.ind12IsCheckedInRightTimeStatus,
      this.state.ind13IsObservedBanglaLibraryStatus,
      this.state.ind14FeedbackSessionWithTeacherStatus,
      this.state.ind15MeetingWithHeadTeacherStatus,
      this.state.ind16FilledAllFormProperlyStatus,
      this.state.ind17ObservedClassSilentlyStatus,
      this.state.ind21LFTeacherMaintainGoodRelationshipStatus,
      this.state.ind22LFDiscussGoodPracticeIndicatorStatus,
      this.state.ind23LFDiscussCoachingSupportIndicatorStatus,
      this.state.ind24LFDiscussLastFollowupIndicatorStatus,
      this.state.ind25LFInstructIdealLessonStatus,
      this.state.ind26LFObserveStudentOrGroupStatus,
      this.state.ind27LFVerifyWorkbookStatus,
      this.state.ind28LFTrack3StudentStatus,
      this.state.ind29LFTeacherAgreedNextPlanStatus,
      this.state.ind31LFIdentifyGoodImprovablePointStatus,
      this.state.ind32LFInstructDevelopmentPlanStatus,
      this.state.ind33LFDiscussAboutDevelopmentPlanNote,
      this.state.ind34LFAllowToChangeTeachingPatternStatus,
      this.state.ind35LFAllowTeacherForDiscussionStatus,
    ];

    const variablesIndValue = [
      "১ক. এলএফ প্রয়োজনীয় উপকরণ সঙ্গে এনেছেন (বিদ্যালয় পরিদর্শন রেকর্ড ফরম, বাংলা ক্লাস পর্যবেক্ষণ ফরম, শিক্ষক সহায়িকা)।",
      "১খ. এলএফ পরিদর্শনের জন্য সঠিক সময়ে বিদ্যালয়ে উপস্থিত হয়েছেন।",
      "১গ. এলএফ প্রথম এবং/অথবা দ্বিতীয় শ্রেণির পুরো বাংলা ক্লাস পর্যবেক্ষণ করছেন এবং একটি শ্রেণির পাঠাগার কার্যক্রম পর্যবেক্ষণ করেছেন।",
      "১ঘ. এলএফ যেসব ক্লাস পর্যবেক্ষণ করেছেন ঐসব ক্লাসের প্রত্যেক শিক্ষকের সাথে একটি করে ফিডব্যাক মিটিং করেছেন।",
      "১ঙ. এলএফ উক্ত বিদ্যালয়ের প্রধান শিক্ষকের সাথে প্রয়োজনীয় মিটিং করেছেন।",
      "১চ. এলএফ প্রয়োজনীয় সকল ফরম ঠিকমতো পূরণ করেছেন।",
      "১ছ. এলএফ শিক্ষকের পাঠদান বাধাগ্রস্ত না করে নীরবে পাঠদান পর্যবেক্ষণ করেছেন (আলোচনার ভিত্তিতে আদর্শ পাঠদান ব্যতিরেকে)।",
      "২ক. এলএফ ও শিক্ষকের মধ্যে ভালো সম্পর্ক বিদ্যমান এবং তারা বন্ধুত্বপূর্ণ সম্পর্ক বজায় রেখে কথা বলেছেন।",
      "২খ. এলএফ একটি বা দুটি ইতিবাচক ও গঠনমূলক মতামত প্রদান করেছেন।",
      "২গ. পাঠদান পর্যবেক্ষণ ফরমে 'না' বা 'আংশিক' চিহ্নিত হয়েছে এমন বিষয়ের উপর এলএফ শিক্ষককে গঠনমূলক পরামর্শ দিয়েছেন।",
      "২ঘ. ফিডব্যাক মিটিং-এর সময় এলএফ গত পর্যবেক্ষণ ফর্ম রিভিউ করেছেন এবং গত পর্যবেক্ষণে যেসব বিষয়ে উন্নতি করা প্রয়োজন বলে চিহ্নিত হয়েছিল তা নিয়ে আলোচনা করেছেন।",
      "২ঙ. এলএফ যদি কোনো আদর্শ পাঠ উপস্থাপন করে থাকেন তবে তিনি সেই পাঠের সকল অংশ ধাপে ধাপে দেখিয়েছেন।",
      "২চ. শিক্ষার্থীরা বড় দলে বা একা একা কাজ করার সময় এলএফ শ্রেণিকক্ষে ঘুরে ঘুরে দেখেছেন।",
      "২ছ. গত পরিদর্শনের পর পরিকল্পনা অনুযায়ী পাঠদান এগিয়েছে কিনা তা বোঝার জন্য এলএফ শিক্ষার্থীদের ওয়ার্কবুক যাচাই করেছেন।",
      "২জ. এলএফ তাৎক্ষণিকভাবে ৩ জন শিক্ষার্থীর অনানুষ্ঠানিক মূল্যায়ন করেছেন।",
      "২ঝ. এলএফ ও শিক্ষক পরবর্তী কাজ বা পাঠের বিষয়ে একমত হয়েছেন।",
      "৩ক. এলএফ পর্যবেক্ষণের মাধ্যমে শিক্ষকদের সফল দিক এবং উন্নয়ন প্রয়োজন এমন দিকগুলো চিহ্নিত করেছেন।",
      "৩খ. এলএফ শিক্ষককে সুনির্দিষ্ট পরামর্শ দিয়েছেন যার মধ্যে রয়েছে শিক্ষকের কাঙ্খিত উন্নয়নের ক্ষেত্র।",
      "৩গ. কেন এই কাঙ্খিত উন্নয়ন প্রয়োজন এলএফ তা ব্যাখ্যা করতে সক্ষম হয়েছেন।",
      "৩ঘ. এলএফ শিক্ষকের সাথে আলোচনার সময় পাঠদানের কাঙ্খিত পরিবর্তন চর্চা করার সুযোগ দিয়েছেন।",
      "৩ঙ. কি ভালো চলছে বা কি কি উন্নতি দরকার এলএফ প্রশ্ন করার মাধ্যমে শিক্ষককে তা বলার সুযোগ দিয়েছেন।",
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

    // Setup BestPractice test2
    if (
      this.state.lfStatus === "Priority 3" ||
      this.state.lfStatus === "Priority 2"
    ) {
      const variables = [
        this.state.ind35LFAllowTeacherForDiscussionStatus,
        this.state.ind34LFAllowToChangeTeachingPatternStatus,
        this.state.ind33LFDiscussAboutDevelopmentPlanStatus,
        this.state.ind32LFInstructDevelopmentPlanStatus,
        this.state.ind31LFIdentifyGoodImprovablePointStatus,
      ];

      const variables2 = [
        "৩ঙ. কি ভালো চলছে বা কি কি উন্নতি দরকার এলএফ প্রশ্ন করার মাধ্যমে শিক্ষককে তা বলার সুযোগ দিয়েছেন।",
        "৩ঘ. এলএফ শিক্ষকের সাথে আলোচনার সময় পাঠদানের কাঙ্খিত পরিবর্তন চর্চা করার সুযোগ দিয়েছেন।",
        "৩গ. কেন এই কাঙ্খিত উন্নয়ন প্রয়োজন এলএফ তা ব্যাখ্যা করতে সক্ষম হয়েছেন।",
        "৩খ. এলএফ শিক্ষককে সুনির্দিষ্ট পরামর্শ দিয়েছেন যার মধ্যে রয়েছে শিক্ষকের কাঙ্খিত উন্নয়নের ক্ষেত্র।",
        "৩ক. এলএফ পর্যবেক্ষণের মাধ্যমে শিক্ষকদের সফল দিক এবং উন্নয়ন প্রয়োজন এমন দিকগুলো চিহ্নিত করেছেন।",
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
    } else if (this.state.lfStatus === "Priority 1") {
      const variables = [
        this.state.ind29LFTeacherAgreedNextPlanStatus,
        this.state.ind28LFTrack3StudentStatus,
        this.state.ind27LFVerifyWorkbookStatus,
        this.state.ind26LFObserveStudentOrGroupStatus,
        this.state.ind25LFInstructIdealLessonStatus,
        this.state.ind24LFDiscussLastFollowupIndicatorStatus,
        this.state.ind23LFDiscussCoachingSupportIndicatorStatus,
        this.state.ind22LFDiscussGoodPracticeIndicatorStatus,
        this.state.ind21LFTeacherMaintainGoodRelationshipStatus,
      ];

      const variables2 = [
        "২ঝ. এলএফ ও শিক্ষক পরবর্তী কাজ বা পাঠের বিষয়ে একমত হয়েছেন।",
        "২জ. এলএফ তাৎক্ষণিকভাবে ৩ জন শিক্ষার্থীর অনানুষ্ঠানিক মূল্যায়ন করেছেন।",
        "২ছ. গত পরিদর্শনের পর পরিকল্পনা অনুযায়ী পাঠদান এগিয়েছে কিনা তা বোঝার জন্য এলএফ শিক্ষার্থীদের ওয়ার্কবুক যাচাই করেছেন।",
        "২চ. শিক্ষার্থীরা বড় দলে বা একা একা কাজ করার সময় এলএফ শ্রেণিকক্ষে ঘুরে ঘুরে দেখেছেন।",
        "২ঙ. এলএফ যদি কোনো আদর্শ পাঠ উপস্থাপন করে থাকেন তবে তিনি সেই পাঠের সকল অংশ ধাপে ধাপে দেখিয়েছেন।",
        "২ঘ. ফিডব্যাক মিটিং-এর সময় এলএফ গত পর্যবেক্ষণ ফর্ম রিভিউ করেছেন এবং গত পর্যবেক্ষণে যেসব বিষয়ে উন্নতি করা প্রয়োজন বলে চিহ্নিত হয়েছিল তা নিয়ে আলোচনা করেছেন।",
        "২গ. পাঠদান পর্যবেক্ষণ ফরমে 'না' বা 'আংশিক' চিহ্নিত হয়েছে এমন বিষয়ের উপর এলএফ শিক্ষককে গঠনমূলক পরামর্শ দিয়েছেন।",
        "২খ. এলএফ একটি বা দুটি ইতিবাচক ও গঠনমূলক মতামত প্রদান করেছেন।",
        "২ক. এলএফ ও শিক্ষকের মধ্যে ভালো সম্পর্ক বিদ্যমান এবং তারা বন্ধুত্বপূর্ণ সম্পর্ক বজায় রেখে কথা বলেছেন।",
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
    }
    // Setup BestPractice test2
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

      employee,
      school,
      teacher,
      office,
      project,

      ind11IsCarriedAllMaterialStatus,
      ind11IsCarriedAllMaterialNote,

      ind12IsCheckedInRightTimeStatus,
      ind12IsCheckedInRightTimeNote,

      ind13IsObservedBanglaLibraryStatus,
      ind13IsObservedBanglaLibraryNote,

      ind14FeedbackSessionWithTeacherStatus,
      ind14FeedbackSessionWithTeacherNote,

      ind15MeetingWithHeadTeacherStatus,
      ind15MeetingWithHeadTeacherNote,

      ind16FilledAllFormProperlyStatus,
      ind16FilledAllFormProperlyNote,

      ind17ObservedClassSilentlyStatus,
      ind17ObservedClassSilentlyNote,

      ind21LFTeacherMaintainGoodRelationshipStatus,
      ind21LFTeacherMaintainGoodRelationshipNote,

      ind22LFDiscussGoodPracticeIndicatorStatus,
      ind22LFDiscussGoodPracticeIndicatorNote,

      ind23LFDiscussCoachingSupportIndicatorStatus,
      ind23LFDiscussCoachingSupportIndicatorNote,

      ind24LFDiscussLastFollowupIndicatorStatus,
      ind24LFDiscussLastFollowupIndicatorNote,

      ind25LFInstructIdealLessonStatus,
      ind25LFInstructIdealLessonNote,

      ind26LFObserveStudentOrGroupStatus,
      ind26LFObserveStudentOrGroupNote,

      ind27LFVerifyWorkbookStatus,
      ind27LFVerifyWorkbookNote,

      ind28LFTrack3StudentStatus,
      ind28LFTrack3StudentNote,

      ind29LFTeacherAgreedNextPlanStatus,
      ind29LFTeacherAgreedNextPlanNote,

      ind31LFIdentifyGoodImprovablePointStatus,
      ind31LFIdentifyGoodImprovablePointNote,

      ind32LFInstructDevelopmentPlanStatus,
      ind32LFInstructDevelopmentPlanNote,

      ind33LFDiscussAboutDevelopmentPlanStatus,
      ind33LFDiscussAboutDevelopmentPlanNote,

      ind34LFAllowToChangeTeachingPatternStatus,
      ind34LFAllowToChangeTeachingPatternNote,

      ind35LFAllowTeacherForDiscussionStatus,
      ind35LFAllowTeacherForDiscussionNote,

      bestPracticeIndicator1,
      bestPracticeIndicator2,
      bestPracticeIndicator3,

      bestPracticeIndicator1Details,
      bestPracticeIndicator2Details,
      bestPracticeIndicator3Details,

      lastFollowupIndicator1,
      lastFollowupIndicator2,
      lastFollowupIndicator3,

      coachingSupportIndicator1,
      coachingSupportIndicator2,
      coachingSupportIndicator1Details,
      coachingSupportIndicator2Details,

      coachingSupportLF,
      coachingSupportLPO,

      agreedStatement1,
      agreedStatement2,

      lfStatus,

      isChecked,
      isActive,
      isDeleted,
    } = this.state;
    // For Datepicker

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 10 }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
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
                PREVAIL এলএফ পর্যবেক্ষণ ফরম (বাংলা ও এসআরএম ক্লাস)
              </Text>
            </View>
          </View>
          <View style={{ padding: 10 }}>
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

              <View style={{ flexDirection: "row", padding: 2, margin: 2 }}>
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
                      //console.log(this.state.pickerDistrict.name);
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
                      এলপিও'র নাম: (LPO:)
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
                        // item.project === this.state.pickerProject
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
                      এলএফ'র নাম: (LF:)
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
                <View style={{ flex: 3 }}>
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
                      width: 360,
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
                      height: 40,
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
                      height: 40,
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
                      শ্রেণী: (Grade:)
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
                      height: 50,
                      width: 150,
                    }}
                    enabled={true}
                    selectedValue={this.state.grade}
                    onValueChange={(value) => {
                      this.setState({ grade: value });

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
                      // console.log("preMonthData: " + this.state.preMonthData);
                      // console.log(
                      //   "this.state.pickerSchool : " + this.state.pickerSchool
                      // );

                      // console.log(
                      //   "this.state.pickerProject : " + this.state.pickerProject
                      // );

                      // console.log(
                      //   "this.state.pickerYear : " + this.state.pickerYear
                      // );

                      // console.log(
                      //   "this.state.pickerMonth : " + this.state.pickerMonth
                      // );

                      // console.log("this.state.grade : " + this.state.grade);

                      // console.log(
                      //   "this.state.classTeacher : " + this.state.classTeacher
                      // );

                      // console.log(
                      //   "parseInt(this.state.visitNo) : " +
                      //     parseInt(parseInt(this.state.visitNo) - 1)
                      // );

                      //console.log("preMonthData: " + this.state.preMonthData);
                      // Find perivious visit data
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"PP"} value={"PP"} />
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
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          এলএফ'র বিদ্যালয়ে পৌছার সময়: (Start Time:)
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
                          height: 30,
                          width: 170,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="default"
                        placeholder=""
                        editable={true}
                        onChangeText={(text) =>
                          this.setState({ schoolEntryTime: text })
                        }
                        value={this.state.schoolEntryTime + ""}
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
                          এলএফ'র বিদ্যালয়ে প্রস্থানের সময়: (End Time:)
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
                          height: 30,
                          width: 170,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="default"
                        placeholder=""
                        editable={true}
                        onChangeText={(text) =>
                          this.setState({ schoolExitTime: text })
                        }
                        value={this.state.schoolExitTime + ""}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: "row", padding: 2, margin: 2 }}>
                <View style={{ flex: 2 }}>
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
              <Text style={{ justifyContent: "flex-end" }}>
                ফলো-আপ করার জন্য গত পরিদর্শন থেকে প্রাপ্ত ১-২ টি বিষয় উল্লেখ
                করুন যেখানে উন্নতি প্রয়োজন ছিল:
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <View style={{ padding: 5 }}>
                    <Text>১.</Text>

                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      value={this.state.lastFollowupTopic1 + ""}
                    ></TextInput>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ padding: 5 }}>
                    <Text>২.</Text>

                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      value={this.state.lastFollowupTopic2 + ""}
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
                  প্রায়োরিটি এরিয়া - ১: কোচিং রুটিন অনুসরণ
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
                      ১ক. এলএফ প্রয়োজনীয় উপকরণ সঙ্গে এনেছেন (বিদ্যালয়
                      পরিদর্শন রেকর্ড ফরম, বাংলা ক্লাস পর্যবেক্ষণ ফরম, শিক্ষক
                      সহায়িকা)
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
                            this.state.ind11IsCarriedAllMaterialStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind11IsCarriedAllMaterialStatus: value,
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

                            // Set LF status
                            if (
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set lf status

                            // Setup BestPractice
                            // if (
                            //   this.state.lfStatus === "Priority 2" ||
                            //   this.state.lfStatus === "Priority 3"
                            // ) {
                            //   if (
                            //     this.state
                            //       .ind35LFAllowTeacherForDiscussionStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeIndicator1:
                            //         "৩ঙ. কি ভালো চলছে বা কি কি উন্নতি দরকার এলএফ প্রশ্ন করার মাধ্যমে শিক্ষককে তা বলার সুযোগ দিয়েছেন।",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind34LFAllowToChangeTeachingPatternStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeIndicator1:
                            //         "৩ঘ. এলএফ শিক্ষকের সাথে আলোচনার সময় পাঠদানের কাঙ্খিত পরিবর্তন চর্চা করার সুযোগ দিয়েছেন।",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind33LFDiscussAboutDevelopmentPlanStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeIndicator1:
                            //         "৩গ. কেন এই কাঙ্খিত উন্নয়ন প্রয়োজন এলএফ তা ব্যাখ্যা করতে সক্ষম হয়েছেন।",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind32LFInstructDevelopmentPlanStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeIndicator1:
                            //         "৩খ. এলএফ শিক্ষককে সুনির্দিষ্ট পরামর্শ দিয়েছেন যার মধ্যে রয়েছে শিক্ষকের কাঙ্খিত উন্নয়নের ক্ষেত্র।",
                            //       bestPracticeInd2: "",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind31LFIdentifyGoodImprovablePointStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeIndicator1:
                            //         "৩ক. এলএফ পর্যবেক্ষণের মাধ্যমে শিক্ষকদের সফল দিক এবং উন্নয়ন প্রয়োজন এমন দিকগুলো চিহ্নিত করেছেন।",
                            //     });
                            //   }
                            // } else if (this.state.lfStatus === "Priority 1") {
                            //   if (
                            //     this.state
                            //       .ind29LFTeacherAgreedNextPlanStatus === "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeIndicator1:
                            //         "২ঝ. এলএফ ও শিক্ষক পরবর্তী কাজ বা পাঠের বিষয়ে একমত হয়েছেন।",
                            //     });
                            //   } else if (
                            //     this.state.ind28LFTrack3StudentStatus === "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeIndicator1:
                            //         "২জ. এলএফ তাৎক্ষণিকভাবে ৩ জন শিক্ষার্থীর অনানুষ্ঠানিক মূল্যায়ন করেছেন।",
                            //     });
                            //   } else if (
                            //     this.state.ind27LFVerifyWorkbookStatus === "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeIndicator1:
                            //         "২ছ. গত পরিদর্শনের পর পরিকল্পনা অনুযায়ী পাঠদান এগিয়েছে কিনা তা বোঝার জন্য এলএফ শিক্ষার্থীদের ওয়ার্কবুক যাচাই করেছেন।",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind26LFObserveStudentOrGroupStatus === "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeIndicator1:
                            //         "২চ. শিক্ষার্থীরা বড় দলে বা একা একা কাজ করার সময় এলএফ শ্রেণিকক্ষে ঘুরে ঘুরে দেখেছেন।",
                            //     });
                            //   } else if (
                            //     this.state.ind25LFInstructIdealLessonStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeIndicator1:
                            //         "২ঙ. এলএফ যদি কোনো আদর্শ পাঠ উপস্থাপন করে থাকেন তবে তিনি সেই পাঠের সকল অংশ ধাপে ধাপে দেখিয়েছেন।",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind24LFDiscussLastFollowupIndicatorStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeIndicator1:
                            //         "২ঘ. ফিডব্যাক মিটিং-এর সময় এলএফ গত পর্যবেক্ষণ ফর্ম রিভিউ করেছেন এবং গত পর্যবেক্ষণে যেসব বিষয়ে উন্নতি করা প্রয়োজন বলে চিহ্নিত হয়েছিল তা নিয়ে আলোচনা করেছেন।",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind23LFDiscussCoachingSupportIndicatorStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeIndicator1:
                            //         "২গ. পাঠদান পর্যবেক্ষণ ফরমে 'না' বা 'আংশিক' চিহ্নিত হয়েছে এমন বিষয়ের উপর এলএফ শিক্ষককে গঠনমূলক পরামর্শ দিয়েছেন।",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind22LFDiscussGoodPracticeIndicatorStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeIndicator1:
                            //         "২খ. এলএফ একটি বা দুটি ইতিবাচক ও গঠনমূলক মতামত প্রদান করেছেন।",
                            //     });
                            //   } else if (
                            //     this.state
                            //       .ind21LFTeacherMaintainGoodRelationshipStatus ===
                            //     "Yes"
                            //   ) {
                            //     this.setState({
                            //       bestPracticeIndicator1:
                            //         "২ক. এলএফ ও শিক্ষকের মধ্যে ভালো সম্পর্ক বিদ্যমান এবং তারা বন্ধুত্বপূর্ণ সম্পর্ক বজায় রেখে কথা বলেছেন।",
                            //     });
                            //   }
                            // } else {
                            //   this.setState({
                            //     bestPracticeIndicator1: "N/A",
                            //   });
                            // }
                            // // Setup BestPractice

                            // // Setup CoachingSupport
                            // if (value === "No" || value === "Partial") {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "১ক. এলএফ প্রয়োজনীয় উপকরণ সঙ্গে এনেছেন (বিদ্যালয় পরিদর্শন রেকর্ড ফরম, বাংলা ক্লাস পর্যবেক্ষণ ফরম, শিক্ষক সহায়িকা)",
                            //   });
                            // } else if (
                            //   this.state.ind12IsCheckedInRightTimeStatus ===
                            //     "No" ||
                            //   this.state.ind12IsCheckedInRightTimeStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "১খ. এলএফ পরিদর্শনের জন্য সঠিক সময়ে বিদ্যালয়ে উপস্থিত হয়েছেন।",
                            //   });
                            // } else if (
                            //   this.state.ind13IsObservedBanglaLibraryStatus ===
                            //     "No" ||
                            //   this.state.ind13IsObservedBanglaLibraryStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "১গ. এলএফ প্রথম এবং/অথবা দ্বিতীয় শ্রেণির পুরো বাংলা ক্লাস পর্যবেক্ষণ করছেন এবং একটি শ্রেণির পাঠাগার কার্যক্রম পর্যবেক্ষণ করেছেন।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind14FeedbackSessionWithTeacherStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind14FeedbackSessionWithTeacherStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "১ঘ. এলএফ যেসব ক্লাস পর্যবেক্ষণ করেছেন ঐসব ক্লাসের প্রত্যেক শিক্ষকের সাথে একটি করে ফিডব্যাক মিটিং করেছেন।",
                            //   });
                            // } else if (
                            //   this.state.ind15MeetingWithHeadTeacherStatus ===
                            //     "No" ||
                            //   this.state.ind15MeetingWithHeadTeacherStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "১ঙ. এলএফ উক্ত বিদ্যালয়ের প্রধান শিক্ষকের সাথে প্রয়োজনীয় মিটিং করেছেন।",
                            //   });
                            // } else if (
                            //   this.state.ind16FilledAllFormProperlyStatus ===
                            //     "No" ||
                            //   this.state.ind16FilledAllFormProperlyStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "১চ. এলএফ প্রয়োজনীয় সকল ফরম ঠিকমতো পূরণ করেছেন।",
                            //   });
                            // } else if (
                            //   this.state.ind17ObservedClassSilentlyStatus ===
                            //     "No" ||
                            //   this.state.ind17ObservedClassSilentlyStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "১ছ. এলএফ শিক্ষকের পাঠদান বাধাগ্রস্ত না করে নীরবে পাঠদান পর্যবেক্ষণ করেছেন (আলোচনার ভিত্তিতে আদর্শ পাঠদান ব্যতিরেকে)।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind21LFTeacherMaintainGoodRelationshipStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind21LFTeacherMaintainGoodRelationshipStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "২ক. এলএফ ও শিক্ষকের মধ্যে ভালো সম্পর্ক বিদ্যমান এবং তারা বন্ধুত্বপূর্ণ সম্পর্ক বজায় রেখে কথা বলেছেন।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind22LFDiscussGoodPracticeIndicatorStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind22LFDiscussGoodPracticeIndicatorStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "২খ. এলএফ একটি বা দুটি ইতিবাচক ও গঠনমূলক মতামত প্রদান করেছেন।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind23LFDiscussCoachingSupportIndicatorStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind23LFDiscussCoachingSupportIndicatorStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "২গ. পাঠদান পর্যবেক্ষণ ফরমে 'না' বা 'আংশিক' চিহ্নিত হয়েছে এমন বিষয়ের উপর এলএফ শিক্ষককে গঠনমূলক পরামর্শ দিয়েছেন।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind24LFDiscussLastFollowupIndicatorStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind24LFDiscussLastFollowupIndicatorStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "২ঘ. ফিডব্যাক মিটিং-এর সময় এলএফ গত পর্যবেক্ষণ ফর্ম রিভিউ করেছেন এবং গত পর্যবেক্ষণে যেসব বিষয়ে উন্নতি করা প্রয়োজন বলে চিহ্নিত হয়েছিল তা নিয়ে আলোচনা করেছেন।",
                            //   });
                            // } else if (
                            //   this.state.ind25LFInstructIdealLessonStatus ===
                            //     "No" ||
                            //   this.state.ind25LFInstructIdealLessonStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "২ঙ. এলএফ যদি কোনো আদর্শ পাঠ উপস্থাপন করে থাকেন তবে তিনি সেই পাঠের সকল অংশ ধাপে ধাপে দেখিয়েছেন।",
                            //   });
                            // } else if (
                            //   this.state.ind26LFObserveStudentOrGroupStatus ===
                            //     "No" ||
                            //   this.state.ind26LFObserveStudentOrGroupStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "২চ. শিক্ষার্থীরা বড় দলে বা একা একা কাজ করার সময় এলএফ শ্রেণিকক্ষে ঘুরে ঘুরে দেখেছেন।",
                            //   });
                            // } else if (
                            //   this.state.ind27LFVerifyWorkbookStatus === "No" ||
                            //   this.state.ind27LFVerifyWorkbookStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "২ছ. গত পরিদর্শনের পর পরিকল্পনা অনুযায়ী পাঠদান এগিয়েছে কিনা তা বোঝার জন্য এলএফ শিক্ষার্থীদের ওয়ার্কবুক যাচাই করেছেন।",
                            //   });
                            // } else if (
                            //   this.state.ind28LFTrack3StudentStatus === "No" ||
                            //   this.state.ind28LFTrack3StudentStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "২জ. এলএফ তাৎক্ষণিকভাবে ৩ জন শিক্ষার্থীর অনানুষ্ঠানিক মূল্যায়ন করেছেন।",
                            //   });
                            // } else if (
                            //   this.state.ind29LFTeacherAgreedNextPlanStatus ===
                            //     "No" ||
                            //   this.state.ind29LFTeacherAgreedNextPlanStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "২ঝ. এলএফ ও শিক্ষক পরবর্তী কাজ বা পাঠের বিষয়ে একমত হয়েছেন।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind31LFIdentifyGoodImprovablePointStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind31LFIdentifyGoodImprovablePointStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "৩ক. এলএফ পর্যবেক্ষণের মাধ্যমে শিক্ষকদের সফল দিক এবং উন্নয়ন প্রয়োজন এমন দিকগুলো চিহ্নিত করেছেন।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind32LFInstructDevelopmentPlanStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind32LFInstructDevelopmentPlanStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "৩খ. এলএফ শিক্ষককে সুনির্দিষ্ট পরামর্শ দিয়েছেন যার মধ্যে রয়েছে শিক্ষকের কাঙ্খিত উন্নয়নের ক্ষেত্র।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind33LFDiscussAboutDevelopmentPlanStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind33LFDiscussAboutDevelopmentPlanStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "৩গ. কেন এই কাঙ্খিত উন্নয়ন প্রয়োজন এলএফ তা ব্যাখ্যা করতে সক্ষম হয়েছেন।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind34LFAllowToChangeTeachingPatternStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind34LFAllowToChangeTeachingPatternStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "৩ঘ. এলএফ শিক্ষকের সাথে আলোচনার সময় পাঠদানের কাঙ্খিত পরিবর্তন চর্চা করার সুযোগ দিয়েছেন।",
                            //   });
                            // } else if (
                            //   this.state
                            //     .ind35LFAllowTeacherForDiscussionStatus ===
                            //     "No" ||
                            //   this.state
                            //     .ind35LFAllowTeacherForDiscussionStatus ===
                            //     "Partial"
                            // ) {
                            //   this.setState({
                            //     coachingSupportIndicator1:
                            //       "৩ঙ. কি ভালো চলছে বা কি কি উন্নতি দরকার এলএফ প্রশ্ন করার মাধ্যমে শিক্ষককে তা বলার সুযোগ দিয়েছেন।",
                            //   });
                            // } else {
                            //   this.setState({
                            //     coachingSupportIndicator1: "N/A",
                            //   });
                            // }
                            // Setup CoachingSupport
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
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind11IsCarriedAllMaterialNote: text,
                            })
                          }
                          value={this.state.ind11IsCarriedAllMaterialNote + ""}
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
                      ১খ. এলএফ পরিদর্শনের জন্য সঠিক সময়ে বিদ্যালয়ে উপস্থিত
                      হয়েছেন।
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
                            this.state.ind12IsCheckedInRightTimeStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind12IsCheckedInRightTimeStatus: value,
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

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind12IsCheckedInRightTimeNote: text,
                            })
                          }
                          value={this.state.ind12IsCheckedInRightTimeNote + ""}
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
                      ১গ. এলএফ প্রথম এবং/অথবা দ্বিতীয় শ্রেণির পুরো বাংলা ক্লাস
                      পর্যবেক্ষণ করছেন এবং একটি শ্রেণির পাঠাগার কার্যক্রম
                      পর্যবেক্ষণ করেছেন।
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
                            this.state.ind13IsObservedBanglaLibraryStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind13IsObservedBanglaLibraryStatus: value,
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

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind13IsObservedBanglaLibraryNote: text,
                            })
                          }
                          value={
                            this.state.ind13IsObservedBanglaLibraryNote + ""
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
                      ১ঘ. এলএফ যেসব ক্লাস পর্যবেক্ষণ করেছেন ঐসব ক্লাসের প্রত্যেক
                      শিক্ষকের সাথে একটি করে ফিডব্যাক মিটিং করেছেন।
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
                            this.state.ind14FeedbackSessionWithTeacherStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind14FeedbackSessionWithTeacherStatus: value,
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

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind14FeedbackSessionWithTeacherNote: text,
                            })
                          }
                          value={
                            this.state.ind14FeedbackSessionWithTeacherNote + ""
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
                      ১ঙ. এলএফ উক্ত বিদ্যালয়ের প্রধান শিক্ষকের সাথে প্রয়োজনীয়
                      মিটিং করেছেন।
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
                            this.state.ind15MeetingWithHeadTeacherStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind15MeetingWithHeadTeacherStatus: value,
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

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind15MeetingWithHeadTeacherNote: text,
                            })
                          }
                          value={
                            this.state.ind15MeetingWithHeadTeacherNote + ""
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
                      ১চ. এলএফ প্রয়োজনীয় সকল ফরম ঠিকমতো পূরণ করেছেন।
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
                            this.state.ind16FilledAllFormProperlyStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind16FilledAllFormProperlyStatus: value,
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

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind16FilledAllFormProperlyNote: text,
                            })
                          }
                          value={this.state.ind16FilledAllFormProperlyNote + ""}
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
                      ১ছ. এলএফ শিক্ষকের পাঠদান বাধাগ্রস্ত না করে নীরবে পাঠদান
                      পর্যবেক্ষণ করেছেন (আলোচনার ভিত্তিতে আদর্শ পাঠদান
                      ব্যতিরেকে)।
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
                            this.state.ind17ObservedClassSilentlyStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind17ObservedClassSilentlyStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd17: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd17: "",
                              });
                            }
                            // Set error message

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                        {!!this.state.errorInd17 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd17}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind17ObservedClassSilentlyNote: text,
                            })
                          }
                          value={this.state.ind17ObservedClassSilentlyNote + ""}
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
                    প্রায়োরিটি এরিয়া - ২: পরামর্শ প্রদানের জন্য প্রয়োজনীয়
                    দক্ষতা অর্জন
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
                      ২ক. এলএফ ও শিক্ষকের মধ্যে ভালো সম্পর্ক বিদ্যমান এবং তারা
                      বন্ধুত্বপূর্ণ সম্পর্ক বজায় রেখে কথা বলেছেন।
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
                              .ind21LFTeacherMaintainGoodRelationshipStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind21LFTeacherMaintainGoodRelationshipStatus:
                                value,
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

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind21LFTeacherMaintainGoodRelationshipNote: text,
                            })
                          }
                          value={
                            this.state
                              .ind21LFTeacherMaintainGoodRelationshipNote + ""
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
                      ২খ. এলএফ একটি বা দুটি ইতিবাচক ও গঠনমূলক মতামত প্রদান
                      করেছেন।
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
                            this.state.ind22LFDiscussGoodPracticeIndicatorStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind22LFDiscussGoodPracticeIndicatorStatus: value,
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

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind22LFDiscussGoodPracticeIndicatorNote: text,
                            })
                          }
                          value={
                            this.state.ind22LFDiscussGoodPracticeIndicatorNote +
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
                      ২গ. পাঠদান পর্যবেক্ষণ ফরমে 'না' বা 'আংশিক' চিহ্নিত হয়েছে
                      এমন বিষয়ের উপর এলএফ শিক্ষককে গঠনমূলক পরামর্শ দিয়েছেন।
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
                              .ind23LFDiscussCoachingSupportIndicatorStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind23LFDiscussCoachingSupportIndicatorStatus:
                                value,
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

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind23LFDiscussCoachingSupportIndicatorNote: text,
                            })
                          }
                          value={
                            this.state
                              .ind23LFDiscussCoachingSupportIndicatorNote + ""
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
                    <Text>
                      ২ঘ. ফিডব্যাক মিটিং-এর সময় এলএফ গত পর্যবেক্ষণ ফর্ম রিভিউ
                      করেছেন এবং গত পর্যবেক্ষণে যেসব বিষয়ে উন্নতি করা প্রয়োজন
                      বলে চিহ্নিত হয়েছিল তা নিয়ে আলোচনা করেছেন।
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
                            this.state.ind24LFDiscussLastFollowupIndicatorStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind24LFDiscussLastFollowupIndicatorStatus: value,
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

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind24LFDiscussLastFollowupIndicatorNote: text,
                            })
                          }
                          value={
                            this.state.ind24LFDiscussLastFollowupIndicatorNote +
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
                      ২ঙ. এলএফ যদি কোনো আদর্শ পাঠ উপস্থাপন করে থাকেন তবে তিনি
                      সেই পাঠের সকল অংশ ধাপে ধাপে দেখিয়েছেন।
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
                            this.state.ind25LFInstructIdealLessonStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind25LFInstructIdealLessonStatus: value,
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

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LFs status
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
                        {!!this.state.errorInd26 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd26}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind26LFObserveStudentOrGroupNote: text,
                            })
                          }
                          value={
                            this.state.ind26LFObserveStudentOrGroupNote + ""
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
                      ২ছ. গত পরিদর্শনের পর পরিকল্পনা অনুযায়ী পাঠদান এগিয়েছে
                      কিনা তা বোঝার জন্য এলএফ শিক্ষার্থীদের ওয়ার্কবুক যাচাই
                      করেছেন।
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
                          selectedValue={this.state.ind27LFVerifyWorkbookStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind27LFVerifyWorkbookStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd27: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd27: "",
                              });
                            }
                            // Set error message

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                        {!!this.state.errorInd27 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd27}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind27LFVerifyWorkbookNote: text,
                            })
                          }
                          value={this.state.ind27LFVerifyWorkbookNote + ""}
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
                      ২জ. এলএফ তাৎক্ষণিকভাবে ৩ জন শিক্ষার্থীর অনানুষ্ঠানিক
                      মূল্যায়ন করেছেন।
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
                          selectedValue={this.state.ind28LFTrack3StudentStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind28LFTrack3StudentStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd28: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd28: "",
                              });
                            }
                            // Set error message

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                        {!!this.state.errorInd28 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd28}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind28LFTrack3StudentNote: text,
                            })
                          }
                          value={this.state.ind28LFTrack3StudentNote + ""}
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
                      ২ঝ. এলএফ ও শিক্ষক পরবর্তী কাজ বা পাঠের বিষয়ে একমত
                      হয়েছেন।
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
                            this.state.ind29LFTeacherAgreedNextPlanStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind29LFTeacherAgreedNextPlanStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd29: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd29: "",
                              });
                            }
                            // Set error message

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (value === "Yes" || value === "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                        {!!this.state.errorInd29 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd29}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind29LFTeacherAgreedNextPlanNote: text,
                            })
                          }
                          value={
                            this.state.ind29LFTeacherAgreedNextPlanNote + ""
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
                    প্রায়োরিটি এরিয়া - ৩: উচ্চতর পরামর্শ প্রদানের জন্য
                    প্রয়োজনীয় দক্ষতা অর্জন
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
                      ৩ক. এলএফ পর্যবেক্ষণের মাধ্যমে শিক্ষকদের সফল দিক এবং
                      উন্নয়ন প্রয়োজন এমন দিকগুলো চিহ্নিত করেছেন।
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
                            this.state.ind31LFIdentifyGoodImprovablePointStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind31LFIdentifyGoodImprovablePointStatus: value,
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

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind31LFIdentifyGoodImprovablePointNote: text,
                            })
                          }
                          value={
                            this.state.ind31LFIdentifyGoodImprovablePointNote +
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
                      ৩খ. এলএফ শিক্ষককে সুনির্দিষ্ট পরামর্শ দিয়েছেন যার মধ্যে
                      রয়েছে শিক্ষকের কাঙ্খিত উন্নয়নের ক্ষেত্র।
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
                            this.state.ind32LFInstructDevelopmentPlanStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind32LFInstructDevelopmentPlanStatus: value,
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

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind32LFInstructDevelopmentPlanNote: text,
                            })
                          }
                          value={
                            this.state.ind32LFInstructDevelopmentPlanNote + ""
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
                      ৩গ. কেন এই কাঙ্খিত উন্নয়ন প্রয়োজন এলএফ তা ব্যাখ্যা করতে
                      সক্ষম হয়েছেন।
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
                            this.state.ind33LFDiscussAboutDevelopmentPlanStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind33LFDiscussAboutDevelopmentPlanStatus: value,
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

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind33LFDiscussAboutDevelopmentPlanNote: text,
                            })
                          }
                          value={
                            this.state.ind33LFDiscussAboutDevelopmentPlanNote +
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
                      ৩ঘ. এলএফ শিক্ষকের সাথে আলোচনার সময় পাঠদানের কাঙ্খিত
                      পরিবর্তন চর্চা করার সুযোগ দিয়েছেন।
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
                          selectedValue={
                            this.state.ind34LFAllowToChangeTeachingPatternStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind34LFAllowToChangeTeachingPatternStatus: value,
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

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Yes" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "No" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "Partial" ||
                                this.state
                                  .ind35LFAllowTeacherForDiscussionStatus ===
                                  "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind34LFAllowToChangeTeachingPatternNote: text,
                            })
                          }
                          value={
                            this.state.ind34LFAllowToChangeTeachingPatternNote +
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
                      ৩ঙ. কি ভালো চলছে বা কি কি উন্নতি দরকার এলএফ প্রশ্ন করার
                      মাধ্যমে শিক্ষককে তা বলার সুযোগ দিয়েছেন।
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
                          selectedValue={
                            this.state.ind35LFAllowTeacherForDiscussionStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind35LFAllowTeacherForDiscussionStatus: value,
                            });

                            // Set error message
                            if (value === "Partial" || value === "N/A") {
                              this.setState({
                                errorInd35: "Comment is mandetory **",
                              });
                            } else {
                              this.setState({
                                errorInd35: "",
                              });
                            }
                            // Set error message

                            // Set LF status
                            if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A") &&
                              (this.state
                                .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A") &&
                              (this.state
                                .ind24LFDiscussLastFollowupIndicatorStatus ===
                                "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A") &&
                              (this.state.ind25LFInstructIdealLessonStatus ===
                                "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A") &&
                              (this.state.ind26LFObserveStudentOrGroupStatus ===
                                "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A") &&
                              (this.state.ind27LFVerifyWorkbookStatus ===
                                "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A") &&
                              (this.state.ind28LFTrack3StudentStatus ===
                                "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A") &&
                              (this.state.ind29LFTeacherAgreedNextPlanStatus ===
                                "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A") &&
                              (this.state
                                .ind31LFIdentifyGoodImprovablePointStatus ===
                                "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11IsCarriedAllMaterialStatus ===
                                "Yes" ||
                                this.state.ind11IsCarriedAllMaterialStatus ===
                                  "N/A") &&
                              (this.state.ind12IsCheckedInRightTimeStatus ===
                                "Yes" ||
                                this.state.ind12IsCheckedInRightTimeStatus ===
                                  "N/A") &&
                              (this.state.ind13IsObservedBanglaLibraryStatus ===
                                "Yes" ||
                                this.state
                                  .ind13IsObservedBanglaLibraryStatus ===
                                  "N/A") &&
                              (this.state
                                .ind14FeedbackSessionWithTeacherStatus ===
                                "Yes" ||
                                this.state
                                  .ind14FeedbackSessionWithTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind15MeetingWithHeadTeacherStatus ===
                                "Yes" ||
                                this.state.ind15MeetingWithHeadTeacherStatus ===
                                  "N/A") &&
                              (this.state.ind16FilledAllFormProperlyStatus ===
                                "Yes" ||
                                this.state.ind16FilledAllFormProperlyStatus ===
                                  "N/A") &&
                              (this.state.ind17ObservedClassSilentlyStatus ===
                                "Yes" ||
                                this.state.ind17ObservedClassSilentlyStatus ===
                                  "N/A") &&
                              (this.state
                                .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                "Yes" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "No" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "Partial" ||
                                this.state
                                  .ind21LFTeacherMaintainGoodRelationshipStatus ===
                                  "N/A" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind22LFDiscussGoodPracticeIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind23LFDiscussCoachingSupportIndicatorStatus ===
                                  "N/A" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Yes" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "No" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "Partial" ||
                                this.state
                                  .ind24LFDiscussLastFollowupIndicatorStatus ===
                                  "N/A" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Yes" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "No" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "Partial" ||
                                this.state.ind25LFInstructIdealLessonStatus ===
                                  "N/A" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Yes" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "No" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "Partial" ||
                                this.state
                                  .ind26LFObserveStudentOrGroupStatus ===
                                  "N/A" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Yes" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "No" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "Partial" ||
                                this.state.ind27LFVerifyWorkbookStatus ===
                                  "N/A" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Yes" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "No" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "Partial" ||
                                this.state.ind28LFTrack3StudentStatus ===
                                  "N/A" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind29LFTeacherAgreedNextPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Yes" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "No" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "Partial" ||
                                this.state
                                  .ind31LFIdentifyGoodImprovablePointStatus ===
                                  "N/A" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32LFInstructDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "No" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33LFDiscussAboutDevelopmentPlanStatus ===
                                  "N/A" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Yes" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "No" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "Partial" ||
                                this.state
                                  .ind34LFAllowToChangeTeachingPatternStatus ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A")
                            ) {
                              this.setState({
                                lfStatus: "Priority 2",
                              });
                            } else {
                              this.setState({
                                lfStatus: "Priority 1",
                              });
                            }
                            // Set LF status
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
                        {!!this.state.errorInd35 && (
                          <Text style={{ color: "red", fontSize: 20 }}>
                            {this.state.errorInd35}
                          </Text>
                        )}
                        <TextInput
                          style={{
                            height: 100,
                            width: 250,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind35LFAllowTeacherForDiscussionNote: text,
                            })
                          }
                          value={
                            this.state.ind35LFAllowTeacherForDiscussionNote + ""
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
            <Text style={styles.bigRedText}>
              এলএফ'র প্রায়োরিটি (LF Priority)
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
                      ইনডিকেটর অনুযায়ী এলএফ'র অবস্থা (Status of LF according to
                      indicators)
                    </Text>
                  </View>

                  <View style={{ flex: 1, padding: 2 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "red",
                        alignContent: "flex-end",
                        textAlign: "right",
                      }}
                    >
                      {this.state.lfStatus}
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
                এলএফকে পরামর্শদানের কিছু প্রধান বিষয়
              </Text>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      এলএফ তার পর্যবেক্ষণের সময় ভালো করেছেন এমন ১-২টি বিষয়
                      উল্লেখ করুন:
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
                        marginTop: 2,
                        marginLeft: 170,
                        marginBottom: 2,
                      }}
                      onPress={this.bestPracticeIndcoachingSupportInd}
                    >
                      <Text style={{ color: "#ffff" }}>Click to Generate</Text>
                    </TouchableOpacity>
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

                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2, flexDirection: "row" }}>
                    <Text>
                      এলএফ কি গত পরিদর্শনের সময়কার পরামর্শগুলো বাস্তবায়ন
                      করেছেন?:
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
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text></Text>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={10}
                      placeholder="লিখুন(Word limit 50)"
                      editable={true}
                      selectTextOnFocus={false}
                      value={this.state.lastFollowupIndicator1}
                      onChangeText={(text) =>
                        this.setState({
                          lastFollowupIndicator1: text,
                        })
                      }
                    ></TextInput>
                  </View>
                </View>

                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      প্রায়োরিটি এরিয়ার আলোকে- এলএফ'র যে বিষয়টিতে উন্নয়ন
                      করতে হবে:
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
                    <Text>উন্নতির জন্য এলএফ যা করতে পারেন: </Text>
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
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="লিখুন(Word limit 50)"
                      keyboardType="default"
                      editable={true}
                      onChangeText={(text) =>
                        this.setState({
                          coachingSupportLF: text,
                        })
                      }
                      value={this.state.coachingSupportLF + ""}
                    ></TextInput>
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2, flexDirection: "row" }}>
                    <Text>এলএফ'কে সহায়তার জন্য এলপিও যা করতে পারেন:</Text>
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
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="লিখুন(Word limit 50)"
                      keyboardType="default"
                      editable={true}
                      onChangeText={(text) =>
                        this.setState({
                          coachingSupportLPO: text,
                        })
                      }
                      value={this.state.coachingSupportLPO + ""}
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
