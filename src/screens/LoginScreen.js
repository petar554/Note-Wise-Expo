import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useLogin from "../hooks/useLogin";
import ClapIcon from "../svg/Clap";

const { width } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

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
    try {
      await login(formData);
      console.log("Login successful.");
      navigation.navigate("CreateNewNoteScreen");
    } catch (err) {
      console.error("Login Error:", err);
      Alert.alert("Error", err.message);
    }
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
          <View style={styles.logoContainer}>
            <ClapIcon height={100} width={100} />
            <Text style={styles.title}>appname</Text>
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.form}>
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

            <TouchableOpacity style={styles.forgotPassword} onPress={() => {}}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: scale(16),
    backgroundColor: "#F3F4F6",
  },
  container: {
    width: "100%",
    maxWidth: scale(400),
    alignSelf: "center",
    backgroundColor: "#F3F4F6",
    padding: scale(24),
    borderRadius: scale(12),
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scale(30),
    flexWrap: "wrap",
  },
  title: {
    marginLeft: scale(12),
    fontSize: scale(24),
    fontWeight: "bold",
    textAlign: "center",
    color: "#1F2937",
    flexShrink: 1,
  },
  errorText: {
    marginBottom: scale(16),
    color: "#DC2626",
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
    color: "#4B5563",
    marginBottom: scale(4),
  },
  input: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderColor: "#1F2937",
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
    color: "#000000",
    textDecorationLine: "underline",
  },
  button: {
    width: "50%",
    height: scale(45),
    backgroundColor: "white",
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
    color: "black",
    fontWeight: "400",
    fontSize: scale(16),
  },
});
