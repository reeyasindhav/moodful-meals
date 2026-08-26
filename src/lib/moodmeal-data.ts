export type MoodId =
  | "cozy"
  | "energized"
  | "celebratory"
  | "focused"
  | "adventurous"
  | "comforted";

export type Mood = {
  id: MoodId;
  label: string;
  tagline: string;
  emoji: string;
  swatch: string;
  blurb: string;
  cravings: string[];
};

export const moods: Mood[] = [
  {
    id: "cozy",
    label: "Cozy",
    tagline: "slow & warm",
    emoji: "🍜",
    swatch: "bg-blush",
    blurb: "Broth, butter, low light. Food that behaves like a blanket.",
    cravings: ["Ramen", "Braises", "Baked pasta", "Congee"],
  },
  {
    id: "energized",
    label: "Energized",
    tagline: "fresh & bright",
    emoji: "🥗",
    swatch: "bg-butter",
    blurb: "Crunch, citrus, cold-pressed everything. Fuel without the fog.",
    cravings: ["Grain bowls", "Poke", "Smoothies", "Salads"],
  },
  {
    id: "celebratory",
    label: "Celebratory",
    tagline: "make it special",
    emoji: "🥂",
    swatch: "bg-lilac",
    blurb: "Something worth photographing. Shared plates and a long table.",
    cravings: ["Tasting menus", "Steak", "Sushi omakase", "Cake"],
  },
  {
    id: "focused",
    label: "Focused",
    tagline: "keep it light",
    emoji: "🍵",
    swatch: "bg-mint",
    blurb: "Clean, quiet food that doesn't ask for a nap afterwards.",
    cravings: ["Soba", "Broths", "Greens", "Matcha"],
  },
  {
    id: "adventurous",
    label: "Adventurous",
    tagline: "surprise me",
    emoji: "🌶️",
    swatch: "bg-accent",
    blurb: "Unfamiliar spice routes, tiny rooms, menus you can't pronounce.",
    cravings: ["Sichuan", "Ethiopian", "Fermented", "Street food"],
  },
  {
    id: "comforted",
    label: "Comforted",
    tagline: "a little treat",
    emoji: "🧀",
    swatch: "bg-blush",
    blurb: "The meal you already know you love. No new decisions today.",
    cravings: ["Grilled cheese", "Tomato soup", "Diner", "Ice cream"],
  },
];

export const moodById = (id: string) => moods.find((m) => m.id === id);

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export type Meal = {
  id: string;
  name: string;
  place: string;
  neighborhood: string;
  type: "restaurant" | "recipe";
  image: string;
  rating: number;
  minutes: number;
  distance: string;
  price: "$" | "$$" | "$$$";
  match: number;
  badge?: string;
  moods: MoodId[];
  tags: string[];
  why: string;
  ingredients: string[];
  steps: string[];
};

export const meals: Meal[] = [
  {
    id: "miso-butter-ramen",
    name: "Miso butter ramen",
    place: "Kumo House",
    neighborhood: "Greenpoint",
    type: "restaurant",
    image: img("photo-1569718212165-3a8278d5f624"),
    rating: 4.9,
    minutes: 15,
    distance: "0.8 mi",
    price: "$$",
    match: 96,
    badge: "Best match",
    moods: ["cozy", "comforted"],
    tags: ["Warm", "Brothy", "Under 30 min"],
    why: "Deep miso broth and a soft egg — the closest thing to a warm room in a bowl.",
    ingredients: ["White miso", "Cultured butter", "Ramen noodles", "Soft egg", "Scallion"],
    steps: [
      "Warm the broth with miso and butter until glossy.",
      "Boil noodles for exactly three minutes.",
      "Assemble, then add egg and scallion last.",
    ],
  },
  {
    id: "golden-hour-bowl",
    name: "Golden hour bowl",
    place: "The Green Room",
    neighborhood: "Williamsburg",
    type: "restaurant",
    image: img("photo-1512621776951-a57141f2eefd"),
    rating: 4.8,
    minutes: 20,
    distance: "1.2 mi",
    price: "$$",
    match: 92,
    badge: "Feel-good",
    moods: ["energized", "focused"],
    tags: ["Vegetarian", "Crunchy", "Light"],
    why: "Every bite has a different texture, which is exactly what a busy brain wants.",
    ingredients: ["Farro", "Shaved carrot", "Radish", "Sprouts", "Lemon tahini"],
    steps: [
      "Cook farro and cool it completely.",
      "Shave the vegetables as thin as you can.",
      "Dress at the table so nothing wilts.",
    ],
  },
  {
    id: "spicy-vodka-rigatoni",
    name: "Spicy vodka rigatoni",
    place: "Nona's Table",
    neighborhood: "Carroll Gardens",
    type: "restaurant",
    image: img("photo-1621996346565-e3dbc646d9a9"),
    rating: 4.7,
    minutes: 25,
    distance: "1.6 mi",
    price: "$$",
    match: 89,
    badge: "Crowd pleaser",
    moods: ["cozy", "celebratory"],
    tags: ["Rich", "Shareable"],
    why: "Chili heat plus cream is the shortcut to a table that stays late.",
    ingredients: ["Rigatoni", "Tomato paste", "Cream", "Calabrian chili", "Parmesan"],
    steps: [
      "Cook the paste until it darkens.",
      "Add cream and chili, then loosen with pasta water.",
      "Finish the pasta in the sauce for a full minute.",
    ],
  },
  {
    id: "tomato-soup-grilled-cheese",
    name: "Tomato soup & grilled cheese",
    place: "Home kitchen",
    neighborhood: "Recipe",
    type: "recipe",
    image: img("photo-1547592166-23ac45744acd"),
    rating: 4.9,
    minutes: 30,
    distance: "—",
    price: "$",
    match: 98,
    badge: "98% mood match",
    moods: ["comforted", "cozy"],
    tags: ["Nostalgic", "Vegetarian"],
    why: "You already know you love it. That is the entire point today.",
    ingredients: ["Tinned tomatoes", "Butter", "Sourdough", "Cheddar", "Basil"],
    steps: [
      "Simmer tomatoes with butter for 20 minutes.",
      "Butter the outside of the bread, not the pan.",
      "Blend the soup smooth and season generously.",
    ],
  },
  {
    id: "charred-citrus-salmon",
    name: "Charred citrus salmon",
    place: "Ember & Salt",
    neighborhood: "Fort Greene",
    type: "restaurant",
    image: img("photo-1467003909585-2f8a72700288"),
    rating: 4.8,
    minutes: 35,
    distance: "2.1 mi",
    price: "$$$",
    match: 91,
    moods: ["focused", "celebratory"],
    tags: ["Protein", "Bright"],
    why: "Clean protein with enough char to still feel like an occasion.",
    ingredients: ["Salmon", "Blood orange", "Fennel", "Olive oil", "Dill"],
    steps: [
      "Dry the fish thoroughly before it hits the pan.",
      "Sear skin-side down and do not move it.",
      "Spoon citrus over off the heat.",
    ],
  },
  {
    id: "sichuan-dry-pot",
    name: "Sichuan dry pot",
    place: "Málà Room",
    neighborhood: "Sunset Park",
    type: "restaurant",
    image: img("photo-1555939594-58d7cb561ad1"),
    rating: 4.7,
    minutes: 40,
    distance: "3.4 mi",
    price: "$$",
    match: 94,
    badge: "Bold",
    moods: ["adventurous", "energized"],
    tags: ["Numbing", "Spicy"],
    why: "Peppercorn tingle resets a palate that's bored of everything familiar.",
    ingredients: ["Sichuan peppercorn", "Dried chili", "Lotus root", "Tofu", "Garlic"],
    steps: [
      "Toast the peppercorns and chilies in oil.",
      "Add hard vegetables first, soft ones last.",
      "Toss hot and eat immediately.",
    ],
  },
  {
    id: "birthday-layer-cake",
    name: "Brown butter layer cake",
    place: "Fable Bakery",
    neighborhood: "Cobble Hill",
    type: "restaurant",
    image: img("photo-1551024506-0bccd828d307"),
    rating: 4.9,
    minutes: 10,
    distance: "0.6 mi",
    price: "$$",
    match: 90,
    badge: "For the table",
    moods: ["celebratory", "comforted"],
    tags: ["Sweet", "Shareable"],
    why: "A cake makes an ordinary Tuesday into a reason.",
    ingredients: ["Brown butter", "Vanilla bean", "Crème fraîche", "Cane sugar"],
    steps: [
      "Brown the butter and cool it before creaming.",
      "Bake in thin layers for a tighter crumb.",
      "Frost cold, serve at room temperature.",
    ],
  },
  {
    id: "cold-soba-greens",
    name: "Cold soba & greens",
    place: "Kaze Counter",
    neighborhood: "Boerum Hill",
    type: "restaurant",
    image: img("photo-1540189549336-e6e99c3679fe"),
    rating: 4.6,
    minutes: 18,
    distance: "1.1 mi",
    price: "$",
    match: 88,
    moods: ["focused", "energized"],
    tags: ["Light", "Under 30 min", "Vegetarian"],
    why: "No heaviness, no crash, no afternoon regret.",
    ingredients: ["Soba", "Dashi", "Mizuna", "Sesame", "Nori"],
    steps: [
      "Rinse the soba under cold water until slick.",
      "Chill the dipping broth hard.",
      "Add nori right before eating.",
    ],
  },
  {
    id: "ethiopian-platter",
    name: "Shared injera platter",
    place: "Addis Corner",
    neighborhood: "Bed-Stuy",
    type: "restaurant",
    image: img("photo-1504674900247-0877df9cc836"),
    rating: 4.8,
    minutes: 45,
    distance: "2.7 mi",
    price: "$$",
    match: 93,
    moods: ["adventurous", "celebratory"],
    tags: ["Shareable", "Spiced"],
    why: "Eating with your hands from one plate changes the whole evening.",
    ingredients: ["Injera", "Misir wot", "Gomen", "Berbere", "Ayib"],
    steps: [
      "Bloom berbere in oil before adding lentils.",
      "Cook greens low and long.",
      "Serve everything on one platter, warm.",
    ],
  },
  {
    id: "morning-reset-bowl",
    name: "Morning reset bowl",
    place: "Home kitchen",
    neighborhood: "Recipe",
    type: "recipe",
    image: img("photo-1482049016688-2d3e1b311543"),
    rating: 4.7,
    minutes: 12,
    distance: "—",
    price: "$",
    match: 87,
    moods: ["energized", "focused"],
    tags: ["Under 30 min", "Vegetarian"],
    why: "Twelve minutes of prep buys you a much better afternoon.",
    ingredients: ["Greek yogurt", "Berries", "Toasted oats", "Honey", "Pistachio"],
    steps: [
      "Toast the oats until fragrant.",
      "Layer cold yogurt with fruit.",
      "Honey and nuts last, for crunch.",
    ],
  },
  {
    id: "smoky-diner-burger",
    name: "Smoky diner burger",
    place: "Blue Pearl Diner",
    neighborhood: "Gowanus",
    type: "restaurant",
    image: img("photo-1568901346375-23c9450c58cd"),
    rating: 4.6,
    minutes: 22,
    distance: "1.4 mi",
    price: "$",
    match: 85,
    moods: ["comforted", "cozy"],
    tags: ["Classic", "Under 30 min"],
    why: "Griddled, salty, unfussy. A safe landing after a long day.",
    ingredients: ["Beef patty", "American cheese", "Onion", "Pickle", "Soft bun"],
    steps: [
      "Smash the patty thin on a hot griddle.",
      "Cheese on while it's still sizzling.",
      "Toast the bun in the fat.",
    ],
  },
  {
    id: "wood-fired-pizza",
    name: "Wood-fired margherita",
    place: "Forno Sud",
    neighborhood: "Red Hook",
    type: "restaurant",
    image: img("photo-1565299624946-b28f40a0ae38"),
    rating: 4.8,
    minutes: 28,
    distance: "2.3 mi",
    price: "$$",
    match: 86,
    moods: ["celebratory", "comforted", "cozy"],
    tags: ["Shareable", "Classic"],
    why: "Nobody has ever regretted ordering the pizza.",
    ingredients: ["00 flour", "San Marzano", "Fior di latte", "Basil"],
    steps: [
      "Ferment the dough overnight.",
      "Bake as hot as your oven will go.",
      "Basil after the bake, always.",
    ],
  },
];

export const mealsForMood = (mood: MoodId) =>
  meals.filter((m) => m.moods.includes(mood)).sort((a, b) => b.match - a.match);

export const mealById = (id: string) => meals.find((m) => m.id === id);

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  neighborhood: string;
  image: string;
  rating: number;
  price: "$" | "$$" | "$$$";
  moods: MoodId[];
  note: string;
};

export const restaurants: Restaurant[] = [
  {
    id: "kumo-house",
    name: "Kumo House",
    cuisine: "Japanese",
    neighborhood: "Greenpoint",
    image: img("photo-1517248135467-4c7edcad34c4"),
    rating: 4.9,
    price: "$$",
    moods: ["cozy", "comforted"],
    note: "Twelve seats, steamed windows, one perfect bowl.",
  },
  {
    id: "the-green-room",
    name: "The Green Room",
    cuisine: "Market vegetarian",
    neighborhood: "Williamsburg",
    image: img("photo-1414235077428-338989a2e8c0"),
    rating: 4.8,
    price: "$$",
    moods: ["energized", "focused"],
    note: "Daylight, ferns, and produce from Saturday's market.",
  },
  {
    id: "mala-room",
    name: "Málà Room",
    cuisine: "Sichuan",
    neighborhood: "Sunset Park",
    image: img("photo-1552566626-52f8b828add9"),
    rating: 4.7,
    price: "$$",
    moods: ["adventurous"],
    note: "Loud, red, and completely uninterested in being subtle.",
  },
  {
    id: "fable-bakery",
    name: "Fable Bakery",
    cuisine: "Pastry",
    neighborhood: "Cobble Hill",
    image: img("photo-1509440159596-0249088772ff"),
    rating: 4.9,
    price: "$$",
    moods: ["celebratory", "comforted"],
    note: "Cakes that make a weekday feel like an announcement.",
  },
];

export type SavedItem = { mealId: string; savedAt: string; mood: MoodId };

export const savedSeed: SavedItem[] = [
  { mealId: "miso-butter-ramen", savedAt: "2 days ago", mood: "cozy" },
  { mealId: "golden-hour-bowl", savedAt: "5 days ago", mood: "energized" },
  { mealId: "birthday-layer-cake", savedAt: "1 week ago", mood: "celebratory" },
  { mealId: "cold-soba-greens", savedAt: "2 weeks ago", mood: "focused" },
];

export const moodHistory = [
  { day: "Mon", mood: "focused" as MoodId, meal: "cold-soba-greens", score: 88 },
  { day: "Tue", mood: "cozy" as MoodId, meal: "miso-butter-ramen", score: 96 },
  { day: "Wed", mood: "energized" as MoodId, meal: "morning-reset-bowl", score: 87 },
  { day: "Thu", mood: "comforted" as MoodId, meal: "smoky-diner-burger", score: 85 },
  { day: "Fri", mood: "celebratory" as MoodId, meal: "wood-fired-pizza", score: 90 },
  { day: "Sat", mood: "adventurous" as MoodId, meal: "sichuan-dry-pot", score: 94 },
  { day: "Sun", mood: "cozy" as MoodId, meal: "spicy-vodka-rigatoni", score: 89 },
];

export const journal = [
  {
    id: "j1",
    title: "Why comfort food isn't lazy",
    mood: "comforted" as MoodId,
    read: "4 min",
    image: img("photo-1499636136210-6f4ee915583e"),
    excerpt: "The neuroscience of familiar flavours, and why repetition is a feature.",
  },
  {
    id: "j2",
    title: "Eating for a brain that won't settle",
    mood: "focused" as MoodId,
    read: "6 min",
    image: img("photo-1484723091739-30a097e8f929"),
    excerpt: "Lighter plates, steadier afternoons. What to order before a deep work block.",
  },
  {
    id: "j3",
    title: "A table worth staying late for",
    mood: "celebratory" as MoodId,
    read: "5 min",
    image: img("photo-1517248135467-4c7edcad34c4"),
    excerpt: "How shared plates change the shape of an evening.",
  },
];
