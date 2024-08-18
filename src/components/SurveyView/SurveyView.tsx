import React, { useState, useEffect } from 'react';
import './SurveyView.css';
import { useParams } from 'react-router-dom';
import { addQuestion, deleteQuestion, fetchSurveyDetails } from '../../services/ApiService';
import { useNavigate } from 'react-router-dom';
import { Question, Survey } from '../../constants/global.types';
import QuestionModal from '../QuestionModal/QuestionModal';

const SurveyView = () => {
    const { surveyId } = useParams<{ surveyId: string }>();
    const [survey, setSurvey] = useState<Survey>({title: '', questionList: [], surveyId: -1});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleAddQuestion = () => {
        setIsModalOpen(true);
    };

    const handleSaveNewQuestion = async (newQuestion: Question) => {
        if(survey.surveyId !== undefined) {
            newQuestion.surveyId = survey.surveyId;
            const data = await addQuestion(newQuestion);
            const updatedQuestions: Question[] = [
                ...survey.questionList,
                { questionId: data, surveyId: survey.surveyId || -1, question: newQuestion.question, choices: newQuestion.choices}
            ];
            setSurvey({ ...survey, questionList: updatedQuestions });
        }
        setIsModalOpen(false);
    }

    const handleDeleteQuestion = async (questionId: number) => {
        if(questionId !== -1) {
            const deletedChoice = await deleteQuestion(questionId);
            if(deletedChoice === questionId) {
                setSurvey(prevState => {
                    const updatedQuestions = prevState.questionList.filter((question, _) => question.questionId !== questionId);
                    return { ...prevState, questionList: updatedQuestions };
                });
            }
        }
    }

    const handleViewQuestion = (questionId: number) => {
        if(questionId !== -1) {
            navigate(`/question/${questionId}`);
        }
    }

    const getQuestions = async () => {
        const survey = await fetchSurveyDetails(surveyId || '');
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
                <button className="add-question-button" onClick={handleAddQuestion}>Add New Question</button>
                <div className="question-list">
                    {survey.questionList.map((question: Question, index: number) => (
                        <div key={index} className="question-item">
                            <span className="question-text">{index + 1}. {question.question}</span>
                            <div className="buttons">
                                <button className="view-button" onClick={() => handleViewQuestion(question.questionId || -1)}>View</button>
                                <button className="delete-button" onClick={() => handleDeleteQuestion(question.questionId || -1)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                <QuestionModal isOpen={isModalOpen} surveyId={survey.surveyId || -1} onClose={() => setIsModalOpen(false)} onSave={handleSaveNewQuestion}/>
            </div>
        </div>
    );
};

export default SurveyView;