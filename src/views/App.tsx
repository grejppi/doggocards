import React from 'react';
import './App.css';
import Board from './board/Board';
import ScoreCard from './scorecard/ScoreCard';

function App() {
  return (
    <div className="App">
      <Board />
      <ScoreCard />
    </div>
  );
}

export default App;
