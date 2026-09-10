let lastTick = null;
let animFrame = null;
let pauseStat = 0;

const whiteBtn = document.getElementById('whiteClock');
const blackBtn = document.getElementById('blackClock');
const startBtn = document.getElementById('pauseBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const switchBtn = document.getElementById('re-load');
const applyBtn = document.getElementById('applyBtn');
const minutesInput = document.getElementById('minutesInput');
const incrementInput = document.getElementById('incrementInput');
const statusMsg = document.getElementById('statusMsg');
const pauseIcon = pauseBtn.querySelector('path');

const PAUSE_PATH = "M6 19h4V5H6v14zm8-14v14h4V5h-4z";
const PLAY_PATH = "M8 5v14l11-7z";


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
});

blackBtn.addEventListener('click', () => {
  if (clockIsRunning() && clockGetActivePlayer() === 1) clockSwitchTurn();
});
