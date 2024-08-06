import React from 'react';
import './SurveyNavBar.css';

interface NavBarProps {
  nextStep: () => void;
  prevStep: () => void;
}

const SurveyNavBar = ({ nextStep, prevStep }: NavBarProps) => {
  return (
    <div className="survey-navbar">
      <button onClick={prevStep}>&larr; Previous</button>
      <button onClick={nextStep}>Next &rarr;</button>
    </div>
  );
};

export default SurveyNavBar;