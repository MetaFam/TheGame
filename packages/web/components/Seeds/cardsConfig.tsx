import {
  BecomeAPatron,
  BuyingAndSellingModal,
  FAQ,
  GetRankedModal,
  JoinTheFund,
  PlantingAndWatering,
  UsefulnessOfSeedsModal,
} from './modals';

export const cardsConfig = [
  {
    title: 'Usefulness of Seeds',
    description:
      'A reward for those actively contributing to the creation of MetaGame - or much more?',
    Content: UsefulnessOfSeedsModal,
  },
  {
    title: 'BUYING & SELLING Seeds',
    description:
      'Looking to buy some Seeds? Want to sell some Seeds? Just follow these few simple steps',
    Content: BuyingAndSellingModal,
  },
  {
    title: 'BECOME A PATRON',
    description:
      "Love the idea of MetaGame but don't got time to actively contribute? We've got you covered!",
    Content: BecomeAPatron,
  },
  {
    title: 'PLANTING & WATERING SEEDS',
    description:
      'Being a good player means planting Seeds & being a good patron means watering them.',
    Content: PlantingAndWatering,
  },
  {
    title: 'GET RANKED!',
    description:
      'Leaderboards are a thing! The higher you reach, the more fame, glory and perks await you!',
    Content: GetRankedModal,
  },
  {
    title: 'JOIN THE SEED FUND',
    description:
      'Don’t feel like watering Seeds yourself? Worry not & let us carry the buckets 🙂',
    Content: JoinTheFund,
  },
  {
    title: 'FAQ',
    description: 'Here are the most frequent questions about Seeds — answered.',
    Content: FAQ,
  },
];
