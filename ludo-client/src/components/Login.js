import React,{useState} from 'react';
import './style/Login.css';
import Game from './../Game';
import * as game from '../logic/GameFunctions';
import io from 'socket.io-client';

const socket = io();
socket.on('roomId', (roomId)=>{
  document.getElementById('roomId').innerHTML = +roomId.roomId;
  game.setRoomId(roomId.roomId);
})
socket.on('incorrectRoomId', ()=>{
  document.getElementById('joinStatus').innerHTML = 'Room with that ID does not exist';
})
socket.on('incorrectRoomPassword', ()=>{
  document.getElementById('joinStatus').innerHTML = 'Incorrect room password';
})
socket.on('roomFull', ()=>{
  document.getElementById('joinStatus').innerHTML = 'The room is full';
})
socket.on('enableDice', ()=>{
  game.enableDice();
})
socket.on('enableSprites', ()=>{
  game.enableSprites();
})
socket.on('updateDice', (currentDice)=>{
  document.getElementById('dice-counter').innerHTML = currentDice;
})

function Login() {
  const [state, setState] = useState('start');
  socket.on('joinSuccessful', ()=>{
    setState('waiting');
  })
  socket.on('allReady', (details)=> {
    setState('inGame');
    details.players.forEach(element => {
    game.movePawnsToHome(element.color);})
    game.setRoomId(details.roomId);
  })

  return(
    <>
      {state === 'start' && <LoginDialogue stateChange = {setState}/>}
      {state === 'createRoom' && <CreateRoom stateChange = {setState}/>}
      {state === 'joinRoom' && <JoinRoom stateChange = {setState}/>}
      {state === 'waiting' && <Waiting stateChange = {setState} />}
      {state === 'inGame' && <Game />}
    </>
  )
}

function LoginDialogue(props) {
  return (
    <>
      <button id="create-room-btn" onClick={(e)=> {e.preventDefault(); props.stateChange('createRoom')}}>Create Room</button>
      <button id="join-room-btn" onClick={(e)=> {e.preventDefault(); props.stateChange('joinRoom')}}>Join Room</button>
    </>
  )
}

function CreateRoom(props) {
  return(
    <>
      <label id= 'roomNameLbl'>Room Password:</label>
      <input type='password' id='roomPass'></input>
      <label id= 'roomNameLbl'>Your Name:</label>
      <input type='text' id='playerName'></input>
      <button onClick={(e)=> {
        e.preventDefault(); 
        socket.emit('createRoom', {
          "roomPass": document.getElementById('roomPass').value, 
          "id":socket.id,
          "playerName": document.getElementById('playerName').value
        });
         props.stateChange('waiting')}}>Create Room</button>
    </>
  )
}

function JoinRoom(props) {
  return(
    <>
      <label id= 'roomNameLbl'>Room Id:</label>
      <input type='text' id='roomId'></input>
      <label id= 'roomNameLbl'>Room Password:</label>
      <input type='password' id='roomPass'></input>
      <label id= 'roomNameLbl'>Your Name:</label>
      <input type='text' id='playerName'></input>
      <h3 id='joinStatus'></h3>
      <button onClick={(e)=> {
        e.preventDefault(); 
        socket.emit('joinRoom',{
          "roomId": document.getElementById('roomId').value,
           "roomPass": document.getElementById('roomPass').value,
            "id":socket.id,
            'playerName': document.getElementById('playerName').value
            });
            }}>Join Room</button>
    </>
  )
}

function Waiting(props) {
  return(
    <>
      <h1>Your RoomID is: <p id='roomId'></p></h1>
      <h2>Waiting for opponenets</h2>
      <button id='readyBtn' onClick={(e)=> {e.preventDefault(); socket.emit('ready',{'roomId':document.getElementById('roomId').innerHTML,'Id': socket.id}); document.getElementById('readyBtn').style.visibility = 'hidden'}}>Ready</button>
    </>
  )
}

export default Login

//{(e)=> {e.preventDefault(); socket.emit('createRoom');}}
//{(e)=> {e.preventDefault(); socket.emit('joinRoom')}}