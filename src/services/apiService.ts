// apiService.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 10000, // Set a timeout limit
});

export const fetchSurveys = async (hostname: string) => {
  console.log(`calling http://localhost:8081/surveys/hostname/${hostname}`);
  const response = await apiClient.get(`/surveys/hostname/${hostname}`);
  return response.data;
}

export const fetchSurveyById = async (surveyId: number) => {
  console.log("Fetching survey ", surveyId);
  const response = await apiClient.get(`/surveys/${surveyId}`);
  return response.data;
}

export const fetchQuestionsBySurvey = async (surveyId: string) => {
  console.log("Fetching questions for survey ", surveyId);
  const response = await apiClient.get(`/surveys/questions/${surveyId}`);
  return response.data;
}

export const fetchChoicesByQuestion = async (questionId: string) => {
  console.log("Fetching choices for questionId ", questionId);
  const response = await apiClient.get(`/surveys/choices/${questionId}`);
  return response.data;
}

// export const createSurvey = (data: SurveyData) => apiClient.post('/surveys', data);
// export const updateSurvey = (surveyId: number, data: SurveyData) => apiClient.put(`/surveys/${surveyId}`, data);
export const deleteSurvey = (surveyId: number) => apiClient.delete(`/surveys/${surveyId}`);
