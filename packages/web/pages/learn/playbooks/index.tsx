import { Flex, Grid, Heading, Link, MetaTilePlaybook, Text } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import React from 'react';
import { descriptions } from 'utils/menuLinks';
import { QuestChainPlaybooksDetails } from 'utils/questChains';

const ThePlaybooksPage: React.FC = () => (
  <PageContainer>
    <HeadComponent
      title="Playbooks"
      description={descriptions.playbooks}
      url="https://my.metagame.wtf/playbooks"
    />
    <Heading mt={8} mb={8}>
      Playbooks
    </Heading>
    <Text mb={8} maxW="xl" textAlign="center">
      Playbooks are a collection of quests that are designed to help you learn
      about a specific topic.
    </Text>
    <Grid
      templateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr']}
      gap={{ base: 4, lg: 6, xl: 8 }}
      pb={24}
    >
      {Object.entries(QuestChainPlaybooksDetails).map(
        ([name, { title, image, difficulty, time }]) => (
          <Card
            key={title}
            {...{
              title,
              difficulty,
              time,
              link: `/learn/playbooks/${name}`,
              image,
              color: '#AB7C94',
            }}
          />
        ),
      )}
    </Grid>
  </PageContainer>
);

type CardProps = {
  title: string;
  link: string;
  image: string;
};

const Card: React.FC<CardProps> = ({ title, link, image }) => (
  <Link role="group" _hover={{ textDecoration: 'none' }} href={link}>
    <MetaTilePlaybook height="full" width="full" image={image}>
      <Flex alignItems="center" justifyContent="center" h="full">
        <Text
          background="rgba(0, 0, 0, 0.5)"
          mixBlendMode="normal"
          backdropFilter="blur(10px)"
          borderRadius={8}
          p={4}
          fontSize={24}
          align="center"
        >
          {title}
        </Text>
      </Flex>
    </MetaTilePlaybook>
  </Link>
);

export default ThePlaybooksPage;
