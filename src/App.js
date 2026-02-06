import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ProposalPage from './components/ProposalPage';
import './App.css';

function App() {
  const [page, setPage] = useState('landing'); // 'landing' or 'proposal'

  return (
    <div className="App">
      {page === 'landing' && (
        <LandingPage onContinue={() => setPage('proposal')} />
      )}
      {page === 'proposal' && (
        <ProposalPage />
      )}
    </div>
  );
}

export default App;
