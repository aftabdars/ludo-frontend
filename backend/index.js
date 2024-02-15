const express = require('express');
const { createServer } = require('node:http');
// const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const cors = require('cors')

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
    socket.on('disconnect', ()=>{
      console.log('a user disconnected')
    })
  });

// io.listen(4000)

server.listen(4000, () => {
  console.log('server running at http://localhost:4000');
});
