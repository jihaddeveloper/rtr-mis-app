//  Author: Mohammad Jihad Hossain
//  Create Date: 25/08/2021
//  Modify Date: 25/01/2023
//  Description: Library reading activities observation screen component

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

import { Checkbox } from "react-native-paper";

import { Card } from "react-native-shadow-cards";

import DateTimePicker from "@react-native-community/datetimepicker";

const { width, height } = Dimensions.get("window");

export default class LibraryReadingActivitiesObservationScreen extends React.Component {
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
      time: new Date(Date.now()),
      mode: "date",
      show: false,
      startTime: "",
      endTime: "",
      // Date picker property

      // General data

      pickerMonth: "",
      pickerYear: "",
      pickerDistrict: "",
      pickerUpazilla: "",
      pickerDistrictKey: "",
      pickerUpazillaKey: "",
      pickerOffice: "",
      pickerProject: "",
      visitNo: 0,
      pickerLF: "",
      pickerLPO: "",
      pickerLFName: "",
      pickerLPOName: "",
      pickerSchool: "",
      pickerVisitor: "",
      pickerDesignation: "",
      pickerVisitorOffice: "",

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
      timeOfReading: "",

      lastFollowupTopic1: "",
      lastFollowupTopic2: "",
      lastFollowupTopic3: "",

      ind1FriendlyCommunicationStatus: "",
      ind1FriendlyCommunicationNotes: "",

      ind2SRMInspiringStatus: "",
      ind2SRMInspiringNotes: "",

      ind3SRMInstructionStatus: "",
      ind3SRMInstructionNotes: "",

      ind4BookShowingStatus: "",
      ind4BookShowingNotes: "",

      ind5WordTeachingStatus: "",
      ind5WordTeachingNotes: "",

      ind6StoryReadingStatus: "",
      ind6StoryReadingNotes: "",

      ind7StorySuitableStatus: "",
      ind7StorySuitableNotes: "",

      ind8StoryReadingCombinationStatus: "",
      ind8StoryReadingCombinationNotes: "",

      ind9AllStudentEngagementStatus: "",
      ind9AllStudentEngagementNotes: "",

      ind10InclusiveAssessmentStatus: "",
      ind10InclusiveAssessmentNotes: "",

      ind11AskingForBCOStatus: "",
      ind11AskingForBCONotes: "",

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
    this.getAllSRMIndicator();
    this.getAllSRMClassObservation();
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
      pickerMonth: "",
      pickerYear: "",
      pickerDistrict: "",
      pickerUpazilla: "",
      pickerDistrictKey: "",
      pickerUpazillaKey: "",
      pickerOffice: "",
      pickerProject: "",
      visitNo: 0,
      pickerLF: "",
      pickerLPO: "",
      pickerLFName: "",
      pickerLPOName: "",
      pickerSchool: "",
      pickerVisitor: "",
      pickerDesignation: "",
      pickerVisitorOffice: "",

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
      timeOfReading: "",

      lastFollowupTopic1: "",
      lastFollowupTopic2: "",
      lastFollowupTopic3: "",

      ind1FriendlyCommunicationStatus: "",
      ind1FriendlyCommunicationNotes: "",

      ind2SRMInspiringStatus: "",
      ind2SRMInspiringNotes: "",

      ind3SRMInstructionStatus: "",
      ind3SRMInstructionNotes: "",

      ind4BookShowingStatus: "",
      ind4BookShowingNotes: "",

      ind5WordTeachingStatus: "",
      ind5WordTeachingNotes: "",

      ind6StoryReadingStatus: "",
      ind6StoryReadingNotes: "",

      ind7StorySuitableStatus: "",
      ind7StorySuitableNotes: "",

      ind8StoryReadingCombinationStatus: "",
      ind8StoryReadingCombinationNotes: "",

      ind9AllStudentEngagementStatus: "",
      ind9AllStudentEngagementNotes: "",

      ind10InclusiveAssessmentStatus: "",
      ind10InclusiveAssessmentNotes: "",

      ind11AskingForBCOStatus: "",
      ind11AskingForBCONotes: "",

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
        }
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
        }
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

      typeOfReading: this.state.typeOfReading,
      timeOfReading: this.state.timeOfReading,

      ind1FriendlyCommunicationStatus:
        this.state.ind1FriendlyCommunicationStatus,
      ind1FriendlyCommunicationNotes: this.state.ind1FriendlyCommunicationNotes,

      ind2SRMInspiringStatus: this.state.ind2SRMInspiringStatus,
      ind2SRMInspiringNotes: this.state.ind2SRMInspiringNotes,

      ind3SRMInstructionStatus: this.state.ind3SRMInstructionStatus,
      ind3SRMInstructionNotes: this.state.ind3SRMInstructionNotes,

      ind4BookShowingStatus: this.state.ind4BookShowingStatus,
      ind4BookShowingNotes: this.state.ind4BookShowingNotes,

      ind5WordTeachingStatus: this.state.ind5WordTeachingStatus,
      ind5WordTeachingNotes: this.state.ind5WordTeachingNotes,

      ind6StoryReadingStatus: this.state.ind6StoryReadingStatus,
      ind6StoryReadingNotes: this.state.ind6StoryReadingNotes,

      ind7StorySuitableStatus: this.state.ind7StorySuitableStatus,
      ind7StorySuitableNotes: this.state.ind7StorySuitableNotes,

      ind8StoryReadingCombinationStatus:
        this.state.ind8StoryReadingCombinationStatus,
      ind8StoryReadingCombinationNotes:
        this.state.ind8StoryReadingCombinationNotes,

      ind9AllStudentEngagementStatus: this.state.ind9AllStudentEngagementStatus,
      ind9AllStudentEngagementNotes: this.state.ind9AllStudentEngagementNotes,

      ind10InclusiveAssessmentStatus: this.state.ind10InclusiveAssessmentStatus,
      ind10InclusiveAssessmentNotes: this.state.ind10InclusiveAssessmentNotes,

      ind11AskingForBCOStatus: this.state.ind11AskingForBCOStatus,
      ind11AskingForBCONotes: this.state.ind11AskingForBCONotes,

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
      this.state.duplicateSRMClassObservationData.length
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
    } else if (this.state.duplicateSRMClassObservationData.length > 0) {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Duplicate SRM Class data !!");
      return;
    } else {
      this.setState({ dateError: "" });
      // Send data to API

      try {
        let response = await fetch(
          "http://118.179.80.51:8080/api/v1/srm-class",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newSRMClass),
          }
        );

        //console.log("response:" + JSON.stringify(newSRMClass));

        if (response.status >= 200 && response.status < 300) {
          Alert.alert(
            "Alert",
            "SRM class obsvervatio data saved successfully!!!"
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

  render() {
    const { checked } = this.state;

    // For Datepicker
    const { show, date, mode } = this.state;
    // For Datepicker

    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 50,
            marginBottom: 40,
            alignContent: "center",
            textAlign: "center",
            alignSelf: "center",
            marginLeft: 100,
            marginRight: 100,
          }}
        >
          পড়ার ঘণ্টা কার্যক্রম পর্যবেক্ষণ ফরম
        </Text>

        <ScrollView style={{ flex: 1 }}>
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
                  <View style={{ flexDirection: "row" }}>
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
                        <Picker.Item
                          label={"Pre-Primary"}
                          value={"Pre-Primary"}
                        />
                        <Picker.Item label={"Grade 1"} value={"Grade 1"} />
                        <Picker.Item label={"Grade 2"} value={"Grade 2"} />
                        <Picker.Item label={"Grade 3"} value={"Grade 3"} />
                        <Picker.Item label={"Grade 4"} value={"Grade 4"} />
                        <Picker.Item label={"Grade 5"} value={"Grade 5"} />
                      </Picker>

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
                        preMonthData: this.state.allSRMClassData.filter(
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
                        "parseInt(this.state.visitNo) : " +
                          parseInt(parseInt(this.state.visitNo) - 1)
                      );

                      console.log(
                        "preMonthData: " + this.state.preMonthData.length
                      );
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
                ১. সংশ্লিষ্ট বিষয়ে প্রশিক্ষণপ্রাপ্ত শিক্ষক কর্তৃক পাঠ পরিচালিত
                হলেই কেবল সম্পূর্ণ পাঠ পর্যবেক্ষণ করুন ।
              </Text>
              <Text style={{ padding: 5 }}>
                ২. সম্পূর্ণ পাঠ পর্যবেক্ষণ করুন তবে প্রায়োরিটি এরিয়ার ভিত্তিতে
                ভালো দিক ও সহায়তার ক্ষেত্রগুলা চিহ্নিত করুন ।
              </Text>
              <Text style={{ padding: 5 }}>
                ৩. পড়ার ঘণ্টা কার্যক্রম সংক্রান্ত ২-৩ টি ভালো দিক উল্লেখ করুন।
              </Text>
              <Text style={{ padding: 5 }}>
                ৪. প্রায়োরিটি এরিয়ার ভিত্তিতে যে ১-২ টি ইনডিকেটরের উত্তর "না"
                বা আংশিক হয়েছে তার আলোকে সহায়তার জন্য অগ্রাধিকারভিত্তিক ইনডিকেটর
                উল্লেখ করুন ।
              </Text>
              <Text style={{ padding: 5 }}>
                ৫. শ্রেণিকক্ষ পড়ার ঘণ্টা কার্যক্রমে উন্নয়ন যোগ্য ১/২ টি ইনডিকেটর
                নিয়ে সংশ্লিষ্ট শিক্ষকের সাথে আলোচনা করুন।
              </Text>
              <Text style={{ padding: 5 }}>
                ৬. রুম টু রিড থেকে কোনো পদক্ষেপ গ্রহণের প্রয়োজন হলে উল্লেখ করুন
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
                    পড়ার ধরন নির্বাচন করুন
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
                      height: 40,
                      width: 250,
                    }}
                    onValueChange={(value) => {
                      this.setState({ typeOfReading: value });
                    }}
                    selectedValue={this.state.typeOfReading}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
                    <Picker.Item label={"সরব পাঠ"} value={"Read Aloud"} />
                    <Picker.Item
                      label={"অংশগ্রহণমূলক পড়া"}
                      value={"Participatory Reading"}
                    />
                    <Picker.Item
                      label={"স্বাধীনভাবে পড়া"}
                      value={"Independent Reading"}
                    />
                    <Picker.Item label={"জুটিতে পড়া"} value={"Pair Reading"} />
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
                    backgroundColor: "#ADD8E6",
                    fontWeight: "bold",
                    alignItems: "center",
                    alignSelf: "center",
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  সার্বিক
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
                      ১. শিক্ষক সকল শিক্ষার্থীদের সাথে বন্ধুত্বপূর্ণ যোগাযোগ
                      করেছেন ।
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
                          onValueChange={(value) => {
                            this.setState({
                              ind1FriendlyCommunicationStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
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
                            this.state.ind1FriendlyCommunicationStatus
                          }
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
                              ind1FriendlyCommunicationNotes: text,
                            })
                          }
                          value={this.state.ind1FriendlyCommunicationNotes + ""}
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
                      ২. শিক্ষক পড়ার ঘণ্টা কার্যক্রমে ছেলে-মেয়ে, বিশেষ চাহিদা
                      সম্পন্ন ও পিছিয়ে পড়া শিক্ষার্থীদের অংশগ্রহণে উৎসাহিত
                      করেছেন ।
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
                          selectedValue={this.state.ind2SRMInspiringStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind2SRMInspiringStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
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
                              ind2SRMInspiringNotes: text,
                            })
                          }
                          value={this.state.ind2SRMInspiringNotes + ""}
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
                      ৩. শিক্ষক পড়ার ঘণ্টা কার্যক্রম সম্পর্কে নির্দেশাবলী
                      পরিষ্কারভাবে দিয়েছেন এবং নির্দেশনা অনুযায়ী বর্ণিত ধাপগুলা
                      ধারাবাহিকভাবে অনুসরণ করে শ্রেণিপাঠ পরিচালনা করেছেন ।
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
                          selectedValue={this.state.ind3SRMInstructionStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind3SRMInstructionStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
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
                              ind3SRMInstructionNotes: text,
                            })
                          }
                          value={this.state.ind3SRMInstructionNotes + ""}
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
                  পড়ার আগে
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
                      ৪. শিক্ষক পাঠাগার থেকে একটা বই নিয়ে বইয়ের প্রচ্ছদ
                      শিক্ষার্থীদের দেখিয়েছেন এবং বইয়ের নাম ও লেখকের নাম বলেছেন
                      ।
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
                          selectedValue={this.state.ind4BookShowingStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind4BookShowingStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
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
                              ind4BookShowingNotes: text,
                            })
                          }
                          value={this.state.ind4BookShowingNotes + ""}
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
                      ৫. শিক্ষক বই থেকে দু-একটি শব্দ অর্থ সহ পরিষ্কারভাবে
                      শিক্ষার্থীদের শিখিয়েছেন । ।
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
                          selectedValue={this.state.ind5WordTeachingStatus}
                          onValueChange={(value) => {
                            this.setState({ ind5WordTeachingStatus: value });

                            // Set teacher status
                            if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
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
                              ind5WordTeachingNotes: text,
                            })
                          }
                          value={this.state.ind5WordTeachingNotes + ""}
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
                  পড়া চলাকালীন
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
                      ৬. গল্পের বই পড়ে শোনানোর পাশাপাশি শিক্ষক প্রযোজ্য ক্ষেত্রে
                      অভিব্যক্তি প্রকাশ ও অঙ্গভঙ্গি করেও দেখিয়েছেন ।
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
                          selectedValue={this.state.ind6StoryReadingStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind6StoryReadingStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
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
                              ind6StoryReadingNotes: text,
                            })
                          }
                          value={this.state.ind6StoryReadingNotes + ""}
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
                      ৭. শুধুমাত্র অংশগ্রহণ মূলক পড়ার ক্ষেত্রে: গল্পটি
                      শিক্ষার্থীদের পড়ার লেভেল অনুযায়ী উপযুক্ত ছিল ।
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
                          selectedValue={this.state.ind7StorySuitableStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind7StorySuitableStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
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
                              ind7StorySuitableNotes: text,
                            })
                          }
                          value={this.state.ind7StorySuitableNotes + ""}
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
                      ৮. শুধুমাত্র অংশগ্রহণ মূলক পড়ার জন্য: গল্পটি দ্বিতীয়বার
                      পড়ার ক্ষেত্রে, শিক্ষক শিক্ষার্থীরা একসাথে পড়েছেন ।
                    </Text>
                    <Text>
                      শুধুমাত্র জুটিতে পড়ার ক্ষেত্রে: শিক্ষক নির্দেশনার মাধ্যমে
                      নিশ্চিত করেছেন যে, শিক্ষার্থীরা একে অপরের পাশে জোড়ায় জোড়ায়
                      বসেছে এবং উভয়ই পড়েছে ।
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
                            disabled: true,
                          }}
                          selectedValue={
                            this.state.ind8StoryReadingCombinationStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind8StoryReadingCombinationStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
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
                              ind8StoryReadingCombinationNotes: text,
                            })
                          }
                          value={
                            this.state.ind8StoryReadingCombinationNotes + ""
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
                      ৯. সকল ধরনের (ছেলে-মেয়ে, বিশেষ চাহিদা সম্পন্ন ও পিছিয়ে
                      পড়া) শিক্ষার্থীদের অংশগ্রহণ নিশ্চিত শিক্ষক গল্পটি পড়ার সময়
                      এরপর কি হতে/ঘটতে পারে ? এমন দু/তিনটি প্রশ্ন করেছেন ।
                    </Text>
                    <Text>
                      সকল ধরনের (ছেলে-মেয়ে, বিশেষ চাহিদা সম্পন্ন ও পিছিয়ে পড়া)
                      শিক্ষার্থীদের অংশগ্রহণ নিশ্চিত করতে শিক্ষক একক বা জুটিতে
                      পড়া শুনেছেন এবং প্রয়োজনে প্রশ্ন করেছেন ।
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
                            this.state.ind9AllStudentEngagementStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind9AllStudentEngagementStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
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
                              ind9AllStudentEngagementNotes: text,
                            })
                          }
                          value={this.state.ind9AllStudentEngagementNotes + ""}
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
                  পড়া শেষে
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
                      ১০. সকল ধরনের (ছেলে-মেয়ে, বিশেষ চাহিদা সম্পন্ন ও পিছিয়ে
                      পড়া) শিক্ষার্থীদের বোধগম্যতা যাচাইয়ের জন্য শিক্ষক কখন,
                      কোথায়, কি এবং কে ইত্যাদি প্রশ্ন করেছেন ।
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
                            this.state.ind10InclusiveAssessmentStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind10InclusiveAssessmentStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
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
                              ind10InclusiveAssessmentNotes: text,
                            })
                          }
                          value={this.state.ind10InclusiveAssessmentNotes + ""}
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
                      ১১. বই চেক আউট করার জন্য আহ্বান জানিয়েছে বা সুযোগ করে
                      দিয়েছেন ।
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
                          selectedValue={this.state.ind11AskingForBCOStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind11AskingForBCOStatus: value,
                            });

                            // Set teacher status
                            if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Read Aloud" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind4BookShowingStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Participatory Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind6StoryReadingStatus === "Yes" &&
                              this.state.ind7StorySuitableStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind4BookShowingStatus === "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "No" ||
                                this.state.ind4BookShowingStatus ===
                                  "Partial" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading ===
                                "Independent Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
                                  "Partial")
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind9AllStudentEngagementStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 3",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes"
                            ) {
                              this.setState({
                                teacherStatus: "Priority 2",
                              });
                            } else if (
                              this.state.typeOfReading === "Pair Reading" &&
                              this.state.ind1FriendlyCommunicationStatus ===
                                "Yes" &&
                              this.state.ind2SRMInspiringStatus === "Yes" &&
                              this.state.ind3SRMInstructionStatus === "Yes" &&
                              this.state.ind8StoryReadingCombinationStatus ===
                                "Yes" &&
                              this.state.ind11AskingForBCOStatus === "Yes" &&
                              (this.state.ind9AllStudentEngagementStatus ===
                                "No" ||
                                this.state.ind9AllStudentEngagementStatus ===
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
                              ind11AskingForBCONotes: text,
                            })
                          }
                          value={this.state.ind11AskingForBCONotes + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>আলোচনা</Text>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <Text style={{ backgroundColor: "#ADD8E6", fontWeight: "bold" }}>
                শ্রেণি শিক্ষকের সাথে আলোচনার জন্য গুরুত্বপূর্ণ কিছু বিষয়ঃ
              </Text>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      বিদ্যালয়ের পাঠাগারগুলো ভালো অবস্থায় আছে এমন এমন ২/৩ টি
                      ইনডিকেটর ( নম্বর ) উল্লেখ করুন ।
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
                          this.state.typeOfReading === "Read Aloud" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind4BookShowingStatus === "Yes" &&
                          this.state.ind6StoryReadingStatus === "Yes" &&
                          this.state.ind9AllStudentEngagementStatus === "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          this.state.typeOfReading === "Read Aloud" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind6StoryReadingStatus === "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes" &&
                          (this.state.ind4BookShowingStatus === "No" ||
                            this.state.ind9AllStudentEngagementStatus ===
                              "No" ||
                            this.state.ind4BookShowingStatus === "Partial" ||
                            this.state.ind9AllStudentEngagementStatus ===
                              "Partial")
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else if (
                          this.state.typeOfReading === "Read Aloud" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind6StoryReadingStatus === "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else if (
                          this.state.typeOfReading ===
                            "Participatory Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind4BookShowingStatus === "Yes" &&
                          this.state.ind6StoryReadingStatus === "Yes" &&
                          this.state.ind7StorySuitableStatus === "Yes" &&
                          this.state.ind8StoryReadingCombinationStatus ===
                            "Yes" &&
                          this.state.ind9AllStudentEngagementStatus === "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          this.state.typeOfReading ===
                            "Participatory Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind6StoryReadingStatus === "Yes" &&
                          this.state.ind7StorySuitableStatus === "Yes" &&
                          this.state.ind8StoryReadingCombinationStatus ===
                            "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else if (
                          this.state.typeOfReading ===
                            "Participatory Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind6StoryReadingStatus === "Yes" &&
                          this.state.ind7StorySuitableStatus === "Yes" &&
                          this.state.ind8StoryReadingCombinationStatus ===
                            "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes" &&
                          (this.state.ind4BookShowingStatus === "No" ||
                            this.state.ind9AllStudentEngagementStatus ===
                              "No" ||
                            this.state.ind4BookShowingStatus === "Partial" ||
                            this.state.ind9AllStudentEngagementStatus ===
                              "Partial")
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else if (
                          this.state.typeOfReading === "Independent Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind9AllStudentEngagementStatus === "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          this.state.typeOfReading === "Independent Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else if (
                          this.state.typeOfReading === "Independent Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes" &&
                          (this.state.ind9AllStudentEngagementStatus === "No" ||
                            this.state.ind9AllStudentEngagementStatus ===
                              "Partial")
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else if (
                          this.state.typeOfReading === "Pair Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind8StoryReadingCombinationStatus ===
                            "Yes" &&
                          this.state.ind9AllStudentEngagementStatus === "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          this.state.typeOfReading === "Pair Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind8StoryReadingCombinationStatus ===
                            "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else if (
                          this.state.typeOfReading === "Pair Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind8StoryReadingCombinationStatus ===
                            "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes" &&
                          (this.state.ind9AllStudentEngagementStatus === "No" ||
                            this.state.ind9AllStudentEngagementStatus ===
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
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
                      {this.state.allSRMIndicator.map((item) => {
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
                          this.state.typeOfReading === "Read Aloud" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind4BookShowingStatus === "Yes" &&
                          this.state.ind6StoryReadingStatus === "Yes" &&
                          this.state.ind9AllStudentEngagementStatus === "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          this.state.typeOfReading === "Read Aloud" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind6StoryReadingStatus === "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes" &&
                          (this.state.ind4BookShowingStatus === "No" ||
                            this.state.ind9AllStudentEngagementStatus ===
                              "No" ||
                            this.state.ind4BookShowingStatus === "Partial" ||
                            this.state.ind9AllStudentEngagementStatus ===
                              "Partial")
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else if (
                          this.state.typeOfReading === "Read Aloud" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind6StoryReadingStatus === "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else if (
                          this.state.typeOfReading ===
                            "Participatory Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind4BookShowingStatus === "Yes" &&
                          this.state.ind6StoryReadingStatus === "Yes" &&
                          this.state.ind7StorySuitableStatus === "Yes" &&
                          this.state.ind8StoryReadingCombinationStatus ===
                            "Yes" &&
                          this.state.ind9AllStudentEngagementStatus === "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          this.state.typeOfReading ===
                            "Participatory Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind6StoryReadingStatus === "Yes" &&
                          this.state.ind7StorySuitableStatus === "Yes" &&
                          this.state.ind8StoryReadingCombinationStatus ===
                            "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else if (
                          this.state.typeOfReading ===
                            "Participatory Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind6StoryReadingStatus === "Yes" &&
                          this.state.ind7StorySuitableStatus === "Yes" &&
                          this.state.ind8StoryReadingCombinationStatus ===
                            "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes" &&
                          (this.state.ind4BookShowingStatus === "No" ||
                            this.state.ind9AllStudentEngagementStatus ===
                              "No" ||
                            this.state.ind4BookShowingStatus === "Partial" ||
                            this.state.ind9AllStudentEngagementStatus ===
                              "Partial")
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else if (
                          this.state.typeOfReading === "Independent Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind9AllStudentEngagementStatus === "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          this.state.typeOfReading === "Independent Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else if (
                          this.state.typeOfReading === "Independent Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes" &&
                          (this.state.ind9AllStudentEngagementStatus === "No" ||
                            this.state.ind9AllStudentEngagementStatus ===
                              "Partial")
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else if (
                          this.state.typeOfReading === "Pair Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind8StoryReadingCombinationStatus ===
                            "Yes" &&
                          this.state.ind9AllStudentEngagementStatus === "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 3",
                          });
                        } else if (
                          this.state.typeOfReading === "Pair Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind8StoryReadingCombinationStatus ===
                            "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes"
                        ) {
                          this.setState({
                            teacherStatus: "Priority 2",
                          });
                        } else if (
                          this.state.typeOfReading === "Pair Reading" &&
                          this.state.ind1FriendlyCommunicationStatus ===
                            "Yes" &&
                          this.state.ind2SRMInspiringStatus === "Yes" &&
                          this.state.ind3SRMInstructionStatus === "Yes" &&
                          this.state.ind8StoryReadingCombinationStatus ===
                            "Yes" &&
                          this.state.ind11AskingForBCOStatus === "Yes" &&
                          (this.state.ind9AllStudentEngagementStatus === "No" ||
                            this.state.ind9AllStudentEngagementStatus ===
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
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
                      {this.state.allSRMIndicator.map((item) => {
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
                      {this.state.allSRMIndicator.map((item) => {
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
                      অগ্রাধিকারভিত্তিতে বিদ্যালয়ের পাঠাগারগুলো উন্নয়নের জন্য যে
                      ১/২ টি ইনডিকেটর (এরিয়ার নম্বর) চিহ্নিত করেছেন তা শিক্ষককে
                      অবহিত করুন এবং তিনি পাঠাগারগুলো উন্নয়নে কি করতে পারেন সেটি
                      উল্লেখ করুন ।
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
                      {this.state.allSRMIndicator.map((item) => {
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
                      {this.state.allSRMIndicator.map((item) => {
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
                    <Text>কিভাবে করবেন</Text>
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
                      যে কাজ গুলো করার জন্য শ্রেণী শিক্ষক একমত হয়েছেন সেটি/
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
              // disabled={
              //   !this.state.pickerMonth ||
              //   !this.state.pickerYear ||
              //   !this.state.pickerDistrict ||
              //   !this.state.pickerUpazilla ||
              //   !this.state.pickerOffice ||
              //   !this.state.pickerProject ||
              //   !this.state.pickerLPO ||
              //   !this.state.pickerLF ||
              //   !this.state.pickerSchool ||
              //   !this.state.pickerVisitor ||
              //   !this.state.pickerDesignation ||
              //   !this.state.pickerVisitorOffice ||
              //   !this.state.classTeacher ||
              //   !this.state.classTeacherGender ||
              //   !this.state.teacherTrained ||
              //   !this.state.grade ||
              //   !this.state.section ||
              //   !this.state.note ||
              //   !this.state.typeOfReading ||

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
