import { Question } from "../../constants/global.types";

export interface ChoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newChoice: string) => void;
}

export interface SurveyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newTitle: string) => void;
}

export interface QuestionModalProps {
    isOpen: boolean;
    surveyId: number;
    onClose: () => void;
    onSave: (newQuestion: Question) => void;
}

export interface ChoiceMapping {
    choiceId: number;
    choiceName: string;
}

export interface VoteChoice {
    choiceId: number,
    name?: string,
    votes: number
}

export interface Vote {
    questionId: number,
    votes: VoteChoice[]
}