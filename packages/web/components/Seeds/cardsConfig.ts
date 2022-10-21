import {
  BecomeAPatron,
  BuyingAndSelling,
  GetRanked,
  PlantingAndWatering,
  UsefulnessOfSEEDs,
  WTFisXP,
} from './modals';

export const cardsConfig = [
  {
    title: 'WTF is XP?',
    description:
      'XP is a unit of contribution to MetaGame, measured by SourceCred.',
    Content: WTFisXP,
  },
  {
    title: 'Usefulness of Seeds',
    description:
      'A reward for those actively contributing to the creation of MetaGame — or much more?',
    Content: UsefulnessOfSEEDs,
  },
  {
    title: 'Become a Patron',
    description:
      'Love the idea of MetaGame but don’t have time to actively contribute? We’ve got you covered!',
    Content: BecomeAPatron,
  },
  {
    title: 'Buying & Selling Seeds',
    description:
      'Looking to buy some Seeds? Want to sell some Seeds? Just follow these few simple steps.',
    Content: BuyingAndSelling,
  },
  {
    title: 'Planting & Watering Seeds',
    description:
      'Being a good player means planting Seeds & being a good patron means watering them.',
    Content: PlantingAndWatering,
  },
  {
    title: 'Get Ranked!',
    description:
      'Leaderboards are a thing! The higher you reach, the more fame, glory, and perks await you!',
    Content: GetRanked,
  },
];
