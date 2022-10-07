import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import {
  UploadProofButton,
  UserStatusType,
} from 'components/Quest/UploadProofButton';
import { useContext } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

export const QuestTile: React.FC<{
  name: string;
  number: number;
  description: string;
  bgColor?: string;
  questId?: string;
  userStatus?: UserStatusType;
  questChain?: graphql.QuestChainInfoFragment;
  refresh?: () => void;
  onClick: (visibility: React.ContextType<typeof VisibilityContext>) => void;
}> = ({
  name,
  number,
  description,
  bgColor = 'gray.900',
  questId,
  userStatus,
  questChain,
  refresh,
  onClick,
}) => {
  const visibility = useContext(VisibilityContext);

  return (
    <AccordionItem
      minW={264}
      maxW={659}
      minH={224}
      border={0}
      display="flex"
      alignItems="center"
      mr={6}
    >
      {({ isExpanded }) => (
        <Flex
          w="full"
          h="full"
          p={isExpanded ? 88 : 6}
          alignItems="center"
          justifyContent="center"
          minH={224}
          flexDir="column"
          bg={bgColor}
          maxW={659}
          borderWidth={24}
          borderColor="#B99BCB"
          borderRadius={56}
        >
          <Flex alignItems="center" h="full" w="full">
            <AccordionButton
              _focus={{
                border: 'none',
              }}
              p={0}
            >
              <Flex
                textAlign="left"
                fontWeight="bold"
                onClick={() => onClick(visibility)}
                w="full"
                flexDir={isExpanded ? 'row' : 'column'}
                gap={3}
              >
                <Text textAlign="center" fontSize={isExpanded ? 24 : 16}>
                  {number}.
                </Text>
                <Text textAlign="center" fontSize={isExpanded ? 24 : 16}>
                  {name}
                </Text>
              </Flex>
            </AccordionButton>
          </Flex>
          <AccordionPanel>
            <Box w={435} maxH={400} overflow="auto">
              {description}
            </Box>
            {questId && userStatus && questChain && refresh && (
              <UploadProofButton
                questId={questId}
                name={name}
                questChain={questChain}
                userStatus={userStatus}
                refresh={refresh}
              />
            )}
          </AccordionPanel>
        </Flex>
      )}
    </AccordionItem>
  );
};
