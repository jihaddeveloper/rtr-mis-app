//  Author: Mohammad Jihad Hossain
//  Create Date: 07/08/2021
//  Modify Date: 08/09/2026
//  Description: Auth Context component

import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// Make sure your backend port matches this and is running!
const Auth_API_URL = process.env.EXPO_PUBLIC_AUTH_LOGIN;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores { token: string, role: 'admin' | 'user' }
  const [isLoading, setIsLoading] = useState(true);

  // Global Axios interceptor configuration (Configured once at root setup)
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      async (config) => {
        try {
          const storedUser = await SecureStore.getItemAsync("user_session");
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser?.token) {
              config.headers.Authorization = `Bearer ${parsedUser.token}`;
            }
          }
        } catch (e) {
          console.error("Interceptor failed to read token", e);
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  // Restore token on app boot
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync("user_session");
        if (storedUser) {
          //  FIX 1: Only parse exactly once
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          // Seed the initial default header instance
          if (parsedUser.token) {
            axios.defaults.headers.common["Authorization"] =
              `Bearer ${parsedUser.token}`;
          }
        }
      } catch (e) {
        console.error("Failed to load secure token", e);
      } finally {
        setIsLoading(false);
      }
    };
    bootstrapAsync();
  }, []);

  const login = async (username, password) => {
    setIsLoading(true);

    try {
      if (!username || !password) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      const response = await axios.post(`${Auth_API_URL}`, {
        username,
        password,
      });
      //console.log("Login successful:", response.data);

      if (response.data && response.data.token) {
        const userData = response.data;

        // Save to storage and immediately update global state
        await SecureStore.setItemAsync(
          "user_session",
          JSON.stringify(userData),
        );
        setUser(userData);
        // Save to storage and immediately update global state

        // Update default header for immediate subsequent requests
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${userData.token}`;
      } else {
        Alert.alert(
          "Login Error",
          "No authorization token received from the server.",
        );
      }
    } catch (error) {
      console.error(
        "Network / Server Error:",
        error.response?.data || error.message,
      );
      Alert.alert(
        "Login Failed",
        error.response?.data?.message ||
          "Invalid credentials or server unreachable.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await SecureStore.deleteItemAsync("user_session");
      delete axios.defaults.headers.common["Authorization"]; // Strip headers on logout
      setUser(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
