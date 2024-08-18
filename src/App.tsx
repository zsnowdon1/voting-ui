import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HostPage from './host/components/HostPage/HostPage';
import SurveyView from './host/components/SurveyView/SurveyView';
import QuestionView from './host/components/QuestionView/QuestionView';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Host routing */}
        <Route path="/host/survey/:surveyId" element={<SurveyView/>} />
        <Route path="/host" element={<HostPage />} />
        <Route path="/host/question/:questionId" element={<QuestionView/>} />
        {/* Client Routing */}
      </Routes>
    </Router>
  );
};

export default App;
