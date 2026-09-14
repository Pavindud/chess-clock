const clockState = {
  whiteTimeMs: 0,
  blackTimeMs: 0,
  incrementMs: 0,
  activePlayer: 0,
  isRunning: false,
  isGameOver: false
};


function clockInit(baseMinutes, incrementSeconds) {
  if(incrementAfterMove.value==0){
    clockState.whiteTimeMs = baseMinutes * 60000 + incrementSeconds*1000;
    clockState.blackTimeMs = baseMinutes * 60000 + incrementSeconds*1000;
    clockState.incrementMs = incrementSeconds * 1000;
    
  }
  else{
    clockState.whiteTimeMs = baseMinutes * 60000;
    clockState.blackTimeMs = baseMinutes * 60000;
    clockState.incrementMs = incrementSeconds * 1000;
    
  }
  clockState.isRunning = false;
  clockState.isGameOver = false;
  clockState.activePlayer = 0;
}

function clockTick(elapsedMs) {
  if (!clockState.isRunning || clockState.isGameOver) return;

  if (clockState.activePlayer === 0) {
    clockState.whiteTimeMs -= elapsedMs;
    if (clockState.whiteTimeMs <= 0) {
      clockState.whiteTimeMs = 0;
      clockState.isGameOver = true;
    }
  } else {
    clockState.blackTimeMs -= elapsedMs;
    if (clockState.blackTimeMs <= 0) {
      clockState.blackTimeMs = 0;
      clockState.isGameOver = true;
    }
  }
}

function clockSwitchTurn() {
  if (clockState.isGameOver || !clockState.isRunning) return;

  if(moveCount>incrementAfterMove.value || moveCount==incrementAfterMove.value){
    if (clockState.activePlayer === 0) {
    clockState.whiteTimeMs += clockState.incrementMs;
    clockState.activePlayer = 1;
    } 
    else {
    clockState.blackTimeMs += clockState.incrementMs;
    clockState.activePlayer = 0;
    }
  }
  else{
    if (clockState.activePlayer === 0) {
    clockState.activePlayer = 1;
    } 
    else {
    clockState.activePlayer = 0;
    }
  }
  
}

function clockStart() {
  clockState.isRunning = true;
}

function clockPause() {
  clockState.isRunning = false;
}

function clockReset(baseMinutes, incrementSeconds) {
  clockInit(baseMinutes, incrementSeconds);
}

function clockGetWhiteTime() {
  return clockState.whiteTimeMs;
}

function clockGetBlackTime() {
  return clockState.blackTimeMs;
}

function clockGetActivePlayer() {
  return clockState.activePlayer;
}

function clockIsRunning() {
  return clockState.isRunning;
}

function clockIsGameOver() {
  return clockState.isGameOver;
}
