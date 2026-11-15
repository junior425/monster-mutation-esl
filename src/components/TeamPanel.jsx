import { motion } from "framer-motion";
import MonsterArt, { PALETTES } from "./MonsterArt.jsx";

const BAR = [
  "bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-300",
  "bg-gradient-to-l from-red-700 via-orange-500 to-amber-300",
];

export default function TeamPanel({ team, name, onNameChange, hp, active, hit }) {
  const right = team === 1;
  const p = PALETTES[team];
  const low = hp <= 30;

  return (
    <div className={`flex w-[44rem] items-center gap-4 ${right ? "flex-row-reverse" : ""}`}>
      <motion.div
        className="relative h-[6.5rem] w-[6.5rem] shrink-0 overflow-hidden rounded-2xl border-[0.3rem] bg-slate-950"
        style={{ borderColor: p.glow, boxShadow: active ? `0 0 1.8rem ${p.glow}` : "none" }}
        animate={hit ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="h-full w-full"
          animate={{ y: [2, -3, 2] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-full w-full" style={{ transform: right ? "scaleX(-1)" : undefined }}>
            <MonsterArt team={team} className="h-[150%] w-[150%] -translate-y-[8%] translate-x-[-12%]" />
          </div>
        </motion.div>
        {hit && <div className="absolute inset-0 animate-pulse bg-red-500/50" />}
      </motion.div>

      <div className={`flex flex-1 flex-col gap-2 ${right ? "items-end" : "items-start"}`}>
        <input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          maxLength={20}
          spellCheck={false}
          aria-label={`Team ${team + 1} name`}
          className={`w-full rounded-lg border-2 border-transparent bg-transparent px-2 font-arcade text-[2.1rem] uppercase leading-tight outline-none transition hover:border-white/20 focus:border-white/50 focus:bg-white/5 ${right ? "text-right text-orange-300 text-glow-amber" : "text-cyan-300 text-glow-cyan"}`}
        />
        <div className="relative h-[2.6rem] w-full -skew-x-12 overflow-hidden rounded-md border-[0.25rem] border-white/80 bg-slate-950 shadow-[0_0_1.2rem_rgba(0,0,0,0.6)]">
          <motion.div
            className={`absolute inset-y-0 bg-yellow-200 ${right ? "right-0" : "left-0"}`}
            animate={{ width: `${hp}%` }}
            transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
          />
          <motion.div
            className={`absolute inset-y-0 ${BAR[team]} ${right ? "right-0" : "left-0"} ${low ? "animate-pulse" : ""}`}
            animate={{ width: `${hp}%` }}
            transition={{ duration: 0.25 }}
          >
            <div className="hp-stripes h-full w-full" />
          </motion.div>
          <div className={`absolute inset-0 flex items-center px-4 font-arcade text-[1.3rem] text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] ${right ? "justify-start" : "justify-end"}`}>
            {hp} / 100 HP
          </div>
        </div>
      </div>
    </div>
  );
}
