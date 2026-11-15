const BUTTONS = [
  { id: "next", label: "Next Chunk / Randomize", hint: "N", cls: "from-indigo-500 to-violet-700 border-indigo-200" },
  { id: "normal", label: "Normal Hit (-20 HP)", hint: "1", cls: "from-emerald-500 to-green-700 border-emerald-200" },
  { id: "critical", label: "Critical Fluency Combo! (-35 HP)", hint: "2", cls: "from-amber-400 via-orange-500 to-red-600 border-amber-100 animate-[pulse_2s_ease-in-out_infinite]" },
  { id: "shield", label: "Shield / Blocked! (0 HP)", hint: "3", cls: "from-sky-500 to-slate-700 border-sky-200" },
];

export default function ControlBar({ onAction, disabled }) {
  return (
    <div className="flex h-full items-center gap-4 border-t-[0.3rem] border-indigo-400/50 bg-slate-950/95 px-6">
      <span className="font-arcade text-[1.1rem] leading-tight text-white/50">
        TEACHER
        <br />
        CONTROLS
      </span>
      {BUTTONS.map((b) => (
        <button
          key={b.id}
          type="button"
          disabled={disabled}
          onClick={() => onAction(b.id)}
          className={`flex h-[5rem] flex-1 items-center justify-center gap-3 rounded-2xl border-[0.25rem] bg-gradient-to-b px-4 font-arcade text-[1.45rem] leading-tight text-white shadow-[0_0.5rem_0_rgba(0,0,0,0.5)] transition active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:animate-none ${b.cls}`}
        >
          <span>{b.label}</span>
          <kbd className="rounded-md bg-black/40 px-2 py-0.5 font-sans text-[1.1rem] font-black">{b.hint}</kbd>
        </button>
      ))}
    </div>
  );
}
