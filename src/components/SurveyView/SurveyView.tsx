import React, { useState, useEffect } from 'react';
import './SurveyView.css';
import { useParams } from 'react-router-dom';
import { fetchQuestionsBySurvey } from '../../services/ApiService'; // Assuming you have this service to fetch questions
import { useNavigate } from 'react-router-dom';
import { Question } from '../../constants/global.types';

const SurveyView = () => {
    const { surveyId } = useParams<{ surveyId: string }>(); // Get the survey ID from the route parameters
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    const handleAddQuestion = (questionId: number) => {

    };

    const handleViewQuestion = (questionId: number) => {
        if(questionId !== -1) {
            navigate(`/question/${questionId}`);
        }
    }

    const getQuestions = async () => {
        const questionsList = await fetchQuestionsBySurvey(surveyId || ''); // Fetch questions based on survey ID
        setQuestions(questionsList);
    };

    useEffect(() => {
        if(questions.length === 0) {
            getQuestions();
        }
    }, [surveyId]);

    return (
        <div className="survey-view-container">
            <div className="survey-view-card">
                <button className="add-question-button" onClick={() => handleAddQuestion}>Add New Question</button>
                <div className="question-list">
                    {questions.map((question: Question, index: number) => (
                        <button key={index} className="question-item-button" onClick={() => handleViewQuestion(question.questionId || -1)}>
                            <div className="question-info">
                                <span className="question-id">Question {index + 1}</span>
                                <span className="question-text">{question.question}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SurveyView;