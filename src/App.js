import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProposalList from './pages/ProposalList';
import ProposalDetails from './pages/ProposalDetails';
import './App.css'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/proposals" element={<ProposalList />} />
        <Route path="/proposal/:id" element={<ProposalDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
