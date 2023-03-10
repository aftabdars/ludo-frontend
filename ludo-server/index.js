const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Game = require('./src/Game.js');

const rooms = [];

app.get('/api', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('createRoom', (details)=>{
    createRoom(details, socket);
  })
  socket.on('joinRoom', (details)=>{
    joinRoom(details, socket);
  })
  socket.on('ready', (details)=>{
    allReady = ready(details, socket);
  })
  socket.on('rollDice', (details)=>{
    rooms[details.roomId].rollDice();
  })
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});

function createRoom (details, socket) {
  let roomId = rooms.length;
  rooms[roomId] = new Game(roomId,details.roomPass, details.id, details.playerName, io);
  socket.join(`${roomId}`);
  socket.emit('roomId', {'roomId': roomId});
}

function joinRoom (details, socket) {
  if (details.roomId >= rooms.length){
    socket.emit('incorrectRoomId');
    return;
  }

  let pass = rooms[details.roomId].room.roomPass;
    if(details.roomPass != pass){
    socket.emit('incorrectRoomPassword');
    return;
  }

  if(rooms[details.roomId].room.players.length == 4){
    socket.emit('roomFull');
    return;
  }

  rooms[details.roomId].join(socket.id, details.playerName);
  socket.join(details.roomId)
  socket.emit('joinSuccessful');
  socket.emit('roomId', {'roomId': details.roomId});
  return;
}

function ready(details, socket) {
 let players = rooms[details.roomId].room.players;
 let ready = 0;
 players.forEach(element => {
  if(element.playerId == details.Id) {
    element.ready = true;
  }
  if(element.ready == true){
    ready++;
  }
 });
 if(ready == players.length && players.length > 1){
  // return true;
  io.to(details.roomId).emit('allReady',{'players':players, 'roomId':details.roomId})
  rooms[details.roomId].nextMove();
  // io.to(details.roomId).emit('gameJoin',{'players':players, 'roomId':details.roomId})
 }
//  else return false;
}