import { InferGetStaticPropsType } from 'next';

import { SetupProfile } from '#components/Setup/SetupProfile';
import { SetupSkills } from '#components/Setup/SetupSkills';
import { SetupContextProvider } from '#contexts/SetupContext';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

export type DefaultSetupProps = InferGetStaticPropsType<typeof getStaticProps>;

const SkillsSetup: React.FC<DefaultSetupProps> = () => (
  <SetupContextProvider>
    <SetupProfile>
      <SetupSkills />
    </SetupProfile>
  </SetupContextProvider>
);

export default SkillsSetup;
