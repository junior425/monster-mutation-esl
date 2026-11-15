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
];

export const CUSTOM_DECK_ID = "custom";
const CUSTOM_KEY = "mm-custom-deck";

export function loadCustomDeck() {
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    if (!raw) return null;
    const deck = JSON.parse(raw);
    if (!deck || !Array.isArray(deck.chunks) || deck.chunks.length === 0) return null;
    return { id: CUSTOM_DECK_ID, name: deck.name || "My Custom Chunks", chunks: deck.chunks };
  } catch {
    return null;
  }
}

export function saveCustomDeck(name, chunks) {
  localStorage.setItem(CUSTOM_KEY, JSON.stringify({ name, chunks }));
}

export function deleteCustomDeck() {
  localStorage.removeItem(CUSTOM_KEY);
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
