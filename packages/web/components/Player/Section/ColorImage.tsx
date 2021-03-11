import { ChakraProps, SVG } from '@metafam/ds'
import { PersonalityOption } from 'graphql/types';
import React from 'react'
import { svgArc } from 'utils/svgHelpers'

/* Generates a SVG consisting of two circles for displaying
 * a Magic color disposition. The outer circle is a pie
 * chart of the colors present. The inner circle is the
 * symbol for the disposition from the Magic canon.
 */
export const ColorImage = (
  (
    { type, types, ...props }:
    ChakraProps & {
      type: PersonalityOption,
      types: { [x: number]: PersonalityOption },
    }
  ): JSX.Element | null => {
    if (!type || !types) {
      return null;
    }
    const partMasks = (
      type.mask.toString(2).split('').reverse()
      .map((x: string, index: number) => (
        // eslint-disable-next-line no-bitwise
        x === '1' ? 1 << index : 0
      ))
      .filter((x: number) => x > 0)
    )
    const angle = 360 / partMasks.length

    return (
      <SVG
        viewBox='-50 -50 100 100'
        {...props}
      >
        <defs>
          <radialGradient id='overlay'>
            <stop offset='70%' stopColor='black' stopOpacity='0.75' />
            <stop offset='100%' stopColor='white' stopOpacity='0.1' />
          </radialGradient>
        </defs>
        {partMasks.map((mask: number, i: number) => (
          <path
            key={mask}
            d={svgArc({
              r: 50, start: i * angle, end: (i + 1) * angle
            })}
            fill={types[mask].name.toLowerCase()}
            stroke='black'
          />
        ))}
        <circle r='50' fill='url(#overlay)'/>
        {/* <image
          xlinkHref={type.image}
          x={-40} y={-40} width='80%' height='80%'
        /> */}
      </SVG>
    )
  } 
);
