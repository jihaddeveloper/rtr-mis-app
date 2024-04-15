//  Author: Mohammad Jihad Hossain
//  Create Date: 17/08/2021
//  Modify Date: 07/02/2023
//  Description: Bangla class observation component

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
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { divisions, districts, upazillas, unions } from "bd-geojs";

import { Card } from "react-native-shadow-cards";

import DateTimePicker from "@react-native-community/datetimepicker";

import CollapsibleView from "@eliav2/react-native-collapsible-view";

import ExpandableView from "react-native-expandable-view";

const screenDimensions = Dimensions.get("screen");
const windowDimensions = Dimensions.get("window");

const { height } = screenDimensions.height / 2.5;
const { width } = screenDimensions.width / 2.5;

export default class BanglaClassObservationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.getAllSchool();
    this.getAllEmployee();
    this.getAllDesignation();
    this.getAllBanglaIndicator();
    this.getAllBanglaClassObservation();
    this.getAllTeacher();
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

  // Get All Bangla Class Data for school
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
  // Get All Bangla Class Data for school

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
      visitNo: this.state.visitNo,
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
          item.visitNo === this.state.visitNo &&
          item.school === this.state.pickerSchool &&
          item.month === this.state.pickerMonth &&
          item.year === this.state.pickerYear &&
          item.grade === this.state.grade &&
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
    } else if (this.state.pickerDesignation === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Designation can not be empty");
      return;
    } else if (this.state.pickerVisitorOffice === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Visitor Office can not be empty");
      return;
    } else if (this.state.classTeacher === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Class Teacher can not be empty");
      return;
    } else if (this.state.classTeacherGender === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Gender can not be empty");
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
      show,
      date,
      mode,
      startTime,
      endTime,

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

    return (
      <View style={styles.container}>
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 50,
              alignContent: "center",
              textAlign: "center",
              alignSelf: "center",
              marginLeft: 100,
              marginRight: 100,
            }}
          >
            বাংলা ক্লাস পর্যবেক্ষণ ফরম
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
            (Bangla Class Observation Form)
          </Text>
        </View>

        <ScrollView>
          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>সাধারণ তথ্য:</Text>
            <Text style={styles.bigRedText}>(General Information:)</Text>
            <ExpandableView>
              <View>
                <Text>My expandable view</Text>
              </View>
            </ExpandableView>
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
                      তারিখ:
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
                    (Date:)
                  </Text>
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
                      মাস:
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
                    (Month:)
                  </Text>
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
                      বছর:
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
                    (Year:)
                  </Text>
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
                      জেলা:
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
                    (District:)
                  </Text>
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
                      উপজেলা:
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
                    (Sub District:)
                  </Text>
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
                      ফিল্ড অফিস:
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
                    (Field Office:)
                  </Text>
                  <Picker
                    style={{
                      height: 40,
                      width: 130,
                    }}
                    selectedValue={this.state.pickerOffice}
                    onValueChange={(value) => {
                      this.setState({ pickerOffice: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"DFO"} value={"DFO"} />
                    <Picker.Item label={"CFO"} value={"CFO"} />
                    <Picker.Item label={"NFO"} value={"NFO"} />
                    <Picker.Item label={"MFO"} value={"MFO"} />
                    <Picker.Item label={"NrFO"} value={"NrFO"} />
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
                      প্রোজেক্ট:
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
                    (Project:)
                  </Text>
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
                    <Picker.Item
                      label={"WFP funded project"}
                      value={"WFP funded project"}
                    />
                    <Picker.Item
                      label={"Natore LP Program"}
                      value={"Natore LP Program"}
                    />
                    <Picker.Item
                      label={"Dhaka LP Program"}
                      value={"Dhaka LP Program"}
                    />
                    <Picker.Item
                      label={"Moulvibazar LP Program"}
                      value={"Moulvibazar LP Program"}
                    />
                    <Picker.Item
                      label={"Narail LP Program"}
                      value={"Narail LP Program"}
                    />
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
                      দায়িত্ব প্রাপ্ত এলপিও
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
                    (LPO:)
                  </Text>
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
                          item.office === this.state.pickerOffice
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
                      দায়িত্ব প্রাপ্ত এলএফ
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
                    (LF:)
                  </Text>
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
                <View style={{ flex: 2 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      বিদ্যালয়ের নাম:
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
                    (School:)
                  </Text>
                  <Picker
                    style={{
                      height: 40,
                      width: 220,
                    }}
                    selectedValue={this.state.pickerSchool}
                    onValueChange={(value) => {
                      this.setState({ pickerSchool: value });
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
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      ভিজিট নম্বর:
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
                    (Visit No:)
                  </Text>
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
                  <Picker
                    style={{
                      height: 40,
                      width: 200,
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
                        return item.lf === this.state.pickerLF.employeeRegId;
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
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"1"} value={"1"} />
                    <Picker.Item label={"2"} value={"2"} />
                    <Picker.Item label={"3"} value={"3"} />
                    <Picker.Item label={"4"} value={"4"} />
                    <Picker.Item label={"5"} value={"5"} />
                    <Picker.Item label={"6"} value={"6"} />
                    <Picker.Item label={"7"} value={"7"} />
                    <Picker.Item label={"8"} value={"8"} />
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
                    শ্রেণী:
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    (Grade:)
                  </Text>
                  <Picker
                    style={{
                      height: 40,
                      width: 150,
                    }}
                    selectedValue={this.state.grade}
                    onValueChange={(value) => {
                      this.setState({ grade: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"Pre-Primary"} value={"Pre-Primary"} />
                    <Picker.Item label={"Grade 1"} value={"Grade 1"} />
                    <Picker.Item label={"Grade 2"} value={"Grade 2"} />
                    <Picker.Item label={"Grade 3"} value={"Grade 3"} />
                    <Picker.Item label={"Grade 4"} value={"Grade 4"} />
                    <Picker.Item label={"Grade 5"} value={"Grade 5"} />
                  </Picker>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    শাখা:
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    (Section:)
                  </Text>
                  <Picker
                    style={{
                      height: 40,
                      width: 150,
                    }}
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
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    শ্রেণি শিক্ষকের নাম:
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    (Class Teacher:)
                  </Text>
                  <Picker
                    style={{
                      height: 40,
                      width: 180,
                    }}
                    selectedValue={this.state.classTeacher}
                    onValueChange={(value) => {
                      this.setState({
                        classTeacher: value,
                      });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.allTeacher
                      .filter((item) => {
                        return (
                          item.school === this.state.pickerSchool
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
                  <View>
                    <TextInput
                      style={{
                        height: 30,
                        width: 160,
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
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    লিঙ্গ:
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    (Gender:)
                  </Text>
                  <Picker
                    style={{
                      height: 40,
                      width: 130,
                    }}
                    selectedValue={this.state.classTeacherGender}
                    onValueChange={(value) => {
                      this.setState({ classTeacherGender: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"Female"} value={"Female"} />
                    <Picker.Item label={"Male"} value={"Male"} />
                    <Picker.Item label={"Other"} value={"Other"} />
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
                    সংশ্লিষ্ট বিষয়ে প্রশিক্ষণপ্রাপ্ত শিক্ষক পাঠ পরিচালনা করছেন
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    (Traind Teacher:)
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Picker
                      style={{
                        height: 40,
                        width: 150,
                      }}
                      selectedValue={this.state.teacherTrained}
                      onValueChange={(value) => {
                        this.setState({ teacherTrained: value });
                      }}
                      itemStyle={{ color: "white" }}
                    >
                      <Picker.Item label={"Select"} value={""} />
                      <Picker.Item label={"Yes"} value={"Yes"} />
                      <Picker.Item label={"No"} value={"No"} />
                    </Picker>
                  </View>
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
                        ক্লাস শুরুর সময়:
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        (Class Start Time:)
                      </Text>
                      <TextInput
                        style={{
                          height: 30,
                          width: 100,
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
                      {/* <Text style={{ fontSize: 14 }}>
                        {String(this.state.startTime.toLocaleTimeString())}
                      </Text>
                      <Button
                        onPress={this.timepicker}
                        title="Select start time"
                        style={{ width: 30 }}
                      />
                      {show && (
                        <DateTimePicker
                          value={startTime}
                          mode={mode}
                          is24Hour={true}
                          display="default"
                          onChange={this.setStartTime}
                        />
                      )} */}

                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        ক্লাস শেষের সময়:
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        (Class End Time:)
                      </Text>
                      <TextInput
                        style={{
                          height: 30,
                          width: 100,
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
                      {/* <Text style={{ fontSize: 14 }}>
                        {String(this.state.endTime.toLocaleTimeString())}
                      </Text>
                      <Button
                        onPress={this.timepicker}
                        title="Time picker"
                        style={{ width: 100 }}
                      />
                      {show && (
                        <DateTimePicker
                          value={endTime}
                          mode={mode}
                          is24Hour={true}
                          display="default"
                          onChange={this.setEndTime}
                        />
                      )} */}
                    </View>
                  </View>
                </View>
                <View style={{ flex: 2 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    পাঠ নং/ পাঠের নাম:
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    (Lesson:)
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
                      this.setState({ teachingTopic: text })
                    }
                    value={this.state.teachingTopic + ""}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    পিরিয়ড:
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    (Period:)
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
                      this.setState({ teachingDay: text })
                    }
                    value={this.state.teachingDay + ""}
                  />
                  {/* <Picker
                    style={{
                      height: 40,
                      width: 150,
                    }}
                    selectedValue={this.state.teachingDay}
                    onValueChange={(value) => {
                      this.setState({ teachingDay: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
                    <Picker.Item label={"1st"} value={"1st"} />
                    <Picker.Item label={"2nd"} value={"2nd"} />
                    <Picker.Item label={"3rd"} value={"3rd"} />
                    <Picker.Item label={"4th"} value={"4th"} />
                    <Picker.Item label={"5th"} value={"5th"} />
                    <Picker.Item label={"6th"} value={"6th"} />
                  </Picker> */}
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
                    ভর্তিকৃত শিশুর সংখ্যা:
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    (Admitted Student:)
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text>মেয়ে:</Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        (Girls:)
                      </Text>
                      <Text>ছেলে:</Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        (Boys:)
                      </Text>
                      <Text>মোট:</Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        (Total:)
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        style={{
                          height: 30,
                          width: 50,
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
                          width: 50,
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
                          width: 50,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="numeric"
                        placeholder=""
                        editable={false}
                        value={this.state.studentTotal + ""}
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
                    উপস্থিত শিশুর সংখ্যা :
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    (Present Student:)
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text>মেয়ে:</Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        (Girls:)
                      </Text>
                      <Text>ছেলে:</Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        (Boys:)
                      </Text>
                      <Text>মোট:</Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        (Total:)
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        style={{
                          height: 30,
                          width: 50,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="numeric"
                        placeholder=""
                        editable={true}
                        onChangeText={(text) =>
                          this.setState({
                            presentGirl: Number(text),
                            presentTotal: Number(text) + this.state.presentBoy,
                          })
                        }
                        value={this.state.presentGirl + ""}
                      />
                      <TextInput
                        style={{
                          height: 30,
                          width: 50,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="numeric"
                        placeholder=""
                        editable={true}
                        onChangeText={(text) =>
                          this.setState({
                            presentBoy: Number(text),
                            presentTotal: Number(text) + this.state.presentGirl,
                          })
                        }
                        value={this.state.presentBoy + ""}
                      />
                      <TextInput
                        style={{
                          height: 30,
                          width: 50,
                          padding: 5,
                          borderWidth: 1,
                        }}
                        keyboardType="numeric"
                        placeholder=""
                        editable={false}
                        value={this.state.presentTotal + ""}
                      />
                    </View>
                  </View>
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
                      পরিদর্শক এর নাম:
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
                    (Visitor:)
                  </Text>
                  <Picker
                    style={{
                      height: 40,
                      width: 250,
                    }}
                    selectedValue={this.state.pickerVisitor}
                    onValueChange={(value) => {
                      this.setState({ pickerVisitor: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.allEmployee.map((item) => {
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
                      পদবী:
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
                    (Visitor Designation:)
                  </Text>
                  <Picker
                    style={{
                      height: 40,
                      width: 180,
                    }}
                    selectedValue={this.state.pickerDesignation}
                    onValueChange={(value) => {
                      this.setState({ pickerDesignation: value });

                      this.setState({
                        preMonthData:
                          this.state.allBanglaClassObservationData.filter(
                            (item) => {
                              return (
                                item.visitNo ===
                                  parseInt(parseInt(this.state.visitNo) - 1) &&
                                item.school === this.state.pickerSchool &&
                                item.project === this.state.pickerProject &&
                                item.year === this.state.pickerYear &&
                                item.grade === this.state.grade &&
                                item.classTeacher.trim() ===
                                  this.state.classTeacher.trim()
                              );
                            }
                          ),
                      });

                      console.log(
                        "this.state.pickerSchool : " + this.state.pickerSchool
                      );

                      console.log(
                        "this.state.pickerProject : " + this.state.pickerProject
                      );

                      console.log(
                        "this.state.pickerYear : " + this.state.pickerYear
                      );

                      console.log(
                        "this.state.pickerMonth : " + this.state.pickerMonth
                      );

                      console.log("this.state.grade : " + this.state.grade);

                      console.log(
                        "this.state.classTeacher : " + this.state.classTeacher
                      );

                      console.log(
                        "parseInt(this.state.visitNo) : " +
                          parseInt(parseInt(this.state.visitNo) - 1)
                      );

                      //console.log("preMonthData: " + this.state.preMonthData);
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    {this.state.allDesignation.map((item) => {
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
                      পরিদর্শক এর অফিস:
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
                    (Visitor Office:)
                  </Text>
                  <Picker
                    style={{
                      height: 40,
                      width: 130,
                    }}
                    selectedValue={this.state.pickerVisitorOffice}
                    onValueChange={(value) => {
                      this.setState({ pickerVisitorOffice: value });
                      console.log(
                        "preMonthData: " + this.state.preMonthData.length
                      );
                      if (this.state.preMonthData.length > 0) {
                        const followup1 = this.state.preMonthData
                          .map((item) => {
                            return item.coachingSupportInd1;
                          })
                          .toString();

                        const followup2 = this.state.preMonthData
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
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"CO"} value={"CO"} />
                    <Picker.Item label={"DFO"} value={"DFO"} />
                    <Picker.Item label={"CFO"} value={"CFO"} />
                    <Picker.Item label={"NFO"} value={"NFO"} />
                    <Picker.Item label={"MFO"} value={"MFO"} />
                    <Picker.Item label={"NrFO"} value={"NrFO"} />
                  </Picker>
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
                    মন্তব্য :
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    (Comment:)
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

          {/* <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>নির্দেশনা </Text>
            <Card style={{ padding: 10, margin: 10 }}>
              <Text style={{ padding: 5 }}>
                ১। সংশ্লিষ্ট বিষয়ে প্রশিক্ষণপ্রাপ্ত শিক্ষক কর্তৃক পাঠ পরিচালিত
                হলেই কেবল সম্পূর্ণ পাঠ পর্যবেক্ষণ করুন ।
              </Text>
              <Text style={{ padding: 5 }}>
                ২। সম্পূর্ণ পাঠ পর্যবেক্ষণ করুন তবে অগ্রাধিকার এরিয়ার ভিত্তিতে
                ভালো দিক ও সহায়তার ক্ষেত্রগুলা চিহ্নিত করুন ।
              </Text>
              <Text style={{ padding: 5 }}>
                ৩। বাংলা পাঠ উপস্থাপন সংক্রান্ত ২-৩ টি ভালো দিক উল্লেখ করুন।
              </Text>
              <Text style={{ padding: 5 }}>
                ৪। অগ্রাধিকার এরিয়ার ভিত্তিতে উপর ভিত্তিতে যে ১-২ টি ইনডিকেটরের
                উত্তর "না বা আংশিক" হয়েছে তার আলোকে সহায়তার জন্য
                অগ্রাধিকারভিত্তিক ইনডিকেটর উল্লেখ করুন
              </Text>
              <Text style={{ padding: 5 }}>
                ৫। বাংলা পাঠ উন্নতির জন্য শিক্ষকের সাথে 2-3 সূচক আলোচনা করুন।
              </Text>
              <Text style={{ padding: 5 }}>
                ৬। রুম টু রিড থেকে কোনো পদক্ষেপ গ্রহণের প্রয়োজন হলে উল্লেখ করুন
                ।
              </Text>
            </Card>
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
            <Text style={styles.bigRedText}>ইনডিকেটর</Text>
            <Text style={styles.bigRedText}>(Indicator)</Text>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <Text
                  style={{
                    backgroundColor: "green",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  প্রায়োরিটি এরিয়া - ১: পাঠদান পরিকল্পনা অনুসরণ
                </Text>
                <Text
                  style={{
                    backgroundColor: "green",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  (Priority Area - 1: Following the lesson plan)
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
                    <Text>
                      ১ক. শিক্ষক ওয়ার্কবুক ব্যবহারের নির্দেশিকা অনুসরণ করে
                      শ্রেণি কার্যক্রম পরিচালনা করেছেন এবং প্রয়োজনে দেখেছেন ।
                    </Text>
                    <Text>
                      (1a. The teacher conducted the class activities following
                      the guidelines for use of the workbook and observed as
                      necessary.)
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      (Priority Area: 1)
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
                        <Text>(Observation:)</Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 140,
                          }}
                          onValueChange={(value) => {
                            this.setState({
                              ind11TeacherFollowedTeacherGuideInClassStatus:
                                value,
                            });

                            // Set teacher status
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" &&
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" &&
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" &&
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" &&
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
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
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
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
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
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
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>মন্তব্য: </Text>
                        <Text>(Comment:)</Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
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
                  {ind11TeacherFollowedTeacherGuideInClassStatus === "No" && (
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
                          পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে,
                          কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব
                          কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে
                          নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind11TeacherFollowedTeacherGuideInClassStatus ===
                    "Partial" && (
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
                          পাঠদানে কোন কোন পদ্ধতি অনুসরণ করে কী কী কাজ করানো হবে,
                          কাজের ধারাবাহিকতা কী হবে, পড়তে শেখা এবং পড়ে শেখার সব
                          কাজ ওয়ার্কবুক ব্যবহারের নির্দেশিকায় উল্লেখ থাকে বলে
                          নির্দেশিকা অনুসরণ করা গুরুত্বপূর্ণ।
                        </Text>
                      </Card>
                    </View>
                  )}
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
                      ১খ. শিক্ষক ক্লাসে 'আমি করি-আমরা করি-তুমি কর' পদ্ধতি অনুসরণ
                      করেছেন ।
                    </Text>
                    <Text>
                      (1b. Teachers follow the 'I do-we do-you do' method in the
                      classroom)
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      (Priority Area: 1)
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
                        <Text>(Observation:)</Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 140,
                          }}
                          selectedValue={
                            this.state.ind12FollowedIDoWeDoYouDoStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind12FollowedIDoWeDoYouDoStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" &&
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" &&
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" &&
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" &&
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
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
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
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
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
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
                        <Text>(Comment:)</Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
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
                  {ind12FollowedIDoWeDoYouDoStatus === "No" && (
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
                          ‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে
                          শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা
                          করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার
                          চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন
                          করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য
                          করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা
                          স্বাধীনভাবে কাজ করার চেষ্টা করে।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind12FollowedIDoWeDoYouDoStatus === "Partial" && (
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
                          ‘আমি করি’ নীতিতে শিক্ষক শিক্ষার্থীদের করে দেখাবেন যাতে
                          শিক্ষার্থীরা কার্যক্রমটি স্পষ্টভাবে বুঝতে পারে। ‘আমরা
                          করি’ পদ্ধতিতে শিক্ষার্থীরা শিক্ষকের সহায়তায় কাজটি করার
                          চেষ্টা করে। এভাবে শিক্ষক শিক্ষার্থীদের ভুলগুলো সংশোধন
                          করে দিতে পারেন এবং সঠিকভাবে কাজ করার জন্যে সাহায্য
                          করতে পারেন। ‘তুমি কর’ নীতিতে শিক্ষার্থীরা নিজেরা
                          স্বাধীনভাবে কাজ করার চেষ্টা করে।
                        </Text>
                      </Card>
                    </View>
                  )}
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
                      ১গ. শিক্ষার্থীদের ওয়ার্কবুকের কাজ, বই, খাতা এবং এলএফ-এর
                      গত পর্যবেক্ষণ ফরম থেকে দেখা গেছে গত ভিজিটের পর শিক্ষক
                      ধারাবাহিকভাবে পাঠের অনুসরণ করেছেন ।
                    </Text>
                    <Text>
                      (1c. The past observation form of students' workbook work,
                      books, notebooks and LF showed that the teacher followed
                      the lesson consistently after the last visit.)
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      (Priority Area: 1)
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
                        <Text>(Observation:)</Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          selectedValue={
                            this.state.ind13FollowedContinuityOfLessonStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind13FollowedContinuityOfLessonStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" &&
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" &&
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" &&
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" &&
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
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
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
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
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
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
                        <Text>(Comment:)</Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
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
                  {ind13FollowedContinuityOfLessonStatus === "No" && (
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
                          পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও
                          ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে।
                          পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ
                          পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয়
                          পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind13FollowedContinuityOfLessonStatus === "Partial" && (
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
                          পাঠদান প্রক্রিয়ায় এক পাঠের সাথে পরবর্তী পাঠের সংযোগ ও
                          ধারাবাহিকতা শিক্ষার্থীর দক্ষতা অর্জনে সহায়তা করে।
                          পাঠের ধারাবাহিকতা ব্যাহত হলে শিক্ষার্থীদের যে পাঠ
                          পড়ানো হয়নি সে পাঠের ও যে পাঠ থেকে শুরু করা হয়েছে উভয়
                          পাঠেরই প্রয়োজনীয় দক্ষতা অর্জনে প্রতিবদ্ধকতা তৈরি হয়।
                        </Text>
                      </Card>
                    </View>
                  )}
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
                      ১ঘ. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ
                      ধারাবাহিভাবে বাস্তবায়ন করেছেন ।
                    </Text>
                    <Text>
                      (1d. The teacher has consistently implemented all the
                      tasks of the lesson within the stipulated time.)
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      (Priority Area: 1)
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
                        <Text>(Observation:)</Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          selectedValue={
                            this.state.ind14ImplementedAllTaskInTimeStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind14ImplementedAllTaskInTimeStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" &&
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" &&
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" &&
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" &&
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
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
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
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
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
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
                        <Text>(Comment:)</Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
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
                  {ind14ImplementedAllTaskInTimeStatus === "No" && (
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
                          শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম
                          থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো
                          প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ
                          ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind14ImplementedAllTaskInTimeStatus === "Partial" && (
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
                          শিক্ষার্থীর পড়ার দক্ষতা তৈরি করতে পাঠের সকল কাজ প্রথম
                          থেকে শেষ পর্যন্ত করা প্রয়োজন, তাই শিখন-শেখানো
                          প্রক্রিয়ার জন্য নির্ধারিত সময়ের মধ্যে সকল কাজ
                          ধারাবাহিকভাবে বাস্তবায়ন করতে হবে।
                        </Text>
                      </Card>
                    </View>
                  )}
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
                      ১ঙ. শিক্ষক শিক্ষার্থীদের ওয়ার্কবুকে কাজ করার নির্দেশনা
                      দিয়েছেন ।
                    </Text>
                    <Text>
                      (1e. Teachers guide students to work in the workbook)
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      (Priority Area: 1)
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
                            width: 140,
                          }}
                          selectedValue={
                            this.state.ind15InstructedToUseWorkbookStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind15InstructedToUseWorkbookStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" &&
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" &&
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" &&
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" &&
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
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
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
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
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
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
                        <Text>(Comment:)</Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
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
                  {ind15InstructedToUseWorkbookStatus === "No" && (
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
                          শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয়
                          থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর
                          মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের
                          সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind15InstructedToUseWorkbookStatus === "Partial" && (
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
                          শিক্ষার্থীদের ওয়ার্কবুকে অনুশীলনের জন্যে উপযোগী বিষয়
                          থাকে। সেগুলো চর্চা করা খুবই গুরুত্বপূর্ণ কারণ এর
                          মাধ্যমে তাদের বেশি করে চর্চার, স্বাধীনভাবে অনুশীলনের
                          সুযোগ বৃদ্ধি পায় যা তাদের আত্মবিশ্বাসী করে তোলে।
                        </Text>
                      </Card>
                    </View>
                  )}
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
                      ১চ. শিক্ষক ক্লাস চলাকালীন শিক্ষার্থীদের স্বাধীনভাবে পড়ার
                      সুযোগ দিয়েছেন ।
                    </Text>
                    <Text>
                      (1f. The teacher gave students the opportunity to read
                      independently during the class.)
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      (Priority Area: 1)
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
                            width: 140,
                          }}
                          selectedValue={
                            this.state.ind16IndependentReadingOpportunityStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind16IndependentReadingOpportunityStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" &&
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" &&
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" &&
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" &&
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
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
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
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
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
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
                        <Text>(Comment:)</Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
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
                  {ind16IndependentReadingOpportunityStatus === "No" && (
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
                          শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি
                          চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে
                          এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে
                          উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া
                          প্রয়োজন।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind16IndependentReadingOpportunityStatus === "Partial" && (
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
                          শিক্ষার্থীরা যাতে নিজে নিজে পড়তে পারে, বেশি বেশি
                          চর্চার করার সুযোগ পায়, নির্ধারিত মানগতি মেনে পড়তে পারে
                          এবং তাদেও মধ্যে পড়তে পারার আত্মবিশ্বাস তৈরি হয় সে
                          উদ্দেশ্যে শিক্ষার্থীদের স্বাধীনভাবে পড়ার সুযোগ দেয়া
                          প্রয়োজন।
                        </Text>
                      </Card>
                    </View>
                  )}
                </Card>

                <View style={{ padding: 5 }}>
                  <Text
                    style={{
                      backgroundColor: "green",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    প্রায়োরিটি এরিয়া - ২: মৌলিক পাঠদান দক্ষতা
                  </Text>
                  <Text
                    style={{
                      backgroundColor: "green",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    (Priority Area - 2: Basic Teaching Skills)
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
                    <Text>
                      ২ক. শিক্ষক ধ্বনিসচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের
                      ধ্বনি সঠিকভাবে উচ্চারণ করেছেন ।
                    </Text>
                    <Text>
                      (2a. The teacher has correctly pronounced the sounds of
                      all the letters and words used in the phonics activity.)
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ২
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      (Priority Area: 2)
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
                        <Text>(Observation:)</Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          selectedValue={
                            this.state.ind21CorrectlyPronouncedStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind21CorrectlyPronouncedStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" &&
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" &&
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" &&
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" &&
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
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
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
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
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
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
                        <Text>(Comment:)</Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
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
                  {ind21CorrectlyPronouncedStatus === "No" && (
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
                          শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর
                          শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে
                          সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind21CorrectlyPronouncedStatus === "Partial" && (
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
                          শব্দের মধ্যে ব্যবহৃত ধ্বনির সঠিক উচ্চারণ শিক্ষার্থীর
                          শোনার দক্ষতা বৃদ্ধিতে সহায়তা করে, সঠিক বানান লিখতে
                          সহায়তা করে, পড়তে পারার দক্ষতা অর্জনে সহায়তা করে।
                        </Text>
                      </Card>
                    </View>
                  )}
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
                      ২খ. শিক্ষক সঠিকভাবে বর্ণ/ যুক্তবর্ণ পড়া বা বর্ণ/
                      যুক্তবর্ণ ও শব্দাংশ মিলিয়ে শব্দ পড়া শিখিয়েছেন এবং
                      শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।
                    </Text>
                    <Text>
                      (2b. The teacher taught correct letter/hybrid reading or
                      letter/hyphen and syllable reading and gave the students
                      an opportunity to practice.)
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ২
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      (Priority Area: 2)
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
                        <Text>(Observation:)</Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          selectedValue={
                            this.state.ind22TaughtCorrectlyAllowPracticeStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind22TaughtCorrectlyAllowPracticeStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" &&
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" &&
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" &&
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" &&
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
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
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
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
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
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
                        <Text>(Comment:)</Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
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
                  {ind22TaughtCorrectlyAllowPracticeStatus === "No" && (
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
                          বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে
                          শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া
                          শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও
                          পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind22TaughtCorrectlyAllowPracticeStatus === "Partial" && (
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
                          বাংলা শিখন শেখানো কার্যক্রমে শিক্ষক কে অনুকণের মাধ্যমে
                          শিক্ষার্থীরা পরিচিত বর্ণ বা শব্দাংশ মিলিয়ে শব্দ পড়া
                          শিখতে পারে, এমনকি যেসব শব্দ তারা আগে দেখেনি সেগুলোও
                          পড়তে শেখে এবং নিজের মত করে অনুশীলন করে।
                        </Text>
                      </Card>
                    </View>
                  )}
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
                      ২গ. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি, শুদ্ধ
                      উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে
                      দেখিয়েছেন ।
                    </Text>
                    <Text>
                      (2c. The teacher demonstrates fluent reading (reading with
                      correct pace, correct pronunciation and expression) to the
                      students.)
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ২
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      (Priority Area: 2)
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
                        <Text>(Observation:)</Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          selectedValue={
                            this.state.ind23DemonstratesFluentReadingStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind23DemonstratesFluentReadingStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" &&
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" &&
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" &&
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" &&
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
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
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
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
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
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
                        <Text>(Comment:)</Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
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
                  {ind23DemonstratesFluentReadingStatus === "No" && (
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
                          শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের
                          সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা
                          শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া
                          প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে
                          পড়তে হয় সে দক্ষতা অর্জন করে।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind23DemonstratesFluentReadingStatus === "Partial" && (
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
                          শিক্ষক কর্তৃক একটি সাবলীল পঠন উপস্থাপনা শিক্ষার্থীদের
                          সাবলীলভাবে পড়তে সাহায্য করে যার মাধ্যমে শিক্ষার্থীরা
                          শব্দের সঠিক উচ্চারণ, কতটুকু মানগতি বজায় রেখে পড়া
                          প্রয়োজন এবং কিভাবে অভিব্যক্তি বজায় রেখে আনন্দের সাথে
                          পড়তে হয় সে দক্ষতা অর্জন করে।
                        </Text>
                      </Card>
                    </View>
                  )}
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
                      ২ঘ. শিক্ষক শিক্ষার্থীদের কয়েকবার এককভাবে বা জুটিতে বা দলে
                      পড়ার সুযোগ দিয়েছেন ।
                    </Text>
                    <Text>
                      (2d. The teacher gave students the opportunity to read
                      several times individually or in pairs or groups.)
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ২
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      (Priority Area: 2)
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
                        <Text>(Observation:)</Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          selectedValue={
                            this.state
                              .ind24AllowReadIndividuallyPairGroupsStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind24AllowReadIndividuallyPairGroupsStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" &&
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" &&
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" &&
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" &&
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
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
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
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
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
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
                        <Text>(Comment:)</Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
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
                  {ind24AllowReadIndividuallyPairGroupsStatus === "No" && (
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
                          পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার
                          দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল
                          টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind24AllowReadIndividuallyPairGroupsStatus === "Partial" && (
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
                          পড়ার ক্ষেত্রে পুনরাবৃত্তি শিক্ষার্থীর সার্বিক পড়ার
                          দক্ষতা বৃদ্ধি করে। একারণে তাদের শব্দ, বাক্য ও ডিকোডেবল
                          টেক্সট একক বা দলে বার বার পড়ার সুযোগ দিতে হবে।
                        </Text>
                      </Card>
                    </View>
                  )}
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
                      ২ঙ. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ/শব্দ/বাক্য
                      লেখার কাজ করিয়েছেন ।
                    </Text>
                    <Text>
                      (2e. The teacher has done the work of writing
                      letters/hyphens/words/sentences as per instructions.)
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ২
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      (Priority Area: 2)
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
                        <Text>(Observation:)</Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          selectedValue={
                            this.state.ind25FollowsInstructionsInWritingStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind25FollowsInstructionsInWritingStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" &&
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" &&
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" &&
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" &&
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
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
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
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
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
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
                        <Text>(Comment:)</Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
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
                  {ind25FollowsInstructionsInWritingStatus === "No" && (
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
                  )}
                </Card>

                <View style={{ padding: 5 }}>
                  <Text
                    style={{
                      backgroundColor: "green",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    প্রায়োরিটি এরিয়া - ৩: উচ্চতর দক্ষতা অর্জন
                  </Text>
                  <Text
                    style={{
                      backgroundColor: "green",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    (Priority Area – 3: Achieving Higher Teaching Skills)
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
                    <Text>
                      ৩ক. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন
                      করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন ।
                    </Text>
                    <Text>
                      (3a. For correct answers, the teacher asked students
                      helpful questions or taught them strategies for finding
                      answers.)
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ৩
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      (Priority Area: 3)
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
                        <Text>(Observation:)</Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          selectedValue={
                            this.state.ind31AskedHelpfulQuestionsStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind31AskedHelpfulQuestionsStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" &&
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" &&
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" &&
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" &&
                              this.state
                                .ind25FollowsInstructionsInWrittingStatus ===
                                "Yes" &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentanceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentanceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentanceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPuncuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPuncuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPuncuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOppertunityStatus ===
                                "Yes" &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
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
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
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
                                  .ind25FollowsInstructionsInWrittingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWrittingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWrittingStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentanceStatus ===
                                  "Yes" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentanceStatus ===
                                  "No" ||
                                this.state
                                  .ind32TaughtVocabularyNewSentanceStatus ===
                                  "Partial" ||
                                this.state
                                  .ind33CheckWritingSpellingPuncuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPuncuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPuncuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
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
                        <Text>(Comment:)</Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
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
                  {ind31AskedHelpfulQuestionsStatus === "No" && (
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
                          সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন
                          করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind31AskedHelpfulQuestionsStatus === "Partial" && (
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
                          সরাসরি উত্তর দেওয়ার পরিবর্তে শিক্ষকের উচিত অন্য প্রশ্ন
                          করে তাদের নিজের মতো করে উত্তর বের করতে সহায়তা করা।
                        </Text>
                      </Card>
                    </View>
                  )}
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
                      ৩খ. শিক্ষক শব্দভান্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং
                      শিক্ষার্থীদের বাক্যে ব্যবহারের সুযোগ দিয়েছেন অথবা সঠিক
                      শব্দ দিয়ে অর্থবোধক বাক্য তৈরির কাজ করিয়েছেন।
                    </Text>
                    <Text>
                      (3b. The teacher taught the vocabulary words with meaning
                      and gave students opportunities to form new sentences
                      using the words.)
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ৩
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      (Priority Area: 3)
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
                        <Text>(Observation:)</Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          selectedValue={
                            this.state.ind32TaughtVocabularyNewSentenceStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind32TaughtVocabularyNewSentenceStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" &&
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" &&
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" &&
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" &&
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
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
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
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
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
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
                        <Text>(Comment:)</Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
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
                  {ind32TaughtVocabularyNewSentenceStatus === "No" && (
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
                          শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে
                          তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার
                          করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে
                          রাখতে পারে এবং গল্পটি বুঝতে পারে।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind32TaughtVocabularyNewSentenceStatus === "Partial" && (
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
                          শিক্ষার্থীরদের যদি দক্ষ পাঠক হিসেবে গড়ে তুলতে হয় তাহলে
                          তাদেরকে শব্দের সঠিক অর্থ বলা এবং বাক্যের মধ্যে ব্যবহার
                          করতে দেবার সুযোগ দিতে হবে যাতে শব্দগুলি ভালভাবে মনে
                          রাখতে পারে এবং গল্পটি বুঝতে পারে।
                        </Text>
                      </Card>
                    </View>
                  )}
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
                      ৩গ. শিক্ষক শিক্ষার্থীদের লেখা দেখে সঠিক বানান এবং যতি
                      চিহ্নের ব্যবহার নিশ্চিত করেছেন ।
                    </Text>
                    <Text>
                      (3c. The teacher checked the students' writing to ensure
                      correct spelling and punctuation.)
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ৩
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      (Priority Area: 3)
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
                        <Text>(Observation:)</Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          selectedValue={
                            this.state
                              .ind33CheckWritingSpellingPunctuationStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind33CheckWritingSpellingPunctuationStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" &&
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" &&
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" &&
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" &&
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
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
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
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
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
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
                        <Text>(Comment:)</Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
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
                  {ind33CheckWritingSpellingPunctuationStatus === "No" && (
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
                          শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি
                          পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে
                          গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং
                          যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind33CheckWritingSpellingPunctuationStatus === "Partial" && (
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
                          শব্দের সঠিক বানান ও বিরামচিহ্নের সঠিক ব্যবহার একটি
                          পরিপূর্ণ বাক্য গঠনে এবং বাক্যের অর্থ বুঝতে
                          গুরুত্বপূর্ণ। তাই শিক্ষার্থীদের সঠিক বানান এবং
                          যতিচিহ্নের সঠিক ব্যবহার শেখানো গুরুত্বপূর্ণ।
                        </Text>
                      </Card>
                    </View>
                  )}
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
                      ৩ঘ. 'আমরা করি-তুমি কর' কাজের সময় শিক্ষার্থীরা ঠিকমতো অংশ
                      গ্রহণ করেছে কিনা শিক্ষক তা ঘুরে ঘুরে দেখেছেন ।
                    </Text>
                    <Text>
                      (3d. During the 'we do-you do' task, the teacher checks
                      whether the students have participated properly.)
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ৩
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      (Priority Area: 3)
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
                        <Text>(Observation:)</Text>
                        <Picker
                          style={{
                            height: 50,
                            width: 140,
                          }}
                          selectedValue={this.state.ind34CheckedWeDoYouDoStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind34CheckedWeDoYouDoStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" &&
                              this.state
                                .ind22TaughtCorrectlyAllowPracticeStatus ===
                                "Yes" &&
                              this.state
                                .ind23DemonstratesFluentReadingStatus ===
                                "Yes" &&
                              this.state
                                .ind24AllowReadIndividuallyPairGroupsStatus ===
                                "Yes" &&
                              this.state
                                .ind25FollowsInstructionsInWritingStatus ===
                                "Yes" &&
                              (this.state.ind31AskedHelpfulQuestionsStatus ===
                                "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state
                                .ind11TeacherFollowedTeacherGuideInClassStatus ===
                                "Yes" &&
                              this.state.ind12FollowedIDoWeDoYouDoStatus ===
                                "Yes" &&
                              this.state
                                .ind13FollowedContinuityOfLessonStatus ===
                                "Yes" &&
                              this.state.ind14ImplementedAllTaskInTimeStatus ===
                                "Yes" &&
                              this.state.ind15InstructedToUseWorkbookStatus ===
                                "Yes" &&
                              this.state
                                .ind16IndependentReadingOpportunityStatus ===
                                "Yes" &&
                              (this.state.ind21CorrectlyPronouncedStatus ===
                                "Yes" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "No" ||
                                this.state.ind21CorrectlyPronouncedStatus ===
                                  "Partial" ||
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
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "No" ||
                                this.state
                                  .ind23DemonstratesFluentReadingStatus ===
                                  "Partial" ||
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
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Yes" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "No" ||
                                this.state
                                  .ind25FollowsInstructionsInWritingStatus ===
                                  "Partial" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Yes" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "No" ||
                                this.state.ind31AskedHelpfulQuestionsStatus ===
                                  "Partial" ||
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
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Yes" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "No" ||
                                this.state
                                  .ind33CheckWritingSpellingPunctuationStatus ===
                                  "Partial" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "Yes" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
                                  "No" ||
                                this.state.ind34CheckedWeDoYouDoStatus ===
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
                        <Text>(Comment:)</Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
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
                  {ind34CheckedWeDoYouDoStatus === "No" && (
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
                          শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে
                          শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি
                          না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা
                          প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind34CheckedWeDoYouDoStatus === "Partial" && (
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
                          শ্রেণিকক্ষে কাজ চলাকালীন সময়ে শিক্ষক ঘুরে ঘুরে
                          শিক্ষার্থীদের দেখলে বুঝতে পারবেন সবাই অনুশীলন করছে কি
                          না এবং কারো কোনো সমস্যা হচ্ছে কি না, কোথায় সহায়তা
                          প্রয়োজন এবং কীভাবে তিনি সহায়তা করতে পারবেন।
                        </Text>
                      </Card>
                    </View>
                  )}
                </Card>
              </View>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <Text style={{ backgroundColor: "green" }}>
                শিক্ষককে পরামর্শ দেয়ার জন্য গুরুত্বপূর্ণ কিছু বিষয় :
              </Text>
              <Text style={{ backgroundColor: "green" }}>
                (Some important points to suggest to the teacher:)
              </Text>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      ক্লাস চলাকালীন শিক্ষক ভালো করেছেন এমন ১/২ টি বিষয় উল্লেখ
                      করুন ।
                    </Text>
                    <Text>
                      (Mention 1/2 things the teacher did well during the
                      class.)
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>১.</Text>
                    <Picker
                      style={{
                        height: 40,
                        width: 150,
                      }}
                      selectedValue={this.state.bestPracticeInd1}
                      onValueChange={(value) => {
                        this.setState({ bestPracticeInd1: value });

                        // Set teacher status
                        if (
                          this.state
                            .ind11TeacherFollowedTeacherGuideInClassStatus ===
                            "Yes" &&
                          this.state.ind12FollowedIDoWeDoYouDoStatus ===
                            "Yes" &&
                          this.state.ind13FollowedContinuityOfLessonStatus ===
                            "Yes" &&
                          this.state.ind14ImplementedAllTaskInTimeStatus ===
                            "Yes" &&
                          this.state.ind15InstructedToUseWorkbookStatus ===
                            "Yes" &&
                          this.state
                            .ind16IndependentReadingOpportunityStatus ===
                            "Yes" &&
                          this.state.ind21CorrectlyPronouncedStatus === "Yes" &&
                          this.state.ind22TaughtCorrectlyAllowPracticeStatus ===
                            "Yes" &&
                          this.state.ind23DemonstratesFluentReadingStatus ===
                            "Yes" &&
                          this.state
                            .ind24AllowReadIndividuallyPairGroupsStatus ===
                            "Yes" &&
                          this.state.ind25FollowsInstructionsInWritingStatus ===
                            "Yes" &&
                          (this.state.ind31AskedHelpfulQuestionsStatus ===
                            "Yes" ||
                            this.state.ind31AskedHelpfulQuestionsStatus ===
                              "No" ||
                            this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Partial" ||
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
                              .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes" ||
                            this.state
                              .ind33CheckWritingSpellingPunctuationStatus ===
                              "No" ||
                            this.state
                              .ind33CheckWritingSpellingPunctuationStatus ===
                              "Partial" ||
                            this.state.ind34CheckedWeDoYouDoStatus === "Yes" ||
                            this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                            this.state.ind34CheckedWeDoYouDoStatus ===
                              "Partial")
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          this.state
                            .ind11TeacherFollowedTeacherGuideInClassStatus ===
                            "Yes" &&
                          this.state.ind12FollowedIDoWeDoYouDoStatus ===
                            "Yes" &&
                          this.state.ind13FollowedContinuityOfLessonStatus ===
                            "Yes" &&
                          this.state.ind14ImplementedAllTaskInTimeStatus ===
                            "Yes" &&
                          this.state.ind15InstructedToUseWorkbookStatus ===
                            "Yes" &&
                          this.state
                            .ind16IndependentReadingOppertunityStatus ===
                            "Yes" &&
                          (this.state.ind21CorrectlyPronouncedStatus ===
                            "Yes" ||
                            this.state.ind21CorrectlyPronouncedStatus ===
                              "No" ||
                            this.state.ind21CorrectlyPronouncedStatus ===
                              "Partial" ||
                            this.state
                              .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes" ||
                            this.state
                              .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "No" ||
                            this.state
                              .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Partial" ||
                            this.state.ind23DemonstratesFluentReadingStatus ===
                              "Yes" ||
                            this.state.ind23DemonstratesFluentReadingStatus ===
                              "No" ||
                            this.state.ind23DemonstratesFluentReadingStatus ===
                              "Partial" ||
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
                              .ind25FollowsInstructionsInWritingStatus ===
                              "Yes" ||
                            this.state
                              .ind25FollowsInstructionsInWritingStatus ===
                              "No" ||
                            this.state
                              .ind25FollowsInstructionsInWritingStatus ===
                              "Partial" ||
                            this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes" ||
                            this.state.ind31AskedHelpfulQuestionsStatus ===
                              "No" ||
                            this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Partial" ||
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
                              .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes" ||
                            this.state
                              .ind33CheckWritingSpellingPunctuationStatus ===
                              "No" ||
                            this.state
                              .ind33CheckWritingSpellingPunctuationStatus ===
                              "Partial" ||
                            this.state.ind34CheckedWeDoYouDoStatus === "Yes" ||
                            this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                            this.state.ind34CheckedWeDoYouDoStatus ===
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
                      {this.state.allBanglaIndicator.map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.indicatorDetail}
                            value={item.indicatorDetail}
                          />
                        );
                      })}
                      <Picker.Item label={"N/A"} value={"N/A"} />
                    </Picker>
                    <Text>১.</Text>
                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      value={this.state.bestPracticeInd1}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>২.</Text>
                    <Picker
                      style={{
                        height: 40,
                        width: 150,
                      }}
                      selectedValue={this.state.bestPracticeInd2}
                      onValueChange={(value) => {
                        this.setState({ bestPracticeInd2: value });

                        // Set teacher status
                        if (
                          this.state
                            .ind11TeacherFollowedTeacherGuideInClassStatus ===
                            "Yes" &&
                          this.state.ind12FollowedIDoWeDoYouDoStatus ===
                            "Yes" &&
                          this.state.ind13FollowedContinuityOfLessonStatus ===
                            "Yes" &&
                          this.state.ind14ImplementedAllTaskInTimeStatus ===
                            "Yes" &&
                          this.state.ind15InstructedToUseWorkbookStatus ===
                            "Yes" &&
                          this.state
                            .ind16IndependentReadingOpportunityStatus ===
                            "Yes" &&
                          this.state.ind21CorrectlyPronouncedStatus === "Yes" &&
                          this.state.ind22TaughtCorrectlyAllowPracticeStatus ===
                            "Yes" &&
                          this.state.ind23DemonstratesFluentReadingStatus ===
                            "Yes" &&
                          this.state
                            .ind24AllowReadIndividuallyPairGroupsStatus ===
                            "Yes" &&
                          this.state.ind25FollowsInstructionsInWritingStatus ===
                            "Yes" &&
                          (this.state.ind31AskedHelpfulQuestionsStatus ===
                            "Yes" ||
                            this.state.ind31AskedHelpfulQuestionsStatus ===
                              "No" ||
                            this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Partial" ||
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
                              .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes" ||
                            this.state
                              .ind33CheckWritingSpellingPunctuationStatus ===
                              "No" ||
                            this.state
                              .ind33CheckWritingSpellingPunctuationStatus ===
                              "Partial" ||
                            this.state.ind34CheckedWeDoYouDoStatus === "Yes" ||
                            this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                            this.state.ind34CheckedWeDoYouDoStatus ===
                              "Partial")
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          this.state
                            .ind11TeacherFollowedTeacherGuideInClassStatus ===
                            "Yes" &&
                          this.state.ind12FollowedIDoWeDoYouDoStatus ===
                            "Yes" &&
                          this.state.ind13FollowedContinuityOfLessonStatus ===
                            "Yes" &&
                          this.state.ind14ImplementedAllTaskInTimeStatus ===
                            "Yes" &&
                          this.state.ind15InstructedToUseWorkbookStatus ===
                            "Yes" &&
                          this.state
                            .ind16IndependentReadingOppertunityStatus ===
                            "Yes" &&
                          (this.state.ind21CorrectlyPronouncedStatus ===
                            "Yes" ||
                            this.state.ind21CorrectlyPronouncedStatus ===
                              "No" ||
                            this.state.ind21CorrectlyPronouncedStatus ===
                              "Partial" ||
                            this.state
                              .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Yes" ||
                            this.state
                              .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "No" ||
                            this.state
                              .ind22TaughtCorrectlyAllowPracticeStatus ===
                              "Partial" ||
                            this.state.ind23DemonstratesFluentReadingStatus ===
                              "Yes" ||
                            this.state.ind23DemonstratesFluentReadingStatus ===
                              "No" ||
                            this.state.ind23DemonstratesFluentReadingStatus ===
                              "Partial" ||
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
                              .ind25FollowsInstructionsInWritingStatus ===
                              "Yes" ||
                            this.state
                              .ind25FollowsInstructionsInWritingStatus ===
                              "No" ||
                            this.state
                              .ind25FollowsInstructionsInWritingStatus ===
                              "Partial" ||
                            this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Yes" ||
                            this.state.ind31AskedHelpfulQuestionsStatus ===
                              "No" ||
                            this.state.ind31AskedHelpfulQuestionsStatus ===
                              "Partial" ||
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
                              .ind33CheckWritingSpellingPunctuationStatus ===
                              "Yes" ||
                            this.state
                              .ind33CheckWritingSpellingPunctuationStatus ===
                              "No" ||
                            this.state
                              .ind33CheckWritingSpellingPunctuationStatus ===
                              "Partial" ||
                            this.state.ind34CheckedWeDoYouDoStatus === "Yes" ||
                            this.state.ind34CheckedWeDoYouDoStatus === "No" ||
                            this.state.ind34CheckedWeDoYouDoStatus ===
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
                      {this.state.allBanglaIndicator.map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.indicatorDetail}
                            value={item.indicatorDetail}
                          />
                        );
                      })}
                      <Picker.Item label={"N/A"} value={"N/A"} />
                    </Picker>
                    <Text>২.</Text>
                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      value={this.state.bestPracticeInd2}
                    ></TextInput>
                  </View>
                  {/* <View style={{ flex: 1, padding: 2 }}>
                    <Text>৩.</Text>
                    <Picker
                      style={{
                        height: 40,
                        width: 120,
                      }}
                      selectedValue={this.state.bestPracticeInd3}
                      onValueChange={(value) => {
                        this.setState({ bestPracticeInd3: value });
                      }}
                      itemStyle={{ color: "white" }}
                    >
                      <Picker.Item label={"Select"} value={""} />
                      {this.state.allBanglaIndicator.map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.indicatorDetail}
                            value={item.indicatorDetail}
                          />
                        );
                      })}
                      <Picker.Item label={"N/A"} value={"N/A"} />
                    </Picker>
                    <Text>৩.</Text>
                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      value={this.state.bestPracticeInd3}
                    ></TextInput>
                  </View> */}
                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      প্রায়োরিটি এরিয়ার আলোকে যে বিষয়গুলোতে শিক্ষকের আরো ভালো
                      করার সুযোগ আছে তা উল্লেখ করুন ।
                    </Text>
                    <Text>
                      (Based on the priority areas, mention the areas where the
                      teacher has room to improve.)
                    </Text>
                  </View>
                </View>

                <Text>প্রায়োরিটি এরিয়ার বিষয়:</Text>
                <Text>(Priority Area)</Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>১.</Text>
                    <Picker
                      style={{
                        height: 40,
                        width: 150,
                      }}
                      selectedValue={this.state.coachingSupportInd1}
                      onValueChange={(value) => {
                        this.setState({ coachingSupportInd1: value });
                      }}
                      itemStyle={{ color: "white" }}
                    >
                      <Picker.Item label={"Select"} value={""} />
                      {this.state.allBanglaIndicator.map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.indicatorDetail}
                            value={item.indicatorDetail}
                          />
                        );
                      })}
                      <Picker.Item label={"N/A"} value={"N/A"} />
                    </Picker>
                    <Text>১.</Text>
                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      value={this.state.coachingSupportInd1}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>২.</Text>
                    <Picker
                      style={{
                        height: 40,
                        width: 150,
                      }}
                      selectedValue={this.state.coachingSupportInd2}
                      onValueChange={(value) => {
                        this.setState({ coachingSupportInd2: value });
                      }}
                      itemStyle={{ color: "white" }}
                    >
                      <Picker.Item label={"Select"} value={""} />
                      {this.state.allBanglaIndicator.map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.indicatorDetail}
                            value={item.indicatorDetail}
                          />
                        );
                      })}
                      <Picker.Item label={"N/A"} value={"N/A"} />
                    </Picker>
                    <Text>২.</Text>
                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      value={this.state.coachingSupportInd2}
                    ></TextInput>
                  </View>
                </View>

                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>শিক্ষকের করনীয়:</Text>
                    <Text>( Teacher to do:)</Text>
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
                          coachingSupportTeacher: text,
                        })
                      }
                      value={this.state.coachingSupportTeacher + ""}
                    ></TextInput>
                  </View>
                </View>
                {/* <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="২."
                      keyboardType="default"
                      editable={true}
                      onChangeText={(text) =>
                        this.setState({
                          coachingSupportDetailsInd2: text,
                        })
                      }
                      value={this.state.coachingSupportDetailsInd2 + ""}
                    ></TextInput>
                  </View>
                </View> */}
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>এলএফ-এর করনীয়:</Text>
                    <Text>(LF to do:)</Text>
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
                          coachingSupportLF: text,
                        })
                      }
                      value={this.state.coachingSupportLF + ""}
                    ></TextInput>
                  </View>
                </View>
                {/* <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="২."
                      keyboardType="default"
                      editable={true}
                      onChangeText={(text) =>
                        this.setState({
                          agreedStatement2: text,
                        })
                      }
                      value={this.state.agreedStatement2 + ""}
                    ></TextInput>
                  </View>
                </View> */}
              </View>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>মূল্যায়ন: </Text>
            <Text style={styles.bigRedText}>(Assessment:) </Text>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text style={{ backgroundColor: "green" }}>
                      দৈবচয়ন পদ্ধতিতে ৩ জন শিক্ষার্থী নির্বাচন করুন এবং
                      সংক্ষিপ্ত মূল্যায়ন করুন:
                    </Text>
                    <Text style={{ backgroundColor: "green" }}>
                      (Randomly select 3 students and do a brief evaluation:)
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      মূল্যায়নের জন্য নির্বাচিত বর্ণ, শব্দ অথবা বাক্য এখানে
                      লিখুন:
                    </Text>
                    <Text>
                      (Enter the letter, word or sentence selected for
                      assessment here:)
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      keyboardType="default"
                      editable={true}
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
                    <Text>শিক্ষার্থীর নাম:</Text>
                    <Text>(Student Name:)</Text>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 70, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="default"
                      editable={true}
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
                      editable={true}
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
                      editable={true}
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
                    <Text>সঠিক বলেছে:</Text>
                    <Text>(Correctly said:)</Text>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={true}
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
                      editable={true}
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
                      editable={true}
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
                    <Text>ভুল বলেছে:</Text>
                    <Text>( Wrong said:)</Text>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 30, padding: 5, borderWidth: 1 }}
                      placeholder=""
                      keyboardType="numeric"
                      editable={true}
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
                      editable={true}
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
                      editable={true}
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
                    <Text>মোট সংখ্যা:</Text>
                    <Text>(Total Number:)</Text>
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
            <Text style={styles.bigRedText}>শিক্ষকের অবস্থা</Text>
            <Text style={styles.bigRedText}>(Teacher Status)</Text>
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
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      (Status of teachers according to indicators)
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
