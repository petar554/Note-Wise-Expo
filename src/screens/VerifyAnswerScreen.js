import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import useVerifyAnswer from "../hooks/useVerifyAnswer";

const VerifyAnswerScreen = ({ navigation, route }) => {
  const { testId, questionNumber, answer } = route.params;
  const { status, comment, loading, verifyAnswer } = useVerifyAnswer();

  useEffect(() => {
    verifyAnswer(testId, questionNumber, answer);
  }, [testId, questionNumber, answer]);

  const handleSwipe = (event) => {
    if (event.nativeEvent.translationX > 50) { 
      navigation.navigate("TestScreen"); 
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={handleSwipe}>
        <View style={styles.resultContainer}>
          {/* loading Indicator */}
          {loading && <ActivityIndicator size="large" color="#000" />}

          {!loading && status && (
            <Image
              source={
                status === "Correct"
                  ? require("../../assets/noun-high-five-1154833-rbg.png")
                  : require("../../assets/negative-vote.png") 
              }
              style={styles.icon}
            />
          )}

          {!loading && status && (
            <Text style={styles.statusText}>{status}</Text>
          )}

          {!loading && comment && <Text style={styles.commentText}>{comment}</Text>}

          {!loading && (
            <Text style={styles.swipeText}>Swipe to continue</Text>
          )}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default VerifyAnswerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  resultContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  swipeText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 30,
  },
});
