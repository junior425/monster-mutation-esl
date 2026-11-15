import { AnimatePresence, motion } from "framer-motion";
import MonsterArt, { PALETTES } from "./MonsterArt.jsx";

const NORMAL_FILTER = "sepia(0) saturate(1) hue-rotate(0deg) brightness(1)";
const RED_FILTER = "sepia(1) saturate(7) hue-rotate(-45deg) brightness(1.15)";

export default function Fighter({ team, state, active, popup }) {
  const dir = team === 0 ? 1 : -1;
  const p = PALETTES[team];

  const variants = {
    idle: { x: 0, y: [0, -12, 0], rotate: 0, opacity: 1, transition: { y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" }, default: { duration: 0.3 } } },
    attack: { x: [0, -20 * dir, 90 * dir, 0], y: 0, rotate: [0, -6 * dir, 8 * dir, 0], transition: { duration: 0.6, times: [0, 0.3, 0.5, 1] } },
    hit: { x: [0, -22 * dir, 18 * dir, -16 * dir, 12 * dir, -6 * dir, 0], y: 0, rotate: [0, -8 * dir, 4 * dir, 0], transition: { duration: 0.55 } },
    shield: { x: [0, -10 * dir, 0], y: 0, rotate: 0, transition: { duration: 0.4 } },
    ko: { x: -40 * dir, y: 70, rotate: -85 * dir, opacity: 0.55, transition: { duration: 0.7, ease: "easeIn" } },
    victory: { x: 0, y: [0, -50, 0], rotate: [0, 6 * dir, 0], opacity: 1, transition: { duration: 0.7, repeat: Infinity } },
  };

  return (
    <div className="relative flex h-full w-[26rem] shrink-0 flex-col items-center justify-end pb-10">
      <AnimatePresence>
        {active && state !== "ko" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-6 z-20 rounded-full border-2 px-5 py-1.5 font-arcade text-[1.4rem] tracking-wider"
            style={{ borderColor: p.glow, color: p.glow, boxShadow: `0 0 1.5rem ${p.glow}`, background: "rgba(2,6,23,0.75)" }}
          >
            YOUR TURN!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-[24rem] w-[24rem]">
        {active && state !== "ko" && (
          <motion.div
            className="absolute inset-[-2rem] rounded-full"
            style={{ background: `radial-gradient(circle, ${p.glow}88 0%, ${p.glow}33 40%, transparent 70%)` }}
            animate={{ scale: [0.9, 1.08, 0.9], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        )}
        <motion.div className="relative h-full w-full" variants={variants} animate={state} initial="idle">
          <motion.div
            className="h-full w-full"
            animate={{ filter: state === "hit" ? [NORMAL_FILTER, RED_FILTER, NORMAL_FILTER, RED_FILTER, NORMAL_FILTER] : NORMAL_FILTER }}
            transition={{ duration: 0.55 }}
            style={{ filter: NORMAL_FILTER }}
          >
            <div className="h-full w-full" style={{ transform: team === 1 ? "scaleX(-1)" : undefined }}>
              <MonsterArt team={team} className="h-full w-full drop-shadow-[0_0_1.2rem_rgba(0,0,0,0.6)]" />
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {state === "shield" && (
            <motion.div
              key="shield"
              className="absolute inset-[-1.5rem] rounded-full border-[0.5rem]"
              style={{ borderColor: "#a5f3fc", background: "radial-gradient(circle, rgba(165,243,252,0.05) 40%, rgba(165,243,252,0.45) 100%)", boxShadow: "0 0 3rem #67e8f9, inset 0 0 3rem #67e8f9" }}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: [0.3, 1.1, 1], opacity: 1 }}
              exit={{ scale: 1.3, opacity: 0 }}
              transition={{ duration: 0.35 }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {popup && (
            <motion.div
              key={popup.id}
              className={`pointer-events-none absolute left-1/2 top-6 z-30 -translate-x-1/2 whitespace-nowrap font-arcade ${popup.kind === "shield" ? "text-[3.2rem] text-cyan-200 text-glow-cyan" : popup.kind === "critical" ? "text-[5.5rem] text-amber-300 text-glow-amber" : "text-[4.5rem] text-red-400 text-glow-pink"}`}
              initial={{ y: 40, scale: 0.4, opacity: 0 }}
              animate={{ y: -40, scale: 1, opacity: 1 }}
              exit={{ y: -90, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
            >
              {popup.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
