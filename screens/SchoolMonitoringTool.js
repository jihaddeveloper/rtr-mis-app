//  Author: Mohammad Jihad Hossain
//  Create Date: 28/08/2024
//  Modify Date: 28/08/2024
//  Description: SchoolMonitoringTool screen component

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
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { Card } from "react-native-shadow-cards";

import { divisions, districts, upazillas, unions } from "bd-geojs";

import DateTimePicker from "@react-native-community/datetimepicker";

const { width, height } = Dimensions.get("window");

export default class SchoolMonitoringTool extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,

      option: "yes",

      choosenIndex: 0,

      //Preloaded Data
      allProject: [],
      allSchool: [],
      allTeacher: [],
      allEmployee: [],
      allOffice: [],
      allDesignation: [],

      allOverallIndicator: [],
      allSchoolMonitoringData: [],

      //Preloaded Data

      // previous visit data of the SchoolMonitoring
      preMonthData: [],
      // previous visit data of the SchoolMonitoring

      // Duplicate data check
      duplicateSchoolMonitoringData: [],
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
      headTeacher: "",
      teacherGender: "",
      note: "",

      lastFollowupTopic1: "",
      lastFollowupTopic2: "",
      lastFollowupTopic3: "",

      other: "",

      ind11LFArrivalTimeStatus: "",
      ind11LFArrivalTimeNotes: "",

      ind12ChallanDocumentStatus: "",
      ind12ChallanDocumentNotes: "",

      ind13VisitorRegisterStatus: "",
      ind13VisitorRegisterNotes: "",

      ind14RelatedDocumentStatus: "",
      ind14RelatedDocumentNotes: "",

      ind21WorkbookProvidedStatus: "",
      ind21WorkbookProvidedNotes: "",

      ind22InstructionMaterialStatus: "",
      ind22InstructionMaterialNotes: "",

      ind23OtherMaterialStatus: "",
      ind23OtherMaterialNotes: "",

      ind24ClassOnTimeStatus: "",
      ind24ClassOnTimeNotes: "",

      ind25TeacherIsTrainedStatus: "",
      ind25TeacherIsTrainedNotes: "",

      ind26FollowedRtRInstructionStatus: "",
      ind26FollowedRtRInstructionNotes: "",

      ind27StudentTrackingDocumentStatus: "",
      ind27StudentTrackingDocumentNotes: "",

      ind31OneTeacherReadingTrainingStatus: "",
      ind31OneTeacherReadingTrainingNotes: "",

      ind32SRMMentionedRoutineStatus: "",
      ind32SRMMentionedRoutineNotes: "",

      ind33TeacherConductReadingActivityStatus: "",
      ind33TeacherConductReadingActivityNotes: "",

      ind34BookshelfConditionGoodStatus: "",
      ind34BookshelfConditionGoodNotes: "",

      ind35RtRStoryAvailableRegisterUpdatedStatus: "",
      ind35RtRStoryAvailableRegisterUpdatedNotes: "",

      ind36BooksDisplayingStatus: "",
      ind36BooksDisplayingNotes: "",

      ind37LibraryPosterAvailableStatus: "",
      ind37LibraryPosterAvailableNotes: "",

      ind38BCORegisterAvailableConsistentStatus: "",
      ind38BCORegisterAvailableConsistentNotes: "",

      ind39ReadingActivityRegisterStatus: "",
      ind39ReadingActivityRegisterNotes: "",

      ind310BookCaptainSelectedStatus: "",
      ind310BookCaptainSelectedNotes: "",

      ind41TeacherInteractionStatus: "",
      ind41TeacherInteractionNotes: "",

      ind42DiscussionPoints: "",

      schoolStatus: "",

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
    this.getAllOverallIndicator();
    this.getAllSchoolMonitoring();
    this.getAllTeacher();
    this.getAllOffice();
    this.getAllProject();
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
      headTeacher: "",
      teacherGender: "",
      note: "",

      lastFollowupTopic1: "",
      lastFollowupTopic2: "",
      lastFollowupTopic3: "",

      other: "",

      ind11LFArrivalTimeStatus: "",
      ind11LFArrivalTimeNotes: "",

      ind12ChallanDocumentStatus: "",
      ind12ChallanDocumentNotes: "",

      ind13VisitorRegisterStatus: "",
      ind13VisitorRegisterNotes: "",

      ind14RelatedDocumentStatus: "",
      ind14RelatedDocumentNotes: "",

      ind21WorkbookProvidedStatus: "",
      ind21WorkbookProvidedNotes: "",

      ind22InstructionMaterialStatus: "",
      ind22InstructionMaterialNotes: "",

      ind23OtherMaterialStatus: "",
      ind23OtherMaterialNotes: "",

      ind24ClassOnTimeStatus: "",
      ind24ClassOnTimeNotes: "",

      ind25TeacherIsTrainedStatus: "",
      ind25TeacherIsTrainedNotes: "",

      ind26FollowedRtRInstructionStatus: "",
      ind26FollowedRtRInstructionNotes: "",

      ind27StudentTrackingDocumentStatus: "",
      ind27StudentTrackingDocumentNotes: "",

      ind31OneTeacherReadingTrainingStatus: "",
      ind31OneTeacherReadingTrainingNotes: "",

      ind32SRMMentionedRoutineStatus: "",
      ind32SRMMentionedRoutineNotes: "",

      ind33TeacherConductReadingActivityStatus: "",
      ind33TeacherConductReadingActivityNotes: "",

      ind34BookshelfConditionGoodStatus: "",
      ind34BookshelfConditionGoodNotes: "",

      ind35RtRStoryAvailableRegisterUpdatedStatus: "",
      ind35RtRStoryAvailableRegisterUpdatedNotes: "",

      ind36BooksDisplayingStatus: "",
      ind36BooksDisplayingNotes: "",

      ind37LibraryPosterAvailableStatus: "",
      ind37LibraryPosterAvailableNotes: "",

      ind38BCORegisterAvailableConsistentStatus: "",
      ind38BCORegisterAvailableConsistentNotes: "",

      ind39ReadingActivityRegisterStatus: "",
      ind39ReadingActivityRegisterNotes: "",

      ind310BookCaptainSelectedStatus: "",
      ind310BookCaptainSelectedNotes: "",

      ind41TeacherInteractionStatus: "",
      ind41TeacherInteractionNotes: "",

      ind42DiscussionPoints: "",

      schoolStatus: "",

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

  // Get All Overall Indicator
  getAllOverallIndicator = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/overall-indicator",
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      this.setState({ allOverallIndicator: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };
  // Get All Overall Indicator

  // Get All Overall Data for school
  getAllSchoolMonitoring = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/school-monitoring",
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
        allSchoolMonitoringData: response.data,
        isLoading: false,
      });
      console.log(
        "All SchoolMonitoringData Data: ",
        this.state.allSchoolMonitoringData.length
      );
    } catch (error) {
      console.log(error);
    }
  };
  // Get All Overall Data for school

  // Register new book-checkout data
  saveSchoolMonitoring = async () => {
    const newSchoolMonitoring = {
      // General data
      date: this.state.date,
      visitNo: Math.floor(Math.random() * 100),
      fieldOffice: this.state.pickerOffice,
      project: this.state.pickerProject,
      district: this.state.pickerDistrict.name,
      upazilla: this.state.pickerUpazilla.name,
      school: this.state.pickerSchool,
      visitor: this.state.pickerVisitor,
      visitorDesignation: this.state.pickerDesignation,
      visitorOffice: this.state.pickerVisitorOffice,
      lf: this.state.pickerLF.employeeRegId,
      lpo: this.state.pickerLPO.employeeRegId,
      lfName: this.state.pickerLFName.name,
      lpoName: this.state.pickerLPOName.name,
      month: this.state.pickerMonth,
      year: this.state.pickerYear,
      headTeacher: this.state.headTeacher,
      teacherGender: this.state.teacherGender,
      note: this.state.note,

      ind11LFArrivalTimeStatus: this.state.ind11LFArrivalTimeStatus,
      ind11LFArrivalTimeNotes: this.state.ind11LFArrivalTimeNotes,

      ind12ChallanDocumentStatus: this.state.ind12ChallanDocumentStatus,
      ind12ChallanDocumentNotes: this.state.ind12ChallanDocumentNotes,

      ind13VisitorRegisterStatus: this.state.ind13VisitorRegisterStatus,
      ind13VisitorRegisterNotes: this.state.ind13VisitorRegisterNotes,

      ind14RelatedDocumentStatus: this.state.ind14RelatedDocumentStatus,
      ind14RelatedDocumentNotes: this.state.ind14RelatedDocumentNotes,

      ind21WorkbookProvidedStatus: this.state.ind21WorkbookProvidedStatus,
      ind21WorkbookProvidedNotes: this.state.ind21WorkbookProvidedNotes,

      ind22InstructionMaterialStatus: this.state.ind22InstructionMaterialStatus,
      ind22InstructionMaterialNotes: this.state.ind22InstructionMaterialNotes,

      ind23OtherMaterialStatus: this.state.ind23OtherMaterialStatus,
      ind23OtherMaterialNotes: this.state.ind23OtherMaterialNotes,

      ind24ClassOnTimeStatus: this.state.ind24ClassOnTimeStatus,
      ind24ClassOnTimeNotes: this.state.ind24ClassOnTimeNotes,

      ind25TeacherIsTrainedStatus: this.state.ind25TeacherIsTrainedStatus,
      ind25TeacherIsTrainedNotes: this.state.ind25TeacherIsTrainedNotes,

      ind26FollowedRtRInstructionStatus:
        this.state.ind26FollowedRtRInstructionStatus,
      ind26FollowedRtRInstructionNotes:
        this.state.ind26FollowedRtRInstructionNotes,

      ind27StudentTrackingDocumentStatus:
        this.state.ind27StudentTrackingDocumentStatus,
      ind27StudentTrackingDocumentNotes:
        this.state.ind27StudentTrackingDocumentNotes,

      ind31OneTeacherReadingTrainingStatus:
        this.state.ind31OneTeacherReadingTrainingStatus,
      ind31OneTeacherReadingTrainingNotes:
        this.state.ind31OneTeacherReadingTrainingNotes,

      ind32SRMMentionedRoutineStatus: this.state.ind32SRMMentionedRoutineStatus,
      ind32SRMMentionedRoutineNotes: this.state.ind32SRMMentionedRoutineNotes,

      ind33TeacherConductReadingActivityStatus:
        this.state.ind33TeacherConductReadingActivityStatus,
      ind33TeacherConductReadingActivityNotes:
        this.state.ind33TeacherConductReadingActivityNotes,

      ind34BookshelfConditionGoodStatus:
        this.state.ind34BookshelfConditionGoodStatus,
      ind34BookshelfConditionGoodNotes:
        this.state.ind34BookshelfConditionGoodNotes,

      ind35RtRStoryAvailableRegisterUpdatedStatus:
        this.state.ind35RtRStoryAvailableRegisterUpdatedStatus,
      ind35RtRStoryAvailableRegisterUpdatedNotes:
        this.state.ind35RtRStoryAvailableRegisterUpdatedNotes,

      ind36BooksDisplayingStatus: this.state.ind36BooksDisplayingStatus,
      ind36BooksDisplayingNotes: this.state.ind36BooksDisplayingNotes,

      ind37LibraryPosterAvailableStatus:
        this.state.ind37LibraryPosterAvailableStatus,
      ind37LibraryPosterAvailableNotes:
        this.state.ind37LibraryPosterAvailableNotes,

      ind38BCORegisterAvailableConsistentStatus:
        this.state.ind38BCORegisterAvailableConsistentStatus,
      ind38BCORegisterAvailableConsistentNotes:
        this.state.ind38BCORegisterAvailableConsistentNotes,

      ind39ReadingActivityRegisterStatus:
        this.state.ind39ReadingActivityRegisterStatus,
      ind39ReadingActivityRegisterNotes:
        this.state.ind39ReadingActivityRegisterNotes,

      ind310BookCaptainSelectedStatus:
        this.state.ind310BookCaptainSelectedStatus,
      ind310BookCaptainSelectedNotes: this.state.ind310BookCaptainSelectedNotes,

      ind41TeacherInteractionStatus: this.state.ind41TeacherInteractionStatus,
      ind41TeacherInteractionNotes: this.state.ind41TeacherInteractionNotes,

      ind42DiscussionPoints: this.state.ind42DiscussionPoints,

      schoolStatus: this.state.schoolStatus,
    };

    // Validation

    //Check duplicate data
    this.state.duplicateSchoolMonitoringData =
      this.state.allSchoolMonitoringData.filter((item) => {
        return (
          item.date == this.state.date &&
          item.school == this.state.pickerSchool &&
          item.month == this.state.pickerMonth &&
          item.year == this.state.pickerYear
        );
      });

    console.log(
      "Duplicate SchoolMonitoring Data: ",
      this.state.duplicateSchoolMonitoringData.length
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
    } else if (this.state.duplicateSchoolMonitoringData.length > 0) {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Duplicate School Monitoring data !!");
      return;
    } else {
      // Set error message empty
      this.setState({ dateError: "" });

      // Send data to API
      try {
        let response = await fetch(
          "http://118.179.80.51:8080/api/v1/school-monitoring",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newSchoolMonitoring),
          }
        );
        if (response.status >= 200 && response.status < 300) {
          Alert.alert("Alert", "School Monitoring data saved successfully!!!");
          this.getAllSchoolMonitoring();
          this.updateState();
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
        onPress: this.saveSchoolMonitoring,
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
        <View style={{ flexShrink: 1 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 10,
              alignContent: "center",
              textAlign: "center",
              alignSelf: "center",
              marginLeft: 100,
              marginRight: 100,
            }}
          >
            School Monitoring Tool Form
          </Text>
        </View>

        <ScrollView>
          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>Genaral Information :</Text>

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
                    {String(this.state.date.toISOString().slice(0, 10))}
                  </Text>
                  <Button onPress={this.datepicker} title="Select" />
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
                      height: 40,
                      width: 140,
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
                      height: 40,
                      width: 140,
                    }}
                    selectedValue={this.state && this.state.pickerYear}
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
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
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
                      style={{ textAlign: "right", color: "red", fontSize: 16 }}
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
                      console.log(this.state.pickerDistrict.name);
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
                      height: 40,
                      width: 180,
                    }}
                    selectedValue={this.state.pickerLPO}
                    onValueChange={(value) => {
                      this.setState({ pickerLPO: value, pickerLPOName: value });
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
                      height: 40,
                      width: 180,
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
                      height: 40,
                      width: 120,
                    }}
                    selectedValue={this.state.pickerPhase}
                    onValueChange={(value) => {
                      this.setState({ pickerPhase: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"Select"} value={""} />
                    <Picker.Item label={"1"} value={"1"} />
                    <Picker.Item label={"2"} value={"2"} />
                    <Picker.Item label={"3"} value={"3"} />
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
                    <Picker.Item label={"4"} value={"4"} />
                    <Picker.Item label={"5"} value={"5"} />
                    <Picker.Item label={"6"} value={"6"} />
                    <Picker.Item label={"7"} value={"7"} />
                    <Picker.Item label={"8"} value={"8"} /> */}
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
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>নির্দেশনা (Instructions)</Text>
            <Card style={{ padding: 10, margin: 10 }}>
              <Text style={{ padding: 5 }}>
                1. একজন এলপিও প্রতি এলএফ-এর সাথে মাসে কমপক্ষে ১টা সাপোর্ট ভিজিট
                করবেন এবং ১টি মনিটরিং ভিজিট (এলএফ ছাড়া) করবেন। এবং প্রতি তিন
                মাসে তার দায়িত্ব প্রাপ্ত সবগুলো বিদ্যালয় অন্তত একবার ভিজিট করবেন
                এবং প্রতি ভিজিটে এই ফর্মটি পূরণ করবেন।
              </Text>
              <Text style={{ padding: 5 }}>
                2. এলপিওগণ প্রতি ছয় মাসে একবার প্রতি এলএফের সাথে সাপোর্ট ভিজিটের
                সময় ক্রসচেকিংয়ের জন্য বাংলা ক্লাস পর্যবেক্ষণ ফর্ম এবং এসআরএম
                ফর্ম পূরণ করবেন। এরপর এলএফ এর পূরণকৃত ফর্মের সাথে নিজের পূরণকৃত
                ফর্মের বিচ্যুতি নিয়ে আলোচনা করে ফিডব্যাক দিবেন এবং সকল এলএফদের
                সাপোর্ট ভিজিট থেকে প্রাপ্ত ভুলের-ধরনের ভিত্তিতে মাসিক প্রতিবেদনে
                তৈরি করবেন। প্রতি এলপিও তার সাথে সংশ্লিষ্ট এলএফদের সাপোর্ট ভিজিট
                থেকে প্রাপ্ত তথ্যের/বিচ্যুতির ভিত্তিতে প্রফেশনাল ডেভেলপমেন্ট
                (চউ) প্লান করবেন ।
              </Text>
              <Text style={{ padding: 5 }}>
                3. এলপিও সাপোর্ট ভিজিটের দিনও ্ঐ স্কুলের জন্য মনিটরিং ভিজিটের
                ফর্ম পূরণ করবেন । মনিটরিং ভিজিটের দিন -একদিনে ২ টি স্কুল মনিটরিং
                ভিজিট (এলএফ ছাড়া) করবেন এবং ফর্ম পূরণ করে অফিসে সংরক্ষণ করবেন ।
              </Text>
              <Text style={{ padding: 5 }}>
                4. এলপিও তার বিদ্যালয় পর্যবেক্ষণকালে প্রাপ্ত ত্রুটি-বিচ্যুতি এবং
                করণীয় সম্পর্কে প্রদত্ত নির্দেশনা প্রযোজ্য ক্ষেত্রে স্কুলে বা
                অফিসে সংশ্লিষ্ট ডকুমেন্টে তারিখ ও স্বাক্ষর সহ (রেজিস্টার, চালান
                ও অন্যান্য ফাইল) লিপিবদ্ধ করতে হবে ।
              </Text>
              <Text style={{ padding: 5 }}>
                5. প্রতিটি ভিজিট অবশ্যই ভিজিট রেজিষ্টারে লিপিবদ্ধ করতে হবে ।
              </Text>
              <Text style={{ padding: 5 }}>
                6. রুটিনে যেদিন/যখন এসআরএম পিরিয়ড আছে সেদিন/সেসময় শ্রেণিকক্ষ
                পাঠাগার অবশ্যই খোলা রাখতে হবে। এছাড়া প্রতিদিন বাংলা ক্লাসে বা
                স্কুল চলাকালীন সার্বক্ষণিক পাঠাগার খোলা রাখার বিষয়ে শিক্ষকদের
                উৎসাহিত করতে হবে এবং সংশ্লিষ্ট এলএফ ও এলপিওগণ প্রয়োজনীয় পদক্ষেপ
                নিবেন। এক্ষেত্রে, বিদ্যালয়ভিত্তিক পাঠাগার খোলা থাকার দিন/সময়
                সংক্রান্ত হালনাগাদ তথ্য অফিসে সংরক্ষণ করতে হবে ।
              </Text>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>Indicator</Text>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <View
                style={{
                  padding: 5,
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    backgroundColor: "#ADD8E6",
                    fontWeight: "bold",
                    fontSize: 16,
                    alignContent: "center",
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                >
                  Realated documents/inputs: General
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
                      1. The LF arrives on time for the visit/pay visit as per
                      WAP
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={this.state.ind11LFArrivalTimeStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind11LFArrivalTimeStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind11LFArrivalTimeNotes: text,
                            })
                          }
                          value={this.state.ind11LFArrivalTimeNotes + ""}
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
                      2. All challan copies and relevant documents are properly
                      prepared and available
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={this.state.ind12ChallanDocumentStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind12ChallanDocumentStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind12ChallanDocumentNotes: text,
                            })
                          }
                          value={this.state.ind12ChallanDocumentNotes + ""}
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
                      3. Visitor register is available and updated
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={this.state.ind13VisitorRegisterStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind13VisitorRegisterStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind13VisitorRegisterNotes: text,
                            })
                          }
                          value={this.state.ind13VisitorRegisterNotes + ""}
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
                      4. All related documents are available ( MoU, SMC, parents
                      meeting minutes etc.)
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={this.state.ind14RelatedDocumentStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind14RelatedDocumentStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind14RelatedDocumentNotes: text,
                            })
                          }
                          value={this.state.ind14RelatedDocumentNotes + ""}
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
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    backgroundColor: "#ADD8E6",
                    fontWeight: "bold",
                    fontSize: 16,
                    alignContent: "center",
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                >
                  Bangla Class Observation: Instruction
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
                      1. Workbooks are provided to all students for instruction
                      class
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={this.state.ind21WorkbookProvidedStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind21WorkbookProvidedStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind21WorkbookProvidedNotes: text,
                            })
                          }
                          value={this.state.ind21WorkbookProvidedNotes + ""}
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
                      2. All instruction materials delivered by RtR are
                      available in the classroom (letter cards, barakkharik
                      chart, etc.) and displayed properly
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={
                            this.state.ind22InstructionMaterialStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind22InstructionMaterialStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind22InstructionMaterialNotes: text,
                            })
                          }
                          value={this.state.ind22InstructionMaterialNotes + ""}
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
                      3. Children received and are using other materials
                      including khata, pencil, color pencil, eraser, sharpener,
                      paper, etc.
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={this.state.ind23OtherMaterialStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind23OtherMaterialStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind23OtherMaterialNotes: text,
                            })
                          }
                          value={this.state.ind23OtherMaterialNotes + ""}
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
                      4. Class started on time (If Bangla class observed)
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={this.state.ind24ClassOnTimeStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind24ClassOnTimeStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind24ClassOnTimeNotes: text,
                            })
                          }
                          value={this.state.ind24ClassOnTimeNotes + ""}
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
                      5. The teacher conducting the Bangla class is trained by
                      RtR (If Bangla class observed)
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={this.state.ind25TeacherIsTrainedStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind25TeacherIsTrainedStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind25TeacherIsTrainedNotes: text,
                            })
                          }
                          value={this.state.ind25TeacherIsTrainedNotes + ""}
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
                      6. Teacher is following RtR instructional plan and using
                      relevant RtR teaching materials in class (i.e. workbook/
                      TG/ Barakkharik chart/ letter card, etc.) (If Bangla class
                      observed)
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={
                            this.state.ind26FollowedRtRInstructionStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind26FollowedRtRInstructionStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind26FollowedRtRInstructionNotes: text,
                            })
                          }
                          value={
                            this.state.ind26FollowedRtRInstructionNotes + ""
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
                      7. Student tracking related documents are available
                      (Classroom Record & Analysis sheet & Individual Score
                      sheets)
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={
                            this.state.ind27StudentTrackingDocumentStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind27StudentTrackingDocumentStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind27StudentTrackingDocumentNotes: text,
                            })
                          }
                          value={
                            this.state.ind27StudentTrackingDocumentNotes + ""
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
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    backgroundColor: "#ADD8E6",
                    fontWeight: "bold",
                    fontSize: 16,
                    alignContent: "center",
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                >
                  Classroom Observation: Library
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
                      1. One teacher per grade level has received Reading
                      Activity training
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={
                            this.state.ind31OneTeacherReadingTrainingStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind31OneTeacherReadingTrainingStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind31OneTeacherReadingTrainingNotes: text,
                            })
                          }
                          value={
                            this.state.ind31OneTeacherReadingTrainingNotes + ""
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
                      2. SRM period is mentioned in the class routine
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={
                            this.state.ind32SRMMentionedRoutineStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind32SRMMentionedRoutineStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind32SRMMentionedRoutineNotes: text,
                            })
                          }
                          value={this.state.ind32SRMMentionedRoutineNotes + ""}
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
                      3. Teacher is conducting Reading activity as per routine
                      and RtR teaching plan (If Re
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={
                            this.state.ind33TeacherConductReadingActivityStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind33TeacherConductReadingActivityStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind33TeacherConductReadingActivityNotes: text,
                            })
                          }
                          value={
                            this.state.ind33TeacherConductReadingActivityNotes +
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
                      4. Bookshelf is kept in a suitable place as per guideline
                      and is found in a good condition
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={
                            this.state.ind34BookshelfConditionGoodStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind34BookshelfConditionGoodStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind34BookshelfConditionGoodNotes: text,
                            })
                          }
                          value={
                            this.state.ind34BookshelfConditionGoodNotes + ""
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
                      5. RtR provided story books are available and Book
                      accession register is updated (as per challan)
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={
                            this.state
                              .ind35RtRStoryAvailableRegisterUpdatedStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind35RtRStoryAvailableRegisterUpdatedStatus:
                                value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind35RtRStoryAvailableRegisterUpdatedNotes: text,
                            })
                          }
                          value={
                            this.state
                              .ind35RtRStoryAvailableRegisterUpdatedNotes + ""
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
                      6. Books are displaying (according to the guideline) (All
                      books are organized by reading level with level displayed
                      on cover, each level is displayed together and the
                      different levels are easy to locate. As many books as
                      possible are displayed so the front covers are visible.)
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={this.state.ind36BooksDisplayingStatus}
                          onValueChange={(value) => {
                            this.setState({
                              ind36BooksDisplayingStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind36BooksDisplayingNotes: text,
                            })
                          }
                          value={this.state.ind36BooksDisplayingNotes + ""}
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
                      7. RtR supplied Library posters are available and
                      displayed properly (Book checkout rule poster, Library
                      rules & book care poster)
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={
                            this.state.ind37LibraryPosterAvailableStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind37LibraryPosterAvailableStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind37LibraryPosterAvailableNotes: text,
                            })
                          }
                          value={
                            this.state.ind37LibraryPosterAvailableNotes + ""
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
                      8. Book check-out register is available and Book check-out
                      data found consistent (please cross check with reported
                      data of last month in a sample basis)
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={
                            this.state.ind38BCORegisterAvailableConsistentStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind38BCORegisterAvailableConsistentStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind38BCORegisterAvailableConsistentNotes: text,
                            })
                          }
                          value={
                            this.state
                              .ind38BCORegisterAvailableConsistentNotes + ""
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
                      9. Reading Activity Register is available.
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={
                            this.state.ind39ReadingActivityRegisterStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind39ReadingActivityRegisterStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind39ReadingActivityRegisterNotes: text,
                            })
                          }
                          value={
                            this.state.ind39ReadingActivityRegisterNotes + ""
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
                      10. Book Captain is selected, oriented and functional
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={
                            this.state.ind310BookCaptainSelectedStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind310BookCaptainSelectedStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind310BookCaptainSelectedNotes: text,
                            })
                          }
                          value={this.state.ind310BookCaptainSelectedNotes + ""}
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
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    backgroundColor: "#ADD8E6",
                    fontWeight: "bold",
                    fontSize: 16,
                    alignContent: "center",
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                >
                  Others
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
                      1. Was there any interaction with Headteacher/available
                      Bangla/SRM teacher? (What was the discussion about? )
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
                        <Text>Status: </Text>
                        <Picker
                          style={{
                            height: 40,
                            width: 120,
                          }}
                          selectedValue={
                            this.state.ind41TeacherInteractionStatus
                          }
                          onValueChange={(value) => {
                            this.setState({
                              ind41TeacherInteractionStatus: value,
                            });

                            // Set school status

                            // Set school status
                          }}
                          itemStyle={{ color: "white" }}
                        >
                          <Picker.Item label={"Select"} value={""} />
                          <Picker.Item label={"Yes"} value={"Yes"} />
                          <Picker.Item label={"No"} value={"No"} />
                        </Picker>
                      </View>
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Remarks (if no): </Text>
                        <TextInput
                          style={{
                            height: 50,
                            width: 230,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={7}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind41TeacherInteractionNotes: text,
                            })
                          }
                          value={this.state.ind41TeacherInteractionNotes + ""}
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
                      2. Discussion pionts or any other issue? Please specify
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
                      <View style={{ flex: 2, padding: 2 }}>
                        <Text>Details :</Text>
                        <TextInput
                          style={{
                            height: 150,
                            width: 350,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          multiline
                          numberOfLines={20}
                          keyboardType="default"
                          placeholder=""
                          editable={true}
                          onChangeText={(text) =>
                            this.setState({
                              ind42DiscussionPoints: text,
                            })
                          }
                          value={this.state.ind42DiscussionPoints + ""}
                        ></TextInput>
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>
          </View>

          {/* <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>আলোচনা</Text>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <Text style={{ backgroundColor: "#ADD8E6", fontWeight: "bold" }}>
                প্রধান শিক্ষকের সাথে আলোচনার জন্য গুরুত্বপূর্ণ কিছু বিষয়ঃ
              </Text>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      বিদ্যালয় ভালো অবস্থায় আছে এমন এমন ২/৩ টি ইনডিকেটর (
                      নম্বরসহ ) উল্লেখ করুন ।
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

                        // Set school status
                        if (
                          this.state.ind1AllTeacherTrainedStatus === "Yes" &&
                          this.state.ind2FollowedRTRTrainingSixtyStatus ===
                            "Yes" &&
                          this.state.ind3RTRMaterialStatus === "Yes" &&
                          this.state.ind4InfluenceToBCOFiftyStatus === "Yes" &&
                          this.state.ind5PrePrimaryBanglaSRMSeventyStatus ===
                            "Yes" &&
                          this.state.ind6BanglaClassResultFortyStatus ===
                            "Yes" &&
                          this.state.ind7BanglaSRMStatus === "Yes" &&
                          this.state.ind8SMCMeetingStatus === "Yes" &&
                          this.state.ind9ReadingMaterialStatus === "Yes" &&
                          this.state.ind10FollowedRtRTrainingEightyStatus ===
                            "Yes" &&
                          this.state.ind11InfluenceToBCOSeventyStatus ===
                            "Yes" &&
                          this.state.ind12PrePrimaryBanglaSRMEightyStatus ===
                            "Yes" &&
                          this.state.ind13BanglaClassResultSixtyStatus ===
                            "Yes" &&
                          this.state.ind14MeetingDiscussionStatus === "Yes"
                        ) {
                          this.setState({
                            schoolStatus: "Priority 3",
                          });
                        } else if (
                          this.state.ind1AllTeacherTrainedStatus === "Yes" &&
                          this.state.ind2FollowedRTRTrainingSixtyStatus ===
                            "Yes" &&
                          this.state.ind3RTRMaterialStatus === "Yes" &&
                          this.state.ind4InfluenceToBCOFiftyStatus === "Yes" &&
                          this.state.ind5PrePrimaryBanglaSRMSeventyStatus ===
                            "Yes" &&
                          this.state.ind6BanglaClassResultFortyStatus ===
                            "Yes" &&
                          this.state.ind7BanglaSRMStatus === "Yes" &&
                          this.state.ind8SMCMeetingStatus === "Yes"
                        ) {
                          this.setState({
                            schoolStatus: "Priority 2",
                          });
                        } else {
                          this.setState({
                            schoolStatus: "Priority 1",
                          });
                        }
                        // Set school status
                      }}
                      itemStyle={{ color: "white" }}
                    >
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
                      {this.state.allOverallIndicator.map((item) => {
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
                      }}
                      itemStyle={{ color: "white" }}
                    >
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
                      {this.state.allOverallIndicator.map((item) => {
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
                      {this.state.allOverallIndicator.map((item) => {
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
                      ২/৩ টি নম্বরসহ উল্লেখ করুন যেখানে প্রধান শিক্ষক উন্নয়নের
                      জন্য সহায়তা করতে পারেন । কিভাবে তিনি উন্নয়ন সহায়তা করবেন
                      সেটি উল্লেখ করুন ।
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
                      {this.state.allOverallIndicator.map((item) => {
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
                      {this.state.allOverallIndicator.map((item) => {
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
                      যে কাজ গুলো করার জন্য প্রধান শিক্ষক একমত হয়েছেন সেটি
                      উল্লেখ করুন ।
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
          </View> */}

          {/* <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>বিদ্যালয়ের অবস্থা</Text>
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
                      ইনডিকেটর অনুযায়ী বিদ্যালয়ের অবস্থা
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
                      {this.state.schoolStatus}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          </View> */}

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

              //   !this.state.agreedStatement2
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
