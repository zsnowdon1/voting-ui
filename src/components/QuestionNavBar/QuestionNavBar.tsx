import React from 'react';
import { QuestionNavBarProps } from '../../constants/global.types';
import './QuestionNavBar.css';

const QuestionNavBar = ({ nextStep, prevStep }: QuestionNavBarProps) => {
  return (
    <div className="question-navbar">
      <button onClick={prevStep}>&larr; Previous</button>
      <button onClick={nextStep}>Next &rarr;</button>
    </div>
  );
};

export default QuestionNavBar;