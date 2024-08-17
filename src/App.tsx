import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HostPage from './components/HostPage/HostPage';
import SurveyView from './components/SurveyView/SurveyView';
import QuestionView from './components/QuestionView/QuestionView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/survey/:surveyId" element={<SurveyView/>} />
        <Route path="/host" element={<HostPage />} />
        <Route path="/question/:questionId" element={<QuestionView/>} />
      </Routes>
    </Router>
  );
};

export default App;
