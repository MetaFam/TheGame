import { Box, HStack, Text } from '@metafam/ds';
import React from 'react';
import { FaTimes } from 'react-icons/fa';

export type ProfileSectionProps = {
  title?: string;
  children?: React.ReactNode;
  onRemoveClick?: () => void;
  canEdit?: boolean;
};

// TODO If MetaBox is only used for Player profile maybe merge both component
export const ProfileSection: React.FC<ProfileSectionProps> = ({
  children,
  title,
  onRemoveClick,
  canEdit,
}) => (
  <Box minW="72">
    {title ? (
      <Box bg="purple80" borderTopRadius="lg" p={4}>
        <HStack>
          <Text
            fontFamily="mono"
            fontSize="sm"
            fontWeight="bold"
            color="blueLight"
            as="div"
            mr="auto"
          >
            {title}
          </Text>
          {canEdit ? (
            <FaTimes
              color="blueLight"
              opacity="0.4"
              cursor="pointer"
              onClick={onRemoveClick}
            />
          ) : null}
        </HStack>
      </Box>
    ) : null}
    <Box
      bg="whiteAlpha.200"
      borderBottomRadius="lg"
      borderTopRadius={!title ? 'lg' : 0}
      p={6}
      boxShadow="md"
      css={{ backdropFilter: 'blur(8px)' }}
    >
      {children}
    </Box>
  </Box>
);
