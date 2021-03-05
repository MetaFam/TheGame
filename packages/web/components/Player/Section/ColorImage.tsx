import React from 'react'
import { svgArc } from 'utils/svgHelpers'
import { SVG } from '@metafam/ds'

export const ColorImage = (
  ({ type, types, ...props }): JSX.Element | null => {
    if (!type || !types) {
      return null;
    }
    // https://stackoverflow.com/a/55766546/264008
    const partMasks = (
      type.mask.toString(2).split('').reverse()
      .map((x: string, index: number) => (
        // eslint-disable-next-line no-bitwise
        x === '1' ? 1 << index : 0
      ))
      .reverse().filter((x: number) => x > 0)
    )
    const numSections = partMasks.length
    const angle = 360 / numSections

    return (
      <SVG
        viewBox='-50 -50 100 100'
        {...props}
      >
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
        <image
          xlinkHref={type.image}
          x={-40} y={-40} width='80%' height='80%'
        />
      </SVG>
    )
  } 
);
