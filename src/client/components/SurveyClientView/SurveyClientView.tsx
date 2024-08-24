import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSurvey } from "../../services/clientApiService";
import { Survey, SurveyResponse } from "../../constants/client.types";
import './SurveyClientView.css';


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
        setQuestionIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            const existingChoice = response.responses[newIndex] || null;
            setSelectedChoice(existingChoice);
            return newIndex;
        });
    }

    const handlePrevStep = () => {
        saveChoice();
        setQuestionIndex((prevIndex) => {
            const newIndex = prevIndex - 1;
            const existingChoice = response.responses[newIndex] || null;
            setSelectedChoice(existingChoice);
            return newIndex;
        });
    }

    const saveChoice = () => {
        if (selectedChoice !== null) {
            setResponse((prevResponse) => {
                const updatedResponses = [...prevResponse.responses];
                updatedResponses[questionIndex] = selectedChoice;
                return { ...prevResponse, responses: updatedResponses };
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
                
                <div className="question-container">
                    <h2 className="question-text">{currentQuestion.question}</h2>
                    <div className="options-container">
                        {currentQuestion.choices.map((choice, index) => (
                            <label className="option-label" key={index + 1}>
                                <input type="radio" checked={selectedChoice === choice.choiceId} value={choice.choiceId} onClick={() => handleResponseChange(choice.choiceId)} onChange={() => {}} />
                                {choice.choice}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="navbar">
                    <button onClick={handlePrevStep} disabled={questionIndex === 0}>Previous</button>
                    <button onClick={handleNextStep}>{questionIndex === survey.questionList.length - 1 ? "Submit" : "Next"}</button>
                </div>
            </div>
        </div>
    );

}


export default SurveyClientView;