import {
  Button,
  Flex,
  FlexProps,
  Input,
  MetaTheme,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  VStack,
} from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import BackgroundImage from 'assets/main-background.jpg';
import { PlayerSection } from 'components/Profile/PlayerSection';
import { Player } from 'graphql/autogen/types';
import React, { useCallback, useEffect, useState } from 'react';
import { BoxMetadata, BoxType, BoxTypes } from 'utils/boxTypes';

type Props = FlexProps & {
  player: Player;
  boxes: Array<BoxType>;
  onAddBox: (arg0: BoxType, arg1: BoxMetadata) => void;
};

export const PlayerAddSection = React.forwardRef<HTMLDivElement, Props>(
  ({ player, boxes = [], onAddBox, ...props }, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [type, setType] = useState<Maybe<BoxType>>(null);
    const [metadata, setMetadata] = useState<BoxMetadata>({});
    const selectBoxType = useCallback(
      ({ target: { value: boxId } }) => setType(boxId),
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
          w="100%"
          h="100%"
          css={{ backdropFilter: 'blur(8px)' }}
          {...props}
        >
          <Button
            onClick={onOpen}
            w="100%"
            h="100%"
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
            <ModalContent
              maxW="50rem"
              bgImage={`url(${BackgroundImage})`}
              bgSize="cover"
              bgAttachment="fixed"
              px={[4, 8, 12]}
              py={8}
            >
              <VStack spacing={0} align="center">
                <ModalCloseButton
                  color="pinkShadeOne"
                  size="xl"
                  p={4}
                  top={0}
                  right={0}
                  _focus={{ boxShadow: 'none' }}
                />
                <ModalHeader color="white" fontSize="4xl" fontWeight="normal">
                  Add New Block
                </ModalHeader>
                <ModalBody>
                  <VStack
                    spacing={6}
                    color="white"
                    w={{ base: '100%', sm: '30rem' }}
                    maxW="30rem"
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
                    {type === BoxTypes.EMBEDDED_URL && (
                      <Input
                        bg="dark"
                        w="100%"
                        placeholder="Provide the URL of the content"
                        _placeholder={{ color: 'whiteAlpha.500' }}
                        onChange={({ target: { value: url } }) =>
                          setMetadata({ url })
                        }
                        size="lg"
                        borderRadius={0}
                        borderColor="borderPurple"
                        fontSize="md"
                        borderWidth="2px"
                      />
                    )}
                    {type && (
                      <Flex
                        w={{ base: '100%', sm: '30rem' }}
                        maxW="30rem"
                        bg="blueProfileSection"
                        borderRadius="lg"
                      >
                        <PlayerSection
                          isOwnProfile={false}
                          editing={false}
                          {...{
                            type,
                            metadata,
                            player,
                          }}
                        />
                      </Flex>
                    )}
                  </VStack>
                </ModalBody>
                <ModalFooter>
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
                </ModalFooter>
              </VStack>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    );
  },
);
