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
import BackgroundImage from 'assets/main-background.jpg';
import ModalCardBg from 'assets/modal-bg.png';

type CardProps = {
  title: string;
  description: string;
  Content: () => JSX.Element;
};

export const Card: React.FC<CardProps> = ({ title, description, Content }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      direction="column"
      bg="whiteAlpha.200"
      borderRadius="lg"
      boxShadow="md"
      textColor="white"
      alignItems="center"
      textAlign="center"
      placeContent="center"
      p={6}
      maxW="md"
      minH="3xs"
      key={title}
      w={['full', 'auto']}
      cursor="pointer"
      onClick={onOpen}
      style={{ backdropFilter: 'blur(7px)' }}
      rounded="lg"
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
          borderRadius={['0', '0', 'xl']}
          bgImage={[ModalCardBg.src, ModalCardBg.src, BackgroundImage.src]}
          bgPos="center"
          bgColor="purpleModalDark"
          bgSize="cover"
          textColor="white"
          maxH={['full', 'full', '90%']}
          h={['full', 'full', 'auto']}
          w="full"
          maxW="3xl"
          alignItems="center"
          my={{ base: 0, md: 20 }}
          mx={{ base: 0, md: 4 }}
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
