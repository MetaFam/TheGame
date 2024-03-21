import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from '@metafam/ds';
import { RolesTags } from 'components/Quest/Roles';
import { SkillsTagsAll } from 'components/Quest/Skills';
import { PlayerRole, QuestFragment, Skill } from 'graphql/autogen/types';
import SeedLogoSmol from 'public/assets/seed-logo-smol_46x46.png';

type Props = {
  quest: QuestFragment;
};

export const QuestDetailsRequirementsRewards: React.FC<Props> = ({ quest }) => (
  <Stack
    spacing={{
      base: '4',
      md: '8',
      lg: '6',
      xl: '10',
    }}
    direction={{
      base: 'column',
      md: 'row',
      lg: 'column',
    }}
  >
    <VStack
      bgColor="whiteAlpha.100"
      borderRadius={10}
      p={6}
      spacing={6}
      align="left"
      width={{
        base: 'full',
        md: '50%',
        lg: 'full',
      }}
    >
      <Text
        color="white"
        fontSize="lg"
        fontWeight="600"
        textTransform="uppercase"
        as="h3"
      >
        Requirements
      </Text>
      <Text>
        If you’re not a member of MetaGame, completing this quest will require
        posting in{' '}
        <Link
          href="https://discord.com/channels/629411177947987986/629411178837442601"
          isExternal
          whiteSpace="nowrap"
        >
          🏟-metasquare
        </Link>
        .
      </Text>
      {quest.quest_skills.length > 0 && (
        <>
          <VStack align="left" spacing={1}>
            <Text as="h4" textStyle="caption">
              Required skills
            </Text>
            <Box>
              <SkillsTagsAll
                skills={quest.quest_skills.map(({ skill }) => skill) as Skill[]}
              />
            </Box>
          </VStack>
        </>
      )}
      {quest.quest_roles.length > 0 && (
        <VStack align="left" spacing={1}>
          <Text as="h4" textStyle="caption">
            Needed roles
          </Text>
          <Box>
            <RolesTags
              roles={
                quest.quest_roles.map(({ PlayerRole: r }) => r) as PlayerRole[]
              }
            />
          </Box>
        </VStack>
      )}
    </VStack>

    <VStack
      bgColor="whiteAlpha.100"
      borderRadius={10}
      p={6}
      spacing={6}
      align="left"
      width={{
        base: 'full',
        md: '50%',
        lg: 'full',
      }}
    >
      <Text
        as="h3"
        color="white"
        fontSize="lg"
        fontWeight="600"
        textTransform="uppercase"
      >
        Rewards
      </Text>

      <Flex justifyContent="center" gap={12}>
        <Box fontSize="5xl" fontWeight="600">
          {(quest.reward || 0) * 1.5} XP
        </Box>
        <HStack spacing={2}>
          <Box fontSize="5xl" fontWeight="600">
            {quest.reward ?? '?'}
          </Box>
          <Image src={SeedLogoSmol.src} alt="Seed logo" boxSize={46} />
        </HStack>
      </Flex>

      <Text as="p" fontWeight="300" fontStyle="italic">
        Note: Rewards vary based on quality of outcome.
      </Text>
    </VStack>
  </Stack>
);
