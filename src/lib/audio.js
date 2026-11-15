let ctx = null;
let master = null;
let noiseBuffer = null;
let muted = false;

export function setMuted(value) {
  muted = value;
}

function getCtx() {
  if (muted) return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function getNoise(c) {
  if (!noiseBuffer) {
    noiseBuffer = c.createBuffer(1, c.sampleRate, c.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

function envelope(c, t, dur, peak) {
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(peak, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  g.connect(master);
  return g;
}

function tone(c, { type = "sine", from, to = from, at = 0, dur = 0.2, gain = 0.3 }) {
  const t = c.currentTime + at;
  const osc = c.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(from, t);
  if (to !== from) osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  osc.connect(envelope(c, t, dur, gain));
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

function noise(c, { at = 0, dur = 0.3, gain = 0.4, filter = "lowpass", from = 2000, to = from, q = 1 }) {
  const t = c.currentTime + at;
  const src = c.createBufferSource();
  src.buffer = getNoise(c);
  src.loop = true;
  const f = c.createBiquadFilter();
  f.type = filter;
  f.Q.value = q;
  f.frequency.setValueAtTime(from, t);
  if (to !== from) f.frequency.exponentialRampToValueAtTime(to, t + dur);
  src.connect(f);
  f.connect(envelope(c, t, dur, gain));
  src.start(t);
  src.stop(t + dur + 0.05);
}

export const sfx = {
  laser(big = false) {
    const c = getCtx();
    if (!c) return;
    const dur = big ? 0.6 : 0.35;
    tone(c, { type: "sawtooth", from: big ? 1800 : 1400, to: 110, dur, gain: 0.22 });
    tone(c, { type: "square", from: big ? 1200 : 900, to: 80, dur, gain: 0.12 });
    if (big) {
      tone(c, { type: "sawtooth", from: 220, to: 880, dur: 0.25, gain: 0.15 });
      tone(c, { type: "square", from: 2400, to: 140, at: 0.12, dur: 0.5, gain: 0.12 });
      noise(c, { dur: 0.5, gain: 0.15, filter: "bandpass", from: 400, to: 4000, q: 2 });
    }
  },
  hit(big = false) {
    const c = getCtx();
    if (!c) return;
    noise(c, { dur: big ? 0.6 : 0.35, gain: big ? 0.8 : 0.6, from: 3000, to: 90 });
    tone(c, { type: "sine", from: 170, to: 38, dur: big ? 0.6 : 0.4, gain: 0.9 });
    tone(c, { type: "square", from: 90, to: 40, dur: 0.18, gain: 0.25 });
    if (big) {
      noise(c, { at: 0.08, dur: 0.5, gain: 0.5, from: 1200, to: 60 });
      tone(c, { type: "sine", from: 120, to: 30, at: 0.1, dur: 0.7, gain: 0.7 });
    }
  },
  shield() {
    const c = getCtx();
    if (!c) return;
    [880, 1320, 1760, 2637].forEach((f, i) =>
      tone(c, { type: "triangle", from: f, to: f * 0.97, dur: 0.7 - i * 0.1, gain: 0.16 - i * 0.025 }),
    );
    noise(c, { dur: 0.25, gain: 0.25, filter: "highpass", from: 3000, to: 8000 });
    tone(c, { type: "sine", from: 300, to: 900, dur: 0.15, gain: 0.2 });
  },
  victory() {
    const c = getCtx();
    if (!c) return;
    const notes = [392, 523.25, 659.25, 783.99];
    notes.forEach((f, i) => tone(c, { type: "square", from: f, at: i * 0.13, dur: 0.14, gain: 0.18 }));
    [523.25, 659.25, 783.99, 1046.5].forEach((f) =>
      tone(c, { type: "triangle", from: f, at: 0.55, dur: 1.2, gain: 0.14 }),
    );
    tone(c, { type: "square", from: 1046.5, at: 0.55, dur: 1.0, gain: 0.1 });
    [783.99, 880, 1046.5].forEach((f, i) => tone(c, { type: "square", from: f, at: 1.7 + i * 0.12, dur: 0.12, gain: 0.12 }));
    [1046.5, 1318.5, 1568].forEach((f) => tone(c, { type: "triangle", from: f, at: 2.1, dur: 1.2, gain: 0.12 }));
  },
  tick(urgent = false) {
    const c = getCtx();
    if (!c) return;
    tone(c, { type: urgent ? "square" : "sine", from: urgent ? 1500 : 1100, dur: 0.05, gain: urgent ? 0.12 : 0.18 });
  },
  buzzer() {
    const c = getCtx();
    if (!c) return;
    tone(c, { type: "sawtooth", from: 120, dur: 0.6, gain: 0.25 });
    tone(c, { type: "square", from: 126, dur: 0.6, gain: 0.15 });
  },
  select() {
    const c = getCtx();
    if (!c) return;
    tone(c, { type: "square", from: 660, to: 990, dur: 0.08, gain: 0.12 });
  },
  whoosh() {
    const c = getCtx();
    if (!c) return;
    noise(c, { dur: 0.35, gain: 0.3, filter: "bandpass", from: 300, to: 3000, q: 3 });
    tone(c, { type: "triangle", from: 300, to: 700, dur: 0.2, gain: 0.08 });
  },
};
