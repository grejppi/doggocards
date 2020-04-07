import React from 'react';
import './App.css';
import Board from './board/Board';
import ScoreCard from './scorecard/ScoreCard';

function App() {
  return (
    <div className="App w-full flex flex-col h-screen">
      <Board />
      <ScoreCard />
      <div className="flex-grow"></div>
      <footer className="p-2">
        Photos provided by <a href="https://dog.ceo/dog-api/" className="text-blue-600">dog.ceo Dog API</a>
      </footer>
    </div>
  );
}

export default App;
