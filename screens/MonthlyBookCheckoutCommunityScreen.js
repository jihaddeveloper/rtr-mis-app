//  Author: Mohammad Jihad Hossain
//  Create Date: 04/04/2022
//  Modify Date: 04/08/2022
//  Description: Monthly book checkout screen component

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

export default class MonthlyBookCheckoutScreen extends React.Component {
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
      //Preloaded Data

      // All Book-checkout Data CRD
      allBookcheckoutCRFData: [],
      // All Book-checkout Data

      // Duplicate data check
      duplicateBookCheckoutCRF: [],
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
      pickerHeadTeacher: "",
      pickerGender: "",
      pickerVisitor: "",
      pickerDesignation: "",
      pickerVisitorOffice: "",
      pickerLF: "",
      pickerLPO: "",

      pickerLFName: "",
      pickerLPOName: "",

      communityVolunteer: "",
      pickerGenderCV: "",
      pickerMonth: "",
      pickerYear: "",
      // General data

      //School Data

      //Book checkout data
      priPrimaryBoy: 0,
      priPrimaryGirl: 0,
      priPrimaryTotal: 0,

      priPrimaryNoBoyBC: 0,
      priPrimaryNoGirlBC: 0,
      priPrimaryNoTotalBC: 0,

      priPrimaryNoBookBoyBC: 0,
      priPrimaryNoBookGirlBC: 0,
      priPrimaryNoBookTotalBC: 0,

      priPrimarySpBoy: 0,
      priPrimarySpGirl: 0,
      priPrimarySpTotal: 0,

      priPrimaryNoSpBoyBC: 0,
      priPrimaryNoSpGirlBC: 0,
      priPrimaryNoSpTotalBC: 0,

      priPrimaryNoBookSpBoyBC: 0,
      priPrimaryNoBookSpGirlBC: 0,
      priPrimaryNoBookSpTotalBC: 0,

      classOneBoy: 0,
      classOneGirl: 0,
      classOneTotal: 0,

      classOneNoBoyBC: 0,
      classOneNoGirlBC: 0,
      classOneNoTotalBC: 0,

      classOneNoBookBoyBC: 0,
      classOneNoBookGirlBC: 0,
      classOneNoBookTotalBC: 0,

      classOneSpBoy: 0,
      classOneSpGirl: 0,
      classOneSpTotal: 0,

      classOneNoSpBoyBC: 0,
      classOneNoSpGirlBC: 0,
      classOneNoSpTotalBC: 0,

      classOneNoBookSpBoyBC: 0,
      classOneNoBookSpGirlBC: 0,
      classOneNoBookSpTotalBC: 0,

      classTwoBoy: 0,
      classTwoGirl: 0,
      classTwoTotal: 0,

      classTwoNoBoyBC: 0,
      classTwoNoGirlBC: 0,
      classTwoNoTotalBC: 0,

      classTwoNoBookBoyBC: 0,
      classTwoNoBookGirlBC: 0,
      classTwoNoBookTotalBC: 0,

      classTwoSpBoy: 0,
      classTwoSpGirl: 0,
      classTwoSpTotal: 0,

      classTwoNoSpBoyBC: 0,
      classTwoNoSpGirlBC: 0,
      classTwoNoSpTotalBC: 0,

      classTwoNoBookSpBoyBC: 0,
      classTwoNoBookSpGirlBC: 0,
      classTwoNoBookSpTotalBC: 0,

      classThreeBoy: 0,
      classThreeGirl: 0,
      classThreeTotal: 0,

      classThreeNoBoyBC: 0,
      classThreeNoGirlBC: 0,
      classThreeNoTotalBC: 0,

      classThreeNoBookBoyBC: 0,
      classThreeNoBookGirlBC: 0,
      classThreeNoBookTotalBC: 0,

      classThreeSpBoy: 0,
      classThreeSpGirl: 0,
      classThreeSpTotal: 0,

      classThreeNoSpBoyBC: 0,
      classThreeNoSpGirlBC: 0,
      classThreeNoSpTotalBC: 0,

      classThreeNoBookSpBoyBC: 0,
      classThreeNoBookSpGirlBC: 0,
      classThreeNoBookSpTotalBC: 0,

      classFourBoy: 0,
      classFourGirl: 0,
      classFourTotal: 0,

      classFourNoBoyBC: 0,
      classFourNoGirlBC: 0,
      classFourNoTotalBC: 0,

      classFourNoBookBoyBC: 0,
      classFourNoBookGirlBC: 0,
      classFourNoBookTotalBC: 0,

      classFourSpBoy: 0,
      classFourSpGirl: 0,
      classFourSpTotal: 0,

      classFourNoSpBoyBC: 0,
      classFourNoSpGirlBC: 0,
      classFourNoSpTotalBC: 0,

      classFourNoBookSpBoyBC: 0,
      classFourNoBookSpGirlBC: 0,
      classFourNoBookSpTotalBC: 0,

      classFiveBoy: 0,
      classFiveGirl: 0,
      classFiveTotal: 0,

      classFiveNoBoyBC: 0,
      classFiveNoGirlBC: 0,
      classFiveNoTotalBC: 0,

      classFiveNoBookBoyBC: 0,
      classFiveNoBookGirlBC: 0,
      classFiveNoBookTotalBC: 0,

      classFiveSpBoy: 0,
      classFiveSpGirl: 0,
      classFiveSpTotal: 0,

      classFiveNoSpBoyBC: 0,
      classFiveNoSpGirlBC: 0,
      classFiveNoSpTotalBC: 0,

      classFiveNoBookSpBoyBC: 0,
      classFiveNoBookSpGirlBC: 0,
      classFiveNoBookSpTotalBC: 0,
      //Book checkout data

      //Book check-in data
      priPrimaryNoBoyBCIn: 0,
      priPrimaryNoGirlBCIn: 0,
      priPrimaryNoTotalBCIn: 0,

      priPrimaryNoBookBoyBCIn: 0,
      priPrimaryNoBookGirlBCIn: 0,
      priPrimaryNoBookTotalBCIn: 0,

      priPrimaryNoSpBoyBCIn: 0,
      priPrimaryNoSpGirlBCIn: 0,
      priPrimaryNoSpTotalBCIn: 0,

      priPrimaryNoBookSpBoyBCIn: 0,
      priPrimaryNoBookSpGirlBCIn: 0,
      priPrimaryNoBookSpTotalBCIn: 0,

      classOneNoBoyBCIn: 0,
      classOneNoGirlBCIn: 0,
      classOneNoTotalBCIn: 0,

      classOneNoBookBoyBCIn: 0,
      classOneNoBookGirlBCIn: 0,
      classOneNoBookTotalBCIn: 0,

      classOneNoSpBoyBCIn: 0,
      classOneNoSpGirlBCIn: 0,
      classOneNoSpTotalBCIn: 0,

      classOneNoBookSpBoyBCIn: 0,
      classOneNoBookSpGirlBCIn: 0,
      classOneNoBookSpTotalBCIn: 0,

      classTwoNoBoyBCIn: 0,
      classTwoNoGirlBCIn: 0,
      classTwoNoTotalBCIn: 0,

      classTwoNoBookBoyBCIn: 0,
      classTwoNoBookGirlBCIn: 0,
      classTwoNoBookTotalBCIn: 0,

      classTwoNoSpBoyBCIn: 0,
      classTwoNoSpGirlBCIn: 0,
      classTwoNoSpTotalBCIn: 0,

      classTwoNoBookSpBoyBCIn: 0,
      classTwoNoBookSpGirlBCIn: 0,
      classTwoNoBookSpTotalBCIn: 0,

      classThreeNoBoyBCIn: 0,
      classThreeNoGirlBCIn: 0,
      classThreeNoTotalBCIn: 0,

      classThreeNoBookBoyBCIn: 0,
      classThreeNoBookGirlBCIn: 0,
      classThreeNoBookTotalBCIn: 0,

      classThreeNoSpBoyBCIn: 0,
      classThreeNoSpGirlBCIn: 0,
      classThreeNoSpTotalBCIn: 0,

      classThreeNoBookSpBoyBCIn: 0,
      classThreeNoBookSpGirlBCIn: 0,
      classThreeNoBookSpTotalBCIn: 0,

      classFourNoBoyBCIn: 0,
      classFourNoGirlBCIn: 0,
      classFourNoTotalBCIn: 0,

      classFourNoBookBoyBCIn: 0,
      classFourNoBookGirlBCIn: 0,
      classFourNoBookTotalBCIn: 0,

      classFourNoSpBoyBCIn: 0,
      classFourNoSpGirlBCIn: 0,
      classFourNoSpTotalBCIn: 0,

      classFourNoBookSpBoyBCIn: 0,
      classFourNoBookSpGirlBCIn: 0,
      classFourNoBookSpTotalBCIn: 0,

      classFiveNoBoyBCIn: 0,
      classFiveNoGirlBCIn: 0,
      classFiveNoTotalBCIn: 0,

      classFiveNoBookBoyBCIn: 0,
      classFiveNoBookGirlBCIn: 0,
      classFiveNoBookTotalBCIn: 0,

      classFiveNoSpBoyBCIn: 0,
      classFiveNoSpGirlBCIn: 0,
      classFiveNoSpTotalBCIn: 0,

      classFiveNoBookSpBoyBCIn: 0,
      classFiveNoBookSpGirlBCIn: 0,
      classFiveNoBookSpTotalBCIn: 0,
      //Book check-in data

      //School Data

      //School Total data
      // schoolTotalNoTitle: 0,
      // schoolTotalNoBook: 0,

      schoolTotalNoGirl: 0,
      schoolTotalNoBoy: 0,
      schoolTotalNoStudent: 0,

      schoolTotalNoGirlBC: 0,
      schoolTotalNoBoyBC: 0,
      schoolTotalNoStudentBC: 0,

      schoolTotalNoBookBC: 0,

      schoolTotalNoStudentBCIn: 0,

      schoolTotalNoBookBCIn: 0,

      schoolTotalNoSpStudent: 0,
      schoolTotalNoSpStudentBC: 0,
      schoolTotalNoSpBookBC: 0,
      schoolTotalNoSpStudentBCIn: 0,
      schoolTotalNoSpBookBCIn: 0,
      //School Total data

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
      headTeacherError: "",
      genderError: "",
      monthError: "",
      yearError: "",
      cVolunteerError: "",
      cVolunteerGenderError: "",
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
    // this.getAllProject();
    // this.getAllOffice();
    // this.getAllTeacher();
    this.getAllBookCheckoutCRF();
    console.log("Component mounted");
    // console.log(
    //   "Duplicate Bookcheckout Data CRF: ",
    //   this.state.duplicateBookCheckoutCRF.length
    // );
  }
  //Load data from server

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
      pickerHeadTeacher: "",
      pickerGender: "",
      pickerVisitor: "",
      pickerDesignation: "",
      pickerVisitorOffice: "",
      pickerLF: "",
      pickerLPO: "",

      pickerLFName: "",
      pickerLPOName: "",

      communityVolunteer: "",
      pickerGenderCV: "",
      pickerMonth: "",
      pickerYear: "",
      // General data

      //School Data

      //Book checkout data
      priPrimaryBoy: 0,
      priPrimaryGirl: 0,
      priPrimaryTotal: 0,

      priPrimaryNoBoyBC: 0,
      priPrimaryNoGirlBC: 0,
      priPrimaryNoTotalBC: 0,

      priPrimaryNoBookBoyBC: 0,
      priPrimaryNoBookGirlBC: 0,
      priPrimaryNoBookTotalBC: 0,

      priPrimarySpBoy: 0,
      priPrimarySpGirl: 0,
      priPrimarySpTotal: 0,

      priPrimaryNoSpBoyBC: 0,
      priPrimaryNoSpGirlBC: 0,
      priPrimaryNoSpTotalBC: 0,

      priPrimaryNoBookSpBoyBC: 0,
      priPrimaryNoBookSpGirlBC: 0,
      priPrimaryNoBookSpTotalBC: 0,

      classOneBoy: 0,
      classOneGirl: 0,
      classOneTotal: 0,

      classOneNoBoyBC: 0,
      classOneNoGirlBC: 0,
      classOneNoTotalBC: 0,

      classOneNoBookBoyBC: 0,
      classOneNoBookGirlBC: 0,
      classOneNoBookTotalBC: 0,

      classOneSpBoy: 0,
      classOneSpGirl: 0,
      classOneSpTotal: 0,

      classOneNoSpBoyBC: 0,
      classOneNoSpGirlBC: 0,
      classOneNoSpTotalBC: 0,

      classOneNoBookSpBoyBC: 0,
      classOneNoBookSpGirlBC: 0,
      classOneNoBookSpTotalBC: 0,

      classTwoBoy: 0,
      classTwoGirl: 0,
      classTwoTotal: 0,

      classTwoNoBoyBC: 0,
      classTwoNoGirlBC: 0,
      classTwoNoTotalBC: 0,

      classTwoNoBookBoyBC: 0,
      classTwoNoBookGirlBC: 0,
      classTwoNoBookTotalBC: 0,

      classTwoSpBoy: 0,
      classTwoSpGirl: 0,
      classTwoSpTotal: 0,

      classTwoNoSpBoyBC: 0,
      classTwoNoSpGirlBC: 0,
      classTwoNoSpTotalBC: 0,

      classTwoNoBookSpBoyBC: 0,
      classTwoNoBookSpGirlBC: 0,
      classTwoNoBookSpTotalBC: 0,

      classThreeBoy: 0,
      classThreeGirl: 0,
      classThreeTotal: 0,

      classThreeNoBoyBC: 0,
      classThreeNoGirlBC: 0,
      classThreeNoTotalBC: 0,

      classThreeNoBookBoyBC: 0,
      classThreeNoBookGirlBC: 0,
      classThreeNoBookTotalBC: 0,

      classThreeSpBoy: 0,
      classThreeSpGirl: 0,
      classThreeSpTotal: 0,

      classThreeNoSpBoyBC: 0,
      classThreeNoSpGirlBC: 0,
      classThreeNoSpTotalBC: 0,

      classThreeNoBookSpBoyBC: 0,
      classThreeNoBookSpGirlBC: 0,
      classThreeNoBookSpTotalBC: 0,

      classFourBoy: 0,
      classFourGirl: 0,
      classFourTotal: 0,

      classFourNoBoyBC: 0,
      classFourNoGirlBC: 0,
      classFourNoTotalBC: 0,

      classFourNoBookBoyBC: 0,
      classFourNoBookGirlBC: 0,
      classFourNoBookTotalBC: 0,

      classFourSpBoy: 0,
      classFourSpGirl: 0,
      classFourSpTotal: 0,

      classFourNoSpBoyBC: 0,
      classFourNoSpGirlBC: 0,
      classFourNoSpTotalBC: 0,

      classFourNoBookSpBoyBC: 0,
      classFourNoBookSpGirlBC: 0,
      classFourNoBookSpTotalBC: 0,

      classFiveBoy: 0,
      classFiveGirl: 0,
      classFiveTotal: 0,

      classFiveNoBoyBC: 0,
      classFiveNoGirlBC: 0,
      classFiveNoTotalBC: 0,

      classFiveNoBookBoyBC: 0,
      classFiveNoBookGirlBC: 0,
      classFiveNoBookTotalBC: 0,

      classFiveSpBoy: 0,
      classFiveSpGirl: 0,
      classFiveSpTotal: 0,

      classFiveNoSpBoyBC: 0,
      classFiveNoSpGirlBC: 0,
      classFiveNoSpTotalBC: 0,

      classFiveNoBookSpBoyBC: 0,
      classFiveNoBookSpGirlBC: 0,
      classFiveNoBookSpTotalBC: 0,
      //Book checkout data

      //Book check-in data
      priPrimaryNoBoyBCIn: 0,
      priPrimaryNoGirlBCIn: 0,
      priPrimaryNoTotalBCIn: 0,

      priPrimaryNoBookBoyBCIn: 0,
      priPrimaryNoBookGirlBCIn: 0,
      priPrimaryNoBookTotalBCIn: 0,

      priPrimaryNoSpBoyBCIn: 0,
      priPrimaryNoSpGirlBCIn: 0,
      priPrimaryNoSpTotalBCIn: 0,

      priPrimaryNoBookSpBoyBCIn: 0,
      priPrimaryNoBookSpGirlBCIn: 0,
      priPrimaryNoBookSpTotalBCIn: 0,

      classOneNoBoyBCIn: 0,
      classOneNoGirlBCIn: 0,
      classOneNoTotalBCIn: 0,

      classOneNoBookBoyBCIn: 0,
      classOneNoBookGirlBCIn: 0,
      classOneNoBookTotalBCIn: 0,

      classOneNoSpBoyBCIn: 0,
      classOneNoSpGirlBCIn: 0,
      classOneNoSpTotalBCIn: 0,

      classOneNoBookSpBoyBCIn: 0,
      classOneNoBookSpGirlBCIn: 0,
      classOneNoBookSpTotalBCIn: 0,

      classTwoNoBoyBCIn: 0,
      classTwoNoGirlBCIn: 0,
      classTwoNoTotalBCIn: 0,

      classTwoNoBookBoyBCIn: 0,
      classTwoNoBookGirlBCIn: 0,
      classTwoNoBookTotalBCIn: 0,

      classTwoNoSpBoyBCIn: 0,
      classTwoNoSpGirlBCIn: 0,
      classTwoNoSpTotalBCIn: 0,

      classTwoNoBookSpBoyBCIn: 0,
      classTwoNoBookSpGirlBCIn: 0,
      classTwoNoBookSpTotalBCIn: 0,

      classThreeNoBoyBCIn: 0,
      classThreeNoGirlBCIn: 0,
      classThreeNoTotalBCIn: 0,

      classThreeNoBookBoyBCIn: 0,
      classThreeNoBookGirlBCIn: 0,
      classThreeNoBookTotalBCIn: 0,

      classThreeNoSpBoyBCIn: 0,
      classThreeNoSpGirlBCIn: 0,
      classThreeNoSpTotalBCIn: 0,

      classThreeNoBookSpBoyBCIn: 0,
      classThreeNoBookSpGirlBCIn: 0,
      classThreeNoBookSpTotalBCIn: 0,

      classFourNoBoyBCIn: 0,
      classFourNoGirlBCIn: 0,
      classFourNoTotalBCIn: 0,

      classFourNoBookBoyBCIn: 0,
      classFourNoBookGirlBCIn: 0,
      classFourNoBookTotalBCIn: 0,

      classFourNoSpBoyBCIn: 0,
      classFourNoSpGirlBCIn: 0,
      classFourNoSpTotalBCIn: 0,

      classFourNoBookSpBoyBCIn: 0,
      classFourNoBookSpGirlBCIn: 0,
      classFourNoBookSpTotalBCIn: 0,

      classFiveNoBoyBCIn: 0,
      classFiveNoGirlBCIn: 0,
      classFiveNoTotalBCIn: 0,

      classFiveNoBookBoyBCIn: 0,
      classFiveNoBookGirlBCIn: 0,
      classFiveNoBookTotalBCIn: 0,

      classFiveNoSpBoyBCIn: 0,
      classFiveNoSpGirlBCIn: 0,
      classFiveNoSpTotalBCIn: 0,

      classFiveNoBookSpBoyBCIn: 0,
      classFiveNoBookSpGirlBCIn: 0,
      classFiveNoBookSpTotalBCIn: 0,
      //Book check-in data

      //School Data

      //School Total data
      // schoolTotalNoTitle: 0,
      // schoolTotalNoBook: 0,

      schoolTotalNoGirl: 0,
      schoolTotalNoBoy: 0,
      schoolTotalNoStudent: 0,

      schoolTotalNoGirlBC: 0,
      schoolTotalNoBoyBC: 0,
      schoolTotalNoStudentBC: 0,

      schoolTotalNoBookBC: 0,

      schoolTotalNoStudentBCIn: 0,

      schoolTotalNoBookBCIn: 0,

      schoolTotalNoSpStudent: 0,
      schoolTotalNoSpStudentBC: 0,
      schoolTotalNoSpBookBC: 0,
      schoolTotalNoSpStudentBCIn: 0,
      schoolTotalNoSpBookBCIn: 0,
      //School Total data

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
      headTeacherError: "",
      genderError: "",
      monthError: "",
      yearError: "",
      cVolunteerError: "",
      cVolunteerGenderError: "",
      // Validation message
    });
  };

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

  // Get All Project
  getAllProject = async () => {
    try {
      const response = await fetch("http://10.9.0.93:8080/api/v1/projects");
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
      const response = await fetch("http://10.9.0.93:8080/api/v1/offices");
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
      const response = await fetch("http://10.9.0.93:8080/api/v1/teachers", {
        method: "GET",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      this.setState({ allTeacher: json, isLoading: false });
    } catch (error) {
      console.log(error);
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

  // Get All Book-checkout Data for school
  getAllBookCheckoutCRF = async () => {
    try {
      const response = await axios(
        "http://118.179.80.51:8080/api/v1/book-checkout-community",
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
        allBookcheckoutCRFData: response.data,
        isLoading: false,
      });
      console.log(
        "All Bookcheckout Data CRF: ",
        this.state.allBookcheckoutCRFData.length
      );
    } catch (error) {
      console.log(error);
    }
  };
  // Get All Book-checkout Data for school

  // Register new book-checkout CRF data
  saveBookCheckoutCommunity = async () => {
    const newBookCheckout = {
      date: this.state.date,
      office: this.state.pickerOffice,
      project: this.state.pickerProject,
      district: this.state.pickerDistrict.name,
      upazilla: this.state.pickerUpazilla.name,
      school: this.state.pickerSchool,
      headTeacher: this.state.pickerHeadTeacher,
      gender: this.state.pickerGender,
      visitor: this.state.pickerVisitor,
      visitorDesignation: this.state.pickerDesignation,
      visitorOffice: this.state.pickerVisitorOffice,
      lf: this.state.pickerLF.employeeRegId,
      lfName: this.state.pickerLF.name,
      lpo: this.state.pickerLPO.employeeRegId,
      lpoName: this.state.pickerLPO.name,

      visitNo: this.state.visitNo,
      month: this.state.pickerMonth,
      year: this.state.pickerYear,
      communityVolunteer: this.state.communityVolunteer,
      genderCV: this.state.pickerGenderCV,

      priPrimaryBoy: this.state.priPrimaryBoy,
      priPrimaryGirl: this.state.priPrimaryGirl,
      priPrimaryTotal: this.state.priPrimaryTotal,
      priPrimaryNoBoyBC: this.state.priPrimaryNoBoyBC,
      priPrimaryNoGirlBC: this.state.priPrimaryNoGirlBC,
      priPrimaryNoTotalBC: this.state.priPrimaryNoTotalBC,
      priPrimaryNoBookBoyBC: this.state.priPrimaryNoBookBoyBC,
      priPrimaryNoBookGirlBC: this.state.priPrimaryNoBookGirlBC,
      priPrimaryNoBookTotalBC: this.state.priPrimaryNoBookTotalBC,
      priPrimarySpBoy: this.state.priPrimarySpBoy,
      priPrimarySpGirl: this.state.priPrimarySpGirl,
      priPrimarySpTotal: this.state.priPrimarySpTotal,
      priPrimaryNoSpBoyBC: this.state.priPrimaryNoSpBoyBC,
      priPrimaryNoSpGirlBC: this.state.priPrimaryNoSpGirlBC,
      priPrimaryNoSpTotalBC: this.state.priPrimaryNoSpTotalBC,
      priPrimaryNoBookSpBoyBC: this.state.priPrimaryNoBookSpBoyBC,
      priPrimaryNoBookSpGirlBC: this.state.priPrimaryNoBookSpGirlBC,
      priPrimaryNoBookSpTotalBC: this.state.priPrimaryNoBookSpTotalBC,
      classOneBoy: this.state.classOneBoy,
      classOneGirl: this.state.classOneGirl,
      classOneTotal: this.state.classOneTotal,
      classOneNoBoyBC: this.state.classOneNoBoyBC,
      classOneNoGirlBC: this.state.classOneNoGirlBC,
      classOneNoTotalBC: this.state.classOneNoTotalBC,
      classOneNoBookBoyBC: this.state.classOneNoBookBoyBC,
      classOneNoBookGirlBC: this.state.classOneNoBookGirlBC,
      classOneNoBookTotalBC: this.state.classOneNoBookTotalBC,
      classOneSpBoy: this.state.classOneSpBoy,
      classOneSpGirl: this.state.classOneSpGirl,
      classOneSpTotal: this.state.classOneSpTotal,
      classOneNoSpBoyBC: this.state.classOneNoSpBoyBC,
      classOneNoSpGirlBC: this.state.classOneNoSpGirlBC,
      classOneNoSpTotalBC: this.state.classOneNoSpTotalBC,
      classOneNoBookSpBoyBC: this.state.classOneNoBookSpBoyBC,
      classOneNoBookSpGirlBC: this.state.classOneNoBookSpGirlBC,
      classOneNoBookSpTotalBC: this.state.classOneNoBookSpTotalBC,
      classTwoBoy: this.state.classTwoBoy,
      classTwoGirl: this.state.classTwoGirl,
      classTwoTotal: this.state.classTwoTotal,
      classTwoNoBoyBC: this.state.classTwoNoBoyBC,
      classTwoNoGirlBC: this.state.classTwoNoGirlBC,
      classTwoNoTotalBC: this.state.classTwoNoTotalBC,
      classTwoNoBookBoyBC: this.state.classTwoNoBookBoyBC,
      classTwoNoBookGirlBC: this.state.classTwoNoBookGirlBC,
      classTwoNoBookTotalBC: this.state.classTwoNoBookTotalBC,
      classTwoSpBoy: this.state.classTwoSpBoy,
      classTwoSpGirl: this.state.classTwoSpGirl,
      classTwoSpTotal: this.state.classTwoSpTotal,
      classTwoNoSpBoyBC: this.state.classTwoNoSpBoyBC,
      classTwoNoSpGirlBC: this.state.classTwoNoSpGirlBC,
      classTwoNoSpTotalBC: this.state.classTwoNoSpTotalBC,
      classTwoNoBookSpBoyBC: this.state.classTwoNoBookSpBoyBC,
      classTwoNoBookSpGirlBC: this.state.classTwoNoBookSpGirlBC,
      classTwoNoBookSpTotalBC: this.state.classTwoNoBookSpTotalBC,
      classThreeBoy: this.state.classThreeBoy,
      classThreeGirl: this.state.classThreeGirl,
      classThreeTotal: this.state.classThreeTotal,
      classThreeNoBoyBC: this.state.classThreeNoBoyBC,
      classThreeNoGirlBC: this.state.classThreeNoGirlBC,
      classThreeNoTotalBC: this.state.classThreeNoTotalBC,
      classThreeNoBookBoyBC: this.state.classThreeNoBookBoyBC,
      classThreeNoBookGirlBC: this.state.classThreeNoBookGirlBC,
      classThreeNoBookTotalBC: this.state.classThreeNoBookTotalBC,
      classThreeSpBoy: this.state.classThreeSpBoy,
      classThreeSpGirl: this.state.classThreeSpGirl,
      classThreeSpTotal: this.state.classThreeSpTotal,
      classThreeNoSpBoyBC: this.state.classThreeNoSpBoyBC,
      classThreeNoSpGirlBC: this.state.classThreeNoSpGirlBC,
      classThreeNoSpTotalBC: this.state.classThreeNoSpTotalBC,
      classThreeNoBookSpBoyBC: this.state.classThreeNoBookSpBoyBC,
      classThreeNoBookSpGirlBC: this.state.classThreeNoBookSpGirlBC,
      classThreeNoBookSpTotalBC: this.state.classThreeNoBookSpTotalBC,
      classFourBoy: this.state.classFourBoy,
      classFourGirl: this.state.classFourGirl,
      classFourTotal: this.state.classFourTotal,
      classFourNoBoyBC: this.state.classFourNoBoyBC,
      classFourNoGirlBC: this.state.classFourNoGirlBC,
      classFourNoTotalBC: this.state.classFourNoTotalBC,
      classFourNoBookBoyBC: this.state.classFourNoBookBoyBC,
      classFourNoBookGirlBC: this.state.classFourNoBookGirlBC,
      classFourNoBookTotalBC: this.state.classFourNoBookTotalBC,
      classFourSpBoy: this.state.classFourSpBoy,
      classFourSpGirl: this.state.classFourSpGirl,
      classFourSpTotal: this.state.classFourSpTotal,
      classFourNoSpBoyBC: this.state.classFourNoSpBoyBC,
      classFourNoSpGirlBC: this.state.classFourNoSpGirlBC,
      classFourNoSpTotalBC: this.state.classFourNoSpTotalBC,
      classFourNoBookSpBoyBC: this.state.classFourNoBookSpBoyBC,
      classFourNoBookSpGirlBC: this.state.classFourNoBookSpGirlBC,
      classFourNoBookSpTotalBC: this.state.classFourNoBookSpTotalBC,
      classFiveBoy: this.state.classFiveBoy,
      classFiveGirl: this.state.classFiveGirl,
      classFiveTotal: this.state.classFiveTotal,
      classFiveNoBoyBC: this.state.classFiveNoBoyBC,
      classFiveNoGirlBC: this.state.classFiveNoGirlBC,
      classFiveNoTotalBC: this.state.classFiveNoTotalBC,
      classFiveNoBookBoyBC: this.state.classFiveNoBookBoyBC,
      classFiveNoBookGirlBC: this.state.classFiveNoBookGirlBC,
      classFiveNoBookTotalBC: this.state.classFiveNoBookTotalBC,
      classFiveSpBoy: this.state.classFiveSpBoy,
      classFiveSpGirl: this.state.classFiveSpGirl,
      classFiveSpTotal: this.state.classFiveSpTotal,
      classFiveNoSpBoyBC: this.state.classFiveNoSpBoyBC,
      classFiveNoSpGirlBC: this.state.classFiveNoSpGirlBC,
      classFiveNoSpTotalBC: this.state.classFiveNoSpTotalBC,
      classFiveNoBookSpBoyBC: this.state.classFiveNoBookSpBoyBC,
      classFiveNoBookSpGirlBC: this.state.classFiveNoBookSpGirlBC,
      classFiveNoBookSpTotalBC: this.state.classFiveNoBookSpTotalBC,

      //Book checkin
      priPrimaryNoBoyBCIn: this.state.priPrimaryNoBoyBCIn,
      priPrimaryNoGirlBCIn: this.state.priPrimaryNoGirlBCIn,
      priPrimaryNoTotalBCIn: this.state.priPrimaryNoTotalBCIn,
      priPrimaryNoBookBoyBCIn: this.state.priPrimaryNoBookBoyBCIn,
      priPrimaryNoBookGirlBCIn: this.state.priPrimaryNoBookGirlBCIn,
      priPrimaryNoBookTotalBCIn: this.state.priPrimaryNoBookTotalBCIn,
      priPrimaryNoSpBoyBCIn: this.state.priPrimaryNoSpBoyBCIn,
      priPrimaryNoSpGirlBCIn: this.state.priPrimaryNoSpGirlBCIn,
      priPrimaryNoSpTotalBCIn: this.state.priPrimaryNoSpTotalBCIn,
      priPrimaryNoBookSpBoyBCIn: this.state.priPrimaryNoBookSpBoyBCIn,
      priPrimaryNoBookSpGirlBCIn: this.state.priPrimaryNoBookSpGirlBCIn,
      priPrimaryNoBookSpTotalBCIn: this.state.priPrimaryNoBookSpTotalBCIn,

      classOneNoBoyBCIn: this.state.classOneNoBoyBCIn,
      classOneNoGirlBCIn: this.state.classOneNoGirlBCIn,
      classOneNoTotalBCIn: this.state.classOneNoTotalBCIn,
      classOneNoBookBoyBCIn: this.state.classOneNoBookBoyBCIn,
      classOneNoBookGirlBCIn: this.state.classOneNoBookGirlBCIn,
      classOneNoBookTotalBCIn: this.state.classOneNoBookTotalBCIn,
      classOneNoSpBoyBCIn: this.state.classOneNoSpBoyBCIn,
      classOneNoSpGirlBCIn: this.state.classOneNoSpGirlBCIn,
      classOneNoSpTotalBCIn: this.state.classOneNoSpTotalBCIn,
      classOneNoBookSpBoyBCIn: this.state.classOneNoBookSpBoyBCIn,
      classOneNoBookSpGirlBCIn: this.state.classOneNoBookSpGirlBCIn,
      classOneNoBookSpTotalBCIn: this.state.classOneNoBookSpTotalBCIn,

      classTwoNoBoyBCIn: this.state.classTwoNoBoyBCIn,
      classTwoNoGirlBCIn: this.state.classTwoNoGirlBCIn,
      classTwoNoTotalBCIn: this.state.classTwoNoTotalBCIn,
      classTwoNoBookBoyBCIn: this.state.classTwoNoBookBoyBCIn,
      classTwoNoBookGirlBCIn: this.state.classTwoNoBookGirlBCIn,
      classTwoNoBookTotalBCIn: this.state.classTwoNoBookTotalBCIn,
      classTwoNoSpBoyBCIn: this.state.classTwoNoSpBoyBCIn,
      classTwoNoSpGirlBCIn: this.state.classTwoNoSpGirlBCIn,
      classTwoNoSpTotalBCIn: this.state.classTwoNoSpTotalBCIn,
      classTwoNoBookSpBoyBCIn: this.state.classTwoNoBookSpBoyBCIn,
      classTwoNoBookSpGirlBCIn: this.state.classTwoNoBookSpGirlBCIn,
      classTwoNoBookSpTotalBCIn: this.state.classTwoNoBookSpTotalBCIn,

      classThreeNoBoyBCIn: this.state.classThreeNoBoyBCIn,
      classThreeNoGirlBCIn: this.state.classThreeNoGirlBCIn,
      classThreeNoTotalBCIn: this.state.classThreeNoTotalBCIn,
      classThreeNoBookBoyBCIn: this.state.classThreeNoBookBoyBCIn,
      classThreeNoBookGirlBCIn: this.state.classThreeNoBookGirlBCIn,
      classThreeNoBookTotalBCIn: this.state.classThreeNoBookTotalBCIn,
      classThreeNoSpBoyBCIn: this.state.classThreeNoSpBoyBCIn,
      classThreeNoSpGirlBCIn: this.state.classThreeNoSpGirlBCIn,
      classThreeNoSpTotalBCIn: this.state.classThreeNoSpTotalBCIn,
      classThreeNoBookSpBoyBCIn: this.state.classThreeNoBookSpBoyBCIn,
      classThreeNoBookSpGirlBCIn: this.state.classThreeNoBookSpGirlBCIn,
      classThreeNoBookSpTotalBCIn: this.state.classThreeNoBookSpTotalBCIn,

      classFourNoBoyBCIn: this.state.classFourNoBoyBCIn,
      classFourNoGirlBCIn: this.state.classFourNoGirlBCIn,
      classFourNoTotalBCIn: this.state.classFourNoTotalBCIn,
      classFourNoBookBoyBCIn: this.state.classFourNoBookBoyBCIn,
      classFourNoBookGirlBCIn: this.state.classFourNoBookGirlBCIn,
      classFourNoBookTotalBCIn: this.state.classFourNoBookTotalBCIn,
      classFourNoSpBoyBCIn: this.state.classFourNoSpBoyBCIn,
      classFourNoSpGirlBCIn: this.state.classFourNoSpGirlBCIn,
      classFourNoSpTotalBCIn: this.state.classFourNoSpTotalBCIn,
      classFourNoBookSpBoyBCIn: this.state.classFourNoBookSpBoyBCIn,
      classFourNoBookSpGirlBCIn: this.state.classFourNoBookSpGirlBCIn,
      classFourNoBookSpTotalBCIn: this.state.classFourNoBookSpTotalBCIn,

      classFiveNoBoyBCIn: this.state.classFiveNoBoyBCIn,
      classFiveNoGirlBCIn: this.state.classFiveNoGirlBCIn,
      classFiveNoTotalBCIn: this.state.classFiveNoTotalBCIn,
      classFiveNoBookBoyBCIn: this.state.classFiveNoBookBoyBCIn,
      classFiveNoBookGirlBCIn: this.state.classFiveNoBookGirlBCIn,
      classFiveNoBookTotalBCIn: this.state.classFiveNoBookTotalBCIn,
      classFiveNoSpBoyBCIn: this.state.classFiveNoSpBoyBCIn,
      classFiveNoSpGirlBCIn: this.state.classFiveNoSpGirlBCIn,
      classFiveNoSpTotalBCIn: this.state.classFiveNoSpTotalBCIn,
      classFiveNoBookSpBoyBCIn: this.state.classFiveNoBookSpBoyBCIn,
      classFiveNoBookSpGirlBCIn: this.state.classFiveNoBookSpGirlBCIn,
      classFiveNoBookSpTotalBCIn: this.state.classFiveNoBookSpTotalBCIn,
      //Book checkin

      // School total data

      schoolTotalNoGirl: this.state.schoolTotalNoGirl,
      schoolTotalNoBoy: this.state.schoolTotalNoBoy,
      schoolTotalNoGirlBC: this.state.schoolTotalNoGirlBC,
      schoolTotalNoBoyBC: this.state.schoolTotalNoBoyBC,

      schoolTotalNoStudent: this.state.schoolTotalNoStudent,
      schoolTotalNoStudentBC: this.state.schoolTotalNoStudentBC,
      schoolTotalNoBookBC: this.state.schoolTotalNoBookBC,
      schoolTotalNoStudentBCIn: this.state.schoolTotalNoStudentBCIn,
      schoolTotalNoBookBCIn: this.state.schoolTotalNoBookBCIn,

      schoolTotalNoSpStudent: this.state.schoolTotalNoSpStudent,
      schoolTotalNoSpStudentBC: this.state.schoolTotalNoSpStudentBC,
      schoolTotalNoSpBookBC: this.state.schoolTotalNoSpBookBC,
      schoolTotalNoSpStudentBCIn: this.state.schoolTotalNoSpStudentBCIn,
      schoolTotalNoSpBookBCIn: this.state.schoolTotalNoSpBookBCIn,
      // School total data
    };

    // Check duplicate data
    this.state.duplicateBookCheckoutCRF =
      this.state.allBookcheckoutCRFData.filter((item) => {
        return (
          item.visitNo == this.state.visitNo &&
          item.school == this.state.pickerSchool &&
          item.month == this.state.pickerMonth &&
          item.year == this.state.pickerYear
        );
      });
    console.log(
      "Duplicate Bookcheckout CRF Data: ",
      this.state.duplicateBookCheckoutCRF.length
    );
    // Check duplicate data

    // Check empty fields
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
    } else if (this.state.visitNo === 0) {
      this.setState({ visitNoError: "Visit no can not be empty" });
      Alert.alert("Alert", "Visit no can not be empty");
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
    } else if (this.state.communityVolunteer === "") {
      this.setState({
        cVolunteerError: "Community volunteer can not be empty",
      });
      Alert.alert("Alert", "Community volunteer can not be empty");
      return;
    } else if (this.state.pickerGenderCV === "") {
      this.setState({
        cVolunteerGenderError: "Community volunteer gender not be empty",
      });
      Alert.alert("Alert", "Community volunteer gender can not be empty");
      return;
    } else if (this.state.duplicateBookCheckoutCRF.length > 0) {
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
        headTeacherError: "",
        genderError: "",
        monthError: "",
        yearError: "",
        cVolunteerError: "",
        cVolunteerGenderError: "",
      });
      // Check empty fields

      // Send data to API
      try {
        let response = await fetch(
          "http://118.179.80.51:8080/api/v1/book-checkout-community",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBookCheckout),
          }
        );
        if (response.status >= 200 && response.status < 300) {
          Alert.alert("Book checkout data saved successfully!!!");
          this.getAllBookCheckoutCRF();
          this.updateState();
          this.forceUpdate();
        }
      } catch (errors) {
        alert(errors);
      }
      // Send data to API
    }
  };
  // Register new book-checkout CRF data

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
        onPress: this.saveBookCheckoutCommunity,
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
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              marginTop: 50,
              marginBottom: 50,
              alignContent: "center",
              textAlign: "center",
              alignSelf: "center",
              marginLeft: 100,
              marginRight: 100,
            }}
          >
            কমিউনিটি রিডিং ফোরামের মাসিক বই চেক-আউট ও চেক-ইন পর্যবেক্ষণ ফরম
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
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    ফিল্ড অফিস:
                  </Text>
                  <Picker
                    style={{
                      height: 40,
                      width: 150,
                    }}
                    selectedValue={this.state && this.state.pickerOffice}
                    onValueChange={(value) => {
                      this.setState({ pickerOffice: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
                    <Picker.Item label={"DFO"} value={"DFO"} />
                    <Picker.Item label={"CFO"} value={"CFO"} />
                    <Picker.Item label={"NFO"} value={"NFO"} />
                    <Picker.Item label={"SFO"} value={"SFO"} />
                  </Picker>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    প্রোজেক্ট:
                  </Text>
                  <Picker
                    style={{
                      height: 40,
                      width: 150,
                    }}
                    selectedValue={this.state && this.state.pickerProject}
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
              </View>
              <View style={{ flexDirection: "row", padding: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    জেলা:
                  </Text>
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
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    উপজেলা:
                  </Text>
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
                  {/* <Text style={{ color: "red" }}>
                    {this.state.headTeacherError}
                  </Text> */}
                </View>
              </View>
              <View style={{ flexDirection: "row", padding: 10 }}></View>

              <View style={{ flexDirection: "row", padding: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    দায়িত্ব প্রাপ্ত এলপিও এর নামঃ
                  </Text>
                  <Picker
                    style={{
                      height: 40,
                      width: 200,
                    }}
                    selectedValue={this.state.pickerLPO}
                    onValueChange={(value) => {
                      this.setState({ pickerLPO: value });
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
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    দায়িত্ব প্রাপ্ত এলএফ এর নামঃ
                  </Text>
                  <Picker
                    style={{
                      height: 40,
                      width: 200,
                    }}
                    selectedValue={this.state.pickerLF}
                    onValueChange={(value) => {
                      this.setState({ pickerLF: value });
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
              </View>
              <View style={{ flexDirection: "row", padding: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    বিদ্যালয়ের নাম:
                  </Text>

                  <Picker
                    style={{
                      height: 40,
                      width: 180,
                    }}
                    selectedValue={this.state.pickerSchool}
                    onValueChange={(value) => {
                      this.setState({ pickerSchool: value });
                      console.log(this.state.pickerLF.name);
                      console.log(this.state.pickerLPO.name);
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
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    প্রধান শিক্ষকের নাম:
                  </Text>
                  <TextInput
                    style={{
                      height: 30,
                      width: 150,
                      padding: 5,
                      borderWidth: 1,
                    }}
                    placeholder=""
                    onChangeText={(text) =>
                      this.setState({ pickerHeadTeacher: text })
                    }
                    value={this.state.pickerHeadTeacher}
                  />
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
                      width: 150,
                    }}
                    selectedValue={this.state && this.state.pickerGender}
                    onValueChange={(value) => {
                      this.setState({ pickerGender: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
                    <Picker.Item label={"Female"} value={"Female"} />
                    <Picker.Item label={"Male"} value={"Male"} />
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
                    কমিউনিটি ভলান্টিয়ারের নাম:
                  </Text>
                  <TextInput
                    style={{
                      height: 30,
                      width: 200,
                      padding: 5,
                      borderWidth: 1,
                    }}
                    placeholder=""
                    onChangeText={(text) =>
                      this.setState({ communityVolunteer: text })
                    }
                    value={this.state.communityVolunteer}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    কমিউনিটি ভলান্টিয়ারের লিঙ্গ:
                  </Text>
                  <Picker
                    style={{
                      height: 40,
                      width: 200,
                    }}
                    selectedValue={this.state && this.state.pickerGenderCV}
                    onValueChange={(value) => {
                      this.setState({ pickerGenderCV: value });
                    }}
                    itemStyle={{ color: "white" }}
                  >
                    <Picker.Item label={"নির্বাচন করুন"} value={""} />
                    <Picker.Item label={"Female"} value={"Female"} />
                    <Picker.Item label={"Male"} value={"Male"} />
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
                      width: 200,
                    }}
                    selectedValue={this.state && this.state.pickerVisitor}
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
                    selectedValue={this.state && this.state.pickerDesignation}
                    onValueChange={(value) => {
                      this.setState({ pickerDesignation: value });
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
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    পরিদর্শক এর অফিস:
                  </Text>
                  <Picker
                    selectedValue={this.state && this.state.pickerVisitorOffice}
                    onValueChange={(value) => {
                      this.setState({ pickerVisitorOffice: value });
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
                    <Picker.Item label={"SFO"} value={"SFO"} />
                  </Picker>
                </View>
              </View>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>নির্দেশনা </Text>
            <Card style={{ padding: 10, margin: 10 }}>
              <Text style={{ padding: 5, fontWeight: "bold", fontSize: 18 }}>
                পূর্ববর্তী মাসে বই চেক-আউট হয়েছে (নিচের টেবিল অনুযায়ী প্রতিটি
                কমিউনিটি রিডিং ফোরাম থেকে তথ্য সংগ্রহ করুন এবং প্রতি মাসের তথ্য
                পরের মাসের ১৫ তারিখের সিস্টেমে ইনপুট করুন) ।
              </Text>
            </Card>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.bigRedText}>
              শ্রেণি অনুযায়ী সকল শিক্ষার্থীর বই চেক-আউট ও চেক-ইন তথ্য
            </Text>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
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
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={styles.bigGreenText}>
                      প্রাক-প্রাথমিক শ্রেণি
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      সিআরএফের বইয়ের চেক-আউট তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          placeholder=""
                          value={this.state.priPrimaryBoy + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            if (isNaN(value)) return false;

                            this.setState({
                              priPrimaryBoy: value,
                              priPrimaryTotal:
                                value + this.state.priPrimaryGirl,
                              schoolTotalNoStudent:
                                value +
                                this.state.priPrimaryGirl +
                                this.state.classFiveTotal +
                                this.state.classFourTotal +
                                this.state.classThreeTotal +
                                this.state.classTwoTotal +
                                this.state.classOneTotal,
                              schoolTotalNoBoy:
                                value +
                                this.state.classOneBoy +
                                this.state.classTwoBoy +
                                this.state.classThreeBoy +
                                this.state.classFourBoy +
                                this.state.classFiveBoy,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          placeholder=""
                          value={this.state.priPrimaryGirl + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            if (isNaN(value)) return false;

                            this.setState({
                              priPrimaryGirl: value,
                              priPrimaryTotal: value + this.state.priPrimaryBoy,
                              schoolTotalNoStudent:
                                value +
                                this.state.priPrimaryBoy +
                                this.state.classFiveTotal +
                                this.state.classFourTotal +
                                this.state.classThreeTotal +
                                this.state.classTwoTotal +
                                this.state.classOneTotal,
                              schoolTotalNoGirl:
                                value +
                                this.state.classOneGirl +
                                this.state.classTwoGirl +
                                this.state.classThreeGirl +
                                this.state.classFourGirl +
                                this.state.classFiveGirl,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryTotal + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.priPrimaryNoBoyBC + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoBoyBC: value,
                              priPrimaryNoTotalBC:
                                value + this.state.priPrimaryNoGirlBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.priPrimaryNoGirlBC +
                                this.state.classOneNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFourNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoBoyBC:
                                value +
                                this.state.classOneNoBoyBC +
                                this.state.classTwoNoBoyBC +
                                this.state.classThreeNoBoyBC +
                                this.state.classFourNoBoyBC +
                                this.state.classFiveNoBoyBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.priPrimaryNoGirlBC + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoGirlBC: value,
                              priPrimaryNoTotalBC:
                                value + this.state.priPrimaryNoBoyBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.priPrimaryNoBoyBC +
                                this.state.classOneNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFourNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoGirlBC:
                                value +
                                this.state.classOneNoGirlBC +
                                this.state.classTwoNoGirlBC +
                                this.state.classThreeNoGirlBC +
                                this.state.classFourNoGirlBC +
                                this.state.classFiveNoGirlBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoTotalBC + ""}
                          editable={false}
                          onChangeText={(text) =>
                            this.setState({
                              priPrimaryNoTotalBC: text,
                            })
                          }
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoBookBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoBookBoyBC: value,
                              priPrimaryNoBookTotalBC:
                                value + this.state.priPrimaryNoBookGirlBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.priPrimaryNoBookGirlBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFourNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoBookGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoBookGirlBC: value,
                              priPrimaryNoBookTotalBC:
                                value + this.state.priPrimaryNoBookBoyBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.priPrimaryNoBookBoyBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFourNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoBookTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              priPrimaryNoBookTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      সিআরএফের বইয়ের চেক ইন/ফেরত তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, বালক:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.priPrimaryNoBoyBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoBoyBCIn: value,
                              priPrimaryNoTotalBCIn:
                                value + this.state.priPrimaryNoGirlBCIn,
                              schoolTotalNoStudentBCIn:
                                value +
                                this.state.priPrimaryNoGirlBCIn +
                                this.state.classOneNoTotalBCIn +
                                this.state.classTwoNoTotalBCIn +
                                this.state.classThreeNoTotalBCIn +
                                this.state.classFourNoTotalBCIn +
                                this.state.classFiveNoTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী চেক ইন/ফেরত দিয়েছে, বালিকা:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.priPrimaryNoGirlBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoGirlBCIn: value,
                              priPrimaryNoTotalBCIn:
                                value + this.state.priPrimaryNoBoyBCIn,
                              schoolTotalNoStudentBCIn:
                                value +
                                this.state.priPrimaryNoBoyBCIn +
                                this.state.classOneNoTotalBCIn +
                                this.state.classTwoNoTotalBCIn +
                                this.state.classThreeNoTotalBCIn +
                                this.state.classFourNoTotalBCIn +
                                this.state.classFiveNoTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, মোট:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoBookBoyBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoBookBoyBCIn: value,
                              priPrimaryNoBookTotalBCIn:
                                value + this.state.priPrimaryNoBookGirlBCIn,
                              schoolTotalNoBookBCIn:
                                value +
                                this.state.priPrimaryNoBookGirlBCIn +
                                this.state.classOneNoBookTotalBCIn +
                                this.state.classTwoNoBookTotalBCIn +
                                this.state.classThreeNoBookTotalBCIn +
                                this.state.classFourNoBookTotalBCIn +
                                this.state.classFiveNoBookTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoBookGirlBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoBookGirlBCIn: value,
                              priPrimaryNoBookTotalBCIn:
                                value + this.state.priPrimaryNoBookBoyBCIn,
                              schoolTotalNoBookBCIn:
                                value +
                                this.state.priPrimaryNoBookBoyBCIn +
                                this.state.classOneNoBookTotalBCIn +
                                this.state.classTwoNoBookTotalBCIn +
                                this.state.classThreeNoBookTotalBCIn +
                                this.state.classFourNoBookTotalBCIn +
                                this.state.classFiveNoBookTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা, মোট:</Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoBookTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      বিশেষ চাহিদা সম্পন্ন শিক্ষার্থীর বই চেক-আউট তথ্য
                      (প্রাক-প্রাথমিক শ্রেণি)
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimarySpBoy + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimarySpBoy: value,
                              priPrimarySpTotal:
                                value + this.state.priPrimarySpGirl,
                              schoolTotalNoSpStudent:
                                value +
                                this.state.priPrimarySpGirl +
                                this.state.classOneSpTotal +
                                this.state.classTwoSpTotal +
                                this.state.classThreeSpTotal +
                                this.state.classFourSpTotal +
                                this.state.classFiveSpTotal,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimarySpGirl + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimarySpGirl: value,
                              priPrimarySpTotal:
                                value + this.state.priPrimarySpBoy,
                              schoolTotalNoSpStudent:
                                value +
                                this.state.priPrimarySpBoy +
                                this.state.classOneSpTotal +
                                this.state.classTwoSpTotal +
                                this.state.classThreeSpTotal +
                                this.state.classFourSpTotal +
                                this.state.classFiveSpTotal,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimarySpTotal + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoSpBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoSpBoyBC: value,
                              priPrimaryNoSpTotalBC:
                                value + this.state.priPrimaryNoSpGirlBC,
                              schoolTotalNoSpStudentBC:
                                value +
                                this.state.priPrimaryNoSpGirlBC +
                                this.state.classOneNoSpTotalBC +
                                this.state.classTwoNoSpTotalBC +
                                this.state.classThreeNoSpTotalBC +
                                this.state.classFourNoSpTotalBC +
                                this.state.classFiveNoSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoSpGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoSpGirlBC: value,
                              priPrimaryNoSpTotalBC:
                                value + this.state.priPrimaryNoSpBoyBC,
                              schoolTotalNoSpStudentBC:
                                value +
                                this.state.priPrimaryNoSpBoyBC +
                                this.state.classOneNoSpTotalBC +
                                this.state.classTwoNoSpTotalBC +
                                this.state.classThreeNoSpTotalBC +
                                this.state.classFourNoSpTotalBC +
                                this.state.classFiveNoSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoSpTotalBC + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoBookSpBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoBookSpBoyBC: value,
                              priPrimaryNoBookSpTotalBC:
                                value + this.state.priPrimaryNoBookSpGirlBC,
                              schoolTotalNoSpBookBC:
                                value +
                                this.state.priPrimaryNoBookSpGirlBC +
                                this.state.classOneNoBookSpTotalBC +
                                this.state.classTwoNoBookSpTotalBC +
                                this.state.classThreeNoBookSpTotalBC +
                                this.state.classFourNoBookSpTotalBC +
                                this.state.classFiveNoBookSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoBookSpGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoBookSpGirlBC: value,
                              priPrimaryNoBookSpTotalBC:
                                value + this.state.priPrimaryNoBookSpBoyBC,
                              schoolTotalNoSpBookBC:
                                value +
                                this.state.priPrimaryNoBookSpBoyBC +
                                this.state.classOneNoBookSpTotalBC +
                                this.state.classTwoNoBookSpTotalBC +
                                this.state.classThreeNoBookSpTotalBC +
                                this.state.classFourNoBookSpTotalBC +
                                this.state.classFiveNoBookSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoBookSpTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              priPrimaryNoBookSpTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      বিশেষ চাহিদা সম্পন্ন শিক্ষার্থীর বই চেক ইন/ফেরত তথ্য
                      (প্রাক-প্রাথমিক শ্রেণি)
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, বালক:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.priPrimaryNoSpBoyBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoSpBoyBCIn: value,
                              priPrimaryNoSpTotalBCIn:
                                value + this.state.priPrimaryNoSpGirlBCIn,
                              schoolTotalNoSpStudentBCIn:
                                value +
                                this.state.priPrimaryNoSpGirlBCIn +
                                this.state.classOneNoSpTotalBCIn +
                                this.state.classTwoNoSpTotalBCIn +
                                this.state.classThreeNoSpTotalBCIn +
                                this.state.classFourNoSpTotalBCIn +
                                this.state.classFiveNoSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী চেক ইন/ফেরত দিয়েছে, বালিকা:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.priPrimaryNoSpGirlBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoSpGirlBCIn: value,
                              priPrimaryNoSpTotalBCIn:
                                value + this.state.priPrimaryNoSpBoyBCIn,
                              schoolTotalNoSpStudentBCIn:
                                value +
                                this.state.priPrimaryNoSpBoyBCIn +
                                this.state.classOneNoSpTotalBCIn +
                                this.state.classTwoNoSpTotalBCIn +
                                this.state.classThreeNoSpTotalBCIn +
                                this.state.classFourNoSpTotalBCIn +
                                this.state.classFiveNoSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, মোট:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoSpTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoBookSpBoyBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoBookSpBoyBCIn: value,
                              priPrimaryNoBookSpTotalBCIn:
                                value + this.state.priPrimaryNoBookSpGirlBCIn,
                              schoolTotalNoSpBookBCIn:
                                value +
                                this.state.priPrimaryNoBookSpGirlBCIn +
                                this.state.classOneNoBookSpTotalBCIn +
                                this.state.classTwoNoBookSpTotalBCIn +
                                this.state.classThreeNoBookSpTotalBCIn +
                                this.state.classFourNoBookSpTotalBCIn +
                                this.state.classFiveNoBookSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoBookSpGirlBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              priPrimaryNoBookSpGirlBCIn: value,
                              priPrimaryNoBookSpTotalBCIn:
                                value + this.state.priPrimaryNoBookSpBoyBCIn,
                              schoolTotalNoSpBookBCIn:
                                value +
                                this.state.priPrimaryNoBookSpBoyBCIn +
                                this.state.classOneNoBookSpTotalBCIn +
                                this.state.classTwoNoBookSpTotalBCIn +
                                this.state.classThreeNoBookSpTotalBCIn +
                                this.state.classFourNoBookSpTotalBCIn +
                                this.state.classFiveNoBookSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা, মোট:</Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.priPrimaryNoBookSpTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
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
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={styles.bigGreenText}>প্রথম শ্রেণি</Text>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      সিআরএফের বইয়ের চেক আউট তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneBoy + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneBoy: value,
                              classOneTotal: value + this.state.classOneGirl,
                              schoolTotalNoStudent:
                                value +
                                this.state.classOneGirl +
                                this.state.classFiveTotal +
                                this.state.classFourTotal +
                                this.state.classThreeTotal +
                                this.state.classTwoTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoBoy:
                                value +
                                this.state.priPrimaryBoy +
                                this.state.classTwoBoy +
                                this.state.classThreeBoy +
                                this.state.classFourBoy +
                                this.state.classFiveBoy,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneGirl + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneGirl: value,
                              classOneTotal: value + this.state.classOneBoy,
                              schoolTotalNoStudent:
                                value +
                                this.state.classOneBoy +
                                this.state.classFiveTotal +
                                this.state.classFourTotal +
                                this.state.classThreeTotal +
                                this.state.classTwoTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoGirl:
                                value +
                                this.state.priPrimaryGirl +
                                this.state.classTwoGirl +
                                this.state.classThreeGirl +
                                this.state.classFourGirl +
                                this.state.classFiveGirl,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneTotal + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classOneTotal: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoBoyBC: value,
                              classOneNoTotalBC:
                                value + this.state.classOneNoGirlBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classOneNoGirlBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFourNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoBoyBC:
                                value +
                                this.state.priPrimaryNoBoyBC +
                                this.state.classTwoNoBoyBC +
                                this.state.classThreeNoBoyBC +
                                this.state.classFourNoBoyBC +
                                this.state.classFiveNoBoyBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoGirlBC: value,
                              classOneNoTotalBC:
                                value + this.state.classOneNoBoyBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classOneNoBoyBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFourNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoGirlBC:
                                value +
                                this.state.priPrimaryNoGirlBC +
                                this.state.classTwoNoGirlBC +
                                this.state.classThreeNoGirlBC +
                                this.state.classFourNoGirlBC +
                                this.state.classFiveNoGirlBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classOneNoTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBookBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoBookBoyBC: value,
                              classOneNoBookTotalBC:
                                value + this.state.classOneNoBookGirlBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classOneNoBookGirlBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFourNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBookGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoBookGirlBC: value,
                              classOneNoBookTotalBC:
                                value + this.state.classOneNoBookBoyBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classOneNoBookBoyBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFourNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBookTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classOneNoBookTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      সিআরএফের বইয়ের চেক ইন/ফেরত তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, বালক:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classOneNoBoyBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoBoyBCIn: value,
                              classOneNoTotalBCIn:
                                value + this.state.classOneNoGirlBCIn,
                              schoolTotalNoStudentBCIn:
                                value +
                                this.state.classOneNoGirlBCIn +
                                this.state.priPrimaryNoTotalBCIn +
                                this.state.classTwoNoTotalBCIn +
                                this.state.classThreeNoTotalBCIn +
                                this.state.classFourNoTotalBCIn +
                                this.state.classFiveNoTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী চেক ইন/ফেরত দিয়েছে, বালিকা:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classOneNoGirlBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoGirlBCIn: value,
                              classOneNoTotalBCIn:
                                value + this.state.classOneNoBoyBCIn,
                              schoolTotalNoStudentBCIn:
                                value +
                                this.state.classOneNoBoyBCIn +
                                this.state.priPrimaryNoTotalBCIn +
                                this.state.classTwoNoTotalBCIn +
                                this.state.classThreeNoTotalBCIn +
                                this.state.classFourNoTotalBCIn +
                                this.state.classFiveNoTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, মোট:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBookBoyBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoBookBoyBCIn: value,
                              classOneNoBookTotalBCIn:
                                value + this.state.classOneNoBookGirlBCIn,
                              schoolTotalNoBookBCIn:
                                value +
                                this.state.classOneNoBookGirlBCIn +
                                this.state.priPrimaryNoBookTotalBCIn +
                                this.state.classTwoNoBookTotalBCIn +
                                this.state.classThreeNoBookTotalBCIn +
                                this.state.classFourNoBookTotalBCIn +
                                this.state.classFiveNoBookTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBookGirlBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoBookGirlBCIn: value,
                              classOneNoBookTotalBCIn:
                                value + this.state.classOneNoBookBoyBCIn,
                              schoolTotalNoBookBCIn:
                                value +
                                this.state.classOneNoBookBoyBCIn +
                                this.state.priPrimaryNoBookTotalBCIn +
                                this.state.classTwoNoBookTotalBCIn +
                                this.state.classThreeNoBookTotalBCIn +
                                this.state.classFourNoBookTotalBCIn +
                                this.state.classFiveNoBookTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা, মোট:</Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBookTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      বিশেষ চাহিদা সম্পন্ন শিক্ষার্থীর বই চেক-আউট তথ্য (প্রথম
                      শ্রেণি)
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneSpBoy + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneSpBoy: value,
                              classOneSpTotal:
                                value + this.state.classOneSpGirl,
                              schoolTotalNoSpStudent:
                                value +
                                this.state.classOneSpGirl +
                                this.state.priPrimarySpTotal +
                                this.state.classTwoSpTotal +
                                this.state.classThreeSpTotal +
                                this.state.classFourSpTotal +
                                this.state.classFiveSpTotal,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneSpGirl + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneSpGirl: value,
                              classOneSpTotal: value + this.state.classOneSpBoy,
                              schoolTotalNoSpStudent:
                                value +
                                this.state.classOneSpBoy +
                                this.state.priPrimarySpTotal +
                                this.state.classTwoSpTotal +
                                this.state.classThreeSpTotal +
                                this.state.classFourSpTotal +
                                this.state.classFiveSpTotal,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneSpTotal + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoSpBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoSpBoyBC: value,
                              classOneNoSpTotalBC:
                                value + this.state.classOneNoSpGirlBC,
                              schoolTotalNoSpStudentBC:
                                value +
                                this.state.classOneNoSpGirlBC +
                                this.state.priPrimaryNoSpTotalBC +
                                this.state.classTwoNoSpTotalBC +
                                this.state.classThreeNoSpTotalBC +
                                this.state.classFourNoSpTotalBC +
                                this.state.classFiveNoSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoSpGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoSpGirlBC: value,
                              classOneNoSpTotalBC:
                                value + this.state.classOneNoSpBoyBC,
                              schoolTotalNoSpStudentBC:
                                value +
                                this.state.classOneNoSpBoyBC +
                                this.state.priPrimaryNoSpTotalBC +
                                this.state.classTwoNoSpTotalBC +
                                this.state.classThreeNoSpTotalBC +
                                this.state.classFourNoSpTotalBC +
                                this.state.classFiveNoSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoSpTotalBC + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBookSpBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoBookSpBoyBC: value,
                              classOneNoBookSpTotalBC:
                                value + this.state.classOneNoBookSpGirlBC,
                              schoolTotalNoSpBookBC:
                                value +
                                this.state.classOneNoBookSpGirlBC +
                                this.state.priPrimaryNoBookSpTotalBC +
                                this.state.classTwoNoBookSpTotalBC +
                                this.state.classThreeNoBookSpTotalBC +
                                this.state.classFourNoBookSpTotalBC +
                                this.state.classFiveNoBookSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBookSpGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoBookSpGirlBC: value,
                              classOneNoBookSpTotalBC:
                                value + this.state.classOneNoBookSpBoyBC,
                              schoolTotalNoSpBookBC:
                                value +
                                this.state.classOneNoBookSpBoyBC +
                                this.state.priPrimaryNoBookSpTotalBC +
                                this.state.classTwoNoBookSpTotalBC +
                                this.state.classThreeNoBookSpTotalBC +
                                this.state.classFourNoBookSpTotalBC +
                                this.state.classFiveNoBookSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBookSpTotalBC + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      বিশেষ চাহিদা সম্পন্ন শিক্ষার্থীর বই চেক ইন/ফেরত তথ্য
                      (প্রথম শ্রেণি)
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, বালক:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classOneNoSpBoyBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoSpBoyBCIn: value,
                              classOneNoSpTotalBCIn:
                                value + this.state.classOneNoSpGirlBCIn,
                              schoolTotalNoSpStudentBCIn:
                                value +
                                this.state.classOneNoSpGirlBCIn +
                                this.state.priPrimaryNoSpTotalBCIn +
                                this.state.classTwoNoSpTotalBCIn +
                                this.state.classThreeNoSpTotalBCIn +
                                this.state.classFourNoSpTotalBCIn +
                                this.state.classFiveNoSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী চেক ইন/ফেরত দিয়েছে, বালিকা:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classOneNoSpGirlBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoSpGirlBCIn: value,
                              classOneNoSpTotalBCIn:
                                value + this.state.classOneNoSpBoyBCIn,
                              schoolTotalNoSpStudentBCIn:
                                value +
                                this.state.classOneNoSpBoyBCIn +
                                this.state.priPrimaryNoSpTotalBCIn +
                                this.state.classTwoNoSpTotalBCIn +
                                this.state.classThreeNoSpTotalBCIn +
                                this.state.classFourNoSpTotalBCIn +
                                this.state.classFiveNoSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, মোট:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoSpTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBookSpBoyBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoBookSpBoyBCIn: value,
                              classOneNoBookSpTotalBCIn:
                                value + this.state.classOneNoBookSpGirlBCIn,
                              schoolTotalNoSpBookBCIn:
                                value +
                                this.state.classOneNoBookSpGirlBCIn +
                                this.state.priPrimaryNoBookSpTotalBCIn +
                                this.state.classTwoNoBookSpTotalBCIn +
                                this.state.classThreeNoBookSpTotalBCIn +
                                this.state.classFourNoBookSpTotalBCIn +
                                this.state.classFiveNoBookSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBookSpGirlBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classOneNoBookSpGirlBCIn: value,
                              classOneNoBookSpTotalBCIn:
                                value + this.state.classOneNoBookSpBoyBCIn,
                              schoolTotalNoSpBookBCIn:
                                value +
                                this.state.classOneNoBookSpBoyBCIn +
                                this.state.priPrimaryNoBookSpTotalBCIn +
                                this.state.classTwoNoBookSpTotalBCIn +
                                this.state.classThreeNoBookSpTotalBCIn +
                                this.state.classFourNoBookSpTotalBCIn +
                                this.state.classFiveNoBookSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা, মোট:</Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classOneNoBookSpTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
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
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={styles.bigGreenText}>দ্বিতীয় শ্রেণি</Text>
                  </Card>

                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      সিআরএফের বইয়ের চেক আউট তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoBoy + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoBoy: value,
                              classTwoTotal: value + this.state.classTwoGirl,
                              schoolTotalNoStudent:
                                value +
                                this.state.classTwoGirl +
                                this.state.classFiveTotal +
                                this.state.classFourTotal +
                                this.state.classThreeTotal +
                                this.state.classOneTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoBoy:
                                value +
                                this.state.priPrimaryBoy +
                                this.state.classOneBoy +
                                this.state.classThreeBoy +
                                this.state.classFourBoy +
                                this.state.classFiveBoy,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoGirl + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoGirl: value,
                              classTwoTotal: value + this.state.classTwoBoy,
                              schoolTotalNoStudent:
                                value +
                                this.state.classTwoBoy +
                                this.state.classFiveTotal +
                                this.state.classFourTotal +
                                this.state.classThreeTotal +
                                this.state.classOneTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoGirl:
                                value +
                                this.state.classOneGirl +
                                this.state.priPrimaryGirl +
                                this.state.classThreeGirl +
                                this.state.classFourGirl +
                                this.state.classFiveGirl,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoTotal + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classTwoTotal: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoBoyBC: value,
                              classTwoNoTotalBC:
                                value + this.state.classTwoNoGirlBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classTwoNoGirlBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classOneNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFourNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoBoyBC:
                                value +
                                this.state.priPrimaryNoBoyBC +
                                this.state.classOneNoBoyBC +
                                this.state.classThreeNoBoyBC +
                                this.state.classFourNoBoyBC +
                                this.state.classFiveNoBoyBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoGirlBC: value,
                              classTwoNoTotalBC:
                                value + this.state.classTwoNoBoyBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classTwoNoBoyBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classOneNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFourNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoGirlBC:
                                value +
                                this.state.priPrimaryNoGirlBC +
                                this.state.classOneNoGirlBC +
                                this.state.classThreeNoGirlBC +
                                this.state.classFourNoGirlBC +
                                this.state.classFiveNoGirlBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classTwoNoTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBookBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoBookBoyBC: value,
                              classTwoNoBookTotalBC:
                                value + this.state.classTwoNoBookGirlBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classTwoNoBookGirlBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFourNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBookGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoBookGirlBC: value,
                              classTwoNoBookTotalBC:
                                value + this.state.classTwoNoBookBoyBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classTwoNoBookBoyBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFourNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBookTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classTwoNoBookTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      সিআরএফের বইয়ের চেক ইন/ফেরত তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, বালক:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classTwoNoBoyBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoBoyBCIn: value,
                              classTwoNoTotalBCIn:
                                value + this.state.classTwoNoGirlBCIn,
                              schoolTotalNoStudentBCIn:
                                value +
                                this.state.classTwoNoGirlBCIn +
                                this.state.priPrimaryNoTotalBCIn +
                                this.state.classOneNoTotalBCIn +
                                this.state.classThreeNoTotalBCIn +
                                this.state.classFourNoTotalBCIn +
                                this.state.classFiveNoTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী চেক ইন/ফেরত দিয়েছে, বালিকা:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classTwoNoGirlBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoGirlBCIn: value,
                              classTwoNoTotalBCIn:
                                value + this.state.classTwoNoBoyBCIn,
                              schoolTotalNoStudentBCIn:
                                value +
                                this.state.classTwoNoBoyBCIn +
                                this.state.priPrimaryNoTotalBCIn +
                                this.state.classOneNoTotalBCIn +
                                this.state.classThreeNoTotalBCIn +
                                this.state.classFourNoTotalBCIn +
                                this.state.classFiveNoTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, মোট:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBookBoyBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoBookBoyBCIn: value,
                              classTwoNoBookTotalBCIn:
                                value + this.state.classTwoNoBookGirlBCIn,
                              schoolTotalNoBookBCIn:
                                value +
                                this.state.classTwoNoBookGirlBCIn +
                                this.state.priPrimaryNoBookTotalBCIn +
                                this.state.classOneNoBookTotalBCIn +
                                this.state.classThreeNoBookTotalBCIn +
                                this.state.classFourNoBookTotalBCIn +
                                this.state.classFiveNoBookTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBookGirlBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoBookGirlBCIn: value,
                              classTwoNoBookTotalBCIn:
                                value + this.state.classTwoNoBookBoyBCIn,
                              schoolTotalNoBookBCIn:
                                value +
                                this.state.classTwoNoBookBoyBCIn +
                                this.state.priPrimaryNoBookTotalBCIn +
                                this.state.classOneNoBookTotalBCIn +
                                this.state.classThreeNoBookTotalBCIn +
                                this.state.classFourNoBookTotalBCIn +
                                this.state.classFiveNoBookTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা, মোট:</Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBookTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      বিশেষ চাহিদা সম্পন্ন শিক্ষার্থীর বই চেক-আউট তথ্য (দ্বিতীয়
                      শ্রেণি)
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoSpBoy + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoSpBoy: value,
                              classTwoSpTotal:
                                value + this.state.classTwoSpGirl,
                              schoolTotalNoSpStudent:
                                value +
                                this.state.classTwoSpGirl +
                                this.state.priPrimarySpTotal +
                                this.state.classOneSpTotal +
                                this.state.classThreeSpTotal +
                                this.state.classFourSpTotal +
                                this.state.classFiveSpTotal,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoSpGirl + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoSpGirl: value,
                              classTwoSpTotal: value + this.state.classTwoSpBoy,
                              schoolTotalNoSpStudent:
                                value +
                                this.state.classTwoSpBoy +
                                this.state.priPrimarySpTotal +
                                this.state.classOneSpTotal +
                                this.state.classThreeSpTotal +
                                this.state.classFourSpTotal +
                                this.state.classFiveSpTotal,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoSpTotal + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoSpBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoSpBoyBC: value,
                              classTwoNoSpTotalBC:
                                value + this.state.classTwoNoSpGirlBC,
                              schoolTotalNoSpStudentBC:
                                value +
                                this.state.classTwoNoSpGirlBC +
                                this.state.priPrimaryNoSpTotalBC +
                                this.state.classOneNoSpTotalBC +
                                this.state.classThreeNoSpTotalBC +
                                this.state.classFourNoSpTotalBC +
                                this.state.classFiveNoSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoSpGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoSpGirlBC: value,
                              classTwoNoSpTotalBC:
                                value + this.state.classTwoNoSpBoyBC,
                              schoolTotalNoSpStudentBC:
                                value +
                                this.state.classTwoNoSpBoyBC +
                                this.state.priPrimaryNoSpTotalBC +
                                this.state.classOneNoSpTotalBC +
                                this.state.classThreeNoSpTotalBC +
                                this.state.classFourNoSpTotalBC +
                                this.state.classFiveNoSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoSpTotalBC + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBookSpBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoBookSpBoyBC: value,
                              classTwoNoBookSpTotalBC:
                                value + this.state.classTwoNoBookSpGirlBC,
                              schoolTotalNoSpBookBC:
                                value +
                                this.state.classTwoNoBookSpGirlBC +
                                this.state.priPrimaryNoBookSpTotalBC +
                                this.state.classOneNoBookSpTotalBC +
                                this.state.classThreeNoBookSpTotalBC +
                                this.state.classFourNoBookSpTotalBC +
                                this.state.classFiveNoBookSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBookSpGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoBookSpGirlBC: value,
                              classTwoNoBookSpTotalBC:
                                value + this.state.classTwoNoBookSpBoyBC,
                              schoolTotalNoSpBookBC:
                                value +
                                this.state.classTwoNoBookSpBoyBC +
                                this.state.priPrimaryNoBookSpTotalBC +
                                this.state.classOneNoBookSpTotalBC +
                                this.state.classThreeNoBookSpTotalBC +
                                this.state.classFourNoBookSpTotalBC +
                                this.state.classFiveNoBookSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBookSpTotalBC + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      বিশেষ চাহিদা সম্পন্ন শিক্ষার্থীর বই চেক ইন/ফেরত তথ্য
                      (দ্বিতীয় শ্রেণি)
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, বালক:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classTwoNoSpBoyBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoSpBoyBCIn: value,
                              classTwoNoSpTotalBCIn:
                                value + this.state.classTwoNoSpGirlBCIn,
                              schoolTotalNoSpStudentBCIn:
                                value +
                                this.state.classTwoNoSpGirlBCIn +
                                this.state.priPrimaryNoSpTotalBCIn +
                                this.state.classOneNoSpTotalBCIn +
                                this.state.classThreeNoSpTotalBCIn +
                                this.state.classFourNoSpTotalBCIn +
                                this.state.classFiveNoSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী চেক ইন/ফেরত দিয়েছে, বালিকা:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classTwoNoSpGirlBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoSpGirlBCIn: value,
                              classTwoNoSpTotalBCIn:
                                value + this.state.classTwoNoSpBoyBCIn,
                              schoolTotalNoSpStudentBCIn:
                                value +
                                this.state.classTwoNoSpBoyBCIn +
                                this.state.priPrimaryNoSpTotalBCIn +
                                this.state.classOneNoSpTotalBCIn +
                                this.state.classThreeNoSpTotalBCIn +
                                this.state.classFourNoSpTotalBCIn +
                                this.state.classFiveNoSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, মোট:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoSpTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBookSpBoyBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoBookSpBoyBCIn: value,
                              classTwoNoBookSpTotalBCIn:
                                value + this.state.classTwoNoBookSpGirlBCIn,
                              schoolTotalNoSpBookBCIn:
                                value +
                                this.state.classTwoNoBookSpGirlBCIn +
                                this.state.priPrimaryNoBookSpTotalBCIn +
                                this.state.classOneNoBookSpTotalBCIn +
                                this.state.classThreeNoBookSpTotalBCIn +
                                this.state.classFourNoBookSpTotalBCIn +
                                this.state.classFiveNoBookSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBookSpGirlBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classTwoNoBookSpGirlBCIn: value,
                              classTwoNoBookSpTotalBCIn:
                                value + this.state.classTwoNoBookSpBoyBCIn,
                              schoolTotalNoSpBookBCIn:
                                value +
                                this.state.classTwoNoBookSpBoyBCIn +
                                this.state.priPrimaryNoBookSpTotalBCIn +
                                this.state.classOneNoBookSpTotalBCIn +
                                this.state.classThreeNoBookSpTotalBCIn +
                                this.state.classFourNoBookSpTotalBCIn +
                                this.state.classFiveNoBookSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা, মোট:</Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classTwoNoBookSpTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
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
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={styles.bigGreenText}>তৃতীয় শ্রেণি</Text>
                  </Card>

                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      সিআরএফের বইয়ের চেক আউট তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeBoy + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeBoy: value,
                              classThreeTotal:
                                value + this.state.classThreeGirl,
                              schoolTotalNoStudent:
                                value +
                                this.state.classThreeGirl +
                                this.state.classFiveTotal +
                                this.state.classFourTotal +
                                this.state.classTwoTotal +
                                this.state.classOneTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoBoy:
                                value +
                                this.state.priPrimaryBoy +
                                this.state.classOneBoy +
                                this.state.classTwoBoy +
                                this.state.classFourBoy +
                                this.state.classFiveBoy,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeGirl + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeGirl: value,
                              classThreeTotal: value + this.state.classThreeBoy,
                              schoolTotalNoStudent:
                                value +
                                this.state.classThreeBoy +
                                this.state.classFiveTotal +
                                this.state.classFourTotal +
                                this.state.classTwoTotal +
                                this.state.classOneTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoGirl:
                                value +
                                this.state.classOneGirl +
                                this.state.classTwoGirl +
                                this.state.priPrimaryGirl +
                                this.state.classFourGirl +
                                this.state.classFiveGirl,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeTotal + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classThreeTotal: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoBoyBC: value,
                              classThreeNoTotalBC:
                                value + this.state.classThreeNoGirlBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classThreeNoGirlBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classOneNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classFourNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoBoyBC:
                                value +
                                this.state.priPrimaryNoBoyBC +
                                this.state.classTwoNoBoyBC +
                                this.state.classOneNoBoyBC +
                                this.state.classFourNoBoyBC +
                                this.state.classFiveNoBoyBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoGirlBC: value,
                              classThreeNoTotalBC:
                                value + this.state.classThreeNoBoyBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classThreeNoBoyBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classOneNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classFourNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoGirlBC:
                                value +
                                this.state.priPrimaryNoGirlBC +
                                this.state.classTwoNoGirlBC +
                                this.state.classOneNoGirlBC +
                                this.state.classFourNoGirlBC +
                                this.state.classFiveNoGirlBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classThreeNoTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBookBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoBookBoyBC: value,
                              classThreeNoBookTotalBC:
                                value + this.state.classThreeNoBookGirlBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classThreeNoBookGirlBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classFourNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBookGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoBookGirlBC: value,
                              classThreeNoBookTotalBC:
                                value + this.state.classThreeNoBookBoyBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classThreeNoBookBoyBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classFourNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBookTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classThreeNoBookTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      সিআরএফের বইয়ের চেক ইন/ফেরত তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, বালক:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classThreeNoBoyBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoBoyBCIn: value,
                              classThreeNoTotalBCIn:
                                value + this.state.classThreeNoGirlBCIn,
                              schoolTotalNoStudentBCIn:
                                value +
                                this.state.classFourNoBoyBCIn +
                                this.state.priPrimaryNoTotalBCIn +
                                this.state.classOneNoTotalBCIn +
                                this.state.classTwoNoTotalBCIn +
                                this.state.classFourNoTotalBCIn +
                                this.state.classFiveNoTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী চেক ইন/ফেরত দিয়েছে, বালিকা:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classThreeNoGirlBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoGirlBCIn: value,
                              classThreeNoTotalBCIn:
                                value + this.state.classThreeNoBoyBCIn,
                              schoolTotalNoStudentBCIn:
                                value +
                                this.state.classThreeNoBoyBCIn +
                                this.state.priPrimaryNoTotalBCIn +
                                this.state.classOneNoTotalBCIn +
                                this.state.classTwoNoTotalBCIn +
                                this.state.classFourNoTotalBCIn +
                                this.state.classFiveNoTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, মোট:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBookBoyBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoBookBoyBCIn: value,
                              classThreeNoBookTotalBCIn:
                                value + this.state.classThreeNoBookGirlBCIn,
                              schoolTotalNoBookBCIn:
                                value +
                                this.state.classThreeNoBookGirlBCIn +
                                this.state.priPrimaryNoBookTotalBCIn +
                                this.state.classOneNoBookTotalBCIn +
                                this.state.classTwoNoBookTotalBCIn +
                                this.state.classFourNoBookTotalBCIn +
                                this.state.classFiveNoBookTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBookGirlBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoBookGirlBCIn: value,
                              classThreeNoBookTotalBCIn:
                                value + this.state.classThreeNoBookBoyBCIn,
                              schoolTotalNoBookBCIn:
                                value +
                                this.state.classThreeNoBookBoyBCIn +
                                this.state.priPrimaryNoBookTotalBCIn +
                                this.state.classOneNoBookTotalBCIn +
                                this.state.classTwoNoBookTotalBCIn +
                                this.state.classFourNoBookTotalBCIn +
                                this.state.classFiveNoBookTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা, মোট:</Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBookTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      বিশেষ চাহিদা সম্পন্ন শিক্ষার্থীর বই চেক-আউট তথ্য (তৃতীয়
                      শ্রেণি)
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeSpBoy + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeSpBoy: value,
                              classThreeSpTotal:
                                value + this.state.classThreeSpGirl,
                              schoolTotalNoSpStudent:
                                value +
                                this.state.classThreeSpGirl +
                                this.state.priPrimarySpTotal +
                                this.state.classOneSpTotal +
                                this.state.classTwoSpTotal +
                                this.state.classFourSpTotal +
                                this.state.classFiveSpTotal,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeSpGirl + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeSpGirl: value,
                              classThreeSpTotal:
                                value + this.state.classThreeSpBoy,
                              schoolTotalNoSpStudent:
                                value +
                                this.state.classThreeSpBoy +
                                this.state.priPrimarySpTotal +
                                this.state.classOneSpTotal +
                                this.state.classTwoSpTotal +
                                this.state.classFourSpTotal +
                                this.state.classFiveSpTotal,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeSpTotal + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoSpBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoSpBoyBC: value,
                              classThreeNoSpTotalBC:
                                value + this.state.classThreeNoSpGirlBC,
                              schoolTotalNoSpStudentBC:
                                value +
                                this.state.classThreeNoSpGirlBC +
                                this.state.priPrimaryNoSpTotalBC +
                                this.state.classOneNoSpTotalBC +
                                this.state.classTwoNoSpTotalBC +
                                this.state.classFourNoSpTotalBC +
                                this.state.classFiveNoSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoSpGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoSpGirlBC: value,
                              classThreeNoSpTotalBC:
                                value + this.state.classThreeNoSpBoyBC,
                              schoolTotalNoSpStudentBC:
                                value +
                                this.state.classThreeNoSpBoyBC +
                                this.state.priPrimaryNoSpTotalBC +
                                this.state.classOneNoSpTotalBC +
                                this.state.classTwoNoSpTotalBC +
                                this.state.classFourNoSpTotalBC +
                                this.state.classFiveNoSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoSpTotalBC + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBookSpBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoBookSpBoyBC: value,
                              classThreeNoBookSpTotalBC:
                                value + this.state.classThreeNoBookSpGirlBC,
                              schoolTotalNoSpBookBC:
                                value +
                                this.state.classThreeNoBookSpGirlBC +
                                this.state.priPrimaryNoBookSpTotalBC +
                                this.state.classOneNoBookSpTotalBC +
                                this.state.classTwoNoBookSpTotalBC +
                                this.state.classFourNoBookSpTotalBC +
                                this.state.classFiveNoBookSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBookSpGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoBookSpGirlBC: value,
                              classThreeNoBookSpTotalBC:
                                value + this.state.classThreeNoBookSpBoyBC,
                              schoolTotalNoSpBookBC:
                                value +
                                this.state.classThreeNoBookSpBoyBC +
                                this.state.priPrimaryNoBookSpTotalBC +
                                this.state.classOneNoBookSpTotalBC +
                                this.state.classTwoNoBookSpTotalBC +
                                this.state.classFourNoBookSpTotalBC +
                                this.state.classFiveNoBookSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBookSpTotalBC + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      বিশেষ চাহিদা সম্পন্ন শিক্ষার্থীর বই চেক ইন/ফেরত তথ্য
                      (তৃতীয় শ্রেণি)
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, বালক:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classThreeNoSpBoyBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoSpBoyBCIn: value,
                              classThreeNoSpTotalBCIn:
                                value + this.state.classThreeNoSpGirlBCIn,
                              schoolTotalNoSpStudentBCIn:
                                value +
                                this.state.classThreeNoSpGirlBCIn +
                                this.state.priPrimaryNoSpTotalBCIn +
                                this.state.classOneNoSpTotalBCIn +
                                this.state.classTwoNoSpTotalBCIn +
                                this.state.classFourNoSpTotalBCIn +
                                this.state.classFiveNoSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী চেক ইন/ফেরত দিয়েছে, বালিকা:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classThreeNoSpGirlBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoSpGirlBCIn: value,
                              classThreeNoSpTotalBCIn:
                                value + this.state.classThreeNoSpBoyBCIn,
                              schoolTotalNoSpStudentBCIn:
                                value +
                                this.state.classThreeNoSpBoyBCIn +
                                this.state.priPrimaryNoSpTotalBCIn +
                                this.state.classOneNoSpTotalBCIn +
                                this.state.classTwoNoSpTotalBCIn +
                                this.state.classFourNoSpTotalBCIn +
                                this.state.classFiveNoSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, মোট:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoSpTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBookSpBoyBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoBookSpBoyBCIn: value,
                              classThreeNoBookSpTotalBCIn:
                                value + this.state.classThreeNoBookSpGirlBCIn,
                              schoolTotalNoSpBookBCIn:
                                value +
                                this.state.classThreeNoBookSpGirlBCIn +
                                this.state.priPrimaryNoBookSpTotalBCIn +
                                this.state.classOneNoBookSpTotalBCIn +
                                this.state.classTwoNoBookSpTotalBCIn +
                                this.state.classFourNoBookSpTotalBCIn +
                                this.state.classFiveNoBookSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBookSpGirlBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classThreeNoBookSpGirlBCIn: value,
                              classThreeNoBookSpTotalBCIn:
                                value + this.state.classThreeNoBookSpBoyBCIn,
                              schoolTotalNoSpBookBCIn:
                                value +
                                this.state.classThreeNoBookSpBoyBCIn +
                                this.state.priPrimaryNoBookSpTotalBCIn +
                                this.state.classOneNoBookSpTotalBCIn +
                                this.state.classTwoNoBookSpTotalBCIn +
                                this.state.classFourNoBookSpTotalBCIn +
                                this.state.classFiveNoBookSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা, মোট:</Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classThreeNoBookSpTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
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
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={styles.bigGreenText}>চতুর্থ শ্রেণি</Text>
                  </Card>

                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      সিআরএফের বইয়ের চেক আউট তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourBoy + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourBoy: value,
                              classFourTotal: value + this.state.classFourGirl,
                              schoolTotalNoStudent:
                                value +
                                this.state.classFourGirl +
                                this.state.classFiveTotal +
                                this.state.classThreeTotal +
                                this.state.classTwoTotal +
                                this.state.classOneTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoBoy:
                                value +
                                this.state.priPrimaryBoy +
                                this.state.classOneBoy +
                                this.state.classTwoBoy +
                                this.state.classThreeBoy +
                                this.state.classFiveBoy,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourGirl + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourGirl: value,
                              classFourTotal: value + this.state.classFourBoy,
                              schoolTotalNoStudent:
                                value +
                                this.state.classFourBoy +
                                this.state.classFiveTotal +
                                this.state.classThreeTotal +
                                this.state.classTwoTotal +
                                this.state.classOneTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoGirl:
                                value +
                                this.state.classOneGirl +
                                this.state.classTwoGirl +
                                this.state.classThreeGirl +
                                this.state.priPrimaryGirl +
                                this.state.classFiveGirl,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourTotal + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classFourTotal: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoBoyBC: value,
                              classFourNoTotalBC:
                                value + this.state.classFourNoGirlBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classFourNoGirlBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classOneNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoBoyBC:
                                value +
                                this.state.priPrimaryNoBoyBC +
                                this.state.classTwoNoBoyBC +
                                this.state.classThreeNoBoyBC +
                                this.state.classOneNoBoyBC +
                                this.state.classFiveNoBoyBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoGirlBC: value,
                              classFourNoTotalBC:
                                value + this.state.classFourNoBoyBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classFourNoBoyBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classOneNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFiveNoTotalBC,
                              schoolTotalNoGirlBC:
                                value +
                                this.state.priPrimaryNoGirlBC +
                                this.state.classTwoNoGirlBC +
                                this.state.classThreeNoGirlBC +
                                this.state.classOneNoGirlBC +
                                this.state.classFiveNoGirlBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classFourNoTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBookBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoBookBoyBC: value,
                              classFourNoBookTotalBC:
                                value + this.state.classFourNoBookGirlBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classFourNoBookGirlBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBookGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoBookGirlBC: value,
                              classFourNoBookTotalBC:
                                value + this.state.classFourNoBookBoyBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classFourNoBookBoyBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFiveNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBookTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classFourNoBookTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      সিআরএফের বইয়ের চেক ইন/ফেরত তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, বালক:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classFourNoBoyBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoBoyBCIn: value,
                              classFourNoTotalBCIn:
                                value + this.state.classFourNoGirlBCIn,
                              schoolTotalNoStudentBCIn:
                                value +
                                this.state.classFourNoGirlBCIn +
                                this.state.priPrimaryNoTotalBCIn +
                                this.state.classOneNoTotalBCIn +
                                this.state.classTwoNoTotalBCIn +
                                this.state.classThreeNoTotalBCIn +
                                this.state.classFiveNoTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী চেক ইন/ফেরত দিয়েছে, বালিকা:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classFourNoGirlBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoGirlBCIn: value,
                              classFourNoTotalBCIn:
                                value + this.state.classFourNoBoyBCIn,
                              schoolTotalNoStudentBCIn:
                                value +
                                this.state.classFourNoBoyBCIn +
                                this.state.priPrimaryNoTotalBCIn +
                                this.state.classOneNoTotalBCIn +
                                this.state.classTwoNoTotalBCIn +
                                this.state.classThreeNoTotalBCIn +
                                this.state.classFiveNoTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, মোট:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBookBoyBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoBookBoyBCIn: value,
                              classFourNoBookTotalBCIn:
                                value + this.state.classFourNoBookGirlBCIn,
                              schoolTotalNoBookBCIn:
                                value +
                                this.state.classFourNoBookGirlBCIn +
                                this.state.priPrimaryNoBookTotalBCIn +
                                this.state.classOneNoBookTotalBCIn +
                                this.state.classTwoNoBookTotalBCIn +
                                this.state.classThreeNoBookTotalBCIn +
                                this.state.classFiveNoBookTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBookGirlBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoBookGirlBCIn: value,
                              classFourNoBookTotalBCIn:
                                value + this.state.classFourNoBookBoyBCIn,
                              schoolTotalNoBookBCIn:
                                value +
                                this.state.classFourNoBookBoyBCIn +
                                this.state.priPrimaryNoBookTotalBCIn +
                                this.state.classOneNoBookTotalBCIn +
                                this.state.classTwoNoBookTotalBCIn +
                                this.state.classThreeNoBookTotalBCIn +
                                this.state.classFiveNoBookTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা, মোট:</Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBookTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      বিশেষ চাহিদা সম্পন্ন শিক্ষার্থীর বই চেক-আউট তথ্য (চতুর্থ
                      শ্রেণি)
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourSpBoy + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourSpBoy: value,
                              classFourSpTotal:
                                value + this.state.classFourSpGirl,
                              schoolTotalNoSpStudent:
                                value +
                                this.state.classFourSpGirl +
                                this.state.priPrimarySpTotal +
                                this.state.classOneSpTotal +
                                this.state.classTwoSpTotal +
                                this.state.classThreeSpTotal +
                                this.state.classFiveSpTotal,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourSpGirl + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourSpGirl: value,
                              classFourSpTotal:
                                value + this.state.classFourSpBoy,
                              schoolTotalNoSpStudent:
                                value +
                                this.state.classFourSpBoy +
                                this.state.priPrimarySpTotal +
                                this.state.classOneSpTotal +
                                this.state.classTwoSpTotal +
                                this.state.classThreeSpTotal +
                                this.state.classFiveSpTotal,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourSpTotal + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoSpBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoSpBoyBC: value,
                              classFourNoSpTotalBC:
                                value + this.state.classFourNoSpGirlBC,
                              schoolTotalNoSpStudentBC:
                                value +
                                this.state.classFourNoSpGirlBC +
                                this.state.priPrimaryNoSpTotalBC +
                                this.state.classOneNoSpTotalBC +
                                this.state.classTwoNoSpTotalBC +
                                this.state.classThreeNoSpTotalBC +
                                this.state.classFiveNoSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoSpGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoSpGirlBC: value,
                              classFourNoSpTotalBC:
                                value + this.state.classFourNoSpBoyBC,
                              schoolTotalNoSpStudentBC:
                                value +
                                this.state.classFourNoSpBoyBC +
                                this.state.priPrimaryNoSpTotalBC +
                                this.state.classOneNoSpTotalBC +
                                this.state.classTwoNoSpTotalBC +
                                this.state.classThreeNoSpTotalBC +
                                this.state.classFiveNoSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoSpTotalBC + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBookSpBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoBookSpBoyBC: value,
                              classFourNoBookSpTotalBC:
                                value + this.state.classFourNoBookSpGirlBC,
                              schoolTotalNoSpBookBC:
                                value +
                                this.state.classFourNoBookSpGirlBC +
                                this.state.priPrimaryNoBookSpTotalBC +
                                this.state.classOneNoBookSpTotalBC +
                                this.state.classTwoNoBookSpTotalBC +
                                this.state.classThreeNoBookSpTotalBC +
                                this.state.classFiveNoBookSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBookSpGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoBookSpGirlBC: value,
                              classFourNoBookSpTotalBC:
                                value + this.state.classFourNoBookSpBoyBC,
                              schoolTotalNoSpBookBC:
                                value +
                                this.state.classFourNoBookSpBoyBC +
                                this.state.priPrimaryNoBookSpTotalBC +
                                this.state.classOneNoBookSpTotalBC +
                                this.state.classTwoNoBookSpTotalBC +
                                this.state.classThreeNoBookSpTotalBC +
                                this.state.classFiveNoBookSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBookSpTotalBC + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      বিশেষ চাহিদা সম্পন্ন শিক্ষার্থীর বই চেক ইন/ফেরত তথ্য
                      (চতুর্থ শ্রেণি)
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, বালক:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classFourNoSpBoyBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoSpBoyBCIn: value,
                              classFourNoSpTotalBCIn:
                                value + this.state.classFourNoSpGirlBCIn,
                              schoolTotalNoSpStudentBCIn:
                                value +
                                this.state.classFourNoSpGirlBCIn +
                                this.state.priPrimaryNoSpTotalBCIn +
                                this.state.classOneNoSpTotalBCIn +
                                this.state.classTwoNoSpTotalBCIn +
                                this.state.classThreeNoSpTotalBCIn +
                                this.state.classFiveNoSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী চেক ইন/ফেরত দিয়েছে, বালিকা:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classFourNoSpGirlBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoSpGirlBCIn: value,
                              classFourNoSpTotalBCIn:
                                value + this.state.classFourNoSpBoyBCIn,
                              schoolTotalNoSpStudentBCIn:
                                value +
                                this.state.classFourNoSpBoyBCIn +
                                this.state.priPrimaryNoSpTotalBCIn +
                                this.state.classOneNoSpTotalBCIn +
                                this.state.classTwoNoSpTotalBCIn +
                                this.state.classThreeNoSpTotalBCIn +
                                this.state.classFiveNoSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, মোট:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoSpTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBookSpBoyBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoBookSpBoyBCIn: value,
                              classFourNoBookSpTotalBCIn:
                                value + this.state.classFourNoBookSpGirlBCIn,
                              schoolTotalNoSpBookBCIn:
                                value +
                                this.state.classFourNoBookSpGirlBCIn +
                                this.state.priPrimaryNoBookSpTotalBCIn +
                                this.state.classOneNoBookSpTotalBCIn +
                                this.state.classTwoNoBookSpTotalBCIn +
                                this.state.classThreeNoBookSpTotalBCIn +
                                this.state.classFiveNoBookSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBookSpGirlBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFourNoBookSpGirlBCIn: value,
                              classFourNoBookSpTotalBCIn:
                                value + this.state.classFourNoBookSpBoyBCIn,
                              schoolTotalNoSpBookBCIn:
                                value +
                                this.state.classFourNoBookSpBoyBCIn +
                                this.state.priPrimaryNoBookSpTotalBCIn +
                                this.state.classOneNoBookSpTotalBCIn +
                                this.state.classTwoNoBookSpTotalBCIn +
                                this.state.classThreeNoBookSpTotalBCIn +
                                this.state.classFiveNoBookSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা, মোট:</Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFourNoBookSpTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
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
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={styles.bigGreenText}>পঞ্চম শ্রেণি</Text>
                  </Card>

                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      সিআরএফের বইয়ের চেক আউট তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveBoy + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveBoy: value,
                              classFiveTotal: value + this.state.classFiveGirl,
                              schoolTotalNoStudent:
                                value +
                                this.state.classFiveGirl +
                                this.state.classFourTotal +
                                this.state.classThreeTotal +
                                this.state.classTwoTotal +
                                this.state.classOneTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoBoy:
                                value +
                                this.state.priPrimaryBoy +
                                this.state.classOneBoy +
                                this.state.classTwoBoy +
                                this.state.classThreeBoy +
                                this.state.classFourBoy,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveGirl + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveGirl: value,
                              classFiveTotal: value + this.state.classFiveBoy,
                              schoolTotalNoStudent:
                                value +
                                this.state.classFiveBoy +
                                this.state.classFourTotal +
                                this.state.classThreeTotal +
                                this.state.classTwoTotal +
                                this.state.classOneTotal +
                                this.state.priPrimaryTotal,
                              schoolTotalNoGirl:
                                value +
                                this.state.classOneGirl +
                                this.state.classTwoGirl +
                                this.state.classThreeGirl +
                                this.state.classFourGirl +
                                this.state.priPrimaryGirl,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveTotal + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classFiveTotal: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoBoyBC: value,
                              classFiveNoTotalBC:
                                value + this.state.classFiveNoGirlBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classFiveNoGirlBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classOneNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFourNoTotalBC,
                              schoolTotalNoBoyBC:
                                value +
                                this.state.priPrimaryNoBoyBC +
                                this.state.classTwoNoBoyBC +
                                this.state.classThreeNoBoyBC +
                                this.state.classFourNoBoyBC +
                                this.state.classOneNoBoyBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoGirlBC: value,
                              classFiveNoTotalBC:
                                value + this.state.classFiveNoBoyBC,
                              schoolTotalNoStudentBC:
                                value +
                                this.state.classFiveNoBoyBC +
                                this.state.priPrimaryNoTotalBC +
                                this.state.classOneNoTotalBC +
                                this.state.classTwoNoTotalBC +
                                this.state.classThreeNoTotalBC +
                                this.state.classFourNoTotalBC,
                              schoolTotalNoGirlBC:
                                value +
                                this.state.priPrimaryNoGirlBC +
                                this.state.classTwoNoGirlBC +
                                this.state.classThreeNoGirlBC +
                                this.state.classFourNoGirlBC +
                                this.state.classOneNoGirlBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classFiveNoTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBookBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoBookBoyBC: value,
                              classFiveNoBookTotalBC:
                                value + this.state.classFiveNoBookGirlBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classFiveNoBookGirlBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFourNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBookGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoBookGirlBC: value,
                              classFiveNoBookTotalBC:
                                value + this.state.classFiveNoBookBoyBC,
                              schoolTotalNoBookBC:
                                value +
                                this.state.classFiveNoBookBoyBC +
                                this.state.priPrimaryNoBookTotalBC +
                                this.state.classOneNoBookTotalBC +
                                this.state.classTwoNoBookTotalBC +
                                this.state.classThreeNoBookTotalBC +
                                this.state.classFourNoBookTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBookTotalBC + ""}
                          editable={false}
                          onChangeText={(text) => {
                            this.setState({
                              classFiveNoBookTotalBC: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      সিআরএফের বইয়ের চেক ইন/ফেরত তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, বালক:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classFiveNoBoyBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoBoyBCIn: value,
                              classFiveNoTotalBCIn:
                                value + this.state.classFiveNoGirlBCIn,
                              schoolTotalNoStudentBCIn:
                                value +
                                this.state.classFiveNoGirlBCIn +
                                this.state.priPrimaryNoTotalBCIn +
                                this.state.classOneNoTotalBCIn +
                                this.state.classTwoNoTotalBCIn +
                                this.state.classThreeNoTotalBCIn +
                                this.state.classFourNoTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী চেক ইন/ফেরত দিয়েছে, বালিকা:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classFiveNoGirlBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoGirlBCIn: value,
                              classFiveNoTotalBCIn:
                                value + this.state.classFiveNoBoyBCIn,
                              schoolTotalNoStudentBCIn:
                                value +
                                this.state.classFiveNoBoyBCIn +
                                this.state.priPrimaryNoTotalBCIn +
                                this.state.classOneNoTotalBCIn +
                                this.state.classTwoNoTotalBCIn +
                                this.state.classThreeNoTotalBCIn +
                                this.state.classFourNoTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, মোট:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBookBoyBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoBookBoyBCIn: value,
                              classFiveNoBookTotalBCIn:
                                value + this.state.classFiveNoBookGirlBCIn,
                              schoolTotalNoBookBCIn:
                                value +
                                this.state.classFiveNoBookGirlBCIn +
                                this.state.priPrimaryNoBookTotalBCIn +
                                this.state.classOneNoBookTotalBCIn +
                                this.state.classTwoNoBookTotalBCIn +
                                this.state.classThreeNoBookTotalBCIn +
                                this.state.classFourNoBookTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBookGirlBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoBookGirlBCIn: value,
                              classFiveNoBookTotalBCIn:
                                value + this.state.classFiveNoBookBoyBCIn,
                              schoolTotalNoBookBCIn:
                                value +
                                this.state.classFiveNoBookBoyBCIn +
                                this.state.priPrimaryNoBookTotalBCIn +
                                this.state.classOneNoBookTotalBCIn +
                                this.state.classTwoNoBookTotalBCIn +
                                this.state.classThreeNoBookTotalBCIn +
                                this.state.classFourNoBookTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা, মোট:</Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBookTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      বিশেষ চাহিদা সম্পন্ন শিক্ষার্থীর বই চেক-আউট তথ্য (পঞ্চম
                      শ্রেণি)
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveSpBoy + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveSpBoy: value,
                              classFiveSpTotal:
                                value + this.state.classFiveSpGirl,
                              schoolTotalNoSpStudent:
                                value +
                                this.state.classFiveSpGirl +
                                this.state.priPrimarySpTotal +
                                this.state.classOneSpTotal +
                                this.state.classTwoSpTotal +
                                this.state.classThreeSpTotal +
                                this.state.classFourSpTotal,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveSpGirl + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveSpGirl: value,
                              classFiveSpTotal:
                                value + this.state.classFiveSpBoy,
                              schoolTotalNoSpStudent:
                                value +
                                this.state.classFiveSpBoy +
                                this.state.priPrimarySpTotal +
                                this.state.classOneSpTotal +
                                this.state.classTwoSpTotal +
                                this.state.classThreeSpTotal +
                                this.state.classFourSpTotal,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>শিক্ষার্থীর সংখ্যা, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveSpTotal + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoSpBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoSpBoyBC: value,
                              classFiveNoSpTotalBC:
                                value + this.state.classFiveNoSpGirlBC,
                              schoolTotalNoSpStudentBC:
                                value +
                                this.state.classFiveNoSpGirlBC +
                                this.state.priPrimaryNoSpTotalBC +
                                this.state.classOneNoSpTotalBC +
                                this.state.classTwoNoSpTotalBC +
                                this.state.classThreeNoSpTotalBC +
                                this.state.classFourNoSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoSpGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoSpGirlBC: value,
                              classFiveNoSpTotalBC:
                                value + this.state.classFiveNoSpBoyBC,
                              schoolTotalNoSpStudentBC:
                                value +
                                this.state.classFiveNoSpBoyBC +
                                this.state.priPrimaryNoSpTotalBC +
                                this.state.classOneNoSpTotalBC +
                                this.state.classTwoNoSpTotalBC +
                                this.state.classThreeNoSpTotalBC +
                                this.state.classFourNoSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত জন শিক্ষার্থী বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoSpTotalBC + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBookSpBoyBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoBookSpBoyBC: value,
                              classFiveNoBookSpTotalBC:
                                value + this.state.classFiveNoBookSpGirlBC,
                              schoolTotalNoSpBookBC:
                                value +
                                this.state.classFiveNoBookSpGirlBC +
                                this.state.priPrimaryNoBookSpTotalBC +
                                this.state.classOneNoBookSpTotalBC +
                                this.state.classTwoNoBookSpTotalBC +
                                this.state.classThreeNoBookSpTotalBC +
                                this.state.classFourNoBookSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBookSpGirlBC + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoBookSpGirlBC: value,
                              classFiveNoBookSpTotalBC:
                                value + this.state.classFiveNoBookSpBoyBC,
                              schoolTotalNoSpBookBC:
                                value +
                                this.state.classFiveNoBookSpBoyBC +
                                this.state.priPrimaryNoBookSpTotalBC +
                                this.state.classOneNoBookSpTotalBC +
                                this.state.classTwoNoBookSpTotalBC +
                                this.state.classThreeNoBookSpTotalBC +
                                this.state.classFourNoBookSpTotalBC,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>মোট বই চেক আউট করেছে, মোট: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBookSpTotalBC + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      বিশেষ চাহিদা সম্পন্ন শিক্ষার্থীর বই চেক ইন/ফেরত তথ্য
                      (পঞ্চম শ্রেণি)
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, বালক:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classFiveNoSpBoyBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoSpBoyBCIn: value,
                              classFiveNoSpTotalBCIn:
                                value + this.state.classFiveNoSpGirlBCIn,
                              schoolTotalNoSpStudentBCIn:
                                value +
                                this.state.classFiveNoSpGirlBCIn +
                                this.state.priPrimaryNoSpTotalBCIn +
                                this.state.classOneNoSpTotalBCIn +
                                this.state.classTwoNoSpTotalBCIn +
                                this.state.classThreeNoSpTotalBCIn +
                                this.state.classFourNoSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী চেক ইন/ফেরত দিয়েছে, বালিকা:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          editable={true}
                          value={this.state.classFiveNoSpGirlBCIn + ""}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoSpGirlBCIn: value,
                              classFiveNoSpTotalBCIn:
                                value + this.state.classFiveNoSpBoyBCIn,
                              schoolTotalNoSpStudentBCIn:
                                value +
                                this.state.classFiveNoSpBoyBCIn +
                                this.state.priPrimaryNoSpTotalBCIn +
                                this.state.classOneNoSpTotalBCIn +
                                this.state.classTwoNoSpTotalBCIn +
                                this.state.classThreeNoSpTotalBCIn +
                                this.state.classFourNoSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>
                          কত জন শিক্ষার্থী বই চেক ইন/ফেরত দিয়েছে, মোট:
                        </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoSpTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালক: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBookSpBoyBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoBookSpBoyBCIn: value,
                              classFiveNoBookSpTotalBCIn:
                                value + this.state.classFiveNoBookSpGirlBCIn,
                              schoolTotalNoSpBookBCIn:
                                value +
                                this.state.classFiveNoBookSpGirlBCIn +
                                this.state.priPrimaryNoBookSpTotalBCIn +
                                this.state.classOneNoBookSpTotalBCIn +
                                this.state.classTwoNoBookSpTotalBCIn +
                                this.state.classThreeNoBookSpTotalBCIn +
                                this.state.classFourNoBookSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা , বালিকা: </Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBookSpGirlBCIn + ""}
                          editable={true}
                          onChangeText={(text) => {
                            const value = Number(text);
                            this.setState({
                              classFiveNoBookSpGirlBCIn: value,
                              classFiveNoBookSpTotalBCIn:
                                value + this.state.classFiveNoBookSpBoyBCIn,
                              schoolTotalNoSpBookBCIn:
                                value +
                                this.state.classFiveNoBookSpBoyBCIn +
                                this.state.priPrimaryNoBookSpTotalBCIn +
                                this.state.classOneNoBookSpTotalBCIn +
                                this.state.classTwoNoBookSpTotalBCIn +
                                this.state.classThreeNoBookSpTotalBCIn +
                                this.state.classFourNoBookSpTotalBCIn,
                            });
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 2 }}>
                        <Text>কত বই চেক ইন/ফেরত দেয়ার সংখ্যা, মোট:</Text>
                        <TextInput
                          style={{
                            height: 30,
                            width: 150,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          keyboardType="numeric"
                          value={this.state.classFiveNoBookSpTotalBCIn + ""}
                          editable={false}
                        />
                      </View>
                    </View>
                  </Card>
                </Card>
              </View>
            </Card>

            <Card style={{ padding: 10, margin: 10, flex: 1 }}>
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
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={styles.bigGreenText}>
                      কমিউনিটি রিডিং ফোরামের মোট তথ্য
                    </Text>
                  </Card>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      flex: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      সিআরএফের মোট তথ্য
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>সিআরএফের মোট মেয়ে শিক্ষার্থীর সংখ্যা:</Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoGirl + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>সিআরএফের মোট ছেলে শিক্ষার্থীর সংখ্যা:</Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoBoy + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>সিআরএফের মোট শিক্ষার্থীর সংখ্যা: </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoStudent + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>
                          সিআরএফের মোট বই চেক আউট করা মেয়ে শিক্ষার্থীর সংখ্যা:
                        </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoGirlBC + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>
                          সিআরএফের মোট বই চেক আউট করা ছেলে শিক্ষার্থীর সংখ্যা:
                        </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoBoyBC + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>
                          সিআরএফের মোট বই চেক আউট করা শিক্ষার্থীর সংখ্যা:
                        </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoStudentBC + ""}
                        />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>সিআরএফের মোট চেক আউটকৃত বইয়ের সংখ্যা: </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoBookBC + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>
                          সিআরএফের মোট বই চেক ইন করা শিক্ষার্থীর সংখ্যা:
                        </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoStudentBCIn + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>সিআরএফের মোট চেক ইনকৃত বইয়ের সংখ্যা: </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoBookBCIn + ""}
                        />
                      </View>
                    </View>

                    <Text
                      style={{
                        padding: 10,
                        margin: 10,
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "blue",
                      }}
                    >
                      সিআরএফের মোট তথ্য(বিশেষ চাহিদা সম্পন্ন)
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>সিআরএফের মোট শিক্ষার্থীর সংখ্যা:</Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoSpStudent + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>
                          সিআরএফের মোট বই চেক আউট করা শিক্ষার্থীর সংখ্যা:
                        </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoSpStudentBC + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>সিআরএফের মোট চেক আউটকৃত বইয়ের সংখ্যা: </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoSpBookBC + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>
                          সিআরএফের মোট বই চেক ইন করা শিক্ষার্থীর সংখ্যা:
                        </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoSpStudentBCIn + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>সিআরএফের মোট চেক ইনকৃত বইয়ের সংখ্যা: </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoSpBookBCIn + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>
                          সিআরএফের মোট বই চেক ইন করা ছেলে শিক্ষার্থীর সংখ্যা:
                        </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoSpStudentBCIn + ""}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 5, padding: 2 }}>
                        <Text>
                          সিআরএফের মোট বই চেক ইন করা মেয়ে শিক্ষার্থীর সংখ্যা:
                        </Text>
                      </View>
                      <View style={{ flex: 1, padding: 2, marginLeft: 100 }}>
                        <TextInput
                          style={{
                            height: 30,
                            width: 50,
                            padding: 5,
                            borderWidth: 1,
                          }}
                          editable={false}
                          keyboardType="numeric"
                          value={this.state.schoolTotalNoSpStudentBCIn + ""}
                        />
                      </View>
                    </View>
                  </Card>
                </Card>
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
    fontSize: 24,
    alignSelf: "center",
    alignContent: "center",
  },
  bigGreenText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
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
