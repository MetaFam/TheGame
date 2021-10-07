import { Box, EditIcon, HStack, IconButton, Text } from '@metafam/ds';
import React from 'react';
import { FaTimes } from 'react-icons/fa';

export type ProfileSectionProps = {
  title?: string;
  children?: React.ReactNode;
  onRemoveClick?: () => void;
  canEdit?: boolean;
  displayEditButton?: boolean;
};

// TODO If MetaBox is only used for Player profile maybe merge both component
export const ProfileSection: React.FC<ProfileSectionProps> = ({
  children,
  title,
  onRemoveClick,
  canEdit,
  displayEditButton,
}) => (
  <Box minW="72">
    {title ? (
      <Box bg="purpleProfileSection" borderTopRadius="lg" p={4}>
        <HStack height={5}>
          <Text
            fontFamily="mono"
            fontSize="sm"
            fontWeight="bold"
            color="blueLight"
            as="div"
            mr="auto"
          >
            {title.toUpperCase()}
          </Text>
          {displayEditButton ? (
            <IconButton
              aria-label="Edit Profile Info"
              size="lg"
              background="transparent"
              color="#A426A4"
              icon={<EditIcon />}
              _hover={{ color: 'white' }}
              isRound
            />
          ) : null}
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
      bg="blueProfileSection"
      borderBottomRadius="lg"
      borderTopRadius={!title ? 'lg' : 0}
      p={8}
      boxShadow="md"
      css={{ backdropFilter: 'blur(8px)' }}
    >
      {children}
    </Box>
  </Box>
);
