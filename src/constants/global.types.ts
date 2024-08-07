export interface CreateSurveyRequest {
    username: string;
    title: string;
    questionList: Question[];
  }
  
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
    hostUsername: string;
    title: string;
    questionList: Question[];
}

export interface SurveyTitleProps {
    title: string,
    updateTitle: (newTitle: string) => void;
}