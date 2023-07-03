import { AspectRatio, Image } from '@metafam/ds';
import React from 'react';

type Props = {
  src: string;
};

export const QuestTileImage: React.FC<Props> = ({ src }) => (
  <AspectRatio ratio={1}>
    <Image src={src} alt="" borderTopRadius={10} fit="cover" />
  </AspectRatio>
);
