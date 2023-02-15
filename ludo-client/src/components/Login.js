import React,{useState} from 'react';
import './style/Login.css';
import io from 'socket.io-client';

const socket = io();

function Login() {
  const [state, setState] = useState('start');

  return(
    <>
      {state === 'start' && <LoginDialogue stateChange = {setState}/>};
      {state === 'createRoom' && <CreateRoom />};
      {state === 'joinRoom' && <JoinRoom />};
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

function CreateRoom() {
  return(
    <>
      <label id= 'roomNameLbl'>Room Name:</label>
      <input type='text' id='roomName'></input>
      <button onClick={(e)=> {e.preventDefault(); socket.emit('createRoom');}}>Create Room</button>
    </>
  )
}

function JoinRoom() {
  return(
    <>
      <label id= 'roomNameLbl'>Room Name:</label>
      <input type='text' id='roomName'></input>
      <button onClick={(e)=> {e.preventDefault(); socket.emit('joinRoom')}}>Join Room</button>
    </>
  )
}

export default Login

//{(e)=> {e.preventDefault(); socket.emit('createRoom');}}
//{(e)=> {e.preventDefault(); socket.emit('joinRoom')}}