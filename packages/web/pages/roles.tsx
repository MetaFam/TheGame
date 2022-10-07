import { Box, Grid, Heading, Image, keyframes, Link, Text } from '@metafam/ds';
import Bridge from 'assets/quests/bridge.svg';
import Hammer from 'assets/quests/hammer_wrench.svg';
import Engaged from 'assets/quests/octopus.svg';
// import General from 'assets/quests/diploma-roll.svg';
// import Collab from 'assets/quests/quest-collab.svg';
// import Web3 from 'assets/quests/quest-web3.svg';
import Sprout from 'assets/quests/sprout.svg';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import React from 'react';
import { QuestChains } from 'utils/questChains';

const questCategories = [
  {
    title: `The Engaged Octo's Path`,
    description:
      'The gates lead to a road. Walk it to the end and your efforts will be rewarded.',
    link: `/play/paths/${QuestChains.ENGAGED_OCTOS_PATH}`,
    Icon: Engaged,
    color: '#AB7C94',
    comingSoon: false,
  },
  {
    title: "Builder's path",
    description: 'Become a builder',
    link: `/play/paths/${QuestChains.BUILDERS_PATH}`,
    Icon: Hammer,
    color: '#AB7C94',
    comingSoon: false,
  },
  {
    title: "Bridgebuilder's path",
    description: 'Become a bridgebuilder',
    link: `/play/paths/${QuestChains.BRIDGEBUILDERS_PATH}`,
    Icon: Bridge,
    color: '#AB7C94',
    comingSoon: false,
  },
  {
    title: "Patron's path",
    description: 'Become a patron',
    link: `/play/paths/${QuestChains.PATRONS_PATH}`,
    Icon: Sprout,
    color: '#AB7C94',
    comingSoon: false,
  },
  // {
  // title: 'Meta Collab',
  // description: 'Join forces with fellow warriors against Moloch.',
  // link: '/quests/meta-collab',
  // Icon: Collab,
  // progress: 1,
  // color: '#aaafe6',
  // comingSoon: true,
  // },
  // {
  // title: 'Web 3 Onboarding',
  // description: 'Take back the internet by learning powerful new weapons!',
  // link: '/quests/web3',
  // Icon: Web3,
  // progress: 1,
  // color: '#1a56e6',
  // comingSoon: true,
  // },
];

const QuestsDashboard: React.FC = () => (
  <PageContainer>
    <HeadComponent
      title="MetaGame Quests"
      description="MetaGame is a Massive Online Coordination Game! MetaGame has some epic quests going on!"
      url="https://my.metagame.wtf/quests"
    />
    <Heading mb={8}>Quests</Heading>
    <Grid
      templateColumns={[
        'auto',
        'auto',
        '1fr 1fr',
        '1fr 1fr 1fr',
        '1fr 1fr 1fr 1fr',
      ]}
      gap={6}
      pb={10}
    >
      {questCategories.map(
        ({ title, description, link, Icon, color, comingSoon }) => (
          <Card
            key={title}
            {...{
              title,
              description,
              link,
              Icon,
              // progress: 0,
              // completed: 0,
              color,
              comingSoon,
            }}
          />
        ),
      )}
    </Grid>
  </PageContainer>
);

type CardProps = {
  title: string;
  description: string;
  link: string;
  Icon: string;
  progress?: number;
  completed?: number;
  color: string;
  comingSoon: boolean;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  link,
  Icon,
  progress,
  completed,
  color,
  comingSoon,
}) => {
  const spin = keyframes`
    from { width: 0; }
    to { width: ${progress}%; }
  `;

  return (
    <Link
      display="flex"
      borderRadius="lg"
      borderWidth="1px"
      textColor="white"
      alignItems="center"
      textAlign="center"
      placeContent="center"
      maxW="sm"
      minH="3xs"
      w={['full', 'auto']}
      pointerEvents={comingSoon ? 'none' : 'auto'}
      cursor={comingSoon ? 'default' : 'pointer'}
      href={comingSoon ? '' : link}
      sx={{
        bgColor: '#110035',
        borderColor: 'whiteAlpha.400',
        transition: 'all 0.1s ease-in-out',
        _hover: { bgColor: '#150042', borderColor: 'whiteAlpha.700' },
      }}
    >
      {comingSoon && (
        <Box position="absolute" zIndex={2}>
          <Heading fontSize="lg">COMING SOON</Heading>
        </Box>
      )}
      <Box
        borderRadius="lg"
        position="relative"
        p={8}
        sx={{
          '&::after': comingSoon
            ? {
                content: '" "',
                position: 'absolute',
                zIndex: 1,
                borderRadius: 6,
                display: 'block',
                height: 'full',
                width: 'full',
                top: 0,
                left: 0,
                right: 0,
                background: 'rgba(63, 68, 94, 0.7)',
              }
            : {},
        }}
      >
        {typeof completed === 'number' && (
          <Box>
            <Text fontFamily="heading" textColor={color}>
              Completed: {completed}
            </Text>
          </Box>
        )}
        {progress && (
          <Box
            background="rgba(255,255,255,0.1)"
            justifyContent="flex-start"
            borderRadius="100px"
            alignItems="center"
            position="relative"
            padding="0 5px"
            display="flex"
            height={8}
          >
            <Box
              animation={`${spin} 3s normal forwards`}
              boxShadow="0 10px 40px -10px #fff"
              borderRadius="100px"
              background={color}
              height={6}
              width="0"
            ></Box>
          </Box>
        )}
        <Text fontSize="xl" fontWeight="bold" mt={1} my={4}>
          {title.toUpperCase()}
        </Text>
        <Box p={12}>
          <Image src={Icon} fill="white" />
        </Box>
        <Text mb={2}>{description}</Text>
      </Box>
    </Link>
  );
};

export default QuestsDashboard;
