import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import useGetTestResult from "../hooks/useGetTestResult";
import { useNavigation } from "@react-navigation/native";
import Menu from "../components/Menu";
import Icon from "react-native-vector-icons/FontAwesome";

const TestResultScreen = () => {
  const { score, loading, error } = useGetTestResult();
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTakeAnotherTest = () => {
    navigation.navigate("TestScreen"); 
  };

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load score.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TEST COMPLETED</Text>
      <Text style={styles.scoreText}>{score}%</Text>
      <Text style={styles.subtitle}>Your score</Text>

      <TouchableOpacity style={styles.button} onPress={handleTakeAnotherTest}>
        <Text style={styles.buttonText}>Take another test</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
        <Icon name="bars" size={24} color="#000" />
      </TouchableOpacity>

      <Menu isOpen={menuOpen} onClose={closeMenu} />
    </View>
  );
};

export default TestResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "400",
    color: "#6B7280",
    marginBottom: 50,
  },
  button: {
    position: "absolute",
    width: "50%",
    height: 45,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#1F2937",
    marginBottom: 20,
    bottom: 50,
  },
  buttonText: {
    color: "black",
    fontWeight: "400",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  menuButton: {
    position: "absolute",
    bottom: 70,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderRadius: 25,
    padding: 10,
    elevation: 4, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});