import { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance"; 

const useGetQuestion = () => {
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      // #TODO
      const response = await axiosInstance.get(`/tests/aca7f7ac-ea58-45c0-8569-7cdd9fe7372d/result`);
      setQuestionData(response.data);
    } catch (err) {
      setError("Failed to load question.");
      console.error("Error fetching question:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return { questionData, loading, error, fetchQuestion };
};

export default useGetQuestion;
