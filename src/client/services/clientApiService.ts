// apiService.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 10000, // Set a timeout limit
});


export const fetchSurvey = async (surveyId: string) => {
    const response = await apiClient.get(`/surveys/${surveyId}`);
    return response.data;
  }