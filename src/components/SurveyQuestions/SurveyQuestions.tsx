import React, { useEffect, useState } from 'react';
import { Choice, UpdateQuestionProps } from '../../constants/global.types';
import './SurveyQuestions.css';


const SurveyQuestions = ({question, questionNum, updateQuestionText, updateChoices}: UpdateQuestionProps) => {

  const [newChoice, setNewChoice] = useState('');

  const handleAddChoice = () => {
    const newChoiceObject: Choice = {
      choiceId: question.choices.length,
      questionId: questionNum,
      choice: newChoice
    }
    const updateChoiceList = [...question.choices, newChoiceObject]
    updateChoices(questionNum, updateChoiceList)
    setNewChoice('');
  }

  const handleChoiceupdate = (index: number, newChoice: string) => {
    if (newChoice === '') {
      const newChoices = question.choices.filter((_, i) => i !== index);
      updateChoices(questionNum, newChoices); 
    } else {
      const newChoices = question.choices.map((choice, i) =>
        i === index ? { ...choice, choice: newChoice } : choice
      );
      updateChoices(questionNum, newChoices); 
    }
  }

  const handleQuestionTextUpdate = (newQuestion: string) => {
    updateQuestionText(questionNum, newQuestion);
  }

  useEffect(() => {
    // if (question) {
    //   setChoices(question.choices);
    // } else {
    //   setChoices([{choiceId: 0, choice: '', questionId: questionNum}]);
    // }
  }, [question]);

  return (
    <div className='survey-questions'>
      <h3>{question.choices ? `Edit Question ${questionNum + 1}` : `Create Question ${questionNum + 1}`}</h3>
      <input type="text" value={question.question} onChange={(e) => handleQuestionTextUpdate(e.target.value)}/>
      {(question.question != '' && question.choices)  &&
        <ul> Choices:
        {question.choices.filter(choice => choice.choice.trim() !== '') 
                .map((choice, index) => (
          <div key={'choice' + index} className='question-choice'>
            <label>{choice.choiceId}</label>
            <input type='text' value={choice.choice} onChange={(e) => handleChoiceupdate(index, e.target.value)}></input>
          </div>
        ))}
        <div className='add-choice'>
          <input type='text' value={newChoice} onChange={(e) => setNewChoice(e.target.value)} />
          <button onClick={() => handleAddChoice()}>Add choice</button>
        </div>
      </ul>
      }
    </div>
  );
};

export default SurveyQuestions;



    {/* {editChoiceIndex === index
      ? <div className=''>
          <input value={editChoiceValue} onChange={(e) => setEditChoiceValue(e.target.value)}/>
          <button type='button' onClick={() => handleEditChoiceClick(index)}>Edit choice1</button>
        </div>
      : <div className=''>
          <li key={index}>{choice.choice}</li>
          <button type='button' onClick={() => handleEditChoiceClick(index)}>Edit choice</button>
        </div>}  */}