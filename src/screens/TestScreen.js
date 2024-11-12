import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import useGetQuestion from "../hooks/useGetQuestion";

const TestScreen = () => {
  const { questionData, loading, error, fetchQuestion } = useGetQuestion();

  const handleAnswerSelection = (answer) => {
    // handle the answer selection, e.g., save answer, navigate, etc.
    Alert.alert("Answer Selected", `You selected: ${answer}`);
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
        <TouchableOpacity onPress={fetchQuestion} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* question number and total */}
      <Text style={styles.questionCounter}>
        QUESTION {questionData?.questionNumber} / {questionData?.totalQuestions}
      </Text>

      {/* question text */}
      <Text style={styles.questionText}>{questionData?.question}</Text>

      {/* answer options */}
      <View style={styles.answersContainer}>
        {questionData?.answers?.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={styles.answerButton}
            onPress={() => handleAnswerSelection(answer)}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  retryButton: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  retryText: {
    color: "white",
    fontWeight: "bold",
  },
  questionCounter: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  answersContainer: {
    width: "100%",
    alignItems: "center",
  },
  answerButton: {
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  answerText: {
    fontSize: 16,
    color: "#1F2937",
  },
});
