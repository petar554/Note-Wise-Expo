import { useState } from "react";

const useDeleteNote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteNote = async (noteId) => {
    try {
      setLoading(true);
      // simulate network delay
      setTimeout(() => {
        setLoading(false);
        alert("Note deleted successfully.");
      }, 500);
    } catch (err) {
      setError("Failed to delete the note.");
      setLoading(false);
    }
  };

  return { deleteNote, loading, error };
};

export default useDeleteNote;
