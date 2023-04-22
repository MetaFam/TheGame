import { AspectRatio, Image } from '@metafam/ds';
import React from 'react';

type Props = {
  src: string;
};

export const QuestDetailsImage: React.FC<Props> = ({ src }) => (
  <AspectRatio
    ratio={{
      base: 1 / 1,
      md: 2 / 1,
      lg: 4 / 3,
      xl: 2 / 1,
    }}
  >
    <Image src={src} alt="" fit="cover" />
  </AspectRatio>
);
