import { AvatarProps } from '@metafam/ds';
import { SquareImage } from 'components/SquareImage';
import React from 'react';

export const RolePicture: React.FC<AvatarProps> = ({ src }) => (
  <SquareImage src={src} />
);
