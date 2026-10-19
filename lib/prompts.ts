export type AnswerEntry = { aliases: string[]; tier: string; points: number; note?: string };
export type Prompt = { id: string; text: string; answers: AnswerEntry[]; hint: string };

// Practice question bank for the independent KrillionEndless practice game.
// Tiers are editorial rarity labels, NOT official Krillion data or live player statistics.
export const PROMPTS: Prompt[] = [
  {
    id: 'country-k', text: 'Name a country whose English name begins with the letter K', hint: 'Think of countries in Africa, the Middle East, Central Asia, the Balkans, and the Pacific.',
    answers: [
      { aliases: ['kenya'], tier: 'Plankton', points: 10 },
      { aliases: ['kuwait'], tier: 'Too Clever', points: 15 },
      { aliases: ['kazakhstan'], tier: 'Schooler', points: 30 },
      { aliases: ['kyrgyzstan'], tier: 'Rare', points: 60 },
      { aliases: ['kiribati'], tier: 'One in a Krillion', points: 100 },
      { aliases: ['kosovo'], tier: 'Schooler', points: 30 }
    ]
  },
  {
    id: 'movie-number', text: 'Name a film with a number in its title', hint: 'Think of a film title that literally includes a numeral or number word.',
    answers: [
      { aliases: ['seven', 'se7en'], tier: 'Plankton', points: 10 },
      { aliases: ['oceans eleven', 'ocean s eleven', 'oceans 11'], tier: 'Plankton', points: 10 },
      { aliases: ['300'], tier: 'Too Clever', points: 15 },
      { aliases: ['the sixth sense'], tier: 'Too Clever', points: 15 },
      { aliases: ['fantastic four', 'the fantastic four'], tier: 'Schooler', points: 30 },
      { aliases: ['10 things i hate about you', 'ten things i hate about you'], tier: 'Schooler', points: 30 },
      { aliases: ['101 dalmatians', 'one hundred and one dalmatians'], tier: 'Schooler', points: 30 },
      { aliases: ['2001 a space odyssey', '2001'], tier: 'Schooler', points: 30 },
      { aliases: ['21 jump street'], tier: 'Schooler', points: 30 },
      { aliases: ['district 9'], tier: 'Schooler', points: 30 },
      { aliases: ['50 first dates', 'fifty first dates'], tier: 'Rare', points: 60 },
      { aliases: ['1917'], tier: 'Rare', points: 60 },
      { aliases: ['500 days of summer', 'five hundred days of summer'], tier: 'Rare', points: 60 },
      { aliases: ['the 40 year old virgin', '40 year old virgin'], tier: 'Rare', points: 60 },
      { aliases: ['28 days later'], tier: 'Rare', points: 60 },
      { aliases: ['apollo 13'], tier: 'Rare', points: 60 },
      { aliases: ['seven pounds'], tier: 'Rare', points: 60 },
      { aliases: ['the magnificent seven'], tier: 'Rare', points: 60 },
      { aliases: ['12 angry men', 'twelve angry men'], tier: 'Deep Cut', points: 85 },
      { aliases: ['seven samurai'], tier: 'Deep Cut', points: 85 },
      { aliases: ['the fifth element'], tier: 'Deep Cut', points: 85 },
      { aliases: ['three billboards outside ebbing missouri'], tier: 'Deep Cut', points: 85 },
      { aliases: ['127 hours'], tier: 'Deep Cut', points: 85 },
      { aliases: ['nine'], tier: 'Deep Cut', points: 85 },
      { aliases: ['the 400 blows', '400 blows'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'net-sport', text: 'Name a sport where a net is part of play', hint: 'The net may divide the court or be used to catch or score.',
    answers: [
      { aliases: ['tennis'], tier: 'Plankton', points: 10 },
      { aliases: ['volleyball'], tier: 'Plankton', points: 10 },
      { aliases: ['soccer', 'football'], tier: 'Plankton', points: 10 },
      { aliases: ['badminton'], tier: 'Schooler', points: 30 },
      { aliases: ['table tennis', 'ping pong'], tier: 'Schooler', points: 30 },
      { aliases: ['basketball'], tier: 'Too Clever', points: 15 },
      { aliases: ['beach volleyball'], tier: 'Schooler', points: 30 },
      { aliases: ['ice hockey'], tier: 'Schooler', points: 30 },
      { aliases: ['handball'], tier: 'Schooler', points: 30 },
      { aliases: ['field hockey'], tier: 'Schooler', points: 30 },
      { aliases: ['pickleball'], tier: 'Too Clever', points: 15 },
      { aliases: ['netball'], tier: 'Too Clever', points: 15 },
      { aliases: ['squash'], tier: 'Rare', points: 60 },
      { aliases: ['water polo'], tier: 'Rare', points: 60 },
      { aliases: ['padel'], tier: 'Rare', points: 60 },
      { aliases: ['lacrosse'], tier: 'Rare', points: 60 },
      { aliases: ['korfball'], tier: 'Rare', points: 60 },
      { aliases: ['sepak takraw'], tier: 'Deep Cut', points: 85 },
      { aliases: ['fishing', 'angling'], tier: 'Deep Cut', points: 85 },
      { aliases: ['spikeball'], tier: 'Deep Cut', points: 85 },
      { aliases: ['jai alai'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'marathon-city', text: 'Name a city known for hosting a major annual marathon', hint: 'Consider the famous World Marathon Majors.',
    answers: [
      { aliases: ['new york', 'new york city', 'nyc'], tier: 'Plankton', points: 10 },
      { aliases: ['london'], tier: 'Plankton', points: 10 },
      { aliases: ['boston'], tier: 'Schooler', points: 30 },
      { aliases: ['berlin'], tier: 'Schooler', points: 30 },
      { aliases: ['tokyo'], tier: 'Schooler', points: 30 },
      { aliases: ['chicago'], tier: 'Schooler', points: 30 },
      { aliases: ['paris'], tier: 'Schooler', points: 30 },
      { aliases: ['dublin'], tier: 'Schooler', points: 30 },
      { aliases: ['rome'], tier: 'Schooler', points: 30 },
      { aliases: ['beijing'], tier: 'Schooler', points: 30 },
      { aliases: ['singapore'], tier: 'Schooler', points: 30 },
      { aliases: ['sydney'], tier: 'Schooler', points: 30 },
      { aliases: ['amsterdam'], tier: 'Rare', points: 60 },
      { aliases: ['rotterdam'], tier: 'Rare', points: 60 },
      { aliases: ['valencia'], tier: 'Rare', points: 60 },
      { aliases: ['athens'], tier: 'Rare', points: 60 },
      { aliases: ['shanghai'], tier: 'Rare', points: 60 },
      { aliases: ['seoul'], tier: 'Rare', points: 60 },
      { aliases: ['melbourne'], tier: 'Rare', points: 60 },
      { aliases: ['honolulu'], tier: 'Rare', points: 60 },
      { aliases: ['cape town'], tier: 'Deep Cut', points: 85 },
      { aliases: ['nairobi'], tier: 'Deep Cut', points: 85 },
      { aliases: ['pyongyang'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'hot-dish', text: 'Name a dish commonly served hot', hint: 'Think of a meal rather than a single ingredient.',
    answers: [
      { aliases: ['soup'], tier: 'Plankton', points: 10 },
      { aliases: ['pizza'], tier: 'Plankton', points: 10 },
      { aliases: ['pasta'], tier: 'Plankton', points: 10 },
      { aliases: ['steak'], tier: 'Too Clever', points: 15 },
      { aliases: ['burger'], tier: 'Too Clever', points: 15 },
      { aliases: ['spaghetti'], tier: 'Too Clever', points: 15 },
      { aliases: ['stew'], tier: 'Too Clever', points: 15 },
      { aliases: ['mac and cheese', 'macaroni and cheese'], tier: 'Too Clever', points: 15 },
      { aliases: ['lasagna', 'lasagne'], tier: 'Schooler', points: 30 },
      { aliases: ['ramen'], tier: 'Schooler', points: 30 },
      { aliases: ['curry'], tier: 'Schooler', points: 30 },
      { aliases: ['chili'], tier: 'Schooler', points: 30 },
      { aliases: ['fried rice'], tier: 'Schooler', points: 30 },
      { aliases: ['stir fry'], tier: 'Schooler', points: 30 },
      { aliases: ['tacos'], tier: 'Schooler', points: 30 },
      { aliases: ['dumplings'], tier: 'Schooler', points: 30 },
      { aliases: ['hot pot'], tier: 'Schooler', points: 30 },
      { aliases: ['pho'], tier: 'Rare', points: 60 },
      { aliases: ['paella'], tier: 'Rare', points: 60 },
      { aliases: ['risotto'], tier: 'Rare', points: 60 },
      { aliases: ['shakshuka'], tier: 'Rare', points: 60 },
      { aliases: ["shepherd's pie", 'shepherds pie'], tier: 'Rare', points: 60 },
      { aliases: ['bibimbap'], tier: 'Deep Cut', points: 85 },
      { aliases: ['cassoulet'], tier: 'Deep Cut', points: 85 },
      { aliases: ['feijoada'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'swimming-animal', text: 'Name an animal that can swim', hint: 'It can be a land animal or an aquatic animal.',
    answers: [
      { aliases: ['fish'], tier: 'Plankton', points: 10 },
      { aliases: ['dolphin'], tier: 'Plankton', points: 10 },
      { aliases: ['duck'], tier: 'Plankton', points: 10 },
      { aliases: ['shark'], tier: 'Plankton', points: 10 },
      { aliases: ['whale'], tier: 'Too Clever', points: 15 },
      { aliases: ['dog'], tier: 'Too Clever', points: 15 },
      { aliases: ['seal'], tier: 'Too Clever', points: 15 },
      { aliases: ['penguin'], tier: 'Too Clever', points: 15 },
      { aliases: ['frog'], tier: 'Schooler', points: 30 },
      { aliases: ['turtle'], tier: 'Schooler', points: 30 },
      { aliases: ['otter'], tier: 'Schooler', points: 30 },
      { aliases: ['hippopotamus', 'hippo'], tier: 'Schooler', points: 30 },
      { aliases: ['crocodile'], tier: 'Schooler', points: 30 },
      { aliases: ['polar bear'], tier: 'Schooler', points: 30 },
      { aliases: ['sea lion'], tier: 'Schooler', points: 30 },
      { aliases: ['elephant'], tier: 'Schooler', points: 30 },
      { aliases: ['tiger'], tier: 'Schooler', points: 30 },
      { aliases: ['capybara'], tier: 'Rare', points: 60 },
      { aliases: ['beaver'], tier: 'Rare', points: 60 },
      { aliases: ['walrus'], tier: 'Rare', points: 60 },
      { aliases: ['moose'], tier: 'Rare', points: 60 },
      { aliases: ['manatee'], tier: 'Rare', points: 60 },
      { aliases: ['octopus'], tier: 'Rare', points: 60 },
      { aliases: ['jaguar'], tier: 'Deep Cut', points: 85 },
      { aliases: ['platypus'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'dice-board-game', text: 'Name a board game that uses dice', hint: 'Think beyond the most familiar family board games.',
    answers: [
      { aliases: ['monopoly'], tier: 'Plankton', points: 10 },
      { aliases: ['snakes and ladders', 'chutes and ladders'], tier: 'Plankton', points: 10 },
      { aliases: ['yahtzee'], tier: 'Schooler', points: 30 },
      { aliases: ['risk'], tier: 'Schooler', points: 30 },
      { aliases: ['trouble'], tier: 'Too Clever', points: 15 },
      { aliases: ['sorry'], tier: 'Schooler', points: 30 },
      { aliases: ['dungeons and dragons', 'dungeons dragons', 'dnd'], tier: 'Too Clever', points: 15 },
      { aliases: ['clue', 'cluedo'], tier: 'Too Clever', points: 15 },
      { aliases: ['settlers of catan', 'catan'], tier: 'Schooler', points: 30 },
      { aliases: ['mouse trap'], tier: 'Schooler', points: 30 },
      { aliases: ['backgammon'], tier: 'Rare', points: 60 },
      { aliases: ['ludo'], tier: 'Rare', points: 60 },
      { aliases: ['parcheesi'], tier: 'Rare', points: 60 },
      { aliases: ['farkle'], tier: 'Rare', points: 60 },
      { aliases: ['bunco'], tier: 'Rare', points: 60 },
      { aliases: ['balderdash'], tier: 'Rare', points: 60 },
      { aliases: ['king of tokyo'], tier: 'Deep Cut', points: 85 },
      { aliases: ['tenzi'], tier: 'Deep Cut', points: 85 },
      { aliases: ["liar's dice", 'liars dice'], tier: 'Deep Cut', points: 85 },
      { aliases: ['zombicide'], tier: 'Deep Cut', points: 85 },
      { aliases: ['dice throne'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'chocolate-brand', text: 'Name a brand of chocolate', hint: 'Run through the big names on a supermarket shelf, then push past the flagship bars into premium and European labels.',
    answers: [
      { aliases: ["hershey's", 'hersheys'], tier: 'Plankton', points: 10 },
      { aliases: ['cadbury'], tier: 'Plankton', points: 10 },
      { aliases: ['ferrero rocher'], tier: 'Plankton', points: 10 },
      { aliases: ['lindt'], tier: 'Too Clever', points: 15 },
      { aliases: ['nestle'], tier: 'Too Clever', points: 15 },
      { aliases: ['mars'], tier: 'Too Clever', points: 15 },
      { aliases: ['toblerone'], tier: 'Schooler', points: 30 },
      { aliases: ['godiva'], tier: 'Schooler', points: 30 },
      { aliases: ['milka'], tier: 'Schooler', points: 30 },
      { aliases: ['dove'], tier: 'Schooler', points: 30 },
      { aliases: ['ghirardelli'], tier: 'Rare', points: 60 },
      { aliases: ['ritter sport'], tier: 'Rare', points: 60 },
      { aliases: ["green and black's", 'green and blacks'], tier: 'Rare', points: 60 },
      { aliases: ["tony's chocolonely", 'tonys chocolonely'], tier: 'Deep Cut', points: 85 },
      { aliases: ['michel cluizel'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'cheese-type', text: 'Name a type of cheese', hint: 'Think broad across countries and textures — hard, soft, blue and fresh all count.',
    answers: [
      { aliases: ['cheddar'], tier: 'Plankton', points: 10 },
      { aliases: ['mozzarella'], tier: 'Plankton', points: 10 },
      { aliases: ['parmesan'], tier: 'Plankton', points: 10 },
      { aliases: ['swiss'], tier: 'Too Clever', points: 15 },
      { aliases: ['provolone'], tier: 'Too Clever', points: 15 },
      { aliases: ['brie'], tier: 'Schooler', points: 30 },
      { aliases: ['gouda'], tier: 'Schooler', points: 30 },
      { aliases: ['feta'], tier: 'Schooler', points: 30 },
      { aliases: ['blue cheese'], tier: 'Schooler', points: 30 },
      { aliases: ['goat cheese'], tier: 'Schooler', points: 30 },
      { aliases: ['ricotta'], tier: 'Schooler', points: 30 },
      { aliases: ['camembert'], tier: 'Rare', points: 60 },
      { aliases: ['gorgonzola'], tier: 'Rare', points: 60 },
      { aliases: ['havarti'], tier: 'Deep Cut', points: 85 },
      { aliases: ['taleggio'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'pizza-topping', text: 'Name a pizza topping', hint: 'Anything that commonly sits on top of a pizza qualifies; the more specific, the less everyone else will pick it.',
    answers: [
      { aliases: ['pepperoni'], tier: 'Plankton', points: 10 },
      { aliases: ['cheese'], tier: 'Plankton', points: 10 },
      { aliases: ['mushroom', 'mushrooms'], tier: 'Plankton', points: 10 },
      { aliases: ['sausage'], tier: 'Schooler', points: 30 },
      { aliases: ['onion', 'onions'], tier: 'Schooler', points: 30 },
      { aliases: ['peppers', 'bell pepper', 'bell peppers'], tier: 'Schooler', points: 30 },
      { aliases: ['pepper'], tier: 'Schooler', points: 30 },
      { aliases: ['olives', 'olive'], tier: 'Schooler', points: 30 },
      { aliases: ['pineapple'], tier: 'Schooler', points: 30 },
      { aliases: ['ham'], tier: 'Too Clever', points: 15 },
      { aliases: ['bacon'], tier: 'Schooler', points: 30 },
      { aliases: ['chicken'], tier: 'Schooler', points: 30 },
      { aliases: ['spinach'], tier: 'Schooler', points: 30 },
      { aliases: ['anchovies', 'anchovy'], tier: 'Rare', points: 60 },
      { aliases: ['truffle', 'truffles'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'dog-breed', text: 'Name a breed of dog', hint: 'Go beyond the two or three most famous breeds — small, large, working and toy all fit.',
    answers: [
      { aliases: ['labrador', 'lab'], tier: 'Plankton', points: 10 },
      { aliases: ['golden retriever'], tier: 'Plankton', points: 10 },
      { aliases: ['german shepherd'], tier: 'Plankton', points: 10 },
      { aliases: ['poodle'], tier: 'Schooler', points: 30 },
      { aliases: ['pug'], tier: 'Too Clever', points: 15 },
      { aliases: ['bulldog'], tier: 'Schooler', points: 30 },
      { aliases: ['beagle'], tier: 'Schooler', points: 30 },
      { aliases: ['husky'], tier: 'Schooler', points: 30 },
      { aliases: ['chihuahua'], tier: 'Schooler', points: 30 },
      { aliases: ['corgi'], tier: 'Schooler', points: 30 },
      { aliases: ['boxer'], tier: 'Schooler', points: 30 },
      { aliases: ['dachshund'], tier: 'Rare', points: 60 },
      { aliases: ['doberman'], tier: 'Schooler', points: 30 },
      { aliases: ['rottweiler'], tier: 'Schooler', points: 30 },
      { aliases: ['komondor'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'european-capital', text: 'Name a capital city in Europe', hint: 'Aim past the first few cities every tourist names; the continent has dozens of capital cities.',
    answers: [
      { aliases: ['paris'], tier: 'Plankton', points: 10 },
      { aliases: ['london'], tier: 'Plankton', points: 10 },
      { aliases: ['berlin'], tier: 'Plankton', points: 10 },
      { aliases: ['madrid'], tier: 'Schooler', points: 30 },
      { aliases: ['rome'], tier: 'Schooler', points: 30 },
      { aliases: ['athens'], tier: 'Schooler', points: 30 },
      { aliases: ['lisbon'], tier: 'Schooler', points: 30 },
      { aliases: ['dublin'], tier: 'Schooler', points: 30 },
      { aliases: ['vienna'], tier: 'Schooler', points: 30 },
      { aliases: ['amsterdam'], tier: 'Schooler', points: 30 },
      { aliases: ['prague'], tier: 'Schooler', points: 30 },
      { aliases: ['brussels'], tier: 'Schooler', points: 30 },
      { aliases: ['stockholm'], tier: 'Rare', points: 60 },
      { aliases: ['budapest'], tier: 'Rare', points: 60 },
      { aliases: ['oslo'], tier: 'Rare', points: 60 },
      { aliases: ['vaduz'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'transport-mode', text: 'Name a mode of transport', hint: 'Any way people get from place to place counts, on land, water or in the air.',
    answers: [
      { aliases: ['car'], tier: 'Plankton', points: 10 },
      { aliases: ['bus'], tier: 'Plankton', points: 10 },
      { aliases: ['train'], tier: 'Plankton', points: 10 },
      { aliases: ['bicycle', 'bike'], tier: 'Plankton', points: 10 },
      { aliases: ['airplane', 'plane'], tier: 'Plankton', points: 10 },
      { aliases: ['taxi'], tier: 'Too Clever', points: 15 },
      { aliases: ['boat'], tier: 'Schooler', points: 30 },
      { aliases: ['tram'], tier: 'Schooler', points: 30 },
      { aliases: ['subway', 'metro'], tier: 'Schooler', points: 30 },
      { aliases: ['scooter'], tier: 'Schooler', points: 30 },
      { aliases: ['ferry'], tier: 'Schooler', points: 30 },
      { aliases: ['helicopter'], tier: 'Schooler', points: 30 },
      { aliases: ['motorbike', 'motorcycle'], tier: 'Schooler', points: 30 },
      { aliases: ['funicular'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'pasta-type', text: 'Name a type of pasta', hint: 'Think of the shapes on a menu rather than the sauces — there are dozens.',
    answers: [
      { aliases: ['spaghetti'], tier: 'Plankton', points: 10 },
      { aliases: ['penne'], tier: 'Plankton', points: 10 },
      { aliases: ['macaroni'], tier: 'Plankton', points: 10 },
      { aliases: ['lasagna', 'lasagne'], tier: 'Plankton', points: 10 },
      { aliases: ['fettuccine'], tier: 'Schooler', points: 30 },
      { aliases: ['linguine'], tier: 'Schooler', points: 30 },
      { aliases: ['rigatoni'], tier: 'Too Clever', points: 15 },
      { aliases: ['fusilli'], tier: 'Schooler', points: 30 },
      { aliases: ['tortellini'], tier: 'Schooler', points: 30 },
      { aliases: ['ravioli'], tier: 'Schooler', points: 30 },
      { aliases: ['farfalle'], tier: 'Rare', points: 60 },
      { aliases: ['tagliatelle'], tier: 'Rare', points: 60 },
      { aliases: ['orzo'], tier: 'Rare', points: 60 },
      { aliases: ['orecchiette'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'superhero', text: 'Name a superhero', hint: 'Pick a single character rather than a team; every big universe has many.',
    answers: [
      { aliases: ['superman'], tier: 'Plankton', points: 10 },
      { aliases: ['batman'], tier: 'Plankton', points: 10 },
      { aliases: ['spider man', 'spiderman'], tier: 'Plankton', points: 10 },
      { aliases: ['iron man'], tier: 'Plankton', points: 10 },
      { aliases: ['wonder woman'], tier: 'Schooler', points: 30 },
      { aliases: ['hulk'], tier: 'Schooler', points: 30 },
      { aliases: ['captain america'], tier: 'Schooler', points: 30 },
      { aliases: ['thor'], tier: 'Schooler', points: 30 },
      { aliases: ['aquaman'], tier: 'Schooler', points: 30 },
      { aliases: ['the flash', 'flash'], tier: 'Schooler', points: 30 },
      { aliases: ['black widow'], tier: 'Schooler', points: 30 },
      { aliases: ['wolverine'], tier: 'Schooler', points: 30 },
      { aliases: ['booster gold'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'musical-instrument', text: 'Name a musical instrument', hint: 'Anything in an orchestra, band or studio counts, from strings to brass to electronics.',
    answers: [
      { aliases: ['piano'], tier: 'Plankton', points: 10 },
      { aliases: ['guitar'], tier: 'Plankton', points: 10 },
      { aliases: ['violin'], tier: 'Plankton', points: 10 },
      { aliases: ['drums'], tier: 'Plankton', points: 10 },
      { aliases: ['flute'], tier: 'Schooler', points: 30 },
      { aliases: ['saxophone'], tier: 'Schooler', points: 30 },
      { aliases: ['trumpet'], tier: 'Schooler', points: 30 },
      { aliases: ['cello'], tier: 'Schooler', points: 30 },
      { aliases: ['clarinet'], tier: 'Schooler', points: 30 },
      { aliases: ['harp'], tier: 'Schooler', points: 30 },
      { aliases: ['bass'], tier: 'Too Clever', points: 15 },
      { aliases: ['keyboard'], tier: 'Too Clever', points: 15 },
      { aliases: ['didgeridoo'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'south-american-country', text: 'Name a country in South America', hint: 'There are twelve countries on the continent; the well-known ones are the crowded picks.',
    answers: [
      { aliases: ['brazil'], tier: 'Plankton', points: 10 },
      { aliases: ['argentina'], tier: 'Plankton', points: 10 },
      { aliases: ['chile'], tier: 'Schooler', points: 30 },
      { aliases: ['peru'], tier: 'Schooler', points: 30 },
      { aliases: ['colombia'], tier: 'Schooler', points: 30 },
      { aliases: ['venezuela'], tier: 'Schooler', points: 30 },
      { aliases: ['ecuador'], tier: 'Schooler', points: 30 },
      { aliases: ['bolivia'], tier: 'Rare', points: 60 },
      { aliases: ['paraguay'], tier: 'Rare', points: 60 },
      { aliases: ['uruguay'], tier: 'Schooler', points: 30 },
      { aliases: ['guyana'], tier: 'Rare', points: 60 },
      { aliases: ['suriname'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'flower-type', text: 'Name a type of flower', hint: 'Think of what grows in gardens and shops, from roses to the less obvious blooms.',
    answers: [
      { aliases: ['rose'], tier: 'Plankton', points: 10 },
      { aliases: ['tulip'], tier: 'Plankton', points: 10 },
      { aliases: ['sunflower'], tier: 'Plankton', points: 10 },
      { aliases: ['daisy'], tier: 'Plankton', points: 10 },
      { aliases: ['lily'], tier: 'Schooler', points: 30 },
      { aliases: ['orchid'], tier: 'Schooler', points: 30 },
      { aliases: ['daffodil'], tier: 'Schooler', points: 30 },
      { aliases: ['lavender'], tier: 'Schooler', points: 30 },
      { aliases: ['carnation'], tier: 'Schooler', points: 30 },
      { aliases: ['peony'], tier: 'Rare', points: 60 },
      { aliases: ['iris'], tier: 'Schooler', points: 30 },
      { aliases: ['marigold'], tier: 'Schooler', points: 30 },
      { aliases: ['ranunculus'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'breakfast-food', text: 'Name a breakfast food', hint: 'Any dish or item people commonly eat in the morning qualifies.',
    answers: [
      { aliases: ['eggs'], tier: 'Plankton', points: 10 },
      { aliases: ['bacon'], tier: 'Plankton', points: 10 },
      { aliases: ['cereal'], tier: 'Plankton', points: 10 },
      { aliases: ['pancakes', 'pancake'], tier: 'Plankton', points: 10 },
      { aliases: ['toast'], tier: 'Plankton', points: 10 },
      { aliases: ['waffles', 'waffle'], tier: 'Schooler', points: 30 },
      { aliases: ['oatmeal'], tier: 'Schooler', points: 30 },
      { aliases: ['yogurt', 'yoghurt'], tier: 'Schooler', points: 30 },
      { aliases: ['sausage'], tier: 'Schooler', points: 30 },
      { aliases: ['bagel'], tier: 'Schooler', points: 30 },
      { aliases: ['muffin'], tier: 'Schooler', points: 30 },
      { aliases: ['croissant'], tier: 'Schooler', points: 30 },
      { aliases: ['huevos rancheros'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'movie-franchise', text: 'Name a film franchise', hint: 'Name a film series with more than one entry, not a single movie.',
    answers: [
      { aliases: ['star wars'], tier: 'Plankton', points: 10 },
      { aliases: ['harry potter'], tier: 'Plankton', points: 10 },
      { aliases: ['marvel', 'mcu'], tier: 'Plankton', points: 10 },
      { aliases: ['avengers'], tier: 'Plankton', points: 10 },
      { aliases: ['james bond'], tier: 'Schooler', points: 30 },
      { aliases: ['fast and furious'], tier: 'Schooler', points: 30 },
      { aliases: ['lord of the rings'], tier: 'Schooler', points: 30 },
      { aliases: ['jurassic park', 'jurassic world'], tier: 'Schooler', points: 30 },
      { aliases: ['mission impossible'], tier: 'Schooler', points: 30 },
      { aliases: ['toy story'], tier: 'Schooler', points: 30 },
      { aliases: ['batman'], tier: 'Schooler', points: 30 },
      { aliases: ['john wick'], tier: 'Schooler', points: 30 },
      { aliases: ['the hunger games', 'hunger games'], tier: 'Schooler', points: 30 },
      { aliases: ['mad max'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'car-brand', text: 'Name a car manufacturer', hint: 'Think of the badge on the hood — mainstream, luxury and electric all count.',
    answers: [
      { aliases: ['toyota'], tier: 'Plankton', points: 10 },
      { aliases: ['ford'], tier: 'Plankton', points: 10 },
      { aliases: ['honda'], tier: 'Plankton', points: 10 },
      { aliases: ['bmw'], tier: 'Plankton', points: 10 },
      { aliases: ['mercedes', 'mercedes benz'], tier: 'Plankton', points: 10 },
      { aliases: ['audi'], tier: 'Schooler', points: 30 },
      { aliases: ['tesla'], tier: 'Schooler', points: 30 },
      { aliases: ['chevrolet', 'chevy'], tier: 'Schooler', points: 30 },
      { aliases: ['nissan'], tier: 'Schooler', points: 30 },
      { aliases: ['volkswagen'], tier: 'Schooler', points: 30 },
      { aliases: ['hyundai'], tier: 'Schooler', points: 30 },
      { aliases: ['ferrari'], tier: 'Schooler', points: 30 },
      { aliases: ['lamborghini'], tier: 'Schooler', points: 30 },
      { aliases: ['koenigsegg'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'olympic-sport', text: 'Name a sport in the Olympics', hint: 'Any sport contested at the Games works, summer or winter.',
    answers: [
      { aliases: ['swimming'], tier: 'Plankton', points: 10 },
      { aliases: ['athletics', 'track and field'], tier: 'Plankton', points: 10 },
      { aliases: ['gymnastics'], tier: 'Plankton', points: 10 },
      { aliases: ['basketball'], tier: 'Schooler', points: 30 },
      { aliases: ['soccer', 'football'], tier: 'Schooler', points: 30 },
      { aliases: ['boxing'], tier: 'Schooler', points: 30 },
      { aliases: ['tennis'], tier: 'Schooler', points: 30 },
      { aliases: ['cycling'], tier: 'Schooler', points: 30 },
      { aliases: ['judo'], tier: 'Schooler', points: 30 },
      { aliases: ['fencing'], tier: 'Schooler', points: 30 },
      { aliases: ['weightlifting'], tier: 'Schooler', points: 30 },
      { aliases: ['archery'], tier: 'Schooler', points: 30 },
      { aliases: ['skiing'], tier: 'Schooler', points: 30 },
      { aliases: ['skeleton'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'fruit', text: 'Name a fruit', hint: 'Anything eaten as a fruit counts; the common grocery picks are the crowded end.',
    answers: [
      { aliases: ['apple'], tier: 'Plankton', points: 10 },
      { aliases: ['banana'], tier: 'Plankton', points: 10 },
      { aliases: ['orange'], tier: 'Plankton', points: 10 },
      { aliases: ['grape', 'grapes'], tier: 'Plankton', points: 10 },
      { aliases: ['strawberry', 'strawberries'], tier: 'Plankton', points: 10 },
      { aliases: ['watermelon'], tier: 'Schooler', points: 30 },
      { aliases: ['mango'], tier: 'Schooler', points: 30 },
      { aliases: ['pineapple'], tier: 'Schooler', points: 30 },
      { aliases: ['peach'], tier: 'Schooler', points: 30 },
      { aliases: ['pear'], tier: 'Schooler', points: 30 },
      { aliases: ['cherry', 'cherries'], tier: 'Schooler', points: 30 },
      { aliases: ['kiwi'], tier: 'Schooler', points: 30 },
      { aliases: ['blueberry', 'blueberries'], tier: 'Schooler', points: 30 },
      { aliases: ['lemon'], tier: 'Schooler', points: 30 },
      { aliases: ['rambutan'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'vegetable', text: 'Name a vegetable', hint: 'Think of what sits in the produce aisle or on the dinner plate.',
    answers: [
      { aliases: ['carrot', 'carrots'], tier: 'Plankton', points: 10 },
      { aliases: ['broccoli'], tier: 'Plankton', points: 10 },
      { aliases: ['potato', 'potatoes'], tier: 'Plankton', points: 10 },
      { aliases: ['tomato', 'tomatoes'], tier: 'Plankton', points: 10 },
      { aliases: ['onion', 'onions'], tier: 'Plankton', points: 10 },
      { aliases: ['spinach'], tier: 'Schooler', points: 30 },
      { aliases: ['corn'], tier: 'Schooler', points: 30 },
      { aliases: ['peas', 'pea'], tier: 'Schooler', points: 30 },
      { aliases: ['celery'], tier: 'Schooler', points: 30 },
      { aliases: ['cucumber'], tier: 'Schooler', points: 30 },
      { aliases: ['lettuce'], tier: 'Schooler', points: 30 },
      { aliases: ['cauliflower'], tier: 'Schooler', points: 30 },
      { aliases: ['zucchini'], tier: 'Schooler', points: 30 },
      { aliases: ['asparagus'], tier: 'Schooler', points: 30 },
      { aliases: ['rutabaga'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'weather-type', text: 'Name a type of weather', hint: 'Anything the forecast might describe counts, ordinary or severe.',
    answers: [
      { aliases: ['rain'], tier: 'Plankton', points: 10 },
      { aliases: ['snow'], tier: 'Plankton', points: 10 },
      { aliases: ['sunny', 'sun'], tier: 'Plankton', points: 10 },
      { aliases: ['wind', 'windy'], tier: 'Plankton', points: 10 },
      { aliases: ['cloudy', 'clouds'], tier: 'Too Clever', points: 15 },
      { aliases: ['storm'], tier: 'Schooler', points: 30 },
      { aliases: ['fog', 'foggy'], tier: 'Schooler', points: 30 },
      { aliases: ['thunder', 'thunderstorm'], tier: 'Schooler', points: 30 },
      { aliases: ['hail'], tier: 'Schooler', points: 30 },
      { aliases: ['blizzard'], tier: 'Schooler', points: 30 },
      { aliases: ['lightning'], tier: 'Schooler', points: 30 },
      { aliases: ['derecho'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'painter', text: 'Name a famous painter or visual artist', hint: 'Any celebrated painter from any era counts.',
    answers: [
      { aliases: ['picasso', 'pablo picasso'], tier: 'Plankton', points: 10 },
      { aliases: ['van gogh', 'vincent van gogh'], tier: 'Plankton', points: 10 },
      { aliases: ['da vinci', 'leonardo da vinci'], tier: 'Plankton', points: 10 },
      { aliases: ['monet', 'claude monet'], tier: 'Schooler', points: 30 },
      { aliases: ['rembrandt'], tier: 'Schooler', points: 30 },
      { aliases: ['dali', 'salvador dali'], tier: 'Schooler', points: 30 },
      { aliases: ['warhol', 'andy warhol'], tier: 'Schooler', points: 30 },
      { aliases: ['michelangelo'], tier: 'Schooler', points: 30 },
      { aliases: ['frida kahlo'], tier: 'Schooler', points: 30 },
      { aliases: ['klimt', 'gustav klimt'], tier: 'Rare', points: 60 },
      { aliases: ['vermeer'], tier: 'Rare', points: 60 },
      { aliases: ['pollock', 'jackson pollock'], tier: 'Rare', points: 60 },
      { aliases: ['caravaggio'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'ice-cream-flavor', text: 'Name an ice cream flavor', hint: 'Flavors range from the classics to the mix-ins and parlour specials.',
    answers: [
      { aliases: ['vanilla'], tier: 'Plankton', points: 10 },
      { aliases: ['chocolate'], tier: 'Plankton', points: 10 },
      { aliases: ['strawberry'], tier: 'Plankton', points: 10 },
      { aliases: ['mint chocolate chip'], tier: 'Schooler', points: 30 },
      { aliases: ['cookies and cream'], tier: 'Schooler', points: 30 },
      { aliases: ['caramel'], tier: 'Schooler', points: 30 },
      { aliases: ['pistachio'], tier: 'Schooler', points: 30 },
      { aliases: ['rocky road'], tier: 'Schooler', points: 30 },
      { aliases: ['coffee'], tier: 'Schooler', points: 30 },
      { aliases: ['cherry'], tier: 'Schooler', points: 30 },
      { aliases: ['butter pecan'], tier: 'Rare', points: 60 },
      { aliases: ['spumoni'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'pokemon', text: 'Name a Pokémon', hint: 'Any species in the series counts, from starters to legendaries.',
    answers: [
      { aliases: ['pikachu'], tier: 'Plankton', points: 10 },
      { aliases: ['charizard'], tier: 'Plankton', points: 10 },
      { aliases: ['bulbasaur'], tier: 'Schooler', points: 30 },
      { aliases: ['squirtle'], tier: 'Schooler', points: 30 },
      { aliases: ['jigglypuff'], tier: 'Schooler', points: 30 },
      { aliases: ['eevee'], tier: 'Schooler', points: 30 },
      { aliases: ['mewtwo'], tier: 'Schooler', points: 30 },
      { aliases: ['gengar'], tier: 'Schooler', points: 30 },
      { aliases: ['snorlax'], tier: 'Schooler', points: 30 },
      { aliases: ['psyduck'], tier: 'Schooler', points: 30 },
      { aliases: ['mew'], tier: 'Rare', points: 60 },
      { aliases: ['gyarados'], tier: 'Rare', points: 60 },
      { aliases: ['dunsparce'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'holiday', text: 'Name a holiday', hint: 'Think of the days people celebrate around the world or on a calendar.',
    answers: [
      { aliases: ['christmas'], tier: 'Plankton', points: 10 },
      { aliases: ['new year', "new year's"], tier: 'Plankton', points: 10 },
      { aliases: ['halloween'], tier: 'Plankton', points: 10 },
      { aliases: ['birthday'], tier: 'Too Clever', points: 15 },
      { aliases: ['thanksgiving'], tier: 'Schooler', points: 30 },
      { aliases: ['easter'], tier: 'Schooler', points: 30 },
      { aliases: ["valentine's day", 'valentines day'], tier: 'Schooler', points: 30 },
      { aliases: ['hanukkah'], tier: 'Schooler', points: 30 },
      { aliases: ['diwali'], tier: 'Schooler', points: 30 },
      { aliases: ['independence day'], tier: 'Schooler', points: 30 },
      { aliases: ['ramadan'], tier: 'Schooler', points: 30 },
      { aliases: ['labor day'], tier: 'Schooler', points: 30 },
      { aliases: ['boxing day'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'bird-type', text: 'Name a type of bird', hint: 'Any species of bird counts, wild or domestic.',
    answers: [
      { aliases: ['eagle'], tier: 'Plankton', points: 10 },
      { aliases: ['penguin'], tier: 'Plankton', points: 10 },
      { aliases: ['owl'], tier: 'Plankton', points: 10 },
      { aliases: ['parrot'], tier: 'Schooler', points: 30 },
      { aliases: ['sparrow'], tier: 'Schooler', points: 30 },
      { aliases: ['pigeon'], tier: 'Schooler', points: 30 },
      { aliases: ['crow'], tier: 'Schooler', points: 30 },
      { aliases: ['flamingo'], tier: 'Schooler', points: 30 },
      { aliases: ['peacock'], tier: 'Schooler', points: 30 },
      { aliases: ['hummingbird'], tier: 'Schooler', points: 30 },
      { aliases: ['robin'], tier: 'Schooler', points: 30 },
      { aliases: ['seagull'], tier: 'Schooler', points: 30 },
      { aliases: ['puffin'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'soft-drink-brand', text: 'Name a brand of soft drink', hint: 'Think of the labels in the soda aisle, from cola to lemon-lime to ginger ale.',
    answers: [
      { aliases: ['coca cola', 'coke'], tier: 'Plankton', points: 10 },
      { aliases: ['pepsi'], tier: 'Plankton', points: 10 },
      { aliases: ['sprite'], tier: 'Plankton', points: 10 },
      { aliases: ['fanta'], tier: 'Schooler', points: 30 },
      { aliases: ['mountain dew'], tier: 'Schooler', points: 30 },
      { aliases: ['dr pepper', 'doctor pepper'], tier: 'Schooler', points: 30 },
      { aliases: ['7 up', 'seven up'], tier: 'Schooler', points: 30 },
      { aliases: ['a w', 'a and w'], tier: 'Rare', points: 60 },
      { aliases: ['canada dry'], tier: 'Rare', points: 60 },
      { aliases: ['crush'], tier: 'Rare', points: 60 },
      { aliases: ['sunkist'], tier: 'Rare', points: 60 },
      { aliases: ['fresca'], tier: 'Deep Cut', points: 85 },
      { aliases: ['moxie'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'cuisine', text: 'Name a type of cuisine', hint: 'Think of the food traditions tied to a country or region.',
    answers: [
      { aliases: ['italian'], tier: 'Plankton', points: 10 },
      { aliases: ['chinese'], tier: 'Plankton', points: 10 },
      { aliases: ['mexican'], tier: 'Plankton', points: 10 },
      { aliases: ['american'], tier: 'Too Clever', points: 15 },
      { aliases: ['japanese'], tier: 'Schooler', points: 30 },
      { aliases: ['indian'], tier: 'Schooler', points: 30 },
      { aliases: ['thai'], tier: 'Schooler', points: 30 },
      { aliases: ['french'], tier: 'Schooler', points: 30 },
      { aliases: ['korean'], tier: 'Schooler', points: 30 },
      { aliases: ['spanish'], tier: 'Schooler', points: 30 },
      { aliases: ['greek'], tier: 'Schooler', points: 30 },
      { aliases: ['vietnamese'], tier: 'Schooler', points: 30 },
      { aliases: ['brazilian'], tier: 'Rare', points: 60 },
      { aliases: ['caribbean'], tier: 'Rare', points: 60 },
      { aliases: ['laotian'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'african-country', text: 'Name a country in Africa', hint: 'The continent has over fifty countries; the biggest names are the crowded picks.',
    answers: [
      { aliases: ['egypt'], tier: 'Plankton', points: 10 },
      { aliases: ['nigeria'], tier: 'Plankton', points: 10 },
      { aliases: ['south africa'], tier: 'Plankton', points: 10 },
      { aliases: ['kenya'], tier: 'Schooler', points: 30 },
      { aliases: ['ethiopia'], tier: 'Schooler', points: 30 },
      { aliases: ['ghana'], tier: 'Schooler', points: 30 },
      { aliases: ['morocco'], tier: 'Schooler', points: 30 },
      { aliases: ['tanzania'], tier: 'Schooler', points: 30 },
      { aliases: ['madagascar'], tier: 'Schooler', points: 30 },
      { aliases: ['uganda'], tier: 'Rare', points: 60 },
      { aliases: ['senegal'], tier: 'Rare', points: 60 },
      { aliases: ['zimbabwe'], tier: 'Rare', points: 60 },
      { aliases: ['libya'], tier: 'Rare', points: 60 },
      { aliases: ['algeria'], tier: 'Rare', points: 60 },
      { aliases: ['eswatini'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'music-genre', text: 'Name a genre of music', hint: 'Think broad and specific — from pop and rock to the niches.',
    answers: [
      { aliases: ['pop'], tier: 'Plankton', points: 10 },
      { aliases: ['rock'], tier: 'Plankton', points: 10 },
      { aliases: ['hip hop', 'rap'], tier: 'Plankton', points: 10 },
      { aliases: ['jazz'], tier: 'Schooler', points: 30 },
      { aliases: ['country'], tier: 'Schooler', points: 30 },
      { aliases: ['classical'], tier: 'Schooler', points: 30 },
      { aliases: ['edm', 'electronic', 'dance'], tier: 'Schooler', points: 30 },
      { aliases: ['blues'], tier: 'Schooler', points: 30 },
      { aliases: ['reggae'], tier: 'Schooler', points: 30 },
      { aliases: ['metal'], tier: 'Schooler', points: 30 },
      { aliases: ['folk'], tier: 'Schooler', points: 30 },
      { aliases: ['rnb', 'r b', 'r and b'], tier: 'Schooler', points: 30 },
      { aliases: ['punk'], tier: 'Schooler', points: 30 },
      { aliases: ['indie'], tier: 'Schooler', points: 30 },
      { aliases: ['shoegaze'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'scientist', text: 'Name a famous scientist or inventor', hint: 'Any celebrated name from physics, chemistry, biology or invention counts.',
    answers: [
      { aliases: ['einstein', 'albert einstein'], tier: 'Plankton', points: 10 },
      { aliases: ['newton', 'isaac newton'], tier: 'Plankton', points: 10 },
      { aliases: ['tesla', 'nikola tesla'], tier: 'Plankton', points: 10 },
      { aliases: ['darwin', 'charles darwin'], tier: 'Schooler', points: 30 },
      { aliases: ['marie curie', 'curie'], tier: 'Schooler', points: 30 },
      { aliases: ['galileo', 'galileo galilei'], tier: 'Schooler', points: 30 },
      { aliases: ['edison', 'thomas edison'], tier: 'Schooler', points: 30 },
      { aliases: ['hawking', 'stephen hawking'], tier: 'Schooler', points: 30 },
      { aliases: ['pasteur', 'louis pasteur'], tier: 'Schooler', points: 30 },
      { aliases: ['archimedes'], tier: 'Rare', points: 60 },
      { aliases: ['pythagoras'], tier: 'Rare', points: 60 },
      { aliases: ['da vinci', 'leonardo da vinci'], tier: 'Schooler', points: 30 },
      { aliases: ['feynman', 'richard feynman'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'ball-sport', text: 'Name a sport that uses a ball', hint: 'Almost any ball game qualifies, from field sports to racket and hand games.',
    answers: [
      { aliases: ['soccer', 'football'], tier: 'Plankton', points: 10 },
      { aliases: ['basketball'], tier: 'Plankton', points: 10 },
      { aliases: ['baseball'], tier: 'Plankton', points: 10 },
      { aliases: ['tennis'], tier: 'Plankton', points: 10 },
      { aliases: ['golf'], tier: 'Schooler', points: 30 },
      { aliases: ['volleyball'], tier: 'Schooler', points: 30 },
      { aliases: ['american football'], tier: 'Schooler', points: 30 },
      { aliases: ['cricket'], tier: 'Schooler', points: 30 },
      { aliases: ['rugby'], tier: 'Schooler', points: 30 },
      { aliases: ['table tennis', 'ping pong'], tier: 'Schooler', points: 30 },
      { aliases: ['bowling'], tier: 'Schooler', points: 30 },
      { aliases: ['handball'], tier: 'Schooler', points: 30 },
      { aliases: ['lacrosse'], tier: 'Rare', points: 60 },
      { aliases: ['jai alai'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'footwear', text: 'Name a type of footwear', hint: 'Think of what people put on their feet for work, sport or everyday.',
    answers: [
      { aliases: ['sneakers', 'sneaker'], tier: 'Plankton', points: 10 },
      { aliases: ['boots', 'boot'], tier: 'Plankton', points: 10 },
      { aliases: ['sandals', 'sandal'], tier: 'Plankton', points: 10 },
      { aliases: ['high heels', 'heels'], tier: 'Schooler', points: 30 },
      { aliases: ['running shoes'], tier: 'Schooler', points: 30 },
      { aliases: ['flip flops', 'flip flop'], tier: 'Schooler', points: 30 },
      { aliases: ['slippers', 'slipper'], tier: 'Schooler', points: 30 },
      { aliases: ['loafers', 'loafer'], tier: 'Schooler', points: 30 },
      { aliases: ['oxford', 'oxfords', 'oxford shoes'], tier: 'Rare', points: 60 },
      { aliases: ['ballet flats'], tier: 'Rare', points: 60 },
      { aliases: ['clogs', 'clog'], tier: 'Rare', points: 60 },
      { aliases: ['moccasins', 'moccasin'], tier: 'Rare', points: 60 },
      { aliases: ['espadrilles', 'espadrille'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'kitchen-appliance', text: 'Name a kitchen appliance', hint: 'Think of the machines plugged in around the kitchen, big and small.',
    answers: [
      { aliases: ['refrigerator', 'fridge'], tier: 'Plankton', points: 10 },
      { aliases: ['oven'], tier: 'Plankton', points: 10 },
      { aliases: ['microwave'], tier: 'Plankton', points: 10 },
      { aliases: ['stove'], tier: 'Too Clever', points: 15 },
      { aliases: ['toaster'], tier: 'Schooler', points: 30 },
      { aliases: ['blender'], tier: 'Schooler', points: 30 },
      { aliases: ['dishwasher'], tier: 'Schooler', points: 30 },
      { aliases: ['coffee maker'], tier: 'Schooler', points: 30 },
      { aliases: ['air fryer'], tier: 'Schooler', points: 30 },
      { aliases: ['mixer'], tier: 'Schooler', points: 30 },
      { aliases: ['kettle'], tier: 'Schooler', points: 30 },
      { aliases: ['slow cooker'], tier: 'Rare', points: 60 },
      { aliases: ['sous vide'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'social-media', text: 'Name a social media platform', hint: 'Think of the apps and sites people post, chat and share on.',
    answers: [
      { aliases: ['facebook'], tier: 'Plankton', points: 10 },
      { aliases: ['instagram'], tier: 'Plankton', points: 10 },
      { aliases: ['tiktok'], tier: 'Plankton', points: 10 },
      { aliases: ['youtube'], tier: 'Plankton', points: 10 },
      { aliases: ['twitter', 'x'], tier: 'Plankton', points: 10 },
      { aliases: ['snapchat'], tier: 'Schooler', points: 30 },
      { aliases: ['linkedin'], tier: 'Schooler', points: 30 },
      { aliases: ['whatsapp'], tier: 'Schooler', points: 30 },
      { aliases: ['reddit'], tier: 'Schooler', points: 30 },
      { aliases: ['pinterest'], tier: 'Schooler', points: 30 },
      { aliases: ['discord'], tier: 'Schooler', points: 30 },
      { aliases: ['wechat'], tier: 'Schooler', points: 30 },
      { aliases: ['clubhouse'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'video-game', text: 'Name a video game', hint: 'Any popular game or series counts, across any platform or era.',
    answers: [
      { aliases: ['minecraft'], tier: 'Plankton', points: 10 },
      { aliases: ['fortnite'], tier: 'Plankton', points: 10 },
      { aliases: ['super mario', 'mario'], tier: 'Plankton', points: 10 },
      { aliases: ['pokemon'], tier: 'Plankton', points: 10 },
      { aliases: ['call of duty'], tier: 'Schooler', points: 30 },
      { aliases: ['grand theft auto', 'gta'], tier: 'Schooler', points: 30 },
      { aliases: ['zelda', 'the legend of zelda'], tier: 'Schooler', points: 30 },
      { aliases: ['fifa'], tier: 'Schooler', points: 30 },
      { aliases: ['tetris'], tier: 'Schooler', points: 30 },
      { aliases: ['halo'], tier: 'Schooler', points: 30 },
      { aliases: ['god of war'], tier: 'Schooler', points: 30 },
      { aliases: ['animal crossing'], tier: 'Schooler', points: 30 },
      { aliases: ['celeste'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'landmark', text: 'Name a famous landmark', hint: 'Think of the monuments and buildings people travel to see.',
    answers: [
      { aliases: ['eiffel tower'], tier: 'Plankton', points: 10 },
      { aliases: ['statue of liberty'], tier: 'Plankton', points: 10 },
      { aliases: ['pyramids', 'great pyramid', 'pyramid of giza'], tier: 'Plankton', points: 10 },
      { aliases: ['great wall of china'], tier: 'Plankton', points: 10 },
      { aliases: ['taj mahal'], tier: 'Schooler', points: 30 },
      { aliases: ['big ben'], tier: 'Schooler', points: 30 },
      { aliases: ['colosseum'], tier: 'Schooler', points: 30 },
      { aliases: ['golden gate bridge'], tier: 'Schooler', points: 30 },
      { aliases: ['sydney opera house'], tier: 'Schooler', points: 30 },
      { aliases: ['stonehenge'], tier: 'Schooler', points: 30 },
      { aliases: ['mount rushmore'], tier: 'Schooler', points: 30 },
      { aliases: ['burj khalifa'], tier: 'Schooler', points: 30 },
      { aliases: ['petra'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'body-of-water', text: 'Name a body of water', hint: 'Think of the natural or built places where water gathers.',
    answers: [
      { aliases: ['ocean'], tier: 'Plankton', points: 10 },
      { aliases: ['river'], tier: 'Plankton', points: 10 },
      { aliases: ['lake'], tier: 'Plankton', points: 10 },
      { aliases: ['sea'], tier: 'Plankton', points: 10 },
      { aliases: ['pond'], tier: 'Schooler', points: 30 },
      { aliases: ['waterfall'], tier: 'Schooler', points: 30 },
      { aliases: ['gulf'], tier: 'Schooler', points: 30 },
      { aliases: ['bay'], tier: 'Schooler', points: 30 },
      { aliases: ['stream'], tier: 'Schooler', points: 30 },
      { aliases: ['glacier'], tier: 'Schooler', points: 30 },
      { aliases: ['lagoon'], tier: 'Rare', points: 60 },
      { aliases: ['fjord'], tier: 'Rare', points: 60 },
      { aliases: ['estuary'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'wild-animal', text: 'Name a wild animal', hint: 'Think of the creatures you would see on safari or in the wild.',
    answers: [
      { aliases: ['lion'], tier: 'Plankton', points: 10 },
      { aliases: ['tiger'], tier: 'Plankton', points: 10 },
      { aliases: ['elephant'], tier: 'Plankton', points: 10 },
      { aliases: ['giraffe'], tier: 'Plankton', points: 10 },
      { aliases: ['bear'], tier: 'Plankton', points: 10 },
      { aliases: ['monkey'], tier: 'Plankton', points: 10 },
      { aliases: ['wolf'], tier: 'Schooler', points: 30 },
      { aliases: ['zebra'], tier: 'Schooler', points: 30 },
      { aliases: ['kangaroo'], tier: 'Schooler', points: 30 },
      { aliases: ['gorilla'], tier: 'Schooler', points: 30 },
      { aliases: ['panda'], tier: 'Schooler', points: 30 },
      { aliases: ['cheetah'], tier: 'Schooler', points: 30 },
      { aliases: ['rhino', 'rhinoceros'], tier: 'Schooler', points: 30 },
      { aliases: ['leopard'], tier: 'Schooler', points: 30 },
      { aliases: ['pangolin'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'asian-country', text: 'Name a country in Asia', hint: 'The continent runs from the Middle East to East Asia; think past the first two or three.',
    answers: [
      { aliases: ['china'], tier: 'Plankton', points: 10 },
      { aliases: ['india'], tier: 'Plankton', points: 10 },
      { aliases: ['japan'], tier: 'Plankton', points: 10 },
      { aliases: ['south korea'], tier: 'Schooler', points: 30 },
      { aliases: ['thailand'], tier: 'Schooler', points: 30 },
      { aliases: ['vietnam'], tier: 'Schooler', points: 30 },
      { aliases: ['indonesia'], tier: 'Schooler', points: 30 },
      { aliases: ['philippines'], tier: 'Schooler', points: 30 },
      { aliases: ['pakistan'], tier: 'Schooler', points: 30 },
      { aliases: ['saudi arabia'], tier: 'Schooler', points: 30 },
      { aliases: ['malaysia'], tier: 'Schooler', points: 30 },
      { aliases: ['singapore'], tier: 'Schooler', points: 30 },
      { aliases: ['bangladesh'], tier: 'Rare', points: 60 },
      { aliases: ['turkey'], tier: 'Schooler', points: 30 },
      { aliases: ['bhutan'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'profession', text: 'Name a profession', hint: 'Think of the jobs people train for and work at every day.',
    answers: [
      { aliases: ['doctor'], tier: 'Plankton', points: 10 },
      { aliases: ['teacher'], tier: 'Plankton', points: 10 },
      { aliases: ['lawyer'], tier: 'Plankton', points: 10 },
      { aliases: ['engineer'], tier: 'Plankton', points: 10 },
      { aliases: ['nurse'], tier: 'Schooler', points: 30 },
      { aliases: ['police officer'], tier: 'Schooler', points: 30 },
      { aliases: ['chef'], tier: 'Schooler', points: 30 },
      { aliases: ['firefighter'], tier: 'Schooler', points: 30 },
      { aliases: ['accountant'], tier: 'Schooler', points: 30 },
      { aliases: ['pilot'], tier: 'Schooler', points: 30 },
      { aliases: ['dentist'], tier: 'Schooler', points: 30 },
      { aliases: ['architect'], tier: 'Schooler', points: 30 },
      { aliases: ['electrician'], tier: 'Schooler', points: 30 },
      { aliases: ['pharmacist'], tier: 'Rare', points: 60 },
      { aliases: ['cartographer'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'dessert', text: 'Name a dessert', hint: 'Think of sweets served after a meal or as a treat.',
    answers: [
      { aliases: ['cake'], tier: 'Plankton', points: 10 },
      { aliases: ['ice cream'], tier: 'Plankton', points: 10 },
      { aliases: ['pie'], tier: 'Plankton', points: 10 },
      { aliases: ['cookies', 'cookie'], tier: 'Plankton', points: 10 },
      { aliases: ['brownies', 'brownie'], tier: 'Schooler', points: 30 },
      { aliases: ['cheesecake'], tier: 'Schooler', points: 30 },
      { aliases: ['pudding'], tier: 'Schooler', points: 30 },
      { aliases: ['donut', 'doughnut'], tier: 'Schooler', points: 30 },
      { aliases: ['cupcake'], tier: 'Schooler', points: 30 },
      { aliases: ['tiramisu'], tier: 'Schooler', points: 30 },
      { aliases: ['creme brulee'], tier: 'Rare', points: 60 },
      { aliases: ['macaron', 'macarons'], tier: 'Rare', points: 60 },
      { aliases: ['cannoli'], tier: 'Rare', points: 60 },
      { aliases: ['baklava'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'band', text: 'Name a famous band or musical group', hint: 'Any well-known group from pop, rock or beyond counts.',
    answers: [
      { aliases: ['beatles', 'the beatles'], tier: 'Plankton', points: 10 },
      { aliases: ['rolling stones', 'the rolling stones'], tier: 'Plankton', points: 10 },
      { aliases: ['queen'], tier: 'Plankton', points: 10 },
      { aliases: ['led zeppelin'], tier: 'Schooler', points: 30 },
      { aliases: ['pink floyd'], tier: 'Schooler', points: 30 },
      { aliases: ['coldplay'], tier: 'Schooler', points: 30 },
      { aliases: ['u2'], tier: 'Schooler', points: 30 },
      { aliases: ['metallica'], tier: 'Schooler', points: 30 },
      { aliases: ['nirvana'], tier: 'Schooler', points: 30 },
      { aliases: ['abba'], tier: 'Schooler', points: 30 },
      { aliases: ['acdc', 'ac dc'], tier: 'Schooler', points: 30 },
      { aliases: ['green day'], tier: 'Schooler', points: 30 },
      { aliases: ['radiohead'], tier: 'Schooler', points: 30 },
      { aliases: ['the smiths', 'smiths'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'tv-show', text: 'Name a TV show', hint: 'Any popular series counts, from sitcoms to dramas.',
    answers: [
      { aliases: ['friends'], tier: 'Plankton', points: 10 },
      { aliases: ['breaking bad'], tier: 'Plankton', points: 10 },
      { aliases: ['game of thrones'], tier: 'Plankton', points: 10 },
      { aliases: ['the office'], tier: 'Schooler', points: 30 },
      { aliases: ['stranger things'], tier: 'Schooler', points: 30 },
      { aliases: ['the simpsons'], tier: 'Schooler', points: 30 },
      { aliases: ["grey's anatomy", 'greys anatomy'], tier: 'Schooler', points: 30 },
      { aliases: ['the walking dead'], tier: 'Schooler', points: 30 },
      { aliases: ['sherlock'], tier: 'Schooler', points: 30 },
      { aliases: ['house'], tier: 'Schooler', points: 30 },
      { aliases: ['lost'], tier: 'Schooler', points: 30 },
      { aliases: ['csi'], tier: 'Schooler', points: 30 },
      { aliases: ['the wire'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'fast-food-chain', text: 'Name a fast food chain', hint: 'Think of the drive-thrus and counters found in every town.',
    answers: [
      { aliases: ["mcdonald's", 'mcdonalds'], tier: 'Plankton', points: 10 },
      { aliases: ['burger king'], tier: 'Plankton', points: 10 },
      { aliases: ['kfc'], tier: 'Plankton', points: 10 },
      { aliases: ["wendy's", 'wendys'], tier: 'Schooler', points: 30 },
      { aliases: ['subway'], tier: 'Schooler', points: 30 },
      { aliases: ['taco bell'], tier: 'Schooler', points: 30 },
      { aliases: ['pizza hut'], tier: 'Schooler', points: 30 },
      { aliases: ["domino's", 'dominos'], tier: 'Schooler', points: 30 },
      { aliases: ['chipotle'], tier: 'Schooler', points: 30 },
      { aliases: ['five guys'], tier: 'Schooler', points: 30 },
      { aliases: ['in n out'], tier: 'Schooler', points: 30 },
      { aliases: ["popeye's", 'popeyes'], tier: 'Schooler', points: 30 },
      { aliases: ['white castle'], tier: 'One in a Krillion', points: 100 }
    ]
  },
  {
    id: 'tree', text: 'Name a type of tree', hint: 'Think of the common trees in parks, forests and streets.',
    answers: [
      { aliases: ['oak'], tier: 'Plankton', points: 10 },
      { aliases: ['maple'], tier: 'Plankton', points: 10 },
      { aliases: ['pine'], tier: 'Plankton', points: 10 },
      { aliases: ['palm'], tier: 'Plankton', points: 10 },
      { aliases: ['cherry', 'cherry blossom'], tier: 'Schooler', points: 30 },
      { aliases: ['birch'], tier: 'Schooler', points: 30 },
      { aliases: ['willow'], tier: 'Schooler', points: 30 },
      { aliases: ['cedar'], tier: 'Schooler', points: 30 },
      { aliases: ['elm'], tier: 'Schooler', points: 30 },
      { aliases: ['redwood'], tier: 'Schooler', points: 30 },
      { aliases: ['spruce'], tier: 'Rare', points: 60 },
      { aliases: ['fir'], tier: 'Rare', points: 60 },
      { aliases: ['baobab'], tier: 'One in a Krillion', points: 100 }
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

// 先做完全匹配；命中不了再做包含匹配（取归一化后最长的别名，避免 "seven" 抢在 "seven samurai" 前面）。
export function findAnswer(cleaned: string, answers: AnswerEntry[]): AnswerEntry | undefined {
  const exact = answers.find(entry => entry.aliases.some(alias => normalizeAnswer(alias) === cleaned));
  if (exact) return exact;

  let best: AnswerEntry | undefined;
  let bestLen = 0;
  for (const entry of answers) {
    for (const alias of entry.aliases) {
      const na = normalizeAnswer(alias);
      if (na.length < 4) continue;
      if (cleaned.includes(na) || na.includes(cleaned)) {
        if (na.length > bestLen) {
          bestLen = na.length;
          best = entry;
        }
      }
    }
  }
  return best;
}