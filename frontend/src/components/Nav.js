import React from 'react';
import './style/Nav.css';
import logo from'../img/logo512.png';

export default function Nav() {
    return (
        <nav className="nav">
            <div className="logo-container" id="roll-dice-btn">
                <img className="nav-logo" src={logo} alt="logo"></img>
                <h5 id='player-turn'>Roll Dice</h5>
            </div>
            <div className="logo-container">
                <h6>Dice    :</h6>
                <h6 id="dice-counter">0</h6>
            </div>
        </nav>
    )
}