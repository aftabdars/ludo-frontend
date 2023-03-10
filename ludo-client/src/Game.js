import React from 'react';
import Nav from './components/Nav';
import MainContent from './components/MainContent';
import './components/style/Game.css';
// import * as game from './logic/GameFunctions';
import io from 'socket.io-client';

const socket = io();

// socket.on('gameJoin', (details)=> {
//   console.log('jajaj')
//   details.players.forEach(element => {
//     game.movePawnsToHome(element.color);
//     game.roomId = details.roomId;
//   });
// })

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