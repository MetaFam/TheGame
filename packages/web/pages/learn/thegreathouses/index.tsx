import {
  Flex,
  Grid,
  Heading,
  Link,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
} from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import { SquareImage } from 'components/SquareImage';
import React from 'react';
import { descriptions } from 'utils/menuLinks';
import { QuestChainGreatHousesDetails } from 'utils/questChains';

const TheGreatHousesPage: React.FC = () => (
  <PageContainer>
    <HeadComponent
      title="The Great Houses of MetaGame"
      description={descriptions.thegreathouses}
      url="https://my.metagame.wtf/thegreathouses"
    />
    <Heading mt={8} mb={8}>
      The Great Houses
    </Heading>
    <Text mb={8} maxW="xl" textAlign="center">
      The Great Houses are curated learning resources here to give you a meta
      overview of different fields of interest & send you on a journey of
      discovery.
    </Text>
    <Grid
      templateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr']}
      gap={{ base: 4, lg: 6, xl: 8 }}
      pb={24}
    >
      {Object.entries(QuestChainGreatHousesDetails).map(
        ([name, { title, description, image, difficulty, time }]) => (
          <Card
            key={title}
            {...{
              title,
              description,
              difficulty,
              time,
              link: `/learn/thegreathouses/${name}`,
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
  description: string;
  link: string;
  image: string;
};

const Card: React.FC<CardProps> = ({ title, description, link, image }) => (
  <Link role="group" _hover={{ textDecoration: 'none' }} href={link}>
    <MetaTile height="full" width="full">
      <MetaTileHeader>
        <SquareImage src={image} />
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

          <Text mb={2} h="3rem" fontSize="sm">
            {description}
          </Text>
        </Flex>
      </MetaTileBody>
    </MetaTile>
  </Link>
);

export default TheGreatHousesPage;
