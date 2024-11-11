import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Menu from "../components/Menu";
import Icon from "react-native-vector-icons/FontAwesome"; // For menu icon

const HomeScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Header with Menu Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openMenu}>
          <Icon name="bars" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text>Welcome to the Home Screen!</Text>
      </View>

      {/* Menu Component */}
      <Menu isOpen={menuOpen} onClose={closeMenu} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6", // bg-gray-100
  },
  header: {
    height: 60,
    backgroundColor: "#FFFFFF", // White background
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    elevation: 4, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937", // text-gray-800
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
