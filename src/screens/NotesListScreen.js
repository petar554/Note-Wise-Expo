import React, { useState, useCallback } from "react"; 
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import useGetUserNotes from "../hooks/useGetUserNotes";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Menu from "../components/Menu";
import commonStyles from "../styles/commonStyles";

const NotesListScreen = () => {
  const { notes, loading, error, fetchUserNotes } = useGetUserNotes();
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const handleNoteClick = (note) => {
    navigation.navigate("NotesSummaryScreen", { notesId: note.notes_id });
  };

  const handleCreateNote = () => {
    navigation.navigate("CreateNewNoteScreen");
  };

  // refresh notes when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchUserNotes(); 
    }, [fetchUserNotes])
  );

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
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NOTES TO STUDY</Text>

      <ScrollView contentContainerStyle={styles.notesContainer}>
      {notes.length > 0 ? (
        notes.map((note) => {
          if (note.notes_id) {
            return (
              <TouchableOpacity
                key={note.notes_id}
                onPress={() => handleNoteClick(note)}
              >
                <Text style={styles.noteText}>{note.name}</Text>
              </TouchableOpacity>
            );
          }
          return null; 
        })
      ) : (
        <Text style={styles.noNotesText}>No notes available.</Text>
      )}
      </ScrollView>

      <TouchableOpacity style={styles.createButton} onPress={handleCreateNote}>
        <Text style={styles.createButtonText}>Create notes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
        <Image source={require("../../assets/noun-menu.png")} style={commonStyles.menuIcon} />
      </TouchableOpacity>

      <Menu isOpen={menuOpen} onClose={closeMenu} />
    </View>
  );
};

export default NotesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 200
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
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 20,
    marginBottom: 20,
  },
  notesContainer: {
    alignItems: "center",
    padding: 30,
  },
  noteText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginVertical: 10,
  },
  noNotesText: {
    fontSize: 16,
    color: "#6B7280",
  },
  createButton: {
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
  createButtonText: {
    color: "black",
    fontWeight: "400",
    fontSize: 16,
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