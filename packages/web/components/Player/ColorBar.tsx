import { Box, ChakraProps, Flex } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { colors, getPersonalityInfo, images } from 'graphql/getPersonalityInfo';
import { PersonalityOption } from 'graphql/types';
import React, { useEffect, useState } from 'react';

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
  mask = 0,
  ...props
}: ChakraProps & { mask: number | undefined }): JSX.Element => {
  const [parts, setParts] = useState<Array<PersonalityOption>>([]);
  const [types, setTypes] = useState<Record<number, PersonalityOption>>({});
  const load = async () => {
    const { parts: ps, types: ts } = await getPersonalityInfo();
    setParts(ps);
    setTypes(ts);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Flex
      direction="column-reverse"
      w="100%"
      maxW="100%"
      className="color-bar"
      {...props}
    >
      <Flex maxW="100%" minH="1.5rem" mt={3}>
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
      <Flex
        minH="calc(1.5rem)"
        flex="0 0 100%"
        minW="100%"
        border="0"
        borderRadius="15px"
        overflow="hidden"
      >
        {parts.map((part) =>
          (mask & part.mask) === 0 ? null : (
            <Flex
              key={part.mask}
              grow={1}
              h="1.5rem"
              bg={`linear-gradient(to right, ${colors[part.mask].start}, ${
                colors[part.mask].end
              })`}
            />
          ),
        )}
      </Flex>
      <FlexContainer mb={2}>
        <q>{types?.[mask]?.name}</q>
      </FlexContainer>
    </Flex>
  );
};
