const c = (stem, ...slots) => ({ stem, slots });

export const DECKS = [
  {
    id: "past-be",
    name: "Simple Past: Be (Was / Were - Celebrities & States)",
    chunks: [
      c("She WASN'T a...", "politician, she was an actor.", "singer, she was a famous dancer.", "teacher, she was a doctor.", "model, she was a tennis player."),
      c("They WERE...", "very nervous before the concert.", "at the Oscars last year.", "best friends in high school.", "really tired after the match."),
      c("WAS he...", "happy with his new movie?", "at the party last night?", "a famous footballer in the 90s?", "born in Colombia?"),
      c("I WAS...", "so excited about the trip.", "at home all weekend.", "a big fan of that band.", "late for class yesterday."),
      c("WERE you...", "at the stadium on Saturday?", "nervous on your first day?", "a good student in school?", "angry with your brother?"),
      c("We WEREN'T...", "at home last night.", "ready for the exam.", "hungry after lunch.", "in the same class last year."),
      c("Shakira WAS...", "born in Barranquilla.", "only 13 when she signed her first contract.", "a coach on The Voice.", "very popular in the 2000s."),
      c("The concert WAS...", "amazing, but very expensive.", "on a Friday night.", "too loud for my parents.", "sold out in one hour."),
      c("Where WERE they...", "on New Year's Eve?", "when the movie started?", "during the summer holidays?", "at 10 o'clock last night?"),
      c("He WASN'T...", "happy with the results.", "at work on Monday.", "famous before that song.", "tired, he was bored."),
      c("My grandparents WERE...", "farmers in the countryside.", "very strict with my mom.", "married for fifty years.", "in Spain in 1990."),
      c("Why WAS she...", "so sad yesterday?", "late for the interview?", "in the hospital?", "angry with the director?"),
    ],
  },
  {
    id: "past-regular",
    name: "Simple Past: Regular Verbs & Time Expressions",
    chunks: [
      c("They DIDN'T...", "watch the game last night.", "visit their cousins last summer.", "finish the project on time.", "call me two days ago."),
      c("I PLAYED...", "soccer with my friends last weekend.", "video games until midnight.", "the guitar at the school show.", "tennis two days ago."),
      c("DID you...", "study English last night?", "watch the new series on Netflix?", "cook dinner yesterday?", "travel last December?"),
      c("She WORKED...", "at a hospital in 2019.", "late every night last week.", "from home yesterday.", "for that company for five years."),
      c("We STAYED...", "at a beautiful hotel last summer.", "at home last Sunday.", "up late on Friday night.", "in Cartagena for a week."),
      c("He DIDN'T...", "answer my messages yesterday.", "clean his room last weekend.", "listen to the teacher.", "arrive on time this morning."),
      c("Last night, I...", "watched a horror movie.", "cooked pasta for my family.", "talked to my best friend.", "studied for three hours."),
      c("DID she...", "call you last night?", "enjoy the concert?", "move to a new apartment last year?", "start her new job on Monday?"),
      c("My parents VISITED...", "my grandmother last weekend.", "Mexico in 2018.", "me at the university yesterday.", "the museum a week ago."),
      c("Two years ago, we...", "moved to a new city.", "started a small business.", "decided to learn English.", "traveled around Europe."),
      c("When DID you...", "start learning English?", "finish your homework?", "arrive at the airport?", "decide to change jobs?"),
      c("Yesterday afternoon, the students...", "practiced the dialogue in pairs.", "listened to a podcast.", "asked a lot of questions.", "worked on their final project."),
    ],
  },
  {
    id: "past-irregular",
    name: "Simple Past: Irregular Verbs (Actions & Travel)",
    chunks: [
      c("We WENT...", "to the beach last summer.", "shopping at the mall yesterday.", "to San Andrés for our honeymoon.", "camping in the mountains."),
      c("DID you...", "take a lot of photos on your trip?", "buy any souvenirs?", "fly or drive to Medellín?", "eat the local food?"),
      c("I DIDN'T...", "sleep well on the plane.", "bring my passport, so I was in trouble.", "have enough money for a taxi.", "know the way to the hotel."),
      c("She TOOK...", "a taxi to the airport.", "hundreds of photos in Paris.", "the night bus to Bogotá.", "a cooking class in Thailand."),
      c("They FLEW...", "to London last month.", "first class for the first time.", "over the Andes at sunrise.", "back home on Sunday."),
      c("He LOST...", "his luggage at the airport.", "his phone on the bus.", "his way in the old city.", "his wallet at the beach."),
      c("We ATE...", "delicious tacos in Mexico City.", "fresh seafood by the sea.", "at a famous restaurant.", "too much on vacation."),
      c("Where DID you...", "stay in New York?", "go last weekend?", "buy that hat?", "meet your travel partner?"),
      c("I SAW...", "the Eiffel Tower at night.", "a whale on the boat tour.", "my favorite singer at the airport.", "an amazing sunset in the desert."),
      c("Last year, my family...", "drove across the country.", "spent two weeks in Brazil.", "rode horses in the countryside.", "swam in a crystal-clear river."),
      c("DID they...", "get lost in the city?", "find a cheap hotel?", "leave early in the morning?", "come back with a lot of gifts?"),
      c("She DIDN'T...", "speak the language, but she understood a lot.", "forget her passport this time.", "spend much money on the trip.", "sleep at all the night before the flight."),
    ],
  },
  {
    id: "passive",
    name: "The Passive Voice (Present & Past Business/Events)",
    chunks: [
      c("The report WAS...", "written by my brother.", "sent to the manager yesterday.", "finished before the deadline.", "approved by the board of directors."),
      c("The products ARE...", "made in Colombia.", "shipped all over the world.", "sold online and in stores.", "tested before they leave the factory."),
      c("The meeting WAS...", "canceled at the last minute.", "held in the main conference room.", "moved to Friday morning.", "organized by the HR department."),
      c("Coffee IS...", "grown in the mountains of Colombia.", "exported to more than 50 countries.", "harvested by hand.", "served at every business meeting."),
      c("The new employees WERE...", "trained for two weeks.", "introduced to the team on Monday.", "given laptops on their first day.", "hired after a long interview process."),
      c("The conference WAS...", "attended by over 500 people.", "sponsored by a big tech company.", "broadcast live on YouTube.", "held in Cartagena last year."),
      c("Emails ARE...", "checked every morning.", "answered within 24 hours.", "sent to all clients on Fridays.", "stored on a secure server."),
      c("WAS the contract...", "signed by both companies?", "reviewed by a lawyer?", "translated into English?", "sent to the client?"),
      c("The winners WERE...", "announced at the end of the ceremony.", "chosen by a panel of experts.", "given a trophy and a check.", "interviewed by the local news."),
      c("Our office IS...", "cleaned every evening.", "located in the city center.", "protected by security cameras.", "visited by clients every day."),
      c("The festival WASN'T...", "canceled, it was postponed.", "organized very well this year.", "advertised on social media.", "attended by many tourists."),
      c("ARE the orders...", "delivered on weekends?", "packed by hand?", "tracked online?", "paid in advance?"),
    ],
  },
  {
    id: "advanced-12c",
    name: "Advanced 1 - Unit 12C: Modals of Deduction",
    chunks: [
      c("He MUST BE...", "really tired – he didn't sleep at all last night.", "at home – his car is outside.", "rich – he drives a Ferrari.", "hungry – he didn't have lunch today."),
      c("She CAN'T BE...", "at work – the office is closed today.", "his sister – they look completely different.", "hungry – she just ate a huge pizza.", "a teacher – she's only fifteen years old."),
      c("It MUST BE...", "cold outside – everyone's wearing gloves.", "raining – everyone has an umbrella.", "very late – the streets are empty.", "Mark's birthday – there's a cake in the office."),
      c("She MAY BE...", "sick – she isn't at work today.", "on vacation – I haven't seen her for a few days.", "at the gym – she usually goes after work.", "stuck in traffic – it's rush hour."),
      c("He MIGHT BE...", "in a meeting – he isn't answering his phone.", "at a friend's house.", "the new manager, but I'm not sure.", "on his way – he left an hour ago."),
      c("They COULD BE...", "British – they have a strong accent.", "brothers – they look very similar.", "lost – they keep looking at the map.", "at the café on the corner."),
      c("He MIGHT NOT LIKE...", "the new café – he only drinks tea.", "spicy food, so let's order something else.", "the surprise party – he hates parties.", "horror movies. Let's ask him first."),
      c("We CAN'T BE...", "at the right address – there's no restaurant here.", "late – the class starts at nine and it's eight thirty.", "lost – the GPS says we're here.", "the only ones here – I can hear voices."),
      c("It MIGHT BE...", "cheaper at the other store, but I'm not sure.", "the museum Lucy was talking about.", "closed on Sundays – let's check online.", "sunny this afternoon, so take your sunglasses."),
      c("They MUST BE HAVING...", "a party upstairs – it's very noisy.", "a great time at the beach.", "dinner – all the lights are on in the kitchen.", "problems with the internet again."),
      c("They CAN'T BE PLAYING...", "soccer now – it's nearly midnight!", "outside – it's raining really hard.", "video games – there's no electricity.", "the piano – they don't have one."),
      c("She MUST BE TALKING...", "to David – she left him a message.", "to her boss – she looks very serious.", "on the phone – I can hear her voice.", "about the exam – she looks worried."),
      c("He MUST BE DOING...", "his homework in his bedroom.", "exercise – he's wearing sports clothes.", "something important – he isn't answering.", "the shopping – his car isn't here."),
    ],
  },
];

const STORE_KEY = "mm-custom-decks";
const LEGACY_KEY = "mm-custom-deck";
export const BACKUP_FILE = "monster-mutation-decks.json";
export const DEFAULT_DECK_NAME = "My Custom Chunks";

export const isCustomDeck = (id) => typeof id === "string" && id.startsWith("custom");
export const newDeckId = () => `custom-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

function cleanChunks(chunks) {
  if (!Array.isArray(chunks)) return [];
  return chunks
    .map((ch) => ({
      stem: typeof ch?.stem === "string" ? ch.stem.trim() : "",
      slots: Array.isArray(ch?.slots) ? ch.slots.filter((x) => typeof x === "string" && x.trim()).map((x) => x.trim()).slice(0, 4) : [],
    }))
    .filter((ch) => ch.stem && ch.slots.length >= 2);
}

function cleanDeck(deck) {
  const chunks = cleanChunks(deck?.chunks);
  if (chunks.length === 0) return null;
  const name = typeof deck.name === "string" && deck.name.trim() ? deck.name.trim().slice(0, 60) : DEFAULT_DECK_NAME;
  return { id: isCustomDeck(deck.id) ? deck.id : newDeckId(), name, chunks };
}

const LEVELS = ["starter", "beginner", "basic", "elementary", "pre-intermediate", "intermediate", "upper-intermediate", "advanced", "proficiency"];
const levelRank = (name) => {
  const n = name.toLowerCase().replace(/^(pre|upper)[\s_]+/, "$1-");
  const i = LEVELS.findIndex((l) => n.startsWith(l) && !/[a-z]/.test(n[l.length] ?? ""));
  return i === -1 ? LEVELS.length : i;
};
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

// Level order first (Basic before Intermediate before Advanced), then natural name order (Unit 9 before Unit 10).
export function sortDecks(decks) {
  return [...decks].sort((a, b) => levelRank(a.name) - levelRank(b.name) || collator.compare(a.name, b.name));
}

export function saveCustomDecks(decks) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(decks.map(({ id, name, chunks }) => ({ id, name, chunks }))));
    return true;
  } catch {
    return false;
  }
}

export function loadCustomDecks() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw !== null) return sortDecks(JSON.parse(raw).map(cleanDeck).filter(Boolean));
    const legacy = cleanDeck({ ...JSON.parse(localStorage.getItem(LEGACY_KEY) ?? "null"), id: "custom" });
    const decks = legacy ? [legacy] : [];
    if (saveCustomDecks(decks)) localStorage.removeItem(LEGACY_KEY);
    return decks;
  } catch {
    return [];
  }
}

export function exportBackup(decks) {
  return JSON.stringify(
    { app: "monster-mutation-chunk-battle", version: 1, exportedAt: new Date().toISOString(), decks: decks.map(({ name, chunks }) => ({ name, chunks })) },
    null,
    2,
  );
}

const sameChunks = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Accepts an exported backup, a bare array of decks or a single deck. Never overwrites: identical decks are skipped,
// decks whose name is taken by different content are added as "Name (2)".
export function mergeBackup(existing, text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("This file is not valid JSON.");
  }
  const list = Array.isArray(data) ? data : Array.isArray(data?.decks) ? data.decks : data?.chunks ? [data] : null;
  if (!list) throw new Error("No decks found in this file.");
  const incoming = list.map((d) => cleanDeck({ ...d, id: undefined })).filter(Boolean);
  if (incoming.length === 0) throw new Error("No valid decks found in this file.");

  const decks = [...existing];
  const result = { added: 0, renamed: 0, skipped: 0 };
  const key = (n) => n.toLowerCase();
  for (const deck of incoming) {
    const named = (n) => decks.find((d) => key(d.name) === key(n));
    const same = named(deck.name);
    if (same && sameChunks(same.chunks, deck.chunks)) {
      result.skipped++;
      continue;
    }
    if (same) {
      let i = 2;
      while (named(`${deck.name} (${i})`)) i++;
      deck.name = `${deck.name} (${i})`;
      result.renamed++;
    }
    decks.push(deck);
    result.added++;
  }
  return { decks: sortDecks(decks), ...result };
}

// One chunk per line: "Stem... | slot 1 | slot 2 | slot 3 | slot 4" (tabs also work, e.g. pasted from a spreadsheet).
export function parseChunks(text) {
  const chunks = [];
  const errors = [];
  text.split(/\r?\n/).forEach((line, i) => {
    if (!line.trim()) return;
    const [stem, ...rest] = line.split(/\||\t/).map((s) => s.trim());
    const slots = rest.filter(Boolean).slice(0, 4);
    if (!stem || slots.length < 2) {
      errors.push(i + 1);
      return;
    }
    chunks.push({ stem, slots });
  });
  return { chunks, errors };
}

export function chunksToText(chunks) {
  return chunks.map((ch) => [ch.stem, ...ch.slots].join(" | ")).join("\n");
}
