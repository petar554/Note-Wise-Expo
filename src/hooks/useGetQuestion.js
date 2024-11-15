import { useState, useEffect } from "react";
import { API_URL, AUTH_TOKEN, TEST_ID } from "@env";

const useGetQuestion = () => {
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testId] = useState(TEST_ID); 

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

    console.log("Response Status:", response.status);
    const responseText = await response.text();
    console.log("Response Text:", responseText);

    if (!responseText) {
      throw new Error("Empty response from server");
    }

    if (responseText) {
      const data = JSON.parse(responseText);
      setQuestionData(data);
    } else {
      const data = null; 
    }
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

  return { questionData, loading, testId, error, fetchQuestion };
};

export default useGetQuestion;
