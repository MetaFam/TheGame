import {
  Box,
  Center,
  Flex,
  Image,
  Link,
  ListItem,
  Text,
  UnorderedList,
  useBoolean,
} from '@metafam/ds';

const CollapsableText: React.FC<{ title: string }> = ({ title, children }) => {
  const [isOpen, { toggle }] = useBoolean(false);
  return (
    <>
      <Box onClick={toggle} my={4} cursor="pointer">
        <details>
          <summary>{title}</summary>
        </details>
      </Box>
      {isOpen && children}
    </>
  );
};

export const WTFisXP = () => (
  <Flex direction="column">
    <Text mb={2}>
      An XP or “experience point” is a unit of contribution to MetaGame. In
      essence, it’s an accounting system for value creation.
    </Text>

    <Text mb={2}>
      Whether it’s completing quests, writing useful things on
      <Link
        ml={1}
        href="//forum.metagame.wtf"
        isExternal
        color="gray.500"
        textDecoration="underline"
      >
        the forum
      </Link>
      , or laying down code on
      <Link
        href="//github.com/MetaFam/"
        isExternal
        color="gray.500"
        textDecoration="underline"
        mx={1}
      >
        GitHub
      </Link>
      — your XP automagically accrues. Once a month, you’re rewarded SEEDs for
      your contributions, based on the amount of XP you’ve generated.
    </Text>

    <Text mb={2}>
      Your XP is calculated by{' '}
      <Link
        ml={1}
        href="//sourcecred.io"
        isExternal
        color="gray.500"
        textDecoration="underline"
        mr={1}
      >
        SourceCred
      </Link>{' '}
      which is, in essence, an accounting system for value creation in
      communities. It tracks whatever happens on Discord, the forums &amp;
      GitHub, then spits out numbers based on{' '}
      <Text as="span" borderBottom="1px dotted white" title="Pull Request">
        PR
      </Text>
      s, references, emojis, props given, and a bunch of other
      granularly-adjustable parameters.
    </Text>

    <UnorderedList>
      <ListItem>
        <Text mb={2}>
          Wait, you leave all the value allocation to an algorithm? 😱
        </Text>
        <Text mb={2} ml={4}>
          Of course not! Although it <em>does</em> do a pretty damn good job, we
          regularly review the numbers to make amends for what's missing or
          isn't properly accounted for.
        </Text>
      </ListItem>
      <ListItem>
        <Text mb={2}>Can it be used by other DAOs?</Text>
        <Text mb={2} ml={4}>
          Of course! We believe it’s a good DAO
          bootstrapping/accounting/rewarding system.
        </Text>
        <Text mb={2} ml={4}>
          We're calling it MetaSys &amp; you can
          <Link
            ml={1}
            href="https://wiki.metagame.wtf/docs/what-we-do/metasys"
            isExternal
            color="gray.500"
            textDecoration="underline"
          >
            read more about it on the wiki
          </Link>
          .
        </Text>
      </ListItem>
    </UnorderedList>
  </Flex>
);

export const GetRanked = () => (
  <Flex direction="column">
    <Text mb={2}>
      As you might know already, the top ~56 of each — players &amp; patrons —
      will be ranked in leagues. Well, leagues come with their perks!
    </Text>
    <UnorderedList fontWeight="bold" mb={3}>
      <ListItem>🥉 Bronze Founder</ListItem>
      <ListItem>🥈 Silver Founder</ListItem>
      <ListItem>🥇 Golden Founder</ListItem>
      <ListItem>🔘 Platinum Founder</ListItem>
      <ListItem>💎 Diamond Founder</ListItem>
    </UnorderedList>
    <Text mb={2}>
      We have a bunch of ideas on what these ranked league perks could be: from
      access to special channels &amp; private AMAs, to interviews, unique NFTs
      &amp; utmost respect.
    </Text>
    <Text>
      <Text as="b">
        But, before publishing a list, we'd love to hear from all of you —{' '}
      </Text>
      <Text as="span" borderBottom="3px double">
        what do you think the ranked league perks should be?
      </Text>{' '}
      🙃
    </Text>
  </Flex>
);

export const UsefulnessOfSeeds = () => (
  <Flex direction="column">
    <Text mb={2}>
      So far, the main thing SEEDs are used for is rewarding contributors as a
      means of bootstrapping. Not a very promising use case in terms of token
      value, we know!
    </Text>
    <Text mb={2}>
      But, we're building an entire gamified socioeconomic system, so finding
      use cases for money shouldn't be much trouble. 😁
    </Text>
    <Text mb={2}>
      So, let's look at some of the current &amp; potential ways of using SEEDs!
    </Text>
    <CollapsableText title="💸 Spending SEEDs">
      <Flex direction="column">
        <Text fontSize="xs" fontWeight="bold" my={2}>
          Things you can spend on now:
        </Text>
        <Box p={2} bgColor="whiteAlpha.300" mb={2}>
          💡 Note: You need to be a member to access any of these.
        </Box>
        <UnorderedList pl={6} mb={3} listStyleType="'💸 '">
          <ListItem>to get a shout-out in the podcast.</ListItem>
          <ListItem>to have MetaGame tweet for you.</ListItem>
          <ListItem>to get a shout-out in the newsletter.</ListItem>
          <ListItem>to buy some limited edition merchandise.</ListItem>
          <ListItem>
            to get products &amp; services from other players &amp; guilds.
          </ListItem>
          <ListItem>
            to get access to the
            <Link
              mx={1}
              href="//tokenengineeringcommunity.github.io/website/"
              isExternal
              color="gray.500"
              textDecoration="underline"
            >
              Token Engineering
            </Link>
            course.
          </ListItem>
          <ListItem>to get some user testing sessions.</ListItem>
          <ListItem>
            to
            <Link
              ml={1}
              isExternal
              color="gray.500"
              textDecoration="underline"
              mr={1}
              href="//www.effectivealtruism.org"
            >
              give away to good causes
            </Link>
            . ☺️
          </ListItem>
        </UnorderedList>
        <Box p={2} bgColor="whiteAlpha.300" my={2}>
          💡 If you're interested in spending your SEEDs on any of this, ask
          about it in our Discord channel
          <Link
            ml={1}
            href="//discord.gg/cBq5Md6KTU"
            isExternal
            textColor="gray.500"
            textDecoration="underline"
            mr={1}
          >
            #💸-spending-seeds
          </Link>
        </Box>
        <Text fontSize="xs" fontWeight="bold" ml={6} my={2}>
          In the future:
        </Text>
        <UnorderedList mb={4} pl={6} listStyleType="'💸 '">
          <ListItem>for the subscription fee.</ListItem>
          <ListItem>
            for fees if buying/selling things with other tokens.
          </ListItem>
          <ListItem>to install an app in MetaGame.</ListItem>
          <ListItem>
            for posting quests &amp; raids — if in self-interest.
          </ListItem>
          <ListItem>for access to courses.</ListItem>
          <ListItem>to pay for likes/upvotes.</ListItem>
          <ListItem>to have your message displayed on the ticker.</ListItem>
          <ListItem>
            to buy themes, addons, in-game skins &amp; other cosmetics.
          </ListItem>
          <ListItem>to post role openings or boost them.</ListItem>
          <ListItem>to boost your discovery position.</ListItem>
          <ListItem>
            to pay for other MetaFam services; like advising, building or
            shilling.
          </ListItem>
        </UnorderedList>
        <Image src="//bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/3ae3bc90-a157-4057-9722-167f5645d6a4_500x281.png" />
      </Flex>
    </CollapsableText>
    <CollapsableText title="🥩 Staking SEEDs">
      <Box>
        <Text mb={2}>
          Here are some of the things people might be required to stake SEEDs
          for.
        </Text>
        <Text fontWeight="bold" mb={2}>
          As you might already know; in MetaGame, we don't believe in rating
          humans.
        </Text>
        <Text mb={2}>
          We're building a future we <em>want</em> to live in, and a future in
          which humans rate each other on a 1–5 star system is definitely{' '}
          <strong>not</strong> the kind of future we want to live in.
        </Text>
        <Text mb={2}>
          Instead, players of MetaGame will be required to stake some of their
          skin in the game.
        </Text>
        <UnorderedList mb={4} pl={6} listStyleType="'🥩 '">
          <ListItem>to take quests.</ListItem>
          <ListItem>for your friend when onboarding them.</ListItem>
          <ListItem>for your guild to enter.</ListItem>
          <ListItem>as collateral for your personal token.</ListItem>
          <ListItem>to enter a contract with someone.</ListItem>
          <ListItem>when claiming the metafam.eth subdomain.</ListItem>
          <ListItem>when claiming the @metagame.wtf email.</ListItem>
          <ListItem>on your project or product reviews.</ListItem>
          <ListItem>
            on content curation <em>(ponzinomics)</em>.
            <UnorderedList>
              <ListItem ml={4}>
                writing reviews &amp; recommendations will require staking
              </ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
        <Center>
          <Image src="//bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/5a1c40a8-4983-4a95-81f1-3563b108de65_426x426.png" />
        </Center>
      </Box>
    </CollapsableText>
    <CollapsableText title="🌱 Planting SEEDs">
      <Box>
        <Text mb={3}>
          If you're confused as to what “planting SEEDs” means, it means using
          your SEEDs by putting them into the
          <Link
            ml={1}
            isExternal
            color="gray.500"
            textDecoration="underline"
            href="//polygon.balancer.fi/#/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081"
          >
            <strong>
              Balancer pool aka the <em>SEED plantation</em>
            </strong>
          </Link>
          .
        </Text>
        <UnorderedList mb={4} pl={6} listStyleType="'🌱 '">
          <ListItem>
            to be eligible for MetaFam-only limited edition merch
          </ListItem>
          <ListItem>
            to be eligible for random drops &amp; the Phase Ⅱ token
          </ListItem>
          <ListItem>to stay in the game as a patron</ListItem>
          <ListItem>to appear on the Patrons leaderboard</ListItem>
          <ListItem ml={5} listStyleType="'🌱🌱 '">
            for guilds to appear higher on the leaderboard
          </ListItem>
          <ListItem ml={10} listStyleType="'🌱🌱🌱 '">
            to appear higher on the Patrons leaderboard 🙃
          </ListItem>
        </UnorderedList>
      </Box>
    </CollapsableText>
  </Flex>
);

export const BuyingAndSelling = () => (
  <Box>
    <Box p={2} bgColor="whiteAlpha.300" mb={2}>
      💡 Note: No need to buy SEEDs to become a patron, you can just
      <em> water </em>them.
    </Box>
    <Text>If you want to buy some SEEDs:</Text>
    <UnorderedList pl={4}>
      <ListItem>First, you'll need to have some tokens on Polygon.</ListItem>
      <ListItem>
        Then you can go to the
        <Link
          mx={1}
          href="//polygon.balancer.fi/#/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081"
          isExternal
          color="green.300"
          textDecoration="underline"
        >
          SEEDs plantation
        </Link>
        &amp; click the <q>trade</q> tab middle top.
        <UnorderedList>
          <ListItem ml={4}>
            SEEDs not showing up? Search for
            <Text as="code" ml={1}>
              0xeaecc18198a475c921b24b8a6c1c1f0f5f3f7ea0
            </Text>
            .
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        Pick the amount you want to buy &amp; watch for slippage.
      </ListItem>
      <ListItem>Preview the trade, confirm &amp; swap. 🙂</ListItem>
      <ListItem>
        That's it! Now go to your MetaMask, scroll down to{' '}
        <Text as="q" mr={1}>
          add custom token
        </Text>
        &amp; paste the token address:
        <Text as="code" ml={1}>
          0xeaecc18198a475c921b24b8a6c1c1f0f5f3f7ea0
        </Text>
        .
      </ListItem>
    </UnorderedList>
    <Text>If you want to sell your SEEDs:</Text>
    <UnorderedList pl={4}>
      <ListItem>
        You'll still need some Matic on Polygon first… Either
        <Link
          mx={1}
          isExternal
          color="gray.500"
          textDecoration="underline"
          href="//googlethatforyou.com?q=how%20to%20buy%20matic%3F"
        >
          buy some
        </Link>
        or
        <Link
          ml={1}
          isExternal
          color="gray.500"
          textDecoration="underline"
          href="//discord.gg/8THHVwfd"
        >
          ask on Discord
        </Link>
        .
      </ListItem>
      <ListItem>Take the same steps as the buyers above. 🙂</ListItem>
    </UnorderedList>
  </Box>
);

export const BecomeAPatron = () => (
  <Box>
    <Text mb={2}>
      Though some use cases exist, they're not meaningfully contributing to the
      treasury yet &amp; the rest are just ideas. Main reasons you'd want to
      become a patron right now:
    </Text>
    <UnorderedList pl={4}>
      <ListItem>
        <Text fontWeight="bold">
          Because you love the idea of MetaGame &amp; want to see it succeed.
        </Text>
        <UnorderedList>
          <ListItem>
            <Link
              isExternal
              color="gray.500"
              textDecoration="underline"
              mr={1}
              href="//wiki.metagame.wtf/docs/enter-metagame/why-patron"
            >
              Reading about it made you go, “this is everything I've ever
              wanted” or at least “fuck yeah, this is epic!”
            </Link>
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        You want to become a part of MetaGame but you don't have time to
        actively contribute.
      </ListItem>
      <ListItem>
        Not convinced?
        <UnorderedList>
          <ListItem ml={4}>Maybe watch this video.</ListItem>
        </UnorderedList>
      </ListItem>
    </UnorderedList>
    <Box my={2}>
      <iframe
        style={{ width: '100%', height: '40vh' }}
        src="//www.youtube.com/embed/CYuwpR8CLXY?feature=oembed"
      ></iframe>
    </Box>
    <Text mb={2}>There are two ways to become a patron:</Text>
    <UnorderedList pl={4}>
      <ListItem>
        Join the
        <Link
          ml={1}
          href="//metagame.substack.com/p/calling-for-rain"
          isExternal
          color="gray.500"
          textDecoration="underline"
        >
          SEED Fund raise
        </Link>
        .
      </ListItem>
      <ListItem>Water the SEEDs yourself. 👇</ListItem>
    </UnorderedList>
  </Box>
);

export const PlantingAndWatering = () => (
  <Box>
    <Text>So you've decided to become a patron?</Text>
    <Box fontWeight="bold" my={4}>
      First, you'll need some tokens on Polygon.
    </Box>
    <UnorderedList>
      <ListItem>
        Ideally, it would be WETH &amp;
        <Link
          ml={1}
          href="https://reflexer.finance/"
          isExternal
          color="gray.500"
          textDecoration="underline"
        >
          RAI
        </Link>
        .
      </ListItem>
      <ListItem>
        If you only got MATIC, no worries, you can just swap it for WETH &amp;
        RAI.
      </ListItem>
      <ListItem>
        If you don't have anything…
        <ul>
          <ListItem ml={4}>
            Either
            <Link
              ml={1}
              href="//wallet.polygon.technology/bridge"
              isExternal
              color="gray.500"
              textDecoration="underline"
              mr={1}
            >
              bridge
            </Link>
            some from mainnet.
          </ListItem>
        </ul>
        <ul>
          <ListItem ml={4}>
            Or obtain MATIC in
            <Link
              ml={1}
              href="//googlethatforyou.com?q=how%20to%20buy%20matic%3F"
              isExternal
              color="gray.500"
              textDecoration="underline"
            >
              any number of ways
            </Link>
            .
          </ListItem>
        </ul>
      </ListItem>
    </UnorderedList>
    <Box fontWeight="bold" my={4}>
      Then, you'll need to use WETH &amp; RAI to
      <Link
        ml={1}
        href="//polygon.balancer.fi/#/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081"
        isExternal
        color="gray.500"
        textDecoration="underline"
      >
        water the SEEDs
      </Link>
      .
    </Box>
    <UnorderedList>
      <ListItem>
        How much should you water them?
        <UnorderedList>
          <ListItem ml={4}>
            The minimal requirement to join as a patron is 8 pSEEDs which is
            roughly $150.
          </ListItem>
          <ListItem ml={4}>
            Beyond that, you are free to water them however much you want if you
            wish a high position in the ranked league of patrons, but be careful
            not to slip.
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        After that, you will need to make sure to water them once every so
        often. You will be notified over
        <Link
          mx={1}
          isExternal
          color="gray.500"
          textDecoration="underline"
          href="//metagame.substack.com"
        >
          the newsletter
        </Link>
        or we will do it for you, if you join the
        <Link
          ml={1}
          href="//polygon.balancer.fi/#/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081"
          isExternal
          color="green.300"
          textDecoration="underline"
        >
          SEEDs Fund
        </Link>
        . 🙃
        <UnorderedList>
          <ListItem ml={4}>
            The number of patrons in
            <Link
              ml={1}
              isExternal
              color="gray.500"
              textDecoration="underline"
              mr={1}
              href="//wiki.metagame.wtf/docs/how-does-it-work/phases-of-metagame"
              fontStyle="italic"
            >
              Phase Ⅰ
            </Link>
            is limited to 150, meaning, you will need to water them at least as
            much as the 150ᵗʰ person on the leaderboard if you wish to remain a
            patron until the end of
            <Link
              ml={1}
              isExternal
              color="gray.500"
              textDecoration="underline"
              mr={1}
              href="//wiki.metagame.wtf/docs/how-does-it-work/phases-of-metagame"
              fontStyle="italic"
            >
              Phase Ⅰ
            </Link>
            (2023).
          </ListItem>
          <ListItem ml={4}>
            Do note that even if you drop off the leaderboard, you will still
            get your single digit season achievement NFT for being an early
            patron &amp; etched in the lore as well as remain among the first
            ones to get invited back in Phase Ⅱ when MetaGame scales above
            <Link
              ml={1}
              isExternal
              color="gray.500"
              textDecoration="underline"
              href="//wiki.metagame.wtf/docs/wtf-is-metagame/the-300-of-metagame"
              fontStyle="italic"
            >
              The 300 of MetaGame
            </Link>
            .
          </ListItem>
        </UnorderedList>
      </ListItem>
    </UnorderedList>
  </Box>
);

export const JoinTheFund = () => (
  <Box>
    <Text mb={2}>Wish to skip the hassle of watering SEEDs on your own?</Text>
    <Text mb={2}>No worries, we got you covered!</Text>
    <Text mb={2}>
      We're making it easy for people to do just that by launching the SEED Fund
      DAO.
    </Text>
    <Text mb={2}>
      You will only need to approve of MetaGame's monthly progress reports &amp;
      we'll be taking care of the rest. No more carrying the buckets from the
      well to the fields!
    </Text>
    <UnorderedList pl={4}>
      <ListItem>Add some mainnet Ether.</ListItem>
      <ListItem>Approve our progress &amp; proposals.</ListItem>
      <ListItem>We water the SEED plantation for you.</ListItem>
      <ListItem>
        <Link
          mr={1}
          isExternal
          color="gray.500"
          textDecoration="underline"
          href="//wiki.metagame.wtf/docs/wtf-is-metagame/the-300-of-metagame"
        >
          Join here
        </Link>
        if interested. 👀
      </ListItem>
    </UnorderedList>
  </Box>
);

export const FAQ = () => (
  <Flex direction="column" w="100%">
    <CollapsableText title="What have you accomplished so far?">
      <Text ml={6}>
        Many things! Go read the fundraise
        <Link
          ml={1}
          isExternal
          color="gray.500"
          textDecoration="underline"
          href="//metagame.substack.com/p/calling-for-rain"
        >
          announcement post
        </Link>
        ,
        <Link
          ml={1}
          isExternal
          color="gray.500"
          textDecoration="underline"
          href="//youtube.com/CYuwpR8CLXY"
        >
          watch the pitch video
        </Link>
        , or dig through
        <Link
          mx={1}
          isExternal
          color="gray.500"
          textDecoration="underline"
          href="//metagame.wtf"
        >
          the website
        </Link>
        itself.
      </Text>
    </CollapsableText>
    <CollapsableText title="Will you just keep on minting SEEDs to infinity?">
      <Text ml={6}>
        Not likely! The idea is that MetaGame will go
        <Link
          ml={1}
          isExternal
          color="gray.500"
          textDecoration="underline"
          href="https://wiki.metagame.wtf/docs/how-does-it-work/phases-of-metagame"
        >
          through 3 phases
        </Link>
        ; starting with SEEDs, growing into Trees in <em>Phase Ⅱ</em> aka
        <Text as="em" ml={1}>
          The Growth Phase
        </Text>{' '}
        before transitioning to Phase Ⅲ — where Trees bear the fruits of our
        labor &amp; we’re able to reward contributors with MetaGame’s incoming
        streams without having to mint new tokens.
      </Text>
    </CollapsableText>
    <CollapsableText title="Why should the price of SEEDs grow?">
      <>
        <Text ml={6}>🌊 SEED Watering Streams 🌊</Text>
        <UnorderedList mt={2} ml={10}>
          <ListItem>
            all fees &amp; payments received by MetaGame go into sustaining the
            price.
          </ListItem>
          <ListItem>
            people subscribe to buying SEEDs for any of the above reasons or
            others.
          </ListItem>
          <ListItem>
            projects we help incubate share a % of their tokens.
          </ListItem>
        </UnorderedList>
      </>
    </CollapsableText>
    <CollapsableText title="What’s market cap?">
      <Text ml={6}>
        At the time of writing this post, February 2022, the market cap was
        ~$600k.
      </Text>
    </CollapsableText>
  </Flex>
);
