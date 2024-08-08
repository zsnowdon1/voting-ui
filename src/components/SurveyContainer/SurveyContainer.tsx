import { useState } from 'react';
import SurveyNavbar from '../SurveyNavBar/SurveyNavBar';
import SurveyTitle from '../SurveyTitle/SurveyTitle'
import SurveyQuestions from '../SurveyQuestions/SurveyQuestions';
import './SurveyContainer.css';
import { Question, Survey } from '../../constants/global.types';

const SurveyContainer = () => {

  const [step, setStep] = useState(-1);

  const [survey, setSurvey] = useState<Survey>({
    surveyId: 0,
    hostUsername: '',
    title: 'TEST',
    questionList: [{
      questionId: 1,
      surveyId: 1,
      question: "TESTQ",
      choices: [{
        choice: "Choice",
        questionId: 1,
        choiceId: 1
      }]
    }]
  });

  const addQuestionToSurvey = (newQuestion: Question ) => {
    setSurvey(survey => ({
        ...survey,
        questionList: [...survey.questionList, newQuestion]
    }));
  }

  const nextStep = () => {
    if(step < survey.questionList.length) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if(step > -1) {
      setStep(step - 1)
    }
  };


  const updateSurveyData = (updatedQuestion: Question, index: number) => {
    const updatedQuestions  = survey.questionList.map((question, i) =>
      i === index ? { ...question, ...updatedQuestion } : question
  );
    
  setSurvey(survey => ({ 
      ...survey, 
      questionList: updatedQuestions, 
      surveyId: survey.surveyId, 
      hostUsername: survey.hostUsername, 
      title: survey.title
    }));
    // console.log(JSON.stringify(survey));
  };

  const updateTitle = (newTitle: string) => {
    console.log('Updating title to: ' + newTitle)
    setSurvey(survey => ({
      ...survey,
      title: newTitle,
    }));
  };

  return (
    <div className="survey-container">
      {/* {step === 1 && <SurveyTitle surveyData={surveyData} updateSurveyData={updateSurveyData} />}
      {step === 2 && <SurveyQuestions surveyData={surveyData} updateSurveyData={updateSurveyData}/>} */}
      {step === -1 && <SurveyTitle title={survey.title} updateTitle={updateTitle}/>}
      {step >= 0 && <SurveyQuestions 
                        question={survey.questionList[step]}
                        questionNum={step + 1}
                        addQuestionToSurvey={addQuestionToSurvey}
                      />}
      <SurveyNavbar nextStep={nextStep} prevStep={prevStep} />
    </div>
  );
};

export default SurveyContainer;
