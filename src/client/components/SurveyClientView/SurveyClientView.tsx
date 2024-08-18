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
    const navigate = useNavigate();

    const handleResponseChange = (questionId: number, chiceId: number) => {

    }

    const handleNextStep = () => {

    }

    const handlePrevStep = () => {

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
                                <input type="radio" name="response" value={choice.choiceId} onChange={() => handleResponseChange(currentQuestion.questionId, choice.choiceId)} />
                                {choice.choice}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="navbar">
                    <button onClick={handlePrevStep} disabled={questionIndex === 0}>Previous</button>
                    <button onClick={handleNextStep} disabled={questionIndex >= (survey.questionList.length - 1)}>Next</button>
                </div>
            </div>
        </div>
    );

}


export default SurveyClientView;