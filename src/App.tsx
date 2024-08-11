import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SurveyContainer from './components/SurveyContainer/SurveyContainer';
import HostPage from './components/HostPage/HostPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/survey/:surveyId" element={<SurveyContainer/>} />
        <Route path="/host" element={<HostPage />} />
      </Routes>
    </Router>
  );
};

export default App;
