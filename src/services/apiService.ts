// apiService.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 10000, // Set a timeout limit
});

export const fetchSurveyList = async (hostname: string) => {
  const response = await apiClient.get(`/surveys/hostname/${hostname}`);
  return response.data;
}

export const fetchSurveyById = async (surveyId: number) => {
  const response = await apiClient.get(`/surveys/${surveyId}`);
  return response.data;
}

export const fetchSurveyDetails = async (surveyId: string) => {
  const response = await apiClient.get(`/surveys/${surveyId}`);
  return response.data;
}

export const fetchQuestionDetails = async (questionId: string) => {
  const response = await apiClient.get(`/surveys/question/${questionId}`);
  return response.data;
}

export const addChoice = async(newChoice: string, questionId: number) => {
  const response = await apiClient.put(`/surveys/questions/addChoice`, {
    questionId: questionId,
    choice: newChoice
  });
  return response.data;
}

// export const createSurvey = (data: SurveyData) => apiClient.post('/surveys', data);
// export const updateSurvey = (surveyId: number, data: SurveyData) => apiClient.put(`/surveys/${surveyId}`, data);
export const deleteSurvey = (surveyId: number) => apiClient.delete(`/surveys/${surveyId}`);
