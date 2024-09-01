import { useEffect, useState } from "react";
import { fetchResults } from "../../services/hostApiService";

const SurveyView = () => {
    const [results, setResults] = useState({});

    // const getSurveyResults = async () => {
    //     const response = await fetchResults(13);
    // }

    useEffect(() => {
        const surveyId = 13;
        const eventSource = new EventSource(`http://localhost:8081/surveys/${surveyId}/liveResults`);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received results: ', data);
            setResults(data);
        };

        eventSource.addEventListener('initial-data', (event) => {
            const data = JSON.parse(event.data);
            console.log('Initial data: ', data);
            setResults(data);
        });
        eventSource.addEventListener('vote-update', (event) => {
            const data = JSON.parse(event.data);
            console.log('Vote update: ', data);
            setResults(data);
        });

        eventSource.onerror = (error) => {
            console.log('Error with sse connection', error);
            eventSource.close();
        }

        return () => {
            eventSource.close();
        }
    }, []);

    return (
        <div>
            {JSON.stringify(results, null, 2)}
        </div>
    )
}

export default SurveyView;