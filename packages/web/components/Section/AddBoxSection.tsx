import {
  Box,
  Button,
  Flex,
  FlexProps,
  Link,
  MetaTheme,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  VStack,
} from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { SetupPlayerLinks } from 'components/Setup/SetupPlayerLinks';
import { GuildFragment, Player } from 'graphql/autogen/types';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { BoxMetadata, BoxType, BoxTypes } from 'utils/boxTypes';

import { CustomTextSectionMetadata } from './CustomTextSection';
import { EmbeddedUrlMetadata } from './EmbeddedUrlSection';

type Props = FlexProps & {
  player?: Player;
  guild?: GuildFragment;
  boxes: Array<BoxType>;
  onAddBox: (arg0: BoxType, arg1: BoxMetadata) => void;
  previewComponent: (props: {
    metadata: BoxMetadata;
    type: BoxType;
    player?: Player;
    guild?: GuildFragment;
  }) => JSX.Element | null;
};

export const AddBoxSection = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      player,
      guild,
      boxes = [],
      onAddBox,
      previewComponent: Preview,
      ...props
    },
    ref,
  ) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [type, setType] = useState<Maybe<BoxType>>(null);
    const [metadata, setMetadata] = useState<BoxMetadata>({});
    const selectBoxType = useCallback(
      ({ target: { value: boxId } }: ChangeEvent<HTMLSelectElement>) =>
        setType(boxId as BoxType),
      [],
    );

    const addSection = useCallback(() => {
      if (!type) return;
      onAddBox(type, metadata);
      onClose();
    }, [type, metadata, onAddBox, onClose]);

    useEffect(() => {
      setMetadata({});
      setType(null);
    }, [isOpen]);

    return (
      <Flex
        w="full"
        h="full"
        direction="column"
        boxShadow="md"
        pos="relative"
        {...{ ref }}
      >
        <Flex
          bg="whiteAlpha.200"
          border="dashed 1px rgba(255, 255, 255, 0.3)"
          borderRadius="lg"
          boxShadow="md"
          w="full"
          h="full"
          backdropFilter="blur(8px)"
          {...props}
        >
          <Button
            onClick={onOpen}
            w="full"
            h="full"
            m={0}
            bg="blue20"
            color="offwhite"
            textTransform="uppercase"
            opacity={0.4}
            size="lg"
            _hover={{ bg: 'purpleBoxLight', opacity: '0.8' }}
          >
            Add New Block
          </Button>
          <Modal {...{ isOpen, onClose }}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add New Block</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack
                  spacing={6}
                  color="white"
                  w="full"
                  maxW="30rem"
                  align="center"
                  mx="auto"
                >
                  <Select
                    placeholder="Select a Type to Add…"
                    borderColor={MetaTheme.colors.whiteAlpha[800]}
                    onChange={selectBoxType}
                    sx={{
                      textTransform: 'capitalize',
                      '& > option': {
                        backgroundColor: MetaTheme.colors.purpleBoxLight,
                      },
                      '& > option[value=""]': {
                        fontStyle: 'italic',
                        opacity: 0.75,
                      },
                    }}
                  >
                    {boxes.length === 0 ? (
                      <option value="nothing" disabled>
                        No choice :/
                      </option>
                    ) : (
                      boxes.map((box) => (
                        <option key={box} value={box}>
                          {box.replace(/-/g, ' ')}
                        </option>
                      ))
                    )}
                  </Select>
                  {type && (
                    <EditMetadata
                      {...{ type, player, metadata, setMetadata }}
                    />
                  )}
                  {type && (
                    <Flex
                      w={{ base: '100%', sm: '30rem' }}
                      maxW="30rem"
                      bg="whiteAlpha.200"
                      backdropFilter="blur(7px)"
                      borderRadius="lg"
                    >
                      <Preview
                        {...{
                          type,
                          metadata,
                          player,
                          guild,
                        }}
                      />
                    </Flex>
                  )}
                </VStack>
                <Text sx={{ textAlign: 'center', fontSize: '14px', mt: '2' }}>
                  <i>
                    Not seeing what you need?
                    <Link
                      target={'_blank'}
                      rel={'noreferrer'}
                      href="//metagame.wtf/quest/6524b99a-df7e-4c10-838d-c441a8417e77"
                      sx={{ textDecoration: 'underline', ml: '8px' }}
                    >
                      Consider Building a new block!
                    </Link>
                  </i>
                </Text>
              </ModalBody>
              <ModalFooter>
                <Box mx="auto">
                  <Flex justify="center">
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={addSection}
                      isDisabled={!type}
                    >
                      Save Block
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={onClose}
                      color="white"
                      _hover={{ bg: 'none' }}
                    >
                      Close
                    </Button>
                  </Flex>
                </Box>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    );
  },
);

export const EditMetadata: React.FC<{
  type: BoxType;
  player?: Player;
  metadata: BoxMetadata;
  setMetadata: React.Dispatch<React.SetStateAction<BoxMetadata>>;
}> = ({ type, player, ...props }) => {
  switch (type) {
    case BoxTypes.EMBEDDED_URL: {
      return <EmbeddedUrlMetadata {...{ player, ...props }} />;
    }
    case BoxTypes.PLAYER_LINKS: {
      if (player) {
        return <SetupPlayerLinks {...{ player, ...props }} />;
      }
      throw new Error('`player` not set for Player Links.');
    }
    case BoxTypes.CUSTOM_TEXT: {
      return <CustomTextSectionMetadata {...{ player, ...props }} />;
    }
    default: {
      return null;
    }
  }
};
