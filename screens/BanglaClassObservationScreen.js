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

const { width, height } = Dimensions.get("window");

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

      ind1PhonemicAwarenessStatus: "",
      ind1PhonemicAwarenessNotes: "",

      ind2LetterIdentificationStatus: "",
      ind2LetterIdentificationNotes: "",

      ind3VocabularyIdentificationStatus: "",
      ind3VocabularyIdentificationNotes: "",

      ind4FluencyIdentificationStatus: "",
      ind4FluencyIdentificationNotes: "",

      ind5ComprehensionStatus: "",
      ind5ComprehensionNotes: "",

      ind6WritingActivitiesStatus: "",
      ind6WritingActivitiesNotes: "",

      ind7IDoWeDoYouDoStatus: "",
      ind7IDoWeDoYouDoNotes: "",

      ind8GroupWorkStatus: "",
      ind8GroupWorkNotes: "",

      ind9TimeOnTaskStatus: "",
      ind9TimeOnTaskNotes: "",

      ind10UseTeachingAidStatus: "",
      ind10UseTeachingAidNotes: "",

      ind11ContinuityOfLessonsStatus: "",
      ind11ContinuityOfLessonsNotes: "",

      ind12AssessmentStatus: "",
      ind12AssessmentNotes: "",

      bestPracticeInd1: "",
      bestPracticeInd2: "",
      bestPracticeInd3: "",

      coachingSupportInd1: "",
      coachingSupportInd2: "",
      coachingSupportDetailsInd1: "",
      coachingSupportDetailsInd2: "",

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

      ind1PhonemicAwarenessStatus: "",
      ind1PhonemicAwarenessNotes: "",

      ind2LetterIdentificationStatus: "",
      ind2LetterIdentificationNotes: "",

      ind3VocabularyIdentificationStatus: "",
      ind3VocabularyIdentificationNotes: "",

      ind4FluencyIdentificationStatus: "",
      ind4FluencyIdentificationNotes: "",

      ind5ComprehensionStatus: "",
      ind5ComprehensionNotes: "",

      ind6WritingActivitiesStatus: "",
      ind6WritingActivitiesNotes: "",

      ind7IDoWeDoYouDoStatus: "",
      ind7IDoWeDoYouDoNotes: "",

      ind8GroupWorkStatus: "",
      ind8GroupWorkNotes: "",

      ind9TimeOnTaskStatus: "",
      ind9TimeOnTaskNotes: "",

      ind10UseTeachingAidStatus: "",
      ind10UseTeachingAidNotes: "",

      ind11ContinuityOfLessonsStatus: "",
      ind11ContinuityOfLessonsNotes: "",

      ind12AssessmentStatus: "",
      ind12AssessmentNotes: "",

      bestPracticeInd1: "",
      bestPracticeInd2: "",
      bestPracticeInd3: "",

      coachingSupportInd1: "",
      coachingSupportInd2: "",
      coachingSupportDetailsInd1: "",
      coachingSupportDetailsInd2: "",

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

  // Get All Bangla Indicator
  getAllBanglaIndicator = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/bangla-indicator",
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
        "http://118.179.80.51:8080/api/v1/bangla-class",
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

      ind1PhonemicAwarenessStatus: this.state.ind1PhonemicAwarenessStatus,
      ind1PhonemicAwarenessNotes: this.state.ind1PhonemicAwarenessNotes,

      ind2LetterIdentificationStatus: this.state.ind2LetterIdentificationStatus,
      ind2LetterIdentificationNotes: this.state.ind2LetterIdentificationNotes,

      ind3VocabularyIdentificationStatus:
        this.state.ind3VocabularyIdentificationStatus,
      ind3VocabularyIdentificationNotes:
        this.state.ind3VocabularyIdentificationNotes,

      ind4FluencyIdentificationStatus:
        this.state.ind4FluencyIdentificationStatus,
      ind4FluencyIdentificationNotes: this.state.ind4FluencyIdentificationNotes,

      ind5ComprehensionStatus: this.state.ind5ComprehensionStatus,
      ind5ComprehensionNotes: this.state.ind5ComprehensionNotes,

      ind6WritingActivitiesStatus: this.state.ind6WritingActivitiesStatus,
      ind6WritingActivitiesNotes: this.state.ind6WritingActivitiesNotes,

      ind7IDoWeDoYouDoStatus: this.state.ind7IDoWeDoYouDoStatus,
      ind7IDoWeDoYouDoNotes: this.state.ind7IDoWeDoYouDoNotes,

      ind8GroupWorkStatus: this.state.ind8GroupWorkStatus,
      ind8GroupWorkNotes: this.state.ind8GroupWorkNotes,

      ind9TimeOnTaskStatus: this.state.ind9TimeOnTaskStatus,
      ind9TimeOnTaskNotes: this.state.ind9TimeOnTaskNotes,

      ind10UseTeachingAidStatus: this.state.ind10UseTeachingAidStatus,
      ind10UseTeachingAidNotes: this.state.ind10UseTeachingAidNotes,

      ind11ContinuityOfLessonsStatus: this.state.ind11ContinuityOfLessonsStatus,
      ind11ContinuityOfLessonsNotes: this.state.ind11ContinuityOfLessonsNotes,

      ind12AssessmentStatus: this.state.ind12AssessmentStatus,
      ind12AssessmentNotes: this.state.ind12AssessmentNotes,

      bestPracticeInd1: this.state.bestPracticeInd1,
      bestPracticeInd2: this.state.bestPracticeInd2,
      bestPracticeInd3: this.state.bestPracticeInd3,

      coachingSupportInd1: this.state.coachingSupportInd1,
      coachingSupportInd2: this.state.coachingSupportInd2,
      coachingSupportDetailsInd1: this.state.coachingSupportDetailsInd1,
      coachingSupportDetailsInd2: this.state.coachingSupportDetailsInd2,

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
          "http://118.179.80.51:8080/api/v1/bangla-class",
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
      ind1PhonemicAwarenessStatus,
      ind2LetterIdentificationStatus,
      ind3VocabularyIdentificationStatus,
      ind4FluencyIdentificationStatus,
      ind5ComprehensionStatus,
      ind6WritingActivitiesStatus,
      ind7IDoWeDoYouDoStatus,
      ind8GroupWorkStatus,
      ind9TimeOnTaskStatus,
      ind10UseTeachingAidStatus,
      ind11ContinuityOfLessonsStatus,
      ind12AssessmentStatus,
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
        </View>

        <ScrollView>
          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>সাধারণ তথ্য:</Text>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ flexDirection: "row", padding: 10 }}>
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
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Text style={{ fontSize: 14 }}>
                    {String(this.state.date.toISOString().slice(0, 10))}
                  </Text>
                  <Button onPress={this.datepicker} title="Select Date" />
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
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 40,
                      width: 150,
                    }}
                    selectedValue={this.state.pickerMonth}
                    onValueChange={(value) => {
                      this.setState({ pickerMonth: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 40,
                      width: 150,
                    }}
                    selectedValue={this.state.pickerYear}
                    onValueChange={(value) => {
                      this.setState({ pickerYear: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
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

              <View style={{ flexDirection: "row", padding: 10 }}>
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
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 40,
                      width: 150,
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
                    <Picker.Item key={""} label={"নির্বাচন করুন"} value={""} />
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
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 40,
                      width: 150,
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
                    <Picker.Item key={""} label={"নির্বাচন করুন"} value={""} />
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

              <View style={{ flexDirection: "row", padding: 10 }}>
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
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 40,
                      width: 150,
                    }}
                    selectedValue={this.state.pickerOffice}
                    onValueChange={(value) => {
                      this.setState({ pickerOffice: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
                    <Picker.Item label={"DFO"} value={"DFO"} />
                    <Picker.Item label={"CFO"} value={"CFO"} />
                    <Picker.Item label={"NFO"} value={"NFO"} />
                    <Picker.Item label={"MFO"} value={"MFO"} />
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
                      প্রোজেক্ট:
                    </Text>
                    <Text
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 40,
                      width: 150,
                    }}
                    selectedValue={this.state.pickerProject}
                    onValueChange={(value) => {
                      this.setState({ pickerProject: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
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
                      this.setState({ visitNo: Number(text) })
                    }
                    value={this.state.visitNo + ""}
                  />
                </View>
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
                      দায়িত্ব প্রাপ্ত এলপিও
                    </Text>
                    <Text
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 40,
                      width: 150,
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
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
                    {this.state.allEmployee
                      .filter((item) => {
                        return item.designation.includes("LPO");
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
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 40,
                      width: 150,
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
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
                <View style={{ flex: 1 }}>
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
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
                    style={{
                      height: 40,
                      width: 150,
                    }}
                    selectedValue={this.state.pickerSchool}
                    onValueChange={(value) => {
                      this.setState({ pickerSchool: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
              </View>

              <View style={{ flexDirection: "row", padding: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    শ্রেণী:
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
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
                    <Picker.Item label={"A"} value={"A"} />
                    <Picker.Item label={"B"} value={"B"} />
                    <Picker.Item label={"C"} value={"C"} />
                    <Picker.Item label={"N/A"} value={"N/A"} />
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
                    শ্রেণি শিক্ষকের নাম:
                  </Text>

                  <Picker
                    style={{
                      height: 40,
                      width: 150,
                    }}
                    selectedValue={this.state.classTeacher}
                    onValueChange={(value) => {
                      this.setState({
                        classTeacher: value,
                      });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
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

                  {/* <TextInput
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
                      this.setState({
                        classTeacher: text,
                      })
                    }
                    value={this.state.classTeacher + ""}
                  /> */}
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
                  <Picker
                    style={{
                      height: 40,
                      width: 200,
                    }}
                    selectedValue={this.state.classTeacherGender}
                    onValueChange={(value) => {
                      this.setState({ classTeacherGender: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
                    <Picker.Item label={"Female"} value={"Female"} />
                    <Picker.Item label={"Male"} value={"Male"} />
                    <Picker.Item label={"Other"} value={"Other"} />
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
                    সংশ্লিষ্ট বিষয়ে প্রশিক্ষণপ্রাপ্ত শিক্ষক পাঠ পরিচালনা করছেন
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
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
                      <Picker.Item label={"Yes"} value={"Yes"} />
                      <Picker.Item label={"No"} value={"No"} />
                    </Picker>
                  </View>
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
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    পাঠ নং/ পাঠের নাম:
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

              <View style={{ flexDirection: "row", padding: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    ভর্তিকৃত শিশুর সংখ্যা:
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text>মেয়ে:</Text>
                      <Text>ছেলে:</Text>
                      <Text>মোট:</Text>
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
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text>মেয়ে:</Text>
                      <Text>ছেলে:</Text>
                      <Text>মোট:</Text>
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
                            presentGirl: Number(text),
                            presentTotal: Number(text) + this.state.presentBoy,
                          })
                        }
                        value={this.state.presentGirl + ""}
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
                            presentBoy: Number(text),
                            presentTotal: Number(text) + this.state.presentGirl,
                          })
                        }
                        value={this.state.presentBoy + ""}
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
                        value={this.state.presentTotal + ""}
                      />
                    </View>
                  </View>
                </View>
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
                      পরিদর্শক এর নাম:
                    </Text>
                    <Text
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>

                  <Picker
                    style={{
                      height: 40,
                      width: 150,
                    }}
                    selectedValue={this.state.pickerVisitor}
                    onValueChange={(value) => {
                      this.setState({ pickerVisitor: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>

                  <Picker
                    style={{
                      height: 40,
                      width: 150,
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
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
                    >
                      *
                    </Text>
                  </View>
                  <Picker
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
                    style={{
                      height: 40,
                      width: 150,
                    }}
                  >
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
                    <Picker.Item label={"CO"} value={"CO"} />
                    <Picker.Item label={"DFO"} value={"DFO"} />
                    <Picker.Item label={"CFO"} value={"CFO"} />
                    <Picker.Item label={"NFO"} value={"NFO"} />
                    <Picker.Item label={"MFO"} value={"MFO"} />
                  </Picker>
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
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>ইনডিকেটর</Text>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5, flexDirection: "row" }}>
                <Text
                  style={{
                    backgroundColor: "green",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  পাঠ চলাকালীন (পাঠ উপস্থাপনের শুরু থেকে দেখতে হবে এবং সার্বিক
                  অংশের সূচকগুলা শেষে দেখতে হবে ।)
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
                      ১. শিক্ষক ধ্বনি সচেতনতার কাজে ব্যবহৃত সকল বর্ণ ও শব্দের
                      ধ্বনি সঠিকভাবে উচ্চারণ করেছেন এবং শিক্ষার্থীদের চর্চা করার
                      সুযোগ দিয়েছেন ।
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
                            height: 40,
                            width: 150,
                          }}
                          onValueChange={(value) => {
                            this.setState({
                              ind1PhonemicAwarenessStatus: value,
                            });

                            // Set teacher status
                            if (
                              (this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" ||
                                this.state.ind1PhonemicAwarenessStatus ===
                                  "N/A") &&
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind4FluencyIdentificationStatus ===
                                "Yes" ||
                                this.state.ind4FluencyIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind6WritingActivitiesStatus ===
                                "Yes" ||
                                this.state.ind6WritingActivitiesStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" &&
                              this.state.ind2LetterIdentificationStatus ===
                                "Yes" &&
                              this.state.ind3VocabularyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind4FluencyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind5ComprehensionStatus === "Yes" &&
                              this.state.ind6WritingActivitiesStatus ===
                                "Yes" &&
                              this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                              this.state.ind8GroupWorkStatus === "Yes" &&
                              this.state.ind9TimeOnTaskStatus === "Yes" &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind12AssessmentStatus === "Yes"
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

                            // Set teacher status
                            // if (
                            //   this.state.ind1PhonemicAwarenessStatus ===
                            //     "Yes" &&
                            //   this.state.ind2LetterIdentificationStatus ===
                            //     "Yes" &&
                            //   this.state.ind4FluencyIdentificationStatus ===
                            //     "Yes" &&
                            //   this.state.ind6WritingActivitiesStatus ===
                            //     "Yes" &&
                            //   this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                            //   this.state.ind8GroupWorkStatus === "Yes" &&
                            //   this.state.ind10UseTeachingAidStatus === "Yes" &&
                            //   this.state.ind11ContinuityOfLessonsStatus ===
                            //     "Yes" &&
                            //   this.state.ind12AssessmentStatus === "Yes"
                            // ) {
                            //   this.setState({
                            //     teacherStatus: "Priority 3",
                            //   });
                            // } else if (
                            //   this.state.ind2LetterIdentificationStatus ===
                            //     "Yes" &&
                            //   this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                            //   this.state.ind8GroupWorkStatus === "Yes" &&
                            //   this.state.ind12AssessmentStatus === "Yes"
                            // ) {
                            //   this.setState({
                            //     teacherStatus: "Priority 2",
                            //   });
                            // } else {
                            //   this.setState({
                            //     teacherStatus: "Priority 1",
                            //   });
                            // }
                            // Set teacher status
                          }}
                          selectedValue={this.state.ind1PhonemicAwarenessStatus}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"নির্বাচন করুন"} value={""} />
                          <Picker.Item label={"হ্যাঁ"} value={"Yes"} />
                          <Picker.Item label={"না"} value={"No"} />
                          <Picker.Item label={"আংশিক"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
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
                            this.setState({ ind1PhonemicAwarenessNotes: text })
                          }
                          value={this.state.ind1PhonemicAwarenessNotes + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                  {ind1PhonemicAwarenessStatus === "No" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          না: বর্ণ (বর্ণ, কারচিহ্ন, যুক্তবর্ণ) পড়া বা বর্ণ ও
                          শব্দাংশ মিলিয়ে শব্দ পড়ার কাজটি শিক্ষক সহায়িকাতে
                          উল্লেখিত নির্দেশনা অনুযায়ী শেখান নি এবং শিক্ষার্থীদের
                          চর্চা করার সুযোগ দেন নি।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind1PhonemicAwarenessStatus === "Partial" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          আংশিক: বর্ণ (বর্ণ, কারচিহ্ন, যুক্তবর্ণ) পড়া বা বর্ণ ও
                          শব্দাংশ মিলিয়ে শব্দ পড়ার কাজে শিক্ষক সহায়িকাতে
                          উল্লেখিত এক বা একাধিক ধাপ নির্দেশনা অনুযায়ী করেন নি
                          অথবা শিক্ষার্থীদের চর্চা করার সুযোগ দেন নি।
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ২. শিক্ষক সঠিকভাবে বর্ণ পড়া বা বর্ণ ও শব্দাংশ মিলিয়ে শব্দ
                      পড়া শিখিয়েছেন এবং শিক্ষার্থীদের চর্চা করার সুযোগ দিয়েছেন ।
                      (প্রযোজ্য ক্ষেত্রে)
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
                            height: 40,
                            width: 150,
                          }}
                          selectedValue={
                            this.state.ind2LetterIdentificationStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind2LetterIdentificationStatus: value,
                            });

                            // Set teacher status
                            if (
                              (this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" ||
                                this.state.ind1PhonemicAwarenessStatus ===
                                  "N/A") &&
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind4FluencyIdentificationStatus ===
                                "Yes" ||
                                this.state.ind4FluencyIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind6WritingActivitiesStatus ===
                                "Yes" ||
                                this.state.ind6WritingActivitiesStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" &&
                              this.state.ind2LetterIdentificationStatus ===
                                "Yes" &&
                              this.state.ind3VocabularyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind4FluencyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind5ComprehensionStatus === "Yes" &&
                              this.state.ind6WritingActivitiesStatus ===
                                "Yes" &&
                              this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                              this.state.ind8GroupWorkStatus === "Yes" &&
                              this.state.ind9TimeOnTaskStatus === "Yes" &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind12AssessmentStatus === "Yes"
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
                          <Picker.Item label={"নির্বাচন করুন"} value={""} />
                          <Picker.Item label={"হ্যাঁ"} value={"Yes"} />
                          <Picker.Item label={"না"} value={"No"} />
                          <Picker.Item label={"আংশিক"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
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
                              ind2LetterIdentificationNotes: text,
                            })
                          }
                          value={this.state.ind2LetterIdentificationNotes + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                  {ind2LetterIdentificationStatus === "No" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          না: বর্ণ (বর্ণ, কারচিহ্ন, যুক্তবর্ণ) পড়া বা বর্ণ ও
                          শব্দাংশ মিলিয়ে শব্দ পড়ার কাজটি শিক্ষক সহায়িকাতে
                          উল্লেখিত নির্দেশনা অনুযায়ী শেখান নি এবং শিক্ষার্থীদের
                          চর্চা করার সুযোগ দেন নি।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind2LetterIdentificationStatus === "Partial" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          আংশিক: বর্ণ (বর্ণ, কারচিহ্ন, যুক্তবর্ণ) পড়া বা বর্ণ ও
                          শব্দাংশ মিলিয়ে শব্দ পড়ার কাজে শিক্ষক সহায়িকাতে
                          উল্লেখিত এক বা একাধিক ধাপ নির্দেশনা অনুযায়ী করেন নি
                          অথবা শিক্ষার্থীদের চর্চা করার সুযোগ দেন নি।
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ৩. শিক্ষক শব্দ ভাণ্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন এবং
                      শিক্ষার্থীদের শব্দগুলো ব্যবহার করে নতুন বাক্য গঠনের সুযোগ
                      দিয়েছেন । (প্রযোজ্য ক্ষেত্রে)
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
                            height: 50,
                            width: 150,
                          }}
                          selectedValue={
                            this.state.ind3VocabularyIdentificationStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind3VocabularyIdentificationStatus: value,
                            });

                            // Set teacher status
                            if (
                              (this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" ||
                                this.state.ind1PhonemicAwarenessStatus ===
                                  "N/A") &&
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind4FluencyIdentificationStatus ===
                                "Yes" ||
                                this.state.ind4FluencyIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind6WritingActivitiesStatus ===
                                "Yes" ||
                                this.state.ind6WritingActivitiesStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" &&
                              this.state.ind2LetterIdentificationStatus ===
                                "Yes" &&
                              this.state.ind3VocabularyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind4FluencyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind5ComprehensionStatus === "Yes" &&
                              this.state.ind6WritingActivitiesStatus ===
                                "Yes" &&
                              this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                              this.state.ind8GroupWorkStatus === "Yes" &&
                              this.state.ind9TimeOnTaskStatus === "Yes" &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind12AssessmentStatus === "Yes"
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
                          <Picker.Item label={"নির্বাচন করুন"} value={""} />
                          <Picker.Item label={"হ্যাঁ"} value={"Yes"} />
                          <Picker.Item label={"না"} value={"No"} />
                          <Picker.Item label={"আংশিক"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
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
                              ind3VocabularyIdentificationNotes: text,
                            })
                          }
                          value={
                            this.state.ind3VocabularyIdentificationNotes + ""
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                  {ind3VocabularyIdentificationStatus === "No" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          না: শিক্ষক শব্দভান্ডারের সংশ্লিষ্ট শব্দগুলো অর্থসহ
                          শেখান নি এবং শব্দগুলো ব্যবহার করে শিক্ষার্থীদের নতুন
                          বাক্য তৈরির সুযোগ দেন নি।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind3VocabularyIdentificationStatus === "Partial" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          আংশিক: শিক্ষক শব্দভান্ডারের সংশ্লিষ্ট শব্দগুলোর যেকোন
                          একটি (প্রযোজ্য ক্ষেত্রে একাধিক) অর্থসহ শেখাননি অথবা
                          শব্দগুলো ব্যবহার করে শিক্ষার্থীদের নতুন বাক্য তৈরির
                          সুযোগ দেন নি।
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ৪. শিক্ষক শিক্ষার্থীদের সাবলীল পঠন (সঠিক গতি , শুদ্ধ
                      উচ্চারণ ও অভিব্যক্তি বজায় রেখে পড়া) উপস্থাপন করে দেখিয়েছেন
                      এবং শিক্ষার্থীদের শব্দ ভাণ্ডারের শব্দগুলো অর্থসহ শিখিয়েছেন
                      এবং শিক্ষার্থীদের শব্দগুলো ব্যবহার করে নতুন বাক্য গঠনের
                      সুযোগ দিয়েছেন । (প্রযোজ্য ক্ষেত্রে)
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
                            this.state.ind4FluencyIdentificationStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind4FluencyIdentificationStatus: value,
                            });

                            // Set teacher status
                            if (
                              (this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" ||
                                this.state.ind1PhonemicAwarenessStatus ===
                                  "N/A") &&
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind4FluencyIdentificationStatus ===
                                "Yes" ||
                                this.state.ind4FluencyIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind6WritingActivitiesStatus ===
                                "Yes" ||
                                this.state.ind6WritingActivitiesStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" &&
                              this.state.ind2LetterIdentificationStatus ===
                                "Yes" &&
                              this.state.ind3VocabularyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind4FluencyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind5ComprehensionStatus === "Yes" &&
                              this.state.ind6WritingActivitiesStatus ===
                                "Yes" &&
                              this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                              this.state.ind8GroupWorkStatus === "Yes" &&
                              this.state.ind9TimeOnTaskStatus === "Yes" &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind12AssessmentStatus === "Yes"
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
                          <Picker.Item label={"নির্বাচন করুন"} value={""} />
                          <Picker.Item label={"হ্যাঁ"} value={"Yes"} />
                          <Picker.Item label={"না"} value={"No"} />
                          <Picker.Item label={"আংশিক"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
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
                              ind4FluencyIdentificationNotes: text,
                            })
                          }
                          value={this.state.ind4FluencyIdentificationNotes + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                  {ind4FluencyIdentificationStatus === "No" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          না: অনুচ্ছেদ পড়ার সময় শিক্ষক সঠিক গতি, শুদ্ধ উচ্চারণ ও
                          ভাবভঙ্গি বজায় রেখে পড়ে দেখাননি এবং শিক্ষার্থীদের চর্চা
                          করার সুযোগ দেন নি।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind4FluencyIdentificationStatus === "Partial" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          আংশিক: অনুচ্ছেদ পড়ার সময় শিক্ষক সঠিক গতি/ শুদ্ধ
                          উচ্চারণ/ ভাবভঙ্গি (প্রযোজ্য ক্ষেত্রে) বজায় রেখে পড়েন
                          নি অথবা শিক্ষার্থীদের চর্চা করার সুযোগ দেন নি।
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ৫. সঠিক উত্তরের জন্য শিক্ষক শিক্ষার্থীদের সহায়ক প্রশ্ন
                      করেছেন বা উত্তর খোঁজার কৌশল শিখিয়েছেন । (প্রযোজ্য
                      ক্ষেত্রে)
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
                            height: 50,
                            width: 150,
                          }}
                          selectedValue={this.state.ind5ComprehensionStatus}
                          onValueChange={(value) => {
                            this.setState({ ind5ComprehensionStatus: value });

                            // Set teacher status
                            if (
                              (this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" ||
                                this.state.ind1PhonemicAwarenessStatus ===
                                  "N/A") &&
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind4FluencyIdentificationStatus ===
                                "Yes" ||
                                this.state.ind4FluencyIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind6WritingActivitiesStatus ===
                                "Yes" ||
                                this.state.ind6WritingActivitiesStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" &&
                              this.state.ind2LetterIdentificationStatus ===
                                "Yes" &&
                              this.state.ind3VocabularyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind4FluencyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind5ComprehensionStatus === "Yes" &&
                              this.state.ind6WritingActivitiesStatus ===
                                "Yes" &&
                              this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                              this.state.ind8GroupWorkStatus === "Yes" &&
                              this.state.ind9TimeOnTaskStatus === "Yes" &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind12AssessmentStatus === "Yes"
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
                          <Picker.Item label={"নির্বাচন করুন"} value={""} />
                          <Picker.Item label={"হ্যাঁ"} value={"Yes"} />
                          <Picker.Item label={"না"} value={"No"} />
                          <Picker.Item label={"আংশিক"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
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
                              ind5ComprehensionNotes: text,
                            })
                          }
                          value={this.state.ind5ComprehensionNotes + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                  {ind5ComprehensionStatus === "No" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          না: শিক্ষক বোধগম্যতায় সঠিক উত্তর খোঁজার জন্য
                          শিক্ষার্থীদের সহায়ক প্রশ্ন করেন নি।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind5ComprehensionStatus === "Partial" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          আংশিক: শিক্ষার্থীরা সঠিক উত্তর খুঁজে না পেলে শিক্ষক এক
                          বা একাধিক প্রশ্নের ক্ষেত্রে সহায়ক প্রশ্ন করে সঠিক
                          উত্তর খুঁজে পেতে সহায়তা করেন নি বা সঠিক উত্তর খোঁজার
                          কৌশল শেখান নি।
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ৬. শিক্ষক নির্দেশনা অনুযায়ী বর্ণ/ যুক্তবর্ণ / শব্দ / বাক্য
                      লেখার কাজ করিয়েছেন । (প্রযোজ্য ক্ষেত্রে)
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
                          selectedValue={this.state.ind6WritingActivitiesStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind6WritingActivitiesStatus: value,
                            });

                            // Set teacher status
                            if (
                              (this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" ||
                                this.state.ind1PhonemicAwarenessStatus ===
                                  "N/A") &&
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind4FluencyIdentificationStatus ===
                                "Yes" ||
                                this.state.ind4FluencyIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind6WritingActivitiesStatus ===
                                "Yes" ||
                                this.state.ind6WritingActivitiesStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" &&
                              this.state.ind2LetterIdentificationStatus ===
                                "Yes" &&
                              this.state.ind3VocabularyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind4FluencyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind5ComprehensionStatus === "Yes" &&
                              this.state.ind6WritingActivitiesStatus ===
                                "Yes" &&
                              this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                              this.state.ind8GroupWorkStatus === "Yes" &&
                              this.state.ind9TimeOnTaskStatus === "Yes" &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind12AssessmentStatus === "Yes"
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
                          <Picker.Item label={"নির্বাচন করুন"} value={""} />
                          <Picker.Item label={"হ্যাঁ"} value={"Yes"} />
                          <Picker.Item label={"না"} value={"No"} />
                          <Picker.Item label={"আংশিক"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
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
                              ind6WritingActivitiesNotes: text,
                            })
                          }
                          value={this.state.ind6WritingActivitiesNotes + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                  {ind6WritingActivitiesStatus === "No" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          না: শিক্ষক সহায়িকার সঠিক নির্দেশনা অনুযায়ী শিক্ষক
                          বর্ণ/ যুক্তবর্ণ /শব্দ/ বাক্য লেখার কাজ করাননি।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind6WritingActivitiesStatus === "Partial" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          আংশিক: শিক্ষক সহায়িকার নির্দেশনা অনুযায়ী এক বা একাধিক
                          ধাপ অনুসরণ ব্যাতিরেকে শিক্ষক বর্ণ/ যুক্তবর্ণ /শব্দ/
                          বাক্য লেখার কাজ করিয়েছেন।
                        </Text>
                      </Card>
                    </View>
                  )}
                </Card>

                <View style={{ padding: 5, flexDirection: "row" }}>
                  <Text
                    style={{
                      backgroundColor: "green",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    সার্বিক (সমগ্র পাঠ উপস্থাপন সংশ্লিষ্ট এবং সম্পূর্ণ পাঠ
                    উপস্থাপন শেষে পূরণ করেতে হবে)
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ৭. শিক্ষক শিখন-শেখানো কার্যক্রমে আমি করি-আমরা করি-তুমি কর
                      পদ্ধতিটি ব্যবহার করেছেন । (প্রযোজ্য ক্ষেত্রে)
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
                            height: 50,
                            width: 150,
                          }}
                          selectedValue={this.state.ind7IDoWeDoYouDoStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind7IDoWeDoYouDoStatus: value,
                            });

                            // Set teacher status
                            if (
                              (this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" ||
                                this.state.ind1PhonemicAwarenessStatus ===
                                  "N/A") &&
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind4FluencyIdentificationStatus ===
                                "Yes" ||
                                this.state.ind4FluencyIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind6WritingActivitiesStatus ===
                                "Yes" ||
                                this.state.ind6WritingActivitiesStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" &&
                              this.state.ind2LetterIdentificationStatus ===
                                "Yes" &&
                              this.state.ind3VocabularyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind4FluencyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind5ComprehensionStatus === "Yes" &&
                              this.state.ind6WritingActivitiesStatus ===
                                "Yes" &&
                              this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                              this.state.ind8GroupWorkStatus === "Yes" &&
                              this.state.ind9TimeOnTaskStatus === "Yes" &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind12AssessmentStatus === "Yes"
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
                          <Picker.Item label={"নির্বাচন করুন"} value={""} />
                          <Picker.Item label={"হ্যাঁ"} value={"Yes"} />
                          <Picker.Item label={"না"} value={"No"} />
                          <Picker.Item label={"আংশিক"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
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
                              ind7IDoWeDoYouDoNotes: text,
                            })
                          }
                          value={this.state.ind7IDoWeDoYouDoNotes + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                  {ind7IDoWeDoYouDoStatus === "No" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          না: শিখন-শেখানো কার্যক্রমে রুম টু রিড প্রদত্ত
                          নির্দেশনা অনুযায়ী ‘আমি করি-আমরা করি-তুমি কর’ পদ্ধতি
                          অনুসরণ করেন নি।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind7IDoWeDoYouDoStatus === "Partial" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          আংশিক: শিখন-শেখানো কার্যক্রমে রুম টু রিড প্রদত্ত
                          নির্দেশনায় উল্লেখিত এক বা একাধিক কাজে/ধাপে ‘আমি
                          করি-আমরা করি-তুমি কর’ পদ্ধতি অনুসরণ করেন নি।
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ৮. শিক্ষক শিক্ষার্থীদের এককভাবে বা জুটিতে বা দলে পড়ার
                      সুযোগ দিয়েছেন । (প্রযোজ্য ক্ষেত্রে)
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
                            height: 50,
                            width: 150,
                          }}
                          selectedValue={this.state.ind8GroupWorkStatus}
                          onValueChange={(value) => {
                            this.setState({ ind8GroupWorkStatus: value });

                            // Set teacher status
                            if (
                              (this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" ||
                                this.state.ind1PhonemicAwarenessStatus ===
                                  "N/A") &&
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind4FluencyIdentificationStatus ===
                                "Yes" ||
                                this.state.ind4FluencyIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind6WritingActivitiesStatus ===
                                "Yes" ||
                                this.state.ind6WritingActivitiesStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" &&
                              this.state.ind2LetterIdentificationStatus ===
                                "Yes" &&
                              this.state.ind3VocabularyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind4FluencyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind5ComprehensionStatus === "Yes" &&
                              this.state.ind6WritingActivitiesStatus ===
                                "Yes" &&
                              this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                              this.state.ind8GroupWorkStatus === "Yes" &&
                              this.state.ind9TimeOnTaskStatus === "Yes" &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind12AssessmentStatus === "Yes"
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
                          <Picker.Item label={"নির্বাচন করুন"} value={""} />
                          <Picker.Item label={"হ্যাঁ"} value={"Yes"} />
                          <Picker.Item label={"না"} value={"No"} />
                          <Picker.Item label={"আংশিক"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
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
                              ind8GroupWorkNotes: text,
                            })
                          }
                          value={this.state.ind8GroupWorkNotes + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                  {ind8GroupWorkStatus === "No" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          না: শিক্ষক শিক্ষার্থীদের ‘পড়ি লিখি শিখি’ ওয়ার্কবুক ও
                          ‘আমার বাংলা বই’ -এর নির্ধারিত পড়ার অংশে নির্দেশনা
                          অনুযায়ী বর্ণ/ শব্দ/ বাক্য এককভাবে বা জুটিতে বা দলে
                          পড়ার সুযোগ দেননি।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind8GroupWorkStatus === "Partial" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          আংশিক: শিক্ষক শিক্ষার্থীদের ‘পড়ি লিখি শিখি’ ওয়ার্কবুক
                          অথবা ‘আমার বাংলা বই’ -এর নির্ধারিত পড়ার অংশে যেকোন এক
                          বা একাধিক কাজে (বর্ণ/ শব্দ/ বাক্য) নির্দেশনা অনুযায়ী
                          এককভাবে বা জুটিতে বা দলে পড়ার সুযোগ দেননি।
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ৯. শিক্ষক নির্ধারিত সময়ের মধ্যে পাঠের সকল কাজ
                      ধারাবাহিকভাবে সম্পন্ন করেছেন ।
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
                            height: 50,
                            width: 150,
                          }}
                          selectedValue={this.state.ind9TimeOnTaskStatus}
                          onValueChange={(value) => {
                            this.setState({ ind9TimeOnTaskStatus: value });

                            // Set teacher status
                            if (
                              (this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" ||
                                this.state.ind1PhonemicAwarenessStatus ===
                                  "N/A") &&
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind4FluencyIdentificationStatus ===
                                "Yes" ||
                                this.state.ind4FluencyIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind6WritingActivitiesStatus ===
                                "Yes" ||
                                this.state.ind6WritingActivitiesStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" &&
                              this.state.ind2LetterIdentificationStatus ===
                                "Yes" &&
                              this.state.ind3VocabularyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind4FluencyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind5ComprehensionStatus === "Yes" &&
                              this.state.ind6WritingActivitiesStatus ===
                                "Yes" &&
                              this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                              this.state.ind8GroupWorkStatus === "Yes" &&
                              this.state.ind9TimeOnTaskStatus === "Yes" &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind12AssessmentStatus === "Yes"
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
                          <Picker.Item label={"নির্বাচন করুন"} value={""} />
                          <Picker.Item label={"হ্যাঁ"} value={"Yes"} />
                          <Picker.Item label={"না"} value={"No"} />
                          <Picker.Item label={"আংশিক"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
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
                              ind9TimeOnTaskNotes: text,
                            })
                          }
                          value={this.state.ind9TimeOnTaskNotes + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                  {ind9TimeOnTaskStatus === "No" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          না: শিক্ষক রুম টু রিড প্রদত্ত নির্দেশনা অনুযায়ী
                          নির্ধারিত সময়ে সবগুলো কাজ ধারাবাহিকভাবে করেন নি।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind9TimeOnTaskStatus === "Partial" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          আংশিক: শিক্ষক রুম টু রিড প্রদত্ত নির্দেশনা অনুযায়ী
                          নির্ধারিত সময়ে সবগুলো কাজ করেননি অথবা ধারাবাহিকভাবে
                          সবগুলো কাজ করেন নি।
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ১০. শিক্ষক পাঠের শিখন-শেখানো কাজে সহায়ক উপকরণ (রুম টু রিড
                      কর্তৃক প্রদত্ত) ব্যবহার করেছেন ।
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
                          selectedValue={this.state.ind10UseTeachingAidStatus}
                          onValueChange={(value) => {
                            this.setState({ ind10UseTeachingAidStatus: value });

                            // Set teacher status
                            if (
                              (this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" ||
                                this.state.ind1PhonemicAwarenessStatus ===
                                  "N/A") &&
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind4FluencyIdentificationStatus ===
                                "Yes" ||
                                this.state.ind4FluencyIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind6WritingActivitiesStatus ===
                                "Yes" ||
                                this.state.ind6WritingActivitiesStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" &&
                              this.state.ind2LetterIdentificationStatus ===
                                "Yes" &&
                              this.state.ind3VocabularyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind4FluencyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind5ComprehensionStatus === "Yes" &&
                              this.state.ind6WritingActivitiesStatus ===
                                "Yes" &&
                              this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                              this.state.ind8GroupWorkStatus === "Yes" &&
                              this.state.ind9TimeOnTaskStatus === "Yes" &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind12AssessmentStatus === "Yes"
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
                          <Picker.Item label={"নির্বাচন করুন"} value={""} />
                          <Picker.Item label={"হ্যাঁ"} value={"Yes"} />
                          <Picker.Item label={"না"} value={"No"} />
                          <Picker.Item label={"আংশিক"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
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
                              ind10UseTeachingAidNotes: text,
                            })
                          }
                          value={this.state.ind10UseTeachingAidNotes + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                  {ind10UseTeachingAidStatus === "No" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          না: শিক্ষক পাঠ চলাকালীন রুম টু রিড প্রদত্ত নির্দেশনা
                          অনুযায়ী কোন সহায়ক উপকরণ ব্যবহার করেন নি।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind10UseTeachingAidStatus === "Partial" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          আংশিক: শিক্ষক পাঠ নির্দেশনা অনুযায়ী রুম টু রিড প্রদত্ত
                          যে যে সহায়ক উপকরণ ব্যবহারের কথা ছিল তার এক বা একাধিক
                          উপকরণ ব্যবহার করেন নি। অথবা সকল সহায়ক উপকরণ ব্যবহার
                          করেছেন তবে সঠিক সময়ে ব্যবহার করেন নি।
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ১১. শিক্ষার্থীদের বই, ওয়ার্কবুকের কাজ নিশ্চিত করে যে গত
                      ভিজিটের পর পাঠের ধারাবাহিকতা অনুসারে অগ্রগতি হয়েছে ।
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
                            this.state.ind11ContinuityOfLessonsStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind11ContinuityOfLessonsStatus: value,
                            });

                            // Set teacher status
                            if (
                              (this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" ||
                                this.state.ind1PhonemicAwarenessStatus ===
                                  "N/A") &&
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind4FluencyIdentificationStatus ===
                                "Yes" ||
                                this.state.ind4FluencyIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind6WritingActivitiesStatus ===
                                "Yes" ||
                                this.state.ind6WritingActivitiesStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" &&
                              this.state.ind2LetterIdentificationStatus ===
                                "Yes" &&
                              this.state.ind3VocabularyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind4FluencyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind5ComprehensionStatus === "Yes" &&
                              this.state.ind6WritingActivitiesStatus ===
                                "Yes" &&
                              this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                              this.state.ind8GroupWorkStatus === "Yes" &&
                              this.state.ind9TimeOnTaskStatus === "Yes" &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind12AssessmentStatus === "Yes"
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
                          <Picker.Item label={"নির্বাচন করুন"} value={""} />
                          <Picker.Item label={"হ্যাঁ"} value={"Yes"} />
                          <Picker.Item label={"না"} value={"No"} />
                          <Picker.Item label={"আংশিক"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
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
                              ind11ContinuityOfLessonsNotes: text,
                            })
                          }
                          value={this.state.ind11ContinuityOfLessonsNotes + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                  {ind11ContinuityOfLessonsStatus === "No" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          না: বেশিরভাগ শিক্ষার্থীদের বই, ওয়ার্কবুক এবং এলএফ-এর
                          গত পর্যবেক্ষণ ফরম দেখলে বোঝা যায় যে গতবারের পরিদর্শনের
                          পর থেকে কোন পাঠেরই ধারাবাহিকতা অনুসরণ করা হয় নি।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind11ContinuityOfLessonsStatus === "Partial" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          আংশিক: বেশিরভাগ শিক্ষার্থীদের বই, ওয়ার্কবুক এবং
                          এলএফ-এর গত পর্যবেক্ষণ ফরম দেখলে বোঝা যায় যে গত
                          পরিদর্শনের পর থেকে মাঝের এক বা একাধিক পাঠ পরিচালিত হয়
                          নি।
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
                  <Card style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                    <Text>
                      ১২. শিক্ষক ছেলে-মেয়ে, বিশেষ চাহিদা সম্পন্ন ও পিছিয়ে পড়া
                      শিক্ষার্থীদেরকে পাঠের কাজে এবং মূল্যায়নে অংশগ্রহণ করিয়েছেন
                      ।
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
                            height: 50,
                            width: 150,
                          }}
                          selectedValue={this.state.ind12AssessmentStatus}
                          onValueChange={(value) => {
                            this.setState({ ind12AssessmentStatus: value });

                            // Set teacher status
                            if (
                              (this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" ||
                                this.state.ind1PhonemicAwarenessStatus ===
                                  "N/A") &&
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind4FluencyIdentificationStatus ===
                                "Yes" ||
                                this.state.ind4FluencyIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind6WritingActivitiesStatus ===
                                "Yes" ||
                                this.state.ind6WritingActivitiesStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.ind1PhonemicAwarenessStatus ===
                                "Yes" &&
                              this.state.ind2LetterIdentificationStatus ===
                                "Yes" &&
                              this.state.ind3VocabularyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind4FluencyIdentificationStatus ===
                                "Yes" &&
                              this.state.ind5ComprehensionStatus === "Yes" &&
                              this.state.ind6WritingActivitiesStatus ===
                                "Yes" &&
                              this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                              this.state.ind8GroupWorkStatus === "Yes" &&
                              this.state.ind9TimeOnTaskStatus === "Yes" &&
                              this.state.ind10UseTeachingAidStatus === "Yes" &&
                              this.state.ind11ContinuityOfLessonsStatus ===
                                "Yes" &&
                              this.state.ind12AssessmentStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind2LetterIdentificationStatus ===
                                "Yes" ||
                                this.state.ind2LetterIdentificationStatus ===
                                  "N/A") &&
                              (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                                this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                              (this.state.ind8GroupWorkStatus === "Yes" ||
                                this.state.ind8GroupWorkStatus === "N/A") &&
                              this.state.ind12AssessmentStatus === "Yes"
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
                          <Picker.Item label={"নির্বাচন করুন"} value={""} />
                          <Picker.Item label={"হ্যাঁ"} value={"Yes"} />
                          <Picker.Item label={"না"} value={"No"} />
                          <Picker.Item label={"আংশিক"} value={"Partial"} />
                          <Picker.Item label={"N/A"} value={"N/A"} />
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
                              ind12AssessmentNotes: text,
                            })
                          }
                          value={this.state.ind12AssessmentNotes + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                  {ind12AssessmentStatus === "No" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          না: শিক্ষক ছেলে-মেয়ে, বিশেষ চাহিদাসম্পন্ন ও পিছিয়ে পড়া
                          শিক্ষার্থীসহ সকল শিক্ষার্থীদের পাঠের কাজে এবং
                          মূল্যায়নে প্রতিনিধিত্বমূলক অংশগ্রহণ নিশ্চিত করেন নি।
                        </Text>
                      </Card>
                    </View>
                  )}
                  {ind12AssessmentStatus === "Partial" && (
                    <View>
                      <Card
                        style={{
                          padding: 5,
                          margin: 5,
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          আংশিক: শিক্ষক ছেলে-মেয়ে অথবা বিশেষ চাহিদা সম্পন্ন
                          (প্রযোজ্য ক্ষেত্রে) অথবা পিছিয়ে পড়া শিক্ষার্থী দের (যে
                          কোন একদল) পাঠের কাজে এবং মূল্যায়নে প্রতিনিধিত্বমূলক
                          অংশগ্রহণ নিশ্চিত করেন নি।
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
                শ্রেণি শিক্ষকের সাথে আলোচনার জন্য গুরুত্বপূর্ণ কিছু বিষয় ঃ
              </Text>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      শিক্ষক ভালো করেছেন এমন ২/৩ টি সূচক ( অগ্রাধিকার এরিয়ায়র
                      নম্বর ) উল্লেখ করুন ।
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
                          (this.state.ind1PhonemicAwarenessStatus === "Yes" ||
                            this.state.ind1PhonemicAwarenessStatus === "N/A") &&
                          (this.state.ind2LetterIdentificationStatus ===
                            "Yes" ||
                            this.state.ind2LetterIdentificationStatus ===
                              "N/A") &&
                          (this.state.ind4FluencyIdentificationStatus ===
                            "Yes" ||
                            this.state.ind4FluencyIdentificationStatus ===
                              "N/A") &&
                          (this.state.ind6WritingActivitiesStatus === "Yes" ||
                            this.state.ind6WritingActivitiesStatus === "N/A") &&
                          (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                            this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                          (this.state.ind8GroupWorkStatus === "Yes" ||
                            this.state.ind8GroupWorkStatus === "N/A") &&
                          this.state.ind10UseTeachingAidStatus === "Yes" &&
                          this.state.ind11ContinuityOfLessonsStatus === "Yes" &&
                          this.state.ind12AssessmentStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          this.state.ind1PhonemicAwarenessStatus === "Yes" &&
                          this.state.ind2LetterIdentificationStatus === "Yes" &&
                          this.state.ind3VocabularyIdentificationStatus ===
                            "Yes" &&
                          this.state.ind4FluencyIdentificationStatus ===
                            "Yes" &&
                          this.state.ind5ComprehensionStatus === "Yes" &&
                          this.state.ind6WritingActivitiesStatus === "Yes" &&
                          this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                          this.state.ind8GroupWorkStatus === "Yes" &&
                          this.state.ind9TimeOnTaskStatus === "Yes" &&
                          this.state.ind10UseTeachingAidStatus === "Yes" &&
                          this.state.ind11ContinuityOfLessonsStatus === "Yes" &&
                          this.state.ind12AssessmentStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          (this.state.ind2LetterIdentificationStatus ===
                            "Yes" ||
                            this.state.ind2LetterIdentificationStatus ===
                              "N/A") &&
                          (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                            this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                          (this.state.ind8GroupWorkStatus === "Yes" ||
                            this.state.ind8GroupWorkStatus === "N/A") &&
                          this.state.ind12AssessmentStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else {
                          this.setState({
                            teacherStatus: "Priority 1",
                          });
                        }
                        // Set teacher status// Set teacher status
                        if (
                          (this.state.ind1PhonemicAwarenessStatus === "Yes" ||
                            this.state.ind1PhonemicAwarenessStatus === "N/A") &&
                          (this.state.ind2LetterIdentificationStatus ===
                            "Yes" ||
                            this.state.ind2LetterIdentificationStatus ===
                              "N/A") &&
                          (this.state.ind4FluencyIdentificationStatus ===
                            "Yes" ||
                            this.state.ind4FluencyIdentificationStatus ===
                              "N/A") &&
                          (this.state.ind6WritingActivitiesStatus === "Yes" ||
                            this.state.ind6WritingActivitiesStatus === "N/A") &&
                          (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                            this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                          (this.state.ind8GroupWorkStatus === "Yes" ||
                            this.state.ind8GroupWorkStatus === "N/A") &&
                          this.state.ind10UseTeachingAidStatus === "Yes" &&
                          this.state.ind11ContinuityOfLessonsStatus === "Yes" &&
                          this.state.ind12AssessmentStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          this.state.ind1PhonemicAwarenessStatus === "Yes" &&
                          this.state.ind2LetterIdentificationStatus === "Yes" &&
                          this.state.ind3VocabularyIdentificationStatus ===
                            "Yes" &&
                          this.state.ind4FluencyIdentificationStatus ===
                            "Yes" &&
                          this.state.ind5ComprehensionStatus === "Yes" &&
                          this.state.ind6WritingActivitiesStatus === "Yes" &&
                          this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                          this.state.ind8GroupWorkStatus === "Yes" &&
                          this.state.ind9TimeOnTaskStatus === "Yes" &&
                          this.state.ind10UseTeachingAidStatus === "Yes" &&
                          this.state.ind11ContinuityOfLessonsStatus === "Yes" &&
                          this.state.ind12AssessmentStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          (this.state.ind2LetterIdentificationStatus ===
                            "Yes" ||
                            this.state.ind2LetterIdentificationStatus ===
                              "N/A") &&
                          (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                            this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                          (this.state.ind8GroupWorkStatus === "Yes" ||
                            this.state.ind8GroupWorkStatus === "N/A") &&
                          this.state.ind12AssessmentStatus === "Yes"
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
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
                          (this.state.ind1PhonemicAwarenessStatus === "Yes" ||
                            this.state.ind1PhonemicAwarenessStatus === "N/A") &&
                          (this.state.ind2LetterIdentificationStatus ===
                            "Yes" ||
                            this.state.ind2LetterIdentificationStatus ===
                              "N/A") &&
                          (this.state.ind4FluencyIdentificationStatus ===
                            "Yes" ||
                            this.state.ind4FluencyIdentificationStatus ===
                              "N/A") &&
                          (this.state.ind6WritingActivitiesStatus === "Yes" ||
                            this.state.ind6WritingActivitiesStatus === "N/A") &&
                          (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                            this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                          (this.state.ind8GroupWorkStatus === "Yes" ||
                            this.state.ind8GroupWorkStatus === "N/A") &&
                          this.state.ind10UseTeachingAidStatus === "Yes" &&
                          this.state.ind11ContinuityOfLessonsStatus === "Yes" &&
                          this.state.ind12AssessmentStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          this.state.ind1PhonemicAwarenessStatus === "Yes" &&
                          this.state.ind2LetterIdentificationStatus === "Yes" &&
                          this.state.ind3VocabularyIdentificationStatus ===
                            "Yes" &&
                          this.state.ind4FluencyIdentificationStatus ===
                            "Yes" &&
                          this.state.ind5ComprehensionStatus === "Yes" &&
                          this.state.ind6WritingActivitiesStatus === "Yes" &&
                          this.state.ind7IDoWeDoYouDoStatus === "Yes" &&
                          this.state.ind8GroupWorkStatus === "Yes" &&
                          this.state.ind9TimeOnTaskStatus === "Yes" &&
                          this.state.ind10UseTeachingAidStatus === "Yes" &&
                          this.state.ind11ContinuityOfLessonsStatus === "Yes" &&
                          this.state.ind12AssessmentStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          (this.state.ind2LetterIdentificationStatus ===
                            "Yes" ||
                            this.state.ind2LetterIdentificationStatus ===
                              "N/A") &&
                          (this.state.ind7IDoWeDoYouDoStatus === "Yes" ||
                            this.state.ind7IDoWeDoYouDoStatus === "N/A") &&
                          (this.state.ind8GroupWorkStatus === "Yes" ||
                            this.state.ind8GroupWorkStatus === "N/A") &&
                          this.state.ind12AssessmentStatus === "Yes"
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
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>৩.</Text>
                    <Picker
                      style={{
                        height: 40,
                        width: 150,
                      }}
                      selectedValue={this.state.bestPracticeInd3}
                      onValueChange={(value) => {
                        this.setState({ bestPracticeInd3: value });
                      }}
                      itemStyle={{ color: "white" }}
                    >
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      অগ্রাধিকারভিত্তিতে শিক্ষককে তার নিজস্ব উন্নয়নের জন্য যে
                      ১/২ টি সূচক (এরিয়ার নম্বর) চিহ্নিত করেছেন তা উল্লেখ করুন
                      এবং তিনি তার উন্নয়নে কিভাবে এটি করবেন সেটি উল্লেখ করুন ।
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
                      selectedValue={this.state.coachingSupportInd1}
                      onValueChange={(value) => {
                        this.setState({ coachingSupportInd1: value });
                      }}
                      itemStyle={{ color: "white" }}
                    >
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
                    <Text>কিভাবে করবেন ঃ</Text>
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
                          coachingSupportDetailsInd1: text,
                        })
                      }
                      value={this.state.coachingSupportDetailsInd1 + ""}
                    ></TextInput>
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
                          coachingSupportDetailsInd2: text,
                        })
                      }
                      value={this.state.coachingSupportDetailsInd2 + ""}
                    ></TextInput>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      যে কাজ গুলো করার জন্য শ্রেণি শিক্ষক একমত হয়েছেন সেটি/
                      সেগুলো উল্লেখ করুন ।
                    </Text>
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
                          agreedStatement1: text,
                        })
                      }
                      value={this.state.agreedStatement1 + ""}
                    ></TextInput>
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
            <Text style={styles.bigRedText}>মূল্যায়নঃ </Text>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text style={{ backgroundColor: "green" }}>
                      দৈবচয়ন পদ্ধতিতে ৫ জন শিক্ষার্থী নির্বাচন করুন এবং
                      সংক্ষিপ্ত মূল্যায়ন করুনঃ
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      মূল্যায়নের জন্য নির্বাচিত বর্ণ, শব্দ অথবা বাক্য এখানে
                      লিখুনঃ
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
                    <Text>শিক্ষার্থীর নামঃ</Text>
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
                  <View style={{ flex: 1, padding: 2 }}>
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
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>সঠিক বলেছেঃ</Text>
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
                  <View style={{ flex: 1, padding: 2 }}>
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
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>ভুল বলেছেঃ</Text>
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
                  <View style={{ flex: 1, padding: 2 }}>
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
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>মোট সংখ্যাঃ</Text>
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
                  <View style={{ flex: 1, padding: 2 }}>
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
                  </View>
                </View>
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
