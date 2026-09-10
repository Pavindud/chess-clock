# Chess Clock Project (Pure JavaScript)

Web browser එකේ run වෙන chess clock එකක්. C/WASM ඕන නෑ - ලොජික් එකම JavaScript එකෙන් ලියලා තියෙන්නේ, HTML/CSS UI එකකට connect කරලා.

## Files

| File | වැඩේ |
|---|---|
| `index.html` | Page එකේ structure එක (buttons, layout) |
| `style.css` | Styling (colors, layout, active/flagged states) |
| `clock.js` | Core clock logic - time track කරන, turn switch කරන, flag check කරන functions |
| `app.js` | UI glue code - buttons වලට event listeners දානවා, `clock.js` functions call කරලා screen එක update කරනවා |

## Run කරන විදිය

Server එකක් වත් ඕන නෑ - `index.html` file එකම double-click කරලා browser එකේ (Chrome/Edge/Firefox) open කරන්න. ඒක ඇති.

## Folder Structure

```
chess-clock-js/
├── index.html
├── style.css
├── clock.js
└── app.js
```

## Function Structure (`clock.js`)

Clock එකේ state එකම මේ object එකේ තියෙන්නේ:

```javascript
const clockState = {
  whiteTimeMs, blackTimeMs, incrementMs,
  activePlayer, isRunning, isGameOver
};
```

| Function | වැඩේ |
|---|---|
| `clockInit(minutes, incrementSec)` | Clock state එක initialize කරනවා |
| `clockTick(elapsedMs)` | Active player ගේ time එකෙන් `elapsedMs` අඩු කරනවා, 0ට ගියොත් game over කරනවා |
| `clockSwitchTurn()` | Active player මාරු කරලා, increment එකතු කරනවා |
| `clockStart()` | Clock එක running state එකට දානවා |
| `clockPause()` | Clock එක නවත්තනවා |
| `clockReset(minutes, incrementSec)` | Clock state එකම අලුතෙන් set කරනවා |
| `clockGetWhiteTime()` / `clockGetBlackTime()` | Time value (ms) return කරනවා |
| `clockGetActivePlayer()` | 0 = white, 1 = black |
| `clockIsRunning()` / `clockIsGameOver()` | Boolean state check |

## Flow එක (`app.js`)

1. Page load වෙනකොට `clockInit()` call වෙලා default time (10 min, 5 sec increment) set වෙනවා
2. **Start** click කළාම `clockStart()` call වෙලා `requestAnimationFrame` loop එකක් පටන් ගන්නවා
3. හැම frame එකකම `clockTick(elapsed)` call වෙලා active player ගේ time එකෙන් අඩු කරනවා, `render()` එකෙන් screen එක update කරනවා
4. Player කෙනෙක් තමන්ගේ clock button එක click කළාම `clockSwitchTurn()` call වෙලා turn එක මාරු වෙනවා
5. **Pause** click කළාම loop එක නවතිනවා (`cancelAnimationFrame`)
6. **Reset** click කළාම input fields වල values අනුව clock එකම අලුතෙන් set වෙනවා
7. කවුරු හරි time 0ට ගියොත් `isGameOver` true වෙනවා, ඒ player ගේ clock එකට red outline (`flagged` class) එකක් දාලා winner කවුද කියලා message එකක් පෙන්නනවා

## Customize කරන විදිය

- **Time control** - "Minutes per side" සහ "Increment" input fields වලින් set කරලා "Apply" click කරන්න
- **Colors/Styling** - `style.css` එකේ `.white`, `.black`, `.active`, `.flagged` classes edit කරන්න
- **Icons** - Button එකක SVG `path` element එකේ `d` attribute එක JS එකෙන් `setAttribute()` කරලා icon change කරන්න පුළුවන් (e.g. pause ↔ play toggle)

## දැනට තියෙන Limitations

- Move validation කිසිවක් නෑ - මේක clock එකක් විතරයි, chess game logic නෑ
- Time control presets (Bullet/Blitz/Rapid වගේ) manually type කරන්නම ඕන, dropdown එකක් නෑ
- Sound/vibration alerts නෑ (flag වුනාම, low time දී)

## ඉදිරියේදී එකතු කරන්න පුළුවන් දේවල්

- Time control presets (dropdown)
- Low-time warning (color change/sound)
- Move counter
- Undo button
- LocalStorage එකෙන් last-used settings save කරගන්න එක
