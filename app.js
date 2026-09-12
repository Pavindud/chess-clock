let lastTick = null;
let animFrame = null;
let pauseStat = 0;
let g_mode = null;
let moveCount =0;

//buttons
const whiteBtn = document.getElementById('whiteClock');
const blackBtn = document.getElementById('blackClock');
const startBtn = document.getElementById('pauseBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const switchBtn = document.getElementById('re-load');
const applyBtn = document.getElementById('applyBtn');
const gameTypeSelect = document.getElementById('gameTypeSelect');
const timeTemplateGroup = document.getElementById('timeTemplateGroup');
const timeTemplateSelect = document.getElementById('timeTemplateSelect');
const minutesInput = document.getElementById('minutesInput');
const incrementInput = document.getElementById('incrementInput');
const statusMsg = document.getElementById('statusMsg');
const pauseIcon = pauseBtn.querySelector('path');
//control buttons
const PAUSE_PATH = "M6 19h4V5H6v14zm8-14v14h4V5h-4z";
const PLAY_PATH = "M8 5v14l11-7z";
//menu gamemode 
const rapidMenu = document.getElementById('timeTemplateRapid');
const blitzMenu = document.getElementById('timeTemplateBlitz');
const bulletMenu = document.getElementById('timeTemplateBullet');

const incrementAfterMove = document.getElementById('incrementAfterMove');

clockInit(Number(minutesInput.value), Number(incrementInput.value));
render();

function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes + ':' + seconds.toString().padStart(2, '0');
}


function render() {
  whiteBtn.textContent = formatTime(clockGetWhiteTime());
  blackBtn.textContent = formatTime(clockGetBlackTime());

  const active = clockGetActivePlayer();
  whiteBtn.classList.toggle('active', active === 0 && clockIsRunning());
  blackBtn.classList.toggle('active', active === 1 && clockIsRunning());

  if (clockIsGameOver()) {
    whiteBtn.classList.toggle('flagged', clockGetWhiteTime() <= 0);
    blackBtn.classList.toggle('flagged', clockGetBlackTime() <= 0);
    statusMsg.textContent = clockGetWhiteTime() <= 0
      ? 'White flagged. Black wins.'
      : 'Black flagged. White wins.';
  } else {
    statusMsg.textContent = '';
  }
}

function loop(timestamp) {
  if (lastTick === null) lastTick = timestamp;
  const elapsed = timestamp - lastTick;
  lastTick = timestamp;

  clockTick(elapsed);
  render();

  if (clockIsRunning() && !clockIsGameOver()) {
    animFrame = requestAnimationFrame(loop);
  }
}
function setuphide(){
  document.getElementById('setupPanel').style.display ="none";

}
function setupshow(){
  document.getElementById('setupPanel').style.display = "flex";

}
function setPauseButtonIcon(pauseStat) {
  pauseIcon.setAttribute('d', pauseStat ? PAUSE_PATH : PLAY_PATH);
  pauseBtn.setAttribute('title', pauseStat ? 'Pause' : 'Play');
  pauseBtn.setAttribute('aria-label', pauseStat ? 'Pause' : 'Play');
}
function rapidMenuUpdate(){
  if(rapidMenu.value ==0){
    document.getElementById('minutesInput').value= 10;
    document.getElementById('incrementInput').value=0;
  }
  else{
    if(rapidMenu.value==1){
      document.getElementById('minutesInput').value= 10;
      document.getElementById('incrementInput').value=5;
    }
    else{
      document.getElementById('minutesInput').value= 15;
      document.getElementById('incrementInput').value=10;
    }
  }
}
function blitzMenuUpdate(){
  if(blitzMenu.value ==0){
    document.getElementById('minutesInput').value= 3;
    document.getElementById('incrementInput').value=0;
  }
  else{
    if(blitzMenu.value==1){
      document.getElementById('minutesInput').value= 3;
      document.getElementById('incrementInput').value=2;
    }
    else{
      document.getElementById('minutesInput').value= 5;
      document.getElementById('incrementInput').value=0;
    }
  }
}
function bulletMenuUpdate(){
  if(bulletMenu.value ==0){
    document.getElementById('minutesInput').value= 1;
    document.getElementById('incrementInput').value=0;
  }
  else{
    if(bulletMenu.value==1){
      document.getElementById('minutesInput').value= 1;
      document.getElementById('incrementInput').value=2;
    }
    else{
      document.getElementById('minutesInput').value= 2;
      document.getElementById('incrementInput').value=1;
    }
  }
}
function updateTime(){
  incrementAfterMove.value =0;
  switch(gameTypeSelect.value){
    case 'Rapid':
      rapidMenuUpdate();
      break;
    case 'Blitz':
      blitzMenuUpdate();
      break;
    case 'Bullet':
      bulletMenuUpdate();
      break;
  }
}
gameTypeSelect.addEventListener('onchange' , updateTime);
startBtn.addEventListener('click', () => {
  if (clockIsGameOver()) return;
  clockStart();
  lastTick = null;
  animFrame = requestAnimationFrame(loop);
});

pauseBtn.addEventListener('click', () => {
  if(pauseStat ==1) {
    pauseStat=0;
    clockPause();
    if (animFrame) cancelAnimationFrame(animFrame);
    setPauseButtonIcon(pauseStat);
  }
  else{
    pauseStat=1;
    if (clockIsGameOver()) return;
    clockStart();
    lastTick = null;
    animFrame = requestAnimationFrame(loop);
    setPauseButtonIcon(pauseStat);
  }

});

resetBtn.addEventListener('click', () => {
  clockPause();
  if (animFrame) cancelAnimationFrame(animFrame);
  clockReset(Number(minutesInput.value), Number(incrementInput.value));
  render();
  if(pauseStat==1){
    pauseStat = !pauseStat;
    setPauseButtonIcon(pauseStat);
  }
  whiteBtn.classList.remove('flagged');
  blackBtn.classList.remove('flagged');
});
gameTypeSelect.addEventListener('change', function() {
  
  rapidMenu.style.display='none';
  bulletMenu.style.display='none';
  blitzMenu.style.display='none';
  
  if(gameTypeSelect.value == 'free'){
    document.getElementById('timeContText').style.display='none';
  }
  else{
    document.getElementById('timeContText').style.display='flex';
  }
  document.getElementById('timeTemplate'+gameTypeSelect.value).selectedIndex = 0;
  updateTime();
  document.getElementById('timeTemplate'+gameTypeSelect.value).style.display = 'flex';
  
});


rapidMenu.addEventListener('change', rapidMenuUpdate);
blitzMenu.addEventListener('change', blitzMenuUpdate);
bulletMenu.addEventListener('change', bulletMenuUpdate)




switchBtn.addEventListener('click', () => {
  setupshow();
  clockPause();
  if (animFrame) cancelAnimationFrame(animFrame);
  whiteBtn.classList.remove('flagged');
  blackBtn.classList.remove('flagged');
  if(pauseStat==1){
    pauseStat = !pauseStat;
    setPauseButtonIcon(pauseStat);
  }
});
applyBtn.addEventListener('click', () => {
  clockPause();
  if (animFrame) cancelAnimationFrame(animFrame);
  clockReset(Number(minutesInput.value), Number(incrementInput.value));
  render();
  setuphide();
});
whiteBtn.addEventListener('click', () => {
  if (clockIsRunning() && clockGetActivePlayer() === 0) clockSwitchTurn();
  moveCount = moveCount+1;
});

blackBtn.addEventListener('click', () => {
  if (clockIsRunning() && clockGetActivePlayer() === 1) clockSwitchTurn();
});
