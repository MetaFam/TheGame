import { Box, Flex, Grid, Heading, Image, keyframes, Text } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { HeadComponent } from 'components/Seo';
import React from 'react';
import { QuestChainDetails } from 'utils/questChains';

const QuestsDashboard: React.FC = () => (
  <PageContainer>
    <HeadComponent
      title="MetaGame Roles Onboarding"
      description="MetaGame is a Massive Online Coordination Game! MetaGame has some epic quests going on!"
      url="https://my.metagame.wtf/quests"
    />
    <Heading mt={8} mb={16}>
      Onboarding Paths
    </Heading>
    <Grid
      templateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr']}
      gap={{ base: 4, lg: 6, xl: 8 }}
      pb={24}
    >
      {Object.entries(QuestChainDetails).map(
        ([path, { title, description, icon }]) => (
          <Card
            key={title}
            {...{
              title,
              description,
              link: `/play/paths/${path}`,
              icon,
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
  description: string;
  link: string;
  icon: string;
  progress?: number;
  completed?: number;
  color: string;
  comingSoon?: boolean;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  link,
  icon,
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
    <MetaLink
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
        p={{ base: 4, xl: 8 }}
        sx={{
          '&::after': comingSoon
            ? {
                content: '" "',
                position: 'absolute',
                zIndex: 1,
                borderRadius: 6,
                display: 'flex',
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
        <Flex py={{ base: 4, md: 6, lg: 8 }} justify="center" align="center">
          <Image src={icon} h={{ base: '8rem', md: '10rem', xl: '12rem' }} />
        </Flex>
        <Text mb={2} h="3rem">
          {description}
        </Text>
      </Box>
    </MetaLink>
  );
};

export default QuestsDashboard;
