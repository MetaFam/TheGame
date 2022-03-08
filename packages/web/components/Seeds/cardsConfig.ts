import {
  BecomeAPatron,
  BuyingAndSelling,
  FAQ,
  GetRanked,
  JoinTheFund,
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
    title: 'Usefulness of SEEDs',
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
    title: 'Buying & Selling SEEDs',
    description:
      'Looking to buy some SEEDs? Want to sell some SEEDs? Just follow these few simple steps.',
    Content: BuyingAndSelling,
  },
  {
    title: 'PLANTING & WATERING SEEDS',
    description:
      'Being a good player means planting SEEDs & being a good patron means watering them.',
    Content: PlantingAndWatering,
  },
  {
    title: 'JOIN THE SEED FUND',
    description:
      'Don’t feel like watering SEEDs yourself? Worry not & let us carry the buckets. 🙂',
    Content: JoinTheFund,
  },
  {
    title: 'GET RANKED!',
    description:
      'Leaderboards are a thing! The higher you reach, the more fame, glory, and perks await you!',
    Content: GetRanked,
  },
  {
    title: 'FAQ',
    description: 'Here are the most frequent questions about SEEDs — answered.',
    Content: FAQ,
  },
];
