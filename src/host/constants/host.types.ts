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