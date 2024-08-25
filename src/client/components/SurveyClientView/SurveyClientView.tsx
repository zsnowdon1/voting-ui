import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSurvey, submitResponse } from "../../services/clientApiService";
import { Survey, SurveyResponse } from "../../constants/client.types";
import './SurveyClientView.css';
import QuestionClientView from "../QuestionClientView/QuestionClientView";


const SurveyClientView = () => {
    const { surveyId } = useParams<{ surveyId: string }>();
    const [survey, setSurvey] = useState<Survey | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [response, setResponse] = useState<SurveyResponse>({surveyId: -1, username: '', responses:[]});
    const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleResponseChange = (newChoiceId: number) => {
        if(selectedChoice === newChoiceId) {
            setSelectedChoice(null);
        } else {
            setSelectedChoice(newChoiceId);
        }
    }

    const handleNextStep = () => {
        saveChoice();
        if(questionIndex + 1 === survey?.questionList.length) {
            handleSubmitSurvey();
        } else {
            setQuestionIndex((prevIndex) => {
                const newIndex = prevIndex + 1;
                const existingChoice = response.responses[newIndex] || null;
                if(existingChoice !== null) {
                    setSelectedChoice(existingChoice.choiceId);
                } else {
                    setSelectedChoice(null);
                }
                return newIndex;
            });
        }
    }

    const handleSubmitSurvey = async () => {
        await submitResponse(response);
    }

    const handlePrevStep = () => {
        saveChoice();
        setQuestionIndex((prevIndex) => {
            const newIndex = prevIndex - 1;
            const existingChoice = response.responses[newIndex] || null;
            setSelectedChoice(existingChoice.choiceId);
            return newIndex;
        });
    }

    const saveChoice = () => {
        if (selectedChoice !== null) {
            setResponse((prevResponse) => {
                const updatedResponses = [...prevResponse.responses];
                updatedResponses[questionIndex] = {questionId: survey?.questionList[questionIndex].questionId || -1, choiceId: selectedChoice};
                return { ...prevResponse, surveyId: survey?.surveyId || -1, responses: updatedResponses };
            });
        }
    }

    const getSurvey = async () => {
        const survey = await fetchSurvey(surveyId || '');
        setSurvey(survey);
    }

    useEffect(() => {
        if(survey == null) {
            getSurvey();
        }
    }, [surveyId]);

    if (!survey) {
        return <div>Loading...</div>;
    }

    const currentQuestion = survey.questionList[questionIndex];

    return (
        <div className="survey-container">
            <div className="survey-card">
                <h1 className="survey-title">{survey.title}</h1>
                
                <QuestionClientView question={survey.questionList[questionIndex]} selectedChoice={selectedChoice} onChoiceChange={handleResponseChange}/>

                <div className="navbar">
                    <button onClick={handlePrevStep} disabled={questionIndex === 0}>Previous</button>
                    <button onClick={handleNextStep}>{questionIndex === survey.questionList.length - 1 ? "Submit" : "Next"}</button>
                </div>
            </div>
        </div>
    );

}


export default SurveyClientView;