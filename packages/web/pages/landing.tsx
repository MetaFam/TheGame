import { PageContainer } from 'components/Container';
import { Build } from 'components/Landing/Build';
import { Game } from 'components/Landing/Game';
import { Intro } from 'components/Landing/Intro';
import { JustWatch } from 'components/Landing/JustWatch';
import { Optimal } from 'components/Landing/Optimal';
import { Revolution } from 'components/Landing/Revolution';
import { Together } from 'components/Landing/Together';
import { WhatWeDo } from 'components/Landing/WhatWeDo';
import { Who } from 'components/Landing/Who';
import { WildWeb } from 'components/Landing/WildWeb';
import React from 'react';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

const Landing: React.FC = () => (
  <>
    {/* <LandingHeader /> */}
    <PageContainer
      p={0}
      sx={{
        '.gradient-text': {
          background:
            'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
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
      <Intro />
      <Game />
      <Build />
      <Revolution />
      <WildWeb />
      <Together />
      <WhatWeDo />
      <Optimal />
      <Who />
      <JustWatch />
    </PageContainer>
  </>
);

export default Landing;

// const NavLink = ({
//   children,
//   target,
// }: {
//   children: ReactNode;
//   target: string;
// }) => (
//   <Link
//     px={2}
//     py={1}
//     _hover={{
//       textDecoration: 'none',
//     }}
//     href={`#${target}`}
//     sx={{
//       background: 'linear-gradient(90deg, #FFF -29.22%, #FFF 107.53%)',
//       backgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       transition: 'backgroundImage 0.3s ease-in',
//       '&.active, &:hover': {
//         background: 'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
//         backgroundClip: 'text',
//         WebkitTextFillColor: 'transparent',
//       },
//     }}
//   >
//     {children}
//   </Link>
// );

// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export const LandingHeader: React.FC = () => {
//   const [toggle, setToggle] = useState(false);

//   return (
//     <>
//       // Header wrapper
//       <Box
//         as="header"
//         pos="fixed"
//         textAlign="center"
//         w="full"
//         top={0}
//         bgColor="dark"
//         zIndex={300}
//         sx={{
//           backgroundColor: 'landingDarkGlass',
//           backdropFilter: 'blur(7px)',
//           '.border-grad': {
//             border: '1px double transparent',
//             background: 'transparent',
//             backgroundImage:
//               'linear-gradient(#1B0D2A, #1B0D2A), radial-gradient(circle at top left, #FF61E6 -29.22%, #7C56FF 107.53%)',
//             backgroundClip: 'padding-box, border-box',
//             backgroundOrigin: 'border-box',
//             WebkitBackgroundOrigin: 'border-box',
//             boxSizing: 'border-box',
//             '& > span': {
//               background:
//                 'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
//               backgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               transition: 'all 0.3s ease',
//             },
//             '&:hover': {
//               backgroundImage:
//                 'linear-gradient(#1B0D2A, #1B0D2A), radial-gradient(circle at top left, #FF61E6 -29.22%, #7C56FF 107.53%)',
//               backgroundSize: '130%',
//               '& > span': {
//                 background:
//                   'linear-gradient(-90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
//                 backgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//               },
//             },
//           },
//         }}
//       >
//         <Flex
//           h={14}
//           mx="auto"
//           alignItems="center"
//           justifyContent="space-between"
//           w={{ base: '100%', md: '7xl', '2xl': '8xl' }}
//         >
//           {/* // Header logo */}
//           <HStack spacing={8} alignItems="center" zIndex={toggle ? 600 : 0}>
//             <NavLink key="link-home-logo" target="section-1">
//               <HStack
//                 fontFamily="body"
//                 fontSize="md"
//                 spacing={2}
//                 alignItems="center"
//                 justifyContent="flex-start"
//               >
//                 <BoxedNextImage
//                   src={LogoNew}
//                   alt="MetaGame Logo"
//                   width="35px"
//                   height="39px"
//                 />
//                 <Box as="span">MetaGame</Box>
//               </HStack>
//             </NavLink>
//           </HStack>
//           {/* Menu Desktop */}
//           <HStack
//             as="nav"
//             className="header__menu--desktop"
//             d={{ base: 'none', md: 'block' }}
//             alignItems="center"
//             fontSize="xs"
//           >
//             <NavLink key={'link-home'} target="section-1">
//               Home
//             </NavLink>
//             <NavLink key={'link-about'} target="section-2">
//               About
//             </NavLink>
//             <NavLink key={'link-mission'} target="section-3">
//               Mission
//             </NavLink>
//             <NavLink key={'link-whatdo'} target="section-4">
//               What we do?
//             </NavLink>
//           </HStack>
//           {/* // Header join button */}
//           <HStack d={{ base: 'none', md: 'block' }} alignItems="center">
//             <Button className="border-grad" rounded="md" size="md" px={10}>
//               <Box as="span">Join</Box>
//             </Button>
//           </HStack>

//           {/* // Header toggle button (mobile) */}
//           <Button
//             className="menu__toggle-button"
//             onClick={() => setToggle(!toggle)}
//             sx={{
//               display: [`flex`, `flex`, `flex`, `none`, `none`],
//               alignSelf: `center`,
//               justifySelf: `right`,
//               position: `relative`,
//               flexDirection: `column`,
//               justifyContent: `space-around`,
//               width: [`1.5rem`, `1.5rem`, `2rem`],
//               height: [`1.5rem`, `1.5rem`, `2rem`],
//               background: `transparent`,
//               border: `none`,
//               cursor: `pointer`,
//               padding: 0,
//               marginRight: `5%`,
//               zIndex: 401,
//               overflow: `hidden`,
//               '&:focus': {
//                 outline: `none`,
//               },
//               div: {
//                 width: [`1.5rem`, `1.5rem`, `2rem`],
//                 height: [`0.08rem`, `0.1rem`, `0.2rem`],
//                 backgroundColor: toggle ? `transparent` : `transparent`,
//                 borderRadius: [`5px`, `5px`, `10px`],
//                 transition: `all 0.3s linear`,
//                 position: `relative`,
//                 transformOrigin: `1px`,
//                 opacity: toggle ? 1 : 0.6,
//                 '&:first-of-type': {
//                   transform: toggle
//                     ? 'rotate(45deg) translate3d(2px, -1px, 0)'
//                     : 'rotate(0)',
//                 },
//                 '&:nth-of-type(2)': {
//                   opacity: toggle ? '0' : '0.6',
//                   transform: toggle
//                     ? 'translate3d(-20px, 0, 0)'
//                     : 'translate3d(0, 0, 0)',
//                 },
//                 '&:nth-of-type(3)': {
//                   transform: toggle
//                     ? 'rotate(-45deg) translate3d(-1px, -1px, 0)'
//                     : 'rotate(0)',
//                 },
//               },
//               'path, circle': {
//                 fill: toggle ? `brand.secondary.light` : `white`,
//                 transition: `all 0.2s 0.2s ease`,
//               },
//             }}
//           >
//             <div>
//               <SVG />
//             </div>
//             <div>
//               <SVG />
//             </div>
//             <div>
//               <SVG />
//             </div>
//           </Button>
//         </Flex>
//       </Box>
//       <Container
//         className="menu--mobile"
//         d="flex"
//         flexFlow="column wrap"
//         position="fixed"
//         alignItems="center"
//         justifyContent="center"
//         background="landingDarkGlass"
//         height="100vh"
//         width="100%"
//         overflowY="hidden"
//         zIndex={200}
//         sx={{
//           opacity: toggle ? 1 : 0,
//           transform: toggle
//             ? `translate3d(0, 0, 0)`
//             : `translate3d(0, -120%, 0)`,
//           transition: `transform 0.3s 0.1s ease-in-out, opacity 0.3s 0.2s ease-in-out`,
//           backgroundColor: 'landingDarkGlass',
//           backdropFilter: 'blur(7px)',
//           '.border-grad': {
//             border: '1px double transparent',
//             background: 'transparent',
//             backgroundImage:
//               'linear-gradient(#1B0D2A, #1B0D2A), radial-gradient(circle at top left, #FF61E6 -29.22%, #7C56FF 107.53%)',
//             backgroundClip: 'padding-box, border-box',
//             backgroundOrigin: 'border-box',
//             WebkitBackgroundOrigin: 'border-box',
//             boxSizing: 'border-box',
//             '& > span': {
//               background:
//                 'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
//               backgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               transition: 'all 0.3s ease',
//             },
//             '&:hover': {
//               backgroundImage:
//                 'linear-gradient(#1B0D2A, #1B0D2A), radial-gradient(circle at top left, #FF61E6 -29.22%, #7C56FF 107.53%)',
//               backgroundSize: '130%',
//               '& > span': {
//                 background:
//                   'linear-gradient(-90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
//                 backgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//               },
//             },
//           },
//         }}
//       >
//         <VStack
//           as="nav"
//           className="menu--mobile__menu-items"
//           d={{ base: 'flex', md: 'none' }}
//           fontSize="md"
//           spacing={4}
//           mb={{ base: 16 }}
//         >
//           <NavLink key={'link-home'} target="section-1">
//             Home
//           </NavLink>
//           <NavLink key={'link-about'} target="section-2">
//             About
//           </NavLink>
//           <NavLink key={'link-mission'} target="section-3">
//             Mission
//           </NavLink>
//           <NavLink key={'link-whatdo'} target="section-4">
//             What we do?
//           </NavLink>
//         </VStack>
//         <Button className="border-grad" rounded="md" size="md" px={10}>
//           <Box as="span">Join</Box>
//         </Button>
//       </Container>
//     </>
//   );
// };

// // type IconType = 'navToggle';

// export const icons = {
//   navToggle: {
//     shape: (
//       <>
//         <path
//           d="M3.42182 56.6965C5.3095 56.6965 6.84131 58.2283 6.84131 60.116C6.84131 62.0059 5.3095 63.5355 3.42182 63.5355C1.53414 63.5355 0.00232906 62.0059 0.00232899 60.116C0.00232893 58.2283 1.53414 56.6965 3.42182 56.6965Z"
//           fill="white"
//         />
//         <path
//           d="M3.42182 28.5828C5.3095 28.5828 6.84131 30.1124 6.84131 32.0023C6.84131 33.8899 5.3095 35.4218 3.42182 35.4218C1.53414 35.4218 0.00232906 33.8899 0.00232899 32.0023C0.00232893 30.1124 1.53414 28.5828 3.42182 28.5828Z"
//           fill="white"
//         />
//         <path
//           d="M3.41961 0.468262C5.3095 0.468262 6.84131 2.00007 6.84131 3.88776C6.84131 5.77544 5.3095 7.30726 3.41961 7.30726C1.53193 7.30726 0.00011749 5.77545 0.000117423 3.88776C0.000117356 2.00007 1.53193 0.468262 3.41961 0.468262Z"
//           fill="white"
//         />
//       </>
//     ),
//     viewBox: `0 0 59 64`,
//   },
// };

// // type SVGProps = {
// //   stroke?: string;
// //   color?: string | number ;
// //   width: string | number;
// //   height: string | number;
// //   icon: string | IconType;
// //   left?: string | number;
// //   right?: string | number;
// //   top?: string | number;
// //   bottom?: string | number;
// //   strokeDashoffset?: number;
// //   preserveAspectRatio?: string;
// //   hiddenMobile?: boolean;
// //   opacity?: number;
// //   transform?: string;
// //   fill?: string;
// //   zIndex: number;
// //   position?: string;
// //   pointerEvents?: string;
// // };

// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export const SVG = () => (
//   <Box
//     as="svg"
//     width={[`1.5rem`, `1.5rem`, `2rem`]}
//     left="0"
//     bottom="0"
//     top={[0]}
//     transform={`rotate(90deg)`}
//     preserveAspectRatio="xMidYMid meet"
//     viewBox="0 0 59 64"
//   >
//     <path
//       d="M3.42182 56.6965C5.3095 56.6965 6.84131 58.2283 6.84131 60.116C6.84131 62.0059 5.3095 63.5355 3.42182 63.5355C1.53414 63.5355 0.00232906 62.0059 0.00232899 60.116C0.00232893 58.2283 1.53414 56.6965 3.42182 56.6965Z"
//       fill="white"
//     />
//     <path
//       d="M3.42182 28.5828C5.3095 28.5828 6.84131 30.1124 6.84131 32.0023C6.84131 33.8899 5.3095 35.4218 3.42182 35.4218C1.53414 35.4218 0.00232906 33.8899 0.00232899 32.0023C0.00232893 30.1124 1.53414 28.5828 3.42182 28.5828Z"
//       fill="white"
//     />
//     <path
//       d="M3.41961 0.468262C5.3095 0.468262 6.84131 2.00007 6.84131 3.88776C6.84131 5.77544 5.3095 7.30726 3.41961 7.30726C1.53193 7.30726 0.00011749 5.77545 0.000117423 3.88776C0.000117356 2.00007 1.53193 0.468262 3.41961 0.468262Z"
//       fill="white"
//     />
//   </Box>
// );
