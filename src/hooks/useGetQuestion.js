import { useState, useEffect } from "react";
import { API_URL, AUTH_TOKEN, TEST_ID } from "@env";

const useGetQuestion = (initialTestId) => {
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testId, setTestId] = useState(initialTestId || TEST_ID); // #todo use test_id from the previous API response, ot test_id from TestResultScreen

  const fetchQuestion = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        // #todo: use test_id from the previous API response
        `${API_URL}/tests/${testId}/questions/current`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${AUTH_TOKEN}`,
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
