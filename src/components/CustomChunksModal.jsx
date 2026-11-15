import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { chunksToText, parseChunks } from "../data/decks.js";

const EXAMPLE = `She WASN'T a... | politician, she was an actor. | singer, she was a dancer. | teacher, she was a doctor. | model, she was a chef.
They DIDN'T... | go to the party yesterday. | watch the game last night. | finish their homework. | call me on Sunday.
DID you... | study English last night? | see the new movie? | eat breakfast this morning? | travel last year?
The report WAS... | written by my brother. | sent yesterday. | approved by the boss. | finished on time.`;

export default function CustomChunksModal({ initial, onSave, onDelete, onClose }) {
  const [name, setName] = useState(initial?.name ?? "My Custom Chunks");
  const [text, setText] = useState(initial ? chunksToText(initial.chunks) : "");
  const { chunks, errors } = useMemo(() => parseChunks(text), [text]);

  return (
    <motion.div
      className="absolute inset-0 z-[60] flex items-center justify-center bg-slate-950/85"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="flex w-[90rem] flex-col gap-4 rounded-[2rem] border-[0.3rem] border-fuchsia-400 bg-slate-900 p-8 shadow-[0_0_4rem_rgba(232,121,249,0.5)]"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        role="dialog"
        aria-modal="true"
        aria-label="Custom chunks"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-arcade text-[2.6rem] text-fuchsia-300 text-glow-pink">Custom Chunks</h2>
          <button type="button" onClick={onClose} className="rounded-xl border-2 border-white/30 px-4 py-1 font-arcade text-[1.3rem] hover:bg-white/10" aria-label="Close">
            ✕
          </button>
        </div>
        <p className="text-[1.5rem] text-white/80">
          One chunk per line: <code className="rounded bg-black/50 px-2 text-amber-300">Locomotive stem... | slot 1 | slot 2 | slot 3 | slot 4</code>
          {" "}(2–4 slots). Columns pasted from Excel / Google Sheets also work. Write the key grammar word in CAPS to make it glow.
        </p>
        <label className="flex items-center gap-4 text-[1.5rem] font-bold">
          Deck name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            className="flex-1 rounded-xl border-2 border-white/30 bg-black/40 px-4 py-2 text-[1.6rem] outline-none focus:border-fuchsia-400"
          />
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          placeholder={EXAMPLE}
          className="h-[26rem] w-full resize-none rounded-xl border-2 border-white/30 bg-black/50 p-4 font-mono text-[1.4rem] leading-relaxed outline-none placeholder:text-white/25 focus:border-fuchsia-400"
        />
        <div className="flex items-center gap-4 text-[1.4rem]">
          <span className="font-bold text-green-300">{chunks.length} valid chunk{chunks.length === 1 ? "" : "s"}</span>
          {errors.length > 0 && <span className="font-bold text-red-300">Skipped line{errors.length === 1 ? "" : "s"}: {errors.join(", ")}</span>}
          <div className="ml-auto flex gap-3">
            <button type="button" onClick={() => setText(EXAMPLE)} className="rounded-xl border-2 border-white/30 px-4 py-2 font-arcade text-[1.2rem] hover:bg-white/10">
              Load Example
            </button>
            {initial && (
              <button type="button" onClick={onDelete} className="rounded-xl border-2 border-red-400 px-4 py-2 font-arcade text-[1.2rem] text-red-300 hover:bg-red-500/20">
                Delete Deck
              </button>
            )}
            <button
              type="button"
              disabled={chunks.length === 0}
              onClick={() => onSave(name.trim() || "My Custom Chunks", chunks)}
              className="rounded-xl border-2 border-white bg-gradient-to-b from-fuchsia-500 to-purple-700 px-6 py-2 font-arcade text-[1.3rem] disabled:opacity-40"
            >
              Save &amp; Play
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
