import React from 'react';
import { SurveyTitleProps } from '../../constants/global.types';

function SurveyTitle({ title, updateTitle }: SurveyTitleProps) {

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateTitle(event.target.value);
  }

  return (
    <div className="survey-title">
      <h3>Survey Title</h3>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" value={title} onChange={handleTitleChange} name="title" />
    </div>
  );
};

export default SurveyTitle;
