export interface CreateSurveyRequest {
    username: string;
    title: string;
    questionList: Question[];
  }
  
export interface Question {
    questionId?: number;
    surveyId?: number;
    question: string;
    choices: Choice[];
}

export interface Choice {
    choiceId?: number;
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

export interface SurveyQuestionProps {
    question?: Question,
    questionNum: number,
    addQuestionToSurvey: (newQuestion: Question) => void;
}

export interface UpdateQuestionProps {
    question: Question,
    questionNum: number,
    updateQuestionText: (index: number, newText: string) => void;
    updateChoices: (index: number, newChoices: Choice[]) => void;
}

export interface SurveyContainerProps {
    surveyId: number,
    hostUsername: string
}

export interface NavBarProps {
    nextStep: () => void;
    prevStep: () => void;
}