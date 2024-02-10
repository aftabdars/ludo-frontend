
let Game = {
   currentDice : 0,
   previousDice : 0,
   currentPlayer : "green",
   currentSpritePositions : {
    red: [40,40,40,40],
    green: [1,1,1,1],  //debugginghere turn this to 1 // if all pawns are finishing do nextmove
    blue: [27,27,27,27],
    yellow: [14,14,14,14]
  },
  players : {
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
  },
  maxMoves : {
    green: 51,
    yellow: 12,
    blue: 25,
    red: 38,
  },
  startingSpritePositions : {
    red: 40,
    green: 1,
    blue: 27,
    yellow: 14,
  },

  finished : {
    red: [false,false,false,false],
    green: [false,false,false,false],
    blue: [false,false,false,false],
    yellow: [false,false,false,false]
  },
}

export default function onPlayerJoin(playerColor) {
  movePawnsToHome(playerColor);
  // makeRollDiceClickable();
  // makeSpritesClickable(playerColor);
  playerInHand(Game.currentPlayer);
  return;
}

function makeRollDiceClickable(){
  let button = document.getElementById("roll-dice-btn");
  button.addEventListener("click", rollDice);
  return;
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

function movePawnsToHome(playerColor){
  for (let i=1; i<5; i++){
    let postitionContainer = document.getElementById(playerColor+"-circle-"+i);
    let position = getOffset(postitionContainer);
    let pawn = document.getElementById(playerColor+"-pawn-"+i);
  
    pawn.style.top= position.top+"px";
    pawn.style.left= position.left+"px";
    pawn.style.marginTop= "28px";
    pawn.style.marginLeft= "28px";
    pawn.style.backgroundColor=playerColor;
  }
  return;
}

function makeSpritesClickable(playerColor) {
  for (let i=1; i<5; i++){
    let pawn = document.getElementById(playerColor+"-pawn-"+i);
    pawn.addEventListener("click", myListener);
    pawn.style.zIndex = "99";
    console.log(getComputedStyle(pawn).zIndex);
    // pawn.addEventListener("click", function() {onClickSprite(playerColor, i)});
  }
  return;
}

function disableSprites(playerColor) {
  for (let i=1; i<5; i++){
    let pawn = document.getElementById(playerColor+"-pawn-"+i);
    pawn.removeEventListener("click", myListener);
    pawn.style.zIndex= "98";
    console.log(getComputedStyle(pawn).zIndex);
    // pawn.addEventListener("click", function() {onClickSprite(playerColor, i)});
  }
  return;
}

function myListener(event){
  onClickSprite(Game.currentPlayer, event.target.id.slice(-1));
}

function onClickSprite(playerColor, spriteNumber) { 
  if (Game.players[playerColor+"Finishing"][spriteNumber - 1]) {
    moveWithinFinish(playerColor,spriteNumber);
    return;
  }
  if (boundaryReached(playerColor, spriteNumber) && !Game.players[playerColor+"Killer"]) {
    return;
  }
  if (boundaryReached(playerColor, spriteNumber) && Game.players[playerColor+"Killer"]) {
    moveToLastZone(playerColor, spriteNumber);
    return;
  }
  if (Game.currentSpritePositions[playerColor][spriteNumber-1] + Game.currentDice > 51 && Game.currentSpritePositions[playerColor][spriteNumber-1] + Game.currentDice < 66) {
    let difference = Game.currentSpritePositions[playerColor][spriteNumber-1] + Game.currentDice - 51;
    Game.currentSpritePositions[playerColor][spriteNumber-1] = difference-1;
    movePawn(playerColor, spriteNumber);
  }
  else if (!Game.players[playerColor+'OutOfHome'][spriteNumber-1] && Game.currentDice!=6){
    return;
  }
  else if (Game.players[playerColor+'OutOfHome'][spriteNumber-1]) {
    Game.currentSpritePositions[playerColor][spriteNumber-1] = Game.currentSpritePositions[playerColor][spriteNumber-1] + Game.currentDice;
    movePawn(playerColor, spriteNumber);
  } 
  if (!Game.players[playerColor+'OutOfHome'][spriteNumber-1] && Game.currentDice==6) {
    // Game.currentSpritePositions[playerColor][spriteNumber-1] = Game.currentSpritePositions[playerColor][spriteNumber-1] + 1;
    Game.players[playerColor+'OutOfHome'][spriteNumber-1] = true;
    movePawn(playerColor, spriteNumber);
  }
}

function boundaryReached(playerColor, spriteNumber) {
  let hasRotated = false;
  if (Game.currentSpritePositions[playerColor][spriteNumber-1] <= Game.maxMoves[playerColor]){ //this change
    hasRotated = true;
  }
  if (Game.currentSpritePositions[playerColor][spriteNumber-1] + Game.currentDice > Game.maxMoves[playerColor] && hasRotated) {
    return true; //working on this
  }
}

function rollDice() {
  Game.currentDice = Math.floor(Math.random() * (6 - 1 + 1) + 1);
  let diceCounter = document.getElementById('dice-counter');
  diceCounter.innerHTML = Game.currentDice;
  document.getElementById('roll-dice-btn').removeEventListener("click", rollDice);
  if(Game.currentDice < 6 && isLocked(Game.currentPlayer)) {
    nextMove();
  }
  else {
    makeSpritesClickable(Game.currentPlayer);
  }
  return;
}

function opponentExists (playerColor, position) {
  if(position == 48 || position == 1 || position == 9 || position == 14 || position == 22 || position == 27 || position == 35 || position == 40){
    return false
  }

  // let x = [["white",69],["white",69],["white",69],["white",69]]
  let colors = Object.keys(Game.currentSpritePositions);
  let killFlag = false;

  for (let i=0; i<4; i++) {
    let currentColor = colors[i];
    for(let j=0; j<4; j++){
      if (position == Game.currentSpritePositions[currentColor][j] && currentColor != playerColor) {
        // x[i][0] = currentColor;
        // x[i][1] = j;
        killFlag = killOpponent(currentColor, j + 1);
      }
    }
  }
  return killFlag;
}

function movePawn(playerColor, spriteNumber){
  let x = Game.currentSpritePositions[playerColor][spriteNumber - 1];
  let postitionContainer = document.getElementById("box"+x);
  let pawn = document.getElementById(playerColor+"-pawn-"+spriteNumber);  //working here.. sprites dont return to home,, also extra turn after killing
  let position = getOffset(postitionContainer);  //working here
  let previousPosition = getOffset(pawn);
  
  let killFlag = opponentExists(playerColor, x);
  animatePawn(pawn, previousPosition, position);

  // pawn.style.top= position.top+"px";
  // pawn.style.left= position.left+"px";
  pawn.style.marginTop= "9px";
  pawn.style.marginLeft= "9px";

  if (killFlag) {
    console.log(killFlag);
    nextMoveSamePlayer();
  }
  else if (Game.currentDice == 6) {
    nextMoveSamePlayer(); //check this
  } else {
    nextMove();
  }
  
  return;
}

function killOpponent(playerColor,spriteNumber){
    let postitionContainer = document.getElementById(playerColor+"-circle-"+spriteNumber);
    let position = getOffset(postitionContainer);
    let pawn = document.getElementById(playerColor+"-pawn-"+spriteNumber);
    let previousPosition = getOffset(pawn);
    
    // pawn.style.top= position.top+"px";
    // pawn.style.left= position.left+"px";
    animatePawn(pawn,previousPosition,position);
    pawn.style.marginTop= "28px";
    pawn.style.marginLeft= "28px";
    // pawn.style.backgroundColor=playerColor;

    Game.players[Game.currentPlayer+"Killer"] = true;
    console.log(Game.players);

    //set vars
    Game.currentSpritePositions[playerColor][spriteNumber -1] = Game.startingSpritePositions[playerColor];
    Game.players[playerColor+"OutOfHome"][spriteNumber-1] = false;
    if (isLocked(playerColor)) {
      Game.players[playerColor+"Killer"] = false;
    }
  return true;
}

function nextMoveSamePlayer() {
  document.getElementById('dice-counter').innerHTML = "";
  disableSprites(Game.currentPlayer);

  makeRollDiceClickable();

  // Game.currentDice = 0; //working here 5pm
  return;
}

function nextMove(){
  document.getElementById('dice-counter').innerHTML = ""
  disableSprites(Game.currentPlayer);
  
  let player = Game.currentPlayer
  switch (player) {
    case "red": Game.currentPlayer="green" 
    break;
    case "green": Game.currentPlayer="yellow" 
    break;
    case "yellow": Game.currentPlayer="blue" 
    break;
    case "blue": Game.currentPlayer="red" 
    break;
  }
  // didMove = false;

  makeRollDiceClickable();
  // window.alert(Game.currentPlayer+"'s turn"); //temporary code
  Game.previousDice = Game.currentDice;
  Game.currentDice = 0; //working here 5pm
  // document.getElementById('dice-counter').innerHTML = ".  previous= "+Game.previousDice+"      current= "+ Game.currentDice;
  playerInHand(Game.currentPlayer);
  return;
}

function playerInHand(playerColor) {
  let navTurn = document.getElementById('player-turn')
  navTurn.innerHTML = playerColor+"'s turn.";
  navTurn.style.color = playerColor;

  console.log(Game.currentPlayer);
  makeRollDiceClickable();
  // makeSpritesClickable(playerColor);
  return;
}

function isLocked(playerColor) {
  for (let i=0;i<4;i++){
    if (Game.players[playerColor+"OutOfHome"][i]) {
      return false;
    }
  }
  return true;

  //include 6 logic in morning
}

function moveWithinFinish(playerColor, spriteNumber) {
  let destination = Game.currentSpritePositions[playerColor][spriteNumber - 1] + Game.currentDice;
  console.log('is finishing');
  if (destination > 76) {
    return;
  }
  if (destination == 76) {
    spriteWon(playerColor, spriteNumber);
    return;
  }

  Game.currentSpritePositions[playerColor][spriteNumber - 1] = destination;
  let x = destination - 70;
  let postitionContainer = document.getElementById("box-"+playerColor+"-"+x);
  let pawn = document.getElementById(playerColor+"-pawn-"+spriteNumber); 
  let position = getOffset(postitionContainer); 

  let previousPosition = getOffset(pawn);
  animatePawn(pawn,previousPosition,position);
  // pawn.style.top= position.top+"px";
  // pawn.style.left= position.left+"px";
  pawn.style.marginTop= "9px";
  pawn.style.marginLeft= "9px";
  nextMove();
}

function moveToLastZone(playerColor,spriteNumber) {
  let difference = Game.currentSpritePositions[playerColor][spriteNumber-1] + Game.currentDice - Game.maxMoves[playerColor]; //working on this
  if (difference == 6) {
    spriteWon(playerColor, spriteNumber);
    return;
  }

  Game.currentSpritePositions[playerColor][spriteNumber - 1] = difference + 70;

  let x = Game.currentSpritePositions[playerColor][spriteNumber - 1] - 70;
  let postitionContainer = document.getElementById("box-"+playerColor+"-"+x);
  let pawn = document.getElementById(playerColor+"-pawn-"+spriteNumber); 
  let position = getOffset(postitionContainer); 

  let previousPosition = getOffset(pawn);
  animatePawn (pawn,previousPosition,position);
  // pawn.style.top= position.top+"px";
  // pawn.style.left= position.left+"px";
  pawn.style.marginTop= "9px";
  pawn.style.marginLeft= "9px";

  Game.players[playerColor+"Finishing"][spriteNumber - 1] = true;
  Game.players[playerColor+"OutOfHome"][spriteNumber - 1] = false;
  nextMove();
}

function spriteWon(playerColor, spriteNumber){
  Game.finished[playerColor][spriteNumber - 1] = true; 
  Game.players[playerColor+"OutOfHome"][spriteNumber - 1] = false;

  let pawn = document.getElementById(playerColor+"-pawn-"+spriteNumber); 

  // pawn.style.top= "200%";
  // pawn.style.left= "200%";
  // pawn.style.marginTop= "9px";
  // pawn.style.marginLeft= "9px";
  let position = getOffset(document.getElementById('ending-box'));
  let previousPosition = getOffset(pawn);
  animatePawn(pawn,previousPosition,position);
  pawn.removeEventListener("click", myListener);

  hasWon(playerColor);
  nextMoveSamePlayer();
  console.log('pawnwon');
}

function hasWon(playerColor) {
  if (Game.finished[playerColor][0] && Game.finished[playerColor][1] && Game.finished[playerColor][2] && Game.finished[playerColor][3]) {
    window.alert(playerColor+"won");
  }
}

function animatePawn (pawn, previousPosition, position) {
  let id = null;
  let leftAdd = true;
  let topAdd = true;

  let pos = previousPosition;

  if (position.left < previousPosition.left) {
    leftAdd = false;
  }
  if (position.top < previousPosition.top) {
    topAdd = false;
  }

  clearInterval(id);
  id = setInterval(frame, 5);
  let frameCount = 0;
  function frame() {
    frameCount++;
    if (pos.left == position.left && pos.top == position.top || frameCount == 100) {
      clearInterval(id);
      pawn.style.top = position.top + 'px';
      pawn.style.left = position.left + 'px';
    } else {
      if (leftAdd && pos.left != position.left) {
        pos.left++;
        pawn.style.left = pos.left + 'px';
      }
      if (!leftAdd && pos.left != position.left) {
        pos.left--;
        pawn.style.left = pos.left + 'px';
      }
      if (topAdd && pos.top != position.top) {
        pos.top++;
        pawn.style.top = pos.top + 'px';
      }
      if (!topAdd && pos.top != position.top) {
        pos.top--;
        pawn.style.top = pos.top + 'px';
      }
    }
  }
}

window.addEventListener('resize', function(event) {
  let playerColors = ["red","green","blue","yellow"];
  for (let i=0;i<4;i++){
    let playerColor = playerColors[i];
    console.log(playerColor);
    for (let j=1;j<5;j++){
      let pawn = document.getElementById(playerColor+"-pawn-"+j);

      if(Game.players[playerColor+"OutOfHome"][j-1] && !Game.players[playerColor+"Finishing"][j-1]) {
        let x = Game.currentSpritePositions[playerColor][j-1]
        let position = getOffset(document.getElementById("box"+x));
        pawn.style.top= position.top+"px";
        pawn.style.left= position.left+"px";
      }
      if(!Game.players[playerColor+"OutOfHome"][j-1]){
        //send it to home
        let position = getOffset(document.getElementById(playerColor+"-circle-"+j));
        pawn.style.top= position.top+"px";
        pawn.style.left= position.left+"px";
      }
      else if(Game.players[playerColor+"Finishing"][j-1]){
        let x = Game.currentSpritePositions[playerColor][j-1] - 70;
        let position = document.getElementById("box-"+playerColor+"-"+x);
        pawn.style.top= position.top+"px";
        pawn.style.left= position.left+"px";
      }
    }
  }
  // update locations for all pawns
  console.log("resize");
}, true);