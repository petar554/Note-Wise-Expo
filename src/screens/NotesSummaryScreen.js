import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import useGetNoteDetails from "../hooks/useGetNoteDetails";
import useDeleteNote from "../hooks/useDeleteNote";
import { useNavigation, useRoute } from "@react-navigation/native";
import Menu from "../components/Menu";
import Icon from "react-native-vector-icons/FontAwesome";

const NotesSummaryScreen = () => {
  const route = useRoute();
  const noteId = route.params?.noteId;
  const { noteDetails, loading, error } = useGetNoteDetails(noteId);
  const { deleteNote } = useDeleteNote();
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const handleDelete = () => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => deleteNote(noteId), style: "destructive" },
    ]);
  };

  const handleStartTest = () => {
    navigation.navigate("TestScreen", { noteId });
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
        <Text style={styles.errorText}>Failed to load note details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{noteDetails?.name}</Text>
        <Text style={styles.createdDate}>
          created: {new Date(noteDetails?.created_at).toLocaleDateString()}
        </Text>

        <View style={styles.learningScoreContainer}>
          <Text style={styles.learningScoreTitle}>LEARNING SCORE</Text>
          {noteDetails?.learning_scores.map((score, index) => (
            <View key={index} style={styles.scoreItem}>
              <Text>{new Date(score.completed_dt).toLocaleString()}</Text>
              <Text style={styles.scoreText}>{score.score}%</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomActionContainer}>
        <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
          <Icon name="trash" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Icon name="share-alt" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.startTestButton} onPress={handleStartTest}>
          <Text style={styles.startTestButtonText}>Start test</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
        <Icon name="bars" size={24} color="#000" />
      </TouchableOpacity>

      <Menu isOpen={menuOpen} onClose={closeMenu} />
    </View>
  );
};

export default NotesSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingTop: 150,
  },
  content: {
    padding: 20,
    alignItems: "center",
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
  errorText: {
    color: "red",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginVertical: 10,
  },
  createdDate: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  learningScoreContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  learningScoreTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 30,
  },
  scoreItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  bottomActionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 30,
    paddingHorizontal: 20,
  },
  iconButton: {
    padding: 12,
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginHorizontal: 10,
  },
  startTestButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#1F2937",
    marginHorizontal: 10,
  },
  startTestButtonText: {
    color: "black",
    fontWeight: "400",
    fontSize: 16,
  },
  menuButton: {
    position: "absolute",
    bottom: 70,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0)",
    padding: 12,
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
