import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
} from '@metafam/ds';
import CommonTierNFTImg from 'assets/nft-common-tier_600x600.jpg';
import EpicTierNFTImg from 'assets/nft-epic-tier_600x600.jpg';
import RareTierNFTImg from 'assets/nft-rare-tier_600x600.jpg';

export const TiersPerks: React.FC = () => (
  <Container
    as="section"
    className="mg-guild-join-section" // CSS class defined in packages/web/pages/Guild/Join/index.tsx
  >
    <Heading
      as="h2"
      color="white"
      fontFamily="mono"
      fontWeight={700}
      mb={[4, 4, 4, 12]}
    >
      Tiers &amp; Perks
    </Heading>

    {/*
      The three items in SimpleGrid are stacked cards until the md breakpoint, 
      go to full-width rows [image|text text text] at md, 
      then to proper cards in 3 columns at lg
    */}
    <SimpleGrid
      columns={{ base: 1, md: 1, lg: 3 }}
      spacing={8}
      mb={6}
      width="100%"
    >
      <Box
        className="mg-guild-join-card-bg" // CSS class defined in packages/web/pages/Guild/Join/index.tsx
        maxWidth={{ base: 'md', md: '100%' }}
        mx="auto"
        width="100%"
      >
        <Flex direction={{ base: 'column', md: 'row', lg: 'column' }}>
          <Image
            alt="The MetaManifesto on a pedestal, illuminated by pink light"
            borderTopLeftRadius={8}
            borderTopRightRadius={{ base: 8, md: 0, lg: 8 }}
            borderBottomLeftRadius={{ base: 0, md: 8, lg: 0 }}
            src={CommonTierNFTImg}
            width={{ base: 'md', md: '16rem', lg: '100%' }}
          />
          <Box flex="auto">
            <Text
              backgroundColor="rgba(6, 255, 161, 0.5)"
              borderTopRightRadius={{ base: 0, md: 8, lg: 0 }}
              color="white"
              fontFamily="mono"
              fontSize="lg"
              fontWeight={200}
              textAlign="center"
            >
              Common
            </Text>
            <UnorderedList mx={12} my={6}>
              <ListItem>Your guild page in MetaGame</ListItem>
              <ListItem>A guild2guild meetup</ListItem>
              <ListItem>Collaboration opportunities</ListItem>
              <ListItem>Discord bot (optional)</ListItem>
            </UnorderedList>
          </Box>
        </Flex>
      </Box>

      <Box
        className="mg-guild-join-card-bg"
        maxWidth={{ base: 'md', md: '100%' }}
        mx="auto"
        width="100%"
      >
        <Flex direction={{ base: 'column', md: 'row', lg: 'column' }}>
          <Image
            alt="The MetaManifesto on a glowing pedestal"
            borderTopLeftRadius={8}
            borderTopRightRadius={{ base: 8, md: 0, lg: 8 }}
            borderBottomLeftRadius={{ base: 0, md: 8, lg: 0 }}
            src={RareTierNFTImg}
            width={{ base: 'md', md: '16rem', lg: '100%' }}
          />
          <Box flex="auto">
            <Text
              backgroundColor="rgba(47, 128, 237, 0.5)"
              borderTopRightRadius={{ base: 0, md: 8, lg: 0 }}
              color="white"
              fontFamily="mono"
              fontSize="lg"
              fontWeight={200}
              textAlign="center"
            >
              Rare
            </Text>
            <UnorderedList mx={12} my={6}>
              <ListItem>A Twitter thread about you</ListItem>
              <ListItem>Added to the follow list on Twitter</ListItem>
              <ListItem>Your news in our newsletter</ListItem>
              <ListItem>Your announcements inside MetaGame</ListItem>
              <ListItem>Among the Founding Guilds of MetaGame</ListItem>
            </UnorderedList>
          </Box>
        </Flex>
      </Box>

      <Box
        className="mg-guild-join-card-bg"
        maxWidth={{ base: 'md', md: '100%' }}
        mx="auto"
        width="100%"
      >
        <Flex direction={{ base: 'column', md: 'row', lg: 'column' }}>
          <Image
            alt="The MetaManifesto on a pedestal that is glowing with a pink light"
            borderTopLeftRadius={8}
            borderTopRightRadius={{ base: 8, md: 0, lg: 8 }}
            borderBottomLeftRadius={{ base: 0, md: 8, lg: 0 }}
            src={EpicTierNFTImg}
            width={{ base: 'md', md: '16rem', lg: '100%' }}
          />
          <Box flex="auto">
            <Text
              backgroundColor="rgba(90, 50, 230, 0.5)"
              borderTopRightRadius={{ base: 0, md: 8, lg: 0 }}
              color="white"
              fontFamily="mono"
              fontSize="lg"
              fontWeight={200}
              textAlign="center"
            >
              Epic
            </Text>
            <UnorderedList mx={12} my={6}>
              <ListItem>A member of MetaAlliance</ListItem>
              <ListItem>Cryptovoxels placement</ListItem>
              <ListItem>Special newsletter</ListItem>
              <ListItem>Your promo in MetaGame shillpack</ListItem>
              <ListItem>Branch in The Onboarding Game</ListItem>
              <ListItem>Support for your instance of MetaOS</ListItem>
            </UnorderedList>
          </Box>
        </Flex>
      </Box>
    </SimpleGrid>

    <Container>
      <Box
        as="p"
        className="mg-guild-join-card-bg"
        maxW="md"
        mx="auto"
        p={2}
        textAlign="center"
      >
        Note: Higher tiers include previous tiers’ perks!
      </Box>
    </Container>
  </Container>
);
