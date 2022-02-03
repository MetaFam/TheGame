import { Box, ChakraProps, Flex, Text } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { Maybe } from 'graphql/autogen/types';
import {
  colors,
  images,
  PersonalityInfo,
} from 'graphql/queries/enums/getPersonalityInfo';
import React from 'react';

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
  personalityInfo: { parts, types },
  ...props
}: ChakraProps & {
  mask: Maybe<number>;
  personalityInfo: PersonalityInfo;
}): JSX.Element => {
  if (mask === null) {
    return <Text fontStyle="italic">Colors have not yet been chosen.</Text>;
  }

  return (
    <FlexContainer spacing={4} {...props}>
      <Text color="white">{types?.[mask]?.name}</Text>
      <Flex
        w="100%"
        h="1.5rem"
        border={0}
        borderRadius="1rem"
        overflow="hidden"
      >
        {parts.map((part) =>
          (mask & part.mask) === 0 ? null : (
            <Flex
              key={part.mask}
              grow={1}
              bg={`linear-gradient(to right, ${colors[part.mask].start}, ${
                colors[part.mask].end
              })`}
            />
          ),
        )}
      </Flex>
      <Flex w="100%">
        {parts.map((part) => {
          const set = (mask & part.mask) !== 0;

          return !set ? null : ( // if the bit isn't set // return null for map to work
            <Flex key={part.mask} grow={1} justify="center" opacity={1}>
              <Box
                bg={`linear-gradient(to top, ${colors[part.mask].start}, ${
                  colors[part.mask].end
                })`}
                h={6}
                w={6}
                title={part.name}
                style={maskImageStyle({ url: images[part.mask] })}
              />
            </Flex>
          );
        })}
      </Flex>
    </FlexContainer>
  );
};
