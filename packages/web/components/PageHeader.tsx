import { Button, ButtonGroup, Flex, Image } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import React from 'react';

import MetaGameImage from '../public/images/metagame.png';

export const PageHeader: React.FC = () => (
  <Flex align="center" pt="1rem" pb="2rem" px="2rem">
    <MetaLink as="/" href="/" display="block" mr="2rem">
      <Image src={MetaGameImage} />
    </MetaLink>
    <ButtonGroup spacing="3rem">
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
