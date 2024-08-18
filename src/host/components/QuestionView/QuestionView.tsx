import React, { useState, useEffect } from 'react';
import './QuestionView.css';
import { useParams } from 'react-router-dom';
import { fetchQuestionDetails, addChoice, deleteChoice } from '../../services/hostApiService';
import { Choice, Question } from '../../../constants/global.types';
import ChoiceModal from '../ChoiceModal/ChoiceModal';

const QuestionView = () => {
    const { questionId } = useParams<{ questionId: string }>(); // Get the survey ID from the route parameters
    const [question, setQuestion] = useState<Question>({question: '', choices: []});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleAddChoice = () => {
        setIsModalOpen(true);
    };

    const handleDeleteChoice = async (choiceId: number) => {
        if(choiceId !== -1) {
            const deletedChoice = await deleteChoice(choiceId);
            if(deletedChoice === choiceId) {
                setQuestion(prevState => {
                    const updatedChoices = prevState.choices.filter((choice, _) => choice.choiceId !== choiceId);
                    return { ...prevState, choices: updatedChoices };
                });
            }
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
        setIsModalOpen(false);
    }

    const getQuestion = async () => {
        const question = await fetchQuestionDetails(questionId || '');
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
                <button className="add-choice-button" onClick={handleAddChoice}>Add New Choice</button>
                <ChoiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveNewChoice}/>
                <div className="choice-list">
                    {question.choices.map((choice: Choice, index: number) => (
                        <div key={index} className="choice-item">
                            <span className="choice-text">{index + 1}. {choice.choice}</span>
                            <button className="delete-button" onClick={() => handleDeleteChoice(choice.choiceId || -1)}>X</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionView;