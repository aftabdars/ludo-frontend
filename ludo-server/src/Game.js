class Game {

    constructor(roomId, roomPass, playerId, playerName, io) {
        this.roomId = roomId;
        this.io = io;
        this.room = {
            roomPass: roomPass,
            players: [{'playerId': playerId,'ready':false, 'color': 'red', 'playerName': playerName}]
        }

        this.currentDice = 0;
        this.previousDice = 0;
        this.currentPlayer = "red";

        this.currentSpritePositions = {
        red: [40,40,40,40],
        green: [1,1,1,1],  //debugginghere turn this to 1 // if all pawns are finishing do nextmove
        blue: [27,27,27,27],
        yellow: [14,14,14,14]
        }
        this.players = {
        redOutOfHome: [false,false,false,false],
        redKiller: false,
        greenOutOfHome: [false,false,false,false],  //debugging
        greenKiller: false, //debugging
        blueOutOfHome: [false,false,false,false],
        blueKiller: false,
        yellowOutOfHome: [false,false,false,false],
        yellowKiller: false,
        redFinishing: [false,false,false,false],
        greenFinishing: [false,false,false,false],
        blueFinishing: [false,false,false,false],
        yellowFinishing: [false,false,false,false]
        }
        this.maxMoves = {
        green: 51,
        yellow: 12,
        blue: 25,
        red: 38,
        }
        this.startingSpritePositions = {
        red: 40,
        green: 1,
        blue: 27,
        yellow: 14,
        }

        this.finished = {
        red: [false,false,false,false],
        green: [false,false,false,false],
        blue: [false,false,false,false],
        yellow: [false,false,false,false]
        }
    }

  join(playerId, playerName) {
    let color;
    switch(this.room.players.length){
      case 1: color = 'yellow'; break;
      case 2: color = 'green'; break;
      case 3: color = 'blue'; break;
    }
    this.room.players.push({'playerId': playerId, 'ready': false, 'color': color, 'playerName': playerName})
    return;
  }

  nextMove() {
    let currentPlayerIndex;
    this.room.players.forEach((item,index, arr)=> {
      if(item.color == this.currentPlayer){
        if(index == this.players.length-1){
          this.currentPlayer = 'red';
          currentPlayerIndex = 0;
        }
        else {
          // this.currentPlayer = this.room.players[currentPlayerIndex].color;
          currentPlayerIndex = index+1;
        }
      }
    });
    //find a way to emit through here
    this.currentPlayer = this.room.players[currentPlayerIndex]['color'];
    let playerId = this.room.players[currentPlayerIndex].playerId;
    this.io.to(playerId).emit('enableDice')
  }

// makeRollDiceClickable(){
//   let button = document.getElementById("roll-dice-btn");
//   button.addEventListener("click", rollDice);
//   return;
// }

// getOffset(el) {
//     const rect = el.getBoundingClientRect();
//     return {
//       left: rect.left + window.scrollX,
//       top: rect.top + window.scrollY
//     };
//   }

// movePawnsToHome(playerColor){
//   for (let i=1; i<5; i++){
//     let postitionContainer = document.getElementById(playerColor+"-circle-"+i);
//     let position = getOffset(postitionContainer);
//     let pawn = document.getElementById(playerColor+"-pawn-"+i);
  
//     pawn.style.top= position.top+"px";
//     pawn.style.left= position.left+"px";
//     pawn.style.marginTop= "28px";
//     pawn.style.marginLeft= "28px";
//     pawn.style.backgroundColor=playerColor;
//   }
//   return;
// }

// makeSpritesClickable(playerColor) {
//   for (let i=1; i<5; i++){
//     let pawn = document.getElementById(playerColor+"-pawn-"+i);
//     pawn.addEventListener("click", myListener);
//     pawn.style.zIndex = "99";
//     console.log(getComputedStyle(pawn).zIndex);
//     // pawn.addEventListener("click", function() {onClickSprite(playerColor, i)});
//   }
//   return;
// }

// disableSprites(playerColor) {
//   for (let i=1; i<5; i++){
//     let pawn = document.getElementById(playerColor+"-pawn-"+i);
//     pawn.removeEventListener("click", myListener);
//     pawn.style.zIndex= "98";
//     console.log(getComputedStyle(pawn).zIndex);
//     // pawn.addEventListener("click", function() {onClickSprite(playerColor, i)});
//   }
//   return;
// }

myListener(event){
  onClickSprite(currentPlayer, event.target.id.slice(-1));
}

onClickSprite(playerColor, spriteNumber) { 
  if (players[playerColor+"Finishing"][spriteNumber - 1]) {
    moveWithinFinish(playerColor,spriteNumber);
    return;
  }
  if (boundaryReached(playerColor, spriteNumber) && !players[playerColor+"Killer"]) {
    return;
  }
  if (boundaryReached(playerColor, spriteNumber) && players[playerColor+"Killer"]) {
    moveToLastZone(playerColor, spriteNumber);
    return;
  }
  if (currentSpritePositions[playerColor][spriteNumber-1] + currentDice > 51 && currentSpritePositions[playerColor][spriteNumber-1] + currentDice < 66) {
    let difference = currentSpritePositions[playerColor][spriteNumber-1] + currentDice - 51;
    currentSpritePositions[playerColor][spriteNumber-1] = difference-1;
    movePawn(playerColor, spriteNumber);
  }
  else if (!players[playerColor+'OutOfHome'][spriteNumber-1] && currentDice!=6){
    return;
  }
  else if (players[playerColor+'OutOfHome'][spriteNumber-1]) {
    currentSpritePositions[playerColor][spriteNumber-1] = currentSpritePositions[playerColor][spriteNumber-1] + currentDice;
    movePawn(playerColor, spriteNumber);
  } 
  if (!players[playerColor+'OutOfHome'][spriteNumber-1] && currentDice==6) {
    // currentSpritePositions[playerColor][spriteNumber-1] = currentSpritePositions[playerColor][spriteNumber-1] + 1;
    players[playerColor+'OutOfHome'][spriteNumber-1] = true;
    movePawn(playerColor, spriteNumber);
  }
}

boundaryReached(playerColor, spriteNumber) {
  let hasRotated = false;
  if (currentSpritePositions[playerColor][spriteNumber-1] <= maxMoves[playerColor]){ //this change
    hasRotated = true;
  }
  if (currentSpritePositions[playerColor][spriteNumber-1] + currentDice > maxMoves[playerColor] && hasRotated) {
    return true; //working on this
  }
}

rollDice() {
  this.currentDice = Math.floor(Math.random() * (6 - 1 + 1) + 1);
//   let diceCounter = document.getElementById('dice-counter');
//   diceCounter.innerHTML = currentDice;
  this.io.to(`${this.roomId}`).emit('updateDice', this.currentDice);
//   document.getElementById('roll-dice-btn').removeEventListener("click", rollDice);
  if(this.currentDice < 6 && isLocked(this.currentPlayer)) {
    nextMove();
  }
  else {
    this.io.sockets.socket(playerId).emit('enableSprites');
    // makeSpritesClickable(currentPlayer); //server
  }
  return;
}

opponentExists (playerColor, position) {
  if(position == 48 || position == 1 || position == 9 || position == 14 || position == 22 || position == 27 || position == 35 || position == 40){
    return false
  }

  // let x = [["white",69],["white",69],["white",69],["white",69]]
  let colors = Object.keys(currentSpritePositions);
  let killFlag = false;

  for (let i=0; i<4; i++) {
    let currentColor = colors[i];
    for(let j=0; j<4; j++){
      if (position == currentSpritePositions[currentColor][j] && currentColor != playerColor) {
        // x[i][0] = currentColor;
        // x[i][1] = j;
        killFlag = killOpponent(currentColor, j + 1);
      }
    }
  }
  return killFlag;
}

movePawn(playerColor, spriteNumber){
  let x = currentSpritePositions[playerColor][spriteNumber - 1];
//   let postitionContainer = document.getElementById("box"+x);
//   let pawn = document.getElementById(playerColor+"-pawn-"+spriteNumber);  //working here.. sprites dont return to home,, also extra turn after killing
//   let position = getOffset(postitionContainer);  //working here
//   let previousPosition = getOffset(pawn);
  
  let killFlag = opponentExists(playerColor, x);
//   animatePawn(pawn, previousPosition, position); //server

  // pawn.style.top= position.top+"px";
  // pawn.style.left= position.left+"px";
//   pawn.style.marginTop= "9px";
//   pawn.style.marginLeft= "9px";

  if (killFlag) {
    console.log(killFlag);
    nextMoveSamePlayer();
  }
  else if (currentDice == 6) {
    nextMoveSamePlayer(); //check this
  } else {
    nextMove();
  }
  
  return;
}

killOpponent(playerColor,spriteNumber){
    // let postitionContainer = document.getElementById(playerColor+"-circle-"+spriteNumber);
    // let position = getOffset(postitionContainer);
    // let pawn = document.getElementById(playerColor+"-pawn-"+spriteNumber);
    // let previousPosition = getOffset(pawn);
    
    // pawn.style.top= position.top+"px";
    // pawn.style.left= position.left+"px";
    // animatePawn(pawn,previousPosition,position); //server
    // pawn.style.marginTop= "28px";
    // pawn.style.marginLeft= "28px";
    // pawn.style.backgroundColor=playerColor;

    players[currentPlayer+"Killer"] = true;
    // console.log(players);

    //set vars
    currentSpritePositions[playerColor][spriteNumber -1] = startingSpritePositions[playerColor];
    players[playerColor+"OutOfHome"][spriteNumber-1] = false;
    if (isLocked(playerColor)) {
      players[playerColor+"Killer"] = false;
    }
  return true;
}

nextMoveSamePlayer() {
//   document.getElementById('dice-counter').innerHTML = "";
//   disableSprites(currentPlayer); //server

//   makeRollDiceClickable(); //server

  // currentDice = 0; //working here 5pm
  return;
}

// nextMove(){
// //   document.getElementById('dice-counter').innerHTML = ""
// //   disableSprites(currentPlayer); //server
  
//   let player = currentPlayer
//   switch (player) {
//     case "red": currentPlayer="green" 
//     break;
//     case "green": currentPlayer="yellow" 
//     break;
//     case "yellow": currentPlayer="blue" 
//     break;
//     case "blue": currentPlayer="red" 
//     break;
//   }
  // didMove = false;

//   makeRollDiceClickable();
//   // window.alert(currentPlayer+"'s turn"); //temporary code
//   previousDice = currentDice;
//   currentDice = 0; //working here 5pm
//   // document.getElementById('dice-counter').innerHTML = ".  previous= "+previousDice+"      current= "+ currentDice;
//   playerInHand(currentPlayer);
//   return;
// }

playerInHand(playerColor) {
//   let navTurn = document.getElementById('player-turn')
//   navTurn.innerHTML = playerColor+"'s turn.";
//   navTurn.style.color = playerColor;

//   console.log(currentPlayer);
//   makeRollDiceClickable(); //server
  // makeSpritesClickable(playerColor);
  return;
}

isLocked(playerColor) {
  for (let i=0;i<4;i++){
    if (players[playerColor+"OutOfHome"][i]) {
      return false;
    }
  }
  return true;

  //include 6 logic in morning
}

moveWithinFinish(playerColor, spriteNumber) {
  let destination = currentSpritePositions[playerColor][spriteNumber - 1] + currentDice;
//   console.log('is finishing');
  if (destination > 76) {
    return;
  }
  if (destination == 76) {
    // spriteWon(playerColor, spriteNumber); //server
    return;
  }

  currentSpritePositions[playerColor][spriteNumber - 1] = destination;
  let x = destination - 70;
//   let postitionContainer = document.getElementById("box-"+playerColor+"-"+x);
//   let pawn = document.getElementById(playerColor+"-pawn-"+spriteNumber); 
//   let position = getOffset(postitionContainer); 

//   let previousPosition = getOffset(pawn);
//   animatePawn(pawn,previousPosition,position); //server
  // pawn.style.top= position.top+"px";
  // pawn.style.left= position.left+"px";
//   pawn.style.marginTop= "9px";
//   pawn.style.marginLeft= "9px";
  nextMove();
}

moveToLastZone(playerColor,spriteNumber) {
  let difference = currentSpritePositions[playerColor][spriteNumber-1] + currentDice - maxMoves[playerColor]; //working on this
  if (difference == 6) {
    spriteWon(playerColor, spriteNumber);
    return;
  }

  currentSpritePositions[playerColor][spriteNumber - 1] = difference + 70;

  let x = currentSpritePositions[playerColor][spriteNumber - 1] - 70;
//   let postitionContainer = document.getElementById("box-"+playerColor+"-"+x);
//   let pawn = document.getElementById(playerColor+"-pawn-"+spriteNumber); 
//   let position = getOffset(postitionContainer); 

//   let previousPosition = getOffset(pawn);
//   animatePawn (pawn,previousPosition,position); //server
  // pawn.style.top= position.top+"px";
  // pawn.style.left= position.left+"px";
//   pawn.style.marginTop= "9px";
//   pawn.style.marginLeft= "9px";

  players[playerColor+"Finishing"][spriteNumber - 1] = true;
  players[playerColor+"OutOfHome"][spriteNumber - 1] = false;
  nextMove();
}

spriteWon(playerColor, spriteNumber){
  finished[playerColor][spriteNumber - 1] = true; 
  players[playerColor+"OutOfHome"][spriteNumber - 1] = false;

//   let pawn = document.getElementById(playerColor+"-pawn-"+spriteNumber); 

  // pawn.style.top= "200%";
  // pawn.style.left= "200%";
  // pawn.style.marginTop= "9px";
  // pawn.style.marginLeft= "9px";
//   let position = getOffset(document.getElementById('ending-box'));
//   let previousPosition = getOffset(pawn);
//   animatePawn(pawn,previousPosition,position); //server
//   pawn.removeEventListener("click", myListener); //server

  hasWon(playerColor);
  nextMoveSamePlayer();
  console.log('pawnwon');
}

hasWon(playerColor) {
  if (finished[playerColor][0] && finished[playerColor][1] && finished[playerColor][2] && finished[playerColor][3]) {
    window.alert(playerColor+"won");
  }
}

// animatePawn (pawn, previousPosition, position) {
//   let id = null;
//   let leftAdd = true;
//   let topAdd = true;

//   let pos = previousPosition;

//   if (position.left < previousPosition.left) {
//     leftAdd = false;
//   }
//   if (position.top < previousPosition.top) {
//     topAdd = false;
//   }

//   clearInterval(id);
//   id = setInterval(frame, 5);
//   let frameCount = 0;
//   frame() {
//     frameCount++;
//     if (pos.left == position.left && pos.top == position.top || frameCount == 100) {
//       clearInterval(id);
//       pawn.style.top = position.top + 'px';
//       pawn.style.left = position.left + 'px';
//     } else {
//       if (leftAdd && pos.left != position.left) {
//         pos.left++;
//         pawn.style.left = pos.left + 'px';
//       }
//       if (!leftAdd && pos.left != position.left) {
//         pos.left--;
//         pawn.style.left = pos.left + 'px';
//       }
//       if (topAdd && pos.top != position.top) {
//         pos.top++;
//         pawn.style.top = pos.top + 'px';
//       }
//       if (!topAdd && pos.top != position.top) {
//         pos.top--;
//         pawn.style.top = pos.top + 'px';
//       }
//     }
//   }
// }

// window.addEventListener('resize', function(event) {
//   let playerColors = ["red","green","blue","yellow"];
//   for (let i=0;i<4;i++){
//     let playerColor = playerColors[i];
//     console.log(playerColor);
//     for (let j=1;j<5;j++){
//       let pawn = document.getElementById(playerColor+"-pawn-"+j);

//       if(players[playerColor+"OutOfHome"][j-1] && !players[playerColor+"Finishing"][j-1]) {
//         let x = currentSpritePositions[playerColor][j-1]
//         let position = getOffset(document.getElementById("box"+x));
//         pawn.style.top= position.top+"px";
//         pawn.style.left= position.left+"px";
//       }
//       if(!players[playerColor+"OutOfHome"][j-1]){
//         //send it to home
//         let position = getOffset(document.getElementById(playerColor+"-circle-"+j));
//         pawn.style.top= position.top+"px";
//         pawn.style.left= position.left+"px";
//       }
//       else if(players[playerColor+"Finishing"][j-1]){
//         let x = currentSpritePositions[playerColor][j-1] - 70;
//         let position = document.getElementById("box-"+playerColor+"-"+x);
//         pawn.style.top= position.top+"px";
//         pawn.style.left= position.left+"px";
//       }
//     }
//   }
//   // update locations for all pawns
//   console.log("resize");
// }, true);
}

module.exports = Game;