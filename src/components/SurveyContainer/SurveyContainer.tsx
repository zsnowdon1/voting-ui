import { useState } from 'react';
import SurveyNavbar from '../SurveyNavBar/SurveyNavBar';
import SurveyTitle from '../SurveyTitle/SurveyTitle'
import SurveyQuestions from '../SurveyQuestions/SurveyQuestions';
import './SurveyContainer.css';
// import 'src/constants/global.types.ts';
import { Question, Survey } from '../../constants/global.types';

const SurveyContainer = () => {

  const [step, setStep] = useState(1);
  const [survey, setSurvey] = useState<Survey>({
    surveyId: 0,
    hostUsername: '',
    title: '',
    questionList: []
  });

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
  
  // const setSurveyHelper = (updatedQuestions: Question[]) => {
  //   setSurvey(survey => {
  //       ...survey,
  //       questionList: updatedQuestions,
  //       surveyId: survey?.surveyId,
  //       hostUsername: survey?.hostUsername,
  //       title: survey,
  //   });
  // }

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
      {step === 1 && <SurveyTitle title={survey.title} updateTitle={updateTitle}/>}
      {step === 2 && <SurveyQuestions question={survey.questionList[step - 1]}/>}
      <SurveyNavbar nextStep={nextStep} prevStep={prevStep} />
    </div>
  );
};

export default SurveyContainer;
