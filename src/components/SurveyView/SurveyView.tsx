import React, { useState, useEffect } from 'react';
import './SurveyView.css';
import { useParams } from 'react-router-dom';
import { fetchSurveyDetails } from '../../services/ApiService'; // Assuming you have this service to fetch questions
import { useNavigate } from 'react-router-dom';
import { Question, Survey } from '../../constants/global.types';

const SurveyView = () => {
    const { surveyId } = useParams<{ surveyId: string }>(); // Get the survey ID from the route parameters
    const [survey, setSurvey] = useState<Survey>({title: '', questionList: [], surveyId: -1});
    const navigate = useNavigate();

    const handleAddQuestion = (questionId: number) => {

    };

    const handleViewQuestion = (questionId: number) => {
        if(questionId !== -1) {
            navigate(`/question/${questionId}`);
        }
    }

    const getQuestions = async () => {
        const survey = await fetchSurveyDetails(surveyId || ''); // Fetch questions based on survey ID
        setSurvey(survey);
    };

    useEffect(() => {
        if(survey.surveyId === -1) {
            getQuestions();
        }
    }, [surveyId]);

    return (
        <div className="survey-view-container">
            <div className="survey-view-card">
                <button className="add-question-button" onClick={() => handleAddQuestion}>Add New Question</button>
                <div className="question-list">
                    {survey.questionList.map((question: Question, index: number) => (
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