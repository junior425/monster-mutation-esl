export const PALETTES = [
  { body: "#2563eb", dark: "#1e3a8a", belly: "#7dd3fc", accent: "#22d3ee", horn: "#e0f2fe", glow: "#22d3ee", fire: ["#ecfeff", "#67e8f9", "#0891b2"] },
  { body: "#ea580c", dark: "#7f1d1d", belly: "#fdba74", accent: "#facc15", horn: "#fef3c7", glow: "#f97316", fire: ["#fffbeb", "#fb923c", "#dc2626"] },
];

function Dragon({ p }) {
  return (
    <g>
      <path d="M62 150 C30 160 10 140 6 112 C18 132 34 138 56 130 Z" fill={p.dark} />
      <path d="M8 112 l-6 -12 14 6 z" fill={p.accent} />
      <path d="M72 96 L22 36 L40 84 L8 70 L36 104 L6 104 L52 124 Z" fill={p.dark} opacity="0.95" />
      <path d="M72 96 L22 36 L40 84 Z" fill={p.accent} opacity="0.35" />
      <ellipse cx="92" cy="128" rx="54" ry="46" fill={p.body} />
      <ellipse cx="106" cy="138" rx="30" ry="32" fill={p.belly} />
      <path d="M84 120 h42 M82 134 h48 M86 148 h40" stroke={p.body} strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" />
      <path d="M52 98 l8 -16 6 14 6 -18 6 16 8 -16 4 14" fill={p.accent} />
      <rect x="62" y="160" width="22" height="30" rx="10" fill={p.dark} />
      <rect x="104" y="160" width="22" height="30" rx="10" fill={p.dark} />
      <path d="M64 188 h6 M72 188 h6 M106 188 h6 M114 188 h6" stroke={p.horn} strokeWidth="4" strokeLinecap="round" />
      <path d="M134 112 C150 118 156 128 150 136 C142 132 136 126 128 124 Z" fill={p.dark} />
      <path d="M118 54 L112 18 L132 46 Z" fill={p.horn} />
      <path d="M146 46 L156 12 L160 48 Z" fill={p.horn} />
      <circle cx="138" cy="74" r="36" fill={p.body} />
      <ellipse cx="166" cy="90" rx="26" ry="18" fill={p.body} />
      <ellipse cx="176" cy="84" rx="3" ry="4" fill={p.dark} />
      <path d="M144 100 Q166 112 190 96" stroke={p.dark} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M152 103 l4 8 4 -7 M164 106 l4 8 4 -8 M176 103 l4 7 3 -9" fill="#fff" />
      <g className="monster-eye">
        <ellipse cx="144" cy="66" rx="12" ry="13" fill="#fff" />
        <circle cx="149" cy="67" r="6" fill="#0f172a" />
        <circle cx="151" cy="64" r="2" fill="#fff" />
      </g>
      <path d="M128 50 L160 58" stroke={p.dark} strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

function Titan({ p }) {
  return (
    <g>
      <rect x="40" y="70" width="112" height="100" rx="38" fill={p.body} />
      <path d="M44 82 l-14 -24 26 10 z M150 82 l12 -26 -24 10 z" fill={p.horn} />
      <path d="M58 72 l6 -14 8 12 8 -16 8 14 8 -16 8 14 8 -14 8 16" fill={p.accent} />
      <ellipse cx="98" cy="134" rx="36" ry="28" fill={p.belly} />
      <path d="M72 128 h52 M76 142 h44" stroke={p.body} strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" />
      <rect x="18" y="104" width="30" height="52" rx="14" fill={p.dark} />
      <circle cx="30" cy="160" r="16" fill={p.dark} />
      <rect x="150" y="100" width="30" height="50" rx="14" fill={p.dark} />
      <circle cx="170" cy="152" r="18" fill={p.dark} />
      <path d="M160 146 h20 M160 156 h20" stroke={p.body} strokeWidth="3" strokeLinecap="round" />
      <rect x="58" y="164" width="28" height="26" rx="10" fill={p.dark} />
      <rect x="108" y="164" width="28" height="26" rx="10" fill={p.dark} />
      <path d="M70 34 C56 30 52 14 60 4 C62 18 72 22 82 26 Z" fill={p.horn} />
      <path d="M138 34 C152 30 156 14 148 4 C146 18 136 22 126 26 Z" fill={p.horn} />
      <rect x="62" y="22" width="88" height="70" rx="30" fill={p.body} />
      <g className="monster-eye">
        <circle cx="116" cy="52" r="17" fill="#fff" />
        <circle cx="122" cy="53" r="8" fill="#0f172a" />
        <circle cx="125" cy="49" r="3" fill="#fff" />
      </g>
      <path d="M96 34 L140 40" stroke={p.dark} strokeWidth="6" strokeLinecap="round" />
      <path d="M84 76 Q114 92 148 74" stroke={p.dark} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M92 78 l4 -14 6 16 Z M136 78 l4 -14 4 14 Z" fill="#fff" />
    </g>
  );
}

/** Both monsters are drawn facing right; the right-side one is mirrored by its container. */
export default function MonsterArt({ team, className = "" }) {
  const p = PALETTES[team];
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <ellipse cx="96" cy="194" rx="70" ry="6" fill="#000" opacity="0.35" />
      {team === 0 ? <Dragon p={p} /> : <Titan p={p} />}
    </svg>
  );
}
