import { Box, Button } from '@metafam/ds';
import { useRouter } from 'next/router';
import { BsArrowDown } from 'react-icons/bs';

export const LandingNextButton = ({ section = '' }) => {
  const { push } = useRouter();

  const handleSectionNav = (sectionId: string) => {
    push(`#${sectionId}`);
  };

  return (
    <Box
      pos="absolute"
      bottom="0"
      py={{ base: 4, md: 20 }}
      maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
      zIndex={150}
    >
      <Button
        colorScheme="white"
        size="lg"
        textShadow="0 0 5px rgba(0,0,0,0.8)"
        rightIcon={<BsArrowDown />}
        onClick={() => handleSectionNav(section)}
      >
        Next
      </Button>
    </Box>
  );
};
