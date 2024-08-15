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

    const handleViewSurvey = (surveyId: number) => {
        navigate(`/survey/${surveyId}`);
    }

    useEffect(() => {
        getSurveys();
    }, [hostname]);

    return (
        <div className='survey-list-container'>
            <div className='survey-card'>
                <button className='add-survey-button'>Add New Survey</button>
                <div className='survey-list'>
                    {surveys.map((survey, index) => (
                        <button key={index} className='survey-item-button' onClick={() => handleViewSurvey(survey.surveyId)}>
                            <div className='survey-info'>
                                <span className='survey-id'>ID: {survey.surveyId}</span>
                                <span className='survey-title'>Title: {survey.title}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HostPage;