import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  ListItem,
  LoadingState,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useDisclosure,
  VStack,
} from '@metafam/ds';
import Seeds from 'assets/menuIcon/seeds.svg';
import ModalCardBg from 'assets/modal-bg.png';
import Octopus from 'assets/octopus.png';
import SeedCardBg from 'assets/seed-card-bg.png';
import SeedsFlowChart from 'assets/seeds-flowchart.png';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';

const SeedsPage: React.FC = () => {
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);

  function handleBackClick() {
    topRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  if (router.isFallback) {
    return <LoadingState />;
  }

  return (
    <PageContainer py={8} px={4}>
      <VStack w="100%" spacing={{ base: 4, md: 8 }}>
        <HeadComponent
          title="MetaGame Seeds Page"
          description="seed description"
          url="https://my.metagame.wtf/seeds"
        />
        <Heading
          size="3xl"
          fontWeight={600}
          color="white"
          fontFamily="mono"
          pb={4}
          display="flex"
          flexDir="row"
          ref={topRef}
        >
          Seeds{' '}
          <Image height={10} width={10} src={Seeds} alignSelf="end" ml={2} />
        </Heading>

        <Flex fontSize={18} flexDirection="column">
          Seeds are MetaGame's labor token. <br />
          <br />
          People contribute towards creation of MetaGame, meanwhile generating
          XP & getting paid out on their XP generated - in Seeds.
          <br />
          <br />
          • All tokens are retroactive rewards for non-financial contributions.
          <br />
          • No tokens were minted for investment or speculation purposes.
          <br />
          • There was never any liquidity mining program, yet there is
          liquidity. 🙃
          <br />
          <br />
          Here's how it works (in Phase I*):
          <Image width="full" src={SeedsFlowChart} alignSelf="end" mt={4} />
        </Flex>
        {cardsData.map(({ title, description, Content }) => (
          <Card title={title} description={description} Content={Content} />
        ))}
        <Image src={Octopus} pt={8} />
        <Box pb={4}>
          <Button
            leftIcon={<ArrowUpIcon />}
            variant="ghost"
            color="whiteAlpha.700"
            bgColor="whiteAlpha.50"
            _hover={{ bg: 'whiteAlpha.200' }}
            _active={{ bg: 'whiteAlpha.200' }}
            onClick={handleBackClick}
          >
            Back to top
          </Button>
        </Box>
      </VStack>
    </PageContainer>
  );
};

type CardProps = {
  title: string;
  description: string;
  Content?: any;
};

const Card: React.FC<CardProps> = ({ title, description, Content }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      direction="column"
      bgColor="#110035"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="whiteAlpha.400"
      textColor="white"
      alignItems="center"
      textAlign="center"
      bgImage={SeedCardBg}
      placeContent="center"
      p={8}
      minH="3xs"
      key={title}
    >
      <Box borderTopRadius="lg">
        <Text fontSize="xl" fontWeight="bold" mt={1} mb={4}>
          {title.toUpperCase()}
        </Text>
        <Text mb={2}>{description}</Text>
        <Button
          variant="ghost"
          color="magenta"
          _hover={{ bg: '#FFFFFF11' }}
          _active={{ bg: '#FF000011' }}
          onClick={onOpen}
        >
          Learn more
        </Button>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent
          bgImg={ModalCardBg}
          bgPos="center"
          bgColor="purpleModalDark"
          bgRepeat="no-repeat"
          textColor="white"
          maxH="full"
          h="full"
          marginTop={0}
        >
          <ModalHeader fontSize={24} fontWeight="bold">
            {title.toUpperCase()}
            <ModalCloseButton color="purple" size="lg" top={4} />
          </ModalHeader>
          <ModalBody>{Content && <Content />}</ModalBody>
          <ModalFooter justifyContent="space-between">
            <IconButton
              ml="3"
              minW="4"
              variant="unstyled"
              size="xs"
              color="silver"
              icon={<ArrowLeftIcon />}
              _hover={{ color: 'white' }}
              onClick={console.log}
              aria-label="back"
            />
            <Button
              variant="ghost"
              color="violet "
              bgColor="whiteAlpha.50"
              _hover={{ bg: 'whiteAlpha.200' }}
              _active={{ bg: 'whiteAlpha.200' }}
              onClick={onClose}
            >
              Close Window
            </Button>
            <IconButton
              ml="3"
              minW="4"
              variant="unstyled"
              size="xs"
              color="silver"
              icon={<ArrowRightIcon />}
              _hover={{ color: 'white' }}
              onClick={console.log}
              aria-label="next"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

const GetRankedModal = () => (
  <Flex direction="column">
    <Text>
      As you might know already, the top ~56 of each; players & patrons, will be
      ranked in leagues. Well, leagues come with their perks!
    </Text>
    <UnorderedList>
      <ListItem>
        <b>🥉 Bronze Founder</b>
      </ListItem>
      <ListItem>
        <b>🥈 Silver Founder</b>
      </ListItem>
      <ListItem>
        <b>🥇 Golden Founder</b>
      </ListItem>
      <ListItem>
        <b>🔘 Platinum Founder</b>
      </ListItem>
      <ListItem>
        <b>💎 Diamond Founder</b>
      </ListItem>
    </UnorderedList>
    <Text>
      We have a bunch of ideas on what these ranked league perks could be: from
      access to special channels & private AMAs, to interviews, unique NFTs &
      utmost respect.
    </Text>
    <Box>
      <Text fontWeight="bold">
        But, before publishing a list, we'd love to hear from all of you -
      </Text>
      <Text decoration="underline">
        what do you think the ranked league perks should be? 🙃
      </Text>
    </Box>
  </Flex>
);

const UsefulnessOfSeedsModal = () => {
  const [isOpenSpending, setIsOpenSpending] = React.useState(false);
  const [isOpenStaking, setIsOpenStaking] = React.useState(false);
  const [isOpenPlanting, setIsOpenPlanting] = React.useState(false);

  return (
    <Flex direction="column">
      <p id="257def0e-fb04-4530-a5da-a53ad6b9d704">
        So far, the main thing Seeds are used for is rewarding contributors as a
        means of bootstrapping. Not a very promising usecase in terms of token
        value, we know!
      </p>
      <p id="97d3e56f-5fee-4ca0-9a91-c7a858b3a782">
        But, we're building an entire gamified socioeconomic system, so finding
        usecases for money shouldn't be much trouble 😁
      </p>
      <p id="ec8e7aa3-7f61-4f8e-b5f7-f4f335cd1e0a">
        So, lets look at some of the current &amp; potential ways of using
        Seeds!
      </p>
      <Box
        onClick={() => setIsOpenSpending(!isOpenSpending)}
        fontWeight="bold"
        my={4}
      >
        <details>
          <summary>💸 Spending Seeds</summary>
        </details>
      </Box>
      {isOpenSpending && (
        <Flex direction="column">
          <Text fontSize={16} fontWeight="bold" my={2}>
            Things you can spend on now:
          </Text>
          <Box p={2} bgColor="whiteAlpha.300" mb={2}>
            💡 Note: You need to be a member to access any of these
          </Box>
          <UnorderedList>
            <ListItem>💸 to get a shout-out in the podcast.</ListItem>
            <ListItem>💸 to have MetaGame tweet for you.</ListItem>
            <ListItem>💸 to get a shout-out in the newsletter.</ListItem>
            <ListItem>
              💸 to buy some ListItemmited edition merchandise.
            </ListItem>
            <ListItem>
              💸 to get products &amp; services from other players &amp; guilds.
            </ListItem>
            <ListItem>
              💸 to get access to the
              <Link
                ml={1}
                href="https://tokenengineeringcommunity.github.io/website/"
                isExternal
                color="gray.500"
                textDecoration="underline"
                mr={1}
              >
                Token Engineering
              </Link>
              course.
            </ListItem>
            <ListItem>💸 to get some user testing sessions.</ListItem>
            <ListItem>
              💸 to
              <Link
                ml={1}
                isExternal
                color="gray.500"
                textDecoration="underline"
                mr={1}
                href="https://www.effectivealtruism.org/"
              >
                give away to good causes
              </Link>
              . ☺️
            </ListItem>
          </UnorderedList>
          <Box p={2} bgColor="whiteAlpha.300" my={2}>
            💡 Note: If you're interested in spending your Seeds on any of this,
            ask about it; #
            <Link
              ml={1}
              href="https://discord.gg/cBq5Md6KTU"
              isExternal
              textColor="gray.500"
              textDecoration="underline"
              mr={1}
            >
              💸-spending-seeds
            </Link>
          </Box>
          <Text fontSize={16} fontWeight="bold" my={2}>
            In the future:
          </Text>
          <UnorderedList mb={4}>
            <ListItem>💸 for the subscription fee</ListItem>
            <ListItem>
              💸 for fees if buying/selling things with other tokens
            </ListItem>
            <ListItem>💸 to install an app in MetaGame</ListItem>
            <ListItem>
              💸 for posting quests &amp; raids - if in self-interest
            </ListItem>
            <ListItem>💸 for access to courses</ListItem>
            <ListItem>💸 to pay for likes/upvotes</ListItem>
            <ListItem>💸 to have your message displayed on the ticker</ListItem>
            <ListItem>
              💸 to buy themes, addons, in-game skins &amp; other cosmetics
            </ListItem>
            <ListItem>💸 to post role openings or boost them</ListItem>
            <ListItem>💸 to boost your discovery position</ListItem>
            <ListItem>
              💸 to pay for other MetaFam services; like advising, building or
              shilling
            </ListItem>
          </UnorderedList>
          <img src="https://cdn.substack.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F3ae3bc90-a157-4057-9722-167f5645d6a4_500x281.png" />
        </Flex>
      )}
      <Box
        onClick={() => setIsOpenStaking(!isOpenStaking)}
        fontWeight="bold"
        my={4}
      >
        <details>
          <summary>🥩 Staking Seeds</summary>
        </details>
      </Box>
      {isOpenStaking && (
        <div>
          <p id="b8958fc8-9ace-4a75-bfe0-b2f885ed02bb">
            Here are some of the things people might be required to stake Seeds
            for.
          </p>
          <p id="625f823e-7934-4f0d-9aef-4e12a223c3ce">
            <strong>
              As you might already know; in MetaGame, we don't believe in rating
              humans.
            </strong>
          </p>
          <p id="f0776aa3-1544-47e3-8478-325f7c417601">
            We're building a future we <em>want </em>to live in, and a future in
            which humans rate each other on a 1-5 star system is definitely
            <strong> not </strong>the kind of future we want to live in.
          </p>
          <p id="2f1ee454-08dd-46a5-942f-e0dd1cdbdaeb">
            Instead, players of MetaGame will be required to stake some of their
            skin in the game.
          </p>
          <UnorderedList mb={4}>
            <ListItem>🥩 to take quests</ListItem>
            <ListItem>🥩 for your friend when onboarding them</ListItem>
            <ListItem>🥩 for your guild to enter</ListItem>
            <ListItem>🥩 as collateral for your personal token</ListItem>
            <ListItem>🥩 to enter a contract with someone</ListItem>
            <ListItem>🥩 when claiming the metafam.eth subdomain</ListItem>
            <ListItem>🥩 when claiming the @metagame.wtf email</ListItem>
            <ListItem>🥩 on your project or product reviews</ListItem>
            <ListItem>
              🥩 on content curation (ponzinomics)
              <ul id="b518575e-5a2f-454a-b7b5-9e6a52905855">
                <ListItem ml={4}>
                  writing reviews &amp; recommendations will require staking
                </ListItem>
              </ul>
            </ListItem>
          </UnorderedList>
          <img src="https://cdn.substack.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F5a1c40a8-4983-4a95-81f1-3563b108de65_426x426.png" />
        </div>
      )}
      <Box
        onClick={() => setIsOpenPlanting(!isOpenPlanting)}
        fontWeight="bold"
        my={4}
      >
        <details>
          <summary>🌱 Planting Seeds</summary>
        </details>
      </Box>
      {isOpenPlanting && (
        <div>
          <p id="d808b202-fb7f-4513-b001-13a316afca4a">
            If you're confused as to what “planting Seeds” means, it means using
            your Seeds by putting them into the
            <Link
              ml={1}
              isExternal
              color="gray.500"
              textDecoration="underline"
              mr={1}
              href="https://polygon.balancer.fi/#/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081"
            >
              <strong>
                Balancer pool aka the <em>Seed plantation.</em>
              </strong>
            </Link>
          </p>
          <UnorderedList mb={4}>
            <ListItem>
              🌱 to be eligible for MetaFam-only limited edition merch
            </ListItem>
            <ListItem>
              🌱 to be eligible for random drops &amp; the Phase II token
            </ListItem>
            <ListItem>🌱 to stay in the game as a patron</ListItem>
            <ListItem>🌱 to appear on the Patrons leaderboard</ListItem>
            <ListItem>
              🌱🌱 for guilds to appear higher on the leaderboard
            </ListItem>
            <ListItem>
              🌱🌱🌱 to appear higher on the Patrons leaderboard 🙃
            </ListItem>
          </UnorderedList>
        </div>
      )}
    </Flex>
  );
};

const BuyingAndSellingModal = () => (
  <div>
    <Box p={2} bgColor="whiteAlpha.300" mb={2}>
      💡 Note: No need to buy Seeds to become a patron, you can just
      <em> water </em>them.
    </Box>
    <p id="9071de1e-5172-4257-93fe-f641e8f8aedd">
      If you want to buy some Seeds:
    </p>
    <UnorderedList>
      <ListItem>First, you'll need to have some tokens on Polygon</ListItem>
      <ListItem>
        Then you can go to the
        <Link
          ml={1}
          href="https://polygon.balancer.fi/#/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081"
          isExternal
          color="green.300"
          textDecoration="underline"
          mr={1}
        >
          Seeds plantation
        </Link>
        &amp; click the “trade” tab middle top
        <ul id="b518575e-5a2f-454a-b7b5-9e6a52905855">
          <ListItem ml={4}>
            Seeds not showing up? Search by
            0x30cf203b48edaa42c3b4918e955fed26cd012a3f
          </ListItem>
        </ul>
      </ListItem>
      <ListItem>
        Pick the amount you want to buy &amp; watch for slippage
      </ListItem>
      <ListItem>Preview trade, confirm &amp; swap 🙂</ListItem>
      <ListItem>
        That's it! Now go to your MetaMask, scroll down to “add custom token”
        &amp; paste the token address:
        0x30cf203b48edaa42c3b4918e955fed26cd012a3f
      </ListItem>
    </UnorderedList>
    <Text>If you want to sell your Seeds:</Text>
    <UnorderedList>
      <ListItem>
        You'll still need some Matic on Polygon first.. Either
        <Link
          ml={1}
          isExternal
          color="gray.500"
          textDecoration="underline"
          mr={1}
          href="https://googlethatforyou.com?q=how%20to%20buy%20matic%3F"
        >
          buy some
        </Link>
        or
        <Link
          ml={1}
          isExternal
          color="gray.500"
          textDecoration="underline"
          mr={1}
          href="https://discord.gg/8THHVwfd"
        >
          ask on discord
        </Link>
        .
      </ListItem>
      <ListItem>Take the same steps as the buyers above 🙂</ListItem>
    </UnorderedList>
  </div>
);

const BecomeAPatron = () => (
  <div>
    <p>
      Though some usecases exist, they're not meaningfully contributing to the
      treasury yet &amp; the rest are just ideas. Main reasons you'd want to
      become a patron right now:
    </p>
    <UnorderedList>
      <ListItem>
        <strong>
          Because you love the idea of MetaGame &amp; want to see it succeed.
        </strong>
        <ul>
          <ListItem ml={4}>
            <Link
              ml={1}
              isExternal
              color="gray.500"
              textDecoration="underline"
              mr={1}
              href="https://wiki.metagame.wtf/docs/enter-metagame/why-patron"
            >
              Reading about it made you go “this is everything I've ever wanted”
              or at least “fuck yeah, this is epic!”
            </Link>
          </ListItem>
        </ul>
      </ListItem>
      <ListItem>
        You want to become a part of MetaGame but you don't have time to
        actively contribute.
      </ListItem>
      <ListItem>
        Not convinced?
        <ul>
          <ListItem ml={4}>Maybe watch this video</ListItem>
        </ul>
      </ListItem>
    </UnorderedList>
    <Box my={2}>
      <iframe
        width="100%"
        src="https://www.youtube.com/embed/CYuwpR8CLXY?feature=oembed"
      ></iframe>
    </Box>
    <p>There are 2 ways to become a patron:</p>
    <UnorderedList>
      <ListItem>
        Join the
        <Link
          ml={1}
          href="https://metagame.substack.com/p/calling-for-rain"
          isExternal
          color="gray.500"
          textDecoration="underline"
          mr={1}
        >
          Seed Fund raise
        </Link>
      </ListItem>
      <ListItem>Water the Seeds yourself 👇</ListItem>
    </UnorderedList>
  </div>
);

const PlantingAndWatering = () => (
  <div>
    <p>So you've decided to become a patron?</p>
    <Box fontWeight="bold" my={4}>
      First, you'll need some tokens on Polygon.
    </Box>
    <UnorderedList>
      <ListItem>Ideally, it would be WETH &amp; RAI.</ListItem>
      <ListItem>
        If you only got Matic, no worries, you can just swap it for WETH &amp;
        RAI.
      </ListItem>
      <ListItem>
        If you don't have anything...
        <ul>
          <ListItem ml={4}>
            Either
            <Link
              ml={1}
              href="https://wallet.polygon.technology/bridge"
              isExternal
              color="gray.500"
              textDecoration="underline"
              mr={1}
            >
              bridge
            </Link>
            some from mainnet
          </ListItem>
        </ul>
        <ul>
          <ListItem ml={4}>
            Or obtain Matic in
            <Link
              ml={1}
              href="https://googlethatforyou.com?q=how%20to%20buy%20matic%3F"
              isExternal
              color="gray.500"
              textDecoration="underline"
              mr={1}
            >
              {' '}
              any number of ways
            </Link>
          </ListItem>
        </ul>
      </ListItem>
    </UnorderedList>
    <Box fontWeight="bold" my={4}>
      Then, you'll need to use WETH &amp; RAI to
      <Link
        ml={1}
        href="https://polygon.balancer.fi/#/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081"
        isExternal
        color="gray.500"
        textDecoration="underline"
        mr={1}
      >
        water the Seeds
      </Link>
      .
    </Box>
    <UnorderedList>
      <ListItem>
        How much should you water them?
        <ul>
          <ListItem ml={4}>
            The minimal requirement to join as a patron is 8pSeeds which is
            roughly $150.
          </ListItem>
        </ul>
        <ul>
          <ListItem ml={4}>
            Beyond that, you are free to water them however much you want if you
            wish a high position in the ranked league of patrons, but be careful
            not to slip.
          </ListItem>
        </ul>
      </ListItem>
      <ListItem>
        After that, you will need to make sure to water them once every so
        often. You will be notified over
        <Link
          ml={1}
          isExternal
          color="gray.500"
          textDecoration="underline"
          mr={1}
          href="https://metagame.substack.com/"
        >
          the newsletter
        </Link>{' '}
        or we will do it for you, if you join the Seed Fund 🙃
        <ul>
          <ListItem ml={4}>
            The number of patrons in
            <Link
              ml={1}
              isExternal
              color="gray.500"
              textDecoration="underline"
              mr={1}
              href="https://wiki.metagame.wtf/docs/how-does-it-work/phases-of-metagame"
            >
              <em>Phase I</em>
            </Link>
            is limited to 150, meaning, you will need to be watering them at
            least as much as the 150th person on the leaderboard if you wish to
            remain a patron until the end of
            <em>
              <Link
                ml={1}
                isExternal
                color="gray.500"
                textDecoration="underline"
                mr={1}
                href="https://wiki.metagame.wtf/docs/how-does-it-work/phases-of-metagame"
              >
                Phase I
              </Link>
            </em>
            (2023).
          </ListItem>
        </ul>
        <ul>
          <ListItem ml={4}>
            Do note that even if you drop off the leaderboard, you will still
            get your single digit season achievement NFT for being an early
            patron &amp; etched in the lore as well as remain among the first
            ones to get invited back in Phase II when MetaGame scales above
            <Link
              ml={1}
              isExternal
              color="gray.500"
              textDecoration="underline"
              mr={1}
              href="https://wiki.metagame.wtf/docs/wtf-is-metagame/the-300-of-metagame"
            >
              <em>The 300 of MetaGame</em>
            </Link>
            .
          </ListItem>
        </ul>
      </ListItem>
    </UnorderedList>
  </div>
);

const JoinTheFund = () => (
  <div>
    <p>Wish to skip the hassle of watering Seeds on your own?</p>
    <p>No worries, we got you covered!</p>
    <p>
      We're making it easy for people to do just that by launching the Seed Fund
      DAO.
    </p>
    <p>
      You will only need to approve of MetaGame's monthly progress reports &amp;
      we'll be taking care of the rest. No more carrying the buckets from the
      well to the fields!
    </p>
    <UnorderedList>
      <ListItem>Add some mainnet Ether</ListItem>
      <ListItem>Approve our progress &amp; proposals</ListItem>
      <ListItem>We water the Seed plantation for you</ListItem>
      <ListItem>
        <Link
          ml={1}
          isExternal
          color="gray.500"
          textDecoration="underline"
          mr={1}
          href="https://wiki.metagame.wtf/docs/wtf-is-metagame/the-300-of-metagame"
        >
          Join here
        </Link>{' '}
        if interested 👀
      </ListItem>
    </UnorderedList>
  </div>
);

const cardsData = [
  {
    title: 'Usefulness of Seeds',
    description:
      'Currently used to reward players who actively contribute to building MetaGame, in the future seeds will be so much more useful!',
    Content: UsefulnessOfSeedsModal,
  },
  {
    title: 'BUYING & SELLING Seeds',
    description: 'Trading Seeds is easy! Just follow these few simple steps.',
    Content: BuyingAndSellingModal,
  },
  {
    title: 'BECOME A PATRON',
    description:
      "Love the idea of MetaGame & want to see it succeed, but don't have time or skill to actively contribute? We've got you covered.",
    Content: BecomeAPatron,
  },
  {
    title: 'PLANTING & WATERING SEEDS',
    description:
      'Being a good patron means regularly watering your Seeds, and planting new ones, every once in a while.',
    Content: PlantingAndWatering,
  },
  {
    title: 'GET RANKED!',
    description:
      'Top 56 players are ranked in leagues. The higher you reach, the more fame, glory and perks await you!',
    Content: GetRankedModal,
  },
  {
    title: 'JOIN THE SEED FUND',
    description:
      "Don't feel like watering Seeds yourself? Worry not, you can still be a caring patron, and leave all the work to us.",
    Content: JoinTheFund,
  },
  {
    title: 'FAQ',
    description: 'Here are the most frequent questions about Seeds — answered.',
  },
];

export default SeedsPage;
