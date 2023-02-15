import React from 'react';
import Nav from './components/Nav';
import MainContent from './components/MainContent';
import './components/style/Game.css';

function Game() {
  return (
    <div>
        <div className="main-container center">
              <Nav />
              <MainContent />
          </div>
    </div>
  )
}

export default Game