import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNotesContext } from "../context/NotesContext";
import useNotesGeneration from "../hooks/useNotesGeneration"; 
import Menu from "../components/Menu";
import OakTreeImage from "../../assets/noun-oak-tree-6542509.png";

const NotesPreparedScreen = ({ route, navigation }) => {
  const { noteDetails, notesId } = route.params;
  const { startTest } = useNotesGeneration(); 
  const [noteName, setNoteName] = useState(noteDetails?.name);
  const { setNotesId } = useNotesContext();

  useEffect(() => {
    setNotesId(notesId); 
  }, [notesId]);

  const handleStartTest = async () => {
    try {
      const { test_id } = await startTest(notesId);
      navigation.navigate("TestScreen", { testId: test_id, notesId: notesId });
    } catch (error) {
      Alert.alert("Error", "Failed to start the test. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NOTES READY</Text>
      <TextInput
        style={styles.noteName}
        value={noteName}
        onChangeText={setNoteName}
        placeholder="Edit Note Name"
        placeholderTextColor="#999"
      />
      {/* #todo: use image from the API */}
      <Image source={OakTreeImage} style={styles.heroImage} />
      <Text style={styles.subtitle}>Let's check your knowledge</Text>

      <TouchableOpacity style={styles.takeTestButton} onPress={handleStartTest}>
        <Text style={styles.takeTestButtonText}>Take the test</Text>
      </TouchableOpacity>

      <Menu isOpen={false} onClose={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  noteName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    textAlign: "center",
    width: "80%",
  },
  heroImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginTop: 50,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 32,
  },
  takeTestButton: {
    position: "absolute",
    bottom: 100,
    width: "50%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 25,
    alignItems: "center",
  },
  takeTestButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NotesPreparedScreen;
