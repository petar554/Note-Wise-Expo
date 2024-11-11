import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useLogin from "../hooks/useLogin";

import ClapIcon from "../svg/Clap";

// Helper function for scaling based on screen width
const { width } = Dimensions.get("window");
const scale = (size) => (width / 375) * size; // 375 is base width (e.g., iPhone 8)

const LoginScreen = () => {
  const { login, loading, error } = useLogin();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    language_id: "en",
    remember: false,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // try {
    //   await login(formData);
    //   console.log('Login successful.');

    // Navigate to the desired screen after login
    navigation.navigate("CreateNote"); // Replace 'Notes' with your target screen
    // } catch (err) {
    //   console.error('Login Error:', err);
    //   Alert.alert('Error', err.message);
    // }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoiding}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Logo and Title */}
          <View style={styles.logoContainer}>
            {/* <Image
              source={require('../../assets/noun-high-five-1154833.png')}
              style={styles.logo}
              resizeMode="contain"
            /> */}
            <ClapIcon height={100} width={100} />
            <Text style={styles.title}>appname</Text>
          </View>

          {/* Error Message */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* Form */}
          <View style={styles.form}>
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="you@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.username}
                onChangeText={(text) => handleChange("username", text)}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => {
                /* Handle forgot password */
              }}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Optional: Sign Up Link */}
          {/* <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Don't have an account?{' '}
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
          </View> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
    backgroundColor: "#F3F4F6", // bg-gray-100
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: scale(16),
    backgroundColor: "#F3F4F6", // bg-gray-100
  },
  container: {
    width: "100%",
    maxWidth: scale(400), // Adjust max width for larger screens
    alignSelf: "center",
    backgroundColor: "#F3F4F6", // bg-gray-100
    padding: scale(24),
    borderRadius: scale(12),
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scale(30), // mb-[90px] adjusted for scaling
    flexWrap: "wrap",
  },
  logo: {
    width: scale(80), // width="100" scaled
    height: scale(80), // height="100" scaled
  },
  title: {
    marginLeft: scale(12),
    fontSize: scale(24), // text-3xl -> ~24 in React Native
    fontWeight: "bold",
    textAlign: "center",
    color: "#1F2937", // text-gray-800
    flexShrink: 1,
  },
  errorText: {
    marginBottom: scale(16),
    color: "#DC2626", // text-red-600
    textAlign: "center",
    fontSize: scale(14),
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: scale(16),
  },
  label: {
    fontSize: scale(14),
    fontWeight: "500",
    color: "#4B5563", // text-gray-700
    marginBottom: scale(4),
  },
  input: {
    backgroundColor: "#FFFFFF", // bg-white for better contrast
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderColor: "#1F2937", // border-gray-800
    borderWidth: 1,
    borderRadius: scale(8),
    fontSize: scale(16),
    color: "#1F2937",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: scale(24),
  },
  forgotPasswordText: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#000000", // text-black
    textDecorationLine: "underline",
  },
  button: {
    width: "50%",
    height: scale(45),
    backgroundColor: "white", // bg-black replaced with dark gray for better visibility
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(50),
    alignSelf: "center",
    borderWidth: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "black", // text-white
    fontWeight: "400",
    fontSize: scale(16),
  },
  signUpContainer: {
    marginTop: scale(16),
    alignItems: "center",
  },
  signUpText: {
    fontSize: scale(14),
    color: "#4B5563", // text-gray-700
  },
  signUpLink: {
    color: "#3B82F6", // text-blue-500
    fontWeight: "600",
  },
});
