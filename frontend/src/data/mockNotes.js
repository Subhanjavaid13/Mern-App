/**
 * Sample notes used to preview the UI. Shape matches the backend `Note`
 * model (`_id`, `title`, `content`, `createdAt`, `updatedAt`).
 * Safe to delete once the real API is wired up.
 */
export const mockNotes = [
  {
    _id: '66d8f1a2c3b4d5e6f7a8b901',
    title: 'Welcome to Cocoa Notes ☕',
    content:
      'This is your warm little corner for thoughts, plans and half-formed ideas.\n\nA few things you can do right away:\n• Press the "New note" button (or just the N key) to start writing.\n• Search from the home page — ⌘/Ctrl + K jumps straight to the search box.\n• Toggle between the Latte and Espresso themes from the top bar.\n\nDrafts save automatically while you type, so nothing gets lost if you wander off for another coffee.',
    createdAt: '2026-09-05T08:12:00.000Z',
    updatedAt: '2026-09-05T08:40:00.000Z',
  },
  {
    _id: '66d8f1a2c3b4d5e6f7a8b902',
    title: 'Weekly plan — first week of September',
    content:
      'Monday: finish the notes app UI polish, ship the theme toggle.\nTuesday: connect the frontend to the API, handle the rate limit banner.\nWednesday: write tests for the notes controller.\nThursday: deploy preview, gather feedback from the team.\nFriday: quiet day. Read, walk, plan the next sprint.\n\nRemember to block two hours every morning for deep work before opening Slack.',
    createdAt: '2026-09-04T06:30:00.000Z',
    updatedAt: '2026-09-04T18:05:00.000Z',
  },
  {
    _id: '66d8f1a2c3b4d5e6f7a8b903',
    title: 'Dark chocolate babka',
    content:
      'Dough: 500g flour, 80g sugar, 2 eggs, 120ml warm milk, 7g instant yeast, 150g soft butter, pinch of salt. Knead until silky, then rest overnight in the fridge.\n\nFilling: 150g dark chocolate (70%), 100g butter, 50g cocoa, 60g icing sugar. Melt together, cool until spreadable.\n\nRoll, spread, roll up, slice lengthwise, twist. Proof 90 minutes. Bake at 180°C for 30–35 minutes. Brush with sugar syrup the moment it leaves the oven.\n\nNote to self: double the syrup. Always double the syrup.',
    createdAt: '2026-09-02T14:20:00.000Z',
    updatedAt: '2026-09-03T09:10:00.000Z',
  },
  {
    _id: '66d8f1a2c3b4d5e6f7a8b904',
    title: 'Book notes: "Deep Work"',
    content:
      'The core argument is simple: the ability to focus without distraction is becoming rarer at exactly the moment it is becoming more valuable.\n\nIdeas worth keeping:\n1. Schedule every minute of the workday, then revise as needed.\n2. Embrace boredom — do not reach for the phone at every idle moment.\n3. Shut down rituals matter. End the day with a clear "done" signal.\n\nQuestion for later: which of my recurring tasks are shallow work in disguise?',
    createdAt: '2026-08-30T20:45:00.000Z',
    updatedAt: '2026-08-30T20:45:00.000Z',
  },
  {
    _id: '66d8f1a2c3b4d5e6f7a8b905',
    title: 'Product sync — 28 Aug',
    content:
      'Attendees: Sara, Diego, Priya, me.\n\nDecisions:\n- Ship the onboarding redesign behind a flag on Sept 10.\n- Move the pricing page experiment to Q4.\n- Priya owns the analytics dashboard spec.\n\nAction items:\n- Diego: audit empty states across the app.\n- Me: write the migration plan for the notes service.\n- Sara: schedule user interviews for the search feature.',
    createdAt: '2026-08-28T15:00:00.000Z',
    updatedAt: '2026-08-29T08:20:00.000Z',
  },
  {
    _id: '66d8f1a2c3b4d5e6f7a8b906',
    title: 'Ideas for the balcony garden',
    content:
      'Herbs first: basil, thyme, rosemary and mint (mint in its own pot, it takes over everything).\n\nThen cherry tomatoes along the sunny rail, and a trailing strawberry planter near the door. Try a small lemon tree next spring if the winter is mild.\n\nWatering schedule: mornings, every other day. Feed with liquid seaweed every two weeks.',
    createdAt: '2026-08-24T10:15:00.000Z',
    updatedAt: '2026-08-24T10:15:00.000Z',
  },
  {
    _id: '66d8f1a2c3b4d5e6f7a8b907',
    title: 'Packing list — Lisbon',
    content:
      'Passport, charger, adapter (type F), sunglasses, linen shirts ×3, walking shoes, swim shorts, a paperback, the good notebook, pens.\n\nBook the Belém tram ride early. Pastéis de nata at Manteigaria, not the tourist trap. Sunset at Miradouro da Senhora do Monte.',
    createdAt: '2026-08-19T19:30:00.000Z',
    updatedAt: '2026-08-21T07:45:00.000Z',
  },
  {
    _id: '66d8f1a2c3b4d5e6f7a8b908',
    title: 'Quotes I keep coming back to',
    content:
      '"The best time to plant a tree was twenty years ago. The second best time is now."\n\n"Simplicity is the ultimate sophistication." — Leonardo da Vinci\n\n"You do not rise to the level of your goals. You fall to the level of your systems." — James Clear\n\n"Make it work, make it right, make it fast." — Kent Beck',
    createdAt: '2026-08-12T22:05:00.000Z',
    updatedAt: '2026-08-12T22:05:00.000Z',
  },
]

export default mockNotes
