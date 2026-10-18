export type AnswerEntry = { aliases: string[]; tier: string; points: number; note?: string };
export type Prompt = { id: string; text: string; answers: AnswerEntry[]; hint: string };

// Practice question bank for the independent KrillionEndless practice game.
// Tiers are editorial rarity labels, NOT official Krillion data or live player statistics.
export const PROMPTS: Prompt[] = [
  {
    id: 'country-k', text: 'Name a country whose English name begins with the letter K', hint: 'Think of countries in Africa, Central Asia, and the Pacific.',
    answers: [
      { aliases: ['kenya'], tier: 'Plankton', points: 10 },
      { aliases: ['kuwait'], tier: 'Too Clever', points: 15 },
      { aliases: ['kazakhstan'], tier: 'Schooler', points: 30 },
      { aliases: ['kyrgyzstan'], tier: 'Rare', points: 60 },
      { aliases: ['kiribati'], tier: 'Deep Cut', points: 85 },
      { aliases: ['korea', 'south korea', 'republic of korea'], tier: 'Schooler', points: 30, note: 'Korea here means South Korea.' }
    ]
  },
  {
    id: 'movie-number', text: 'Name a film with a number in its title', hint: 'Think of a film title that literally includes a numeral or number word.',
    answers: [
      { aliases: ['1917'], tier: 'Rare', points: 60 },
      { aliases: ['12 angry men', 'twelve angry men'], tier: 'Deep Cut', points: 85 },
      { aliases: ['10 things i hate about you', 'ten things i hate about you'], tier: 'Schooler', points: 30 },
      { aliases: ['the sixth sense'], tier: 'Too Clever', points: 15 },
      { aliases: ['fantastic four', 'the fantastic four'], tier: 'Schooler', points: 30 },
      { aliases: ['50 first dates', 'fifty first dates'], tier: 'Rare', points: 60 }
    ]
  },
  {
    id: 'net-sport', text: 'Name a sport where a net is part of play', hint: 'The net may divide the court or be used to catch or score.',
    answers: [
      { aliases: ['tennis'], tier: 'Plankton', points: 10 },
      { aliases: ['volleyball'], tier: 'Plankton', points: 10 },
      { aliases: ['badminton'], tier: 'Schooler', points: 30 },
      { aliases: ['table tennis', 'ping pong'], tier: 'Schooler', points: 30 },
      { aliases: ['squash'], tier: 'Rare', points: 60 },
      { aliases: ['sepak takraw'], tier: 'Deep Cut', points: 85 }
    ]
  },
  {
    id: 'marathon-city', text: 'Name a city known for hosting a major annual marathon', hint: 'Consider the famous World Marathon Majors.',
    answers: [
      { aliases: ['new york', 'new york city', 'nyc'], tier: 'Plankton', points: 10 },
      { aliases: ['london'], tier: 'Plankton', points: 10 },
      { aliases: ['boston'], tier: 'Schooler', points: 30 },
      { aliases: ['berlin'], tier: 'Schooler', points: 30 },
      { aliases: ['chicago'], tier: 'Rare', points: 60 },
      { aliases: ['tokyo'], tier: 'Schooler', points: 30 }
    ]
  },
  {
    id: 'hot-dish', text: 'Name a dish commonly served hot', hint: 'Think of a meal rather than a single ingredient.',
    answers: [
      { aliases: ['soup'], tier: 'Plankton', points: 10 },
      { aliases: ['pizza'], tier: 'Plankton', points: 10 },
      { aliases: ['lasagna', 'lasagne'], tier: 'Schooler', points: 30 },
      { aliases: ['ramen'], tier: 'Schooler', points: 30 },
      { aliases: ['shakshuka'], tier: 'Rare', points: 60 },
      { aliases: ['bibimbap'], tier: 'Deep Cut', points: 85 }
    ]
  },
  {
    id: 'swimming-animal', text: 'Name an animal that can swim', hint: 'It can be a land animal or an aquatic animal.',
    answers: [
      { aliases: ['dolphin'], tier: 'Plankton', points: 10 },
      { aliases: ['duck'], tier: 'Plankton', points: 10 },
      { aliases: ['capybara'], tier: 'Rare', points: 60 },
      { aliases: ['otter'], tier: 'Schooler', points: 30 },
      { aliases: ['hippopotamus', 'hippo'], tier: 'Schooler', points: 30 },
      { aliases: ['jaguar'], tier: 'Deep Cut', points: 85 }
    ]
  },
  {
    id: 'dice-board-game', text: 'Name a board game that uses dice', hint: 'Think beyond the most familiar family board games.',
    answers: [
      { aliases: ['monopoly'], tier: 'Plankton', points: 10 },
      { aliases: ['yahtzee'], tier: 'Schooler', points: 30 },
      { aliases: ['backgammon'], tier: 'Rare', points: 60 },
      { aliases: ['risk'], tier: 'Schooler', points: 30 },
      { aliases: ['ludo'], tier: 'Rare', points: 60 },
      { aliases: ['king of tokyo'], tier: 'Deep Cut', points: 85 }
    ]
  }
];

export const TIERS = [
  { name: 'Plankton', points: 10 }, { name: 'Too Clever', points: 15 },
  { name: 'Schooler', points: 30 }, { name: 'Rare', points: 60 },
  { name: 'Deep Cut', points: 85 }, { name: 'One in a Krillion', points: 100 }
];

export function normalizeAnswer(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}
