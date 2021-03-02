import { SetupPersonalityType } from 'components/Setup/SetupPersonalityType';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import { getPersonalityInfo } from 'graphql/getPersonalityInfo';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';

export const getStaticProps = async () => {
  const { types, parts } = await getPersonalityInfo();
  return {
    props: {
      personalityParts: parts,
      personalityTypes: types,
      hideAppDrawer: true,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PersonalityTypeSetup: React.FC<Props> = (props) => {
  const { personalityParts, personalityTypes } = props;
  const [colorMask, setColorMask] = useState<number | undefined>();
  const { user } = useUser({ redirectTo: '/' });

  console.info({ user });

  if (user?.player) {
    // const { player } = user;
    if (!colorMask /* && player.ColorAspect */) {
      // setColorMask(player.ColorAspect);
    }
  }

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupPersonalityType
          {...{
            personalityParts,
            personalityTypes,
            colorMask,
            setColorMask,
          }}
        />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default PersonalityTypeSetup;
