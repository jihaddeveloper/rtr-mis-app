//  Author: Mohammad Jihad Hossain
//  Create Date: 16/09/2025
//  Modify Date: 25/11/2025
//  Description: PLibraryObservationScreen component

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
  TouchableOpacity,
  Alert,
  Dimensions,
  BackHandler,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { divisions, districts, upazillas, unions } from "bd-geojs";
import { Card } from "react-native-shadow-cards";

import DateTimePicker from "@react-native-community/datetimepicker";

const { height } = Dimensions.get("window").height / 2;
const { width } = Dimensions.get("window").width / 2;

export default class PLibraryObservationScreen extends React.Component {
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

      allProject: [],
      allSchool: [],
      allTeacher: [],
      allEmployee: [],
      allOffice: [],
      allDesignation: [],
      allLibraryIndicator: [],
      allLibraryObservationData: [],
      //Preloaded Data

      // previous visit data of the library
      preMonthData: [],

      // Duplicate data check
      duplicateLibraryObservation: [],
      // Duplicate data check

      isLoading: true,

      // checked: false,
      // option: "yes",
      // choosenIndex: 0,

      // Input value

      // Date picker property
      date: new Date(),
      mode: "date",
      show: false,
      selectedDate: new Date(),
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

      note: "",
      // General data

      // Last visit topic
      lastFollowupIndicator1: "",
      lastFollowupIndicator2: "",
      lastFollowupIndicator3: "",
      // Last visit topic

      ind1IsTrainedOneTeacher: "",
      ind11IsPointTeacherIncharge: "",
      ind12IsTrainedLibraryManagementReadingHour: "",

      ind2HeadTeacherTrainedLibraryManagementReadingHour: "",

      ind3ClassroomSuitableLibraryActivity: "",
      ind31ClassroomDoorWindowOkay: "",
      ind32ClassroomDoorWindowLock: "",
      ind33ClassroomSafeFromRainWater: "",
      ind34ClassroomSafeClean: "",

      ind4LibraryFurnitureOkay: "",
      ind41BookshelfUsable: "",
      ind42BookshelfProtectedSunRain: "",
      ind43BookshelfPortableSafeForStudent: "",
      ind44BookshelfReadingSpace: "",
      ind45BookshelfFurnitureGoodCondition: "",

      ind5BookRegisterUpdated: "",

      ind6BookshelfOrganized: "",
      ind61BookshelfBookOrganizedByGrade: "",
      ind62BookshelfRtRBookLabelViewable: "",
      ind63BookshelfNonRtRBookLabelViewable: "",
      ind64BookOrganizedByLabel: "",
      ind65BookAccessible: "",
      ind66BookCoverViewable: "",

      ind7PrintRichItemDisplayed: "",
      ind71ChartPosterDisplayed: "",
      ind72ChartPosterCompatible: "",

      ind8BookCheckoutFunctional: "",
      ind81BookCheckoutProcedureDisplayed: "",
      ind82BookCheckoutRegisterUsable: "",
      ind83BookCheckoutRegisterUpdated: "",
      ind84BookCheckoutPendingBookList: "",
      ind85BookCheckoutDataCollection: "",
      ind86BookCheckoutByLeast5Student: "",

      ind9ReadingHourActivityFunctional: "",
      ind91ReadingHourActivityWeekly: "",
      ind92ReadingHourActivityRoutineHanged: "",
      ind93BookCheckoutOpportunity: "",
      ind94BookCheckoutNoticeHanged: "",

      ind10TeacherPerformReadingHourActivity: "",
      ind101ReadingHourRegisterUpdated: "",
      ind102ReadingActivityListedRegister: "",

      ind11TrainedLibraryObservationReadingHour: "",

      ind12SchoolCommitteeDecisionAboutLibrary: "",
      ind121SchoolHasCommitteeAboutLibrary: "",
      ind122SchoolCommitteeMeetingAboutLibrary: "",

      ind13ParentMeetingAboutLibrary: "",

      ind14ReadPlayFestival: "",
      ind141SchoolArrangeReadFestival: "",
      ind142ParentPublicEngageReadFestival: "",

      ind15SustainabilityPlanByCommittee: "",
      ind151ParentPublicHeadTeacherCombinedPlan: "",
      ind152ParentPublicResponsibility: "",

      // Discussion topic
      bestPracticeIndicator1: "",
      bestPracticeIndicator2: "",
      bestPracticeIndicator3: "",

      coachingSupportIndicator1: "",
      coachingSupportIndicator2: "",
      coachingSupportIndicator3: "",

      agreedSuggestion: "",
      agreedStatement: "",
      // Discussion topic

      //library status
      libraryStatus: "Not set yet",

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
    this.getAllLibraryIndicator();
    this.getAllProject();
    this.getAllOffice();
    this.getAllTeacher();
    this.getAllLibraryObservation();

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

  // Update state
  updateState = () => {
    this.setState({
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

      pointTeacher: "",
      rtrSchoolId: "",
      yearOfSupport: "",
      yearOfEstablish: "",

      note: "",
      // General data

      // Last visit topic
      lastFollowupIndicator1: "",
      lastFollowupIndicator2: "",
      lastFollowupIndicator3: "",
      // Last visit topic

      ind1IsTrainedOneTeacher: "",
      ind11IsPointTeacherIncharge: "",
      ind12IsTrainedLibraryManagementReadingHour: "",

      ind2HeadTeacherTrainedLibraryManagementReadingHour: "",

      ind3ClassroomSuitableLibraryActivity: "",
      ind31ClassroomDoorWindowOkay: "",
      ind32ClassroomDoorWindowLock: "",
      ind33ClassroomSafeFromRainWater: "",
      ind34ClassroomSafeClean: "",

      ind4LibraryFurnitureOkay: "",
      ind41BookshelfUsable: "",
      ind42BookshelfProtectedSunRain: "",
      ind43BookshelfPortableSafeForStudent: "",
      ind44BookshelfReadingSpace: "",
      ind45BookshelfFurnitureGoodCondition: "",

      ind5BookRegisterUpdated: "",

      ind6BookshelfOrganized: "",
      ind61BookshelfBookOrganizedByGrade: "",
      ind62BookshelfRtRBookLabelViewable: "",
      ind63BookshelfNonRtRBookLabelViewable: "",
      ind64BookOrganizedByLabel: "",
      ind65BookAccessible: "",
      ind66BookCoverViewable: "",

      ind7PrintRichItemDisplayed: "",
      ind71ChartPosterDisplayed: "",
      ind72ChartPosterCompatible: "",

      ind8BookCheckoutFunctional: "",
      ind81BookCheckoutProcedureDisplayed: "",
      ind82BookCheckoutRegisterUsable: "",
      ind83BookCheckoutRegisterUpdated: "",
      ind84BookCheckoutPendingBookList: "",
      ind85BookCheckoutDataCollection: "",
      ind86BookCheckoutByLeast5Student: "",

      ind9ReadingHourActivityFunctional: "",
      ind91ReadingHourActivityWeekly: "",
      ind92ReadingHourActivityRoutineHanged: "",
      ind93BookCheckoutOpportunity: "",
      ind94BookCheckoutNoticeHanged: "",

      ind10TeacherPerformReadingHourActivity: "",
      ind101ReadingHourRegisterUpdated: "",
      ind102ReadingActivityListedRegister: "",

      ind11TrainedLibraryObservationReadingHour: "",

      ind12SchoolCommitteeDecisionAboutLibrary: "",
      ind121SchoolHasCommitteeAboutLibrary: "",
      ind122SchoolCommitteeMeetingAboutLibrary: "",

      ind13ParentMeetingAboutLibrary: "",

      ind14ReadPlayFestival: "",
      ind141SchoolArrangeReadFestival: "",
      ind142ParentPublicEngageReadFestival: "",

      ind15SustainabilityPlanByCommittee: "",
      ind151ParentPublicHeadTeacherCombinedPlan: "",
      ind152ParentPublicResponsibility: "",

      // Discussion topic
      bestPracticeIndicator1: "",
      bestPracticeIndicator2: "",
      bestPracticeIndicator3: "",

      coachingSupportIndicator1: "",
      coachingSupportIndicator2: "",
      coachingSupportIndicator3: "",

      agreedSuggestion: "",
      agreedStatement: "",

      // Discussion topic

      //library status
      libraryStatus: "",

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
      monthError: "",
      yearError: "",
      // Validation message
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

  // Get All Library Indicator
  getAllLibraryIndicator = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/library-observation-indicators",
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      this.setState({ allLibraryIndicator: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };
  // Get All Library Indicator

  // Get All Library Observation Data
  getAllLibraryObservation = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/p-library-observation",
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
        allLibraryObservationData: response.data,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // Get All Library Observation Data

  //Register new library-observation data
  saveLibraryObservation = async () => {
    const newLibraryObservation = {
      date: this.state.selectedDate,
      office: this.state.pickerOffice,
      project: this.state.pickerProject,
      district: this.state.pickerDistrict.name,
      upazilla: this.state.pickerUpazilla.name,
      visitNo: Math.floor(Math.random() * 100),
      visitor: this.state.visitor,
      visitorDesignation: this.state.visitorDesignation,
      lpo: this.state.pickerLPO.employeeRegId,
      lf: this.state.pickerLF.employeeRegId,
      lfName: this.state.pickerLFName.name,
      lpoName: this.state.pickerLPOName.name,
      school: this.state.pickerSchool.name,
      month: this.state.pickerMonth,
      year: this.state.pickerYear,

      pointTeacher: this.state.pointTeacher,
      rtrSchoolId: this.state.rtrSchoolId,
      yearOfSupport: this.state.yearOfSupport,
      yearOfEstablished: this.state.yearOfEstablish,

      phase: this.state.pickerPhase,

      note: this.state.note,

      lastFollowupIndicator1: this.state.pickerFollowup1,
      lastFollowupIndicator2: this.state.pickerFollowup2,
      lastFollowupIndicator3: this.state.pickerFollowup3,

      ind1IsTrainedOneTeacher: this.state.ind1IsTrainedOneTeacher,
      ind11IsPointTeacherIncharge: this.state.ind11IsPointTeacherIncharge,
      ind12IsTrainedLibraryManagementReadingHour:
        this.state.ind12IsTrainedLibraryManagementReadingHour,

      ind2HeadTeacherTrainedLibraryManagementReadingHour:
        this.state.ind2HeadTeacherTrainedLibraryManagementReadingHour,

      ind3ClassroomSuitableLibraryActivity:
        this.state.ind3ClassroomSuitableLibraryActivity,
      ind31ClassroomDoorWindowOkay: this.state.ind31ClassroomDoorWindowOkay,
      ind32ClassroomDoorWindowLock: this.state.ind32ClassroomDoorWindowLock,
      ind33ClassroomSafeFromRainWater:
        this.state.ind33ClassroomSafeFromRainWater,
      ind34ClassroomSafeClean: this.state.ind34ClassroomSafeClean,

      ind4LibraryFurnitureOkay: this.state.ind4LibraryFurnitureOkay,
      ind41BookshelfUsable: this.state.ind41BookshelfUsable,
      ind42BookshelfProtectedSunRain: this.state.ind42BookshelfProtectedSunRain,
      ind43BookshelfPortableSafeForStudent:
        this.state.ind43BookshelfPortableSafeForStudent,
      ind44BookshelfReadingSpace: this.state.ind44BookshelfReadingSpace,
      ind45BookshelfFurnitureGoodCondition:
        this.state.ind45BookshelfFurnitureGoodCondition,

      ind5BookRegisterUpdated: this.state.ind5BookRegisterUpdated,

      ind6BookshelfOrganized: this.state.ind6BookshelfOrganized,
      ind61BookshelfBookOrganizedByGrade:
        this.state.ind61BookshelfBookOrganizedByGrade,
      ind62BookshelfRtRBookLabelViewable:
        this.state.ind62BookshelfRtRBookLabelViewable,
      ind63BookshelfNonRtRBookLabelViewable:
        this.state.ind63BookshelfNonRtRBookLabelViewable,
      ind64BookOrganizedByLabel: this.state.ind64BookOrganizedByLabel,
      ind65BookAccessible: this.state.ind65BookAccessible,
      ind66BookCoverViewable: this.state.ind66BookCoverViewable,

      ind7PrintRichItemDisplayed: this.state.ind7PrintRichItemDisplayed,
      ind71ChartPosterDisplayed: this.state.ind71ChartPosterDisplayed,
      ind72ChartPosterCompatible: this.state.ind72ChartPosterCompatible,

      ind8BookCheckoutFunctional: this.state.ind8BookCheckoutFunctional,
      ind81BookCheckoutProcedureDisplayed:
        this.state.ind81BookCheckoutProcedureDisplayed,
      ind82BookCheckoutRegisterUsable:
        this.state.ind82BookCheckoutRegisterUsable,
      ind83BookCheckoutRegisterUpdated:
        this.state.ind83BookCheckoutRegisterUpdated,
      ind84BookCheckoutPendingBookList:
        this.state.ind84BookCheckoutPendingBookList,
      ind85BookCheckoutDataCollection:
        this.state.ind85BookCheckoutDataCollection,
      ind86BookCheckoutByLeast5Student:
        this.state.ind86BookCheckoutByLeast5Student,

      ind9ReadingHourActivityFunctional:
        this.state.ind9ReadingHourActivityFunctional,
      ind91ReadingHourActivityWeekly: this.state.ind91ReadingHourActivityWeekly,
      ind92ReadingHourActivityRoutineHanged:
        this.state.ind92ReadingHourActivityRoutineHanged,
      ind93BookCheckoutOpportunity: this.state.ind93BookCheckoutOpportunity,
      ind94BookCheckoutNoticeHanged: this.state.ind94BookCheckoutNoticeHanged,

      ind10TeacherPerformReadingHourActivity:
        this.state.ind10TeacherPerformReadingHourActivity,
      ind101ReadingHourRegisterUpdated:
        this.state.ind101ReadingHourRegisterUpdated,
      ind102ReadingActivityListedRegister:
        this.state.ind102ReadingActivityListedRegister,

      ind11TrainedLibraryObservationReadingHour:
        this.state.ind11TrainedLibraryObservationReadingHour,

      ind12SchoolCommitteeDecisionAboutLibrary:
        this.state.ind12SchoolCommitteeDecisionAboutLibrary,
      ind121SchoolHasCommitteeAboutLibrary:
        this.state.ind121SchoolHasCommitteeAboutLibrary,
      ind122SchoolCommitteeMeetingAboutLibrary:
        this.state.ind122SchoolCommitteeMeetingAboutLibrary,

      ind13ParentMeetingAboutLibrary: this.state.ind13ParentMeetingAboutLibrary,

      ind14ReadPlayFestival: this.state.ind14ReadPlayFestival,
      ind141SchoolArrangeReadFestival:
        this.state.ind141SchoolArrangeReadFestival,
      ind142ParentPublicEngageReadFestival:
        this.state.ind142ParentPublicEngageReadFestival,

      ind15SustainabilityPlanByCommittee:
        this.state.ind15SustainabilityPlanByCommittee,
      ind151ParentPublicHeadTeacherCombinedPlan:
        this.state.ind151ParentPublicHeadTeacherCombinedPlan,
      ind152ParentPublicResponsibility:
        this.state.ind152ParentPublicResponsibility,

      bestPracticeIndicator1: this.state.bestPracticeIndicator1,
      bestPracticeIndicator2: this.state.bestPracticeIndicator2,
      bestPracticeIndicator3: this.state.bestPracticeIndicator3,

      coachingSupportIndicator1: this.state.coachingSupportIndicator1,
      coachingSupportIndicator2: this.state.coachingSupportIndicator2,
      coachingSupportIndicator3: this.state.coachingSupportIndicator3,

      agreedSuggestion: this.state.agreedSuggestion,
      agreedStatement: this.state.agreedStatement,

      libraryStatus: this.state.libraryStatus,
    };

    // Check duplicate data
    this.state.duplicateLibraryObservation =
      this.state.allLibraryObservationData.filter((item) => {
        return (
          item.date == this.state.selectedDate &&
          item.school == this.state.pickerSchool &&
          item.month == this.state.pickerMonth &&
          item.year == this.state.pickerYear
        );
      });

    console.log(
      "Duplicate LibraryObservation Data: ",
      this.state.duplicateLibraryObservation.length,
    );
    // Check duplicate data

    if (this.state.selectedDate === "") {
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
    } else if (this.state.yearOfEstablish === "") {
      Alert.alert("Alert", "Establish Year can not be empty");
      return;
    } else if (this.state.ind11IsPointTeacherIncharge === "") {
      Alert.alert("Alert", "Indicator 1.1 can not be empty");
      return;
    } else if (this.state.ind12IsTrainedLibraryManagementReadingHour === "") {
      Alert.alert("Alert", "Indicator 1.2 can not be empty");
      return;
    } else if (
      this.state.ind2HeadTeacherTrainedLibraryManagementReadingHour === ""
    ) {
      Alert.alert("Alert", "Indicator 2 can not be empty");
      return;
    } else if (this.state.ind31ClassroomDoorWindowOkay === "") {
      Alert.alert("Alert", "Indicator 3.1 can not be empty");
      return;
    } else if (this.state.ind32ClassroomDoorWindowLock === "") {
      Alert.alert("Alert", "Indicator 3.2 can not be empty");
      return;
    } else if (this.state.ind33ClassroomSafeFromRainWater === "") {
      Alert.alert("Alert", "Indicator 3.3 can not be empty");
      return;
    } else if (this.state.ind34ClassroomSafeClean === "") {
      Alert.alert("Alert", "Indicator 3.4 can not be empty");
      return;
    } else if (this.state.ind41BookshelfUsable === "") {
      Alert.alert("Alert", "Indicator 4.1 can not be empty");
      return;
    } else if (this.state.ind42BookshelfProtectedSunRain === "") {
      Alert.alert("Alert", "Indicator 4.2 can not be empty");
      return;
    } else if (this.state.ind43BookshelfPortableSafeForStudent === "") {
      Alert.alert("Alert", "Indicator 4.3 can not be empty");
      return;
    } else if (this.state.ind44BookshelfReadingSpace === "") {
      Alert.alert("Alert", "Indicator 4.4 can not be empty");
      return;
    } else if (this.state.ind45BookshelfFurnitureGoodCondition === "") {
      Alert.alert("Alert", "Indicator 4.5 can not be empty");
      return;
    } else if (this.state.ind5BookRegisterUpdated === "") {
      Alert.alert("Alert", "Indicator 5 can not be empty");
      return;
    } else if (this.state.ind61BookshelfBookOrganizedByGrade === "") {
      Alert.alert("Alert", "Indicator 6.1 can not be empty");
      return;
    } else if (this.state.ind62BookshelfRtRBookLabelViewable === "") {
      Alert.alert("Alert", "Indicator 6.2 can not be empty");
      return;
    } else if (this.state.ind63BookshelfNonRtRBookLabelViewable === "") {
      Alert.alert("Alert", "Indicator 6.3 can not be empty");
      return;
    } else if (this.state.ind64BookOrganizedByLabel === "") {
      Alert.alert("Alert", "Indicator 6.4 can not be empty");
      return;
    } else if (this.state.ind65BookAccessible === "") {
      Alert.alert("Alert", "Indicator 6.5 can not be empty");
      return;
    } else if (this.state.ind66BookCoverViewable === "") {
      Alert.alert("Alert", "Indicator 6.6 can not be empty");
      return;
    } else if (this.state.ind71ChartPosterDisplayed === "") {
      Alert.alert("Alert", "Indicator 7.1 can not be empty");
      return;
    } else if (this.state.ind72ChartPosterCompatible === "") {
      Alert.alert("Alert", "Indicator 7.2 can not be empty");
      return;
    } else if (this.state.ind81BookCheckoutProcedureDisplayed === "") {
      Alert.alert("Alert", "Indicator 8.1 can not be empty");
      return;
    } else if (this.state.ind82BookCheckoutRegisterUsable === "") {
      Alert.alert("Alert", "Indicator 8.2 can not be empty");
      return;
    } else if (this.state.ind83BookCheckoutRegisterUpdated === "") {
      Alert.alert("Alert", "Indicator 8.3 can not be empty");
      return;
    } else if (this.state.ind84BookCheckoutPendingBookList === "") {
      Alert.alert("Alert", "Indicator 8.4 can not be empty");
      return;
    } else if (this.state.ind85BookCheckoutDataCollection === "") {
      Alert.alert("Alert", "Indicator 8.5 can not be empty");
      return;
    } else if (this.state.ind86BookCheckoutByLeast5Student === "") {
      Alert.alert("Alert", "Indicator 8.6 can not be empty");
      return;
    } else if (this.state.ind91ReadingHourActivityWeekly === "") {
      Alert.alert("Alert", "Indicator 9.1 can not be empty");
      return;
    } else if (this.state.ind92ReadingHourActivityRoutineHanged === "") {
      Alert.alert("Alert", "Indicator 9.2 can not be empty");
      return;
    } else if (this.state.ind93BookCheckoutOpportunity === "") {
      Alert.alert("Alert", "Indicator 9.3 can not be empty");
      return;
    } else if (this.state.ind94BookCheckoutNoticeHanged === "") {
      Alert.alert("Alert", "Indicator 9.4 can not be empty");
      return;
    } else if (this.state.ind101ReadingHourRegisterUpdated === "") {
      Alert.alert("Alert", "Indicator 10.1 can not be empty");
      return;
    } else if (this.state.ind102ReadingActivityListedRegister === "") {
      Alert.alert("Alert", "Indicator 10.2 can not be empty");
      return;
    } else if (this.state.ind11TrainedLibraryObservationReadingHour === "") {
      Alert.alert("Alert", "Indicator 11 can not be empty");
      return;
    } else if (this.state.ind121SchoolHasCommitteeAboutLibrary === "") {
      Alert.alert("Alert", "Indicator 12.1 can not be empty");
      return;
    } else if (this.state.ind122SchoolCommitteeMeetingAboutLibrary === "") {
      Alert.alert("Alert", "Indicator 12.2 can not be empty");
      return;
    } else if (this.state.ind13ParentMeetingAboutLibrary === "") {
      Alert.alert("Alert", "Indicator 13 can not be empty");
      return;
    } else if (this.state.ind141SchoolArrangeReadFestival === "") {
      Alert.alert("Alert", "Indicator 14.1 can not be empty");
      return;
    } else if (this.state.ind142ParentPublicEngageReadFestival === "") {
      Alert.alert("Alert", "Indicator 14.2 can not be empty");
      return;
    } else if (this.state.ind151ParentPublicHeadTeacherCombinedPlan === "") {
      Alert.alert("Alert", "Indicator 15.1 can not be empty");
      return;
    } else if (this.state.ind152ParentPublicResponsibility === "") {
      Alert.alert("Alert", "Indicator 15.2 can not be empty");
      return;
    } else if (this.state.duplicateLibraryObservation.length > 0) {
      Alert.alert("Alert", "Data already inserted and can't be duplicate");
      return;
    } else {
      try {
        let response = await fetch(
          "http://118.179.80.51:8080/api/v1/p-library-observation",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newLibraryObservation),
          },
        );
        if (response.status >= 200 && response.status < 300) {
          Alert.alert(
            "Library observation data saved successfully to online!!!",
          );
          console.log(
            "Data to be saved: " + JSON.stringify(newLibraryObservation),
          );
          this.getAllLibraryObservation();
          this.updateState();
        } else {
          Alert.alert("Alert", "Error there !!!");
          console.log("Error to save data: " + response.status);
          console.log(
            "Data to be saved: " + JSON.stringify(newLibraryObservation),
          );
        }
      } catch (errors) {
        alert(errors);
      }
    }
  };
  //Register new library-observation data

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
        onPress: this.saveLibraryObservation,
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
      office: this.state.pickerOffice,
      project: this.state.pickerProject,
      district: this.state.pickerDistrict.name,
      upazilla: this.state.pickerUpazilla.name,
      visitNo: Math.floor(Math.random() * 100),
      visitor: this.state.visitor,
      visitorDesignation: this.state.visitorDesignation,
      lpo: this.state.pickerLPO.employeeRegId,
      lf: this.state.pickerLF.employeeRegId,
      lfName: this.state.pickerLFName.name,
      lpoName: this.state.pickerLPOName.name,
      school: this.state.pickerSchool.name,
      month: this.state.pickerMonth,
      year: this.state.pickerYear,

      pointTeacher: this.state.pointTeacher,
      rtrSchoolId: this.state.rtrSchoolId,
      yearOfSupport: this.state.yearOfSupport,
      yearOfEstablished: this.state.yearOfEstablish,

      phase: this.state.pickerPhase,

      note: this.state.note,

      lastFollowupIndicator1: this.state.pickerFollowup1,
      lastFollowupIndicator2: this.state.pickerFollowup2,
      lastFollowupIndicator3: this.state.pickerFollowup3,

      ind1IsTrainedOneTeacher: this.state.ind1IsTrainedOneTeacher,
      ind11IsPointTeacherIncharge: this.state.ind11IsPointTeacherIncharge,
      ind12IsTrainedLibraryManagementReadingHour:
        this.state.ind12IsTrainedLibraryManagementReadingHour,

      ind2HeadTeacherTrainedLibraryManagementReadingHour:
        this.state.ind2HeadTeacherTrainedLibraryManagementReadingHour,

      ind3ClassroomSuitableLibraryActivity:
        this.state.ind3ClassroomSuitableLibraryActivity,
      ind31ClassroomDoorWindowOkay: this.state.ind31ClassroomDoorWindowOkay,
      ind32ClassroomDoorWindowLock: this.state.ind32ClassroomDoorWindowLock,
      ind33ClassroomSafeFromRainWater:
        this.state.ind33ClassroomSafeFromRainWater,
      ind34ClassroomSafeClean: this.state.ind34ClassroomSafeClean,

      ind4LibraryFurnitureOkay: this.state.ind4LibraryFurnitureOkay,
      ind41BookshelfUsable: this.state.ind41BookshelfUsable,
      ind42BookshelfProtectedSunRain: this.state.ind42BookshelfProtectedSunRain,
      ind43BookshelfPortableSafeForStudent:
        this.state.ind43BookshelfPortableSafeForStudent,
      ind44BookshelfReadingSpace: this.state.ind44BookshelfReadingSpace,
      ind45BookshelfFurnitureGoodCondition:
        this.state.ind45BookshelfFurnitureGoodCondition,

      ind5BookRegisterUpdated: this.state.ind5BookRegisterUpdated,

      ind6BookshelfOrganized: this.state.ind6BookshelfOrganized,
      ind61BookshelfBookOrganizedByGrade:
        this.state.ind61BookshelfBookOrganizedByGrade,
      ind62BookshelfRtRBookLabelViewable:
        this.state.ind62BookshelfRtRBookLabelViewable,
      ind63BookshelfNonRtRBookLabelViewable:
        this.state.ind63BookshelfNonRtRBookLabelViewable,
      ind64BookOrganizedByLabel: this.state.ind64BookOrganizedByLabel,
      ind65BookAccessible: this.state.ind65BookAccessible,
      ind66BookCoverViewable: this.state.ind66BookCoverViewable,

      ind7PrintRichItemDisplayed: this.state.ind7PrintRichItemDisplayed,
      ind71ChartPosterDisplayed: this.state.ind71ChartPosterDisplayed,
      ind72ChartPosterCompatible: this.state.ind72ChartPosterCompatible,

      ind8BookCheckoutFunctional: this.state.ind8BookCheckoutFunctional,
      ind81BookCheckoutProcedureDisplayed:
        this.state.ind81BookCheckoutProcedureDisplayed,
      ind82BookCheckoutRegisterUsable:
        this.state.ind82BookCheckoutRegisterUsable,
      ind83BookCheckoutRegisterUpdated:
        this.state.ind83BookCheckoutRegisterUpdated,
      ind84BookCheckoutPendingBookList:
        this.state.ind84BookCheckoutPendingBookList,
      ind85BookCheckoutDataCollection:
        this.state.ind85BookCheckoutDataCollection,
      ind86BookCheckoutByLeast5Student:
        this.state.ind86BookCheckoutByLeast5Student,

      ind9ReadingHourActivityFunctional:
        this.state.ind9ReadingHourActivityFunctional,
      ind91ReadingHourActivityWeekly: this.state.ind91ReadingHourActivityWeekly,
      ind92ReadingHourActivityRoutineHanged:
        this.state.ind92ReadingHourActivityRoutineHanged,
      ind93BookCheckoutOpportunity: this.state.ind93BookCheckoutOpportunity,
      ind94BookCheckoutNoticeHanged: this.state.ind94BookCheckoutNoticeHanged,

      ind10TeacherPerformReadingHourActivity:
        this.state.ind10TeacherPerformReadingHourActivity,
      ind101ReadingHourRegisterUpdated:
        this.state.ind101ReadingHourRegisterUpdated,
      ind102ReadingActivityListedRegister:
        this.state.ind102ReadingActivityListedRegister,

      ind11TrainedLibraryObservationReadingHour:
        this.state.ind11TrainedLibraryObservationReadingHour,

      ind12SchoolCommitteeDecisionAboutLibrary:
        this.state.ind12SchoolCommitteeDecisionAboutLibrary,
      ind121SchoolHasCommitteeAboutLibrary:
        this.state.ind121SchoolHasCommitteeAboutLibrary,
      ind122SchoolCommitteeMeetingAboutLibrary:
        this.state.ind122SchoolCommitteeMeetingAboutLibrary,

      ind13ParentMeetingAboutLibrary: this.state.ind13ParentMeetingAboutLibrary,

      ind14ReadPlayFestival: this.state.ind14ReadPlayFestival,
      ind141SchoolArrangeReadFestival:
        this.state.ind141SchoolArrangeReadFestival,
      ind142ParentPublicEngageReadFestival:
        this.state.ind142ParentPublicEngageReadFestival,

      ind15SustainabilityPlanByCommittee:
        this.state.ind15SustainabilityPlanByCommittee,
      ind151ParentPublicHeadTeacherCombinedPlan:
        this.state.ind151ParentPublicHeadTeacherCombinedPlan,
      ind152ParentPublicResponsibility:
        this.state.ind152ParentPublicResponsibility,

      bestPracticeIndicator1: this.state.bestPracticeIndicator1,
      bestPracticeIndicator2: this.state.bestPracticeIndicator2,
      bestPracticeIndicator3: this.state.bestPracticeIndicator3,

      coachingSupportIndicator1: this.state.coachingSupportIndicator1,
      coachingSupportIndicator2: this.state.coachingSupportIndicator2,
      coachingSupportIndicator3: this.state.coachingSupportIndicator3,

      agreedSuggestion: this.state.agreedSuggestion,
      agreedStatement: this.state.agreedStatement,

      libraryStatus: this.state.libraryStatus,
    };

    // Validation
    if (this.state.selectedDate === "") {
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
    } else if (this.state.yearOfEstablish === "") {
      Alert.alert("Alert", "Establish Year can not be empty");
      return;
    } else if (this.state.ind11IsPointTeacherIncharge === "") {
      Alert.alert("Alert", "Indicator 1.1 can not be empty");
      return;
    } else if (this.state.ind12IsTrainedLibraryManagementReadingHour === "") {
      Alert.alert("Alert", "Indicator 1.2 can not be empty");
      return;
    } else if (
      this.state.ind2HeadTeacherTrainedLibraryManagementReadingHour === ""
    ) {
      Alert.alert("Alert", "Indicator 2 can not be empty");
      return;
    } else if (this.state.ind31ClassroomDoorWindowOkay === "") {
      Alert.alert("Alert", "Indicator 3.1 can not be empty");
      return;
    } else if (this.state.ind32ClassroomDoorWindowLock === "") {
      Alert.alert("Alert", "Indicator 3.2 can not be empty");
      return;
    } else if (this.state.ind33ClassroomSafeFromRainWater === "") {
      Alert.alert("Alert", "Indicator 3.3 can not be empty");
      return;
    } else if (this.state.ind34ClassroomSafeClean === "") {
      Alert.alert("Alert", "Indicator 3.4 can not be empty");
      return;
    } else if (this.state.ind41BookshelfUsable === "") {
      Alert.alert("Alert", "Indicator 4.1 can not be empty");
      return;
    } else if (this.state.ind42BookshelfProtectedSunRain === "") {
      Alert.alert("Alert", "Indicator 4.2 can not be empty");
      return;
    } else if (this.state.ind43BookshelfPortableSafeForStudent === "") {
      Alert.alert("Alert", "Indicator 4.3 can not be empty");
      return;
    } else if (this.state.ind44BookshelfReadingSpace === "") {
      Alert.alert("Alert", "Indicator 4.4 can not be empty");
      return;
    } else if (this.state.ind45BookshelfFurnitureGoodCondition === "") {
      Alert.alert("Alert", "Indicator 4.5 can not be empty");
      return;
    } else if (this.state.ind5BookRegisterUpdated === "") {
      Alert.alert("Alert", "Indicator 5 can not be empty");
      return;
    } else if (this.state.ind61BookshelfBookOrganizedByGrade === "") {
      Alert.alert("Alert", "Indicator 6.1 can not be empty");
      return;
    } else if (this.state.ind62BookshelfRtRBookLabelViewable === "") {
      Alert.alert("Alert", "Indicator 6.2 can not be empty");
      return;
    } else if (this.state.ind63BookshelfNonRtRBookLabelViewable === "") {
      Alert.alert("Alert", "Indicator 6.3 can not be empty");
      return;
    } else if (this.state.ind64BookOrganizedByLabel === "") {
      Alert.alert("Alert", "Indicator 6.4 can not be empty");
      return;
    } else if (this.state.ind65BookAccessible === "") {
      Alert.alert("Alert", "Indicator 6.5 can not be empty");
      return;
    } else if (this.state.ind66BookCoverViewable === "") {
      Alert.alert("Alert", "Indicator 6.6 can not be empty");
      return;
    } else if (this.state.ind71ChartPosterDisplayed === "") {
      Alert.alert("Alert", "Indicator 7.1 can not be empty");
      return;
    } else if (this.state.ind72ChartPosterCompatible === "") {
      Alert.alert("Alert", "Indicator 7.2 can not be empty");
      return;
    } else if (this.state.ind81BookCheckoutProcedureDisplayed === "") {
      Alert.alert("Alert", "Indicator 8.1 can not be empty");
      return;
    } else if (this.state.ind82BookCheckoutRegisterUsable === "") {
      Alert.alert("Alert", "Indicator 8.2 can not be empty");
      return;
    } else if (this.state.ind83BookCheckoutRegisterUpdated === "") {
      Alert.alert("Alert", "Indicator 8.3 can not be empty");
      return;
    } else if (this.state.ind84BookCheckoutPendingBookList === "") {
      Alert.alert("Alert", "Indicator 8.4 can not be empty");
      return;
    } else if (this.state.ind85BookCheckoutDataCollection === "") {
      Alert.alert("Alert", "Indicator 8.5 can not be empty");
      return;
    } else if (this.state.ind86BookCheckoutByLeast5Student === "") {
      Alert.alert("Alert", "Indicator 8.6 can not be empty");
      return;
    } else if (this.state.ind91ReadingHourActivityWeekly === "") {
      Alert.alert("Alert", "Indicator 9.1 can not be empty");
      return;
    } else if (this.state.ind92ReadingHourActivityRoutineHanged === "") {
      Alert.alert("Alert", "Indicator 9.2 can not be empty");
      return;
    } else if (this.state.ind93BookCheckoutOpportunity === "") {
      Alert.alert("Alert", "Indicator 9.3 can not be empty");
      return;
    } else if (this.state.ind94BookCheckoutNoticeHanged === "") {
      Alert.alert("Alert", "Indicator 9.4 can not be empty");
      return;
    } else if (this.state.ind101ReadingHourRegisterUpdated === "") {
      Alert.alert("Alert", "Indicator 10.1 can not be empty");
      return;
    } else if (this.state.ind102ReadingActivityListedRegister === "") {
      Alert.alert("Alert", "Indicator 10.2 can not be empty");
      return;
    } else if (this.state.ind11TrainedLibraryObservationReadingHour === "") {
      Alert.alert("Alert", "Indicator 11 can not be empty");
      return;
    } else if (this.state.ind121SchoolHasCommitteeAboutLibrary === "") {
      Alert.alert("Alert", "Indicator 12.1 can not be empty");
      return;
    } else if (this.state.ind122SchoolCommitteeMeetingAboutLibrary === "") {
      Alert.alert("Alert", "Indicator 12.2 can not be empty");
      return;
    } else if (this.state.ind13ParentMeetingAboutLibrary === "") {
      Alert.alert("Alert", "Indicator 13 can not be empty");
      return;
    } else if (this.state.ind141SchoolArrangeReadFestival === "") {
      Alert.alert("Alert", "Indicator 14.1 can not be empty");
      return;
    } else if (this.state.ind142ParentPublicEngageReadFestival === "") {
      Alert.alert("Alert", "Indicator 14.2 can not be empty");
      return;
    } else if (this.state.ind151ParentPublicHeadTeacherCombinedPlan === "") {
      Alert.alert("Alert", "Indicator 15.1 can not be empty");
      return;
    } else if (this.state.ind152ParentPublicResponsibility === "") {
      Alert.alert("Alert", "Indicator 15.2 can not be empty");
      return;
    } else if (this.state.duplicateLibraryObservation.length > 0) {
      Alert.alert("Alert", "Data already inserted and can't be duplicate");
      return;
    } else {
      // Save data locally
      try {
        const existingData = await AsyncStorage.getItem(
          "offlineFormsPLibraryObservation",
        );
        const forms = existingData ? JSON.parse(existingData) : [];
        forms.push(formData);
        await AsyncStorage.setItem(
          "offlineFormsPLibraryObservation",
          JSON.stringify(forms),
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

  // Sync stored data
  syncPendingData = async () => {
    try {
      const existingData = await AsyncStorage.getItem(
        "offlineFormsPLibraryObservation",
      );
      if (existingData) {
        const formsToSync = JSON.parse(existingData);
        for (const formData of formsToSync) {
          await fetch(
            "http://118.179.80.51:8080/api/v1/p-library-observation",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            },
          );
        }
        console.log("LF Data syncing");
        await AsyncStorage.removeItem("offlineFormsPLibraryObservation"); // Clear synced data
        console.log(
          "Pending data synced successfully: " + JSON.parse(existingData),
        );
        Alert.alert("Pending data synced successfully to online!");
      }
    } catch (error) {
      console.error("Error syncing pending data:", error);
      Alert.alert("Error syncing pending data:", error);
    }
  };
  // Sync stored data

  // Calculate bestPractice  && coachingSupport
  bestPracticeIndcoachingSupportInd = () => {
    // this.setState({
    //   coachingSupportIndicator1: "N/A",
    //   coachingSupportIndicator2: "N/A",
    // });

    // this.setState({
    //   bestPracticeIndicator1: "N/A",
    //   bestPracticeIndicator2: "N/A",
    // });

    if (this.state.ind11IsPointTeacherIncharge === "") {
      Alert.alert("Alert", "Indicator 1.1 can not be empty");
      return;
    } else if (this.state.ind12IsTrainedLibraryManagementReadingHour === "") {
      Alert.alert("Alert", "Indicator 1.2 can not be empty");
      return;
    } else if (
      this.state.ind2HeadTeacherTrainedLibraryManagementReadingHour === ""
    ) {
      Alert.alert("Alert", "Indicator 2 can not be empty");
      return;
    } else if (this.state.ind31ClassroomDoorWindowOkay === "") {
      Alert.alert("Alert", "Indicator 3.1 can not be empty");
      return;
    } else if (this.state.ind32ClassroomDoorWindowLock === "") {
      Alert.alert("Alert", "Indicator 3.2 can not be empty");
      return;
    } else if (this.state.ind33ClassroomSafeFromRainWater === "") {
      Alert.alert("Alert", "Indicator 3.3 can not be empty");
      return;
    } else if (this.state.ind34ClassroomSafeClean === "") {
      Alert.alert("Alert", "Indicator 3.4 can not be empty");
      return;
    } else if (this.state.ind41BookshelfUsable === "") {
      Alert.alert("Alert", "Indicator 4.1 can not be empty");
      return;
    } else if (this.state.ind42BookshelfProtectedSunRain === "") {
      Alert.alert("Alert", "Indicator 4.2 can not be empty");
      return;
    } else if (this.state.ind43BookshelfPortableSafeForStudent === "") {
      Alert.alert("Alert", "Indicator 4.3 can not be empty");
      return;
    } else if (this.state.ind44BookshelfReadingSpace === "") {
      Alert.alert("Alert", "Indicator 4.4 can not be empty");
      return;
    } else if (this.state.ind45BookshelfFurnitureGoodCondition === "") {
      Alert.alert("Alert", "Indicator 4.5 can not be empty");
      return;
    } else if (this.state.ind5BookRegisterUpdated === "") {
      Alert.alert("Alert", "Indicator 5 can not be empty");
      return;
    } else if (this.state.ind61BookshelfBookOrganizedByGrade === "") {
      Alert.alert("Alert", "Indicator 6.1 can not be empty");
      return;
    } else if (this.state.ind62BookshelfRtRBookLabelViewable === "") {
      Alert.alert("Alert", "Indicator 6.2 can not be empty");
      return;
    } else if (this.state.ind63BookshelfNonRtRBookLabelViewable === "") {
      Alert.alert("Alert", "Indicator 6.3 can not be empty");
      return;
    } else if (this.state.ind64BookOrganizedByLabel === "") {
      Alert.alert("Alert", "Indicator 6.4 can not be empty");
      return;
    } else if (this.state.ind65BookAccessible === "") {
      Alert.alert("Alert", "Indicator 6.5 can not be empty");
      return;
    } else if (this.state.ind66BookCoverViewable === "") {
      Alert.alert("Alert", "Indicator 6.6 can not be empty");
      return;
    } else if (this.state.ind71ChartPosterDisplayed === "") {
      Alert.alert("Alert", "Indicator 7.1 can not be empty");
      return;
    } else if (this.state.ind72ChartPosterCompatible === "") {
      Alert.alert("Alert", "Indicator 7.2 can not be empty");
      return;
    } else if (this.state.ind81BookCheckoutProcedureDisplayed === "") {
      Alert.alert("Alert", "Indicator 8.1 can not be empty");
      return;
    } else if (this.state.ind82BookCheckoutRegisterUsable === "") {
      Alert.alert("Alert", "Indicator 8.2 can not be empty");
      return;
    } else if (this.state.ind83BookCheckoutRegisterUpdated === "") {
      Alert.alert("Alert", "Indicator 8.3 can not be empty");
      return;
    } else if (this.state.ind84BookCheckoutPendingBookList === "") {
      Alert.alert("Alert", "Indicator 8.4 can not be empty");
      return;
    } else if (this.state.ind85BookCheckoutDataCollection === "") {
      Alert.alert("Alert", "Indicator 8.5 can not be empty");
      return;
    } else if (this.state.ind86BookCheckoutByLeast5Student === "") {
      Alert.alert("Alert", "Indicator 8.6 can not be empty");
      return;
    } else if (this.state.ind91ReadingHourActivityWeekly === "") {
      Alert.alert("Alert", "Indicator 9.1 can not be empty");
      return;
    } else if (this.state.ind92ReadingHourActivityRoutineHanged === "") {
      Alert.alert("Alert", "Indicator 9.2 can not be empty");
      return;
    } else if (this.state.ind93BookCheckoutOpportunity === "") {
      Alert.alert("Alert", "Indicator 9.3 can not be empty");
      return;
    } else if (this.state.ind94BookCheckoutNoticeHanged === "") {
      Alert.alert("Alert", "Indicator 9.4 can not be empty");
      return;
    } else if (this.state.ind101ReadingHourRegisterUpdated === "") {
      Alert.alert("Alert", "Indicator 10.1 can not be empty");
      return;
    } else if (this.state.ind102ReadingActivityListedRegister === "") {
      Alert.alert("Alert", "Indicator 10.2 can not be empty");
      return;
    } else if (this.state.ind11TrainedLibraryObservationReadingHour === "") {
      Alert.alert("Alert", "Indicator 11 can not be empty");
      return;
    } else if (this.state.ind121SchoolHasCommitteeAboutLibrary === "") {
      Alert.alert("Alert", "Indicator 12.1 can not be empty");
      return;
    } else if (this.state.ind122SchoolCommitteeMeetingAboutLibrary === "") {
      Alert.alert("Alert", "Indicator 12.2 can not be empty");
      return;
    } else if (this.state.ind13ParentMeetingAboutLibrary === "") {
      Alert.alert("Alert", "Indicator 13 can not be empty");
      return;
    } else if (this.state.ind141SchoolArrangeReadFestival === "") {
      Alert.alert("Alert", "Indicator 14.1 can not be empty");
      return;
    } else if (this.state.ind142ParentPublicEngageReadFestival === "") {
      Alert.alert("Alert", "Indicator 14.2 can not be empty");
      return;
    } else if (this.state.ind151ParentPublicHeadTeacherCombinedPlan === "") {
      Alert.alert("Alert", "Indicator 15.1 can not be empty");
      return;
    } else if (this.state.ind152ParentPublicResponsibility === "") {
      Alert.alert("Alert", "Indicator 15.2 can not be empty");
      return;
    } else {
      // Setup CoachingSupport
      const variablesInd = [
        this.state.ind11IsPointTeacherIncharge,
        this.state.ind12IsTrainedLibraryManagementReadingHour,
        this.state.ind2HeadTeacherTrainedLibraryManagementReadingHour,
        this.state.ind31ClassroomDoorWindowOkay,
        this.state.ind32ClassroomDoorWindowLock,
        this.state.ind33ClassroomSafeFromRainWater,
        this.state.ind34ClassroomSafeClean,
        this.state.ind41BookshelfUsable,
        this.state.ind42BookshelfProtectedSunRain,
        this.state.ind43BookshelfPortableSafeForStudent,
        this.state.ind44BookshelfReadingSpace,
        this.state.ind45BookshelfFurnitureGoodCondition,
        this.state.ind5BookRegisterUpdated,
        this.state.ind61BookshelfBookOrganizedByGrade,
        this.state.ind62BookshelfRtRBookLabelViewable,
        this.state.ind63BookshelfNonRtRBookLabelViewable,
        this.state.ind64BookOrganizedByLabel,
        this.state.ind65BookAccessible,
        this.state.ind66BookCoverViewable,
        this.state.ind71ChartPosterDisplayed,
        this.state.ind72ChartPosterCompatible,
        this.state.ind81BookCheckoutProcedureDisplayed,
        this.state.ind82BookCheckoutRegisterUsable,
        this.state.ind83BookCheckoutRegisterUpdated,
        this.state.ind84BookCheckoutPendingBookList,
        this.state.ind85BookCheckoutDataCollection,
        this.state.ind86BookCheckoutByLeast5Student,
        this.state.ind91ReadingHourActivityWeekly,
        this.state.ind92ReadingHourActivityRoutineHanged,
        this.state.ind93BookCheckoutOpportunity,
        this.state.ind94BookCheckoutNoticeHanged,
        this.state.ind101ReadingHourRegisterUpdated,
        this.state.ind102ReadingActivityListedRegister,
        this.state.ind11TrainedLibraryObservationReadingHour,
        this.state.ind121SchoolHasCommitteeAboutLibrary,
        this.state.ind122SchoolCommitteeMeetingAboutLibrary,
        this.state.ind13ParentMeetingAboutLibrary,
        this.state.ind141SchoolArrangeReadFestival,
        this.state.ind142ParentPublicEngageReadFestival,
        this.state.ind151ParentPublicHeadTeacherCombinedPlan,
        this.state.ind152ParentPublicResponsibility,
      ];

      const variablesIndValue = [
        "১.১ পাঠাগার ব্যবস্থাপনার জন্য একজন শিক্ষক(পয়েন্ট শিক্ষক) দায়িত্ব প্রাপ্ত আছেন।",
        "১.২ পয়েন্ট শিক্ষক 'পাঠাগার ব্যবস্থাপনা ও পড়ার ঘণ্টা কার্যক্রম' প্রশিক্ষণে অংশগ্রহণ করেছেন।",
        "২. বিদ্যালয়ের প্রধান শিক্ষক রুম টু রিড পরিচালিত 'পাঠাগার ব্যবস্থাপনা ও পড়ার ঘণ্টা কার্যক্রম' প্রশিক্ষণে অংশগ্রহণ করেছেন।",
        "৩.১ শ্রেণিকক্ষের দরজা-জানালা ভালো অবস্থায় আছে।",
        "৩.২ শ্রেণিকক্ষ সুরক্ষিত; দরজা জানালায় তালা দেওয়ার ব্যবস্থা আছে যাতে বই হারিয়ে না যায়।",
        "৩.৩ বৃষ্টির সময় শ্রেণিকক্ষের ভেতরে পানি পড়ে না।",
        "৩.৪ শিক্ষার্থীদের বসার জন্য শ্রেণিকক্ষ ঝুঁকিপূর্ণ বা অস্বস্তিকর নয় (ফাটল, গর্ত ইত্যাদি সমস্যা নেই)।",
        "৪.১ বুকশেলফের আশেপাশে পর্যাপ্ত জায়গা রয়েছে যাতে শিক্ষার্থীরা সহজে চলাচল করতে পারে, সহজে বই নিতে পারে এবং বই পড়ার কাজে অংশ নিতে পারে।",
        "৪.২ বুকশেলফ এমন জায়গায় স্থাপন করা হয়েছে যেন বইয়ের উপর সরাসরি সূর্যের আলো বা বৃষ্টি পড়ে না কিংবা সরাসরি জানালার সম্মুখে নয়।",
        "৪.৩ বুকশেলফ সহজে বহনযোগ্য, এতে কোন ধারালো বস্তু বা বেরিয়ে থাকা 'স্ক্রু' নেই যা থেকে শিক্ষার্থীদের ক্ষতি হতে পারে।",
        "৪.৪ বুকশেলফটি কোন ডেস্ক, চেয়ার, টেবিল দ্বারা আবদ্ধ নয় এবং শেলফের পাশে দাঁড়িয়ে বা বসে পড়ার যথেষ্ট জায়গা আছে।",
        "৪.৫ বুকশেলফ চেয়ার, টেবিল এবং ডেস্ক ভালো অবস্থায় আছে (ভাঙ্গা/ব্যবহার অনুপযোগী নয়)।",
        "৫. বুক রেজিস্টার আছে এবং নতুন বই পাওয়ার সাথে সাথে নিয়মিত হালনাগাদ করা হয়েছে।",
        "৬.১ সকল বই এবং সংশ্লিষ্ট পড়ার সামগ্রী নির্ধারিত শ্রেণির শেলফে সাজানো আছে, বাক্সে বা অন্য কক্ষে তালাবদ্ধ নয়।",
        "৬.২ রুম টু রিড প্রকাশিত বইগুলো লেভেল অনুযায়ী সাজানো এবং বইয়ের কভারের লেভেল সহজেই চোখে পড়ে।",
        "৬.৩ রুম টু রিড প্রকাশিত নয় এমন বইও লেভেল অনুযায়ী সাজানো এবং বইয়ের কভারের লেভেল সহজেই চোখে পড়ে।",
        "৬.৪ নির্দিষ্ট লেভেলের বই একসাথে সাজানো যাতে বিভিন্ন লেভেলের বই সহজে চিহ্নিত করা যায়।",
        "৬.৫ বইগুলো এমনভাবে সাজানো আছে যাতে শিক্ষার্থীরা সহজেই নিতে পারে।",
        "৬.৬ বইগুলো এমনভাবে সাজানো আছে যাতে সর্বোচ্চ সংখ্যক বইয়ের প্রচ্ছদ দেখা যায়।",
        "৭.১ চার্ট পোস্টার অথবা শিক্ষার্থীদের সৃজনশীল কাজ (আঁকা এবং লেখা) প্রদর্শিত আছে।",
        "৭.২ চার্ট ও পোস্টারের লেখা শিক্ষার্থীদের পঠন দক্ষতার সাথে সঙ্গতিপূর্ণ-স্পষ্ট ও বড় অক্ষরে লেখা।",
        "৮.১ বই চেক-আউটের নিয়মাবলী ও প্রক্রিয়া শ্রেণিকক্ষে পোস্টারে প্রদর্শিত আছে।",
        "৮.২ বই চেক-আউট করার জন্য রেজিস্টার-এর ব্যবহার আছে।",
        "৮.৩ পূর্ববর্তী সপ্তাহের বই গ্রহণ ও জমা দেয়ার তথ্য রেজিস্টারে লিপিবদ্ধ আছে",
        "৮.৪ গত মাস পর্যন্ত ফেরত দেওয়া হয়নি এমন বইসমূহের নাম রেজিস্টারে লিপিবদ্ধ আছে।",
        "৮.৫ পূর্ববর্তী মাসে এই চেক-আউট হয়েছে।",
        "৮.৬ গত তিন মাসে প্রত্যেক শ্রেণি থেকে কমপক্ষে পাঁচজন শিক্ষার্থী বই চেক-আউট করেছে।",
        "৯.১ বিদ্যালয়ের সকল শ্রেণির রুটিনে সন্তাহে একদিন পড়ার ঘণ্টা কার্যক্রম আছে।",
        "৯.২ পড়ার ঘন্টা সম্বলিত রুটিন বিদ্যালয়ের কোনো না কোনো স্থানে টানানো আছে।",
        "৯.৩ প্রতিদিন বিদ্যালয় ছুটির পূর্বে-পরে অথবা বিরতির সময় বা পড়ার ঘণ্টায় বই পড়া বা চেক-আউটের সুযোগ আছে।",
        "৯.৪ ছুটির পূর্বে, পরে, বিরতির সময় বই পড়া বা চেক-আউটের নির্দেশনা বিদ্যালয়ে টানানো আছে।",
        "১০.১ পড়াভিত্তিক কার্যক্রমের তথ্য লিপিবদ্ধ করার জন্য একটি রেজিস্টার হয়েছে এবং শিক্ষক প্রতি সপ্তাহে পড়ার ঘণ্টায় কী কী কার্যক্রম করেছেন যা লিপিবদ্ধ করেন।",
        "১০.২ পড়াভিত্তিক চারটি কাজের মধ্যে সপ্তাহে কমপক্ষে একটি কাজ রেজিস্টারে উল্লেখ রয়েছে।",
        "১১. বিদ্যালয়ের পড়ার ঘণ্টা সংশ্লিষ্ট সকল শিক্ষক রুম টু রিড প্রদত্ত 'পাঠাগার ব্যবস্থাপনা ও পড়ার ঘণ্টা কার্যক্রম' প্রশিক্ষণে অংশগ্রহন করেছেন।",
        "১২.১ বিদ্যালয়ে একটি কমিটি আছে যা পাঠাগার সংক্রান্ত বিষয়ে সিদ্ধান্ত নেয়।",
        "১২.২ বিগত ছয় মাসে কমিটি একটি সভা করেছে এবং সভায় পাঠাগার বিষয়ে আলোচনা হয়েছে।",
        "১৩. বিদ্যালয়ে গত ছয় মাসে কমপক্ষে একটি অভিভাবক সভা হয়েছে যেখানে শিক্ষার্থীদের পঠন অথবা পাঠাগার বিষয়ে আলোচনা হয়েছে।",
        "১৪.১ বিদ্যালয় কর্তৃপক্ষ বিগত বছরে পড়া অথবা পাঠাগার নিয়ে একটি অনুষ্ঠান আয়োজন করেছে।",
        "১৪.২ অনুষ্ঠানটির পরিকল্পনা এবং পরিচালনায় অভিভাবক ও স্থানীয় জনগণের অংশগ্রহণ ছিল।",
        "১৫.১ অভিভাবক, স্থানীয় জনগণ এবং প্রধান শিক্ষক যৌথভাবে একমত হয়ে পরিকল্পনাটি করেছেন।",
        "১৫.২ পরিকল্পনায় অভিভাবক ও স্থানীয় জনগণের সুনির্দিষ্ট দায়িত্বের বিষয়টি উল্লেখ আছে।",
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
        }
      }
      // Setup CoachingSupport

      // Setup BestPractice test2
      let yesCount = 0;

      for (let i = variablesInd.length; i >= 0; i--) {
        if (variablesInd[i] === "Yes") {
          if (yesCount === 0) {
            // Assign the first 'yes' found to bestPracticeInd1
            this.setState({
              bestPracticeIndicator1: variablesIndValue[i],
            });
            yesCount++;
          } else if (yesCount === 1) {
            this.setState({
              bestPracticeIndicator2: variablesIndValue[i],
            }); // Assign the second 'yes' found to y
            yesCount++;
            // We found both, so we can stop the loop if needed (optional optimization)
            break;
          }
        }
      }
      // Setup BestPractice test2
    }
  };
  // Calculate bestPractice  && coachingSupport

  render() {
    // All data to save
    const {
      // Network
      isConnected,
      connectionType,
      // Network

      employee,
      school,
      teacher,
      office,
      project,

      show,
      date,
      mode,
      selectedDate,
      libraryStatus,
      pickerOffice,
      pickerProject,
      pickerDistrict,
      pickerDistrictKey,
      pickerUpazilla,
      pickerUpazillaKey,
      pickerSchool,
      pickerVisitor,
      pickerDesignation,
      pickerVisitorOffice,
      pickerLF,
      pickerLPO,
      pickerLFName,
      pickerLPOName,
      pickerMonth,
      pickerYear,
      pickerPhase,

      visitor,
      visitorDesignation,

      pointTeacher,
      rtrSchoolId,
      yearOfSupport,
      yearOfEstablish,

      note,
      // General data

      // Last visit topic
      pickerFollowup1,
      pickerFollowup2,
      pickerFollowup3,
      // Last visit topic

      ind1IsTrainedOneTeacher,
      ind11IsPointTeacherIncharge,
      ind12IsTrainedLibraryManagementReadingHour,

      ind2HeadTeacherTrainedLibraryManagementReadingHour,

      ind3ClassroomSuitableLibraryActivity,
      ind31ClassroomDoorWindowOkay,
      ind32ClassroomDoorWindowLock,
      ind33ClassroomSafeFromRainWater,
      ind34ClassroomSafeClean,

      ind4LibraryFurnitureOkay,
      ind41BookshelfUsable,
      ind42BookshelfProtectedSunRain,
      ind43BookshelfPortableSafeForStudent,
      ind44BookshelfReadingSpace,
      ind45BookshelfFurnitureGoodCondition,

      ind5BookRegisterUpdated,

      ind6BookshelfOrganized,
      ind61BookshelfBookOrganizedByGrade,
      ind62BookshelfRtRBookLabelViewable,
      ind63BookshelfNonRtRBookLabelViewable,
      ind64BookOrganizedByLabel,
      ind65BookAccessible,
      ind66BookCoverViewable,

      ind7PrintRichItemDisplayed,
      ind71ChartPosterDisplayed,
      ind72ChartPosterCompatible,

      ind8BookCheckoutFunctional,
      ind81BookCheckoutProcedureDisplayed,
      ind82BookCheckoutRegisterUsable,
      ind83BookCheckoutRegisterUpdated,
      ind84BookCheckoutPendingBookList,
      ind85BookCheckoutDataCollection,
      ind86BookCheckoutByLeast5Student,

      ind9ReadingHourActivityFunctional,
      ind91ReadingHourActivityWeekly,
      ind92ReadingHourActivityRoutineHanged,
      ind93BookCheckoutOpportunity,
      ind94BookCheckoutNoticeHanged,

      ind10TeacherPerformReadingHourActivity,
      ind101ReadingHourRegisterUpdated,
      ind102ReadingActivityListedRegister,

      ind11TrainedLibraryObservationReadingHour,

      ind12SchoolCommitteeDecisionAboutLibrary,
      ind121SchoolHasCommitteeAboutLibrary,
      ind122SchoolCommitteeMeetingAboutLibrary,

      ind13ParentMeetingAboutLibrary,

      ind14ReadPlayFestival,
      ind141SchoolArrangeReadFestival,
      ind142ParentPublicEngageReadFestival,

      ind15SustainabilityPlanByCommittee,
      ind151ParentPublicHeadTeacherCombinedPlan,
      ind152ParentPublicResponsibility,

      // Discussion topic
      bestPracticeIndicator1,
      bestPracticeIndicator1Details,
      bestPracticeIndicator2,
      bestPracticeIndicator2Details,
      bestPracticeIndicator3,
      bestPracticeIndicator3Details,

      coachingSupportIndicator1,
      coachingSupportIndicator1Details,
      coachingSupportIndicator2,
      coachingSupportIndicator2Details,

      agreedStatement1,
      agreedStatement2,
    } = this.state;
    // All data to save

    return (
      <View style={styles.container}>
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
            PREVAIL শ্রেণিকক্ষ পাঠাগার পর্যবেক্ষণ ফরম (Library Observation)
          </Text>
        </View>
        <Text
          style={{
            fontSize: 12,
            marginBottom: 2,
            marginLeft: 100,
            marginRight: 100,
          }}
        >
          (এলএফ-দের জন্য)
        </Text>
        <ScrollView>
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
                  <Button onPress={this.datepicker} title="Select Date" />
                  {show && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      is24Hour={true}
                      display="spinner"
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
            <Text style={styles.bigRedText}>নির্দেশনা (Instructions)</Text>
            <Card style={{ padding: 10, margin: 10 }}>
              <Text style={{ padding: 5 }}>
                ১ প্রধান ইনডিকেটরের অধীন সকল সাব-ইনডিকেটর "Yes" হলে প্রধান
                ইনডিকেটরটি "Yes" হবে ।
              </Text>
              <Text style={{ padding: 5 }}>
                ২. পাঠাগার সংক্রান্ত ৩-৪ টি ভালো দিক উল্লেখ করুন।
              </Text>
              <Text style={{ padding: 5 }}>
                ৩. প্রথম যে ২-৩ টি ইনডিকেটরের উত্তর "No" হয়েছে তার আলোকে সহায়তার
                জন্য অগ্রাধিকারভিত্তিক ইনডিকেটর উল্লেখ করুন ।
              </Text>
              <Text style={{ padding: 5 }}>
                ৪. শ্রেণিকক্ষ পাঠাগারের সমস্যা নিয়ে পয়েন্ট শিক্ষকের সাথে আলোচনা
                করুন।
              </Text>
              <Text style={{ padding: 5 }}>
                ৫ রুম টু রিড থেকে কোনো পদক্ষেপ গ্রহণের প্রয়োজন হলে উল্লেখ করুন
                ।
              </Text>
            </Card>
            <Card style={{ padding: 10, margin: 10 }}>
              <Text style={{ justifyContent: "flex-end" }}>
                ফলো-আপ করার জন্য গত পরিদর্শন থেকে প্রাপ্ত ২-৩ টি বিষয় উল্লেখ
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
                      value={this.state.lastFollowupIndicator1 + ""}
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
                      value={this.state.lastFollowupIndicator2 + ""}
                    ></TextInput>
                  </View>
                </View>
              </View>
            </Card>
          </View> */}

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>ইনডিকেটর (Indicator)</Text>
            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                ইনডিকেটর(প্রতিটি সাব-ইনডিকেটর "Yes" হলে প্রধান ইনডিকেটর "Yes"
                হবে)
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
                    ১. বিদ্যালয়ের সংশ্লিষ্ট একজন শিক্ষক পাঠাগার ব্যবস্থাপনা
                    বিষয়ে প্রশিক্ষণে অংশগ্রহণ করেছেন
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
                      <Text></Text>
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        {this.state.ind1IsTrainedOneTeacher}
                      </Text>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        এলপিও-কে অবহিত করুন এবং রুম টু রিডের সহায়তা প্রয়োজন হলে
                        মাসিক প্রতিবেদনে উল্লেখ করুন
                      </Text>
                    </View>
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
                  <Text>
                    ১.১ পাঠাগার ব্যবস্থাপনার জন্য একজন শিক্ষক (পয়েন্ট শিক্ষক)
                    দায়িত্ব প্রাপ্ত আছেন
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
                        selectedValue={this.state.ind11IsPointTeacherIncharge}
                        onValueChange={(value) => {
                          this.setState({
                            ind11IsPointTeacherIncharge: value,
                          });

                          // Set main indicator
                          if (
                            value === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes"
                          ) {
                            this.setState({
                              ind1IsTrainedOneTeacher: "Yes",
                            });
                          } else {
                            this.setState({
                              ind1IsTrainedOneTeacher: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            value === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            value === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            value === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            value === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        এলপিও-কে অবহিত করুন এবং রুম টু রিডের সহায়তা প্রয়োজন হলে
                        মাসিক প্রতিবেদনে উল্লেখ করুন
                      </Text>
                    </View>
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
                  <Text>
                    ১.২ পয়েন্ট শিক্ষক "পাঠাগার ব্যবস্থাপনা ও পড়ার ঘণ্টা
                    কার্যক্রম" প্রশিক্ষণে অংশগ্রহণ করেছেন
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
                          this.state.ind12IsTrainedLibraryManagementReadingHour
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind12IsTrainedLibraryManagementReadingHour: value,
                          });

                          // Set main indicator
                          if (
                            value === "Yes" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes"
                          ) {
                            this.setState({
                              ind1IsTrainedOneTeacher: "Yes",
                            });
                          } else {
                            this.setState({
                              ind1IsTrainedOneTeacher: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            value === "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            value === "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            value === "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            value === "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        এলপিও-কে অবহিত করুন এবং রুম টু রিডের সহায়তা প্রয়োজন হলে
                        মাসিক প্রতিবেদনে উল্লেখ করুন
                      </Text>
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
                    ২. বিদ্যালয়ের প্রধান শিক্ষক রুম টু রিড পরিচালিত "পাঠাগার
                    ব্যবস্থাপনা ও পড়ার ঘণ্টা কার্যক্রম" প্রশিক্ষণে অংশগ্রহণ
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
                          height: 60,
                          width: 150,
                        }}
                        selectedValue={
                          this.state
                            .ind2HeadTeacherTrainedLibraryManagementReadingHour
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind2HeadTeacherTrainedLibraryManagementReadingHour:
                              value,
                          });

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        এলপিও-কে অবহিত করুন এবং রুম টু রিডের সহায়তা প্রয়োজন হলে
                        মাসিক প্রতিবেদনে উল্লেখ করুন
                      </Text>
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
                    ৩. পাঠাগার কার্যক্রম পরিচালনার জন্য শ্রেণিকক্ষটি উপযোগী
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
                      <Text></Text>
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        {this.state.ind3ClassroomSuitableLibraryActivity}
                      </Text>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে কোনো উন্নতি
                        প্রয়োজন হলে প্রধান শিক্ষকের সাথে আলোচনা এবং এলপিও-কে
                        অবহিত করুন । সহায়তা প্রয়োজন হলে মাসিক প্রতিবেদনে উল্লেখ
                        করুন
                      </Text>
                    </View>
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
                  <Text>৩.১ শ্রেণিকক্ষের দরজা-জানালা ভালো অবস্থায় আছে</Text>
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
                        selectedValue={this.state.ind31ClassroomDoorWindowOkay}
                        onValueChange={(value) => {
                          this.setState({
                            ind31ClassroomDoorWindowOkay: value,
                          });

                          // Set main indicator
                          if (
                            value === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes"
                          ) {
                            this.setState({
                              ind3ClassroomSuitableLibraryActivity: "Yes",
                            });
                          } else {
                            this.setState({
                              ind3ClassroomSuitableLibraryActivity: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে কোনো উন্নতি
                        প্রয়োজন হলে প্রধান শিক্ষকের সাথে আলোচনা এবং এলপিও-কে
                        অবহিত করুন । সহায়তা প্রয়োজন হলে মাসিক প্রতিবেদনে উল্লেখ
                        করুন
                      </Text>
                    </View>
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
                  <Text>
                    ৩.২ শ্রেণিকক্ষ সুরক্ষিত; দরজা জানালায় তালা দেওয়ার ব্যবস্থা
                    আছে যাতে বই হারিয়ে না যায়
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
                        selectedValue={this.state.ind32ClassroomDoorWindowLock}
                        onValueChange={(value) => {
                          this.setState({
                            ind32ClassroomDoorWindowLock: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            value === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes"
                          ) {
                            this.setState({
                              ind3ClassroomSuitableLibraryActivity: "Yes",
                            });
                          } else {
                            this.setState({
                              ind3ClassroomSuitableLibraryActivity: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            value === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            value === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            value === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            value === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে কোনো উন্নতি
                        প্রয়োজন হলে প্রধান শিক্ষকের সাথে আলোচনা এবং এলপিও-কে
                        অবহিত করুন । সহায়তা প্রয়োজন হলে মাসিক প্রতিবেদনে উল্লেখ
                        করুন
                      </Text>
                    </View>
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
                  <Text>৩.৩ বৃষ্টির সময় শ্রেণিকক্ষের ভেতরে পানি পড়ে না</Text>
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
                          this.state.ind33ClassroomSafeFromRainWater
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind33ClassroomSafeFromRainWater: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            value === "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes"
                          ) {
                            this.setState({
                              ind3ClassroomSuitableLibraryActivity: "Yes",
                            });
                          } else {
                            this.setState({
                              ind3ClassroomSuitableLibraryActivity: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            value === "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            value === "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            value === "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            value === "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে কোনো উন্নতি
                        প্রয়োজন হলে প্রধান শিক্ষকের সাথে আলোচনা এবং এলপিও-কে
                        অবহিত করুন । সহায়তা প্রয়োজন হলে মাসিক প্রতিবেদনে উল্লেখ
                        করুন
                      </Text>
                    </View>
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
                  <Text>
                    ৩.৪ শিক্ষার্থীদের বসার জন্য শ্রেণিকক্ষ ঝুঁকিপূর্ণ বা
                    অস্বস্তিকর নয় (ফাটল, গর্ত ইত্যাদি সমস্যা নেই)
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
                        selectedValue={this.state.ind34ClassroomSafeClean}
                        onValueChange={(value) => {
                          this.setState({
                            ind34ClassroomSafeClean: value,
                          });
                          // Set main indicator
                          if (
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            value === "Yes"
                          ) {
                            this.setState({
                              ind3ClassroomSuitableLibraryActivity: "Yes",
                            });
                          } else {
                            this.setState({
                              ind3ClassroomSuitableLibraryActivity: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে কোনো উন্নতি
                        প্রয়োজন হলে প্রধান শিক্ষকের সাথে আলোচনা এবং এলপিও-কে
                        অবহিত করুন । সহায়তা প্রয়োজন হলে মাসিক প্রতিবেদনে উল্লেখ
                        করুন
                      </Text>
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
                    ৪. পাঠাগারের আসবাবপত্র ঠিকমতো স্থাপন করা হয়েছে এবং ভালো
                    অবস্থায় আছে
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
                      <Text></Text>
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        {this.state.ind4LibraryFurnitureOkay}
                      </Text>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে আরও ভালো কোনো
                        স্থানে ঠিকমত পাঠাগার স্থাপন করা যায় কিনা এ বিষয়ে
                        পাঠাগারের দায়িত্বপ্রাপ্ত শিক্ষকের সাথে আলোচনা করুন ।
                        প্রয়োজনে স্থাপন করে দেখান ।
                      </Text>
                    </View>
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
                  <Text>
                    ৪.১ বুকশেলফের আশেপাশে পর্যাপ্ত জায়গা রয়েছে যাতে শিক্ষার্থীরা
                    সহজে চলাচল করতে পারে, সহজে বই নিতে পারে এবং বই পড়ার কাজে অংশ
                    নিতে পারে
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
                        selectedValue={this.state.ind41BookshelfUsable}
                        onValueChange={(value) => {
                          this.setState({
                            ind41BookshelfUsable: value,
                          });

                          // Set main indicator
                          if (
                            value === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes"
                          ) {
                            this.setState({
                              ind4LibraryFurnitureOkay: "Yes",
                            });
                          } else {
                            this.setState({
                              ind4LibraryFurnitureOkay: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            value === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            value === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            value === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            value === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে আরও ভালো কোনো
                        স্থানে ঠিকমত পাঠাগার স্থাপন করা যায় কিনা এ বিষয়ে
                        পাঠাগারের দায়িত্বপ্রাপ্ত শিক্ষকের সাথে আলোচনা করুন ।
                        প্রয়োজনে স্থাপন করে দেখান ।
                      </Text>
                    </View>
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
                  <Text>
                    ৪.২ বুকশেলফ এমন জায়গায় স্থাপন করা হয়েছে যেন বইয়ের উপর সরাসরি
                    সূর্যের আলো বা বৃষ্টি পড়ে না কিংবা সরাসরি জানালার সম্মুখে নয়
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
                          this.state.ind42BookshelfProtectedSunRain
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind42BookshelfProtectedSunRain: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind41BookshelfUsable === "Yes" &&
                            value === "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes"
                          ) {
                            this.setState({
                              ind4LibraryFurnitureOkay: "Yes",
                            });
                          } else {
                            this.setState({
                              ind4LibraryFurnitureOkay: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            value === "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            value === "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            value === "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            value === "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে আরও ভালো কোনো
                        স্থানে ঠিকমত পাঠাগার স্থাপন করা যায় কিনা এ বিষয়ে
                        পাঠাগারের দায়িত্বপ্রাপ্ত শিক্ষকের সাথে আলোচনা করুন ।
                        প্রয়োজনে স্থাপন করে দেখান ।
                      </Text>
                    </View>
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
                  <Text>
                    ৪.৩ বুকশেলফ সহজে বহনযোগ্য, এতে কোন ধারালো বস্তু বা বেরিয়ে
                    থাকা "স্ক্রু" নেই যা থেকে শিক্ষার্থীদের ক্ষতি হতে পারে
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
                          this.state.ind43BookshelfPortableSafeForStudent
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind43BookshelfPortableSafeForStudent: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes"
                          ) {
                            this.setState({
                              ind4LibraryFurnitureOkay: "Yes",
                            });
                          } else {
                            this.setState({
                              ind4LibraryFurnitureOkay: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে আরও ভালো কোনো
                        স্থানে ঠিকমত পাঠাগার স্থাপন করা যায় কিনা এ বিষয়ে
                        পাঠাগারের দায়িত্বপ্রাপ্ত শিক্ষকের সাথে আলোচনা করুন ।
                        প্রয়োজনে স্থাপন করে দেখান ।
                      </Text>
                    </View>
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
                  <Text>
                    ৪.৪ বুকশেলফটি কোন ডেস্ক, চেয়ার, টেবিল দ্বারা আবদ্ধ নয় এবং
                    শেলফের পাশে দাঁড়িয়ে বা বসে পড়ার যথেষ্ট জায়গা আছে
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
                        selectedValue={this.state.ind44BookshelfReadingSpace}
                        onValueChange={(value) => {
                          this.setState({
                            ind44BookshelfReadingSpace: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes"
                          ) {
                            this.setState({
                              ind4LibraryFurnitureOkay: "Yes",
                            });
                          } else {
                            this.setState({
                              ind4LibraryFurnitureOkay: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে আরও ভালো কোনো
                        স্থানে ঠিকমত পাঠাগার স্থাপন করা যায় কিনা এ বিষয়ে
                        পাঠাগারের দায়িত্বপ্রাপ্ত শিক্ষকের সাথে আলোচনা করুন ।
                        প্রয়োজনে স্থাপন করে দেখান ।
                      </Text>
                    </View>
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
                  <Text>
                    ৪.৫ বুকশেলফ চেয়ার, টেবিল এবং ডেস্ক ভালো অবস্থায় আছে
                    (ভাঙ্গা/ব্যবহার অনুপযোগী নয়)
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
                          this.state.ind45BookshelfFurnitureGoodCondition
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind45BookshelfFurnitureGoodCondition: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            value === "Yes"
                          ) {
                            this.setState({
                              ind4LibraryFurnitureOkay: "Yes",
                            });
                          } else {
                            this.setState({
                              ind4LibraryFurnitureOkay: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            value === "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            value === "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            value === "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            value === "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে আরও ভালো কোনো
                        স্থানে ঠিকমত পাঠাগার স্থাপন করা যায় কিনা এ বিষয়ে
                        পাঠাগারের দায়িত্বপ্রাপ্ত শিক্ষকের সাথে আলোচনা করুন ।
                        প্রয়োজনে স্থাপন করে দেখান ।
                      </Text>
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
                    ৫. বুক রেজিস্টার আছে এবং নতুন বই পাওয়ার সাথে সাথে নিয়মিত
                    হালনাগাদ করা হয়েছে
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
                        selectedValue={this.state.ind5BookRegisterUpdated}
                        onValueChange={(value) => {
                          this.setState({
                            ind5BookRegisterUpdated: value,
                          });

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>বুক রেজিস্টার যাচাই করুন এবং হালনাগাদ করুন ।</Text>
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
                    ৬. বুক শেলফে নির্দেশনা অনুযায়ী বই সাজানো হয়েছে
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
                      <Text></Text>
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        {this.state.ind6BookshelfOrganized}
                      </Text>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে বই কিভাবে সাজাতে
                        হয় বলুন এবং পাঠাগারের পয়েন্ট শিক্ষককে সাথে নিয়ে বই
                        সাজিয়ে দেখান ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৬.১ সকল বই এবং সংশ্লিষ্ট পড়ার সামগ্রী নির্ধারিত শ্রেণির
                    শেলফে সাজানো আছে, বাক্সে বা অন্য কক্ষে তালাবদ্ধ নয়
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
                          this.state.ind61BookshelfBookOrganizedByGrade
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind61BookshelfBookOrganizedByGrade: value,
                          });

                          // Set main indicator
                          if (
                            value === "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes"
                          ) {
                            this.setState({
                              ind6BookshelfOrganized: "Yes",
                            });
                          } else {
                            this.setState({
                              ind6BookshelfOrganized: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            value === "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            value === "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            value === "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            value === "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে বই কিভাবে সাজাতে
                        হয় বলুন এবং পাঠাগারের পয়েন্ট শিক্ষককে সাথে নিয়ে বই
                        সাজিয়ে দেখান ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৬.২ রুম টু রিড প্রকাশিত বইগুলো লেভেল অনুযায়ী সাজানো এবং
                    বইয়ের কভারের লেভেল সহজেই চোখে পড়ে
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
                          this.state.ind62BookshelfRtRBookLabelViewable
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind62BookshelfRtRBookLabelViewable: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes"
                          ) {
                            this.setState({
                              ind6BookshelfOrganized: "Yes",
                            });
                          } else {
                            this.setState({
                              ind6BookshelfOrganized: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে বই কিভাবে সাজাতে
                        হয় বলুন এবং পাঠাগারের পয়েন্ট শিক্ষককে সাথে নিয়ে বই
                        সাজিয়ে দেখান ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৬.৩ রুম টু রিড প্রকাশিত নয় এমন বইও লেভেল অনুযায়ী সাজানো এবং
                    বইয়ের কভারের লেভেল সহজেই চোখে পড়ে
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
                          this.state.ind63BookshelfNonRtRBookLabelViewable
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind63BookshelfNonRtRBookLabelViewable: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes"
                          ) {
                            this.setState({
                              ind6BookshelfOrganized: "Yes",
                            });
                          } else {
                            this.setState({
                              ind6BookshelfOrganized: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে বই কিভাবে সাজাতে
                        হয় বলুন এবং পাঠাগারের পয়েন্ট শিক্ষককে সাথে নিয়ে বই
                        সাজিয়ে দেখান ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৬.৪ নির্দিষ্ট লেভেলের বই একসাথে সাজানো যাতে বিভিন্ন লেভেলের
                    বই সহজে চিহ্নিত করা যায়
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
                        selectedValue={this.state.ind64BookOrganizedByLabel}
                        onValueChange={(value) => {
                          this.setState({
                            ind64BookOrganizedByLabel: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes"
                          ) {
                            this.setState({
                              ind6BookshelfOrganized: "Yes",
                            });
                          } else {
                            this.setState({
                              ind6BookshelfOrganized: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে বই কিভাবে সাজাতে
                        হয় বলুন এবং পাঠাগারের পয়েন্ট শিক্ষককে সাথে নিয়ে বই
                        সাজিয়ে দেখান ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৬.৫ বইগুলো এমনভাবে সাজানো আছে যাতে শিক্ষার্থীরা সহজেই নিতে
                    পারে
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
                        selectedValue={this.state.ind65BookAccessible}
                        onValueChange={(value) => {
                          this.setState({
                            ind65BookAccessible: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            value === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes"
                          ) {
                            this.setState({
                              ind6BookshelfOrganized: "Yes",
                            });
                          } else {
                            this.setState({
                              ind6BookshelfOrganized: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            value === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            value === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            value === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            value === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে বই কিভাবে সাজাতে
                        হয় বলুন এবং পাঠাগারের পয়েন্ট শিক্ষককে সাথে নিয়ে বই
                        সাজিয়ে দেখান ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৬.৬ বইগুলো এমনভাবে সাজানো আছে যাতে সর্বোচ্চ সংখ্যক বইয়ের
                    প্রচ্ছদ দেখা যায়
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
                        selectedValue={this.state.ind66BookCoverViewable}
                        onValueChange={(value) => {
                          this.setState({
                            ind66BookCoverViewable: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            value === "Yes"
                          ) {
                            this.setState({
                              ind6BookshelfOrganized: "Yes",
                            });
                          } else {
                            this.setState({
                              ind6BookshelfOrganized: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            value === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            value === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            value === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            value === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালের আলোকে বই কিভাবে সাজাতে
                        হয় বলুন এবং পাঠাগারের পয়েন্ট শিক্ষককে সাথে নিয়ে বই
                        সাজিয়ে দেখান ।
                      </Text>
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
                    ৭. ছাপাসমৃদ্ধ উপকরণসমূহ প্রদর্শিত হয়েছে
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
                      <Text></Text>
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        {this.state.ind7PrintRichItemDisplayed}
                      </Text>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        ম্যানুয়ালের আলোকে পয়েন্ট শিক্ষককে সাথে নিয়ে শ্রেণিকক্ষ
                        ছাপাসমৃদ্ধ করার পদক্ষেপ নিন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৭.১ চার্ট পোস্টার অথবা শিক্ষার্থীদের সৃজনশীল কাজ (আঁকা এবং
                    লেখা) প্রদর্শিত আছে
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
                        selectedValue={this.state.ind71ChartPosterDisplayed}
                        onValueChange={(value) => {
                          this.setState({
                            ind71ChartPosterDisplayed: value,
                          });

                          // Set main indicator
                          if (
                            value === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes"
                          ) {
                            this.setState({
                              ind7PrintRichItemDisplayed: "Yes",
                            });
                          } else {
                            this.setState({
                              ind7PrintRichItemDisplayed: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            value === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            value === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            value === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            value === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        ম্যানুয়ালের আলোকে পয়েন্ট শিক্ষককে সাথে নিয়ে শ্রেণিকক্ষ
                        ছাপাসমৃদ্ধ করার পদক্ষেপ নিন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৭.২ চার্ট ও পোস্টারের লেখা শিক্ষার্থীদের পঠন দক্ষতার সাথে
                    সঙ্গতিপূর্ণ-স্পষ্ট ও বড় অক্ষরে লেখা
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
                        selectedValue={this.state.ind72ChartPosterCompatible}
                        onValueChange={(value) => {
                          this.setState({
                            ind72ChartPosterCompatible: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            value === "Yes"
                          ) {
                            this.setState({
                              ind7PrintRichItemDisplayed: "Yes",
                            });
                          } else {
                            this.setState({
                              ind7PrintRichItemDisplayed: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            value === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            value === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            value === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            value === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        ম্যানুয়ালের আলোকে পয়েন্ট শিক্ষককে সাথে নিয়ে শ্রেণিকক্ষ
                        ছাপাসমৃদ্ধ করার পদক্ষেপ নিন ।
                      </Text>
                    </View>
                  </View>
                </Card>
              </Card>
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
                    ৮. কার্যকরী বই চেক-আউট ব্যবস্থা বিদ্যমান আছে
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
                      <Text></Text>
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        {this.state.ind8BookCheckoutFunctional}
                      </Text>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালএর আলোকে বই গ্রহণ ও জমা
                        রেজিস্টার নিশ্চিত করুন । বই কম চেক-আউট হয়ে থাকলে প্রধান
                        শিক্ষকের সাথে এর কারণ সমূহ আলোচনা করুন । বুক চেক- আউট
                        বাড়ানোর ব্যাপারে তাঁর সাথে আলোচনা করুন এবং প্রয়োজনীয়
                        পদক্ষেপ নিন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৮.১ বই চেক-আউটের নিয়মাবলী ও প্রক্রিয়া শ্রেণিকক্ষে পোস্টারে
                    প্রদর্শিত আছে
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
                          this.state.ind81BookCheckoutProcedureDisplayed
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind81BookCheckoutProcedureDisplayed: value,
                          });

                          // Set main indicator
                          if (
                            value === "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes"
                          ) {
                            this.setState({
                              ind8BookCheckoutFunctional: "Yes",
                            });
                          } else {
                            this.setState({
                              ind8BookCheckoutFunctional: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            value === "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            value === "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            value === "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            value === "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালএর আলোকে বই গ্রহণ ও জমা
                        রেজিস্টার নিশ্চিত করুন । বই কম চেক-আউট হয়ে থাকলে প্রধান
                        শিক্ষকের সাথে এর কারণ সমূহ আলোচনা করুন । বুক চেক- আউট
                        বাড়ানোর ব্যাপারে তাঁর সাথে আলোচনা করুন এবং প্রয়োজনীয়
                        পদক্ষেপ নিন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৮.২ বই চেক-আউট করার জন্য রেজিস্টার-এর ব্যবহার আছে
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
                          this.state.ind82BookCheckoutRegisterUsable
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind82BookCheckoutRegisterUsable: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes"
                          ) {
                            this.setState({
                              ind8BookCheckoutFunctional: "Yes",
                            });
                          } else {
                            this.setState({
                              ind8BookCheckoutFunctional: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালএর আলোকে বই গ্রহণ ও জমা
                        রেজিস্টার নিশ্চিত করুন । বই কম চেক-আউট হয়ে থাকলে প্রধান
                        শিক্ষকের সাথে এর কারণ সমূহ আলোচনা করুন । বুক চেক- আউট
                        বাড়ানোর ব্যাপারে তাঁর সাথে আলোচনা করুন এবং প্রয়োজনীয়
                        পদক্ষেপ নিন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৮.৩ পূর্ববর্তী সপ্তাহের বই গ্রহণ ও জমা দেয়ার তথ্য রেজিস্টারে
                    লিপিবদ্ধ আছে
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
                          this.state.ind83BookCheckoutRegisterUpdated
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind83BookCheckoutRegisterUpdated: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes"
                          ) {
                            this.setState({
                              ind8BookCheckoutFunctional: "Yes",
                            });
                          } else {
                            this.setState({
                              ind8BookCheckoutFunctional: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালএর আলোকে বই গ্রহণ ও জমা
                        রেজিস্টার নিশ্চিত করুন । বই কম চেক-আউট হয়ে থাকলে প্রধান
                        শিক্ষকের সাথে এর কারণ সমূহ আলোচনা করুন । বুক চেক- আউট
                        বাড়ানোর ব্যাপারে তাঁর সাথে আলোচনা করুন এবং প্রয়োজনীয়
                        পদক্ষেপ নিন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৮.৪ গত মাস পর্যন্ত ফেরত দেওয়া হয়নি এমন বইসমূহের নাম
                    রেজিস্টারে লিপিবদ্ধ আছে
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
                          this.state.ind84BookCheckoutPendingBookList
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind84BookCheckoutPendingBookList: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes"
                          ) {
                            this.setState({
                              ind8BookCheckoutFunctional: "Yes",
                            });
                          } else {
                            this.setState({
                              ind8BookCheckoutFunctional: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালএর আলোকে বই গ্রহণ ও জমা
                        রেজিস্টার নিশ্চিত করুন । বই কম চেক-আউট হয়ে থাকলে প্রধান
                        শিক্ষকের সাথে এর কারণ সমূহ আলোচনা করুন । বুক চেক- আউট
                        বাড়ানোর ব্যাপারে তাঁর সাথে আলোচনা করুন এবং প্রয়োজনীয়
                        পদক্ষেপ নিন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৮.৫ পূর্ববর্তী মাসে এই চেক-আউট হয়েছে (অপর পৃষ্ঠার টেবিল
                    অনুযায়ী তথ্য সংগ্রহ করুন)*
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
                          this.state.ind85BookCheckoutDataCollection
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind85BookCheckoutDataCollection: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes"
                          ) {
                            this.setState({
                              ind8BookCheckoutFunctional: "Yes",
                            });
                          } else {
                            this.setState({
                              ind8BookCheckoutFunctional: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালএর আলোকে বই গ্রহণ ও জমা
                        রেজিস্টার নিশ্চিত করুন । বই কম চেক-আউট হয়ে থাকলে প্রধান
                        শিক্ষকের সাথে এর কারণ সমূহ আলোচনা করুন । বুক চেক- আউট
                        বাড়ানোর ব্যাপারে তাঁর সাথে আলোচনা করুন এবং প্রয়োজনীয়
                        পদক্ষেপ নিন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৮.৬ গত তিন মাসে প্রত্যেক শ্রেণি থেকে কমপক্ষে পাঁচজন
                    শিক্ষার্থী বই চেক-আউট করেছে
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
                          this.state.ind86BookCheckoutByLeast5Student
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind86BookCheckoutByLeast5Student: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            value === "Yes"
                          ) {
                            this.setState({
                              ind8BookCheckoutFunctional: "Yes",
                            });
                          } else {
                            this.setState({
                              ind8BookCheckoutFunctional: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালএর আলোকে বই গ্রহণ ও জমা
                        রেজিস্টার নিশ্চিত করুন । বই কম চেক-আউট হয়ে থাকলে প্রধান
                        শিক্ষকের সাথে এর কারণ সমূহ আলোচনা করুন । বুক চেক- আউট
                        বাড়ানোর ব্যাপারে তাঁর সাথে আলোচনা করুন এবং প্রয়োজনীয়
                        পদক্ষেপ নিন ।
                      </Text>
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
                    ৯. নির্দিষ্ট পড়ার ঘণ্টা বিদ্যমান রয়েছে
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
                      <Text></Text>
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        {this.state.ind9ReadingHourActivityFunctional}
                      </Text>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        LPO-কে অবহিত করুন এবং রুম টু রিডের সহায়তা প্রয়োজন হলে
                        মাসিক ও ত্রৈমাসিক প্রতিবেদনে উল্লেখ করুন
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৯.১ বিদ্যালয়ের সকল শ্রেণির রুটিনে সন্তাহে একদিন পড়ার ঘণ্টা
                    কার্যক্রম আছে
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
                          this.state.ind91ReadingHourActivityWeekly
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind91ReadingHourActivityWeekly: value,
                          });

                          // Set main indicator
                          if (
                            value === "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              ind9ReadingHourActivityFunctional: "Yes",
                            });
                          } else {
                            this.setState({
                              ind9ReadingHourActivityFunctional: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        LPO-কে অবহিত করুন এবং রুম টু রিডের সহায়তা প্রয়োজন হলে
                        মাসিক ও ত্রৈমাসিক প্রতিবেদনে উল্লেখ করুন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৯.২ পড়ার ঘন্টা সম্বলিত রুটিন বিদ্যালয়ের কোনো না কোনো স্থানে
                    টানানো আছে
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
                          this.state.ind92ReadingHourActivityRoutineHanged
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind92ReadingHourActivityRoutineHanged: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              ind9ReadingHourActivityFunctional: "Yes",
                            });
                          } else {
                            this.setState({
                              ind9ReadingHourActivityFunctional: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        LPO-কে অবহিত করুন এবং রুম টু রিডের সহায়তা প্রয়োজন হলে
                        মাসিক ও ত্রৈমাসিক প্রতিবেদনে উল্লেখ করুন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৯.৩ প্রতিদিন বিদ্যালয় ছুটির পূর্বে-পরে অথবা বিরতির সময় বা
                    পড়ার ঘণ্টায় বই পড়া বা চেক-আউটের সুযোগ আছে
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
                        selectedValue={this.state.ind93BookCheckoutOpportunity}
                        onValueChange={(value) => {
                          this.setState({
                            ind93BookCheckoutOpportunity: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              ind9ReadingHourActivityFunctional: "Yes",
                            });
                          } else {
                            this.setState({
                              ind9ReadingHourActivityFunctional: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        LPO-কে অবহিত করুন এবং রুম টু রিডের সহায়তা প্রয়োজন হলে
                        মাসিক ও ত্রৈমাসিক প্রতিবেদনে উল্লেখ করুন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ৯.৪ ছুটির পূর্বে, পরে, বিরতির সময় বই পড়া বা চেক-আউটের
                    নির্দেশনা বিদ্যালয়ে টানানো আছে
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
                        selectedValue={this.state.ind94BookCheckoutNoticeHanged}
                        onValueChange={(value) => {
                          this.setState({
                            ind94BookCheckoutNoticeHanged: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            value === "Yes"
                          ) {
                            this.setState({
                              ind9ReadingHourActivityFunctional: "Yes",
                            });
                          } else {
                            this.setState({
                              ind9ReadingHourActivityFunctional: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            value === "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            value === "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            value === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            value === "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        LPO-কে অবহিত করুন এবং রুম টু রিডের সহায়তা প্রয়োজন হলে
                        মাসিক ও ত্রৈমাসিক প্রতিবেদনে উল্লেখ করুন ।
                      </Text>
                    </View>
                  </View>
                </Card>
              </Card>
            </View>

            <View style={{ padding: 5 }}>
              <Text
                style={{
                  backgroundColor: "#ADD8E6",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                শ্রেণিকক্ষ পাঠাগার (ফেইজ-১) কার্যকর হতে হলে উপরের সবগুলো (১ থেকে
                ৯) ইন্ডিকেটর 'হ্যাঁ' হতে হবে
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
                    ১০. শিক্ষক পড়ার ঘণ্টা অনুযায়ী পড়াভিত্তিক কার্যক্রম পরিচালনা
                    করেন
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
                      <Text></Text>
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        {this.state.ind10TeacherPerformReadingHourActivity}
                      </Text>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        LPO-কে অবহিত করুন এবং মাসিক সভায় তা তুলে ধরুন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ১০.১ পড়াভিত্তিক কার্যক্রমের তথ্য লিপিবদ্ধ করার জন্য একটি
                    রেজিস্টার হয়েছে এবং শিক্ষক প্রতি সপ্তাহে পড়ার ঘণ্টায় কী কী
                    কার্যক্রম করেছেন যা লিপিবদ্ধ করেন
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
                          this.state.ind101ReadingHourRegisterUpdated
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind101ReadingHourRegisterUpdated: value,
                          });

                          // Set main indicator
                          if (
                            value === "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes"
                          ) {
                            this.setState({
                              ind10TeacherPerformReadingHourActivity: "Yes",
                            });
                          } else {
                            this.setState({
                              ind10TeacherPerformReadingHourActivity: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        LPO-কে অবহিত করুন এবং মাসিক সভায় তা তুলে ধরুন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ১০.২ পড়াভিত্তিক চারটি কাজের মধ্যে সপ্তাহে কমপক্ষে একটি কাজ
                    রেজিস্টারে উল্লেখ রয়েছে
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
                          this.state.ind102ReadingActivityListedRegister
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind102ReadingActivityListedRegister: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            value === "Yes"
                          ) {
                            this.setState({
                              ind10TeacherPerformReadingHourActivity: "Yes",
                            });
                          } else {
                            this.setState({
                              ind10TeacherPerformReadingHourActivity: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        LPO-কে অবহিত করুন এবং মাসিক সভায় তা তুলে ধরুন ।
                      </Text>
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
                    ১১. বিদ্যালয়ের পড়ার ঘণ্টা সংশ্লিষ্ট সকল শিক্ষক রুম টু রিড
                    প্রদত্ত 'পাঠাগার ব্যবস্থাপনা ও পড়ার ঘণ্টা কার্যক্রম'
                    প্রশিক্ষণে অংশগ্রহন করেছেন
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
                          this.state.ind11TrainedLibraryObservationReadingHour
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind11TrainedLibraryObservationReadingHour: value,
                          });

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষককের সাথে আলোচনা করুন এবং LPO-কে অবহিত করুন
                        ।
                      </Text>
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
                    ১২. বিদ্যালয় ব্যবস্থাপনা কমিটিকে পাঠাগার সংক্রান্ত বিষয়ে
                    সিদ্ধান্ত নেয়ার জন্য দায়িত্ব দেয়া হয়েছে
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
                      <Text></Text>
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        {this.state.ind12SchoolCommitteeDecisionAboutLibrary}
                      </Text>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষক/কমিটির সদস্যদের সাথে আলোচনা করুন এবং LPO'র
                        ফলোআপের জন্য নোট নিন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ১২.১ বিদ্যালয়ে একটি কমিটি আছে যা পাঠাগার সংক্রান্ত বিষয়ে
                    সিদ্ধান্ত নেয়
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
                          this.state.ind121SchoolHasCommitteeAboutLibrary
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind121SchoolHasCommitteeAboutLibrary: value,
                          });

                          // Set main indicator
                          if (
                            value === "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              ind12SchoolCommitteeDecisionAboutLibrary: "Yes",
                            });
                          } else {
                            this.setState({
                              ind12SchoolCommitteeDecisionAboutLibrary: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষক/কমিটির সদস্যদের সাথে আলোচনা করুন এবং LPO'র
                        ফলোআপের জন্য নোট নিন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ১২.২ বিগত ছয় মাসে কমিটি একটি সভা করেছে এবং সভায় পাঠাগার
                    বিষয়ে আলোচনা হয়েছে
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
                          this.state.ind122SchoolCommitteeMeetingAboutLibrary
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind122SchoolCommitteeMeetingAboutLibrary: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            value === "Yes"
                          ) {
                            this.setState({
                              ind12SchoolCommitteeDecisionAboutLibrary: "Yes",
                            });
                          } else {
                            this.setState({
                              ind12SchoolCommitteeDecisionAboutLibrary: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            value === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            value === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষক/কমিটির সদস্যদের সাথে আলোচনা করুন এবং LPO'র
                        ফলোআপের জন্য নোট নিন ।
                      </Text>
                    </View>
                  </View>
                </Card>
              </Card>
            </View>

            <View style={{ padding: 5 }}>
              <Text
                style={{
                  backgroundColor: "#ADD8E6",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                শ্রেণিকক্ষ পাঠাগার (ফেইজ-২ ও ৩) কার্যকর হতে হলে উপরের সবগুলো (১
                থেকে ১২) ইন্ডিকেটর 'হ্যাঁ' হতে হবে
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
                    ১৩. বিদ্যালয়ে গত ছয় মাসে কমপক্ষে একটি অভিভাবক সভা হয়েছে
                    যেখানে শিক্ষার্থীদের পঠন অথবা পাঠাগার বিষয়ে আলোচনা হয়েছে
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
                          this.state.ind13ParentMeetingAboutLibrary
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind13ParentMeetingAboutLibrary: value,
                          });

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>প্রধান শিক্ষককে জানান এবং LPO-কে অবহিত করুন</Text>
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
                    ১৪. বিদ্যালয়ে বিগত বছরে অন্তত একটি পড়া বিষয়ক অনুষ্ঠান হয়েছে
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
                      <Text></Text>
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        {this.state.ind14ReadPlayFestival}
                      </Text>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষকের সাথে আলোচনা করুন এবং LPO'র ফলোআপের জন্য
                        নোট নিন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ১৪.১ বিদ্যালয় কর্তৃপক্ষ বিগত বছরে পড়া অথবা পাঠাগার নিয়ে একটি
                    অনুষ্ঠান আয়োজন করেছে
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
                          this.state.ind141SchoolArrangeReadFestival
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind141SchoolArrangeReadFestival: value,
                          });

                          // Set main indicator
                          if (
                            value === "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes"
                          ) {
                            this.setState({
                              ind14ReadPlayFestival: "Yes",
                            });
                          } else {
                            this.setState({
                              ind14ReadPlayFestival: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষকের সাথে আলোচনা করুন এবং LPO'র ফলোআপের জন্য
                        নোট নিন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ১৪.২ অনুষ্ঠানটির পরিকল্পনা এবং পরিচালনায় অভিভাবক ও স্থানীয়
                    জনগণের অংশগ্রহণ ছিল
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
                          this.state.ind142ParentPublicEngageReadFestival
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind142ParentPublicEngageReadFestival: value,
                          });

                          // Set main indicator
                          if (
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            value === "Yes"
                          ) {
                            this.setState({
                              ind14ReadPlayFestival: "Yes",
                            });
                          } else {
                            this.setState({
                              ind14ReadPlayFestival: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষকের সাথে আলোচনা করুন এবং LPO'র ফলোআপের জন্য
                        নোট নিন ।
                      </Text>
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
                    ১৫. পাঠাগার কর্মসূচি দীর্ঘমেয়াদে পরিচালনার জন্য ব্যবস্থাপনা
                    কমিটি স্থায়িত্বশীলতার পরিকল্পনা গ্রহণ করেছে
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
                      <Text></Text>
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        {this.state.ind15SustainabilityPlanByCommittee}
                      </Text>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষকের সাথে আলোচনা করুন এবং LPO'র ফলোআপের জন্য
                        নোট নিন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ১৫.১ অভিভাবক, স্থানীয় জনগণ এবং প্রধান শিক্ষক যৌথভাবে একমত
                    হয়ে পরিকল্পনাটি করেছেন
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
                          this.state.ind151ParentPublicHeadTeacherCombinedPlan
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind151ParentPublicHeadTeacherCombinedPlan: value,
                          });

                          // Set main indicator
                          if (
                            value === "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              ind15SustainabilityPlanByCommittee: "Yes",
                            });
                          } else {
                            this.setState({
                              ind15SustainabilityPlanByCommittee: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            value === "Yes" &&
                            this.state.ind152ParentPublicResponsibility ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষকের সাথে আলোচনা করুন এবং LPO'র ফলোআপের জন্য
                        নোট নিন ।
                      </Text>
                    </View>
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
                  <Text style={{ fontSize: 16 }}>
                    ১৫.২ পরিকল্পনায় অভিভাবক ও স্থানীয় জনগণের সুনির্দিষ্ট
                    দায়িত্বের বিষয়টি উল্লেখ আছে
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
                          this.state.ind152ParentPublicResponsibility
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind152ParentPublicResponsibility: value,
                          });

                          console.log(
                            "pickerPhase ==" + this.state.pickerPhase,
                          );
                          // Set main indicator
                          if (
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            value === "Yes"
                          ) {
                            this.setState({
                              ind15SustainabilityPlanByCommittee: "Yes",
                            });
                          } else {
                            this.setState({
                              ind15SustainabilityPlanByCommittee: "No",
                            });
                          }
                          // Set main indicator

                          // Set library status
                          if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind13ParentMeetingAboutLibrary ===
                              "Yes" &&
                            this.state.ind141SchoolArrangeReadFestival ===
                              "Yes" &&
                            this.state.ind142ParentPublicEngageReadFestival ===
                              "Yes" &&
                            this.state
                              .ind151ParentPublicHeadTeacherCombinedPlan ===
                              "Yes" &&
                            value === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 1" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else if (
                            this.state.pickerPhase === "Phase 2" &&
                            this.state.ind11IsPointTeacherIncharge === "Yes" &&
                            this.state
                              .ind12IsTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state
                              .ind2HeadTeacherTrainedLibraryManagementReadingHour ===
                              "Yes" &&
                            this.state.ind31ClassroomDoorWindowOkay === "Yes" &&
                            this.state.ind32ClassroomDoorWindowLock === "Yes" &&
                            this.state.ind33ClassroomSafeFromRainWater ===
                              "Yes" &&
                            this.state.ind34ClassroomSafeClean === "Yes" &&
                            this.state.ind41BookshelfUsable === "Yes" &&
                            this.state.ind42BookshelfProtectedSunRain ===
                              "Yes" &&
                            this.state.ind43BookshelfPortableSafeForStudent ===
                              "Yes" &&
                            this.state.ind44BookshelfReadingSpace === "Yes" &&
                            this.state.ind45BookshelfFurnitureGoodCondition ===
                              "Yes" &&
                            this.state.ind5BookRegisterUpdated === "Yes" &&
                            this.state.ind61BookshelfBookOrganizedByGrade ===
                              "Yes" &&
                            this.state.ind62BookshelfRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind63BookshelfNonRtRBookLabelViewable ===
                              "Yes" &&
                            this.state.ind64BookOrganizedByLabel === "Yes" &&
                            this.state.ind65BookAccessible === "Yes" &&
                            this.state.ind66BookCoverViewable === "Yes" &&
                            this.state.ind71ChartPosterDisplayed === "Yes" &&
                            this.state.ind72ChartPosterCompatible === "Yes" &&
                            this.state.ind81BookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.ind82BookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.ind83BookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.ind84BookCheckoutPendingBookList ===
                              "Yes" &&
                            this.state.ind85BookCheckoutDataCollection ===
                              "Yes" &&
                            this.state.ind86BookCheckoutByLeast5Student ===
                              "Yes" &&
                            this.state.ind91ReadingHourActivityWeekly ===
                              "Yes" &&
                            this.state.ind92ReadingHourActivityRoutineHanged ===
                              "Yes" &&
                            this.state.ind93BookCheckoutOpportunity === "Yes" &&
                            this.state.ind94BookCheckoutNoticeHanged ===
                              "Yes" &&
                            this.state.ind101ReadingHourRegisterUpdated ===
                              "Yes" &&
                            this.state.ind102ReadingActivityListedRegister ===
                              "Yes" &&
                            this.state
                              .ind11TrainedLibraryObservationReadingHour ===
                              "Yes" &&
                            this.state.ind121SchoolHasCommitteeAboutLibrary ===
                              "Yes" &&
                            this.state
                              .ind122SchoolCommitteeMeetingAboutLibrary ===
                              "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                          // Set library status
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"Select"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষকের সাথে আলোচনা করুন এবং LPO'র ফলোআপের জন্য
                        নোট নিন ।
                      </Text>
                    </View>
                  </View>
                </Card>
              </Card>
            </View>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>পাঠাগারের অবস্থা</Text>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      ইনডিকেটর অনুযায়ী পাঠাগারের অবস্থা:
                    </Text>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      {libraryStatus}
                      {/* {this.state.libraryStatus} */}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>আলোচনা</Text>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
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
                      onPress={this.bestPracticeIndcoachingSupportInd}
                    >
                      <Text style={{ color: "#ffff" }}>Click to Generate</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={{ fontWeight: "bold" }}>
                  সহায়তার জন্য অগ্রাধিকারভিত্তিক ইন্ডিকেটর (প্রথম যে ২-৩টি
                  ইন্ডিকেটরের উত্তর 'না' হয়েছে) উল্লেখ করুন:
                </Text>
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
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      শ্রেণিকক্ষ পাঠাগারের উন্নতির জন্য অগ্রাধিকারভিত্তিতে ২-৩টি
                      সুপারিশ উল্লেখ করুন:
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="write here..."
                      onChangeText={(text) =>
                        this.setState({
                          agreedSuggestion: text,
                        })
                      }
                      value={this.state.agreedSuggestion}
                    ></TextInput>
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text style={{ fontWeight: "bold" }}>
                      শ্রেণিকক্ষ পাঠাগার সংক্রান্ত অন্তত ৩টি ভালো দিক উল্লেখ
                      করুন:
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

                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>কর্ম পরিকল্পনা :</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="write here..."
                      onChangeText={(text) =>
                        this.setState({
                          agreedStatement: text,
                        })
                      }
                      value={this.state.agreedStatement}
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
