import { Box, Checkbox, Flex, Grid, Heading, Text } from '@metafam/ds';
import { CollapsableText } from 'components/CollapsableText';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import React from 'react';

const data = [
  {
    category: 'Starter quests',
    quests: [
      {
        title: 'sub to substack',
        task: 'Click here (sub button)',
        completed: false,
      },
      {
        title: 'sub to yt',
        task:
          'Click here (sub button) - [https://www.youtube.com/metamedia](https://www.youtube.com/metamedia)',
        completed: false,
      },
      {
        title: 'join discord',
        task: 'Click here (link will need to be refreshed to mitigate botting)',
        completed: false,
      },
      {
        title: 'join forum',
        task:
          'forum link opening in a new tab prompting a login with discord, github or web3wallet (when we upgrade discourse)',
        completed: false,
      },
      {
        title: 'follow on twitter',
        task:
          'Click here (follow button)  [https://twitter.com/MetaFam](https://twitter.com/MetaFam)',
        description:
          'Tweet @metafam xyz (the function that many dapps have for verifying twitter identities such as arweave)',
        completed: false,
      },
    ],
  },
  {
    category: 'Warm up quests',
    quests: [
      {
        title: 'pick a role',
        description:
          '*You are now at the character creation menu!*  Do you buidl? Do you hodl? Do you cook a good noodl?    Do you edit? Do you reddit? Do you have a lot of credit?*“The thing you waste a ridiculous amount of time and energy in vain doing, is what truly defines you”* -Friedrich Knee-chain',
        task: 'pick your main role',
        completed: false,
      },
      {
        title: 'reg your eth address',
        task:
          'Register your eth address in the **[#set-eth-address](https://discord.com/channels/629411177947987986/726119055328804864/893962540898476083)** channel on Discord (maybe in dapp itself in the future?)',
        command:
          'The bot command is: `!mg setAddress 0xYourAddress`  | **DO NOT USE AN EXCHANGE WALLET**',
        completed: false,
      },
      {
        title: 'reg your forum username',
        description:
          'We would ideally not like to be bamboozled by your multiple personalities...at least the algorithm does... and we do what it wants in order to not get whipped you know.',
        task:
          'Register your forum identity in **[#set-eth-address](https://discord.com/channels/629411177947987986/726119055328804864/893962540898476083)**',
        command:
          'The bot command is: `!mg addAlias discourse YourForumUsername`',
        completed: false,
      },
      {
        title: 'ask anything',
        description:
          'Socrates once said, “*I only know one thing, that I know nothing*”. Be like Socrates, but let us know so you can be... less like Socrates?!🤷',
        task: "Ask about something you don't understand in #ask-anything",
        completed: false,
      },
    ],
  },
  {
    category: 'First touches',
    quests: [
      {
        title: 'introduce yourself',
        description:
          "Become an open book and don't be afraid to let others read it. You never know... you might even become a best seller (or a short seller)!>",
        task:
          "Introduce yourself in your role's internal guild channel on discord",
        completed: false,
      },
      {
        title: 'join align/cohort',
        description:
          'Join the Cult Propaganda Sessions each Friday! Hoods are optional.*>*',
        task:
          "Join and participate in the Cohort Onboarding call or your guild's align call",
        completed: false,
      },
      {
        title: 'issues n ideas',
        description:
          'When you give feedback you get fed back. Tis how it goes.>',
        task: 'Post an issue or an improvement idea in #issues-n-ideas',
        completed: false,
      },
      {
        title: 'brain exchange',
        description:
          "Hey there! Metagame would like to borrow your brain for a while and see what's in there. Would you kindly....>",
        task:
          'Post a brain exchange post requesting or offering a certain skill related activity',
        completed: false,
      },
      {
        title:
          'pick a path chain (pick one and others gray out until complete/abandoned)',
        description:
          '*”Two roads diverged in the woods and I, I took the one I most sincerely VIBETH with.”* -The cold guy>',
        task: 'Available Paths listed',
        completed: false,
      },
    ],
  },
];

const InitiationQuests: React.FC = () => (
  <PageContainer>
    <HeadComponent
      title="MetaGame Quests"
      description="MetaGame is a Massive Online Coordination Game! MetaGame has some epic quests going on!"
      url="https://my.metagame.wtf/quests/initiation"
    />
    <Heading mb={8}>Initiation</Heading>
    <Grid
      templateColumns={['auto', 'auto', '1fr 1fr', '1fr 1fr 1fr']}
      gap={6}
      pb={10}
    >
      {data.map(({ category, quests }) => (
        <Box
          mb={6}
          px={8}
          py={12}
          textAlign="center"
          bgColor="rgba(255,255,255, 0.08)"
          key={category}
        >
          <Heading fontSize="xl" fontFamily="body" pb={2}>
            {category}
          </Heading>
          <Text pb={4}>
            Completed:{' '}
            {(quests as never[]).filter(
              ({ completed }: { completed: boolean }) => completed,
            ).length / 100}
          </Text>
          {quests.map(({ title, description, completed, task }) => (
            <Flex
              direction="row"
              bgColor="rgba(255,255,255, 0.08)"
              px={4}
              mb={4}
              justifyContent="space-between"
              key={title}
            >
              <Box textAlign="left">
                <CollapsableText title={title}>
                  <Text mb={2}>Description</Text>
                  <Text fontStyle="italic" mb={4} fontSize="sm">
                    "{description}"
                  </Text>
                  <Text mb={2}>Quest Objectives</Text>
                  <Text
                    wordBreak="break-all"
                    fontStyle="italic"
                    mb={4}
                    fontSize="sm"
                  >
                    {task}
                  </Text>
                </CollapsableText>
              </Box>
              <Box mt={4}>
                <Checkbox isChecked={completed} />
              </Box>
            </Flex>
          ))}
        </Box>
      ))}
    </Grid>
  </PageContainer>
);

export default InitiationQuests;
