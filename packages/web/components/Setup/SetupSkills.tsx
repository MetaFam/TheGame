import { Flex, Input, MetaHeading } from '@metafam/ds';
import React, { useContext } from 'react';

import { SetupContext } from 'contexts/SetupContext';
import { FlexContainer } from 'components/Container';

export const SetupSkills: React.FC = () => {
  const { skillOptions, skills, setSkills } = useContext(SetupContext);
  console.log({ skills, skillOptions });

  return (
    <FlexContainer>
      <MetaHeading mb={10}>What are your superpowers?</MetaHeading>

      <Input placeholder="ADD A SKILL" background="rgba(27, 13, 42, 0.6)" />
    </FlexContainer>
  );
};
