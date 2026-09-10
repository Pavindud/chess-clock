# Chess Clock

A simple chess clock that runs right in your browser. No installs, no build tools — just plain JavaScript, HTML, and CSS.

## Files

- `index.html` — the page layout
- `style.css` — colors and styling
- `clock.js` — the actual clock logic (timing, turns, game over)
- `app.js` — connects the buttons to the clock logic and updates the screen

## How to run it

Just open `index.html` in your browser. That's it — no server needed.

## How it works

- Set your minutes and increment, hit **Apply**
- Click **Start** to begin
- Tap a player's clock after their move to pass the turn
- **Pause** stops the clock, **Reset** starts fresh
- If someone runs out of time, their clock turns red and a message shows who won

## Main functions (clock.js)

- `clockInit()` / `clockReset()` — set up the clock
- `clockTick()` — counts down the active player's time
- `clockSwitchTurn()` — passes the turn and adds increment
- `clockStart()` / `clockPause()` — start/stop
- `clockGetWhiteTime()` / `clockGetBlackTime()` — read the current times
- `clockIsGameOver()` — checks if someone flagged

## What it doesn't do (yet)

- No move validation — it's just a clock, not a chess engine
- No sound alerts
- No saved settings between sessions

Feel free to build on it — a preset time-control dropdown or a low-time sound warning would be nice next steps.
