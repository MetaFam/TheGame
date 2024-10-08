import { InferGetStaticPropsType } from 'next';

import { SetupDescription } from '#components/Setup/SetupDescription';
import { SetupProfile } from '#components/Setup/SetupProfile';
import { SetupContextProvider } from '#contexts/SetupContext';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

export type DefaultSetupProps = InferGetStaticPropsType<typeof getStaticProps>;

const DescriptionSetup: React.FC<DefaultSetupProps> = () => (
  <SetupContextProvider>
    <SetupProfile>
      <SetupDescription />
    </SetupProfile>
  </SetupContextProvider>
);

export default DescriptionSetup;
