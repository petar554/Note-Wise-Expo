import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import useCreateNote from "../hooks/useCreateNote";

const CreateNewNoteScreen = () => {
  const [loading, setLoading] = useState(false);
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
      <TouchableOpacity style={styles.menuButton}>
        <Icon name="bars" size={24} color="#000" />
      </TouchableOpacity>
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
    backgroundColor: "#1F2937",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  menuButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
