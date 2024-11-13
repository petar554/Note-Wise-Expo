import { useState, useEffect } from "react";

const useGetTestResult = () => {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate an API response
    const simulatedResponse = {
      score: 97, // This is the score to display
      display_icon: "string", // Ignored for the UI
      display_text: "string", // Ignored for the UI
    };

    // Simulate loading time
    setTimeout(() => {
      setScore(simulatedResponse.score);
      setLoading(false);
    }, 1000); // 1-second delay to simulate network request
  }, []);

  return { score, loading, error };
};

export default useGetTestResult;
