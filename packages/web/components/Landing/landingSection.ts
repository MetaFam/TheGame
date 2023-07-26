export type LandingPageSection = {
  title: string;
  internalLinkId: string;
};

export type LandingPageSectionProps = {
  section: LandingPageSection;
  activeSectionIndex: number;
  nextSection?: LandingPageSection;
};

export const sections = [
  {
    label: '01',
    internalLinkId: 'start',
    title: '1. Start here',
  },
  {
    label: '02',
    internalLinkId: 'wtf-is-a-metagame',
    title: '2. What is a Metagame?',
  },
  {
    label: '03',
    internalLinkId: 'build-the-future',
    title: "3. While you're sleeping...",
  },
  {
    label: '04',
    internalLinkId: 'the-wild-web',
    title: '4. The problem?',
  },
  {
    label: '05',
    internalLinkId: 'why-are-we-here',
    title: '5. Why are we here?',
  },
  {
    label: '06',
    internalLinkId: 'what-do',
    title: '6. What do?',
  },
  {
    label: '07',
    internalLinkId: 'what-are-we',
    title: '7. Who are we?',
  },
  {
    label: '08',
    internalLinkId: 'what-say',
    title: '8. What people are saying.',
  },
  {
    label: '09',
    internalLinkId: 'join-us',
    title: '9. Join us!',
  },
];
