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
import SeedCardBg from 'assets/seed-card-bg.png';

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
      borderRadius="lg"
      borderWidth="1px"
      textColor="white"
      alignItems="center"
      textAlign="center"
      bgImage={SeedCardBg}
      placeContent="center"
      p={8}
      minH="3xs"
      key={title}
      w={['full', 'auto']}
      cursor="pointer"
      onClick={onOpen}
      sx={{
        bgColor: '#110035',
        borderColor: 'whiteAlpha.400',
        transition: 'all 0.1s ease-in-out',
        _hover: { bgColor: '#150042', borderColor: 'whiteAlpha.700' },
      }}
    >
      <Box borderTopRadius="lg">
        <Text fontSize="xl" fontWeight="bold" mt={1} mb={4}>
          {title.toUpperCase()}
        </Text>
        <Text mb={2}>{description}</Text>
        <Button
          variant="ghost"
          color="magenta"
          _hover={{ bg: '#FFFFFF11' }}
          _active={{ bg: '#FF000011' }}
          onClick={onOpen}
        >
          Learn More
        </Button>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent
          borderRadius={['0', '0', 'xl']}
          bgImage={[ModalCardBg, ModalCardBg, BackgroundImage]}
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
        >
          <ModalHeader fontSize={24} fontWeight="bold">
            {title.toUpperCase()}
            <ModalCloseButton color="purple" size="lg" top={4} />
          </ModalHeader>
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
