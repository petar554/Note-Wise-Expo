import { useState, useEffect } from "react";

const useGetNoteDetails = (noteId) => {
  const [noteDetails, setNoteDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // simulate an API response
    const simulatedResponse = {
      name: "NIT, human",
      hero_image: "", 
      created_at: "2024-09-22T10:20:30Z",
      status_id: 3,
      learning_scores: [
        { completed_dt: "2024-09-22T14:18:00Z", score: 63 },
        { completed_dt: "2024-09-23T18:25:00Z", score: 85 },
        { completed_dt: "2024-09-24T17:36:00Z", score: 98 },
      ],
    };

    setTimeout(() => {
      setNoteDetails(simulatedResponse);
      setLoading(false);
    }, 1000);
  }, [noteId]);

  return { noteDetails, loading, error };
};

export default useGetNoteDetails;
