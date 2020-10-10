import AchieverImage from 'assets/achiever.png';
import ChallengerImage from 'assets/challenger.png';
import EnthusiastImage from 'assets/enthusiast.png';
import HelperImage from 'assets/helper.png';
import IndividualistImage from 'assets/individualist.png';
import InvestigatorImage from 'assets/investigator.png';
import LoyalistImage from 'assets/loyalist.png';
import PeacemakerImage from 'assets/peacemaker.png';
import ReformerImage from 'assets/reformer.png';
import { PersonalityType } from 'graphql/types';

const personalityTypes: Array<PersonalityType> = [
  {
    id: '1',
    name: 'The Reformer',
    description: 'Principled, Purposeful, Self-Controlled, and Perfectionistic',
    image: ReformerImage,
  },
  {
    id: '2',
    name: 'The Helper',
    description: 'Demonstrative, Generous, People-Pleasing, and Possessive',
    image: HelperImage,
  },
  {
    id: '3',
    name: 'The Achiever',
    description: 'Adaptive, Excelling, Driven, and Image-Conscious',
    image: AchieverImage,
  },
  {
    id: '4',
    name: 'The Individualist',
    description: 'Expressive, Dramatic, Self-Absorbed, and Temperamental',
    image: IndividualistImage,
  },
  {
    id: '5',
    name: 'The Investigator',
    description: 'Perceptive, Innovative, Secretive, and Isolated',
    image: InvestigatorImage,
  },
  {
    id: '6',
    name: 'The Loyalist',
    description: 'Engaging, Responsible, Anxious, and Suspicious',
    image: LoyalistImage,
  },
  {
    id: '7',
    name: 'The Enthusiast',
    description: 'Spontaneous, Versatile, Distractible, and Scattered',
    image: EnthusiastImage,
  },
  {
    id: '8',
    name: 'The Challenger',
    description: 'Self-Confident, Decisive, Willful, and Confrontational',
    image: ChallengerImage,
  },
  {
    id: '9',
    name: 'The Peacemaker',
    description: 'Receptive, Reassuring, Agreeable, and Complacent',
    image: PeacemakerImage,
  },
];

// TODO: fetch data from backend instead
export const getPersonalityTypes = () => personalityTypes;
