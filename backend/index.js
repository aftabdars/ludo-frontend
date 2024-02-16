const express = require('express');
const { createServer } = require('node:http');
// const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const cors = require('cors');
const { send } = require('node:process');
const Game = {
   currentDice : 0,
   previousDice : 0,
   currentPlayer : "green",
   currentSpritePositions : {
    red: [40,40,40,40],
    green: [1,1,1,1],  //debugginghere turn this to 1 // if all pawns are finishing do nextmove
    blue: [27,27,27,27],
    yellow: [14,14,14,14]
  },
  players : {
    redOutOfHome: [false,false,false,false],
    redKiller: false,
    greenOutOfHome: [false,false,false,false],  //debugging
    greenKiller: false, //debugging
    blueOutOfHome: [false,false,false,false],
    blueKiller: false,
    yellowOutOfHome: [false,false,false,false],
    yellowKiller: false,
    redFinishing: [false,false,false,false],
    greenFinishing: [false,false,false,false],
    blueFinishing: [false,false,false,false],
    yellowFinishing: [false,false,false,false]
  },
  maxMoves : {
    green: 51,
    yellow: 12,
    blue: 25,
    red: 38,
  },
  startingSpritePositions : {
    red: 40,
    green: 1,
    blue: 27,
    yellow: 14,
  },

  finished : {
    red: [false,false,false,false],
    green: [false,false,false,false],
    blue: [false,false,false,false],
    yellow: [false,false,false,false]
  },
}

function sendGame(socket){
  io.emit('gameData', Game)
}

app.use(cors())
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000"
  }
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    sendGame(socket)
    socket.on('disconnect', ()=>{
      console.log('a user disconnected')
    })
    socket.on('nextMove', (socket)=>{
      sendGame(socket)
  })
  });

// io.listen(4000)

server.listen(4000, () => {
  console.log('server running at http://localhost:4000');
});
