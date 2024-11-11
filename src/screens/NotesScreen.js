import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Menu from "../components/Menu";
import Icon from "react-native-vector-icons/FontAwesome"; // Ensure react-native-vector-icons is installed
// import { LocalizationContext } from '../context/LocalizationContext';

const NotesScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const { localization } = useContext(LocalizationContext);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openMenu} style={styles.menuButton}>
          <Icon name="bars" size={24} color="#000" />
        </TouchableOpacity>
        {/* <Text style={styles.headerTitle}>{localization('notes_title') || 'Notes'}</Text> */}
        <Text style={styles.headerTitle}>Notes</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* <Text style={styles.welcomeText}>
          {localization('welcome_message') || 'Welcome to the Notes Screen!'}
        </Text> */}
        <Text style={styles.welcomeText}>Welcome to the Notes Screen</Text>
        {/* Add your notes content here */}
      </View>

      {/* Menu Component */}
      <Menu isOpen={menuOpen} onClose={closeMenu} />
    </View>
  );
};

export default NotesScreen;

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
  menuButton: {
    padding: 10,
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
  welcomeText: {
    fontSize: 18,
    color: "#4B5563", // text-gray-700
  },
});
