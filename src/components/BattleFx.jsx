import { AnimatePresence, motion } from "framer-motion";
import { PALETTES } from "./MonsterArt.jsx";

const FROM = ["19%", "81%"];
const TO = ["80%", "20%"];
const DEFLECT = ["72%", "28%"];

export const LAUNCH_DELAY = 0.22;
export const FLIGHT = 0.45;

function Fireball({ fx }) {
  const p = PALETTES[fx.attacker];
  const big = fx.type === "critical";
  const shield = fx.type === "shield";
  const size = big ? 11 : 6.5;
  const [core, mid, edge] = p.fire;
  const left = shield ? [FROM[fx.attacker], DEFLECT[fx.attacker], DEFLECT[fx.attacker]] : [FROM[fx.attacker], TO[fx.attacker]];
  const top = shield ? ["55%", "55%", "-10%"] : ["55%", "52%"];

  const dir = fx.attacker === 0 ? 1 : -1;
  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ width: `${size}rem`, height: `${size}rem` }}
      initial={{ left: FROM[fx.attacker], top: "55%", scale: 0.2, opacity: 0 }}
      animate={{ left, top, scale: big ? [0.2, 1.2, 1] : [0.2, 1, 1], opacity: shield ? [0, 1, 1, 0] : [0, 1, 1] }}
      transition={{ delay: LAUNCH_DELAY, duration: shield ? FLIGHT + 0.35 : FLIGHT, ease: "easeIn", times: shield ? [0, 0.6, 1] : undefined }}
    >
      <div
        className="absolute top-1/2 h-[70%] -translate-y-1/2 rounded-full blur-[0.3rem]"
        style={{
          width: `${size * 2.6}rem`,
          [dir === 1 ? "right" : "left"]: "40%",
          background: `linear-gradient(${dir === 1 ? "90deg" : "270deg"}, transparent, ${edge}99 50%, ${mid})`,
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 45% 45%, ${core} 0%, ${core} 18%, ${mid} 45%, ${edge} 70%, transparent 72%)`,
          boxShadow: `0 0 ${big ? 5 : 3}rem ${mid}, 0 0 ${big ? 9 : 5}rem ${edge}`,
        }}
        animate={{ scale: [1, 1.15, 0.95, 1.1, 1] }}
        transition={{ duration: 0.25, repeat: Infinity }}
      />
    </motion.div>
  );
}

function Impact({ fx }) {
  const p = PALETTES[fx.attacker];
  const big = fx.type === "critical";
  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ left: TO[fx.attacker], top: "52%", width: `${big ? 30 : 18}rem`, height: `${big ? 30 : 18}rem`, background: `radial-gradient(circle, #fff 0%, ${p.fire[1]} 30%, ${p.fire[2]}88 55%, transparent 70%)` }}
      initial={{ scale: 0.2, opacity: 1 }}
      animate={{ scale: [0.2, 1.3], opacity: [1, 0] }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  );
}

export default function BattleFx({ fx }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-clip">
      <AnimatePresence>
        {fx && fx.phase === "launch" && <Fireball key={`ball-${fx.id}`} fx={fx} />}
        {fx && fx.phase === "impact" && fx.type !== "shield" && <Impact key={`impact-${fx.id}`} fx={fx} />}
        {fx && fx.type === "critical" && (
          <motion.div
            key={`crit-${fx.id}`}
            className="absolute inset-x-0 top-[6%] flex justify-center"
            initial={{ scale: 3, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: -4 }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
          >
            <div className="rounded-2xl border-[0.35rem] border-amber-200 bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 px-10 py-3 font-arcade text-[4.2rem] leading-none text-white shadow-[0_0_4rem_rgba(251,146,60,0.9)]" style={{ textShadow: "0.3rem 0.3rem 0 #7f1d1d" }}>
              CRITICAL FLUENCY COMBO!
            </div>
          </motion.div>
        )}
        {fx && fx.type === "shield" && fx.phase === "impact" && (
          <motion.div
            key={`blocked-${fx.id}`}
            className="absolute inset-x-0 top-[8%] flex justify-center"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="rounded-2xl border-[0.35rem] border-cyan-100 bg-gradient-to-r from-sky-600 to-cyan-400 px-10 py-3 font-arcade text-[3.6rem] leading-none text-white shadow-[0_0_3rem_rgba(103,232,249,0.9)]">
              SHIELD! BLOCKED!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
