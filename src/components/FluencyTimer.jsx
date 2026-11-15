import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { sfx } from "../lib/audio.js";

export const TIMER_SECONDS = 15;
const STEP = 100;

export default function FluencyTimer({ enabled, onToggle, paused }) {
  const [left, setLeft] = useState(TIMER_SECONDS * 1000);
  const [runId, setRunId] = useState(0);
  const lastSecond = useRef(TIMER_SECONDS);
  const done = left <= 0;

  useEffect(() => {
    if (!enabled || paused || done) return undefined;
    const id = setInterval(() => setLeft((l) => Math.max(0, l - STEP)), STEP);
    return () => clearInterval(id);
  }, [enabled, paused, done, runId]);

  useEffect(() => {
    if (!enabled) return;
    const sec = Math.ceil(left / 1000);
    if (sec === lastSecond.current) return;
    lastSecond.current = sec;
    if (sec === 0) sfx.buzzer();
    else if (sec < TIMER_SECONDS) sfx.tick(sec <= 5);
  }, [left, enabled]);

  const restart = () => {
    lastSecond.current = TIMER_SECONDS;
    setLeft(TIMER_SECONDS * 1000);
    setRunId((r) => r + 1);
  };

  const pct = left / (TIMER_SECONDS * 1000);
  const color = pct > 0.6 ? "bg-green-400" : pct > 0.3 ? "bg-yellow-300" : "bg-red-500";
  const glow = pct > 0.6 ? "#4ade80" : pct > 0.3 ? "#fde047" : "#ef4444";

  return (
    <div className="flex h-[4.2rem] w-full items-center gap-4">
      <button
        type="button"
        onClick={onToggle}
        title="Toggle 15-second fluency timer (T)"
        className={`shrink-0 rounded-xl border-2 px-4 py-2 font-arcade text-[1.2rem] transition ${enabled ? "border-green-300 bg-green-500/20 text-green-200" : "border-white/30 bg-white/5 text-white/70 hover:bg-white/10"}`}
      >
        15s TIMER: {enabled ? "ON" : "OFF"}
      </button>
      {enabled && (
        <>
          <div className="relative h-[2.2rem] flex-1 overflow-hidden rounded-full border-2 border-white/40 bg-slate-950">
            <div
              className={`h-full ${color} transition-[width,background-color] duration-100 ease-linear`}
              style={{ width: `${pct * 100}%`, boxShadow: `0 0 1.2rem ${glow}` }}
            />
          </div>
          <motion.span
            key={done ? "done" : Math.ceil(left / 1000)}
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            className={`w-[7rem] text-center font-arcade text-[2.4rem] ${done ? "text-red-400 text-glow-pink" : "text-white"}`}
          >
            {done ? "TIME!" : `${Math.ceil(left / 1000)}s`}
          </motion.span>
          <button
            type="button"
            onClick={restart}
            title="Restart timer"
            className="shrink-0 rounded-xl border-2 border-white/30 bg-white/5 px-3 py-2 font-arcade text-[1.1rem] hover:bg-white/10"
          >
            RESTART
          </button>
        </>
      )}
    </div>
  );
}
