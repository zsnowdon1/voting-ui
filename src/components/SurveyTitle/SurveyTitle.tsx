import React from 'react';

const SurveyQuestions = () => {
    // const [question, setQuestion] = useState('');

    // const handleAddQuestion = () => {
    //   updateSurveyData({ questions: [...surveyData.questions, question] });
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
