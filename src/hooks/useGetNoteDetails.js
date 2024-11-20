import { useState, useEffect } from "react";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useGetNoteDetails = (notesId) => {
  const [noteDetails, setNoteDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNoteDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/notes/${notesId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response Error Text:", errorText);
        throw new Error("Failed to fetch note details.");
      }

      const data = await response.json();
      setNoteDetails(data);
    } catch (err) {
      console.error("Error fetching note details:", err);
      setError("Failed to load note details.");
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (notesId) => {
    try {
      const response = await fetch(`${API_URL}/notes/${notesId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response Error Text:", errorText);
        throw new Error("Failed to delete note.");
      }

      console.log("Note deleted successfully.");
    } catch (err) {
      console.error("Error deleting note:", err);
      throw new Error("Failed to delete note.");
    }
  };

  useEffect(() => {
    if (notesId) {
      fetchNoteDetails();
    }
  }, [notesId]);

  return { noteDetails, loading, error, deleteNote };
};

export default useGetNoteDetails;
