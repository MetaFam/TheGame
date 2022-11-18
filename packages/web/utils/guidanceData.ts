import BabyOctopus from 'assets/quests/baby_octo.png';
import Octopus from 'assets/quests/octopus.png';
import SpaceOctopi from 'assets/quests/space_octo.png';

export type GuidanceRole = {
  role: string;
  details: string[];
  image: string;
};

export enum Role {
  CuriousOcto = 'Curious Octo',
  EngagedOcto = 'Engaged Octo',
  SpaceOcto = 'Space Octo',
}

export const guidanceDetails: Record<Role, GuidanceRole> = {
  [Role.CuriousOcto]: {
    role: Role.CuriousOcto,
    details: [
      '* You start your journey as a Curious Octo.',
      "* It means your curiosity has led you to look down the MetaGame rabbit hole & wonder what's in there.",
    ],
    image: BabyOctopus.src,
  },
  [Role.EngagedOcto]: {
    role: Role.EngagedOcto,
    details: [
      '* To become an Engaged Octo you need to complete at least one quest & check into Discord.',
      '* A transitory stage with **temporary access** to the community while you test MetaGame & it tests you.',
    ],
    image: Octopus.src,
  },
  [Role.SpaceOcto]: {
    role: Role.SpaceOcto,
    details: [
      '* Space Octopi aka Players & Patrons are fully grown Octopi with full membership in MetaGame.',
      '* Members of MetaFam and [The 300 of MetaGame](https://wiki.metagame.wtf/wtf-is-metagame/the-300-of-metagame).',
      '* On their way to become the founders of MetaGame.',
    ],
    image: SpaceOctopi.src,
  },
};
