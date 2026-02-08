import React, { useState } from 'react';
import ProposalPage from './components/ProposalPage';
import ChocolatePage from './components/ChocolatePage';
import './App.css';

function App() {
  const [page, setPage] = useState('proposal'); // Default to proposal, skipping landing

  return (
    <div className="App">
      {page === 'proposal' && (
        <ProposalPage onNext={() => setPage('chocolate')} />
      )}
      {page === 'chocolate' && (
        <ChocolatePage />
      )}
    </div>
  );
}

export default App;
