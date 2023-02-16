import React,{useState} from 'react';
import './style/Login.css';
import io from 'socket.io-client';

const socket = io();
socket.on('opponentJoin', ()=> {
  document.getElementById('readyBtn').style.visibility = 'visible';
})

function Login() {
  const [state, setState] = useState('start');

  return(
    <>
      {state === 'start' && <LoginDialogue stateChange = {setState}/>};
      {state === 'createRoom' && <CreateRoom stateChange = {setState}/>};
      {state === 'joinRoom' && <JoinRoom stateChange = {setState}/>};
      {state === 'waiting' && <Waiting stateChange = {setState} />}
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
      <label id= 'roomNameLbl'>Room Name:</label>
      <input type='text' id='roomName'></input>
      <button onClick={(e)=> {e.preventDefault(); socket.emit('createRoom'); props.stateChange('waiting')}}>Create Room</button>
    </>
  )
}

function JoinRoom(props) {
  return(
    <>
      <label id= 'roomNameLbl'>Room Name:</label>
      <input type='text' id='roomName'></input>
      <button onClick={(e)=> {e.preventDefault(); socket.emit('joinRoom'); props.stateChange('waiting')}}>Join Room</button>
    </>
  )
}

function Waiting(props) {
  return(
    <>
      <h1>Waiting for opponenets</h1>
      <a href="game"><button id='readyBtn' onClick={socket.emit('ready')}>Ready</button></a>
    </>
  )
}

export default Login

//{(e)=> {e.preventDefault(); socket.emit('createRoom');}}
//{(e)=> {e.preventDefault(); socket.emit('joinRoom')}}