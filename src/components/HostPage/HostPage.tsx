import React, { useEffect, useState } from 'react';
import './HostPage.css';
import { fetchSurveys } from '../../services/ApiService';
import { Survey } from '../../constants/global.types';
import { useNavigate } from 'react-router-dom';

const HostPage = () => {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const navigate = useNavigate();
    const hostname = 'zsnowdon';

    const getSurveys = async () => {
        console.log("Getting surveys")
        const surveyList = await fetchSurveys('zsnowdon');
        setSurveys(surveyList);
        console.log(JSON.stringify(surveyList));
    };

    const handleViewSurvey = (index: number) => {
        navigate(`/survey/${index}`);
    };

    useEffect(() => {
        getSurveys();
    }, [hostname]);

    return (
        <div className="survey-list">
            {surveys.length > 0 &&
                <ul> Surveys:
                    {surveys.map((survey, index) => (
                        <div>
                            <label>{survey.surveyId}</label>
                            <label>{survey.title}</label>
                            <button onClick={() => handleViewSurvey(surveys[index].surveyId)}></button>
                        </div>
                    ))}
                </ul>}
        </div>
    );
};

export default HostPage;