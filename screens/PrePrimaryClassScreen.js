//  Author: Mohammad Jihad Hossain
//  Create Date: 16/02/2023
//  Modify Date: 16/02/2023
//  Description: PrePrimaryClass observation component

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

export default class PrePrimaryClassScreen extends React.Component {
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
      teachingTopic1: "",
      teachingTopic2: "",
      teachingTopic3: "",
      teachingMonth: "",
      teachingWeek: "",
      teachingDay: "",
      studentBoy: 0,
      studentGirl: 0,
      studentSpecial: 0,
      studentTotal: 0,

      note: "",

      // General data

      lastFollowupTopic1: "",
      lastFollowupTopic2: "",
      lastFollowupTopic3: "",

      ind11UsingBigbookStatus: "",
      ind11UsingBigbookNotes: "",

      ind12PictureDiscussionStatus: "",
      ind12PictureDiscussionNotes: "",

      ind13FollowedInstructionStatus: "",
      ind13FollowedInstructionNotes: "",

      ind21UsingTalkingChartStatus: "",
      ind21UsingTalkingChartNotes: "",

      ind22UsingPictureElementStatus: "",
      ind22UsingPictureElementNotes: "",

      ind23FollowedInstructionStepStatus: "",
      ind23FollowedInstructionStepNotes: "",

      ind31LanguageGameStatus: "",
      ind31LanguageGameNotes: "",

      ind32LanguageGameIWeYouStatus: "",
      ind32LanguageGameIWeYouNotes: "",

      ind33LanguageGameExtraStatus: "",
      ind33LanguageGameExtraNotes: "",

      bestPracticeInd1: "",
      bestPracticeInd2: "",
      bestPracticeInd3: "",

      coachingSupportInd1: "",
      coachingSupportInd2: "",
      coachingSupportDetailsInd1: "",
      coachingSupportDetailsInd2: "",

      agreedStatement1: "",
      agreedStatement2: "",

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
    this.getAllPreprimaryIndicator();
    this.getAllPreprimaryClassObservation();
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
      teachingTopic1: "",
      teachingTopic2: "",
      teachingTopic3: "",
      teachingMonth: "",
      teachingWeek: "",
      teachingDay: "",
      studentBoy: 0,
      studentGirl: 0,
      studentSpecial: 0,
      studentTotal: 0,

      note: "",

      // General data

      lastFollowupTopic1: "",
      lastFollowupTopic2: "",
      lastFollowupTopic3: "",

      ind11UsingBigbookStatus: "",
      ind11UsingBigbookNotes: "",

      ind12PictureDiscussionStatus: "",
      ind12PictureDiscussionNotes: "",

      ind13FollowedInstructionStatus: "",
      ind13FollowedInstructionNotes: "",

      ind21UsingTalkingChartStatus: "",
      ind21UsingTalkingChartNotes: "",

      ind22UsingPictureElementStatus: "",
      ind22UsingPictureElementNotes: "",

      ind23FollowedInstructionStepStatus: "",
      ind23FollowedInstructionStepNotes: "",

      ind31LanguageGameStatus: "",
      ind31LanguageGameNotes: "",

      ind32LanguageGameIWeYouStatus: "",
      ind32LanguageGameIWeYouNotes: "",

      ind33LanguageGameExtraStatus: "",
      ind33LanguageGameExtraNotes: "",

      bestPracticeInd1: "",
      bestPracticeInd2: "",
      bestPracticeInd3: "",

      coachingSupportInd1: "",
      coachingSupportInd2: "",
      coachingSupportDetailsInd1: "",
      coachingSupportDetailsInd2: "",

      agreedStatement1: "",
      agreedStatement2: "",

      teacherStatus: "",

      dateError: "",
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
        "http://118.179.80.51:8080/api/v1/preprimary",
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

      contentName1: this.state.teachingTopic1,
      contentName2: this.state.teachingTopic2,
      contentName3: this.state.teachingTopic3,

      periodMonth: this.state.teachingMonth,
      periodWeek: this.state.teachingWeek,
      periodDay: this.state.teachingDay,

      totalPresentStudent: this.state.studentTotal,
      totalPresentGirl: this.state.studentGirl,
      totalPresentBoy: this.state.studentBoy,
      totalPresentSpecial: this.state.studentSpecial,

      note: this.state.note,

      lastFollowupTopic1: this.state.lastFollowupTopic1,
      lastFollowupTopic2: this.state.lastFollowupTopic2,
      lastFollowupTopic3: this.state.lastFollowupTopic3,

      ind11UsingBigbookStatus: this.state.ind11UsingBigbookStatus,
      ind11UsingBigbookNotes: this.state.ind11UsingBigbookNotes,

      ind12PictureDiscussionStatus: this.state.ind12PictureDiscussionStatus,
      ind12PictureDiscussionNotes: this.state.ind12PictureDiscussionNotes,

      ind13FollowedInstructionStatus: this.state.ind13FollowedInstructionStatus,
      ind13FollowedInstructionNotes: this.state.ind13FollowedInstructionNotes,

      ind21UsingTalkingChartStatus: this.state.ind21UsingTalkingChartStatus,
      ind21UsingTalkingChartNotes: this.state.ind21UsingTalkingChartNotes,

      ind22UsingPictureElementStatus: this.state.ind22UsingPictureElementStatus,
      ind22UsingPictureElementNotes: this.state.ind22UsingPictureElementNotes,

      ind23FollowedInstructionStepStatus:
        this.state.ind23FollowedInstructionStepStatus,
      ind23FollowedInstructionStepNotes:
        this.state.ind23FollowedInstructionStepNotes,

      ind31LanguageGameStatus: this.state.ind31LanguageGameStatus,
      ind31LanguageGameNotes: this.state.ind31LanguageGameNotes,

      ind32LanguageGameIWeYouStatus: this.state.ind32LanguageGameIWeYouStatus,
      ind32LanguageGameIWeYouNotes: this.state.ind32LanguageGameIWeYouNotes,

      ind33LanguageGameExtraStatus: this.state.ind33LanguageGameExtraStatus,
      ind33LanguageGameExtraNotes: this.state.ind33LanguageGameExtraNotes,

      bestPracticeInd1: this.state.bestPracticeInd1,
      bestPracticeInd2: this.state.bestPracticeInd2,
      bestPracticeInd3: this.state.bestPracticeInd3,

      coachingSupportInd1: this.state.coachingSupportInd1,
      coachingSupportInd2: this.state.coachingSupportInd2,
      coachingSupportDetailsInd1: this.state.coachingSupportDetailsInd1,
      coachingSupportDetailsInd2: this.state.coachingSupportDetailsInd2,

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
    } else if (this.state.duplicatePreprimaryClassObservationData.length > 0) {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Duplicate Preprimary Class Data !!");
      return;
    } else {
      // Set error message empty
      this.setState({ dateError: "" });

      // Send data to API
      try {
        let response = await fetch(
          "http://118.179.80.51:8080/api/v1/preprimary",
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

  render() {
    // For Datepicker
    const { show, date, mode, startTime, endTime } = this.state;
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
            শ্রেণিকক্ষ কার্যক্রম ( গল্প পড়া ও ভাষার কাজ) পর্যবেক্ষণ ফরম
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
                        return item.lf == this.state.pickerLF.employeeRegId;
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
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    শ্রেণি:
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
                    বিষয়/ পাঠের নাম:
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    ১:
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
                      this.setState({ teachingTopic1: text })
                    }
                    value={this.state.teachingTopic1 + ""}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    ২:
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
                      this.setState({ teachingTopic2: text })
                    }
                    value={this.state.teachingTopic2 + ""}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    ৩:
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
                      this.setState({ teachingTopic3: text })
                    }
                    value={this.state.teachingTopic3 + ""}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    পাঠের সময়:
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    মাস:
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
                      this.setState({ teachingMonth: text })
                    }
                    value={this.state.teachingMonth + ""}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    সপ্তাহ:
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
                      this.setState({ teachingWeek: text })
                    }
                    value={this.state.teachingWeek + ""}
                  />

                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    দিন:
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
                      <Text>প্রতিবন্ধী শিশু:</Text>
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
                            studentTotal:
                              Number(text) +
                              this.state.studentBoy +
                              this.state.studentSpecial,
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
                            studentTotal:
                              Number(text) +
                              this.state.studentGirl +
                              this.state.studentSpecial,
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
                        editable={true}
                        onChangeText={(text) =>
                          this.setState({
                            studentSpecial: Number(text),
                            studentTotal:
                              Number(text) +
                              this.state.studentGirl +
                              this.state.studentBoy,
                          })
                        }
                        value={this.state.studentSpecial + ""}
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
                          this.state.allPreprimaryClassObservationData.filter(
                            (item) => {
                              return (
                                item.visitNo ===
                                  parseInt(parseInt(this.state.visitNo) - 1) &&
                                item.school === this.state.pickerSchool &&
                                item.project === this.state.pickerProject &&
                                item.year === this.state.pickerYear &&
                                item.classTeacher.trim() ===
                                  this.state.classTeacher.trim()
                              );
                            }
                          ),
                      });

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
                      //   "parseInt(this.state.visitNo) : " +
                      //     parseInt(parseInt(this.state.visitNo) - 1)
                      // );

                      // console.log(
                      //   "allLibraryObservationData: " +
                      //     this.state.allLibraryObservationData
                      // );

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
                ১. গল্প পড়া ও ভাষার কাজ বিষয়ক প্রশিক্ষণপ্রাপ্ত শিক্ষক কর্তৃক
                পাঠ পরিচালিত হলেই কেবল সম্পূর্ণ পাঠ পর্যবেক্ষণ করুন ।
              </Text>
              <Text style={{ padding: 5 }}>
                ২. প্রায়োরিটি এরিয়ার ভিত্তিতে ভালো দিক ও সহায়তার ক্ষেত্রগুলা
                চিহ্নিত করুন ।
              </Text>
              <Text style={{ padding: 5 }}>
                ৩. পাঠ পরিচালনা সংক্রান্ত ২-৩ টি ভালো দিক উল্লেখ করুন।
              </Text>
              <Text style={{ padding: 5 }}>
                ৪. বিষয়বস্তুর ভিত্তিতে প্রযোজ্য ক্ষেত্রে ১-২ টি করে উন্নয়নযোগ্য
                ইনডিকেটর (প্রথম "না বা আংশিক" হয়েছে এমন) চিহ্নিত ও আলোচনা করুন ।
              </Text>
              <Text style={{ padding: 5 }}>
                ৫. রুম টু রিড থেকে কোনো পদক্ষেপ গ্রহণের প্রয়োজন হলে উল্লেখ করুন
                ।
              </Text>
            </Card>
            <Card style={{ padding: 10, margin: 10 }}>
              <Text style={{ justifyContent: "flex-end" }}>
                ফলো-আপ করার জন্য গত পরিদর্শন থেকে প্রাপ্ত ১-২ টি ইনডিকেটর যেগুলা
                উন্নয়নের জন্য শ্রেণি শিক্ষক একমত হয়েছিলেন:
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
                  বিগবুক ব্যবহার করে পাঠ চলাকালীন সময় দেখতে হবে এবং পূরণ করতে
                  হবে (প্রযোজ্য ক্ষেত্রে)
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
                      ১ক। শিক্ষক গল্প পড়ার পিরিয়ডে রুম টু রিডের বিগবুক ব্যবহার
                      করেছেন
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      অগ্রাধিকার এরিয়া: ১
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
                          selectedValue={this.state.ind11UsingBigbookStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind11UsingBigbookStatus: value,
                            });

                            // Set teacher status
                            if (
                              (this.state.ind11UsingBigbookStatus === "Yes" ||
                                this.state.ind11UsingBigbookStatus === "N/A") &&
                              (this.state.ind12PictureDiscussionStatus ===
                                "Yes" ||
                                this.state.ind12PictureDiscussionStatus ===
                                  "N/A") &&
                              this.state.ind21UsingTalkingChartStatus ===
                                "Yes" &&
                              (this.state.ind22UsingPictureElementStatus ===
                                "Yes" ||
                                this.state.ind22UsingPictureElementStatus ===
                                  "N/A") &&
                              this.state.ind31LanguageGameStatus === "Yes" &&
                              (this.state.ind31LanguageGameStatus === "Yes" ||
                                this.state.ind31LanguageGameStatus === "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.ind11UsingBigbookStatus === "Yes" &&
                              this.state.ind12PictureDiscussionStatus ===
                                "Yes" &&
                              this.state.ind21UsingTalkingChartStatus ===
                                "Yes" &&
                              this.state.ind22UsingPictureElementStatus ===
                                "Yes" &&
                              this.state.ind31LanguageGameStatus === "Yes" &&
                              this.state.ind31LanguageGameStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11UsingBigbookStatus === "Yes" ||
                                this.state.ind11UsingBigbookStatus === "N/A") &&
                              this.state.ind21UsingTalkingChartStatus ===
                                "Yes" &&
                              this.state.ind31LanguageGameStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state.ind11UsingBigbookStatus === "No" ||
                                this.state.ind11UsingBigbookStatus ===
                                  "Partial") &&
                              (this.state.ind21UsingTalkingChartStatus ===
                                "No" ||
                                this.state.ind21UsingTalkingChartStatus ===
                                  "Partial") &&
                              (this.state.ind31LanguageGameStatus === "No" ||
                                this.state.ind31LanguageGameStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
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
                            this.setState({ ind11UsingBigbookNotes: text })
                          }
                          value={this.state.ind11UsingBigbookNotes + ""}
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
                      ১খ। পাঠ চলাকালীন সংশ্লিষ্ট ছবি নিয়ে আলোচনা করেছেন
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
                            height: 40,
                            width: 150,
                          }}
                          selectedValue={
                            this.state.ind12PictureDiscussionStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind12PictureDiscussionStatus: value,
                            });

                            // Set teacher status
                            if (
                              (this.state.ind11UsingBigbookStatus === "Yes" ||
                                this.state.ind11UsingBigbookStatus === "N/A") &&
                              (this.state.ind12PictureDiscussionStatus ===
                                "Yes" ||
                                this.state.ind12PictureDiscussionStatus ===
                                  "N/A") &&
                              this.state.ind21UsingTalkingChartStatus ===
                                "Yes" &&
                              (this.state.ind22UsingPictureElementStatus ===
                                "Yes" ||
                                this.state.ind22UsingPictureElementStatus ===
                                  "N/A") &&
                              this.state.ind31LanguageGameStatus === "Yes" &&
                              (this.state.ind31LanguageGameStatus === "Yes" ||
                                this.state.ind31LanguageGameStatus === "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11UsingBigbookStatus === "Yes" ||
                                this.state.ind11UsingBigbookStatus === "N/A") &&
                              this.state.ind21UsingTalkingChartStatus ===
                                "Yes" &&
                              this.state.ind31LanguageGameStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state.ind11UsingBigbookStatus === "No" ||
                                this.state.ind11UsingBigbookStatus ===
                                  "Partial") &&
                              (this.state.ind21UsingTalkingChartStatus ===
                                "No" ||
                                this.state.ind21UsingTalkingChartStatus ===
                                  "Partial") &&
                              (this.state.ind31LanguageGameStatus === "No" ||
                                this.state.ind31LanguageGameStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
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
                              ind12PictureDiscussionNotes: text,
                            })
                          }
                          value={this.state.ind12PictureDiscussionNotes + ""}
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
                      ১গ। শিক্ষক গল্প পড়ার সময় দিন ভেদে রুম টু রিড প্রদত্ত
                      নির্দেশিকা অনুযায়ী পাঠ পরিচালনা করেছেন
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
                            this.state.ind13FollowedInstructionStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind13FollowedInstructionStatus: value,
                            });

                            // Set teacher status
                            if (
                              (this.state.ind11UsingBigbookStatus === "Yes" ||
                                this.state.ind11UsingBigbookStatus === "N/A") &&
                              (this.state.ind12PictureDiscussionStatus ===
                                "Yes" ||
                                this.state.ind12PictureDiscussionStatus ===
                                  "N/A") &&
                              this.state.ind21UsingTalkingChartStatus ===
                                "Yes" &&
                              (this.state.ind22UsingPictureElementStatus ===
                                "Yes" ||
                                this.state.ind22UsingPictureElementStatus ===
                                  "N/A") &&
                              this.state.ind31LanguageGameStatus === "Yes" &&
                              (this.state.ind31LanguageGameStatus === "Yes" ||
                                this.state.ind31LanguageGameStatus === "N/A")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              (this.state.ind11UsingBigbookStatus === "Yes" ||
                                this.state.ind11UsingBigbookStatus === "N/A") &&
                              this.state.ind21UsingTalkingChartStatus ===
                                "Yes" &&
                              this.state.ind31LanguageGameStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              (this.state.ind11UsingBigbookStatus === "No" ||
                                this.state.ind11UsingBigbookStatus ===
                                  "Partial") &&
                              (this.state.ind21UsingTalkingChartStatus ===
                                "No" ||
                                this.state.ind21UsingTalkingChartStatus ===
                                  "Partial") &&
                              (this.state.ind31LanguageGameStatus === "No" ||
                                this.state.ind31LanguageGameStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 1",
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
                              ind13FollowedInstructionNotes: text,
                            })
                          }
                          value={this.state.ind13FollowedInstructionNotes + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
              <View style={{ padding: 5, flexDirection: "row" }}>
                <Text
                  style={{
                    backgroundColor: "green",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  কথোপকথন চার্ট ব্যবহার করে পাঠ পরিচালনার সময় দেখতে হবে এবং পূরণ
                  করতে হবে
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
                    ২ক। শিক্ষক ভাষার কাজ পিরিয়ডের শুরুতে কথোপকথন পরিচালনার সময়
                    রুম টু রিডের কথোপকথন চার্ট ব্যবহার করেছেন
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
                        selectedValue={this.state.ind21UsingTalkingChartStatus}
                        onValueChange={(value) => {
                          this.setState({
                            ind21UsingTalkingChartStatus: value,
                          });

                          // Set teacher status
                          if (
                            (this.state.ind11UsingBigbookStatus === "Yes" ||
                              this.state.ind11UsingBigbookStatus === "N/A") &&
                            (this.state.ind12PictureDiscussionStatus ===
                              "Yes" ||
                              this.state.ind12PictureDiscussionStatus ===
                                "N/A") &&
                            this.state.ind21UsingTalkingChartStatus === "Yes" &&
                            (this.state.ind22UsingPictureElementStatus ===
                              "Yes" ||
                              this.state.ind22UsingPictureElementStatus ===
                                "N/A") &&
                            this.state.ind31LanguageGameStatus === "Yes" &&
                            (this.state.ind31LanguageGameStatus === "Yes" ||
                              this.state.ind31LanguageGameStatus === "N/A")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 3",
                            });
                          } else if (
                            (this.state.ind11UsingBigbookStatus === "Yes" ||
                              this.state.ind11UsingBigbookStatus === "N/A") &&
                            this.state.ind21UsingTalkingChartStatus === "Yes" &&
                            this.state.ind31LanguageGameStatus === "Yes"
                          ) {
                            this.setState({
                              teacherStatus: "Priority 2",
                            });
                          } else if (
                            (this.state.ind11UsingBigbookStatus === "No" ||
                              this.state.ind11UsingBigbookStatus ===
                                "Partial") &&
                            (this.state.ind21UsingTalkingChartStatus === "No" ||
                              this.state.ind21UsingTalkingChartStatus ===
                                "Partial") &&
                            (this.state.ind31LanguageGameStatus === "No" ||
                              this.state.ind31LanguageGameStatus === "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 1",
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
                            ind21UsingTalkingChartNotes: text,
                          })
                        }
                        value={this.state.ind21UsingTalkingChartNotes + ""}
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
                    ২খ। ছবির বিভিন্ন উপাদান নির্দেশ করে কথোপকথন পরিচালনা করেছেন
                    (প্রযোজ্য ক্ষেত্রে)
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
                          this.state.ind22UsingPictureElementStatus
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind22UsingPictureElementStatus: value,
                          });

                          // Set teacher status
                          if (
                            (this.state.ind11UsingBigbookStatus === "Yes" ||
                              this.state.ind11UsingBigbookStatus === "N/A") &&
                            (this.state.ind12PictureDiscussionStatus ===
                              "Yes" ||
                              this.state.ind12PictureDiscussionStatus ===
                                "N/A") &&
                            this.state.ind21UsingTalkingChartStatus === "Yes" &&
                            (this.state.ind22UsingPictureElementStatus ===
                              "Yes" ||
                              this.state.ind22UsingPictureElementStatus ===
                                "N/A") &&
                            this.state.ind31LanguageGameStatus === "Yes" &&
                            (this.state.ind31LanguageGameStatus === "Yes" ||
                              this.state.ind31LanguageGameStatus === "N/A")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 3",
                            });
                          } else if (
                            (this.state.ind11UsingBigbookStatus === "Yes" ||
                              this.state.ind11UsingBigbookStatus === "N/A") &&
                            this.state.ind21UsingTalkingChartStatus === "Yes" &&
                            this.state.ind31LanguageGameStatus === "Yes"
                          ) {
                            this.setState({
                              teacherStatus: "Priority 2",
                            });
                          } else if (
                            (this.state.ind11UsingBigbookStatus === "No" ||
                              this.state.ind11UsingBigbookStatus ===
                                "Partial") &&
                            (this.state.ind21UsingTalkingChartStatus === "No" ||
                              this.state.ind21UsingTalkingChartStatus ===
                                "Partial") &&
                            (this.state.ind31LanguageGameStatus === "No" ||
                              this.state.ind31LanguageGameStatus === "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 1",
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
                            ind22UsingPictureElementNotes: text,
                          })
                        }
                        value={this.state.ind22UsingPictureElementNotes + ""}
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
                    ২গ। কথোপকথন চার্ট ব্যবহারের ক্ষেত্রে দিন ভেদে রুম টু রিড
                    প্রদত্ত নির্দেশিকার ধাপসমূহ অনুসরণ করে পাঠ পরিচালনা করেছেন
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
                          this.state.ind23FollowedInstructionStepStatus
                        }
                        onValueChange={(value) => {
                          this.setState({
                            ind23FollowedInstructionStepStatus: value,
                          });

                          // Set teacher status
                          if (
                            (this.state.ind11UsingBigbookStatus === "Yes" ||
                              this.state.ind11UsingBigbookStatus === "N/A") &&
                            (this.state.ind12PictureDiscussionStatus ===
                              "Yes" ||
                              this.state.ind12PictureDiscussionStatus ===
                                "N/A") &&
                            this.state.ind21UsingTalkingChartStatus === "Yes" &&
                            (this.state.ind22UsingPictureElementStatus ===
                              "Yes" ||
                              this.state.ind22UsingPictureElementStatus ===
                                "N/A") &&
                            this.state.ind31LanguageGameStatus === "Yes" &&
                            (this.state.ind31LanguageGameStatus === "Yes" ||
                              this.state.ind31LanguageGameStatus === "N/A")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 3",
                            });
                          } else if (
                            (this.state.ind11UsingBigbookStatus === "Yes" ||
                              this.state.ind11UsingBigbookStatus === "N/A") &&
                            this.state.ind21UsingTalkingChartStatus === "Yes" &&
                            this.state.ind31LanguageGameStatus === "Yes"
                          ) {
                            this.setState({
                              teacherStatus: "Priority 2",
                            });
                          } else if (
                            (this.state.ind11UsingBigbookStatus === "No" ||
                              this.state.ind11UsingBigbookStatus ===
                                "Partial") &&
                            (this.state.ind21UsingTalkingChartStatus === "No" ||
                              this.state.ind21UsingTalkingChartStatus ===
                                "Partial") &&
                            (this.state.ind31LanguageGameStatus === "No" ||
                              this.state.ind31LanguageGameStatus === "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 1",
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
                            ind23FollowedInstructionStepNotes: text,
                          })
                        }
                        value={
                          this.state.ind23FollowedInstructionStepNotes + ""
                        }
                      ></TextInput>
                    </View>
                  </View>
                </Card>
              </Card>
              <View style={{ padding: 5, flexDirection: "row" }}>
                <Text
                  style={{
                    backgroundColor: "green",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  ভাষার খেলা পরিচালনার সময় দেখতে হবে এবং পূরণ করতে হবে
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
                    ৩ক। শিক্ষক পরিকল্পনা অনুযায়ী সংশ্লিষ্ট দিনের ভাষার খেলাটি
                    পরিচালনা করেছেন
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
                        selectedValue={this.state.ind31LanguageGameStatus}
                        onValueChange={(value) => {
                          this.setState({
                            ind31LanguageGameStatus: value,
                          });

                          // Set teacher status
                          if (
                            (this.state.ind11UsingBigbookStatus === "Yes" ||
                              this.state.ind11UsingBigbookStatus === "N/A") &&
                            (this.state.ind12PictureDiscussionStatus ===
                              "Yes" ||
                              this.state.ind12PictureDiscussionStatus ===
                                "N/A") &&
                            this.state.ind21UsingTalkingChartStatus === "Yes" &&
                            (this.state.ind22UsingPictureElementStatus ===
                              "Yes" ||
                              this.state.ind22UsingPictureElementStatus ===
                                "N/A") &&
                            this.state.ind31LanguageGameStatus === "Yes" &&
                            (this.state.ind31LanguageGameStatus === "Yes" ||
                              this.state.ind31LanguageGameStatus === "N/A")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 3",
                            });
                          } else if (
                            (this.state.ind11UsingBigbookStatus === "Yes" ||
                              this.state.ind11UsingBigbookStatus === "N/A") &&
                            this.state.ind21UsingTalkingChartStatus === "Yes" &&
                            this.state.ind31LanguageGameStatus === "Yes"
                          ) {
                            this.setState({
                              teacherStatus: "Priority 2",
                            });
                          } else if (
                            (this.state.ind11UsingBigbookStatus === "No" ||
                              this.state.ind11UsingBigbookStatus ===
                                "Partial") &&
                            (this.state.ind21UsingTalkingChartStatus === "No" ||
                              this.state.ind21UsingTalkingChartStatus ===
                                "Partial") &&
                            (this.state.ind31LanguageGameStatus === "No" ||
                              this.state.ind31LanguageGameStatus === "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 1",
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
                            ind31LanguageGameNotes: text,
                          })
                        }
                        value={this.state.ind31LanguageGameNotes + ""}
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
                    ৩খ। শিক্ষক ভাষার খেলা পরিচালননার সময় আমি করি-আমরা করি-তুমি
                    কর পদ্ধতিটি ব্যবহার করেছেন (প্রযোজ্য ক্ষেত্রে)
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
                        selectedValue={this.state.ind32LanguageGameIWeYouStatus}
                        onValueChange={(value) => {
                          this.setState({
                            ind32LanguageGameIWeYouStatus: value,
                          });

                          // Set teacher status
                          if (
                            (this.state.ind11UsingBigbookStatus === "Yes" ||
                              this.state.ind11UsingBigbookStatus === "N/A") &&
                            (this.state.ind12PictureDiscussionStatus ===
                              "Yes" ||
                              this.state.ind12PictureDiscussionStatus ===
                                "N/A") &&
                            this.state.ind21UsingTalkingChartStatus === "Yes" &&
                            (this.state.ind22UsingPictureElementStatus ===
                              "Yes" ||
                              this.state.ind22UsingPictureElementStatus ===
                                "N/A") &&
                            this.state.ind31LanguageGameStatus === "Yes" &&
                            (this.state.ind31LanguageGameStatus === "Yes" ||
                              this.state.ind31LanguageGameStatus === "N/A")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 3",
                            });
                          } else if (
                            (this.state.ind11UsingBigbookStatus === "Yes" ||
                              this.state.ind11UsingBigbookStatus === "N/A") &&
                            this.state.ind21UsingTalkingChartStatus === "Yes" &&
                            this.state.ind31LanguageGameStatus === "Yes"
                          ) {
                            this.setState({
                              teacherStatus: "Priority 2",
                            });
                          } else if (
                            (this.state.ind11UsingBigbookStatus === "No" ||
                              this.state.ind11UsingBigbookStatus ===
                                "Partial") &&
                            (this.state.ind21UsingTalkingChartStatus === "No" ||
                              this.state.ind21UsingTalkingChartStatus ===
                                "Partial") &&
                            (this.state.ind31LanguageGameStatus === "No" ||
                              this.state.ind31LanguageGameStatus === "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 1",
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
                            ind32LanguageGameIWeYouNotes: text,
                          })
                        }
                        value={this.state.ind32LanguageGameIWeYouNotes + ""}
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
                    ৩গ। ভাষার খেলা পরিচালনার ক্ষেত্রে রুম টু রিড প্রদত্ত
                    শব্দতালিকার বাইরেও প্রাসঙ্গিক শব্দ/বাক্য উদাহরণ হিসেবে
                    ব্যবহার করেছেন
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
                        selectedValue={this.state.ind33LanguageGameExtraStatus}
                        onValueChange={(value) => {
                          this.setState({
                            ind33LanguageGameExtraStatus: value,
                          });

                          if (
                            (this.state.ind11UsingBigbookStatus === "Yes" ||
                              this.state.ind11UsingBigbookStatus === "N/A") &&
                            (this.state.ind12PictureDiscussionStatus ===
                              "Yes" ||
                              this.state.ind12PictureDiscussionStatus ===
                                "N/A") &&
                            this.state.ind21UsingTalkingChartStatus === "Yes" &&
                            (this.state.ind22UsingPictureElementStatus ===
                              "Yes" ||
                              this.state.ind22UsingPictureElementStatus ===
                                "N/A") &&
                            this.state.ind31LanguageGameStatus === "Yes" &&
                            (this.state.ind31LanguageGameStatus === "Yes" ||
                              this.state.ind31LanguageGameStatus === "N/A")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 3",
                            });
                          } else if (
                            (this.state.ind11UsingBigbookStatus === "Yes" ||
                              this.state.ind11UsingBigbookStatus === "N/A") &&
                            this.state.ind21UsingTalkingChartStatus === "Yes" &&
                            this.state.ind31LanguageGameStatus === "Yes"
                          ) {
                            this.setState({
                              teacherStatus: "Priority 2",
                            });
                          } else if (
                            (this.state.ind11UsingBigbookStatus === "No" ||
                              this.state.ind11UsingBigbookStatus ===
                                "Partial") &&
                            (this.state.ind21UsingTalkingChartStatus === "No" ||
                              this.state.ind21UsingTalkingChartStatus ===
                                "Partial") &&
                            (this.state.ind31LanguageGameStatus === "No" ||
                              this.state.ind31LanguageGameStatus === "Partial")
                          ) {
                            this.setState({
                              teacherStatus: "Priority 1",
                            });
                          } else {
                            this.setState({
                              teacherStatus: "Priority 1",
                            });
                          }
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
                            ind33LanguageGameExtraNotes: text,
                          })
                        }
                        value={this.state.ind33LanguageGameExtraNotes + ""}
                      ></TextInput>
                    </View>
                  </View>
                </Card>
              </Card>
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
                          (this.state.ind11UsingBigbookStatus === "Yes" ||
                            this.state.ind11UsingBigbookStatus === "N/A") &&
                          (this.state.ind12PictureDiscussionStatus === "Yes" ||
                            this.state.ind12PictureDiscussionStatus ===
                              "N/A") &&
                          this.state.ind21UsingTalkingChartStatus === "Yes" &&
                          (this.state.ind22UsingPictureElementStatus ===
                            "Yes" ||
                            this.state.ind22UsingPictureElementStatus ===
                              "N/A") &&
                          this.state.ind31LanguageGameStatus === "Yes" &&
                          (this.state.ind31LanguageGameStatus === "Yes" ||
                            this.state.ind31LanguageGameStatus === "N/A")
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          (this.state.ind11UsingBigbookStatus === "Yes" ||
                            this.state.ind11UsingBigbookStatus === "N/A") &&
                          this.state.ind21UsingTalkingChartStatus === "Yes" &&
                          this.state.ind31LanguageGameStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else if (
                          (this.state.ind11UsingBigbookStatus === "No" ||
                            this.state.ind11UsingBigbookStatus === "Partial") &&
                          (this.state.ind21UsingTalkingChartStatus === "No" ||
                            this.state.ind21UsingTalkingChartStatus ===
                              "Partial") &&
                          (this.state.ind31LanguageGameStatus === "No" ||
                            this.state.ind31LanguageGameStatus === "Partial")
                        ) {
                          this.setState({
                            teacherStatus: "Priority 1",
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
                      {this.state.allPreprimaryIndicator.map((item) => {
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
                          (this.state.ind11UsingBigbookStatus === "Yes" ||
                            this.state.ind11UsingBigbookStatus === "N/A") &&
                          (this.state.ind12PictureDiscussionStatus === "Yes" ||
                            this.state.ind12PictureDiscussionStatus ===
                              "N/A") &&
                          this.state.ind21UsingTalkingChartStatus === "Yes" &&
                          (this.state.ind22UsingPictureElementStatus ===
                            "Yes" ||
                            this.state.ind22UsingPictureElementStatus ===
                              "N/A") &&
                          this.state.ind31LanguageGameStatus === "Yes" &&
                          (this.state.ind31LanguageGameStatus === "Yes" ||
                            this.state.ind31LanguageGameStatus === "N/A")
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          (this.state.ind11UsingBigbookStatus === "Yes" ||
                            this.state.ind11UsingBigbookStatus === "N/A") &&
                          this.state.ind21UsingTalkingChartStatus === "Yes" &&
                          this.state.ind31LanguageGameStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else if (
                          (this.state.ind11UsingBigbookStatus === "No" ||
                            this.state.ind11UsingBigbookStatus === "Partial") &&
                          (this.state.ind21UsingTalkingChartStatus === "No" ||
                            this.state.ind21UsingTalkingChartStatus ===
                              "Partial") &&
                          (this.state.ind31LanguageGameStatus === "No" ||
                            this.state.ind31LanguageGameStatus === "Partial")
                        ) {
                          this.setState({
                            teacherStatus: "Priority 1",
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
                      {this.state.allPreprimaryIndicator.map((item) => {
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
                      {this.state.allPreprimaryIndicator.map((item) => {
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
                      ১/২/৩ টি সূচক (এরিয়ার নম্বর) চিহ্নিত করেছেন তা উল্লেখ করুন
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
                      {this.state.allPreprimaryIndicator.map((item) => {
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
                      {this.state.allPreprimaryIndicator.map((item) => {
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
                    <Text>কিভাবে করবেন :</Text>
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
              submitOnEnter={false}
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
