import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@metafam/ds';
import React from 'react';

type CardProps = {
  title: string;
  description: string;
  Content: () => JSX.Element;
};

export const Card: React.FC<CardProps> = ({ title, description, Content }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      alignItems="center"
      bg="whiteAlpha.200"
      borderRadius="lg"
      boxShadow="md"
      cursor="pointer"
      direction="column"
      key={title}
      p={6}
      placeContent="center"
      maxW="md"
      minH="3xs"
      onClick={onOpen}
      style={{ backdropFilter: 'blur(7px)' }}
      textAlign="center"
      textColor="white"
      w={['full', 'auto']}
    >
      <Box borderTopRadius="lg">
        <Text fontSize="xl" fontWeight="bold" mt={1} mb={4}>
          {title.toUpperCase()}
        </Text>
        <Text mb={4}>{description}</Text>
        <Button
          variant="ghost"
          color="magenta"
          bgColor="whiteAlpha.50"
          _hover={{ bg: 'whiteAlpha.200' }}
          _active={{ bg: 'whiteAlpha.200' }}
          onClick={onOpen}
        >
          Learn More
        </Button>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent
          alignItems="center"
          bg="whiteAlpha.200"
          borderRadius="lg"
          boxShadow="md"
          h={['full', 'full', 'auto']}
          maxH={['full', 'full', '90%']}
          maxW="3xl"
          my={{ base: 0, md: 20 }}
          mx={{ base: 0, md: 4 }}
          textColor="white"
          w="full"
          style={{ backdropFilter: 'blur(7px)' }}
        >
          <ModalHeader>{title.toUpperCase()}</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="100%">{Content && <Content />}</ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              variant="ghost"
              color="violet"
              p={6}
              w="full"
              bgColor="whiteAlpha.100"
              _hover={{ bg: 'whiteAlpha.200' }}
              _active={{ bg: 'whiteAlpha.200' }}
              onClick={onClose}
            >
              Close Window
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
