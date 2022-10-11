import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  MetaButton,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  VStack,
} from '@metafam/ds';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import BackgroundImage from 'assets/main-background.jpg';
import { MetaLink } from 'components/Link';
import { MarkdownViewer as Markdown } from 'components/MarkdownViewer';
import { RepetitionTag, StatusTag } from 'components/Quest/QuestTags';
import { RolesTags } from 'components/Quest/Roles';
import { SkillsTags } from 'components/Quest/Skills';
import {
  PlayerRole,
  Quest,
  QuestRepetition_Enum,
  QuestStatus_Enum,
  QuestWithCompletionFragment,
  Skill,
} from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import moment from 'moment';
import { optimizedImage } from 'utils/imageHelpers';
import { safelyParseNChakrifyHtml } from 'utils/stringHelpers';

type Props = {
  quest: QuestWithCompletionFragment;
};

export const QuestDetails: React.FC<Props> = ({ quest }) => {
  const { user } = useUser();
  const isMyQuest = user?.id === (quest as Quest).player.id;
  const descIsHtml = /<\/?[a-z][\s\S]*>/i.test(quest.description ?? '');
  const parsedDescription =
    descIsHtml && safelyParseNChakrifyHtml(quest.description ?? '');

  return (
    <MetaTile maxW={undefined}>
      <Box
        bgImage={`url(${BackgroundImage})`}
        bgSize="cover"
        bgPosition="center"
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="3.5rem"
      />
      <Flex justify="center" mb={4}>
        <Avatar
          size="lg"
          src={optimizedImage('logoURL', quest.guild.logo)}
          name={quest.guild.name}
        />
      </Flex>

      <MetaTileHeader>
        <VStack>
          <MetaLink as={`/quest/${quest.id}`} href="/quest/[id]">
            <Heading
              size="lg"
              color="white"
              fontFamily="body"
              textAlign="center"
            >
              {quest.title}
            </Heading>
          </MetaLink>
          <HStack mt={2}>
            <RepetitionTag
              repetition={quest.repetition}
              cooldown={quest.cooldown}
            />
            <StatusTag status={quest.status} />
            <Text>
              <i>{moment(quest.createdAt).fromNow()}</i>
            </Text>
          </HStack>
          <HStack w="100%" mt={2}>
            {isMyQuest && quest.status === QuestStatus_Enum.Open && (
              <MetaLink as={`/quest/${quest.id}/edit`} href="/quest/[id]/edit">
                <MetaButton size="md">Edit Quest</MetaButton>
              </MetaLink>
            )}
            {quest.externalLink && (
              <MetaLink href={quest.externalLink} isExternal>
                <MetaButton variant="outline" colorScheme="cyan" size="md">
                  Open link
                </MetaButton>
              </MetaLink>
            )}
          </HStack>
        </VStack>
      </MetaTileHeader>
      <MetaTileBody>
        <VStack spacing={2} align="stretch">
          <Box pb={2}>
            <Text textStyle="caption" pb={1}>
              DESCRIPTION
            </Text>
            {descIsHtml ? (
              <Prose>{parsedDescription && parsedDescription}</Prose>
            ) : (
              <Markdown>{quest.description}</Markdown>
            )}
          </Box>

          {quest.repetition === QuestRepetition_Enum.Recurring && (
            <>
              <Text textStyle="caption">Cooldown</Text>
              <Text>
                Doable every{' '}
                {moment.duration(quest.cooldown, 'second').humanize()}
              </Text>
            </>
          )}

          <Box pb={2}>
            <Text textStyle="caption" pb={1}>
              SKILLS
            </Text>
            <SkillsTags
              skills={quest.quest_skills.map(({ skill }) => skill) as Skill[]}
              maxSkills={4}
            />
          </Box>
          <Box pb={2}>
            <Text textStyle="caption" pb={1}>
              ROLES
            </Text>
            <RolesTags
              roles={
                quest.quest_roles.map(({ PlayerRole: r }) => r) as PlayerRole[]
              }
            />
          </Box>
        </VStack>
      </MetaTileBody>
    </MetaTile>
  );
};
