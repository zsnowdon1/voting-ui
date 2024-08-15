import React, { useState, useEffect } from 'react';
import './QuestionView.css';
import { useParams } from 'react-router-dom';
import { fetchChoicesByQuestion } from '../../services/ApiService'; // Assuming you have this service to fetch questions
import { useNavigate } from 'react-router-dom';
import { Choice } from '../../constants/global.types';

const QuestionView = () => {
    const { questionId } = useParams<{ questionId: string }>(); // Get the survey ID from the route parameters
    const [choices, setChoices] = useState([]);
    const navigate = useNavigate();

    const handleAddQuestion = (questionId: number) => {

    };

    const handleViewQuestion = (questionId: number) => {
        if(questionId !== -1) {
            navigate(`/question/${questionId}`);
        }
    }

    const getQuestions = async () => {
        const questionsList = await fetchChoicesByQuestion(questionId || ''); // Fetch questions based on survey ID
        if(questionsList !== '') {
            setChoices(questionsList);
        }
    };

    useEffect(() => {
        if(choices.length === 0) {
            getQuestions();
        }
    }, [questionId]);

    return (
        <div className="question-view-container">
            <div className="question-view-card">
                <button className="add-choice-button" onClick={() => handleAddQuestion}>Add New Choice</button>
                <div className="choice-list">
                    {choices.map((choice: Choice, index: number) => (
                        <button key={index} className="choice-item-button" onClick={() => handleViewQuestion(choice.choiceId || -1)}>
                            <div className="choice-info">
                                <span className="choice-id">Choice {index + 1}</span>
                                <span className="choice-text">{choice.choice}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionView;