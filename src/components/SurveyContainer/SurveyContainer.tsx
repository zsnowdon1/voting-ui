import React, { useState } from 'react';
import SurveyNavbar from '../SurveyNavBar/SurveyNavBar';
import SurveyTitle from '../SurveyTitle/SurveyTitle'
import SurveyQuestions from '../SurveyQuestions/SurveyQuestions';
import './SurveyContainer.css';
import 'src/constants/global.types.ts';
import { CreateSurveyRequest, Question } from '../../constants/global.types';

const SurveyContainer = () => {

  const [step, setStep] = useState(1);
  const [surveyData, setSurveyData] = useState<CreateSurveyRequest>();

  const nextStep = () => {
    if(step < 2) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if(step > 1) {
      setStep(step - 1)
    }
  };

  const updateSurveyData = (updatedQuestion: Partial<Question>, index: number) => {
    const updatedQuestions = (surveyData?.questionList ?? []).map((question, i) =>
      i === index ? { ...question, ...updatedQuestion } : question
    );
    setSurveyData({ ...surveyData, questionList: updatedQuestions });
  };

  return (
    <div className="survey-container">
      {/* {step === 1 && <SurveyTitle surveyData={surveyData} updateSurveyData={updateSurveyData} />}
      {step === 2 && <SurveyQuestions surveyData={surveyData} updateSurveyData={updateSurveyData}/>} */}
      {step === 1 && <SurveyTitle />}
      {step === 2 && <SurveyQuestions question={surveyData?.questionList[step - 1]}/>}
      <SurveyNavbar nextStep={nextStep} prevStep={prevStep} />
    </div>
  );
};

export default SurveyContainer;
