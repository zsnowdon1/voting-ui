// apiService.ts
import axios from 'axios';
import { Question } from '../constants/global.types';

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

export const createEmptySurvey = async (title: string) => {
  const response = await apiClient.post('/surveys/createSurvey', {username: 'zsnowdon', title: title});
  return response.data
}

export const addChoice = async (newChoice: string, questionId: number) => {
  const response = await apiClient.put('/surveys/addChoice', {
    questionId: questionId,
    newChoice: newChoice
  });
  return response.data;
}

export const addQuestion = async (newQuestion: Question) => {
  const response = await apiClient.put('/surveys/addQuestion', {title: newQuestion.question, surveyId: newQuestion.surveyId, choices: newQuestion.choices.map((choice) => choice.choice)});
  return response.data;
}

export const deleteSurvey = async (surveyId: number) => {
  const response = await apiClient.delete(`/surveys/survey/${surveyId}`);
  return response.data;
}

export const deleteChoice = async (choiceId: number) => {
  const resposne = await apiClient.delete(`/surveys/choices/${choiceId}`);
  return resposne.data;
}

export const deleteQuestion = async (questionId: number) => {
  const response = await apiClient.delete(`/surveys/questions/${questionId}`);
  return response.data;
}