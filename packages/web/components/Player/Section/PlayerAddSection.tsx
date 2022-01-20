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
import BackgroundImage from 'assets/main-background.jpg';
import { FlexContainer } from 'components/Container';
import { PlayerSection } from 'components/Profile/PlayerSection';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React, { useCallback, useEffect, useState } from 'react';
import { BoxMetadata, BoxType } from 'utils/boxTypes';

type Props = FlexProps & {
  player: PlayerFragmentFragment;
  boxList: BoxType[];
  onAddBox: (arg0: BoxType, arg1: BoxMetadata) => void;
};

export const PlayerAddSection = React.forwardRef<HTMLDivElement, Props>(
  ({ player, boxList, onAddBox, ...props }, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [boxType, setBoxType] = useState<BoxType | undefined>();
    const [boxMetadata, setBoxMetadata] = useState<BoxMetadata>({});
    const selectBoxType = useCallback(({ target: { value: boxId } }) => {
      setBoxType(boxId);
    }, []);

    const addSection = useCallback(() => {
      if (!boxType) return;
      onAddBox(boxType, boxMetadata);
      onClose();
    }, [boxType, boxMetadata, onAddBox, onClose]);

    useEffect(() => {
      setBoxMetadata({});
      setBoxType(undefined);
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
          borderBottomRadius="lg"
          border="dashed 1px rgba(255, 255, 255, 0.3)"
          borderTopRadius="lg"
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
            m="0"
            bg="blue20"
            _hover={{ bg: 'purpleBoxLight', opacity: '0.8' }}
            color="offwhite"
            opacity="0.4"
            size="lg"
          >
            ADD NEW BLOCK
          </Button>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent
              maxW="50rem"
              backgroundImage={`url(${BackgroundImage})`}
              bgSize="cover"
              bgAttachment="fixed"
              p={[4, 8, 12]}
            >
              <FlexContainer>
                <ModalHeader
                  color="white"
                  fontSize="4xl"
                  alignSelf="center"
                  fontWeight="normal"
                >
                  Add New Block
                </ModalHeader>
                <ModalCloseButton
                  color="pinkShadeOne"
                  size="xl"
                  p={4}
                  _focus={{
                    boxShadow: 'none',
                  }}
                />
                <ModalBody>
                  <VStack
                    spacing="6"
                    color="white"
                    w={{ base: '100%', sm: '30rem' }}
                    maxW="30rem"
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
                      {!(boxList || []).length && (
                        <option value="nothing" disabled>
                          No choice :/
                        </option>
                      )}
                      {(boxList || []).sort().map((box) => (
                        <option value={box} key={box}>
                          {box.toUpperCase()}
                        </option>
                      ))}
                    </Select>
                    {boxType === BoxType.EMBEDDED_URL && (
                      <Input
                        background="dark"
                        w="100%"
                        type="text"
                        placeholder="Paste the URL of the content"
                        _placeholder={{ color: 'whiteAlpha.500' }}
                        onChange={(e) =>
                          setBoxMetadata({ url: e.target.value })
                        }
                        size="lg"
                        borderRadius="0"
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
                          boxType={boxType}
                          boxMetadata={boxMetadata}
                          player={player}
                          isOwnProfile={false}
                          canEdit={false}
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
              </FlexContainer>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    );
  },
);
