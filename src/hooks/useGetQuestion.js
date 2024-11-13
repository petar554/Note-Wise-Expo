import { useState, useEffect } from "react";
import { API_URL, AUTH_TOKEN } from "@env";

const useGetQuestion = () => {
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestion = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/tests/:testId/questions/current`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response Error Text:", errorText);
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }

      const data = await response.json();
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

  return { questionData, loading, error, fetchQuestion };
};

export default useGetQuestion;
