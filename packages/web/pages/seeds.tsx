import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Image,
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
import { PageContainer } from 'components/Container';
import { Plant } from 'components/Seeds/Plant';
import { Trade } from 'components/Seeds/Trade';
import { Water } from 'components/Seeds/Water';
import { HeadComponent } from 'components/Seo';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from 'react-icons/hi';

const CustomTab = ({ children }: { children: React.ReactNode }) => (
  <Tab
    w="full"
    _selected={{ color: 'white', borderBottom: '2px inset white' }} // Customize selected tab style
    color="gray.400" // Normal tab text color
    _focus={{ boxShadow: 'none', backgroundColor: 'transparent' }} // Remove focus border
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
  <AccordionItem>
    {({ isExpanded }) => (
      <>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {question}
          </Box>
          {isExpanded ? <HiOutlineMinusCircle /> : <HiOutlinePlusCircle />}
        </AccordionButton>
        <AccordionPanel>{answer}</AccordionPanel>
      </>
    )}
  </AccordionItem>
);

const SEEDsPage: React.FC = () => {
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);
  const [paddingTop, setPaddingTop] = useState(0);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imageRef.current) {
      const height = imageRef.current.offsetHeight - 100;
      setPaddingTop(height);
    }
  }, [imageRef]);

  const updatePaddingTop = () => {
    if (imageRef.current) {
      const height = imageRef.current.offsetHeight - 100;
      setPaddingTop(height);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updatePaddingTop);
    updatePaddingTop();

    return () => window.removeEventListener('resize', updatePaddingTop);
  }, []);

  if (router.isFallback) {
    return <LoadingState />;
  }

  return (
    <PageContainer p={0} bgColor="#080219">
      <VStack h="full" w="full" spacing={{ base: 4, md: 20 }}>
        <HeadComponent
          title="Seeds Page"
          description="Seeds are MetaGame’s labor token. People contribute towards creation of MetaGame, meanwhile generating XP &amp; getting paid out in Seeds proportional to their gained XP. Find out more."
          url="https://metagame.wtf/seeds"
        />

        <Image
          ref={imageRef}
          pos="absolute"
          src={Background.src}
          alt="Seeds"
          w="full"
          mx="auto"
          mb={8}
          top="-50px"
          onLoad={() => {
            if (imageRef.current) {
              const height = imageRef.current.offsetHeight;
              setPaddingTop(height);
            }
          }}
        />

        <Stack
          w="full"
          maxW="3xl"
          ref={topRef}
          pt={`${paddingTop}px`}
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
          <Text>
            Seeds are lifeblood of MetaGame; it’s how contributors get rewarded,
            it’s how patrons contribute, how we curate & how we reward each
            other."
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

          <Accordion allowMultiple defaultIndex={[0]}>
            <FAQItem
              question="WTF is planting & watering?"
              answer="You are basically dollar-cost-averaging into a liquidity
                    pool containing 60% Seeds, 20% ETH & 20% RAI. This allows
                    creators of MetaGame to sell their Seeds & pay their bills,
                    without decreasing the value of Seeds. Saplings are the pool
                    token & your funds are used to create more of them by adding
                    your funds as liquidity. Trees are what replaces Seeds in
                    the next phase of MetaGame, when all those who planted &
                    watered Seeds are rewarded. Read more about MetaGame’s
                    tokenomics in the Purplepaper."
            />
            <FAQItem
              question="What are Seeds & pSeeds used for?"
              answer="Seeds are MetaGame’s labor token & pSeeds are the liquidity
                    pool token. All Seeds are retroactive rewards for work that
                    already happened. So far, the main usecase for Seeds has
                    been bootstrapping MetaGame. Even before they were available
                    on the market, we used Seeds to reward contributors. The
                    need for pSeeds came from the need of Seed holders to pay
                    their bills. pSeeds are currently used as the membership
                    token for patrons (passive contributors) and for creating
                    quests on the platform. Soon, they will also be used for:
                    Upvoting playbooks & quests Staking on reputation MetaGame’s
                    services at a discount"
            />
            <FAQItem
              question="Are there any perks?"
              answer="Yes! Besides getting to join the community & use the tokens
                    on the platform - there are many perks to be unlocked by
                    becoming a patron. The patrons leaderboard is split into 5
                    ranked leagues, with each league having it’s own unique set
                    of perks as well as including perks of the league below. You
                    can go check out the ranked league requirements & perks on
                    the patrons leaderboard."
            />
            <FAQItem
              question="Is there a better way to become a patron?"
              answer="There are multiple ways to become a patron - which one is
                    better depends on your wallet stats & wants. All ways to
                    become a patron: Subscribe via this page (easiest way for
                    low stake) Apply to buy directly from the multisig ($2k
                    minimum) Manually generate pSeeds & get an NFT (Patron’s
                    Path)"
            />
            <FAQItem
              question="Can you give me some token stats?"
              answer="Sure! Here are some stats: Market cap: $150k Liquidity:
                    $120k Supply cap: 110k Total distributed: 90k"
            />
            <FAQItem
              question="What comes after Seeds?"
              answer="Both Seed & pSeed tokens will be retired once we enter the
                    next phase of MetaGame. All liquidity will be drained, and
                    token holders will receive Tree NFTs. It is said that Trees
                    will be yield bearing tokens, that Mone will grow on Trees.
                    But not much is known about these Tree NFTs, aside that
                    pSeed holders will be much more handsomely rewarded in the
                    transition - their Trees more plentiful & unique."
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
            <Text
              fontStyle="normal"
              fontWeight="600"
              lineHeight="24px" /* 114.286% */
            >
              Still have questions?
            </Text>
            <Text
              color="gray.400"
              textAlign="center"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="28px" /* 140% */
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
