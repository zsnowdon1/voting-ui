export interface Question {
    questionId: number;
    surveyId: number;
    question: string;
    choices: Choice[];
}

export interface Choice {
    choiceId: number;
    questionId: number;
    choice: string;
}

export interface Survey {
    surveyId: number;
    title: string;
    questionList: Question[];
}

export interface QuestionNavBarProps {
    nextStep: () => void;
    prevStep: () => void;
}

export interface SurveyResponse {
    username: string,
    surveyId: number,
    responses: number[]
}

export interface QuestionResponse {
    questionId: number,
    choiceId: number
}