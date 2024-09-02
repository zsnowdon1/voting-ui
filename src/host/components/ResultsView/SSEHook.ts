import { useEffect, useState } from "react";
import { Vote, VoteChoice } from "../../constants/host.types";

const SSEHook = (surveyId: number, choiceMappings: Map<number, string>): Map<number, VoteChoice[]> => {
    const [results, setResults] = useState<Map<number, VoteChoice[]>>(new Map());

    useEffect(() => {
        const surveyId = 13;
        const eventSource = new EventSource(`http://localhost:8081/surveys/${surveyId}/liveResults`);

        eventSource.onmessage = (event) => {
            const data: Vote[] = event.data;

            const voteMap: Map<number, VoteChoice[]> = new Map<number, VoteChoice[]>();
            data.forEach((vote: Vote) => {
                const questionId: number = vote.questionId;

                const choices: VoteChoice[] = vote.votes.map((choice: VoteChoice) => ({
                    choiceId: choice.choiceId,
                    choiceName: choiceMappings.get(choice.choiceId),
                    votes: choice.votes,
                }));
                voteMap.set(Number(questionId), choices);
            });

            console.log('Received results: ', voteMap);
            setResults(voteMap);
        };

        eventSource.addEventListener('initial-data', (event) => {
            const data: Vote[] = JSON.parse(event.data);

            const voteMap: Map<number, VoteChoice[]> = new Map<number, VoteChoice[]>();
            data.forEach((vote: Vote) => {
                const questionId: number = vote.questionId;

                const choices: VoteChoice[] = vote.votes.map((choice: VoteChoice) => ({
                    choiceId: choice.choiceId,
                    choiceName: choiceMappings.get(choice.choiceId),
                    votes: choice.votes,
                }));
                voteMap.set(Number(questionId), choices);
            });

            console.log('Initial data: ', voteMap);
            setResults(voteMap);
        });

        eventSource.addEventListener('vote-update', (event) => {
            const data: Vote[] = event.data;

            const voteMap: Map<number, VoteChoice[]> = new Map<number, VoteChoice[]>();
            data.forEach((vote: Vote) => {
                voteMap.set(Number(vote.questionId), vote.votes);
            });

            console.log('Vote update: ', voteMap);
            setResults(voteMap);
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