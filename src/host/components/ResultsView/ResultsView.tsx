import { useEffect, useState } from "react";
import { fetchChoiceMappings, fetchSurveyDetails } from "../../services/hostApiService";
import SSEHook from "./SSEHook";
import { useParams } from "react-router-dom";
import { Choice, Question, Survey } from "../../../constants/global.types";
import { VoteChoice, VoteUpdate } from "../../constants/host.types";
import VoteChart from "../VoteChart/VoteChart";
import './ResultsView.css';

const SurveyView = () => {
    const { surveyId } = useParams<{ surveyId: string }>();
    const [surveyDetails, setSurveyDetails] = useState<Survey | null>(null);
    const [choiceMappings, setChoiceMappings] = useState<Map<number, string>>(new Map());
    const [questionMappings, setQuestionMappings] = useState<Map<number, string>>(new Map());
    const [resultsMap, setResultsMap] = useState<Map<number, Map<number, VoteChoice>>>(new Map());

    const handleVoteUpdate = (voteUpdate: VoteUpdate) => {
        setResultsMap((prevResults) => {
            const updateResults: Map<number, Map<number, VoteChoice>> = new Map(prevResults);
            const choiceId: number = voteUpdate.choiceId;
            const questionId: number = voteUpdate.questionId;
            const votes: number = voteUpdate.votes;

            let voteChoicesMap: Map<number, VoteChoice> = updateResults.get(questionId) || new Map<number, VoteChoice>();

            voteChoicesMap.set(choiceId, {choiceId: choiceId, votes: votes});
            updateResults.set(questionId, voteChoicesMap);

            return updateResults;
        });
    };
    const results: Map<number, VoteChoice[]> = SSEHook({surveyId: Number(surveyId), onVoteUpdate: handleVoteUpdate});

    const handleFetchSurvey = async () => {
        try {
            const [details, mappings] = await Promise.all([
                fetchSurveyDetails(surveyId || ''),
                fetchChoiceMappings(surveyId || '')
            ]);
            setSurveyDetails(details);
            setChoiceMappings(mappings);
        } catch (error) {
            console.error('Failed fetching survey details');
        }
    };

    useEffect(() => {
        const questionMap = new Map<number, string>();
        surveyDetails?.questionList.forEach((question: Question) => {
            questionMap.set(question.questionId || -1, question.question);
        });
        setQuestionMappings(questionMap);
    }, [surveyDetails, surveyId]);

    useEffect(() => {
        if(results.size > 0 && choiceMappings.size > 0) {
            const newVoteMappings = new Map<number, Map<number, VoteChoice>>();

            surveyDetails?.questionList.forEach((question: Question) => {
                const questionId: number = question.questionId || -1;
                if(questionId !== -1) {
                    const choiceMap = new Map<number, VoteChoice>();
                    question.choices.forEach((choice: Choice) => {
                        const choiceText: string = choiceMappings.get(choice.choiceId || -1) || '';
                        const choiceId: number = choice.choiceId || -1;
                        if(choiceId !== -1) {
                            choiceMap.set(choiceId, {choiceId: choiceId, name: choiceText, votes: 0});
                        }
                    });
    
                    const voteChoices = results.get(questionId) || new Map<number, VoteChoice>();
                    voteChoices.forEach((voteChoice: VoteChoice) => {
                        choiceMap.set(voteChoice.choiceId, {choiceId: voteChoice.choiceId, name: choiceMappings.get(voteChoice.choiceId), votes: voteChoice.votes});
                    });
                    newVoteMappings.set(questionId, choiceMap);
                }
            });
            setResultsMap(newVoteMappings);
        }
    },[results, choiceMappings]);

    useEffect(() => {
        if(surveyDetails == null) {
            handleFetchSurvey();
        }
    }, [surveyId]);

    return (
        <div className="survey-container">
            <div className="survey-header">
                <h2 className="survey-title">{surveyDetails?.title || 'Survey Results'}</h2>
            </div>
            <div className="results-container">
                {Array.from(resultsMap.entries()).map(([questionId, choiceMap]) => (
                    <div className="vote-chart-card">
                        <VoteChart key={questionId} questionTitle={questionMappings.get(questionId) || ''} voteChoices={Array.from(choiceMap.values())} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SurveyView;