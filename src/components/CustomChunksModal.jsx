import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BACKUP_FILE, DEFAULT_DECK_NAME, chunksToText, exportBackup, mergeBackup, newDeckId, parseChunks } from "../data/decks.js";

const EXAMPLE = `She WASN'T a... | politician, she was an actor. | singer, she was a dancer. | teacher, she was a doctor. | model, she was a chef.
They DIDN'T... | go to the party yesterday. | watch the game last night. | finish their homework. | call me on Sunday.
DID you... | study English last night? | see the new movie? | eat breakfast this morning? | travel last year?
The report WAS... | written by my brother. | sent yesterday. | approved by the boss. | finished on time.`;

const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
const btn = "rounded-xl border-2 px-4 py-2 font-arcade text-[1.2rem] disabled:opacity-40";

export default function CustomChunksModal({ decks, currentId, onSave, onDelete, onReplaceAll, onClose }) {
  const start = decks.find((d) => d.id === currentId) ?? null;
  const [editingId, setEditingId] = useState(start?.id ?? null);
  const [name, setName] = useState(start?.name ?? DEFAULT_DECK_NAME);
  const [text, setText] = useState(start ? chunksToText(start.chunks) : "");
  const [confirmId, setConfirmId] = useState(null);
  const [status, setStatus] = useState(null);
  const fileRef = useRef(null);
  const { chunks, errors } = useMemo(() => parseChunks(text), [text]);

  const editing = decks.find((d) => d.id === editingId) ?? null;
  const dirty = editing
    ? name !== editing.name || text !== chunksToText(editing.chunks)
    : text.trim() !== "" || name !== DEFAULT_DECK_NAME;

  const openDeck = (deck) => {
    if (deck?.id === editingId) return;
    if (dirty && !window.confirm("Discard your unsaved changes?")) return;
    setEditingId(deck?.id ?? null);
    setName(deck?.name ?? DEFAULT_DECK_NAME);
    setText(deck ? chunksToText(deck.chunks) : "");
    setConfirmId(null);
  };

  const deleteDeck = (deck) => {
    onDelete(deck.id);
    setConfirmId(null);
    setStatus({ ok: true, text: `Deleted "${deck.name}".` });
    if (deck.id === editingId) {
      setEditingId(null);
      setName(DEFAULT_DECK_NAME);
      setText("");
    }
  };

  const exportAll = () => {
    const url = URL.createObjectURL(new Blob([exportBackup(decks)], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = BACKUP_FILE;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus({ ok: true, text: `Exported ${plural(decks.length, "deck")} to ${BACKUP_FILE}.` });
  };

  const importFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const res = mergeBackup(decks, await file.text());
      onReplaceAll(res.decks);
      const parts = [`Imported ${plural(res.added, "deck")}`];
      if (res.renamed) parts.push(`${res.renamed} renamed to avoid overwriting`);
      if (res.skipped) parts.push(`${res.skipped} already saved (skipped)`);
      setStatus({ ok: true, text: `${parts.join(" · ")}.` });
    } catch (err) {
      setStatus({ ok: false, text: `Import failed: ${err.message}` });
    }
  };

  const save = () => onSave({ id: editingId ?? newDeckId(), name: name.trim() || DEFAULT_DECK_NAME, chunks });

  return (
    <motion.div
      className="absolute inset-0 z-[60] flex items-center justify-center bg-slate-950/85"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="flex w-[108rem] flex-col gap-4 rounded-[2rem] border-[0.3rem] border-fuchsia-400 bg-slate-900 p-7 shadow-[0_0_4rem_rgba(232,121,249,0.5)]"
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

        <div className="flex gap-6">
          {/* Saved decks */}
          <aside className="flex w-[34rem] shrink-0 flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-arcade text-[1.4rem] text-cyan-300">Saved Decks ({decks.length})</h3>
              <button type="button" onClick={() => openDeck(null)} className={`${btn} border-cyan-300 text-cyan-200 hover:bg-cyan-400/10`}>
                + New Deck
              </button>
            </div>
            <ul className="h-[24.5rem] overflow-y-auto rounded-xl border-2 border-white/20 bg-black/40 p-2" aria-label="Saved decks">
              {decks.length === 0 && (
                <li className="p-3 text-[1.35rem] text-white/50">No saved decks yet. Write one on the right or import a .json backup.</li>
              )}
              {decks.map((d) => (
                <li
                  key={d.id}
                  className={`mb-1 flex items-center gap-2 rounded-lg px-2 py-1 ${d.id === editingId ? "bg-fuchsia-600/40 ring-2 ring-fuchsia-300" : "hover:bg-white/10"}`}
                >
                  {confirmId === d.id ? (
                    <>
                      <span className="flex-1 truncate text-[1.35rem] font-bold text-red-200">Delete &ldquo;{d.name}&rdquo;?</span>
                      <button type="button" onClick={() => deleteDeck(d)} className="rounded-lg bg-red-600 px-3 py-1 text-[1.2rem] font-bold hover:bg-red-500">
                        Delete
                      </button>
                      <button type="button" onClick={() => setConfirmId(null)} className="rounded-lg border border-white/40 px-3 py-1 text-[1.2rem] font-bold hover:bg-white/10">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => openDeck(d)} className="flex min-w-0 flex-1 flex-col items-start py-1 text-left" title="Edit this deck">
                        <span className="w-full truncate text-[1.45rem] font-bold">{d.name}</span>
                        <span className="text-[1.1rem] text-white/50">{plural(d.chunks.length, "chunk")}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmId(d.id)}
                        className="rounded-lg border border-red-400/60 px-2 py-1 text-[1.3rem] text-red-300 hover:bg-red-500/20"
                        aria-label={`Delete ${d.name}`}
                        title="Delete deck"
                      >
                        <svg viewBox="0 0 24 24" className="h-[1.6rem] w-[1.6rem]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                          <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />
                        </svg>
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2">
              <button type="button" onClick={exportAll} disabled={decks.length === 0} className={`${btn} whitespace-nowrap border-emerald-300 text-emerald-200 hover:bg-emerald-400/10`}>
                Export All Decks (.json)
              </button>
              <button type="button" onClick={() => fileRef.current?.click()} className={`${btn} whitespace-nowrap border-amber-300 text-amber-200 hover:bg-amber-400/10`}>
                Import Decks (.json)
              </button>
              <input ref={fileRef} type="file" accept=".json,application/json" onChange={importFile} className="hidden" aria-label="Import decks file" />
            </div>
          </aside>

          {/* Editor */}
          <section className="flex min-w-0 flex-1 flex-col gap-3">
            <p className="text-[1.35rem] leading-snug text-white/80">
              One chunk per line: <code className="rounded bg-black/50 px-2 text-amber-300">Locomotive stem... | slot 1 | slot 2 | slot 3 | slot 4</code>
              {" "}(2–4 slots). Columns pasted from Excel / Google Sheets also work. Write the key grammar word in CAPS to make it glow.
            </p>
            <label className="flex items-center gap-4 text-[1.5rem] font-bold">
              {editing ? "Editing" : "New deck"}
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                placeholder="e.g. Basic 1 - Unit 7A"
                className="flex-1 rounded-xl border-2 border-white/30 bg-black/40 px-4 py-2 text-[1.6rem] outline-none focus:border-fuchsia-400"
              />
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
              placeholder={EXAMPLE}
              className="h-[24rem] w-full resize-none rounded-xl border-2 border-white/30 bg-black/50 p-4 font-mono text-[1.35rem] leading-relaxed outline-none placeholder:text-white/25 focus:border-fuchsia-400"
            />
            <div className="flex items-center gap-4 text-[1.4rem]">
              <span className="font-bold text-green-300">{plural(chunks.length, "valid chunk")}</span>
              {errors.length > 0 && <span className="font-bold text-red-300">Skipped line{errors.length === 1 ? "" : "s"}: {errors.join(", ")}</span>}
              <div className="ml-auto flex gap-3">
                <button type="button" onClick={() => setText(EXAMPLE)} className={`${btn} border-white/30 hover:bg-white/10`}>
                  Load Example
                </button>
                <button
                  type="button"
                  disabled={chunks.length === 0}
                  onClick={save}
                  className="rounded-xl border-2 border-white bg-gradient-to-b from-fuchsia-500 to-purple-700 px-6 py-2 font-arcade text-[1.3rem] disabled:opacity-40"
                >
                  {editing ? "Save Changes & Play" : "Save & Play"}
                </button>
              </div>
            </div>
          </section>
        </div>

        <p role="status" className={`min-h-[2rem] text-[1.35rem] font-bold ${status?.ok === false ? "text-red-300" : "text-emerald-300"}`}>
          {status?.text}
        </p>
      </motion.div>
    </motion.div>
  );
}
