import { useState, useEffect } from "react";
import { API_URL, AUTH_TOKEN } from "@env";

const useGetTestResult = (testId) => {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestResult = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/tests/${testId}/result`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response Error Text:", errorText);
        throw new Error("Failed to load test result");
      }

      const data = await response.json();
      setScore(data.score); 
    } catch (err) {
      setError("Failed to load test result.");
      console.error("Error fetching test result:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (testId) {
      fetchTestResult();
    }
  }, [testId]);

  return { score, loading, error };
};

export default useGetTestResult;
