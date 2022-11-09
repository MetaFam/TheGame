import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  MetaTag,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  VStack,
} from '@metafam/ds';
import LogoImage from 'assets/logo.png';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import { SquareImage } from 'components/SquareImage';
import { Difficulty, QuestChainDetails, Time } from 'utils/questChains';

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
        ([path, { title, description, icon, difficulty, time }]) => (
          <Card
            key={title}
            {...{
              title,
              description,
              difficulty,
              time,
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
  difficulty: string;
  time: string;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  link,
  icon,
  difficulty,
  time,
}) => {
  let difficultyBgColor;
  switch (difficulty) {
    case Difficulty.HARD:
      difficultyBgColor = '#e53e3e87';
      break;
    case Difficulty.MEDIUM:
      difficultyBgColor = '#d69e2e8a';
      break;
    default:
      difficultyBgColor = '#38a16987';
  }

  let timeBgColor;
  switch (time) {
    case Time.LONG:
      timeBgColor = '#e53e3e87';
      break;
    case Time.MEDIUM:
      timeBgColor = '#d69e2e8a';
      break;
    default:
      timeBgColor = '#38a16987';
  }

  return (
    <Link role="group" _hover={{ textDecoration: 'none' }} href={link}>
      <MetaTile height="full" width="full">
        <MetaTileHeader>
          <Flex
            flexDir="column"
            gap={1}
            pos="absolute"
            left={-8}
            py={3}
            px={4}
            top={-8}
            background="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(10.5px)"
            borderRadius="8px"
            alignItems="center"
          >
            <Image w="2.5rem" src={LogoImage} />
            <Text
              fontFamily="Exo 2"
              fontSize="xs"
              color="blueLight"
              fontWeight="bold"
            >
              MetaGame
            </Text>
          </Flex>
          <SquareImage p={6} src={icon} mt="0 !important" />
          <Flex px={3} w="full" pos="absolute" bottom={-6} zIndex={1}>
            <Heading
              size="lg"
              color="white"
              bgColor="rgba(255, 255, 255, 0.06)"
              style={{ backdropFilter: 'blur(10px)' }}
              lineHeight={1.8}
              justifyContent="center"
              px={3}
              width="full"
              textAlign="center"
              borderRadius={10}
              fontFamily="body"
              fontWeight={400}
            >
              {title}
            </Heading>
          </Flex>
        </MetaTileHeader>
        <MetaTileBody pos="relative" height="full">
          <Flex flexDir="column">
            <Text textStyle="caption">ABOUT</Text>

            <Text mb={2} h="3rem">
              {description}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <VStack spacing={2} align="stretch">
              <Text textStyle="caption">Difficulty</Text>
              <Box>
                <MetaTag size="md" fontSize="sm" bgColor={difficultyBgColor}>
                  <Text>{difficulty}</Text>
                </MetaTag>
              </Box>
            </VStack>
            <VStack spacing={2} align="stretch">
              <Text textStyle="caption">Time</Text>
              <MetaTag size="md" fontSize="sm" bgColor={timeBgColor}>
                <Text>{time}</Text>
              </MetaTag>
            </VStack>
          </Flex>
        </MetaTileBody>
      </MetaTile>
    </Link>
  );
};

export default QuestsDashboard;
