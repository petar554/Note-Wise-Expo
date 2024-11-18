import { useState } from "react";
import { API_URL, AUTH_TOKEN } from "@env"; 

const useVerifyAnswer = () => {
  const [status, setStatus] = useState(null); 
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verifyAnswer = async (finalTestId, questionNumber, answer) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_URL}/tests/${finalTestId}/questions/${questionNumber}/answer`,
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
      setComment(data.comment || "");
    } catch (err) {
      setError("Failed to verify answer.");
      console.error("Error verifying answer:", err);
    } finally {
      setLoading(false);
    }
  };

  return { status, comment, loading, error, verifyAnswer };
};

export default useVerifyAnswer;
