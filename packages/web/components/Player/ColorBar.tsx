import { Box, ChakraProps, Flex, Link, Stack, Text } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { Maybe } from 'graphql/autogen/types';
import {
  colors,
  ColorStops,
  images as MaskImages,
  PersonalityInfo,
} from 'graphql/queries/enums/getPersonalityInfo';
import React, { ReactElement } from 'react';

// This is just verbose, so I am pulling it out to
// save space in the main template
const maskImageStyle = ({ url }: { url: string }): Record<string, string> => ({
  maskImage: `url(${url})`,
  maskSize: 'contain',
  maskPosition: 'center',
  maskRepeat: 'no-repeat',
  WebkitMaskImage: `url(${url})`,
  WebkitMaskSize: 'contain',
  WebkitMaskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
});

/* The color bar is below the attribute selection screen,
 * and shows an equally proportioned set of colors with
 * monochrome icons above them and a term for the
 * combination below.
 */
export const ColorBar = ({
  mask = null,
  types = null,
  ...props
}: ChakraProps & {
  mask: Maybe<number>;
  types: PersonalityInfo;
}): JSX.Element => {
  if (types == null) {
    return (
      <Text fontStyle="italic" textAlign="center">
        Loading Personality Information…
      </Text>
    );
  }

  if (mask === null) {
    return (
      <Text fontStyle="italic" textAlign="center">
        Colors have not yet been chosen.
      </Text>
    );
  }

  if (types[mask] == null) {
    return (
      <Text fontStyle="italic" textAlign="center">
        Error Loading Information For Mask: “{mask.toString(2).padStart(5, '0')}
        ”
      </Text>
    );
  }

  type ImagesArgProps = {
    bit: number;
    set: boolean;
    image: string;
  } & Pick<ColorStops, 'start' | 'end'>;

  const Images: React.FC = ({ children }) => (
    <>
      {Object.entries(MaskImages)
        .reverse()
        .map(([bitString, image]) => {
          const bit = Number(bitString);
          const set = (mask & bit) !== 0;
          const { start, end } = colors[bit];

          return !set
            ? null
            : (children as (props: ImagesArgProps) => ReactElement)({
                bit,
                set,
                start,
                end,
                image,
              });
        })}
    </>
  );

  return (
    <Link
      isExternal
      href={`//dysbulic.github.io/5-color-radar/#/combos/${mask
        .toString(2)
        .padStart(5, '0')}`}
      fontSize={['md', 'lg']}
      fontWeight={600}
      _focus={{
        border: 'none',
        textDecoration: 'underline',
      }}
      tabIndex={1}
    >
      <Stack
        direction={['column-reverse', 'column']}
        w="100%"
        maxW="100%"
        {...props}
      >
        <Flex maxW="100%" minH="1.5rem" mt={3}>
          <Images>
            {({ bit, start, end, image }: ImagesArgProps) => (
              <Flex key={bit} grow={1} justify="center" opacity={1}>
                <Box
                  bg={`linear-gradient(to top, ${start}, ${end})`}
                  h={6}
                  w={6}
                  title={types[bit].name}
                  style={maskImageStyle({ url: image })}
                />
              </Flex>
            )}
          </Images>
        </Flex>
        <Flex
          minH="1.5rem"
          flex="0 0 100%"
          minW="100%"
          border={0}
          borderRadius="md"
          overflow="hidden"
        >
          <Images>
            {({ bit, start, end }: ImagesArgProps) => (
              <Flex
                key={bit}
                grow={1}
                h="1.5rem"
                bg={`linear-gradient(to right, ${start}, ${end})`}
              />
            )}
          </Images>
        </Flex>
        <FlexContainer mb={2} minH="1.5rem">
          <Text color="white">{types[mask].name}</Text>
        </FlexContainer>
      </Stack>
    </Link>
  );
};
