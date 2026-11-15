# Monster Mutation: Chunk Battle

Arcade-style classroom speaking & grammar game for ESL students. Two teams battle with monsters: the active team picks a **Slot Bubble** to complete the **Locomotive** (fixed chunk stem) and says the full sentence out loud. The teacher judges and fires the attack from the control bar.

Built with React + Vite + Tailwind CSS + Framer Motion. All sound effects are synthesized with the Web Audio API (no audio files).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/ (Vercel: framework preset "Vite")
npm run lint
```

## Teacher controls

| Button | Key | Effect |
| --- | --- | --- |
| Next Chunk / Randomize | `N` | New Locomotive + Slot Bubbles, switches turn |
| Normal Hit (-20 HP) | `1` | Active team attacks, new chunk, switches turn |
| Critical Fluency Combo! (-35 HP) | `2` | Special attack for super-fluent speaking |
| Shield / Blocked! (0 HP) | `3` | Attack is blocked, new chunk, switches turn |
| Select slot | `A`–`D` | Highlights a bubble and shows the full sentence |
| 15s fluency timer | `T` | Toggles the countdown (restarts on every chunk) |
| Mute / Fullscreen / Rematch | `M` / `F` / `R` | |

## Decks

Four built-in decks live in `src/data/decks.js`. Use **+ Custom Chunks** to paste your own (one per line: `Stem... | slot 1 | slot 2 | slot 3 | slot 4`); it is saved to `localStorage` and appears as ★ in the deck selector.

The UI is a fixed 16:9 stage sized in `rem`; the root font size scales with the viewport so it fits any laptop, projector or TV.
