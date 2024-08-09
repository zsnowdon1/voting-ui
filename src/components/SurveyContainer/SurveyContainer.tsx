import { useState } from 'react';
import SurveyNavbar from '../SurveyNavBar/SurveyNavBar';
import SurveyTitle from '../SurveyTitle/SurveyTitle'
import SurveyQuestions from '../SurveyQuestions/SurveyQuestions';
import './SurveyContainer.css';
import { Choice, Question, Survey } from '../../constants/global.types';

const SurveyContainer = () => {

  const [step, setStep] = useState(-1);

  const [survey, setSurvey] = useState<Survey>({
    surveyId: 0,
    hostUsername: '',
    title: '',
    questionList: []
  });

  const addQuestionToSurvey = (newQuestion: Question ) => {
    setSurvey(survey => ({
        ...survey,
        questionList: [...survey.questionList, newQuestion]
    }));
  }

  const updateQuestionText = (index: number, newText: string) => {
    setSurvey(prevSurvey => {
      const updatedQuestions = prevSurvey.questionList.map((question, i) =>
        i === index ? { ...question, question: newText } : question
      );
      console.log(JSON.stringify(updatedQuestions));
      return { ...prevSurvey, questionList: updatedQuestions };
    });
  }

  const updateChoices = (index: number, newChoices: Choice[]) => {
    setSurvey(prevSurvey => {
      const updatedQuestions = prevSurvey.questionList.map((question, i) =>
        i === index ? { ...question, choices: newChoices } : question
      );
      console.log(JSON.stringify(updatedQuestions));
      return { ...prevSurvey, questionList: updatedQuestions };
    });
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
    // console.log('Updating title to: ' + newTitle);
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
                        questionNum={step}
                        updateChoices={updateChoices}
                        updateQuestionText={updateQuestionText}
                      />}
      <SurveyNavbar nextStep={nextStep} prevStep={prevStep} />
    </div>
  );
};

export default SurveyContainer;
