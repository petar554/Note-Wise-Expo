import { useState } from "react";
import { API_URL, AUTH_TOKEN } from "@env";

const useCreateNote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const createNote = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error("Failed to create note");
      }

      const data = await response.json();
      return data; 
    } catch (err) {
      console.error("Error creating note:", err);
      setError(err.message || "Failed to create note.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createNote, loading, error };
};

export default useCreateNote;
