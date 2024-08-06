import React, { useState } from 'react';
import { Question, Survey } from '../../constants/global.types';

interface QuestionProps {
  question?: Question
}

const SurveyQuestions = ({question}: QuestionProps) => {
    // const [question, setQuestion] = useState('');

    // const handleAddQuestion = () => {
    //   updateSurveyData({ questions: [...surveyData.questions: Question[], question: Question] });
    //   setQuestion(''); // Clear the input field after adding the question
    // };

  return (
    <div className="survey-questions">
      <h3>Survey Questions</h3>
      <label htmlFor="question">Question:</label>
      <input type="text" id="question" name="question" placeholder="Enter your question" />
    </div>
  );
};

export default SurveyQuestions;
