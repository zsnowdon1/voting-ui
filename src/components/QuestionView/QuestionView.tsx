import React, { useState, useEffect } from 'react';
import './QuestionView.css';
import { useParams } from 'react-router-dom';
import { fetchQuestionDetails, addChoice } from '../../services/ApiService'; // Assuming you have this service to fetch questions
import { useNavigate } from 'react-router-dom';
import { Choice, Question } from '../../constants/global.types';
import ChoiceModal from '../ChoiceModal/ChoiceModal';

const QuestionView = () => {
    const { questionId } = useParams<{ questionId: string }>(); // Get the survey ID from the route parameters
    const [question, setQuestion] = useState<Question>({question: '', choices: []});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleAddChoice = () => {
        setIsModalOpen(true);
    };

    const handleViewChoice = (questionId: number) => {
        if(questionId !== -1) {
            navigate(`/question/${questionId}`);
        }
    }

    const handleSaveNewChoice = async (newChoice: string) => {
        if(questionId !== undefined) {
            const data = await addChoice(newChoice, question.questionId || -1);
            const updatedChoices: Choice[] = [
                ...question.choices,
                { choice: newChoice, questionId: question.questionId || -1, choiceId: data }
            ];
            setQuestion({ ...question, choices: updatedChoices });
        }
    }

    const getQuestion = async () => {
        const question = await fetchQuestionDetails(questionId || ''); // Fetch questions based on survey ID
        if(question !== '') {
            setQuestion(question);
        }
    };

    useEffect(() => {
        if(question.surveyId === undefined) {
            getQuestion();
        }
    }, [questionId]);

    return (
        <div className="question-view-container">
            <div className="question-view-card">
                <button className="add-choice-button" onClick={() => handleAddChoice()}>Add New Choice</button>
                <div className="choice-list">
                    {question.choices.map((choice: Choice, index: number) => (
                        <button key={index} className="choice-item-button" onClick={() => handleViewChoice(choice.choiceId || -1)}>
                            <div className="choice-info">
                                <span className="choice-id">Choice {index + 1}</span>
                                <span className="choice-text">{choice.choice}</span>
                            </div>
                        </button>
                    ))}
                </div>

                <ChoiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveNewChoice}/>
            </div>
        </div>
    );
};

export default QuestionView;