import { useState, useEffect } from "react";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useGetUserNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserNotes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/users/me/notes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response Error Text:", errorText);
        throw new Error("Failed to fetch notes.");
      }

      const data = await response.json();
      setNotes(data.notes);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to load notes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserNotes();
  }, []);

  return { notes, loading, error };
};

export default useGetUserNotes;
