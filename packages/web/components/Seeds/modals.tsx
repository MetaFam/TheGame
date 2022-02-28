import {
  Box,
  Flex,
  Image,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@metafam/ds';
import React, { useState } from 'react';

export const WTFisXP = () => (
  <Flex direction="column">
    <Text mb={2}>
      XP or “experience point” is a unit of contribution to MetaGame. In
      essence, its an accounting system for value creation.
    </Text>

    <Text mb={2}>
      Whether it’s completing quests, writing useful things on
      <Link
        ml={1}
        href="https://forum.metagame.wtf/"
        isExternal
        color="gray.500"
        textDecoration="underline"
        mr={1}
      >
        the forum
      </Link>
      , or laying down code on
      <Link
        ml={1}
        href="https://github.com/metafam/"
        isExternal
        color="gray.500"
        textDecoration="underline"
        mr={1}
      >
        GitHub
      </Link>
      - your XP automagically accrues. Once a month, you are rewarded Seeds for
      your contributions, based on the amount of XP that you generated.
    </Text>

    <Text mb={2}>
      Your XP is calculated by
      <Link
        ml={1}
        href="https://sourcecred.io/"
        isExternal
        color="gray.500"
        textDecoration="underline"
        mr={1}
      >
        SourceCred
      </Link>
      which is, in essence, an accounting system for value creation in
      communities. It tracks whatever is happening on Discord, forums & Github,
      then spits out numbers based on PRs, references, emojis, props given, and
      a bunch of other granularly-adjustable parameters.
    </Text>

    <UnorderedList>
      <ListItem>
        <Text mb={2}>
          Wait, you leave all the value allocation to an algorithm? 😱
        </Text>
      </ListItem>
    </UnorderedList>

    <Text mb={2}>
      Of course not! Although it <em>does</em> do a pretty damn good job, we
      regularly review the numbers to make amends for what's missing or isn't
      properly accounted for.
    </Text>

    <UnorderedList>
      <ListItem>
        <Text mb={2}>Can it be used by other DAOs?</Text>
      </ListItem>
    </UnorderedList>

    <Text mb={2}>
      Of course! We believe its a good DAO bootstrapping/accounting/rewarding
      system.{' '}
    </Text>
    <Text mb={2}>
      We're calling it MetaSys & you can go read more about it
      <Link
        ml={1}
        href="https://wiki.metagame.wtf/docs/what-we-do/metasys"
        isExternal
        color="gray.500"
        textDecoration="underline"
        mr={1}
      >
        here
      </Link>
      .
    </Text>
  </Flex>
);

export const GetRanked = () => (
  <Flex direction="column">
    <Text>
      As you might know already, the top ~56 of each; players & patrons, will be
      ranked in leagues. Well, leagues come with their perks!
    </Text>
    <UnorderedList fontWeight="bold">
      <ListItem>🥉 Bronze Founder</ListItem>
      <ListItem>🥈 Silver Founder</ListItem>
      <ListItem>🥇 Golden Founder</ListItem>
      <ListItem>🔘 Platinum Founder</ListItem>
      <ListItem>💎 Diamond Founder</ListItem>
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

export const UsefulnessOfSeeds = () => {
  const [isOpenSpending, setIsOpenSpending] = useState(false);
  const [isOpenStaking, setIsOpenStaking] = useState(false);
  const [isOpenPlanting, setIsOpenPlanting] = useState(false);

  return (
    <Flex direction="column">
      <Text>
        So far, the main thing Seeds are used for is rewarding contributors as a
        means of bootstrapping. Not a very promising use case in terms of token
        value, we know!
      </Text>
      <Text>
        But, we're building an entire gamified socioeconomic system, so finding
        use cases for money shouldn't be much trouble 😁
      </Text>
      <Text>
        So, lets look at some of the current &amp; potential ways of using
        Seeds!
      </Text>
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
            <ListItem>💸 to buy some limited edition merchandise.</ListItem>
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
            ask about it in our discord channel #ask about it; #
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
          <Image src="https://cdn.substack.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F3ae3bc90-a157-4057-9722-167f5645d6a4_500x281.png" />
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
        <Box>
          <Text>
            Here are some of the things people might be required to stake Seeds
            for.
          </Text>
          <Text fontWeight="bold">
            As you might already know; in MetaGame, we don't believe in rating
            humans.
          </Text>
          <Text>
            We're building a future we <em>want</em> to live in, and a future in
            which humans rate each other on a 1-5 star system is definitely
            <strong> not</strong> the kind of future we want to live in.
          </Text>
          <Text>
            Instead, players of MetaGame will be required to stake some of their
            skin in the game.
          </Text>
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
              <ul>
                <ListItem ml={4}>
                  writing reviews &amp; recommendations will require staking
                </ListItem>
              </ul>
            </ListItem>
          </UnorderedList>
          <Image src="https://cdn.substack.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F5a1c40a8-4983-4a95-81f1-3563b108de65_426x426.png" />
        </Box>
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
        <Box>
          <Text>
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
          </Text>
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
        </Box>
      )}
    </Flex>
  );
};

export const BuyingAndSelling = () => (
  <Box>
    <Box p={2} bgColor="whiteAlpha.300" mb={2}>
      💡 Note: No need to buy Seeds to become a patron, you can just
      <em> water </em>them.
    </Box>
    <Text>If you want to buy some Seeds:</Text>
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
        <ul>
          <ListItem ml={4}>
            Seeds not showing up? Search by
            0xeaecc18198a475c921b24b8a6c1c1f0f5f3f7ea0
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
        0xeaecc18198a475c921b24b8a6c1c1f0f5f3f7ea0
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
  </Box>
);

export const BecomeAPatron = () => (
  <Box>
    <Text>
      Though some use cases exist, they're not meaningfully contributing to the
      treasury yet &amp; the rest are just ideas. Main reasons you'd want to
      become a patron right now:
    </Text>
    <UnorderedList>
      <ListItem>
        <Text fontWeight="bold">
          Because you love the idea of MetaGame &amp; want to see it succeed.
        </Text>
        <ul>
          <ListItem ml={4}>
            <Link
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
        height="300px"
        src="https://www.youtube.com/embed/CYuwpR8CLXY?feature=oembed"
      ></iframe>
    </Box>
    <Text>There are two ways to become a patron:</Text>
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
          mr={1}
        >
          RAI
        </Link>
        .
      </ListItem>
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
            The minimal requirement to join as a patron is 8 pSeeds which is
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
        or we will do it for you, if you join the
        <Link
          ml={1}
          href="https://polygon.balancer.fi/#/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081"
          isExternal
          color="green.300"
          textDecoration="underline"
          mr={1}
        >
          Seeds Fund
        </Link>{' '}
        🙃
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
              fontStyle="italic"
            >
              Phase I
            </Link>
            is limited to 150, meaning, you will need to water them at least as
            much as the 150th person on the leaderboard if you wish to remain a
            patron until the end of
            <Link
              ml={1}
              isExternal
              color="gray.500"
              textDecoration="underline"
              mr={1}
              href="https://wiki.metagame.wtf/docs/how-does-it-work/phases-of-metagame"
              fontStyle="italic"
            >
              Phase I
            </Link>
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
              fontStyle="italic"
            >
              The 300 of MetaGame
            </Link>
            .
          </ListItem>
        </ul>
      </ListItem>
    </UnorderedList>
  </Box>
);

export const JoinTheFund = () => (
  <Box>
    <Text>Wish to skip the hassle of watering Seeds on your own?</Text>
    <Text>No worries, we got you covered!</Text>
    <Text>
      We're making it easy for people to do just that by launching the Seed Fund
      DAO.
    </Text>
    <Text>
      You will only need to approve of MetaGame's monthly progress reports &amp;
      we'll be taking care of the rest. No more carrying the buckets from the
      well to the fields!
    </Text>
    <UnorderedList>
      <ListItem>Add some mainnet Ether</ListItem>
      <ListItem>Approve our progress &amp; proposals</ListItem>
      <ListItem>We water the Seed plantation for you</ListItem>
      <ListItem>
        <Link
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
  </Box>
);

export const FAQ = () => {
  const [isOpenAccomplish, setIsOpenAccomplish] = useState(false);
  const [isOpenInfinity, setIsOpenInfinity] = useState(false);
  const [isOpenGrow, setIsOpenGrow] = useState(false);
  const [isOpenCap, setIsOpenCap] = useState(false);

  return (
    <div>
      <Box onClick={() => setIsOpenAccomplish(!isOpenAccomplish)} my={4}>
        <details>
          <summary>What have you accomplished so far?</summary>
        </details>
      </Box>
      {isOpenAccomplish && (
        <Text>
          Many things! Go read the fundraise
          <Link
            ml={1}
            isExternal
            color="gray.500"
            textDecoration="underline"
            mr={1}
            href="https://metagame.substack.com/p/calling-for-rain"
          >
            announcement post
          </Link>
          , pitch video or dig through the website itself.
        </Text>
      )}
      <Box onClick={() => setIsOpenInfinity(!isOpenInfinity)} my={4}>
        <details>
          <summary>Will you just keep on minting Seeds to infinity?</summary>
        </details>
      </Box>
      {isOpenInfinity && (
        <Text>
          Not likely! The idea is that MetaGame will go
          <Link
            ml={1}
            isExternal
            color="gray.500"
            textDecoration="underline"
            mr={1}
            href="https://wiki.metagame.wtf/docs/how-does-it-work/phases-of-metagame"
          >
            through 3 phases
          </Link>
          ; starting with Seeds, growing into Trees in
          <em>Phase II</em> aka <em>The Growth Phase </em>before transitioning
          to Phase III - where Trees bear the fruits of our labor &amp; we’re
          able to reward contributors with MetaGame’s incoming streams without
          having to mint new tokens.
        </Text>
      )}
      <Box onClick={() => setIsOpenGrow(!isOpenGrow)} my={4}>
        <details>
          <summary>Why should the price of Seeds grow?</summary>
        </details>
      </Box>
      {isOpenGrow && (
        <>
          <Text>🌊 Seed Watering Streams</Text>
          <UnorderedList mt={2}>
            <ListItem>
              all fees &amp; payments received by MetaGame go into sustaining
              the price.
            </ListItem>
            <ListItem>
              people subscribe to buying Seeds for any of the above reasons or
              others.
            </ListItem>
            <ListItem>
              projects we helped incubate share a % of their tokens?
            </ListItem>
          </UnorderedList>
        </>
      )}

      <Box onClick={() => setIsOpenCap(!isOpenCap)} my={4}>
        <details>
          <summary>What’s market cap?</summary>
        </details>
      </Box>
      {isOpenCap && (
        <Text>
          At the time of writing this post (February 2022), the market cap was
          ~$600k
        </Text>
      )}
    </div>
  );
};
