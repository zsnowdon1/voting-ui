import { useEffect, useState } from "react";
import { fetchChoiceMappings, fetchResults, fetchSurveyDetails } from "../../services/hostApiService";
import SSEHook from "./SSEHook";
import { useParams } from "react-router-dom";
import { Question, Survey } from "../../../constants/global.types";
import { VoteChoice } from "../../constants/host.types";

const SurveyView = () => {
    const { surveyId } = useParams<{ surveyId: string }>();
    const [surveyDetails, setSurveyDetails] = useState<Survey | null>(null);
    const [choiceMappings, setChoiceMappings] = useState<Map<number, string>>(new Map());
    const [chartData, setChartData] = useState({});
    const results: Map<number, VoteChoice[]> = SSEHook(Number(surveyId), choiceMappings);
    const [resultsMap, setResultsMap] = useState<Map<number, Map<number, VoteChoice>>>(new Map());
    

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

    const getVotes = (questionId: number, choiceId: number): number => {
        const votes: Map<number, VoteChoice> = resultsMap.get(questionId) || new Map();
        const voteChoice: VoteChoice = votes.get(choiceId) || {choiceId: -1, votes: 0};
        if(votes.size !== 0 && voteChoice.choiceId !== -1) {
            return voteChoice.votes;
        } else {
            return 0;
        }
    };

    useEffect(() => {
        const newVoteMappings = new Map<number, Map<number, VoteChoice>>();
        results.forEach((voteChoices: VoteChoice[], questionId: number) => {
            const choiceMap = new Map<number, VoteChoice>();
            voteChoices.forEach((voteChoice: VoteChoice) => {
                choiceMap.set(voteChoice.choiceId, voteChoice);
            });
            newVoteMappings.set(questionId, choiceMap);
        });
        setResultsMap(newVoteMappings);
    },[results]);

    useEffect(() => {
        if(surveyDetails == null) {
            handleFetchSurvey();
        }
    }, [surveyId]);

    return (
        <div>
            <h2>{surveyDetails ? surveyDetails.title : "Loading survey..."}</h2>
            
            {surveyDetails && surveyDetails.questionList ? (
                <div>
                    {surveyDetails.questionList.map((question: Question) => (
                        <div key={question.questionId}>
                            <h3>{question.question}</h3>
                            <ul>
                                {question.choices.map((choice) => (
                                    <li key={choice.choiceId}>
                                        {choice.choice} - {getVotes(question.questionId || 0, choice.choiceId || 0)} votes
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No questions available for this survey.</p>
            )}
        </div>
    )
}

export default SurveyView;