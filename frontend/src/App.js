import Nav from './components/Nav';
import MainContent from './components/MainContent';
import './components/style/App.css';
import { socket } from './socket';
import { useEffect, useState } from 'react';

export default function App () {
    const [isConnected, setIsConnected] = useState(socket.connected)
    useEffect(()=>{
    function onConnect(){
      setIsConnected(true)
    }
    function onDisconnect(){
      setIsConnected(false)
    }
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
  })
    return (
        <div className="main-container center">
        <Nav />
        <MainContent />
        </div>
    )
}
