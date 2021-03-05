const polarToCartesian = (
  (
    cx = 0, cy = 0,
    radius: number, angleInDegrees: number
  ) => {
    const angleInRadians = (
      (angleInDegrees - 90) * Math.PI / 180.0
    );
    return {
      x: cx + (radius * Math.cos(angleInRadians)),
      y: cy + (radius * Math.sin(angleInRadians))
    };
  }
);

/* Generate a SVG path arc element for a circle
 * centered at <cx, cy>.
 *
 * From: https://stackoverflow.com/a/18473154/264008
 */
export const svgArc = (
  ({
    cx = 0, cy = 0, r,
    start, end = start + 90
  }: {
    cx?: number, cy?: number, r: number,
    start: number, end?: number
  }): string => {
    if ((end - start) % 360 === 0) {
      return (
        [
          'm-50,0',
          'a 50,50 0 1,1 100,0',
          'a 50,50 0 1,1 -100,0',
        ].join(' ')
      )
    }

    const to = polarToCartesian(cx, cy, r, end);
    const from = polarToCartesian(cx, cy, r, start);
    const largeArcFlag = end - start <= 180 ? 0 : 1;
    return (
      [
        'M0,0',
        'L', from.x, from.y,
        'A', r, r, 0, largeArcFlag, 1, to.x, to.y,
        'z',
      ].join(' ')
    );
  }
);
