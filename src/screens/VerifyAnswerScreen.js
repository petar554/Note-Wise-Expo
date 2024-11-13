import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { GestureHandlerRootView, PanGestureHandler, Swipeable } from "react-native-gesture-handler";

const VerifyAnswerScreen = ({ navigation }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // simulate API response 
    // #TODO
    const simulatedResponse = {
      answer_status_id: 1,
      comment: "Retrospection is not part of the photosynthesis",
    };

    // simulate loading time
    // #TODO
    setTimeout(() => {
      setStatus(simulatedResponse.answer_status_id === 1 ? "Correct" : "Incorrect");
      setComment(simulatedResponse.comment);
      setLoading(false);
    }, 1000); // 1 second delay to simulate network request
  }, []);

//   const handleSwipeContinue = () => {
//     navigation.navigate("Notes"); // #TODO
//   };

  const handleSwipe = (event) => {
    if (event.nativeEvent.translationX > 50) { 
      navigation.navigate("TestScreen"); // #TODO
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
              source={require("../../assets/noun-high-five-1154833-rbg.png")}
              style={styles.icon}
            />
          )}

          {!loading && status && (
            <Text style={styles.statusText}>
              {status}
            </Text>
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
