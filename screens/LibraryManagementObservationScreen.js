//  Author: Mohammad Jihad Hossain
//  Create Date: 17/08/2021
//  Modify Date: 07/02/2023
//  Description: Library management observation screen component

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
import { divisions, districts, upazillas, unions } from "bd-geojs";
import { Card } from "react-native-shadow-cards";

import DateTimePicker from "@react-native-community/datetimepicker";

const { width, height } = Dimensions.get("window");

export default class LibraryManagementObservationScreen extends React.Component {
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

      note: "",
      // General data

      // Last visit topic
      pickerFollowup1: "",
      pickerFollowup2: "",
      pickerFollowup3: "",
      // Last visit topic

      // Indicator 1
      pickerIsTrainedAllTeacher: "",
      pickerIsTrainedSRMTeacher: "",
      pickerIsTrainedHeadTeacher: "",
      // Indicator 1

      // Indicator 2
      pickerClassroomSuitableSRM: "",
      pickerClassroomDoorWindowLock: "",
      pickerClassroomSafeClean: "",
      // Indicator 2

      // Indicator 3
      pickerBookselfUseable: "",
      pickerBookselfAccessible: "",
      pickerBookselfEnvironmentProtected: "",
      pickerBookselfTableCondition: "",
      // Indicator 3

      // Indicator 4
      pickerBookRegisterUpdated: "",
      // Indicator 4

      // Indicator 5
      pickerBookselfOrganized: "",
      pickerBookselfBookOrganizedOpen: "",
      pickerBookselfBookLevelViewable: "",
      pickerBookselfBookAccessible: "",
      // Indicator 5

      // Indicator 6
      pickerPrintRichDisplayed: "",
      // Indicator 6

      // Indicator 7
      pickerBookCheckoutFunctional: "",
      pickerBookCheckoutProcedureDisplayed: "",
      pickerBookCheckoutRegisterUsable: "",
      pickerBookCheckoutRegisterUpdated: "",
      pickerBookCheckoutPendingBooklist: "",
      // Indicator 7

      // Indicator 8
      pickerSRMClassRoutine: "",
      pickerSRMClassWeekly: "",
      pickerDailyBookCheckoutOpportunity: "",
      // Indicator 8

      // Indicator 9
      pickerSRMRegisterUpdated: "",
      // Indicator 9

      // Indicator 10
      pickerParentsMeeting: "",
      // Indicator 10

      // Indicator 11
      pickerReadFestival: "",
      // Indicator 11

      // Indicator 12
      pickerSustainabilityPlan: "",
      pickerCollectivePlan: "",
      pickerResponsibilityPlan: "",
      // Indicator 12

      // Discussion topic
      pickerBestPracticeIndicator1: "",
      bestPracticeIndicator1Details: "",
      pickerBestPracticeIndicator2: "",
      bestPracticeIndicator2Details: "",
      pickerBestPracticeIndicator3: "",
      bestPracticeIndicator3Details: "",

      pickerCoachingSupportIndicator1: "",
      coachingSupportIndicator1Details: "",
      pickerCoachingSupportIndicator2: "",
      coachingSupportIndicator2Details: "",

      agreedStatement1: "",
      agreedStatement2: "",
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
    this.getAllSchool();
    this.getAllEmployee();
    this.getAllDesignation();
    this.getAllLibraryIndicator();
    // this.getAllProject();
    // this.getAllOffice();
    // this.getAllTeacher();
    this.getAllLibraryObservation();
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

      note: "",
      // General data

      // Last visit topic
      pickerFollowup1: "",
      pickerFollowup2: "",
      pickerFollowup3: "",
      // Last visit topic

      // Indicator 1
      pickerIsTrainedAllTeacher: "",
      pickerIsTrainedSRMTeacher: "",
      pickerIsTrainedHeadTeacher: "",
      // Indicator 1

      // Indicator 2
      pickerClassroomSuitableSRM: "",
      pickerClassroomDoorWindowLock: "",
      pickerClassroomSafeClean: "",
      // Indicator 2

      // Indicator 3
      pickerBookselfUseable: "",
      pickerBookselfAccessible: "",
      pickerBookselfEnvironmentProtected: "",
      pickerBookselfTableCondition: "",
      // Indicator 3

      // Indicator 4
      pickerBookRegisterUpdated: "",
      // Indicator 4

      // Indicator 5
      pickerBookselfOrganized: "",
      pickerBookselfBookOrganizedOpen: "",
      pickerBookselfBookLevelViewable: "",
      pickerBookselfBookAccessible: "",
      // Indicator 5

      // Indicator 6
      pickerPrintRichDisplayed: "",
      // Indicator 6

      // Indicator 7
      pickerBookCheckoutFunctional: "",
      pickerBookCheckoutProcedureDisplayed: "",
      pickerBookCheckoutRegisterUsable: "",
      pickerBookCheckoutRegisterUpdated: "",
      pickerBookCheckoutPendingBooklist: "",
      // Indicator 7

      // Indicator 8
      pickerSRMClassRoutine: "",
      pickerSRMClassWeekly: "",
      pickerDailyBookCheckoutOpportunity: "",
      // Indicator 8

      // Indicator 9
      pickerSRMRegisterUpdated: "",
      // Indicator 9

      // Indicator 10
      pickerParentsMeeting: "",
      // Indicator 10

      // Indicator 11
      pickerReadFestival: "",
      // Indicator 11

      // Indicator 12
      pickerSustainabilityPlan: "",
      pickerCollectivePlan: "",
      pickerResponsibilityPlan: "",
      // Indicator 12

      // Discussion topic
      pickerBestPracticeIndicator1: "",
      bestPracticeIndicator1Details: "",
      pickerBestPracticeIndicator2: "",
      bestPracticeIndicator2Details: "",
      pickerBestPracticeIndicator3: "",
      bestPracticeIndicator3Details: "",

      pickerCoachingSupportIndicator1: "",
      coachingSupportIndicator1Details: "",
      pickerCoachingSupportIndicator2: "",
      coachingSupportIndicator2Details: "",

      agreedStatement1: "",
      agreedStatement2: "",
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
        }
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
        "http://118.179.80.51:8080/api/v1/library-observations",
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
      date: this.state.date,
      office: this.state.pickerOffice,
      project: this.state.pickerProject,
      district: this.state.pickerDistrict.name,
      upazilla: this.state.pickerUpazilla.name,
      visitNo: this.state.visitNo,
      visitor: this.state.pickerVisitor,
      visitorDesignation: this.state.pickerDesignation,
      visitorOffice: this.state.pickerVisitorOffice,
      lpo: this.state.pickerLPO.employeeRegId,
      lf: this.state.pickerLF.employeeRegId,
      lfName: this.state.pickerLFName.name,
      lpoName: this.state.pickerLPOName.name,
      school: this.state.pickerSchool,
      month: this.state.pickerMonth,
      year: this.state.pickerYear,

      note: this.state.note,

      lastFollowupIndicator1: this.state.pickerFollowup1,
      lastFollowupIndicator2: this.state.pickerFollowup2,
      lastFollowupIndicator3: this.state.pickerFollowup3,

      ind1IsTrainedAllTeacher: this.state.pickerIsTrainedAllTeacher,
      ind11IsTrainedSRMTeacherIncharge: this.state.pickerIsTrainedSRMTeacher,
      ind12IsTrainedHeadTeacher: this.state.pickerIsTrainedHeadTeacher,

      ind2ClassroomSuitableSRM: this.state.pickerClassroomSuitableSRM,
      ind21ClassroomDoorWindowLock: this.state.pickerClassroomDoorWindowLock,
      ind22ClassroomSafeClean: this.state.pickerClassroomSafeClean,

      ind3BookselfUseable: this.state.pickerBookselfUseable,
      ind31BookselfAccessible: this.state.pickerBookselfAccessible,
      ind32BookselfEnvironmentProtected:
        this.state.pickerBookselfEnvironmentProtected,
      ind33BookselfTableCondition: this.state.pickerBookselfTableCondition,

      ind4BookRegisterUpdated: this.state.pickerBookRegisterUpdated,

      ind5BookselfOrganized: this.state.pickerBookselfOrganized,
      ind51BookselfBookOrganizedOpen:
        this.state.pickerBookselfBookOrganizedOpen,
      ind52BookselfBookLevelViewable:
        this.state.pickerBookselfBookLevelViewable,
      ind53BookselfBookAccessible: this.state.pickerBookselfBookAccessible,

      ind6PrintRichDisplayed: this.state.pickerPrintRichDisplayed,

      ind7BookCheckoutFunctional: this.state.pickerBookCheckoutFunctional,
      ind71BookCheckoutProcedureDisplayed:
        this.state.pickerBookCheckoutProcedureDisplayed,
      ind72BookCheckoutRegisterUsable:
        this.state.pickerBookCheckoutRegisterUsable,
      ind73BookCheckoutRegisterUpdated:
        this.state.pickerBookCheckoutRegisterUpdated,
      ind74BookCheckoutPendingBooklist:
        this.state.pickerBookCheckoutPendingBooklist,

      ind8SRMClassRoutine: this.state.pickerSRMClassRoutine,
      ind81SRMClassWeekly: this.state.pickerSRMClassWeekly,
      ind82DailyBookCheckoutOpportunity:
        this.state.pickerDailyBookCheckoutOpportunity,

      ind9SRMRegisterUpdated: this.state.pickerSRMRegisterUpdated,

      ind10ParentsMeeting: this.state.pickerParentsMeeting,

      ind11ReadFestival: this.state.pickerReadFestival,

      ind12SustainabilityPlan: this.state.pickerSustainabilityPlan,
      ind121CollectivePlan: this.state.pickerCollectivePlan,
      ind122ResponsibilityPlan: this.state.pickerResponsibilityPlan,

      bestPracticeIndicator1: this.state.pickerBestPracticeIndicator1,
      bestPracticeIndicator1Details: this.state.bestPracticeIndicator1Details,
      bestPracticeIndicator2: this.state.pickerBestPracticeIndicator2,
      bestPracticeIndicator2Details: this.state.bestPracticeIndicator2Details,
      bestPracticeIndicator3: this.state.pickerBestPracticeIndicator3,
      bestPracticeIndicator3Details: this.state.bestPracticeIndicator3Details,

      coachingSupportIndicator1: this.state.pickerCoachingSupportIndicator1,
      coachingSupportIndicator1Details:
        this.state.coachingSupportIndicator1Details,
      coachingSupportIndicator2: this.state.pickerCoachingSupportIndicator2,
      coachingSupportIndicator2Details:
        this.state.coachingSupportIndicator2Details,

      agreedStatement1: this.state.agreedStatement1,
      agreedStatement2: this.state.agreedStatement2,

      libraryStatus: this.state.libraryStatus,
    };

    // Check duplicate data
    this.state.duplicateLibraryObservation =
      this.state.allLibraryObservationData.filter((item) => {
        return (
          item.visitNo == this.state.visitNo &&
          item.school == this.state.pickerSchool &&
          item.month == this.state.pickerMonth &&
          item.year == this.state.pickerYear
        );
      });

    console.log(
      "Duplicate LibraryObservation Data: ",
      this.state.duplicateLibraryObservation.length
    );
    // Check duplicate data

    if (this.state.date === "") {
      this.setState({ dateError: "Date can not be empty" });
      Alert.alert("Alert", "Date can not be empty");
      return;
    } else if (this.state.pickerOffice === "") {
      this.setState({ fieldOfficeError: "Field office can not be empty" });
      Alert.alert("Alert", "Field office can not be empty");
      return;
    } else if (this.state.pickerProject === "") {
      this.setState({ projectError: "Project can not be empty" });
      Alert.alert("Alert", "Project can not be empty");
      return;
    } else if (this.state.pickerDistrict === "") {
      this.setState({ districtError: "District can not be empty" });
      Alert.alert("Alert", "District can not be empty");
      return;
    } else if (this.state.pickerUpazilla === "") {
      this.setState({ upazillaError: "Upazilla can not be empty" });
      Alert.alert("Alert", "Upazilla can not be empty");
      return;
    } else if (this.state.pickerVisitor === "") {
      this.setState({ visitorNameError: "Visitor can not be empty" });
      Alert.alert("Alert", "Visitor can not be empty");
      return;
    } else if (this.state.pickerDesignation === "") {
      this.setState({
        visitorDesignationError: "Designation can not be empty",
      });
      Alert.alert("Alert", "Designation can not be empty");
      return;
    } else if (this.state.pickerVisitorOffice === "") {
      this.setState({ visitorOfficeError: "Visitor office can not be empty" });
      Alert.alert("Alert", "Visitor office can not be empty");
      return;
    } else if (this.state.pickerLPO === "") {
      this.setState({ lpoError: "LPO can not be empty" });
      Alert.alert("Alert", "LPO can not be empty");
      return;
    } else if (this.state.pickerLF === "") {
      this.setState({ lfError: "LF can not be empty" });
      Alert.alert("Alert", "LF can not be empty");
      return;
    } else if (this.state.pickerSchool === "") {
      this.setState({ schoolError: "School can not be empty" });
      Alert.alert("Alert", "School can not be empty");
      return;
    } else if (this.state.pickerHeadTeacher === "") {
      this.setState({ headTeacherError: "Head teacher can not be empty" });
      Alert.alert("Alert", "Head teacher can not be empty");
      return;
    } else if (this.state.pickerGender === "") {
      this.setState({ genderError: "Gender can not be empty" });
      Alert.alert("Alert", "Gender can not be empty");
      return;
    } else if (this.state.pickerMonth === "") {
      this.setState({ monthError: "Month can not be empty" });
      Alert.alert("Alert", "Month can not be empty");
      return;
    } else if (this.state.pickerYear === "") {
      this.setState({ yearError: "Year can not be empty" });
      Alert.alert("Alert", "Year can not be empty");
      return;
    } else if (this.state.duplicateLibraryObservation.length > 0) {
      Alert.alert("Alert", "Data already inserted and can't be duplicate");
      return;
    } else {
      this.setState({
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
      });

      try {
        let response = await fetch(
          "http://118.179.80.51:8080/api/v1/library-observations",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newLibraryObservation),
          }
        );
        if (response.status >= 200 && response.status < 300) {
          Alert.alert("Library observation data saved successfully!!!");
          this.getAllLibraryObservation();
          this.updateState();
        } else {
          Alert.alert("Alert", "Error there !!!");
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

  render() {
    // All data to save
    const { show, date, mode, libraryStatus } = this.state;
    // All data to save

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
            শ্রেণিকক্ষ পাঠাগার পর্যবেক্ষণ ফরম
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 50,
            marginLeft: 100,
            marginRight: 100,
          }}
        >
          (এলএফ-দের জন্য)
        </Text>
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
                    selectedValue={this.state && this.state.pickerMonth}
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
                    selectedValue={this.state && this.state.pickerYear}
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
                  {/* <Text style={{ color: "red" }}>
                    {this.state.headTeacherError}
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
                    selectedValue={this.state && this.state.pickerUpazilla}
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
                      দায়িত্ব প্রাপ্ত এলপিও এর নামঃ
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
                      this.setState({ pickerLPO: value, pickerLPOName: value });
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
                      দায়িত্ব প্রাপ্ত এলএফ এর নামঃ
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
                    selectedValue={this.state && this.state.pickerLF}
                    onValueChange={(value) => {
                      this.setState({ pickerLF: value, pickerLFName: value });
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
                    selectedValue={this.state && this.state.pickerSchool}
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
                          this.state.allLibraryObservationData.filter(
                            (item) => {
                              return (
                                item.visitNo ===
                                  parseInt(parseInt(this.state.visitNo) - 1) &&
                                item.school === this.state.pickerSchool &&
                                item.project === this.state.pickerProject &&
                                item.year === this.state.pickerYear
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
                    selectedValue={this.state && this.state.pickerVisitorOffice}
                    onValueChange={(value) => {
                      this.setState({ pickerVisitorOffice: value });
                      console.log("preMonthData: " + this.state.preMonthData);
                      if (this.state.preMonthData.length > 0) {
                        const followup1 = this.state.preMonthData
                          .map((item) => {
                            return item.coachingSupportIndicator1;
                          })
                          .toString();

                        const followup2 = this.state.preMonthData
                          .map((item) => {
                            return item.coachingSupportIndicator2;
                          })
                          .toString();
                        console.log("followup1 :" + followup1);
                        this.setState({ pickerFollowup1: followup1 });
                        this.setState({ pickerFollowup2: followup2 });
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
                ১ প্রধান ইনডিকেটরের অধীন সকল সাব-ইনডিকেটর "Yes" হলে প্রধান
                ইনডিকেটরটি "Yes" হবে ।
              </Text>
              <Text style={{ padding: 5 }}>
                ২. পাঠাগার সংক্রান্ত ২-৩ টি ভালো দিক উল্লেখ করুন।
              </Text>
              <Text style={{ padding: 5 }}>
                ৩. প্রথম যে ২-৩ টি ইনডিকেটরের উত্তর "No" হয়েছে তার আলোকে সহায়তার
                জন্য অগ্রাধিকারভিত্তিক ইনডিকেটর উল্লেখ করুন ।
              </Text>
              <Text style={{ padding: 5 }}>
                ৪. শ্রেণিকক্ষ পাঠাগারের সমস্যা নিয়ে "No" হলে করনীয় কলামে
                উল্লেখিত ব্যক্তি/ব্যক্তিবর্গের সাথে আলোচNo করুন।
              </Text>
              <Text style={{ padding: 5 }}>
                ৫ রুম টু রিড থেকে কোনো পদক্ষেপ গ্রহণের প্রয়োজন হলে উল্লেখ করুন
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
                      value={this.state.pickerFollowup1 + ""}
                    ></TextInput>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ padding: 5 }}>
                    <Text>২.</Text>
                    {/* <Picker
                      style={{
                        height: 40,
                        width: 150,
                      }}
                      selectedValue={this.state && this.state.pickerFollowup2}
                      onValueChange={(value) => {
                        this.setState({ pickerFollowup2: value });
                      }}
                      itemStyle={{ color: "white" }}
                    >
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
                      {this.state.allLibraryIndicator.map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.indicatorDetail}
                            value={item.indicatorDetail}
                          />
                        );
                      })}
                    </Picker> */}
                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      value={this.state.pickerFollowup2 + ""}
                    ></TextInput>
                  </View>
                </View>
                {/* <View style={{ flex: 1 }}>
                  <View style={{ padding: 5 }}>
                    <Text>৩.</Text>
                    <Picker
                      style={{
                        height: 40,
                        width: 150,
                      }}
                      selectedValue={this.state && this.state.pickerFollowup3}
                      onValueChange={(value) => {
                        this.setState({ pickerFollowup3: value });
                      }}
                      itemStyle={{ color: "white" }}
                    >
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
                      {this.state.allLibraryIndicator.map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.indicatorDetail}
                            value={item.indicatorDetail}
                          />
                        );
                      })}
                    </Picker>
                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      value={this.state.pickerFollowup3 + ""}
                    ></TextInput>
                  </View>
                </View> */}
              </View>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>ইনডিকেটর</Text>
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
              <Text
                style={{
                  backgroundColor: "#ADD8E6",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                প্রাইওরিটি এরিয়া -১ঃ উন্নয়নশীল
              </Text>
              <Text
                style={{
                  backgroundColor: "#ADD8E6",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                (১-৭ পর্যন্ত সবগুলো প্রধান সূচক "Yes" না হওয়া পর্যন্ত বিদ্যালয়ের
                শ্রেণি পাঠাগারগুলো "উন্নয়নশীল" হিসেবে গণ্য হবে)
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
                    ১. বিদ্যালয়ের সংশ্লিষ্ট শিক্ষক পাঠাগার ব্যবস্থাপনা বিষয়ে
                    প্রশিক্ষণে অংশগ্রহণ করেছেন
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
                      <TextInput
                        style={styles.inputs}
                        placeholder=""
                        value={this.state.pickerIsTrainedAllTeacher}
                        underlineColorAndroid="transparent"
                        editable={false}
                        selectTextOnFocus={false}
                      />
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
                    ১.১ পাঠাগার বাবস্থাপনার জন্য পর্যবেক্ষণকৃত শ্রেণিতে একজন
                    প্রশিক্ষণ প্রাপ্ত লাইব্রেরি শিক্ষক দায়িত্ব প্রাপ্ত আছেন
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
                        selectedValue={
                          this.state && this.state.pickerIsTrainedSRMTeacher
                        }
                        onValueChange={(value) => {
                          this.setState({
                            pickerIsTrainedSRMTeacher: value,
                            pickerIsTrainedAllTeacher: value,
                          });

                          if (
                            value === "Yes" &&
                            this.state.pickerIsTrainedHeadTeacher === "Yes"
                          ) {
                            this.setState({
                              pickerIsTrainedAllTeacher: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerIsTrainedAllTeacher: "No",
                            });
                          }
                          //Alert.alert(this.state.pickerIsTrainedAllTeacher);

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
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
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
                    ১.২ বিদ্যালয়ের প্রধান শিক্ষক রুম টু রিড পরিচালিত পাঠাগার
                    ব্যবস্থাপনা প্রশিক্ষণে অংশগ্রহণ করেছেন
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
                        selectedValue={
                          this.state && this.state.pickerIsTrainedHeadTeacher
                        }
                        onValueChange={(value) => {
                          this.setState({
                            pickerIsTrainedHeadTeacher: value,
                          });

                          if (
                            value === "Yes" &&
                            this.state.pickerIsTrainedSRMTeacher === "Yes"
                          ) {
                            this.setState({
                              pickerIsTrainedAllTeacher: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerIsTrainedAllTeacher: "No",
                            });
                          }
                          //Alert.alert(this.state.pickerIsTrainedAllTeacher);

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
                    ২. পাঠাগার কার্যক্রম পরিচালনার জন্য শ্রেণীকক্ষটি উপযোগী
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
                      <TextInput
                        style={styles.inputs}
                        placeholder=""
                        value={this.state.pickerClassroomSuitableSRM}
                        underlineColorAndroid="transparent"
                        editable={false}
                        selectTextOnFocus={false}
                      />
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষকের সাথে আলোচনা এবং LPO-কে অবহিত করুন ।
                        সহায়তা প্রয়োজন হলে মাসিক প্রতিবেদন উল্লেখ করুন
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
                    ২.১ শ্রেণীকক্ষের দরজা-জানালা ভালো অবস্থায় এবং তালা দেওয়ার
                    ব্যবস্থা আছে
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
                        selectedValue={
                          this.state && this.state.pickerClassroomDoorWindowLock
                        }
                        onValueChange={(value) => {
                          this.setState({
                            pickerClassroomDoorWindowLock: value,
                            pickerClassroomSuitableSRM: value,
                          });

                          if (
                            value === "Yes" &&
                            this.state.pickerClassroomSafeClean === "Yes"
                          ) {
                            this.setState({
                              pickerClassroomSuitableSRM: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerClassroomSuitableSRM: "No",
                            });
                          }

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষকের সাথে আলোচনা এবং LPO-কে অবহিত করুন ।
                        সহায়তা প্রয়োজন হলে মাসিক প্রতিবেদন উল্লেখ করুন
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
                    ২.২ শিক্ষার্থীদের বসার জন্য শ্রেণীকক্ষ নিরাপদ ও পরিষ্কার
                    (ফাটল, গর্ত ইত্যাদি সমস্যা নাই)
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
                        selectedValue={
                          this.state && this.state.pickerClassroomSafeClean
                        }
                        onValueChange={(value) => {
                          this.setState({ pickerClassroomSafeClean: value });

                          if (
                            value === "Yes" &&
                            this.state.pickerClassroomDoorWindowLock === "Yes"
                          ) {
                            this.setState({
                              pickerClassroomSuitableSRM: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerClassroomSuitableSRM: "No",
                            });
                          }

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষকের সাথে আলোচনা এবং LPO-কে অবহিত করুন ।
                        সহায়তা প্রয়োজন হলে মাসিক প্রতিবেদন উল্লেখ করুন
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
                    ৩. পাঠাগার বুক শেলফটি ঠিকমত স্থাপন করা হয়েছে এবং ভালো
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
                      <TextInput
                        style={styles.inputs}
                        placeholder=""
                        value={this.state.pickerBookselfUseable}
                        underlineColorAndroid="transparent"
                        editable={false}
                        selectTextOnFocus={false}
                      />
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যনুয়ালের আলোকে আরও ভালো কোনো
                        স্থানে ঠিকমত বুক-শেলফটি স্থাপন করা যায় কিনা এ বিষয়ে
                        পাঠাগারের প্রধান শিক্ষকের সাথে আলোচনা করুন । প্রয়োজনে
                        স্থাপন করে দেখান ।
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
                    ৩.১ বুক শেলফের আশে পাশে পর্যাপ্ত জায়গা রয়েছে যাতে
                    শিক্ষার্থীরা সহজে চলাচল করতে পারে, সহজে বই নিতে পারে এবং বই
                    পড়ার কাজে অংশ নিতে পারে
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
                        selectedValue={
                          this.state && this.state.pickerBookselfAccessible
                        }
                        onValueChange={(value) => {
                          this.setState({
                            pickerBookselfAccessible: value,
                            pickerBookselfUseable: value,
                          });

                          if (
                            value === "Yes" &&
                            this.state.pickerBookselfEnvironmentProtected ===
                              "Yes" &&
                            this.state.pickerBookselfTableCondition === "Yes"
                          ) {
                            this.setState({
                              pickerBookselfUseable: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerBookselfUseable: "No",
                            });
                          }

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যনুয়ালের আলোকে আরও ভালো কোনো
                        স্থানে ঠিকমত বুক-শেলফটি স্থাপন করা যায় কিনা এ বিষয়ে
                        পাঠাগারের প্রধান শিক্ষকের সাথে আলোচনা করুন । প্রয়োজনে
                        স্থাপন করে দেখান ।
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
                    ৩.২ বুক শেলফ এমন জায়গায় স্থাপন করা হয়েছে যার ফলে বইয়ের উপর
                    সরাসরি সূর্যের আলো বা বৃষ্টি পড়ে না কিংবা সরাসরি জানালার
                    সম্মুখে নয়
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
                        selectedValue={
                          this.state &&
                          this.state.pickerBookselfEnvironmentProtected
                        }
                        onValueChange={(value) => {
                          this.setState({
                            pickerBookselfEnvironmentProtected: value,
                          });

                          if (
                            value === "Yes" &&
                            this.state.pickerBookselfAccessible === "Yes" &&
                            this.state.pickerBookselfTableCondition
                          ) {
                            this.setState({
                              pickerBookselfUseable: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerBookselfUseable: "No",
                            });
                          }

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যনুয়ালের আলোকে আরও ভালো কোনো
                        স্থানে ঠিকমত বুক-শেলফটি স্থাপন করা যায় কিনা এ বিষয়ে
                        পাঠাগারের প্রধান শিক্ষকের সাথে আলোচনা করুন । প্রয়োজনে
                        স্থাপন করে দেখান ।
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
                    ৩.৩ বুক শেলফ এবং শিক্ষকের টেবিল ভালো অবস্থায় আছে (ভাঙ্গা/
                    ব্যবহার অনুপযোগী নয়)
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
                        selectedValue={
                          this.state && this.state.pickerBookselfTableCondition
                        }
                        onValueChange={(value) => {
                          this.setState({
                            pickerBookselfTableCondition: value,
                          });

                          if (
                            value === "Yes" &&
                            this.state.pickerBookselfAccessible === "Yes" &&
                            this.state.pickerBookselfEnvironmentProtected ===
                              "Yes"
                          ) {
                            this.setState({
                              pickerBookselfUseable: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerBookselfUseable: "No",
                            });
                          }

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যনুয়ালের আলোকে আরও ভালো কোনো
                        স্থানে ঠিকমত বুক-শেলফটি স্থাপন করা যায় কিনা এ বিষয়ে
                        পাঠাগারের প্রধান শিক্ষকের সাথে আলোচনা করুন । প্রয়োজনে
                        স্থাপন করে দেখান ।
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
                    ৪. বুক রেজিস্টার আছে এবং নতুন বই পাওয়ার সাথে সাথে নিয়মিত
                    হালনাগাদ করা হয়
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
                        selectedValue={
                          this.state && this.state.pickerBookRegisterUpdated
                        }
                        onValueChange={(value) => {
                          this.setState({ pickerBookRegisterUpdated: value });

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        বুক রেজিস্টার যাচাই করুন এবং হালনাগাদ করুন । পাঠাগারের
                        প্রধান শিক্ষকের সাথে আলোচনা করুন । প্রয়োজনে সংশ্লিষ্ট
                        এসআরএম শিক্ষককে অবহিত করুন ।
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
                    ৫. বুক শেলফে নির্দেশনা অনুযায়ী বই সাজানো হয়েছে
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
                      <TextInput
                        style={styles.inputs}
                        placeholder=""
                        value={this.state.pickerBookselfOrganized}
                        underlineColorAndroid="transparent"
                        editable={false}
                        selectTextOnFocus={false}
                      />
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যনুয়ালের আলোকে বই কিভাবে সাজাতে হয়
                        বলুন এবং পাঠাগার শিক্ষক বা বুক ক্যাপ্টেনের সাথে নিয়ে বই
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
                    ৫.১ পড়ার ঘণ্টায় সকল বই এবং পড়ার সামগ্রী শেলফ-এ সাজানো আছে,
                    বাক্সে তালাবদ্ধ নয়
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
                        selectedValue={
                          this.state &&
                          this.state.pickerBookselfBookOrganizedOpen
                        }
                        onValueChange={(value) => {
                          this.setState({
                            pickerBookselfBookOrganizedOpen: value,
                            pickerBookselfOrganized: value,
                          });

                          if (
                            value === "Yes" &&
                            this.state.pickerBookselfBookLevelViewable ===
                              "Yes" &&
                            this.state.pickerBookselfBookAccessible === "Yes"
                          ) {
                            this.setState({
                              pickerBookselfOrganized: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerBookselfOrganized: "No",
                            });
                          }

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যনুয়ালের আলোকে বই কিভাবে সাজাতে হয়
                        বলুন এবং পাঠাগার শিক্ষক বা বুক ক্যাপ্টেনের সাথে নিয়ে বই
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
                    ৫.২ সকল বই লেভেল অনুযায়ী সাজানো এবং বইয়ের প্রচ্ছদ/কভারের
                    লেভেল সহজেই চোখে পড়ে
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
                        selectedValue={
                          this.state &&
                          this.state.pickerBookselfBookLevelViewable
                        }
                        onValueChange={(value) => {
                          this.setState({
                            pickerBookselfBookLevelViewable: value,
                          });

                          if (
                            value === "Yes" &&
                            this.state.pickerBookselfBookOrganizedOpen ===
                              "Yes" &&
                            this.state.pickerBookselfBookAccessible === "Yes"
                          ) {
                            this.setState({
                              pickerBookselfOrganized: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerBookselfOrganized: "No",
                            });
                          }

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যনুয়ালের আলোকে বই কিভাবে সাজাতে হয়
                        বলুন এবং পাঠাগার শিক্ষক বা বুক ক্যাপ্টেনের সাথে নিয়ে বই
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
                    ৫.৩ বইগুলো এমনভাবে সাজানো আছে যাতে শিক্ষার্থীরা সহজেই নিতে
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
                          height: 40,
                          width: 150,
                        }}
                        selectedValue={
                          this.state && this.state.pickerBookselfBookAccessible
                        }
                        onValueChange={(value) => {
                          this.setState({
                            pickerBookselfBookAccessible: value,
                          });

                          if (
                            value === "Yes" &&
                            this.state.pickerBookselfBookOrganizedOpen ===
                              "Yes" &&
                            this.state.pickerBookselfBookLevelViewable === "Yes"
                          ) {
                            this.setState({
                              pickerBookselfOrganized: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerBookselfOrganized: "No",
                            });
                          }

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যনুয়ালের আলোকে বই কিভাবে সাজাতে হয়
                        বলুন এবং পাঠাগার শিক্ষক বা বুক ক্যাপ্টেনের সাথে নিয়ে বই
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
                    ৬. ছাপাসমৃদ্ধ উপকরণ যেমন চার্ট, পোস্টার অথবা শিক্ষার্থীদের
                    সৃজনশীল কাজ (আঁকা এবং লেখা) প্রদর্শিত আছে
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
                        selectedValue={
                          this.state && this.state.pickerPrintRichDisplayed
                        }
                        onValueChange={(value) => {
                          this.setState({ pickerPrintRichDisplayed: value });

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        পাঠাগার ব্যবস্থাপনা ম্যানুয়ালএর আলোকে শ্রেণীকক্ষ
                        ছাপাসমৃদ্ধ করার পদক্ষেপ নিন । প্রয়োজনে সংশ্লিষ্ট এসআরএম
                        শিক্ষককে অবহিত করুন ।
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
                    ৭. কার্যকরী বই চেক-আউট ব্যবস্থা বিদ্যমান আছে
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
                      <TextInput
                        style={styles.inputs}
                        placeholder=""
                        value={this.state.pickerBookCheckoutFunctional}
                        underlineColorAndroid="transparent"
                        editable={false}
                        selectTextOnFocus={false}
                      />
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
                    ৭.১ বই চেক-আউটের নিয়মাবলী ও প্রক্রিয়া শ্রেণীকক্ষে পোস্টারে
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
                          height: 40,
                          width: 150,
                        }}
                        selectedValue={
                          this.state &&
                          this.state.pickerBookCheckoutProcedureDisplayed
                        }
                        onValueChange={(value) => {
                          this.setState({
                            pickerBookCheckoutProcedureDisplayed: value,
                            pickerBookCheckoutFunctional: value,
                          });

                          if (
                            value === "Yes" &&
                            this.state.pickerBookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.pickerBookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.pickerBookCheckoutPendingBooklist ===
                              "Yes"
                          ) {
                            this.setState({
                              pickerBookCheckoutFunctional: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerBookCheckoutFunctional: "No",
                            });
                          }

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
                    ৭.২ বই চেক-আউট করার জন্য রেজিস্টার এর ব্যবহার আছে
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
                        selectedValue={
                          this.state &&
                          this.state.pickerBookCheckoutRegisterUsable
                        }
                        onValueChange={(value) => {
                          this.setState({
                            pickerBookCheckoutRegisterUsable: value,
                          });
                          if (
                            value === "Yes" &&
                            this.state.pickerBookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.pickerBookCheckoutRegisterUpdated ===
                              "Yes" &&
                            this.state.pickerBookCheckoutPendingBooklist ===
                              "Yes"
                          ) {
                            this.setState({
                              pickerBookCheckoutFunctional: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerBookCheckoutFunctional: "No",
                            });
                          }

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
                    ৭.৩ পূর্ববর্তী সপ্তাহের বই গ্রহণ ও জমা দেয়ার তথ্য রেজিস্টারে
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
                          height: 40,
                          width: 150,
                        }}
                        selectedValue={
                          this.state &&
                          this.state.pickerBookCheckoutRegisterUpdated
                        }
                        onValueChange={(value) => {
                          this.setState({
                            pickerBookCheckoutRegisterUpdated: value,
                          });

                          if (
                            value === "Yes" &&
                            this.state.pickerBookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.pickerBookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.pickerBookCheckoutPendingBooklist ===
                              "Yes"
                          ) {
                            this.setState({
                              pickerBookCheckoutFunctional: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerBookCheckoutFunctional: "No",
                            });
                          }

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
                    ৭.৪ গত মাস পর্যন্ত ফেরত দেওয়া হয়নি এমন বইসমূহের নাম
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
                          height: 40,
                          width: 150,
                        }}
                        selectedValue={
                          this.state &&
                          this.state.pickerBookCheckoutPendingBooklist
                        }
                        onValueChange={(value) => {
                          this.setState({
                            pickerBookCheckoutPendingBooklist: value,
                          });

                          if (
                            value === "Yes" &&
                            this.state.pickerBookCheckoutProcedureDisplayed ===
                              "Yes" &&
                            this.state.pickerBookCheckoutRegisterUsable ===
                              "Yes" &&
                            this.state.pickerBookCheckoutRegisterUpdated ===
                              "Yes"
                          ) {
                            this.setState({
                              pickerBookCheckoutFunctional: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerBookCheckoutFunctional: "No",
                            });
                          }

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
            </View>

            <View style={{ padding: 5 }}>
              <Text
                style={{
                  backgroundColor: "#ADD8E6",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                প্রাইওরিটি এরিয়া -২ঃ কার্যকরী
              </Text>
              <Text
                style={{
                  backgroundColor: "#ADD8E6",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                (১-৭ পর্যন্ত সবগুলো প্রধান সূচক "Yes" হলে এবং ৮-৯ ইনডিকেটর চলমান
                থাকলে বিদ্যালয়টি "কার্যকরী" হিসেবে গণ্য হবে) ।
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
                    ৮. নির্দিষ্ট পড়ার ঘণ্টা বিদ্যমান রয়েছে
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
                      <TextInput
                        style={styles.inputs}
                        placeholder=""
                        value={this.state.pickerSRMClassRoutine}
                        underlineColorAndroid="transparent"
                        editable={false}
                        selectTextOnFocus={false}
                      />
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        LPO-কে অবহিত করুন এবং রুম টু রিডের সহায়তা প্রয়োজন হলে
                        মাসিক প্রতিবেদন উল্লেখ করুন । প্রয়োজন হলে প্রধান
                        শিক্ষকের সাথে আলোচনা করুন ।
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
                    ৮.১ পর্যবেক্ষণকৃত শ্রেণির রুটিনে সপ্তাহে একদিন পড়ার ঘণ্টা
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
                          height: 40,
                          width: 150,
                        }}
                        selectedValue={
                          this.state && this.state.pickerSRMClassWeekly
                        }
                        onValueChange={(value) => {
                          this.setState({
                            pickerSRMClassWeekly: value,
                            pickerSRMClassRoutine: value,
                          });

                          if (
                            value === "Yes" &&
                            this.state.pickerDailyBookCheckoutOpportunity ===
                              "Yes"
                          ) {
                            this.setState({
                              pickerSRMClassRoutine: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerSRMClassRoutine: "No",
                            });
                          }

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        LPO-কে অবহিত করুন এবং রুম টু রিডের সহায়তা প্রয়োজন হলে
                        মাসিক প্রতিবেদন উল্লেখ করুন । প্রয়োজন হলে প্রধান
                        শিক্ষকের সাথে আলোচনা করুন ।
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
                    ৮.২ প্রতিদিন বিদ্যালয় ছুটির পূর্বে বা পরে অথবা বিরতির সময় বই
                    পড়ার চেক-আউটের সুযোগ আছে
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
                        selectedValue={
                          this.state &&
                          this.state.pickerDailyBookCheckoutOpportunity
                        }
                        onValueChange={(value) => {
                          this.setState({
                            pickerDailyBookCheckoutOpportunity: value,
                          });

                          if (
                            value === "Yes" &&
                            this.state.pickerSRMClassWeekly === "Yes"
                          ) {
                            this.setState({
                              pickerSRMClassRoutine: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerSRMClassRoutine: "No",
                            });
                          }

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        LPO-কে অবহিত করুন এবং রুম টু রিডের সহায়তা প্রয়োজন হলে
                        মাসিক প্রতিবেদন উল্লেখ করুন । প্রয়োজন হলে প্রধান
                        শিক্ষকের সাথে আলোচনা করুন ।
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
                    ৯. পড়া ভিত্তিক কার্যক্রমের তথ্য লিপিবদ্ধ করার জন্য একটি
                    রেজিস্টার রয়েছে এবং শিক্ষক প্রতি সপ্তাহে পড়ার ঘণ্টায় কি কি
                    কার্যক্রম করেছেন তা লিপিবদ্ধ করেন
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
                        selectedValue={
                          this.state && this.state.pickerSRMRegisterUpdated
                        }
                        onValueChange={(value) => {
                          this.setState({ pickerSRMRegisterUpdated: value });

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
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
            </View>

            <View style={{ padding: 5 }}>
              <Text
                style={{
                  backgroundColor: "#ADD8E6",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                প্রাইওরিটি এরিয়া -৩ঃ অধিকতর কার্যকরী
              </Text>
              <Text
                style={{
                  backgroundColor: "#ADD8E6",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                (১-৯ পর্যন্ত সবগুলো প্রধান সূচক "Yes" হলে এবং ১০-১২ পর্যন্ত
                ইনডিকেটর চলমান থাকলে বিদ্যালয়টি "অধিক কার্যকরী" হিসেবে গণ্য হবে)
                ।
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
                    ১০. গত ছয় মাসে কমপক্ষে একটি অভিভাবক সভা হয়েছে যেখানে
                    সংশ্লিষ্ট শ্রেণির শিক্ষার্থীদের পঠন অথবা পাঠাগার বিষয়ে
                    আলোচনা হয়েছে
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
                        selectedValue={
                          this.state && this.state.pickerParentsMeeting
                        }
                        onValueChange={(value) => {
                          this.setState({ pickerParentsMeeting: value });

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষককের জানান এবং LPO-কে অবহিত করুন ।
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
                    ১১. বিদ্যালয়ে বিগত বছরে অভিভাবক ও স্থানীয় জনগণের অংশগ্রহণে
                    অন্তত একটি পড়া বিষয়ক অনুষ্ঠান হয়েছে
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
                        selectedValue={
                          this.state && this.state.pickerReadFestival
                        }
                        onValueChange={(value) => {
                          this.setState({ pickerReadFestival: value });

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষককের সাথে আলোচNo করুন এবং LPO'র ফলোআপের জন্য
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
                    ১২. পাঠাগার কর্মসূচি দীর্ঘ মেয়াদে পরিচালনার জন্য ব্যবস্থাপনা
                    কমিটি পরিকল্পনা গ্রহণ করেছে
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
                      <TextInput
                        style={styles.inputs}
                        placeholder=""
                        value={this.state.pickerSustainabilityPlan}
                        underlineColorAndroid="transparent"
                        editable={false}
                        selectTextOnFocus={false}
                      />
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষককের সাথে আলোচনা করুন এবং LPO'র ফলোআপের জন্য
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
                    ১২.১ অভিভাবক, স্থানীয় জনগণ এবং প্রধান শিক্ষক যৌথভাবে একমত
                    হয়ে পরিকল্পনাটি করেছেন ।
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
                        selectedValue={
                          this.state && this.state.pickerCollectivePlan
                        }
                        onValueChange={(value) => {
                          this.setState({
                            pickerCollectivePlan: value,
                            pickerSustainabilityPlan: value,
                          });

                          if (
                            value === "Yes" &&
                            this.state.pickerResponsibilityPlan === "Yes"
                          ) {
                            this.setState({
                              pickerSustainabilityPlan: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerSustainabilityPlan: "No",
                            });
                          }

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষককের সাথে আলোচনা করুন এবং LPO'র ফলোআপের জন্য
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
                    ১২.২ পরিকল্পনায় অভিভাবক ও স্থানীয় জনগণ সুনির্দিষ্ট দায়িত্বের
                    বিষয়টি উল্লেখ আছে ।
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
                        selectedValue={
                          this.state && this.state.pickerResponsibilityPlan
                        }
                        onValueChange={(value) => {
                          this.setState({ pickerResponsibilityPlan: value });
                          if (
                            value === "Yes" &&
                            this.state.pickerCollectivePlan === "Yes"
                          ) {
                            this.setState({
                              pickerSustainabilityPlan: "Yes",
                            });
                          } else {
                            this.setState({
                              pickerSustainabilityPlan: "No",
                            });
                          }

                          // Set library status
                          if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes" &&
                            this.state.pickerSRMClassRoutine === "Yes" &&
                            this.state.pickerSRMRegisterUpdated === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Highly Functioning",
                            });
                          } else if (
                            this.state.pickerIsTrainedAllTeacher === "Yes" &&
                            this.state.pickerClassroomSuitableSRM === "Yes" &&
                            this.state.pickerBookselfUseable === "Yes" &&
                            this.state.pickerBookRegisterUpdated === "Yes" &&
                            this.state.pickerBookselfOrganized === "Yes" &&
                            this.state.pickerPrintRichDisplayed === "Yes" &&
                            this.state.pickerBookCheckoutFunctional === "Yes"
                          ) {
                            this.setState({
                              libraryStatus: "Functioning",
                            });
                          } else {
                            this.setState({
                              libraryStatus: "Developing",
                            });
                          }
                        }}
                        itemStyle={{ color: "white" }}
                      >
                        <Picker.Item label={"নির্বাচন করুন"} value={""} />
                        <Picker.Item label={"Yes"} value={"Yes"} />
                        <Picker.Item label={"No"} value={"No"} />
                      </Picker>
                    </View>
                    <View style={{ flex: 2, padding: 2 }}>
                      <Text style={{ fontWeight: "bold" }}>No হলে করনীয়: </Text>
                      <Text>
                        প্রধান শিক্ষককের সাথে আলোচনা করুন এবং LPO'র ফলোআপের জন্য
                        নোট নিন ।
                      </Text>
                    </View>
                  </View>
                </Card>
              </Card>
            </View>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>আলোচনা</Text>
            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
              <Text style={{ backgroundColor: "#ADD8E6" }}>
                প্রধান শিক্ষকের সাথে আলোচনার জন্য গুরুত্বপূর্ণ কিছু বিষয়ঃ
              </Text>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      বিদ্যালয়ের পাঠাগারগুলো ভালো অবস্থায় আছে এমন ২/৩ টি
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
                      selectedValue={
                        this.state && this.state.pickerBestPracticeIndicator1
                      }
                      onValueChange={(value) => {
                        this.setState({ pickerBestPracticeIndicator1: value });

                        // Set library status
                        if (
                          this.state.pickerIsTrainedAllTeacher === "Yes" &&
                          this.state.pickerClassroomSuitableSRM === "Yes" &&
                          this.state.pickerBookselfUseable === "Yes" &&
                          this.state.pickerBookRegisterUpdated === "Yes" &&
                          this.state.pickerBookselfOrganized === "Yes" &&
                          this.state.pickerPrintRichDisplayed === "Yes" &&
                          this.state.pickerBookCheckoutFunctional === "Yes" &&
                          this.state.pickerSRMClassRoutine === "Yes" &&
                          this.state.pickerSRMRegisterUpdated === "Yes"
                        ) {
                          this.setState({
                            libraryStatus: "Highly Functioning",
                          });
                        } else if (
                          this.state.pickerIsTrainedAllTeacher === "Yes" &&
                          this.state.pickerClassroomSuitableSRM === "Yes" &&
                          this.state.pickerBookselfUseable === "Yes" &&
                          this.state.pickerBookRegisterUpdated === "Yes" &&
                          this.state.pickerBookselfOrganized === "Yes" &&
                          this.state.pickerPrintRichDisplayed === "Yes" &&
                          this.state.pickerBookCheckoutFunctional === "Yes"
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
                      itemStyle={{ color: "white", length: 100 }}
                    >
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
                      {this.state.allLibraryIndicator.map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.indicatorDetail}
                            value={item.indicatorDetail}
                          />
                        );
                      })}
                    </Picker>
                    <Text>১.</Text>
                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      value={this.state.pickerBestPracticeIndicator1}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>২.</Text>
                    <Picker
                      style={{
                        height: 40,
                        width: 150,
                      }}
                      selectedValue={
                        this.state && this.state.pickerBestPracticeIndicator2
                      }
                      onValueChange={(value) => {
                        this.setState({ pickerBestPracticeIndicator2: value });
                      }}
                      itemStyle={{ color: "white" }}
                    >
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
                      {this.state.allLibraryIndicator.map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.indicatorDetail}
                            value={item.indicatorDetail}
                          />
                        );
                      })}
                    </Picker>
                    <Text>২.</Text>
                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      value={this.state.pickerBestPracticeIndicator2}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>৩.</Text>
                    <Picker
                      style={{
                        height: 40,
                        width: 150,
                      }}
                      selectedValue={
                        this.state && this.state.pickerBestPracticeIndicator3
                      }
                      onValueChange={(value) => {
                        this.setState({ pickerBestPracticeIndicator3: value });
                      }}
                      itemStyle={{ color: "white" }}
                    >
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
                      {this.state.allLibraryIndicator.map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.indicatorDetail}
                            value={item.indicatorDetail}
                          />
                        );
                      })}
                    </Picker>
                    <Text>৩.</Text>
                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      value={this.state.pickerBestPracticeIndicator3}
                    ></TextInput>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      অগ্রাধিকারভিত্তিতে বিদ্যালয়ের পাঠাগারগুলো উন্নয়নের জন্য যে
                      ১/২ টি ইনডিকেটর (এরিয়ার নম্বর) চিহ্নিত করেছেন তা প্রধান
                      শিক্ষককে অবহিত করুন এবং তিনি পাঠাগারগুলো উন্নয়নে কি করতে
                      পারেন সেটি উল্লেখ করুন ।
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
                      selectedValue={
                        this.state && this.state.pickerCoachingSupportIndicator1
                      }
                      onValueChange={(value) => {
                        this.setState({
                          pickerCoachingSupportIndicator1: value,
                        });
                      }}
                      itemStyle={{ color: "white" }}
                    >
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
                      {this.state.allLibraryIndicator.map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.indicatorDetail}
                            value={item.indicatorDetail}
                          />
                        );
                      })}
                    </Picker>
                    <Text>১.</Text>
                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      value={this.state.pickerCoachingSupportIndicator1 + ""}
                    ></TextInput>
                  </View>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>২.</Text>
                    <Picker
                      style={{
                        height: 40,
                        width: 150,
                      }}
                      selectedValue={
                        this.state && this.state.pickerCoachingSupportIndicator2
                      }
                      onValueChange={(value) => {
                        this.setState({
                          pickerCoachingSupportIndicator2: value,
                        });
                      }}
                      itemStyle={{ color: "white" }}
                    >
                      <Picker.Item label={"নির্বাচন করুন"} value={""} />
                      {this.state.allLibraryIndicator.map((item) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.indicatorDetail}
                            value={item.indicatorDetail}
                          />
                        );
                      })}
                    </Picker>
                    <Text>২.</Text>
                    <TextInput
                      style={{ height: 150, padding: 5, borderWidth: 1 }}
                      multiline={true}
                      numberOfLines={20}
                      placeholder=""
                      editable={false}
                      value={this.state.pickerCoachingSupportIndicator2 + ""}
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
                      onChangeText={(text) =>
                        this.setState({
                          coachingSupportIndicator1Details: text,
                        })
                      }
                      value={this.state.coachingSupportIndicator1Details}
                    ></TextInput>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="২."
                      onChangeText={(text) =>
                        this.setState({
                          coachingSupportIndicator2Details: text,
                        })
                      }
                      value={this.state.coachingSupportIndicator2Details}
                    ></TextInput>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <Text>
                      যে কাজ গুলো করার জন্য প্রধান শিক্ষক একমত হয়েছেন সেটি/
                      সেগুলো উল্লেখ করুন ।
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="১."
                      onChangeText={(text) =>
                        this.setState({
                          agreedStatement1: text,
                        })
                      }
                      value={this.state.agreedStatement1}
                    ></TextInput>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, padding: 2 }}>
                    <TextInput
                      style={{ height: 80, padding: 5, borderWidth: 1 }}
                      placeholder="২."
                      onChangeText={(text) =>
                        this.setState({
                          agreedStatement2: text,
                        })
                      }
                      value={this.state.agreedStatement2}
                    ></TextInput>
                  </View>
                </View>
              </View>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>পাঠাগারের অবস্থা</Text>
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
                      ইনডিকেটর অনুযায়ী পাঠাগারের অবস্থা
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
                      {libraryStatus}
                      {/* {this.state.libraryStatus} */}
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
