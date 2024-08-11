import { SurveyNavBarProps } from "../../constants/global.types";

const SurveyNavbar = (
    {   
        onSave,
        title,
        saveToggle
        // onExit, 
        // onJumpToQuestion, 
        // currentStep, 
        // totalSteps 

    }: SurveyNavBarProps) => {
    return (
        <div className="survey-navbar">
            {saveToggle && 
                <button onClick={onSave}>Save Survey</button>
            }
        <label>{title}</label>
        {/* <button onClick={onExit}>Exit Survey</button>
        <button onClick={() => onJumpToQuestion(currentStep + 1)}>Jump to Next Question</button>
        <span>
            Question {currentStep} of {totalSteps}
        </span> */}
        </div>
    );
};


export default SurveyNavbar;