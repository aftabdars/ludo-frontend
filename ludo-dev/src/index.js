import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import onPlayerJoin from './logic/GameFunctions';

const root = document.getElementById('root');

ReactDOM.render(<App />, root);

onPlayerJoin("green");
onPlayerJoin("yellow");
onPlayerJoin("red");
onPlayerJoin("blue");