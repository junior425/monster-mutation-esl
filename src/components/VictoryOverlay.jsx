import { useMemo } from "react";
import { motion } from "framer-motion";
import { PALETTES } from "./MonsterArt.jsx";

const COLORS = ["#22d3ee", "#f472b6", "#a3e635", "#fbbf24", "#f97316", "#a78bfa", "#ffffff"];

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 140 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 0.6 + Math.random() * 0.9,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 1.5,
        duration: 2.5 + Math.random() * 2.5,
        drift: (Math.random() - 0.5) * 20,
        spin: (Math.random() - 0.5) * 1080,
        round: Math.random() > 0.6,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-clip">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 block"
          style={{ left: `${p.left}%`, width: `${p.size}rem`, height: `${p.size * (p.round ? 1 : 0.45)}rem`, background: p.color, borderRadius: p.round ? "9999px" : "2px" }}
          initial={{ y: "-5rem", x: 0, rotate: 0 }}
          animate={{ y: "72rem", x: `${p.drift}rem`, rotate: p.spin }}
          transition={{ delay: p.delay, duration: p.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

export default function VictoryOverlay({ winner, name, onRematch }) {
  const p = PALETTES[winner];
  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/85"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Confetti />
      <motion.h2
        className="font-arcade text-[16rem] leading-none text-red-500"
        style={{ textShadow: "0 0 2rem #ef4444, 0.6rem 0.6rem 0 #000" }}
        initial={{ scale: 4, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: -4 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
      >
        K.O.!
      </motion.h2>
      <motion.p
        className="mt-4 font-arcade text-[7rem] leading-none text-amber-300 text-glow-amber"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1, scale: [1, 1.06, 1] }}
        transition={{ delay: 0.6, scale: { delay: 1.2, duration: 1.2, repeat: Infinity } }}
      >
        VICTORY!
      </motion.p>
      <motion.p
        className="mt-6 font-arcade text-[4rem] uppercase"
        style={{ color: p.glow, textShadow: `0 0 1.5rem ${p.glow}` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {name} wins!
      </motion.p>
      <motion.button
        type="button"
        onClick={onRematch}
        className="relative mt-10 rounded-2xl border-[0.3rem] border-white bg-gradient-to-b from-pink-500 to-purple-700 px-10 py-4 font-arcade text-[2.2rem] shadow-[0_0.6rem_0_rgba(0,0,0,0.6)]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4 }}
        whileHover={{ scale: 1.05 }}
      >
        REMATCH (R)
      </motion.button>
    </motion.div>
  );
}
