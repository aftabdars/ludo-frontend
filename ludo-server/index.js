const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/api', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('createRoom', ()=>{
    createRoom();
  })
  socket.on('joinRoom', ()=>{
    joinRoom();
  })
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});

function createRoom () {
    console.log('room created');
}

function joinRoom () {
    console.log('room joined');
}