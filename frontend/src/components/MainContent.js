import React from 'react';
import './style/MainContent.css'
import {CreatePawns, GameWindow} from './GameWindow';

export default function MainContent() {
    return (
        <div className="maincontent-container">
        <GameWindow />
        <CreatePawns />
        </div>
    )
}
