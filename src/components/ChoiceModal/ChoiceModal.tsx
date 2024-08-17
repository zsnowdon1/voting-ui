import React from 'react';
import './ChoiceModal.css';
import { ChoiceModalProps } from '../../constants/global.types';

const Modal = ({ isOpen, onClose, onSave }: ChoiceModalProps) => {
    if (!isOpen) return null;

    let newChoiceText = '';

    const handleSave = () => {
        onSave(newChoiceText);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add New Choice</h2>
                <input type="text" onChange={(e) => newChoiceText = e.target.value} placeholder="Enter choice text"/>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default Modal;
