import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Image as ChakraImage,
  Link,
  LoadingState,
  MetaHeading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@metafam/ds';
import Background from 'assets/seeds/background.png';
import { MarkdownViewer } from 'components/MarkdownViewer';
import { Plant } from 'components/Seeds/Plant';
import { Trade } from 'components/Seeds/Trade';
import { Water } from 'components/Seeds/Water';
import { HeadComponent } from 'components/Seo';
import { useRouter } from 'next/router';
import React, { lazy,useEffect, useRef, useState } from 'react';
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from 'react-icons/hi';

const PageContainer = lazy(() => import('components/Container'));

const CustomTab = ({ children }: { children: React.ReactNode }) => (
  <Tab
    w="full"
    _selected={{ color: 'white', borderBottom: '2px inset #A48DF3' }}
    color="gray.400"
    _focus={{ boxShadow: 'none', backgroundColor: 'transparent' }}
    mb={0}
    fontWeight={600}
  >
    {children}
  </Tab>
);

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => (
  <AccordionItem py={3}>
    {({ isExpanded }) => (
      <>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontWeight="semibold">
            {question}
          </Box>
          {isExpanded ? <HiOutlineMinusCircle /> : <HiOutlinePlusCircle />}
        </AccordionButton>
        <AccordionPanel>
          <MarkdownViewer color="gray.400">{answer}</MarkdownViewer>
        </AccordionPanel>
      </>
    )}
  </AccordionItem>
);

const SEEDsPage: React.FC = () => {
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = Background.src;
    img.onload = () => setIsImageLoaded(true);
  }, []);

  if (router.isFallback || !isImageLoaded) {
    return <LoadingState />;
  }

  return (
    <PageContainer p={0}>
      <VStack h="full" w="full" spacing={{ base: 4 }} px={3}>
        <HeadComponent
          title="Seeds"
          description="Seeds are MetaGame’s labor token. People contribute towards creation of MetaGame, meanwhile generating XP &amp; getting paid out in Seeds proportional to their gained XP. Find out more."
          url="https://metagame.wtf/seeds"
        />

        <Box position="relative" w="full">
          <ChakraImage src={Background.src} alt="Seeds" w="full" />
          <Box
            position="absolute"
            left={0}
            right={0}
            height={40}
            bg="linear-gradient(to bottom, #080219 0%, transparent 100%)"
          />
        </Box>
        <Stack
          w="full"
          maxW="3xl"
          ref={topRef}
          mt={{
            base: -8,
            sm: -38,
          }}
          zIndex={1}
          gap={8}
          pb={20}
        >
          <MetaHeading
            fontSize="8xl"
            fontWeight={600}
            color="white"
            fontFamily="body"
            mb={[4, 4, 4, 12]}
            display="flex"
            flexDir="row"
            justifyContent="center"
            position="relative"
          >
            Seeds
          </MetaHeading>
          <Text textAlign="center">
            A memecoin with a purpose - Seeds are how players get rewarded & how
            patrons contribute. <br /> Seeds will be used for membership fees,
            staking reputation and upvoting content & quests.
          </Text>

          <Tabs align="center">
            <TabList
              borderBottom="1px solid #2D2D2D"
              justifyContent="space-between"
              w="full"
            >
              <CustomTab>Water</CustomTab>
              <CustomTab>Plant</CustomTab>
              <CustomTab>Trade</CustomTab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Water />
              </TabPanel>
              <TabPanel>
                <Plant />
              </TabPanel>
              <TabPanel>
                <Trade />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <MetaHeading
            fontSize="4xl"
            fontWeight={600}
            color="white"
            fontFamily="body"
            mb={[4, 4, 4, 12]}
            display="flex"
            flexDir="row"
            justifyContent="center"
            position="relative"
          >
            Frequently asked questions
          </MetaHeading>

          <Accordion allowMultiple borderColor="whiteAlpha.400">
            <FAQItem
              question="WTF is planting & watering?"
              answer={`Planting & watering Seeds means adding Seeds, Ether & RAI into the liquidity pool. By subscribing, you are dollar-cost-averaging into the liquidity pool that’s made up of 60% Seeds, 20% ETH & 20% RAI.  
              By planting or watering Seeds, you will receive pSeed tokens - representing your stake in the liquidity pool. You will be able to use pSeeds on the platform, and you’ll receive the Tree NFTs as soon as we enter Phase II.  
              Read more in The Purplepaper.
              `}
            />
            <FAQItem
              question="What are Seeds & pSeeds used for?"
              answer={`Seeds are MetaGame’s labor token & pSeeds are the liquidity
                    pool token. All Seeds are retroactive rewards for work that already happened.  
                    So far, the main usecase for Seeds has
                    been bootstrapping MetaGame. Even before they were available
                    on the market, we used Seeds to reward contributors. The
                    need for pSeeds came from the need of Seed holders to pay
                    their bills.  
                    pSeeds are currently used as the membership
                    token for patrons (passive contributors) and for creating
                    quests on the platform.  
                    Soon, they will also be used for:   
                    - Upvoting playbooks & quests  
                    - Staking on reputation  
                    - MetaGame’s services at a discount`}
            />
            <FAQItem
              question="Are there any perks?"
              answer={`Yes! Besides getting to join the community & use the tokens on the platform - there are many perks to be unlocked by becoming a patron.  
              The patrons leaderboard is split into 5 ranked leagues, with each league having it’s own unique set of perks as well as including perks of the league below.  
              You can go check out the ranked league requirements & perks on the [patrons leaderboard](https://metagame.wtf/patrons).`}
            />
            <FAQItem
              question="Is there a better way to become a patron?"
              answer={`There are multiple ways to become a patron - which one is better depends on your wallet stats & wants.  
              All ways to become a patron:  
              - Subscribe via this page (easiest way for low stake)  
              - [Apply to buy directly from the multisig](https://tally.so/r/w4Jb6r) ($2k minimum)  
              - Manually generate pSeeds & get an NFT (Patron’s Path)
              `}
            />
            <FAQItem
              question="Can you give me some token stats?"
              answer={`Sure! Here are some stats:  
              - Market cap: $150k  
              - Liquidity: $120k  
              - Supply cap: 110k  
              - Total distributed: 90k`}
            />
            <FAQItem
              question="What comes after Seeds?"
              answer={`Both Seed & pSeed tokens will be retired once we enter the
              next phase of MetaGame. All liquidity will be drained, and
              token holders will receive Tree NFTs.  
              It is said that Trees will be yield bearing tokens, that Mone will grow on Trees.
              But not much is known about these Tree NFTs, aside that
              pSeed holders will be much more handsomely rewarded in the
              transition - their Trees more plentiful & unique.`}
            />
          </Accordion>

          <Stack
            pb={4}
            justifyContent="center"
            padding={4}
            alignItems="center"
            spacing={4}
            alignSelf="stretch"
            borderRadius="2xl"
            bg="whiteAlpha.100"
          >
            <Text fontStyle="normal" fontWeight="600" lineHeight="24px">
              Still have questions?
            </Text>
            <Text
              color="gray.400"
              textAlign="center"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="28px"
            >
              Can’t find the answer you’re looking for?
            </Text>
            <Button
              as={Link}
              href="https://discord.gg/WEUpcvUA"
              target="_blank"
              size="md"
              variant="outline"
            >
              Ask anything on Discord
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </PageContainer>
  );
};

export default SEEDsPage;
