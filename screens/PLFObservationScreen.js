//  Author: Mohammad Jihad Hossain
//  Create Date: 15/09/2025
//  Modify Date: 15/09/2025
//  Description: LFObservationScreen component

import React, { useRef } from "react";
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
  Alert,
  TouchableOpacity,
  Animated,
  Dimensions,
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
      inputEnabled: true,

      isCollapsed: false,

      //Preloaded Data
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
      duplicateBanglaClassObservationData: [],
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
      office: "",
      project: "",
      district: "",
      upazilla: "",
      lf: "",
      lfName: "",
      lpo: "",
      lpoName: "",
      school: "",
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
    this.getAllSchool();
    this.getAllEmployee();
    this.getAllDesignation();
    this.getAllBanglaIndicator();
    this.getAllBanglaClassObservation();
    this.getAllLFObservation();
    this.getAllTeacher();
    this.getAllOffice();
    this.getAllProject();
    console.log("Component mounted");
  }
  //Load data from server

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

      isChecked: "",
      isActive: "",
      isDeleted: "",
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
        "http://118.179.80.51:8080/api/v1/di-teacher"
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
        }
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
        }
      );

      this.setState({
        allBanglaClassObservationData: response.data,
        isLoading: false,
      });
      console.log(
        "All Bangla-class Data: ",
        this.state.allBanglaClassObservationData.length
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
        }
      );

      this.setState({
        allLFObservationData: response.data,
        isLoading: false,
      });
      console.log(
        "All LFObservation Data: ",
        this.state.allLFObservationData.length
      );
    } catch (error) {
      console.log(error);
    }
  };
  // Get All LFObservation Data

  // Register new Bangla Class data
  saveBanglaClassObservation = async () => {
    const newBanglaClass = {
      date: this.state.date,
      month: this.state.pickerMonth,
      year: this.state.pickerYear,
      rtrSchoolId: this.state.rtrSchoolId,
      yearOfSupport: this.state.yearOfSupport,
      district: this.state.pickerDistrict.name,
      upazilla: this.state.pickerUpazilla.name,
      fieldOffice: this.state.pickerOffice,
      project: this.state.pickerProject,
      visitNo: Math.floor(Math.random() * 100),
      lpo: this.state.pickerLPO.employeeRegId,
      lpoName: this.state.pickerLPOName.name,
      lf: this.state.pickerLF.employeeRegId,
      lfName: this.state.pickerLFName.name,
      school: this.state.pickerSchool,
      visitor: this.state.pickerVisitor,
      visitorDesignation: this.state.pickerDesignation,
      visitorOffice: this.state.pickerVisitorOffice,
      classTeacher: this.state.classTeacher,
      teacherGender: this.state.classTeacherGender,
      isTrained: this.state.teacherTrained,
      grade: this.state.grade,
      section: this.state.section,
      classStartTime: this.state.classStartTime,
      classEndTime: this.state.classEndTime,
      contentName: this.state.teachingTopic,
      periodDay: this.state.teachingDay,
      totalAdmittedStudent: this.state.studentTotal,
      totalAdmittedGirl: this.state.studentGirl,
      totalAdmittedBoy: this.state.studentBoy,
      totalPresentStudent: this.state.presentTotal,
      totalPresentGirl: this.state.presentGirl,
      totalPresentBoy: this.state.presentBoy,

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
      student4: this.state.student4,
      student5: this.state.student5,

      noRightFor1: this.state.noRightFor1,
      noWrongFor1: this.state.noWrongFor1,
      totalFor1: this.state.totalFor1,
      noRightFor2: this.state.noRightFor2,
      noWrongFor2: this.state.noWrongFor2,
      totalFor2: this.state.totalFor2,
      noRightFor3: this.state.noRightFor3,
      noWrongFor3: this.state.noWrongFor3,
      totalFor3: this.state.totalFor3,
      noRightFor4: this.state.noRightFor4,
      noWrongFor4: this.state.noWrongFor4,
      totalFor4: this.state.totalFor4,
      noRightFor5: this.state.noRightFor5,
      noWrongFor5: this.state.noWrongFor5,
      totalFor5: this.state.totalFor5,

      teacherStatus: this.state.teacherStatus,
    };

    // Validation

    //Check duplicate data
    this.state.duplicateBanglaClassObservationData =
      this.state.allBanglaClassObservationData.filter((item) => {
        return (
          item.date === this.state.date &&
          item.school === this.state.pickerSchool &&
          item.month === this.state.pickerMonth &&
          item.year === this.state.pickerYear &&
          item.grade === this.state.grade &&
          item.section === this.state.section &&
          item.classTeacher.trim() === this.state.classTeacher.trim()
        );
      });

    console.log(
      "Duplicate Bangla Class Data: ",
      this.state.duplicateBanglaClassObservationData.length
    );
    //Check duplicate data

    // Validation
    if (this.state.date === "") {
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
    } else if (this.state.pickerVisitor === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Visitor can not be empty");
      return;
    } else if (this.state.pickerVisitorOffice === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Visitor Office can not be empty");
      return;
    } else if (this.state.classTeacher === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Class Teacher can not be empty");
      return;
    } else if (this.state.teacherTrained === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Teacher training can not be empty");
      return;
    } else if (this.state.grade === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Grade can not be empty");
      return;
    } else if (this.state.section === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Section can not be empty");
      return;
    } else if (this.state.duplicateBanglaClassObservationData.length > 0) {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Duplicate Bangla Class data !!");
      return;
    } else {
      // Set error message empty
      this.setState({ dateError: "" });

      // Send data to API
      try {
        let response = await fetch(
          "http://118.179.80.51:8080/api/v1/di-bangla-class",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBanglaClass),
          }
        );
        if (response.status >= 200 && response.status < 300) {
          Alert.alert(
            "Alert",
            "Bangla class obsvervatio data saved successfully!!!"
          );
          this.getAllBanglaClassObservation();
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
  // Register new Bangla Class data

  // Register new LFObservation data
  saveLFObservation = async () => {
    const newBanglaClass = {
      date: this.state.date,
      month: this.state.pickerMonth,
      year: this.state.pickerYear,
      rtrSchoolId: this.state.rtrSchoolId,
      yearOfSupport: this.state.yearOfSupport,
      district: this.state.pickerDistrict.name,
      upazilla: this.state.pickerUpazilla.name,
      fieldOffice: this.state.pickerOffice,
      project: this.state.pickerProject,
      visitNo: Math.floor(Math.random() * 100),
      lpo: this.state.pickerLPO.employeeRegId,
      lpoName: this.state.pickerLPOName.name,
      lf: this.state.pickerLF.employeeRegId,
      lfName: this.state.pickerLFName.name,
      school: this.state.pickerSchool,
      visitor: this.state.pickerVisitor,
      visitorDesignation: this.state.pickerDesignation,
      visitorOffice: this.state.pickerVisitorOffice,
      classTeacher: this.state.classTeacher,
      teacherGender: this.state.classTeacherGender,
      isTrained: this.state.teacherTrained,
      grade: this.state.grade,
      section: this.state.section,
      classStartTime: this.state.classStartTime,
      classEndTime: this.state.classEndTime,
      contentName: this.state.teachingTopic,
      periodDay: this.state.teachingDay,
      totalAdmittedStudent: this.state.studentTotal,
      totalAdmittedGirl: this.state.studentGirl,
      totalAdmittedBoy: this.state.studentBoy,
      totalPresentStudent: this.state.presentTotal,
      totalPresentGirl: this.state.presentGirl,
      totalPresentBoy: this.state.presentBoy,

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
      student4: this.state.student4,
      student5: this.state.student5,

      noRightFor1: this.state.noRightFor1,
      noWrongFor1: this.state.noWrongFor1,
      totalFor1: this.state.totalFor1,
      noRightFor2: this.state.noRightFor2,
      noWrongFor2: this.state.noWrongFor2,
      totalFor2: this.state.totalFor2,
      noRightFor3: this.state.noRightFor3,
      noWrongFor3: this.state.noWrongFor3,
      totalFor3: this.state.totalFor3,
      noRightFor4: this.state.noRightFor4,
      noWrongFor4: this.state.noWrongFor4,
      totalFor4: this.state.totalFor4,
      noRightFor5: this.state.noRightFor5,
      noWrongFor5: this.state.noWrongFor5,
      totalFor5: this.state.totalFor5,

      teacherStatus: this.state.teacherStatus,
    };

    // Validation

    //Check duplicate data
    this.state.duplicateBanglaClassObservationData =
      this.state.allBanglaClassObservationData.filter((item) => {
        return (
          item.date === this.state.date &&
          item.school === this.state.pickerSchool &&
          item.month === this.state.pickerMonth &&
          item.year === this.state.pickerYear &&
          item.grade === this.state.grade &&
          item.section === this.state.section &&
          item.classTeacher.trim() === this.state.classTeacher.trim()
        );
      });

    console.log(
      "Duplicate Bangla Class Data: ",
      this.state.duplicateBanglaClassObservationData.length
    );
    //Check duplicate data

    // Validation
    if (this.state.date === "") {
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
    } else if (this.state.pickerVisitor === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Visitor can not be empty");
      return;
    } else if (this.state.pickerVisitorOffice === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Visitor Office can not be empty");
      return;
    } else if (this.state.classTeacher === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Class Teacher can not be empty");
      return;
    } else if (this.state.teacherTrained === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Teacher training can not be empty");
      return;
    } else if (this.state.grade === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Grade can not be empty");
      return;
    } else if (this.state.section === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Section can not be empty");
      return;
    } else if (this.state.duplicateBanglaClassObservationData.length > 0) {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Duplicate Bangla Class data !!");
      return;
    } else {
      // Set error message empty
      this.setState({ dateError: "" });

      // Send data to API
      try {
        let response = await fetch(
          "http://118.179.80.51:8080/api/v1/di-bangla-class",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBanglaClass),
          }
        );
        if (response.status >= 200 && response.status < 300) {
          Alert.alert(
            "Alert",
            "Bangla class obsvervatio data saved successfully!!!"
          );
          this.getAllBanglaClassObservation();
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

  render() {
    // For Datepicker
    const {
      isCollapsed,
      inputEnabled,
      show,
      date,
      mode,
      startTime,
      endTime,

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
                      height: 40,
                      width: 140,
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
                      height: 40,
                      width: 140,
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
                      height: 40,
                      width: 160,
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
                    {districts.map((item) => {
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
                      height: 40,
                      width: 160,
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
                      height: 40,
                      width: 120,
                    }}
                    selectedValue={this.state.pickerOffice}
                    onValueChange={(value) => {
                      this.setState({ pickerOffice: value });
                      console.log(this.state.pickerDistrict.name);
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.allOffice
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
                      height: 40,
                      width: 240,
                    }}
                    selectedValue={this.state.pickerProject}
                    onValueChange={(value) => {
                      this.setState({ pickerProject: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.allProject
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
                      height: 40,
                      width: 180,
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
                    {this.state.allEmployee
                      .filter((item) => {
                        return (
                          item.designation.includes("PO") &&
                          item.project === this.state.pickerProject
                        );
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
                      height: 40,
                      width: 180,
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
                    {this.state.allEmployee
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
                      height: 40,
                      width: 350,
                    }}
                    selectedValue={this.state.pickerSchool}
                    onValueChange={(value) => {
                      this.setState({
                        pickerSchool: value,
                      });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.allSchool
                      .filter((item) => {
                        return item.lf === this.state.pickerLF.employeeRegId;
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
                {/* <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      ভিজিট নম্বর: (Visit No:)
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
                      width: 80,
                      padding: 5,
                      borderWidth: 1,
                    }}
                    keyboardType="numeric"
                    placeholder=""
                    editable={true}
                    onChangeText={(text) =>
                      this.setState({ visitNo: Number(text) })
                    }
                    value={this.state.visitNo + ""}
                  />
                </View> */}
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
                  <Picker
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
                    {/* <Picker.Item label={"Select"} value={""} /> */}
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
                  <Picker
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
                    {/* <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"1"} value={"1"} />
                    <Picker.Item label={"2"} value={"2"} />
                    <Picker.Item label={"3"} value={"3"} />
                    <Picker.Item label={"4"} value={"4"} /> */}

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
                  </Picker>
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
                    শ্রেণী: (Grade:)
                  </Text>
                  <Picker
                    style={{
                      height: 40,
                      width: 150,
                    }}
                    enabled={true}
                    selectedValue={this.state.grade}
                    onValueChange={(value) => {
                      this.setState({ grade: value });

                      if (this.state.teacherTrained === "No") {
                        this.setState({ inputEnabled: false });
                      } else {
                        this.setState({ inputEnabled: true });
                      }
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"G1"} value={"G1"} />
                    <Picker.Item label={"G2"} value={"G2"} />
                  </Picker>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    শাখা: (Section:)
                  </Text>
                  <Picker
                    style={{
                      height: 40,
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
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      পরিদর্শক এর অফিস: (Visitor Office:)
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
                      height: 40,
                      width: 130,
                    }}
                    selectedValue={this.state.pickerVisitorOffice}
                    onValueChange={(value) => {
                      this.setState({ pickerVisitorOffice: value });

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
                            }
                          ),
                      });

                      console.log(
                        "All values: ",
                        this.state.rtrSchoolId,
                        this.state.pickerProject,
                        this.state.pickerYear,
                        this.state.grade,
                        this.state.section,
                        this.state.classTeacher
                      );
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
                    <Picker.Item label={"CO"} value={"CO"} />
                    {this.state.allOffice
                      .filter((item) => {
                        return item.name === this.state.pickerOffice;
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
                      height: 40,
                      width: 180,
                    }}
                    selectedValue={this.state.pickerVisitor}
                    onValueChange={(value) => {
                      this.setState({ pickerVisitor: value });

                      // Set perivious visit data
                      console.log(
                        "preMonthData Length: " + this.state.preMonthData.length
                      );

                      console.log(
                        "preMonthData: " +
                          JSON.stringify(this.state.preMonthData)
                      );

                      if (this.state.preMonthData.length > 0) {
                        const followup1 = this.state.preMonthData
                          .sort((a, b) => a.id - b.id)
                          .slice(-1)
                          .map((item) => {
                            return item.coachingSupportInd1;
                          })
                          .toString();

                        const followup2 = this.state.preMonthData
                          .sort((a, b) => a.id - b.id)
                          .slice(-1)
                          .map((item) => {
                            return item.coachingSupportInd2;
                          })
                          .toString();
                        console.log("followup1 :" + followup1);
                        this.setState({
                          lastFollowupTopic1: followup1,
                        });
                        this.setState({
                          lastFollowupTopic2: followup2,
                        });
                      }
                      // Set perivious visit data
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.allEmployee
                      .filter((item) => {
                        return item.office === this.state.pickerVisitorOffice;
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
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        এলএফ'র বিদ্যালয়ে পৌছার সময়: (Start Time:)
                      </Text>

                      <TextInput
                        style={{
                          height: 30,
                          width: 170,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="default"
                        placeholder=""
                        editable={this.state.inputEnabled}
                        onChangeText={(text) =>
                          this.setState({ schoolEntryTime: text })
                        }
                        value={this.state.schoolEntryTime + ""}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        এলএফ'র বিদ্যালয়ে প্রস্থানের সময়: (End Time:)
                      </Text>

                      <TextInput
                        style={{
                          height: 30,
                          width: 170,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="default"
                        placeholder=""
                        editable={this.state.inputEnabled}
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
                      width: 340,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 40,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind11IsCarriedAllMaterialStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind11IsCarriedAllMaterialStatus: value,
                            });

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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "No" ||
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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
                        <Text></Text>
                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind12IsCheckedInRightTimeStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind12IsCheckedInRightTimeStatus: value,
                            });

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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "No" ||
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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

                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind13IsObservedBanglaLibraryStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind13IsObservedBanglaLibraryStatus: value,
                            });

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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "No" ||
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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

                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind14FeedbackSessionWithTeacherStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind14FeedbackSessionWithTeacherStatus: value,
                            });

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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "No" ||
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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

                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind15MeetingWithHeadTeacherStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind15MeetingWithHeadTeacherStatus: value,
                            });

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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "No" ||
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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

                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind16FilledAllFormProperlyStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind16FilledAllFormProperlyStatus: value,
                            });

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
                              (value === "Yes" || value === "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "No" ||
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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
                        <Text></Text>
                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind17ObservedClassSilentlyStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind17ObservedClassSilentlyStatus: value,
                            });

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
                              (value === "Yes" || value === "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "No" ||
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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
                        <Text></Text>
                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 50,
                            width: 140,
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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "No" ||
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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

                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind22LFDiscussGoodPracticeIndicatorStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind22LFDiscussGoodPracticeIndicatorStatus: value,
                            });

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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "No" ||
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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

                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 50,
                            width: 140,
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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "No" ||
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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

                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind24LFDiscussLastFollowupIndicatorStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind24LFDiscussLastFollowupIndicatorStatus: value,
                            });

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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "No" ||
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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

                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind25LFInstructIdealLessonStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind25LFInstructIdealLessonStatus: value,
                            });

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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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

                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind25LFInstructIdealLessonNote: text,
                            })
                          }
                          value={this.state.ind25LFInstructIdealLessonNote + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                  {/* {ind25FollowsInstructionsInWritingStatus === "No" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold", color: "#f44336" }}>
                          বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং
                          গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা
                          বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind25FollowsInstructionsInWritingStatus === "Partial" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold", color: "#f44336" }}>
                          বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং
                          গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা
                          বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।
                        </Text>
                      </Card>
                    </View>
                  )} */}
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
                      ২চ. শিক্ষার্থীরা বড় দলে বা একা একা কাজ করার সময় এলএফ
                      শ্রেণিকক্ষে ঘুরে ঘুরে দেখেছেন।
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind26LFObserveStudentOrGroupStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind26LFObserveStudentOrGroupStatus: value,
                            });

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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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

                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={this.state.inputEnabled}
                          onChangeText={(text) =>
                            this.setState({
                              ind26LFObserveStudentOrGroupStatus: text,
                            })
                          }
                          value={
                            this.state.ind26LFObserveStudentOrGroupStatus + ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                  {/* {ind25FollowsInstructionsInWritingStatus === "No" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold", color: "#f44336" }}>
                          বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং
                          গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা
                          বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind25FollowsInstructionsInWritingStatus === "Partial" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold", color: "#f44336" }}>
                          বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং
                          গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা
                          বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।
                        </Text>
                      </Card>
                    </View>
                  )} */}
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={this.state.ind27LFVerifyWorkbookStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind27LFVerifyWorkbookStatus: value,
                            });

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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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

                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                  {/* {ind25FollowsInstructionsInWritingStatus === "No" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold", color: "#f44336" }}>
                          বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং
                          গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা
                          বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind25FollowsInstructionsInWritingStatus === "Partial" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold", color: "#f44336" }}>
                          বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং
                          গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা
                          বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।
                        </Text>
                      </Card>
                    </View>
                  )} */}
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={this.state.ind28LFTrack3StudentStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind28LFTrack3StudentStatus: value,
                            });

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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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

                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind29LFTeacherAgreedNextPlanStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind29LFTeacherAgreedNextPlanStatus: value,
                            });

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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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

                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind31LFIdentifyGoodImprovablePointStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind31LFIdentifyGoodImprovablePointStatus: value,
                            });

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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "No" ||
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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

                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind32LFInstructDevelopmentPlanStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind32LFInstructDevelopmentPlanStatus: value,
                            });

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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "No" ||
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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

                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                      সক্ষম হয়েছেন ।
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          enabled={this.state.inputEnabled}
                          selectedValue={
                            this.state.ind33LFDiscussAboutDevelopmentPlanStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind33LFDiscussAboutDevelopmentPlanStatus: value,
                            });

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
                                  "N/A")
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

                            // Setup BestPractice
                            if (
                              this.state.ind34CheckedWeDoYouDoStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "No" ||
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                              this.state.ind34CheckedWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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

                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 50,
                            width: 140,
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
                                valthis.state
                                  .ind33CheckWritingSpellingPunctuationStatusue ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A")
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
                                  "N/A")
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
                            // Setup BestPractice
                            if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "No" ||
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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
                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                        <Text>পর্যবেক্ষণ: (Observation:)</Text>

                        <Picker
                          style={{
                            height: 50,
                            width: 140,
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
                                valthis.state
                                  .ind33CheckWritingSpellingPunctuationStatusue ===
                                  "N/A" ||
                                value === "Yes" ||
                                value === "No" ||
                                value === "Partial" ||
                                value === "N/A")
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
                                  "N/A")
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
                            // Setup BestPractice
                            if (value === "Yes") {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                bestPracticeInd2: "",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus === "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                              "Yes"
                            ) {
                              this.setState({
                                bestPracticeInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                              });
                            } else {
                              this.setState({
                                bestPracticeInd1: "N/A",
                              });
                            }
                            // Setup BestPractice

                            // Setup CoachingSupport
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "No" ||
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে, কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।",
                              });
                            } else if (
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "No" ||
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা স্বাধীনভাবে কাজ করার চেষ্টা করে।",
                              });
                            } else if (
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "No" ||
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।",
                                coachingSupportInd2:
                                  "পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে। পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয় পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।",
                              });
                            } else if (
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "No" ||
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ ধারাবাহিভাবে বাস্তবায়ন করেছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।",
                              });
                            } else if (
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "No" ||
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয় থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।",
                              });
                            } else if (
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "No" ||
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া প্রয়োজন।",
                              });
                            } else if (
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "No" ||
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "No" ||
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/ যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।",
                              });
                            } else if (
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "No" ||
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন ।",
                                coachingSupportInd2:
                                  "শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে পড়তে হয় সে দক্ষতা অর্জন করে।",
                              });
                            } else if (
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "No" ||
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দিয়েছেন ।",
                                coachingSupportInd2:
                                  "পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।",
                              });
                            } else if (
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "No" ||
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার কাজ করিয়েছেন ।",
                                coachingSupportInd2:
                                  "বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য লেখার সঠিক ধারাবাহিকতা এবং গঠন অনুসরণ শিক্ষার্থীদের সঠিক প্রবাহ ও ধারাবাহিকতা বজায় রেখে লেখার দক্ষতা অর্জনে সহায়তা করে।",
                              });
                            } else if (
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "No" ||
                              this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।",
                                coachingSupportInd2:
                                  "সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।",
                              });
                            } else if (
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "No" ||
                              this.state
                                .ind32TaughtVocabularyNewSentenceStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।",
                                coachingSupportInd2:
                                  "শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে রাখতে পারে এবং গল্পটি বুঝতে পারে।",
                              });
                            } else if (
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "No" ||
                              this.state
                                .ind33CheckWritingSpellingPunctuationStatus ===
                                "Partial"
                            ) {
                              this.setState({
                                coachingSupportInd1:
                                  "৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি চিহ্নের ব্যবহার নিশ্চিত করেছেন ।",
                                coachingSupportInd2:
                                  "শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।",
                              });
                            } else if (value === "No" || value === "Partial") {
                              this.setState({
                                coachingSupportInd1:
                                  "৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।",
                                coachingSupportInd2:
                                  "শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।",
                              });
                            } else {
                              this.setState({
                                coachingSupportInd1: "N/A",
                                coachingSupportInd2: "N/A",
                              });
                            }
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
                        <TextInput
                          style={{
                            height: 100,
                            width: 170,
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
                এলএফকে পরামর্শদানের কিছু প্রধান বিষয়
              </Text>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      এলএফ তার পর্যবেক্ষণের সময় ভালো করেছেন এমন ১-২টি বিষয়
                      উল্লেখ করুন:
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>ইনডিকেটর</Text>
                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      selectTextOnFocus={false}
                      value={this.state.bestPracticeInd1}
                    ></TextInput>
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      এলএফ কি গত পরিদর্শনের সময়কার পরামর্শগুলো বাস্তবায়ন
                      করেছেন?:
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>ইনডিকেটর</Text>
                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      selectTextOnFocus={false}
                      value={this.state.lastFollowupTopic1}
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
                    <Text>ইনডিকেটর</Text>
                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      value={this.state.coachingSupportInd1}
                    ></TextInput>
                  </View>
                </View>

                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>উন্নতির জন্য এলএফ যা করতে পারেন: </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="লিখুন"
                      keyboardType="default"
                      editable={this.state.inputEnabled}
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
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>এলএফ'কে সহায়তার জন্য এলপিও যা করতে পারেন:</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="লিখুন"
                      keyboardType="default"
                      editable={this.state.inputEnabled}
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
              // disabled={
              //   !this.state.pickerMonth ||
              //   !this.state.pickerYear ||
              //   !this.state.pickerDistrict ||
              //   !this.state.pickerUpazilla ||
              // }
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
