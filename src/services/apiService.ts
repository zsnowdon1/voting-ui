// apiService.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 10000, // Set a timeout limit
});

export const fetchSurveys = async (hostname: string) => {
  console.log(`calling http://localhost:8081/surveys/${hostname}`);
  const response = await apiClient.get(`/surveys/${hostname}`);
  return response.data;
}
// export const createSurvey = (data: SurveyData) => apiClient.post('/surveys', data);
// export const updateSurvey = (surveyId: number, data: SurveyData) => apiClient.put(`/surveys/${surveyId}`, data);
export const deleteSurvey = (surveyId: number) => apiClient.delete(`/surveys/${surveyId}`);
