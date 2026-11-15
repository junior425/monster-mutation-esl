import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CUSTOM_DECK_ID, DECKS, deleteCustomDeck, loadCustomDeck, saveCustomDeck } from "./data/decks.js";
import { setMuted as setAudioMuted, sfx } from "./lib/audio.js";
import TeamPanel from "./components/TeamPanel.jsx";
import Fighter from "./components/Fighter.jsx";
import ChunkArena from "./components/ChunkArena.jsx";
import FluencyTimer from "./components/FluencyTimer.jsx";
import ControlBar from "./components/ControlBar.jsx";
import BattleFx, { FLIGHT, LAUNCH_DELAY } from "./components/BattleFx.jsx";
import VictoryOverlay from "./components/VictoryOverlay.jsx";
import CustomChunksModal from "./components/CustomChunksModal.jsx";

const MAX_HP = 100;
const DAMAGE = { normal: 20, critical: 35, shield: 0 };
const IMPACT_MS = (LAUNCH_DELAY + FLIGHT) * 1000;
const RESOLVE_MS = IMPACT_MS + 800;
const TEAM_GLOW = ["#22d3ee", "#f97316"];

function stored(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : JSON.parse(v);
  } catch {
    return fallback;
  }
}

function persist(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Shuffle-bag per deck so every chunk appears once before any repeats.
const bags = new Map();

function drawChunk(deck, current) {
  let bag = bags.get(deck.id);
  if (!bag || bag.length === 0) {
    bag = shuffle(deck.chunks.map((_, i) => i));
    if (bag.length > 1 && current && current.deckId === deck.id && bag[bag.length - 1] === current.idx) {
      [bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]];
    }
    bags.set(deck.id, bag);
  }
  const idx = bag.pop();
  const chunk = deck.chunks[idx];
  return { ...chunk, slots: shuffle(chunk.slots), idx, deckId: deck.id, key: `${deck.id}-${idx}-${Date.now()}` };
}

function getDecks(custom) {
  return custom ? [...DECKS, custom] : DECKS;
}

export default function App() {
  const [customDeck, setCustomDeck] = useState(loadCustomDeck);
  const decks = getDecks(customDeck);
  const [deckId, setDeckId] = useState(() => {
    const saved = stored("mm-deck", DECKS[0].id);
    return getDecks(customDeck).some((d) => d.id === saved) ? saved : DECKS[0].id;
  });
  const deck = decks.find((d) => d.id === deckId) ?? DECKS[0];

  const [names, setNames] = useState(() => stored("mm-names", ["Blue Dragons", "Red Titans"]));
  const [hp, setHp] = useState([MAX_HP, MAX_HP]);
  const [active, setActive] = useState(0);
  const [turn, setTurn] = useState(0);
  const [chunk, setChunk] = useState(() => drawChunk(deck));
  const [selected, setSelected] = useState(null);
  const [fx, setFx] = useState(null);
  const [winner, setWinner] = useState(null);
  const [muted, setMuted] = useState(() => stored("mm-muted", false));
  const [timerOn, setTimerOn] = useState(() => stored("mm-timer", false));
  const [modalOpen, setModalOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const timeouts = useRef([]);

  const busy = fx !== null;
  const locked = busy || winner !== null;

  useEffect(() => {
    setAudioMuted(muted);
    persist("mm-muted", muted);
  }, [muted]);
  useEffect(() => persist("mm-names", names), [names]);
  useEffect(() => persist("mm-timer", timerOn), [timerOn]);
  useEffect(() => persist("mm-deck", deckId), [deckId]);
  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => {
      document.removeEventListener("fullscreenchange", onFs);
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const later = (fn, ms) => timeouts.current.push(setTimeout(fn, ms));

  const chunkRef = useRef(chunk);
  const newChunk = (d = deck) => {
    const next = drawChunk(d, chunkRef.current);
    chunkRef.current = next;
    setChunk(next);
    setSelected(null);
  };

  const switchTurn = () => {
    setActive((a) => 1 - a);
    setTurn((t) => t + 1);
  };

  const nextChunk = () => {
    if (locked) return;
    sfx.whoosh();
    switchTurn();
    newChunk();
  };

  const attack = (type) => {
    if (locked) return;
    const attacker = active;
    const defender = 1 - attacker;
    const id = Date.now();
    const newHp = Math.max(0, hp[defender] - DAMAGE[type]);
    sfx.laser(type === "critical");
    setFx({ id, type, attacker, phase: "launch" });

    later(() => {
      setFx({ id, type, attacker, phase: "impact" });
      if (type === "shield") {
        sfx.shield();
      } else {
        sfx.hit(type === "critical");
        setHp((h) => h.map((v, i) => (i === defender ? newHp : v)));
      }
    }, IMPACT_MS);

    later(() => {
      setFx(null);
      if (newHp === 0) {
        setWinner(attacker);
        sfx.victory();
      } else {
        switchTurn();
        newChunk();
      }
    }, RESOLVE_MS);
  };

  const resetMatch = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    setFx(null);
    setWinner(null);
    setHp([MAX_HP, MAX_HP]);
    setActive(0);
    setTurn(0);
    newChunk();
  };

  const changeDeck = (id) => {
    const d = decks.find((x) => x.id === id);
    if (!d) return;
    setDeckId(id);
    newChunk(d);
  };

  const saveCustom = (name, chunks) => {
    saveCustomDeck(name, chunks);
    const d = { id: CUSTOM_DECK_ID, name, chunks };
    bags.delete(CUSTOM_DECK_ID);
    setCustomDeck(d);
    setDeckId(CUSTOM_DECK_ID);
    newChunk(d);
    setModalOpen(false);
  };

  const removeCustom = () => {
    deleteCustomDeck();
    bags.delete(CUSTOM_DECK_ID);
    setCustomDeck(null);
    if (deckId === CUSTOM_DECK_ID) {
      setDeckId(DECKS[0].id);
      newChunk(DECKS[0]);
    }
    setModalOpen(false);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  };

  const onAction = (id) => (id === "next" ? nextChunk() : attack(id));

  const keyHandler = useRef(null);
  keyHandler.current = (e) => {
    if (modalOpen || e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    const k = e.key.toLowerCase();
    const actions = {
      n: () => onAction("next"),
      1: () => onAction("normal"),
      2: () => onAction("critical"),
      3: () => onAction("shield"),
      t: () => setTimerOn((v) => !v),
      m: () => setMuted((v) => !v),
      r: () => winner !== null && resetMatch(),
      f: toggleFullscreen,
      a: () => !locked && setSelected(0),
      b: () => !locked && setSelected(1),
      c: () => !locked && chunk.slots.length > 2 && setSelected(2),
      d: () => !locked && chunk.slots.length > 3 && setSelected(3),
    };
    if (actions[k]) {
      e.preventDefault();
      actions[k]();
    }
  };
  useEffect(() => {
    const h = (e) => keyHandler.current(e);
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const fighterState = (i) => {
    if (winner !== null) return winner === i ? "victory" : "ko";
    if (!fx) return "idle";
    if (fx.phase === "launch" && fx.attacker === i) return "attack";
    if (fx.phase === "impact" && fx.attacker !== i) return fx.type === "shield" ? "shield" : "hit";
    return "idle";
  };

  const popupFor = (i) => {
    if (!fx || fx.phase !== "impact" || fx.attacker === i) return null;
    if (fx.type === "shield") return { id: fx.id, kind: "shield", text: "BLOCKED!" };
    return { id: fx.id, kind: fx.type, text: `-${DAMAGE[fx.type]}` };
  };

  const shake = fx?.phase === "impact" && fx.type === "critical";
  const round = Math.floor(turn / 2) + 1;

  return (
    <div className="arena-bg relative flex h-[67.5rem] w-[120rem] shrink-0 select-none flex-col overflow-clip">
      {/* Header */}
      <header className="z-20 flex h-[5rem] items-center gap-4 border-b-2 border-indigo-400/30 bg-slate-950/70 px-6">
        <h1 className="whitespace-nowrap font-arcade text-[1.9rem] leading-none">
          <span className="text-fuchsia-400 text-glow-pink">MONSTER MUTATION</span>
          <span className="ml-3 text-cyan-300 text-glow-cyan">CHUNK BATTLE</span>
        </h1>
        <div className="ml-auto flex items-center gap-3">
          <label htmlFor="deck" className="font-arcade text-[1.1rem] text-white/60">DECK</label>
          <select
            id="deck"
            value={deck.id}
            onChange={(e) => {
              changeDeck(e.target.value);
              e.target.blur();
            }}
            disabled={locked}
            className="w-[40rem] rounded-xl border-2 border-indigo-300/60 bg-indigo-950 px-4 py-2 text-[1.45rem] font-bold text-white outline-none focus:border-cyan-300"
          >
            {decks.map((d, i) => (
              <option key={d.id} value={d.id}>
                {d.id === CUSTOM_DECK_ID ? `★ ${d.name}` : `${i + 1}. ${d.name}`}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="rounded-xl border-2 border-fuchsia-300 bg-fuchsia-600/30 px-4 py-2 font-arcade text-[1.2rem] text-fuchsia-100 hover:bg-fuchsia-600/50"
          >
            + Custom Chunks
          </button>
          <a
            href="/manual-monster-mutation.pdf"
            target="_blank"
            rel="noreferrer"
            title="Manual de juego (PDF)"
            className="whitespace-nowrap rounded-xl border-2 border-amber-300/70 px-3 py-2 font-arcade text-[1.2rem] text-amber-200 hover:bg-amber-400/10"
          >
            MANUAL
          </a>
          <button
            type="button"
            onClick={toggleFullscreen}
            title="Fullscreen (F)"
            className="rounded-xl border-2 border-white/30 px-3 py-2 font-arcade text-[1.2rem] hover:bg-white/10"
          >
            {fullscreen ? "EXIT FULL" : "FULLSCREEN"}
          </button>
          <button
            type="button"
            onClick={() => setMuted((v) => !v)}
            title="Mute / unmute (M)"
            aria-label={muted ? "Unmute sound" : "Mute sound"}
            className={`flex h-[3.6rem] w-[3.6rem] items-center justify-center rounded-xl border-2 ${muted ? "border-red-400 bg-red-500/20" : "border-green-300 bg-green-500/20"}`}
          >
            <svg viewBox="0 0 24 24" className="h-[2.2rem] w-[2.2rem]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" />
              {muted ? <path d="m23 9-6 6M17 9l6 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />}
            </svg>
          </button>
        </div>
      </header>

      {/* HUD */}
      <section className="z-20 flex h-[9.5rem] items-center justify-between px-6">
        <TeamPanel team={0} name={names[0]} onNameChange={(v) => setNames([v, names[1]])} hp={hp[0]} active={active === 0 && winner === null} hit={fighterState(0) === "hit"} />
        <div className="flex flex-col items-center gap-2">
          <motion.div key={round} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="font-arcade text-[3rem] leading-none text-white" style={{ textShadow: "0 0 1rem #818cf8" }}>
            ROUND {round}
          </motion.div>
          <div
            className="rounded-full border-2 px-4 py-1 font-arcade text-[1.2rem] uppercase"
            style={{ borderColor: TEAM_GLOW[active], color: TEAM_GLOW[active], boxShadow: `0 0 1rem ${TEAM_GLOW[active]}` }}
          >
            {winner === null ? `▶ Turn: ${names[active] || `Team ${active + 1}`}` : "Match over"}
          </div>
          <button
            type="button"
            onClick={resetMatch}
            className="rounded-lg border-2 border-white/40 bg-white/5 px-4 py-1 font-arcade text-[1.05rem] text-white/80 hover:bg-white/15"
          >
            ↺ Reset Match
          </button>
        </div>
        <TeamPanel team={1} name={names[1]} onNameChange={(v) => setNames([names[0], v])} hp={hp[1]} active={active === 1 && winner === null} hit={fighterState(1) === "hit"} />
      </section>

      {/* Arena */}
      <motion.main
        className="relative flex flex-1 items-stretch overflow-clip"
        animate={shake ? { x: [0, -18, 16, -12, 10, -5, 0], y: [0, 8, -6, 4, 0] } : { x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="arena-floor pointer-events-none absolute inset-x-[-20%] bottom-[-30%] h-[60%]" />
        <Fighter team={0} state={fighterState(0)} active={active === 0 && winner === null} popup={popupFor(0)} />
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-3 px-2">
          <ChunkArena
            chunk={chunk}
            selected={selected}
            disabled={locked}
            onSelect={(i) => {
              if (i !== null) sfx.select();
              setSelected(i);
            }}
          />
          <FluencyTimer key={`${chunk.key}-${timerOn}`} enabled={timerOn} onToggle={() => setTimerOn((v) => !v)} paused={locked || modalOpen} />
        </div>
        <Fighter team={1} state={fighterState(1)} active={active === 1 && winner === null} popup={popupFor(1)} />
        <BattleFx fx={fx} />
      </motion.main>

      {/* Teacher control bar */}
      <footer className="z-20 h-[7.5rem]">
        <ControlBar onAction={onAction} disabled={locked} />
      </footer>

      <AnimatePresence>
        {winner !== null && <VictoryOverlay key="victory" winner={winner} name={names[winner] || `Team ${winner + 1}`} onRematch={resetMatch} />}
        {modalOpen && (
          <CustomChunksModal key="modal" initial={customDeck} onSave={saveCustom} onDelete={removeCustom} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
