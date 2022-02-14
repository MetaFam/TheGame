import {
  ArrowUpIcon,
  Box,
  Button,
  Flex,
  Heading,
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
          Seeds are MetaGame’s labor token. <br />
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
          Here’s how it works (in Phase I*):
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
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{Content && <Content />}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
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
    <li>
      <b>🥉 Bronze Founder</b>
    </li>
    <li>
      <b>🥈 Silver Founder</b>
    </li>
    <li>
      <b>🥇 Golden Founder</b>
    </li>
    <li>
      <b>🔘 Platinum Founder</b>
    </li>
    <li>
      <b>💎 Diamond Founder</b>
    </li>
    <Text>
      We have a bunch of ideas on what these ranked league perks could be: from
      access to special channels & private AMAs, to interviews, unique NFTs &
      utmost respect.
    </Text>
    <Box>
      <Text fontWeight="bold">
        But, before publishing a list, we’d love to hear from all of you -
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
        my={2}
      >
        <details>
          <summary>💸 Spending Seeds</summary>
        </details>
      </Box>
      {isOpenSpending && (
        <Flex direction="column">
          <h3 id="1fed05ce-e544-4d19-98a9-92fce177479c">
            Things you can spend on now:
          </h3>
          <figure id="61f6cad0-606a-477f-979f-d0d1719c806f">
            <div>
              <span>💡</span>
            </div>
            <div>
              <em>
                <strong>
                  Note! You need to be a member to access any of these
                </strong>
              </em>
            </div>
          </figure>
          <ul id="e3ff1855-96e4-4538-a4f4-660b0443698e">
            <li>💸 to get a shout-out in the podcast.</li>
          </ul>
          <ul id="8b8de903-f9d7-4200-a8bb-6b32cf78a712">
            <li>💸 to have MetaGame tweet for you.</li>
          </ul>
          <ul id="8e0fbfcc-edcc-4a56-aa45-2c11e2266f60">
            <li>💸 to get a shout-out in the newsletter.</li>
          </ul>
          <ul id="482a2551-79b8-47fe-8166-87ba4d813396">
            <li>💸 to buy some limited edition merchandise.</li>
          </ul>
          <ul id="19a3ac99-c57b-4c47-bf55-02a1a830b306">
            <li>
              💸 to get products &amp; services from other players &amp; guilds.
            </li>
          </ul>
          <ul id="7e782159-a05f-45e5-a057-8fe318a99149">
            <li>
              💸 to get access to the
              <a href="https://tokenengineeringcommunity.github.io/website/">
                Token Engineering
              </a>
              course.
            </li>
          </ul>
          <ul id="50317e88-53ab-4440-8096-4b2556d9828d">
            <li>💸 to get some user testing sessions.</li>
          </ul>
          <ul id="fa5b656e-cec1-4731-9bd4-e389cfed8cbc">
            <li>
              💸 to
              <a href="https://www.effectivealtruism.org/">
                give away to good causes
              </a>
              . ☺️
            </li>
          </ul>
          <blockquote id="bdb42b19-8f0f-4a32-aae5-afffbf0046f8">
            Note: If you’re interested in spending your Seeds on any of this,
            ask about it; #
            <a href="https://discord.gg/cBq5Md6KTU">💸-spending-seeds</a>
          </blockquote>
          <h3 id="13af2a09-8eeb-4770-89f9-82d282110a1e">In the future:</h3>
          <ul id="bc33850e-e3c1-4679-8daa-b7eec5e9408f">
            <li>💸 for the subscription fee</li>
          </ul>
          <ul id="86f51c8d-3323-498a-8c0b-ccb7ed234c0f">
            <li>💸 for fees if buying/selling things with other tokens</li>
          </ul>
          <ul id="8fd11315-09fc-401c-a2bc-a6d6bd338ab2">
            <li>💸 to install an app in MetaGame</li>
          </ul>
          <ul id="4458231f-3267-41c3-8752-490408fec944">
            <li>💸 for posting quests &amp; raids - if in self-interest</li>
          </ul>
          <ul id="91fa0003-44ac-4d17-9fbb-7f0980900725">
            <li>💸 for access to courses</li>
          </ul>
          <ul id="fd2293b4-318e-443b-a66d-548fad6022fc">
            <li>💸 to pay for likes/upvotes</li>
          </ul>
          <ul id="46419470-924d-4a48-b9b9-42465b201459">
            <li>💸 to have your message displayed on the ticker</li>
          </ul>
          <ul id="b1c383c4-9e62-4279-a295-71007d7d1314">
            <li>
              💸 to buy themes, addons, in-game skins &amp; other cosmetics
            </li>
          </ul>
          <ul id="ab113a41-a01b-4ccf-920c-e44f7a9cd048">
            <li>💸 to post role openings or boost them</li>
          </ul>
          <ul id="34464c56-873b-431e-8d00-82757e8d6a9b">
            <li>💸 to boost your discovery position</li>
          </ul>
          <ul id="79d33652-a8c1-49dc-a29c-0d771692666b">
            <li>
              💸 to pay for other MetaFam services; like advising, building or
              shilling
            </li>
          </ul>
          <figure id="87a34ae6-4f66-4afc-8d47-372b939bbb7d">
            <a href="https://cdn.substack.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F3ae3bc90-a157-4057-9722-167f5645d6a4_500x281.png">
              <img src="https://cdn.substack.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F3ae3bc90-a157-4057-9722-167f5645d6a4_500x281.png" />
            </a>
          </figure>
        </Flex>
      )}
      <Box
        onClick={() => setIsOpenStaking(!isOpenStaking)}
        fontWeight="bold"
        my={2}
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
              As you might already know; in MetaGame, we don’t believe in rating
              humans.
            </strong>
          </p>
          <p id="f0776aa3-1544-47e3-8478-325f7c417601">
            We’re building a future we <em>want </em>to live in, and a future in
            which humans rate each other on a 1-5 star system is definitely
            <strong>not </strong>the kind of future we want to live in.
          </p>
          <p id="2f1ee454-08dd-46a5-942f-e0dd1cdbdaeb">
            Instead, players of MetaGame will be required to stake some of their
            skin in the game.
          </p>
          <ul id="f1b2d7d8-6539-4ccd-9fa7-4b2e2f1e0aea">
            <li>🥩 to take quests</li>
          </ul>
          <ul id="199d76c1-f45b-4c12-8580-3d2b03293732">
            <li>🥩 for your friend when onboarding them</li>
          </ul>
          <ul id="e591b64d-a4b7-49d8-ac84-b5b14e9c5ce8">
            <li>🥩 for your guild to enter</li>
          </ul>
          <ul id="78991b80-633a-48b3-934f-20527ccb73a3">
            <li>🥩 as collateral for your personal token</li>
          </ul>
          <ul id="2426303b-8da4-47d3-b0c2-25ccaf1d8f42">
            <li>🥩 to enter a contract with someone</li>
          </ul>
          <ul id="e6112447-d1ef-472f-a182-321c934be6d7">
            <li>🥩 when claiming the metafam.eth subdomain</li>
          </ul>
          <ul id="f5d3fb03-fc59-43ca-9df5-b88895047294">
            <li>🥩 when claiming the @metagame.wtf email</li>
          </ul>
          <ul id="2fbd07e4-98ac-4898-8505-8bf3822bac38">
            <li>🥩 on your project or product reviews</li>
          </ul>
          <ul id="d6eb4ccc-a178-46d7-a65f-73b4721e3c04">
            <li>
              🥩 on content curation (ponzinomics)
              <ul id="18c35ad5-9e0f-4f94-a1f3-445ee3a4dada">
                <li>
                  writing reviews &amp; recommendations will require staking
                </li>
              </ul>
            </li>
          </ul>
          <figure id="b0fb38dc-792f-4657-9380-a0979b29e956">
            <a href="https://cdn.substack.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F5a1c40a8-4983-4a95-81f1-3563b108de65_426x426.png">
              <img src="https://cdn.substack.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F5a1c40a8-4983-4a95-81f1-3563b108de65_426x426.png" />
            </a>
          </figure>
        </div>
      )}
      <Box
        onClick={() => setIsOpenPlanting(!isOpenPlanting)}
        fontWeight="bold"
        my={2}
      >
        <details>
          <summary>🌱 Planting Seeds</summary>
        </details>
      </Box>
      {isOpenPlanting && (
        <div>
          <p id="d808b202-fb7f-4513-b001-13a316afca4a">
            If you’re confused as to what “planting Seeds” means, it means using
            your Seeds by putting them into the
            <a href="https://polygon.balancer.fi/#/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081">
              <strong>Balancer pool aka the </strong>
            </a>
            <a href="https://polygon.balancer.fi/#/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081">
              <em>
                <strong>Seed plantation</strong>
              </em>
            </a>
            <a href="https://pools.balancer.exchange/#/pool/0xea05a15dbce2eb543ffda16950e95b2bd2e40d0e/">
              .
            </a>
          </p>
          <ul id="b7e0aeb5-9c83-4b3a-8f33-3ed50eaae1b7">
            <li>🌱 to be eligible for MetaFam-only limited edition merch</li>
          </ul>
          <ul id="3ee9dab1-4c1c-4a27-b7c4-dc9263d1e297">
            <li>🌱 to be eligible for random drops &amp; the Phase II token</li>
          </ul>
          <ul id="850847cd-0fc5-409f-986a-d14383af96d1">
            <li>🌱 to stay in the game as a patron</li>
          </ul>
          <ul id="3579b8ba-7633-4d42-b20f-fd19525d93c6">
            <li>🌱 to appear on the Patrons leaderboard</li>
          </ul>
          <ul id="a7557c81-368b-493d-a409-6a48c442d249">
            <li>🌱🌱 for guilds to appear higher on the leaderboard</li>
          </ul>
          <ul id="e4dc803c-fe00-4831-a2c1-d8e768a08d06">
            <li>🌱🌱🌱 to appear higher on the Patrons leaderboard 🙃</li>
          </ul>
        </div>
      )}
    </Flex>
  );
};

const BuyingAndSellingModal = () => (
  <div>
    <Box p={2} bgColor="gray.100" mb={2}>
      💡 Note: No need to buy Seeds to become a patron, you can just
      <em> water </em>them.
    </Box>
    <p id="9071de1e-5172-4257-93fe-f641e8f8aedd">
      If you want to buy some Seeds:
    </p>
    <UnorderedList>
      <ListItem>First, you’ll need to have some tokens on Polygon</ListItem>
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
        That’s it! Now go to your MetaMask, scroll down to “add custom token”
        &amp; paste the token address:
        0x30cf203b48edaa42c3b4918e955fed26cd012a3f
      </ListItem>
    </UnorderedList>
    <Text>If you want to sell your Seeds:</Text>
    <UnorderedList>
      <ListItem>
        You’ll still need some Matic on Polygon first.. Either
        <a href="https://googlethatforyou.com?q=how%20to%20buy%20matic%3F">
          buy some
        </a>
        or <a href="https://discord.gg/8THHVwfd">ask on discord</a>.
      </ListItem>
      <ListItem>Take the same steps as the buyers above 🙂</ListItem>
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
  },
  {
    title: 'PLANTING & WATERING SEEDS',
    description:
      'Being a good patron means regularly watering your Seeds, and planting new ones, every once in a while.',
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
  },
  {
    title: 'FAQ',
    description: 'Here are the most frequent questions about Seeds — answered.',
  },
];

export default SeedsPage;
