import {
  Button,
  Flex,
  FlexProps,
  Input,
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
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { PersonalityInfo } from 'graphql/queries/enums/getPersonalityInfo';
import React, { useCallback, useEffect, useState } from 'react';
import { BoxMetadata, BoxType } from 'utils/boxTypes';

type Props = FlexProps & {
  player: PlayerFragmentFragment;
  personalityInfo: PersonalityInfo;
  boxList: BoxType[];
  onAddBox: (arg0: BoxType, arg1: BoxMetadata) => void;
};

export const PlayerAddSection = React.forwardRef<HTMLDivElement, Props>(
  ({ player, personalityInfo, boxList = [], onAddBox, ...props }, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [boxType, setBoxType] = useState<Maybe<BoxType>>(null);
    const [boxMetadata, setBoxMetadata] = useState<BoxMetadata>({});
    const selectBoxType = useCallback(
      ({ target: { value: boxId } }) => setBoxType(boxId),
      [],
    );

    const addSection = useCallback(() => {
      if (!boxType) return;
      onAddBox(boxType, boxMetadata);
      onClose();
    }, [boxType, boxMetadata, onAddBox, onClose]);

    useEffect(() => {
      setBoxMetadata({});
      setBoxType(null);
    }, [isOpen]);

    return (
      <Flex
        w="100%"
        ref={ref}
        direction="column"
        h="100%"
        boxShadow="md"
        pos="relative"
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
            opacity={0.4}
            size="lg"
            _hover={{ bg: 'purpleBoxLight', opacity: '0.8' }}
          >
            ADD NEW BLOCK
          </Button>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
                  _focus={{
                    boxShadow: 'none',
                  }}
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
                    minH="30rem"
                  >
                    <Select
                      css={{
                        '&>option': {
                          backgroundColor: '#40347C',
                          borderBottom: '2px solid #962d22',
                        },
                      }}
                      placeholder="Select a section"
                      borderColor="offwhite"
                      onChange={selectBoxType}
                    >
                      {boxList.length === 0 ? (
                        <option value="nothing" disabled>
                          No choice :/
                        </option>
                      ) : (
                        boxList.sort().map((box) => (
                          <option value={box} key={box}>
                            {box.toUpperCase()}
                          </option>
                        ))
                      )}
                    </Select>
                    {boxType === BoxType.EMBEDDED_URL && (
                      <Input
                        bg="dark"
                        w="100%"
                        placeholder="Paste the URL of the content"
                        _placeholder={{ color: 'whiteAlpha.500' }}
                        onChange={({ target: { value: url } }) =>
                          setBoxMetadata({ url })
                        }
                        size="lg"
                        borderRadius={0}
                        borderColor="borderPurple"
                        fontSize="md"
                        borderWidth="2px"
                      />
                    )}
                    {boxType && (
                      <Flex
                        w={{ base: '100%', sm: '30rem' }}
                        maxW="30rem"
                        bg="blueProfileSection"
                        borderRadius="lg"
                      >
                        <PlayerSection
                          isOwnProfile={false}
                          canEdit={false}
                          {...{
                            boxType,
                            boxMetadata,
                            player,
                            personalityInfo,
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
                    isDisabled={!boxType}
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
