import {
  Box,
  Center,
  Flex,
  Image,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@metafam/ds';
import { CollapsableText } from 'components/CollapsableText';
import React from 'react';

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
        href="https://forum.metagame.wtf/"
        isExternal
        color="gray.500"
        textDecoration="underline"
      >
        the forum
      </Link>
      , or laying down code on
      <Link
        href="https://github.com/MetaFam/"
        isExternal
        color="gray.500"
        textDecoration="underline"
        mx={1}
      >
        GitHub
      </Link>
      — your XP automagically accrues. Once a month, you’re rewarded Seeds for
      your contributions, based on the amount of XP you’ve generated.
    </Text>

    <Text mb={2}>
      Your XP is calculated by
      <Link
        mx={1}
        href="https://sourcecred.io/"
        isExternal
        color="gray.500"
        textDecoration="underline"
      >
        SourceCred
      </Link>
      which is, in essence, an accounting system for value creation in
      communities. It tracks whatever happens on Discord, the forums &amp;
      GitHub, then spits out numbers based on
      <Text
        as="span"
        ml={1}
        borderBottom="1px dotted white"
        title="Pull Request"
      >
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
            href="https://wiki.metagame.wtf/what-we-do/metasys"
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
      As you might know already both players &amp; patrons have leaderboards
      &amp; ranked leagues as well as perks (which will all be finalized at the
      end of <Text as="em">Phase I</Text>, ~June 2023):
    </Text>
    <UnorderedList fontWeight="bold" mb={3}>
      <ListItem>🥉 Bronze Founder or Funder</ListItem>
      <ListItem>🥈 Silver Founder or Funder</ListItem>
      <ListItem>🥇 Golden Founder or Funder</ListItem>
      <ListItem>🔘 Platinum Founder or Funder</ListItem>
      <ListItem>💎 Diamond Founder or Funder</ListItem>
    </UnorderedList>
    <Text mb={2}>
      You may check the full list of{' '}
      <Link
        color="gray.500"
        href="/join/patron"
        textDecoration="underline"
        title="See the perks available to MetaGame Patrons"
      >
        patron perks
      </Link>{' '}
      here &amp; know the one for players will be similar. All feedback welcome.
    </Text>
  </Flex>
);

export const UsefulnessOfSEEDs = () => (
  <Flex direction="column">
    <Text mb={2}>
      So far, the main thing Seeds are used for is rewarding contributors as a
      means of bootstrapping. Not a very promising use case in terms of token
      value, we know!
    </Text>
    <Text mb={2}>
      But, we're building an entire gamified socioeconomic system, so finding
      use cases for money shouldn't be much trouble. 😁
    </Text>
    <Text mb={2}>
      So, let's look at some of the current &amp; potential ways of using Seeds!
    </Text>
    <CollapsableText title="💸 Spending Seeds">
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
              href="https://tokenengineeringcommunity.github.io/website/"
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
              href="https://www.effectivealtruism.org/"
            >
              give away to good causes
            </Link>
            . ☺️
          </ListItem>
        </UnorderedList>
        <Box p={2} bgColor="whiteAlpha.300" my={2}>
          💡 If you're interested in spending your Seeds on any of this, ask
          about it in our Discord channel
          <Link
            ml={1}
            href="https://discord.gg/cBq5Md6KTU"
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
        <Image src="//bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/3ae3bc90-a157-4057-9722-167f5645d6a4_500x281.webpp" />
      </Flex>
    </CollapsableText>
    <CollapsableText title="🥩 Staking Seeds">
      <Box>
        <Text mb={2}>
          Here are some of the things people might be required to stake Seeds
          for.
        </Text>
        <Text fontWeight="bold" mb={2}>
          As you might already know; in MetaGame, we don't believe in rating
          humans.
        </Text>
        <Text mb={2}>
          We're building a future we <em>want</em> to live in, and a future in
          which humans rate each other on a 1–5 star system is definitely
          <Text as="strong" mx={1}>
            not
          </Text>{' '}
          the kind of future we want to live in.
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
          <Image src="//bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/5a1c40a8-4983-4a95-81f1-3563b108de65_426x426.webpp" />
        </Center>
      </Box>
    </CollapsableText>
    <CollapsableText title="🌱 Planting Seeds">
      <Box>
        <Text mb={3}>
          If you're confused as to what “planting Seeds” means, it means using
          your Seeds by putting them into the
          <Link
            ml={1}
            isExternal
            color="gray.500"
            textDecoration="underline"
            href="https://polygon.balancer.fi/#/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081"
          >
            <strong>
              Balancer pool aka the <em>Seed plantation</em>
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
      💡 Note: No need to buy Seeds to become a patron, you can just
      <em> water </em>them.
    </Box>
    <Text>If you want to buy some Seeds:</Text>
    <UnorderedList pl={4}>
      <ListItem>First, you'll need to have some tokens on Polygon.</ListItem>
      <ListItem>
        Then you can go to the
        <Link
          mx={1}
          href="https://polygon.balancer.fi/#/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081"
          isExternal
          color="green.300"
          textDecoration="underline"
        >
          Seeds plantation
        </Link>
        &amp; click the <q>trade</q> tab middle top.
        <UnorderedList>
          <ListItem ml={4}>
            Seeds not showing up? Search for
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
        That's it! Now go to your MetaMask, scroll down to
        <Text as="q" mx={1}>
          add custom token
        </Text>
        &amp; paste the token address:
        <Text as="code" ml={1}>
          0xeaecc18198a475c921b24b8a6c1c1f0f5f3f7ea0
        </Text>
        .
      </ListItem>
    </UnorderedList>
    <Text>If you want to sell your Seeds:</Text>
    <UnorderedList pl={4}>
      <ListItem>
        You'll still need some Matic on Polygon first… Either
        <Link
          mx={1}
          isExternal
          color="gray.500"
          textDecoration="underline"
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
          href="https://discord.com/invite/metagame"
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
      Though some use cases exist, they’re not meaningfully contributing to the
      treasury yet &amp; the rest are just ideas. Main reasons you’d want to
      become a patron right now:
    </Text>
    <UnorderedList pl={4}>
      <ListItem>
        <Text fontWeight="bold">
          Because you love the idea of MetaGame &amp; want to see it succeed.
        </Text>
      </ListItem>
      <ListItem>
        You want to become a part of MetaGame but you don’t have time to
        actively contribute.
      </ListItem>
      <ListItem>
        Interested? Go{' '}
        <Link
          color="gray.500"
          href="/join/patron"
          textDecoration="underline"
          title="Read about joining MetaGame as a Patron"
        >
          through here
        </Link>
      </ListItem>
    </UnorderedList>
  </Box>
);

export const PlantingAndWatering = () => (
  <Box>
    <Text>
      So you've decided to{' '}
      <Link
        color="gray.500"
        href="/join/patron"
        textDecoration="underline"
        title="Read about joining MetaGame as a Patron"
      >
        become a patron?
      </Link>
    </Text>
    <Box fontWeight="bold" my={4}>
      First, you'll need some tokens on Polygon.
    </Box>
    <UnorderedList>
      <ListItem>
        Ideally, it would be WETH &amp;
        <Link
          ml={1}
          href="https://reflexer.finance"
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
              href="https://wallet.polygon.technology/bridge/"
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
              href="https://googlethatforyou.com?q=how%20to%20buy%20matic%3F"
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
        href="https://polygon.balancer.fi/#/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081"
        isExternal
        color="gray.500"
        textDecoration="underline"
      >
        water the Seeds
      </Link>
      .
    </Box>
    <UnorderedList>
      <ListItem>
        How much should you water them?
        <UnorderedList>
          <ListItem ml={4}>
            The minimal requirement to join as a patron is 8 pSeeds which is
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
          href="https://metagame.substack.com"
        >
          the newsletter
        </Link>
        or we can do it for you, just ask. 🙃
        <UnorderedList>
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
              href="https://wiki.metagame.wtf/docs/how-does-it-work/phases-of-metagame"
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
              href="https://yeet.daohaus.club/dao/0x1/0x8b9280f30f386c4b8fc363d5984845d946a936c3/1"
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
