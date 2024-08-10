import React from 'react';
import { NavBarProps } from '../../constants/global.types';
import './SurveyNavBar.css';

const SurveyNavBar = ({ nextStep, prevStep }: NavBarProps) => {
  return (
    <div className="survey-navbar">
      <button onClick={prevStep}>&larr; Previous</button>
      <button onClick={nextStep}>Next &rarr;</button>
    </div>
  );
};

export default SurveyNavBar;