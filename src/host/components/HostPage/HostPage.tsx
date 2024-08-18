import React, { useEffect, useState } from 'react';
import './HostPage.css';
import { useNavigate } from 'react-router-dom';
import SurveyModal from '../SurveyModal/SurveyModal';
import { Survey } from '../../../constants/global.types';
import { createEmptySurvey, deleteSurvey, fetchSurveyList } from '../../services/hostApiService';

const HostPage = () => {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const hostname = 'zsnowdon';

    const getSurveys = async () => {
        const surveyList = await fetchSurveyList(hostname);
        setSurveys(surveyList);
    };

    const handleAddSurvey = () => {
        setIsModalOpen(true);
    }

    const handleCreateNewSurvey = async (title: string) => {
        if(title !== '') {
            const surveyId = await createEmptySurvey(title);
            // setSurveys((prevSurveys) => [...prevSurveys, {surveyId: data, title: title, hostUsername: 'zsnowdon', questionList:[]}]);
            handleViewSurvey(surveyId);
        }
        setIsModalOpen(false);
    }

    const handleDeleteSurvey = async (surveyId: number) => {
        if(surveyId !== -1) {
            const deletedSurvey = await deleteSurvey(surveyId);
            if(deletedSurvey === surveyId) {
                setSurveys(prevSurveys => prevSurveys.filter(survey => survey.surveyId !== surveyId));
            }
        }
    }

    const handleViewSurvey = (surveyId: number) => {
        navigate(`/host/survey/${surveyId}`);
    }

    useEffect(() => {
        getSurveys();
    }, [hostname]);

    return (
        <div className='survey-list-container'>
            <div className='survey-card'>
                <button className='add-survey-button' onClick={handleAddSurvey}>Add New Survey</button>
                <SurveyModal isOpen={isModalOpen} onSave={handleCreateNewSurvey} onClose={() => setIsModalOpen(false)}/>
                <div className='survey-list'>
                    {surveys.map((survey, index) => (
                        <div key={index} className='survey-item'>
                            <span className='survey-title'>{index + 1}. {survey.title}</span>
                            <div className='buttons'>
                                <button className='view-button' onClick={() => handleViewSurvey(survey.surveyId || -1)}>View</button>
                                <button className='delete-button' onClick={() => handleDeleteSurvey(survey.surveyId || -1)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HostPage;