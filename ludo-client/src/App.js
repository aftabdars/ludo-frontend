import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
// import Game from './Game';
import Login from './components/Login';
// import {useRoutes} from 'hookrouter';


const socket = io();
export default function App() {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  }

  // const routeResult = useRoutes({
  //   "/": () => <Login />,
  //   "/game": () => <Game />
  // })

  return (
    <>
      <Login />
    </>
  );
}