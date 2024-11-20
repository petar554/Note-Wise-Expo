import { useState } from "react";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useCreateTest = () => {
  const [testId, setTestId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTest = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tests`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notes_id: "b403cdd5-28ab-4ef5-9454-81a7774737d0",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response Error Text:", errorText);
        throw new Error("Failed to create test");
      }

      const data = await response.json();
      console.log("New Test ID:", data.test_id);
      setTestId(data.test_id); 
      return data.test_id;
    } catch (err) {
      setError("Failed to create test.");
      console.error("Error creating test:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { testId, loading, error, createTest };
};

export default useCreateTest;
