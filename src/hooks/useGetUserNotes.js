import { useState, useEffect } from "react";

const useGetUserNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // simulate API response
    const simulatedResponse = {
      notes: [
        { notes_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", name: "Biology Chapter 1" },
        { notes_id: "c9bf9e57-1685-4c89-bafb-ff5af830be8a", name: "History Lecture Notes" },
        { notes_id: "b3cde4e1-08d7-4d2a-a6a1-95a05c604dcf", name: "Math Homework Solutions" },
      ],
    };

    // simulate loading time
    setTimeout(() => {
      setNotes(simulatedResponse.notes);
      setLoading(false);
    }, 1000);
  }, []);

  return { notes, loading, error };
};

export default useGetUserNotes;