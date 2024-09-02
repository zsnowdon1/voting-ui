import { useEffect, useState } from "react";
import { SseHookProps, Vote, VoteChoice, VoteUpdate } from "../../constants/host.types";

const SSEHook = ({surveyId, onVoteUpdate}: SseHookProps): Map<number, VoteChoice[]> => {
    const [results, setResults] = useState<Map<number, VoteChoice[]>>(new Map());

    useEffect(() => {

        const eventSource = new EventSource(`http://localhost:8081/surveys/${surveyId}/liveResults`);

        eventSource.onmessage = (event) => {
            const data = event.data
            setResults(data);
        };

        eventSource.addEventListener('initial-data', (event) => {
            const data: Vote[] = JSON.parse(event.data);

            const voteMap: Map<number, VoteChoice[]> = new Map<number, VoteChoice[]>();
            data.forEach((vote: Vote) => {
                const questionId: number = vote.questionId;

                const choices: VoteChoice[] = vote.votes.map((choice: VoteChoice) => ({
                    choiceId: choice.choiceId,
                    choiceName: '',
                    votes: choice.votes,
                }));
                voteMap.set(Number(questionId), choices);
            });

            console.log('Initial data: ', voteMap);
            setResults(voteMap);
        });

        eventSource.addEventListener('vote-update', (event) => {
            const data: string = JSON.parse(event.data);
            onVoteUpdate(JSON.parse(data));
            console.log(data);
        });

        eventSource.onerror = (error) => {
            console.log('Error with sse connection', error);
            eventSource.close();
        }

        return () => {
            eventSource.close();
        }
    }, []);

    return results;
}

export default SSEHook;