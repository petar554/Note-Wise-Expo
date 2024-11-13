import { useState } from "react";
import { API_URL, AUTH_TOKEN } from "@env"; 

const useVerifyAnswer = () => {
  const [status, setStatus] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verifyAnswer = async (testId, questionNumber, answer) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_URL}/tests/${testId}/questions/${questionNumber}/answer`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answer }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response Error Text:", errorText);
        throw new Error("Failed to verify answer");
      }

      const data = await response.json();
      setStatus(data.answer_status_id === 1 ? "Correct" : "Incorrect");
    } catch (err) {
      setError("Failed to verify answer.");
      console.error("Error verifying answer:", err);
    } finally {
      setLoading(false);
    }
  };

  return { status, loading, error, verifyAnswer };
};

export default useVerifyAnswer;
