import React from 'react';
import './style/GameWindow.css';

export function GameWindow () {
    return (
        <div id="game">
            <div id="home-red">
                <div className="homes-white">
                    <div className="circles-red" id="red-circle-1"></div>
                    <div className="circles-red" id="red-circle-2"></div>
                    <div className="circles-red" id="red-circle-3"></div>
                    <div className="circles-red" id="red-circle-4"></div>
                </div>
            </div>
            
            <div id="grid-red-green">
                <div id="box50" className="play-box"></div>
                <div id="box51" className="play-box"></div>
                <div id="box0" className="play-box"></div>

                <div id="box49" className="play-box"></div>
                <div id="box-green-1" className="play-box green-play-box"></div>
                <div id="box1" className="play-box green-play-box"></div>

                <div id="box48" className="play-box star"></div>
                <div id="box-green-2" className="play-box green-play-box"></div>
                <div id="box2" className="play-box"></div>

                <div id="box47" className="play-box"></div>
                <div id="box-green-3" className="play-box green-play-box"></div>
                <div id="box3" className="play-box"></div>

                <div id="box46" className="play-box"></div>
                <div id="box-green-4" className="play-box green-play-box"></div>
                <div id="box4" className="play-box"></div>

                <div id="box45" className="play-box"></div>
                <div id="box-green-5" className="play-box green-play-box"></div>
                <div id="box5" className="play-box"></div>
            </div>

            <div id="home-green">
                <div className="homes-white">
                    <div className="circles-green" id="green-circle-1"></div>
                    <div className="circles-green" id="green-circle-2"></div>
                    <div className="circles-green" id="green-circle-3"></div>
                    <div className="circles-green" id="green-circle-4"></div>
                </div>
            </div>

            <div id="grid-red-blue">
                <div id="box39" className="play-box"></div>
                <div id="box40" className="play-box red-play-box"></div>
                <div id="box41" className="play-box"></div>
                <div id="box42" className="play-box"></div>
                <div id="box43" className="play-box"></div>
                <div id="box44" className="play-box"></div>

                <div id="box38" className="play-box"></div>
                <div id="box-red-1" className="play-box red-play-box"></div>
                <div id="box-red-2" className="play-box red-play-box"></div>
                <div id="box-red-3" className="play-box red-play-box"></div>
                <div id="box-red-4" className="play-box red-play-box"></div>
                <div id="box-red-5" className="play-box red-play-box"></div>

                <div id="box37" className="play-box"></div>
                <div id="box36" className="play-box"></div>
                <div id="box35" className="play-box star"></div>
                <div id="box34" className="play-box"></div>
                <div id="box33" className="play-box"></div>
                <div id="box32" className="play-box"></div>
            </div>
            
            <div id="ending-box">
                <div id="top-triangle"></div>
                <div id="left-triangle"></div>
                <div id="right-triangle"></div>
                <div id="bottom-triangle"></div>
            </div>

            <div id="grid-green-yellow">
                <div id="box6" className="play-box"></div>
                <div id="box7" className="play-box"></div>
                <div id="box8" className="play-box"></div>
                <div id="box9" className="play-box star"></div>
                <div id="box10" className="play-box"></div>
                <div id="box11" className="play-box"></div>

                <div id="box-yellow-5" className="play-box yellow-play-box"></div>
                <div id="box-yellow-4" className="play-box yellow-play-box"></div>
                <div id="box-yellow-3" className="play-box yellow-play-box"></div>
                <div id="box-yellow-2" className="play-box yellow-play-box"></div>
                <div id="box-yellow-1" className="play-box yellow-play-box"></div>
                <div id="box12" className="play-box"></div>

                <div id="box18" className="play-box"></div>
                <div id="box17" className="play-box"></div>
                <div id="box16" className="play-box"></div>
                <div id="box15" className="play-box"></div>
                <div id="box14" className="play-box yellow-play-box"></div>
                <div id="box13" className="play-box"></div>
            </div>

            <div id="home-blue">
                <div className="homes-white">
                    <div className="circles-blue" id="blue-circle-1"></div>
                    <div className="circles-blue" id="blue-circle-2"></div>
                    <div className="circles-blue" id="blue-circle-3"></div>
                    <div className="circles-blue" id="blue-circle-4"></div>
                </div>
            </div>

            <div id="grid-blue-yellow">
                <div id="box31" className="play-box"></div>
                <div id="box-blue-5" className="play-box blue-play-box"></div>
                <div id="box19" className="play-box"></div>

                <div id="box30" className="play-box"></div>
                <div id="box-blue-4" className="play-box blue-play-box"></div>
                <div id="box20" className="play-box"></div>

                <div id="box29" className="play-box"></div>
                <div id="box-blue-3" className="play-box blue-play-box"></div>
                <div id="box21" className="play-box"></div>

                <div id="box28" className="play-box"></div>
                <div id="box-blue-2" className="play-box blue-play-box"></div>
                <div id="box22" className="play-box star"></div>

                <div id="box27" className="play-box blue-play-box"></div>
                <div id="box-blue-1" className="play-box blue-play-box"></div>
                <div id="box23" className="play-box"></div>

                <div id="box26" className="play-box"></div>
                <div id="box25" className="play-box"></div>
                <div id="box24" className="play-box"></div>
            </div>

            <div id="home-yellow">
                <div className="homes-white">
                    <div className="circles-yellow" id="yellow-circle-1"></div>
                    <div className="circles-yellow" id="yellow-circle-2"></div>
                    <div className="circles-yellow" id="yellow-circle-3"></div>
                    <div className="circles-yellow" id="yellow-circle-4"></div>
                </div>
            </div>
        </div>
    )
}

export function CreatePawns(){
    return (
        <div id="pawn-temp-container">
            <div id="red-pawn-1" className="sprite"></div>
            <div id="red-pawn-2" className="sprite"></div>
            <div id="red-pawn-3" className="sprite"></div>
            <div id="red-pawn-4" className="sprite"></div>

            <div id="blue-pawn-1" className="sprite"></div>
            <div id="blue-pawn-2" className="sprite"></div>
            <div id="blue-pawn-3" className="sprite"></div>
            <div id="blue-pawn-4" className="sprite"></div>

            <div id="yellow-pawn-1" className="sprite"></div>
            <div id="yellow-pawn-2" className="sprite"></div>
            <div id="yellow-pawn-3" className="sprite"></div>
            <div id="yellow-pawn-4" className="sprite"></div>

            <div id="green-pawn-1" className="sprite"></div>
            <div id="green-pawn-2" className="sprite"></div>
            <div id="green-pawn-3" className="sprite"></div>
            <div id="green-pawn-4" className="sprite"></div>
        </div>
    )
}