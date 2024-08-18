import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SurveyModalProps } from '../../constants/host.types';

const SurveyModal = ({ isOpen, onClose, onSave }: SurveyModalProps) => {
    const [newSurveyTitle, setNewSurveyTitle] = useState('');

    const handleSave = () => {
        onSave(newSurveyTitle);
        setNewSurveyTitle('');
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose} aria-labelledby="add-survey-modal-title" aria-describedby="add-survey-modal-description">
            <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                <h2 id="add-choice-modal-title">Create new survey</h2>
                <TextField label="Title" fullWidth value={newSurveyTitle} onChange={(e) => setNewSurveyTitle(e.target.value)} />
                <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }} >
                    Create Survey
                </Button>
            </Box>
      </Modal>
    );
};

export default SurveyModal;
