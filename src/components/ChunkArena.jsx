import { AnimatePresence, motion } from "framer-motion";

const BUBBLES = [
  "from-cyan-400 to-blue-600 shadow-cyan-500/50 ring-cyan-200",
  "from-fuchsia-400 to-purple-600 shadow-fuchsia-500/50 ring-fuchsia-200",
  "from-lime-300 to-emerald-600 shadow-lime-500/50 ring-lime-200",
  "from-amber-300 to-orange-600 shadow-amber-500/50 ring-amber-200",
];

const ELLIPSIS = /(\.\.\.|…)\s*$/;

export function joinChunk(stem, slot) {
  return `${stem.replace(ELLIPSIS, "").trim()} ${slot}`;
}

function Stem({ text }) {
  const clean = text.replace(ELLIPSIS, "").trim();
  return (
    <>
      {clean.split(/(\s+)/).map((tok, i) =>
        /^[A-Z][A-Z'’]+[.,?!]*$/.test(tok) ? (
          <span key={i} className="text-amber-300 text-glow-amber">{tok}</span>
        ) : (
          <span key={i}>{tok}</span>
        ),
      )}
      <motion.span className="text-cyan-300" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
        …
      </motion.span>
    </>
  );
}

function Locomotive() {
  return (
    <svg viewBox="0 0 64 48" className="h-[5.5rem] w-[7rem] shrink-0" aria-hidden="true">
      <rect x="4" y="16" width="38" height="20" rx="4" fill="#f59e0b" />
      <rect x="30" y="6" width="16" height="30" rx="3" fill="#ef4444" />
      <rect x="33" y="10" width="10" height="9" rx="2" fill="#bae6fd" />
      <rect x="10" y="6" width="8" height="12" fill="#475569" />
      <rect x="8" y="3" width="12" height="4" rx="2" fill="#334155" />
      <path d="M46 30 L60 36 L46 36 Z" fill="#94a3b8" />
      <circle cx="14" cy="38" r="6" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
      <circle cx="36" cy="38" r="6" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
      <circle cx="58" cy="22" r="3" fill="#fef08a" />
    </svg>
  );
}

export default function ChunkArena({ chunk, selected, onSelect, disabled }) {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={chunk.key}
          initial={{ x: 400, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          className="relative flex w-full items-center gap-5 rounded-[2rem] border-[0.3rem] border-indigo-300/70 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 px-8 py-6 shadow-[0_0_3rem_rgba(129,140,248,0.55),inset_0_0_2rem_rgba(129,140,248,0.25)]"
        >
          <span className="absolute -top-4 left-8 rounded-full bg-indigo-500 px-4 py-0.5 font-arcade text-[1.1rem] tracking-widest text-white shadow-lg">
            THE LOCOMOTIVE
          </span>
          <Locomotive />
          <p className="font-arcade text-[4rem] leading-[1.1] text-white">
            <Stem text={chunk.stem} />
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="grid w-full grid-cols-2 gap-4">
        {chunk.slots.map((slot, i) => {
          const isSel = selected === i;
          return (
            <motion.button
              key={`${chunk.key}-${i}`}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(isSel ? null : i)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: isSel ? 1.04 : 1, opacity: selected === null || isSel ? 1 : 0.55, y: isSel ? 0 : [0, -6, 0] }}
              transition={{ scale: { type: "spring", stiffness: 260, damping: 16, delay: 0.15 + i * 0.07 }, opacity: { duration: 0.2 }, y: { duration: 2.4 + i * 0.3, repeat: Infinity, ease: "easeInOut" } }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`relative min-h-[7rem] rounded-[1.6rem] bg-gradient-to-br px-6 py-3 text-left text-[2.2rem] font-black leading-tight text-white shadow-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] ${BUBBLES[i]} ${isSel ? "ring-[0.4rem]" : ""}`}
            >
              <span className="mr-3 inline-flex h-[2.8rem] w-[2.8rem] items-center justify-center rounded-full bg-black/30 align-middle font-arcade text-[1.5rem]">
                {String.fromCharCode(65 + i)}
              </span>
              {slot}
            </motion.button>
          );
        })}
      </div>

      <div className="flex h-[4.5rem] w-full items-center justify-center">
        <AnimatePresence mode="wait">
          {selected !== null && chunk.slots[selected] && (
            <motion.div
              key={`${chunk.key}-${selected}`}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-4 rounded-2xl border-2 border-white/25 bg-black/40 px-6 py-2"
            >
              <span className="rounded-lg bg-pink-500 px-3 py-1 font-arcade text-[1.2rem]">SAY IT!</span>
              <span className="text-[2.2rem] font-extrabold">{joinChunk(chunk.stem, chunk.slots[selected])}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
