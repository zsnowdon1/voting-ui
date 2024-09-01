import React from 'react';
import { Question } from '../../constants/client.types';
import './QuestionClientView.css';

interface QuestionContainerProps {
    question: Question;
    selectedChoice: number | null;
    onChoiceChange: (choiceId: number) => void;
}

const QuestionClientView = ({
    question,
    selectedChoice,
    onChoiceChange,
}: QuestionContainerProps) => {
    return (
        <div className="question-container">
            <h2 className="question-text">{question.question}</h2>
            <ul className="choices-list">
                {question.choices.map((choice, index) => (
                    <li key={index} className="choice-item" onClick={() => onChoiceChange(choice.choiceId)}>
                        <input type="radio" checked={selectedChoice === choice.choiceId} onClick={() => onChoiceChange(choice.choiceId)}/>
                        <span>{choice.choice}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionClientView;