import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL} from "@env";

const useGetQuestion = (initialTestId) => {
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testId, setTestId] = useState(initialTestId); 

  const fetchQuestion = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/tests/${testId}/questions/current`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseText = await response.text();

      if (!responseText || responseText.trim() === "") {
        console.warn("Empty response from server");
        setQuestionData(null);
        return;
      }

      const data = JSON.parse(responseText);
      setQuestionData(data);
    } catch (err) {
      setError("Failed to load question.");
      console.error("Error fetching question:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return { questionData, loading, testId, error, fetchQuestion, setTestId };
};

export default useGetQuestion;
