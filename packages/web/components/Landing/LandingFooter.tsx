import { Box, BoxedNextImage, HStack } from '@metafam/ds';
import MetaGameLogo from 'assets/logo-new.png';
import { MetaLink } from 'components/Link';

export const LandingFooter = ({ currentSection = '' }) => (
  <Box
    as="footer"
    d="flex"
    w="33%"
    flexFlow="row nowrap"
    position="fixed"
    justifyContent="center"
    bottom={20}
    left="33%"
    opacity={currentSection === 'section-10' ? 1 : 0}
    transition="opacity 0.3s 0.3s ease"
    zIndex={200}
  >
    <HStack spacing={8} alignItems="center">
      <MetaLink
        href="#section-1"
        sx={{
          transition: 'all 0.3s ease',
          '&:hover': {
            filter: 'drop-shadow(0 0 20px #79F8FB)',
          },
        }}
      >
        <HStack
          fontFamily="body"
          fontSize="md"
          spacing={2}
          alignItems="center"
          justifyContent="flex-start"
        >
          <BoxedNextImage
            src={MetaGameLogo}
            alt="MetaGame Logo"
            width="35px"
            height="39px"
          />
        </HStack>
      </MetaLink>
    </HStack>
  </Box>
);
