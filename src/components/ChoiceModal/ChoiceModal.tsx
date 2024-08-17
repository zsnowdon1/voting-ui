import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChoiceModalProps } from '../../constants/global.types';

const ChoiceModal = ({ isOpen, onClose, onSave }: ChoiceModalProps) => {
    const [newChoiceText, setNewChoiceText] = useState('');

    const handleSave = () => {
        onSave(newChoiceText);
        setNewChoiceText('');
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose} aria-labelledby="add-choice-modal-title" aria-describedby="add-choice-modal-description">
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
                <h2 id="add-choice-modal-title">Add a Choice</h2>
                <TextField label="Choice" fullWidth value={newChoiceText} onChange={(e) => setNewChoiceText(e.target.value)} />
                <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }} >
                    Add Choice
                </Button>
            </Box>
      </Modal>
    );
};

export default ChoiceModal;
