import {
  Button,
  Flex,
  FlexProps,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from '@metafam/ds';
import BackgroundImage from 'assets/main-background.jpg';
import React from 'react';
import { BoxMetadata, BoxType } from 'utils/boxTypes';

type Props = FlexProps & {
  boxList: BoxType[];
  onAddBox: (arg0: BoxType, arg1: BoxMetadata) => void;
};

export const PlayerAddSection: React.FC<Props> = ({
  boxList,
  onAddBox,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addSection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onClose();
    const boxType = e.target.value as BoxType;
    onAddBox(
      boxType,
      boxType === BoxType.EMBEDDED_URL
        ? { url: 'https://github.com/MetaFam/TheGame' }
        : {},
    );
  };

  return (
    <Flex
      bg="whiteAlpha.200"
      borderBottomRadius="lg"
      border="dashed 1px rgba(255, 255, 255, 0.3)"
      borderTopRadius="lg"
      boxShadow="md"
      w="100%"
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
        ADD NEW SECTION
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
          <ModalHeader
            color="white"
            fontSize="4xl"
            alignSelf="center"
            fontWeight="normal"
          >
            Add New Section
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
            <HStack m="auto" color="white">
              <Select
                css={{
                  '&>option': {
                    backgroundColor: '#40347C',
                    borderBottom: '2px solid #962d22',
                  },
                }}
                placeholder="Select a section"
                borderColor="offwhite"
                onChange={addSection}
              >
                {!(boxList || []).length && (
                  <option value="nothing" disabled>
                    No choice :/
                  </option>
                )}
                {(boxList || []).sort().map((box) => (
                  <option value={box} key={box}>
                    {box}
                  </option>
                ))}
              </Select>
              <Button
                onClick={onClose}
                bg="blue20"
                _hover={{ bg: 'purpleBoxLight', opacity: '1' }}
                color="offwhite"
                opacity="0.8"
              >
                CANCEL
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
