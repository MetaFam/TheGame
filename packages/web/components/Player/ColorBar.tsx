/* eslint no-bitwise: "off" */

import { Box, ChakraProps, Flex, SVG } from "@metafam/ds";
import { FlexContainer } from "components/Container";
import {
  colors,
  getPersonalityInfo,
  MetaGameAliases,
} from "graphql/getPersonalityInfo";
import { PersonalityOption } from "graphql/types";
import React, { useEffect, useState } from "react";

// This is just verbose, so I am pulling it out to
// save space in the main template
const maskImageStyle = (
  ({ url }: { url: string }): Record<string, string> => ({
    maskImage: `url(${url})`,
    maskSize: 'contain',
    maskPosition: 'center',
    maskRepeat: 'no-repeat',
    WebkitMaskImage: `url(${url})`,
    WebkitMaskSize: 'contain',
    WebkitMaskPosition: 'center',
    WebkitMaskRepeat: 'no-repeat',
  })
);

/* The color bar is below the attribute selection screen,
  * and shows an equally proportioned set of colors with
  * monochrome icons above them and a term for the
  * combination below.
  */
export const ColorBar = (
  (
    { mask = 0, ...props }:
    ChakraProps & { mask: number | undefined },
  ): JSX.Element => {
    const [parts, setParts] = (
      useState<Array<PersonalityOption>>([])
    );
    const [types, setTypes] = (
      useState<Record<number, PersonalityOption>>({})
    );
    const load = async () => {
      const { parts: ps, types: ts } = (
        await getPersonalityInfo()
      )
      setParts(ps)
      setTypes(ts)
    }

    useEffect(() => { load() }, []);

    return (
      <Flex
        direction='column'
        maxW='100%'
        className="color-bar"
        {...props}
      >
        <Flex maxW='100%' minH='1.5rem' mb='1rem'>
          {parts.map((part) => {
            const set = ((mask & part.mask) !== 0)
            const alias = MetaGameAliases[part.mask]

            return (
              !set // if the bit isn't set
              ? ( null ) // need to return null for map to work
              : (
                <Flex
                  key={part.mask}
                  grow={1} justify='center'
                  opacity={0.75}
                >
                  <Box
                    bgColor='white'
                    h={6} w={6}
                    title={alias.label}
                    style={maskImageStyle({ url: alias.image })}
                  />
                </Flex>
              )
            )
          })}
        </Flex>
        <Flex
          minH='calc(1.5rem + 4px)' maxW='100%'
          border='2px' borderRadius={3}
        >
          {parts.map((part) => (
            ((mask & part.mask) === 0)
            ? ( null )
            : (
              <Flex
                key={part.mask}
                grow={1}
                h='1.5rem'
              >
                <SVG
                  viewBox='0 0 100 100'
                  preserveAspectRatio='none'
                  w='100%'
                >
                  <defs>
                    <linearGradient
                      id="shading"
                      gradientTransform="rotate(90)"
                    >
                      <stop
                        offset="5%"
                        stopColor="black" stopOpacity={0.5}
                      />
                      <stop
                        offset="95%"
                        stopColor="white" stopOpacity={0.25}
                      />
                    </linearGradient>
                  </defs>
                  <rect
                    width='100%' height='100%'
                    fill={colors[part.mask]}
                  />
                  <rect
                    width='100%' height='100%'
                    fill='url(#shading)'
                  />
                </SVG>
              </Flex>
            )
          ))}
        </Flex>
        <FlexContainer mt={1}>
          <q>{types?.[mask]?.name}</q>
        </FlexContainer>
      </Flex>
    )
  }
);
