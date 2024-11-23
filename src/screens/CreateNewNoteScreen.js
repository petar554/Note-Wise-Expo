import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useCreateNote from "../hooks/useCreateNote";
import commonStyles from "../styles/commonStyles";
import Menu from "../components/Menu";

const { width } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

const CreateNewNoteScreen = () => {
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { createNote } = useCreateNote();
  const navigation = useNavigation();

  const handleStart = async () => {
    setLoading(true);
    try {
      const response = await createNote();
      
      navigation.navigate("CaptureImagesScreen", { notesId: response.notes_id }); 
    } catch (error) {
      console.error("Failed to create a new note:", error);
      Alert.alert("Error", "Failed to create a new note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's create a new note</Text>
      <Text style={styles.subtitle}>(it just takes a few seconds)</Text>
      <Image
        source={require("../../assets/noun-hand-using-phone-4230396.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.instruction}>Simply take pictures of your notes</Text>
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleStart}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Start</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
        <Image source={require("../../assets/noun-menu.png")} style={commonStyles.menuIcon} />
      </TouchableOpacity>
      <Menu isOpen={menuOpen} onClose={closeMenu} />
    </View>
  );
};

export default CreateNewNoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1F2937",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    position: "absolute",
    bottom: 70,
    right: 100,
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
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  menuButton: {
    position: "absolute",
    bottom: 70,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderRadius: 25,
    padding: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
