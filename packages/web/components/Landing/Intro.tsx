import { Container } from '@metafam/ds';
import BackgroundImage from 'assets/landing/sections/section-1.jpg';
import { FullPageContainer } from 'components/Container';

import { IntroHero } from './IntroHero';

export const Intro: React.FC = () => (
  <FullPageContainer
    id="section-1"
    bgImageUrl={BackgroundImage}
    spacing={8}
    justify="flex-end"
    sx={{
      h2: {
        '& > .gradient': {
          background:
            'conic-gradient(from 92.2deg at 53.45% 74.83%, #8EBBFF 0deg, #DE3FFF 88.12deg, #79F8FB 105deg, #7C56FF 165deg, #FF61E6 251.25deg, #927CFF 286.87deg, #76EBF2 326.25deg, #8EBBFF 360deg)',
          backgroundPosition: '-254%',
          backgroundSize: '133%',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitTextFillColor: 'transparent',
          transition: 'background 0.3s ease',
        },
        // '&:hover': {
        //   '.gradient': {
        //     animation: `${gradientShift} 2s infinite`,
        //   },
        // },
      },
      '.gradient': {
        background: 'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      '.border-grad': {
        border: '1px double transparent',
        background: 'transparent',
        backgroundImage:
          'linear-gradient(#1B0D2A, #1B0D2A), radial-gradient(circle at top left, #FF61E6 -29.22%, #7C56FF 107.53%)',
        backgroundClip: 'padding-box, border-box',
        backgroundOrigin: 'border-box',
        WebkitBackgroundOrigin: 'border-box',
        boxSizing: 'border-box',
        '& > span': {
          background:
            'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transition: 'all 0.3s ease',
        },
        '&:hover': {
          backgroundImage:
            'linear-gradient(#1B0D2A, #1B0D2A), radial-gradient(circle at top left, #FF61E6 -29.22%, #7C56FF 107.53%)',
          backgroundSize: '130%',
          '& > span': {
            background:
              'linear-gradient(-90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
        },
      },
    }}
  >
    <Container
      d="flex"
      maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
      height="100%"
      alignItems="flex-end"
      justifyContent="center"
    >
      <IntroHero />
    </Container>
  </FullPageContainer>
);
