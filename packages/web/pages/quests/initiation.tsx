import { Heading } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import React from 'react';

const InitiationQuests: React.FC = () => (
  <PageContainer>
    <HeadComponent
      title="MetaGame Quests"
      description="MetaGame is a Massive Online Coordination Game! MetaGame has some epic quests going on!"
      url="https://my.metagame.wtf/quests/initiation"
    />
    <Heading mb={8}>Initiation</Heading>
  </PageContainer>
);

export default InitiationQuests;
