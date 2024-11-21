import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Menu from "../components/Menu";
import Icon from "react-native-vector-icons/FontAwesome";
import useGetQuestion from "../hooks/useGetQuestion";
import { useNotesContext } from "../context/NotesContext"; 
import { useNavigation, useRoute } from "@react-navigation/native";

const TestScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const initialTestId = route.params?.testId;
  const { notesId } = useNotesContext(); 
  const { questionData, loading, testId, error } = useGetQuestion(initialTestId);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!testId) {
      console.error("No testId available. Unable to load questions.");
    }
  }, [testId]);

  useEffect(() => {
    if (questionData === null && !loading) {
      navigation.navigate("TestResultScreen", { testId: testId, notesId: notesId }); 
    }
  }, [questionData, loading, navigation]);

  const handleAnswerSelection = (answer) => {
    navigation.navigate("VerifyAnswerScreen", {
      testId,
      questionNumber: questionData?.question_number,
      answer: answer.letter,
    });
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
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (questionData === null && !loading) {
    return null; 
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.questionCounter}>
          QUESTION {questionData?.question_number} / {questionData?.question_total}
        </Text>

        <Text style={styles.questionText}>{questionData?.question}</Text>

        <View style={styles.answersContainer}>
          {questionData?.answers?.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={styles.answerButton}
              onPress={() => handleAnswerSelection(answer)}
            >
              <Text style={styles.answerText}>
                {answer.letter} - {answer.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
        <Icon name="bars" size={24} color="#000" />
      </TouchableOpacity>

      <Menu isOpen={menuOpen} onClose={closeMenu} />
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  container: {
    paddingTop: 100,
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
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
  questionCounter: {
    fontSize: 14,
    alignItems: "center",
    color: "#6B7280",
    marginBottom: 8,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  answersContainer: {
    width: "100%",
    marginTop: 30,
    alignItems: "center",
  },
  answerButton: {
    width: "85%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 12,
    alignItems: "center",
  },
  answerText: {
    fontSize: 16,
    color: "#1F2937",
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
