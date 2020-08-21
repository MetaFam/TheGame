import { Button, ButtonGroup, Flex, Image } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import React from 'react';

import MetaGameImage from '../public/images/metagame.png';

export const PageHeader: React.FC = () => (
  <Flex align="center" pt="4" pb="8" px="8">
    <MetaLink as="/" href="/" display="block" mr="8">
      <Image src={MetaGameImage} alt="MetaGame" />
    </MetaLink>
    <ButtonGroup spacing="12">
      <Button variant="link" color="offwhite">
        Quests
      </Button>
      <Button variant="link" color="offwhite">
        Raids
      </Button>
      <Button variant="link" color="offwhite">
        Players
      </Button>
      <Button variant="link" color="offwhite">
        Forum
      </Button>
    </ButtonGroup>
  </Flex>
);
