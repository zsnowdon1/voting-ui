import { useEffect, useState } from 'react';
import QuestionNavBar from '../QuestionNavBar/QuestionNavBar';
import SurveyNavBar from '../SurveyNavBar/SurveyNavBar';
import SurveyTitle from '../SurveyTitle/SurveyTitle'
import SurveyQuestions from '../SurveyQuestions/SurveyQuestions';
import './SurveyContainer.css';
import { Choice, Question, Survey, SurveyContainerProps } from '../../constants/global.types';
import { useParams } from 'react-router-dom';
import { fetchSurveyById } from '../../services/ApiService';


// This will take in a survey at some point
const SurveyContainer = () => {

  let { surveyId } = useParams();

  const [step, setStep] = useState(-1);

  const [saveToggle, setSaveToggle] = useState(false);

  const [survey, setSurvey] = useState<Survey>({
    surveyId: 0,
    hostUsername: '',
    title: '',
    questionList: [
      {
        question: '',
        questionId: 0,
        choices: []
      }
    ]
  });

  const getSurvey = async () => {
    if(surveyId !== undefined) {
      const survey = await fetchSurveyById(parseInt(surveyId));
      setSurvey(survey);
      // console.log(JSON.stringify(survey));
    }
};

  const isLastQuestionEmpty = (question?: Question) => {
    return question?.choices.length === 0 && question?.question === ''
  };

  // Page toggle logic
  const nextStep = () => {
    if(step < survey.questionList.length - 1) {
      setStep(step + 1);
    } else {
      if(!isLastQuestionEmpty(survey.questionList[survey.questionList.length - 1])) {
        if(step + 1 === survey.questionList.length) {
          addQuestionToSurvey({
            questionId: survey.questionList.length,
            surveyId: survey.surveyId,
            question: '',
            choices: []
          });
        }
        setStep(step + 1);
      }
    }
    console.log(JSON.stringify(survey));
  };

  const prevStep = () => {
    if(step > -1) {
      setStep(step - 1);
    }
  };

  const addQuestionToSurvey = (newQuestion: Question ) => {
    console.log("Adding question to survey");
    console.log(JSON.stringify(newQuestion));
    setSurvey(survey => ({
        ...survey,
        questionList: [...survey.questionList, newQuestion]
    }));
    setSaveToggle(true);
  }

  const handleSaveSurvey = () => {
    setSaveToggle(false);
    console.log("Saving");
  };

  const updateQuestionText = (index: number, newText: string) => {
    setSurvey(prevSurvey => {
      const updatedQuestions = prevSurvey.questionList.map((question, i) =>
        i === index ? { ...question, question: newText } : question
      );
      return { ...prevSurvey, questionList: updatedQuestions };
    });
    setSaveToggle(true);
  }

  const updateChoices = (index: number, newChoices: Choice[]) => {
    setSurvey(prevSurvey => {
      const updatedQuestions = prevSurvey.questionList.map((question, i) =>
        i === index ? { ...question, choices: newChoices } : question
      );
      // console.log(JSON.stringify(updatedQuestions));
     
      return { ...prevSurvey, questionList: updatedQuestions };
    });
    setSaveToggle(true);
  }

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
    // console.log('Updating title to: ' + JSON.stringify(survey));
    setSurvey(survey => ({
      ...survey,
      title: newTitle,
    }));
  };

  useEffect(() => {
    if(surveyId !== undefined && parseInt(surveyId) !== survey.surveyId) {
      getSurvey();
    }
  }, [survey]);

  return (
    <div className="survey-container">
      <SurveyNavBar onSave={handleSaveSurvey} title={survey.title} saveToggle={saveToggle}/>
      {step === -1 && <SurveyTitle title={survey.title} updateTitle={updateTitle}/>}
      {step >= 0 && <SurveyQuestions 
                        question={survey.questionList[step]}
                        questionNum={step}
                        updateChoices={updateChoices}
                        updateQuestionText={updateQuestionText}
                      />}
      <QuestionNavBar nextStep={nextStep} prevStep={prevStep} />
    </div>
  );
};

export default SurveyContainer;
