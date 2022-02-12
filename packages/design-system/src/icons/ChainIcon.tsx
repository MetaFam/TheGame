import { IconProps } from '@chakra-ui/icons';
import React from 'react';

import { EthereumIcon } from './EthereumIcon';
import { PolygonIcon } from './PolygonIcon';
import { XDaiIcon } from './XDaiIcon';

type Props = {
  chain: string | undefined;
};

export const ChainIcon: React.FC<Props & IconProps> = ({ chain, ...props }) => {
  if (chain?.toLowerCase().includes('xdai')) return <XDaiIcon {...props} />;
  if (chain?.toLowerCase().includes('polygon'))
    return <PolygonIcon {...props} />;
  return <EthereumIcon {...props} />;
};
