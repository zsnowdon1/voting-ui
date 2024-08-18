import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { Question } from '../../../constants/global.types';
import { QuestionModalProps } from '../../constants/host.types';

const QuestionModal = ({ isOpen, surveyId, onClose, onSave }: QuestionModalProps) => {
    const [question, setQuestion] = useState<Question>({question: '', choices: [], surveyId: surveyId});

    const handleAddChoice = () => {
        setQuestion(prev => ({ ...prev, choices: [...prev.choices, {choice: ''}] }));
    }

    const handleChoiceChange = (index: number, newChoice: string) => {
        const updatedChoices = [...question.choices];
        updatedChoices[index] = {choice: newChoice};
        setQuestion(prev => ({ ...prev, choices: updatedChoices }));
    };

    const handleQuestionChange = (newQuestion: string) => {
        setQuestion(prev => ({ ...prev, question: newQuestion }));
    }

    const handleSave = () => {
        if (question.question.trim() && question.choices.some(choice => choice.choice.trim())) {
            onSave({ ...question, choices: question.choices.filter(choice => choice.choice.trim()) });
            setQuestion({ question: '', choices: [] });
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 1 }}>
                <Typography variant="h6">Add New Question</Typography>
                <TextField label="Question" value={question.question} onChange={e => handleQuestionChange(e.target.value)} fullWidth margin="normal" />
                {question.choices.map((choice, index) => (
                    <TextField key={index} label={`Choice ${index + 1}`} value={choice.choice} onChange={e => handleChoiceChange(index, e.target.value)} fullWidth margin="normal" />
                ))}
                <Button onClick={handleAddChoice} sx={{ mt: 2 }}>Add Another Choice</Button>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>Save</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default QuestionModal;
