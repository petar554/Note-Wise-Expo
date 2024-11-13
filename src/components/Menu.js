import React, { useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // Using FontAwesome for the close icon
// import { LocalizationContext } from '../context/LocalizationContext';

const { width } = Dimensions.get("window");
const MENU_WIDTH = width; // 75% of screen width

const Menu = ({ isOpen, onClose }) => {
  //   const { localization } = useContext(LocalizationContext);
  const navigation = useNavigation();

  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current; // Initial position off-screen

  useEffect(() => {
    if (isOpen) {
      // Slide in
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide out
      Animated.timing(slideAnim, {
        toValue: -MENU_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, slideAnim]);

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <Animated.View
        style={[
          styles.menuContainer,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        {/* Close Button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          accessibilityLabel="Close Menu"
        >
          <Icon name="times" size={24} color="#000" />
        </TouchableOpacity>

        {/* Navigation Links */}
        <View style={styles.navLinks}>
          {/* Notes Link */}
          <TouchableOpacity
            style={styles.link}
            onPress={() => handleNavigation("Notes")}
          >
            {/* <Text style={styles.linkText}>
              {localization('menu_notes') || 'Notes'}
            </Text> */}
            <Text style={styles.linkText}>Notes</Text>
          </TouchableOpacity>

          {/* Create Note Link */}
          <TouchableOpacity
            style={styles.link}
            onPress={() => handleNavigation("CreateNote")}
          >
            {/* <Text style={styles.linkText}>
              {localization('menu_create_note') || 'Create Note'}
            </Text> */}
            <Text style={styles.linkText}>Create Note</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.link}
            onPress={() => handleNavigation("TestScreen")}
          >
            {/* <Text style={styles.linkText}>
              {localization('menu_create_note') || 'Create Note'}
            </Text> */}
            <Text style={styles.linkText}>Taking the test</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.link}
            onPress={() => handleNavigation("VerifyAnswerScreen")}
          >
            {/* <Text style={styles.linkText}>
              {localization('menu_create_note') || 'Create Note'}
            </Text> */}
            <Text style={styles.linkText}>Evaluate user answer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.link}
            onPress={() => handleNavigation("TestResultScreen")}
          >
            {/* <Text style={styles.linkText}>
              {localization('menu_create_note') || 'Create Note'}
            </Text> */}
            <Text style={styles.linkText}>Test Results</Text>
          </TouchableOpacity>

          {/* Account Link */}
          <TouchableOpacity
            style={styles.link}
            onPress={() => handleNavigation("Account")}
          >
            {/* <Text style={styles.linkText}>
              {localization('menu_account') || 'Account'}
            </Text> */}
            <Text style={styles.linkText}>Account</Text>
          </TouchableOpacity>

          {/* Logout Button (If Needed) */}
          {/* If you decide to add logout functionality in the future, uncomment below */}
          {/* 
          <TouchableOpacity style={styles.link} onPress={handleLogout}>
            <Text style={styles.logoutText}>
              {localization('menu_logout') || 'Logout'}
            </Text>
          </TouchableOpacity>
          */}
        </View>
      </Animated.View>
    </>
  );
};

export default Menu;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 49, // Below the menu
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: MENU_WIDTH,
    height: "100%",
    backgroundColor: "#FFFFFF",
    zIndex: 50,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  navLinks: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  link: {
    marginVertical: 15,
    alignSelf: "center",
  },
  linkText: {
    fontSize: 20,
    color: "#4B5563",
    fontWeight: "500",
  },
  logoutText: {
    fontSize: 20,
    color: "#DC2626",
    fontWeight: "500",
  },
});
