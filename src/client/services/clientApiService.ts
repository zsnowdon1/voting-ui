import axios from 'axios';
import { SurveyResponse } from '../constants/client.types';

const apiHost = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 10000
});

const apiClient = axios.create({
  baseURL: 'http://localhost:8082',
  timeout: 10000
});


export const fetchSurvey = async (surveyId: string) => {
  const response = await apiHost.get(`/surveys/${surveyId}`);
  return response.data;
}

export const submitResponse = async(surveyResponse: SurveyResponse) => {
  const response = await apiClient.post('/vote/submitSurvey', surveyResponse);
}