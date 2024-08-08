import React, { useEffect, useState } from 'react';
import { Choice, SurveyQuestionProps } from '../../constants/global.types';


const SurveyQuestions = ({question, questionNum, addQuestionToSurvey}: SurveyQuestionProps) => {
    
  const [questionText, setQuestionText] = useState('');
  const [choices, setChoices] = useState<Choice[]>([]);
  const [newChoice, setNewChoice] = useState('');
  const [editChoiceIndex, setEditChoiceIndex] = useState(-1);
  const [editChoiceValue, setEditChoiceValue] = useState('');

    // const [question, setQuestion] = useState('');

    // const handleAddQuestion = () => {
    //   updateSurveyData({ questions: [...surveyData.questions: Question[], question: Question] });
    //   setQuestion(''); // Clear the input field after adding the question
    // };

  const handleEditChoiceClick = (choiceNum: number) => {
    setEditChoiceIndex(choiceNum);
    setEditChoiceValue(choices[choiceNum].choice);
  }

  const handleAddChoice = () => {
    const newChoiceObject: Choice = {
      choiceId: Date.now(),
      questionId: questionNum,
      choice: newChoice
    }
    setChoices([...choices, newChoiceObject]);
  }

  useEffect(() => {
    if (question) {
      setQuestionText(question.question);
      // setQuestionType(question.type);
      setChoices(question.choices);
    } else {
      setQuestionText('');
      setChoices([]);
    }
  }, [question]);

  return (
    <div className="survey-questions">
      <h3>{question ? `Edit Question ${questionNum}` : `Create Question ${questionNum}`}</h3>
      <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)}/>
      <ul> Choices:
        {choices.map((choice, index) => (
          <div key={'choice' + index}>
            {editChoiceIndex === index &&
              <input value={editChoiceValue} onChange={(e) => setEditChoiceValue(e.target.value)}/>
            }
            <li key={index}>{choice.choice}</li>
            <button type='button' onClick={() => handleEditChoiceClick(index)}>Edit choice</button>
          </div>
        ))}
        <div>
          <input type='text' value={newChoice} onChange={(e) => setNewChoice(e.target.value)} />
          <button onClick={handleAddChoice}>Add choice</button>
        </div>
      </ul>
    </div>
  );
};

export default SurveyQuestions;
