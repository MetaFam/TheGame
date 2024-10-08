import { InferGetStaticPropsType } from 'next';

import { SetupAvailability } from '#components/Setup/SetupAvailability';
import { SetupProfile } from '#components/Setup/SetupProfile';
import { SetupContextProvider } from '#contexts/SetupContext';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

export type DefaultSetupProps = InferGetStaticPropsType<typeof getStaticProps>;

const AvailabilitySetup: React.FC<DefaultSetupProps> = () => (
  <SetupContextProvider>
    <SetupProfile>
      <SetupAvailability />
    </SetupProfile>
  </SetupContextProvider>
);

export default AvailabilitySetup;
