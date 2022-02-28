import { IconProps } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';
import React from 'react';

import { EthereumIcon } from './EthereumIcon';
import { PolygonIcon } from './PolygonIcon';
import { XDaiIcon } from './XDaiIcon';

type Props = {
  chain?: string;
};

export const ChainIcon: React.FC<Props & IconProps> = ({ chain, ...props }) => {
  const lower = chain?.toLowerCase();
  const info = (() => {
    if (lower?.includes('xdai')) {
      return { Icon: XDaiIcon, name: 'xDAI' };
    }
    if (lower?.includes('polygon')) {
      return { Icon: PolygonIcon, name: 'Polygon' };
    }
    return { Icon: EthereumIcon, name: 'Ethereum' };
  })();
  return (
    <Tooltip label={`on the ${info.name} network`} hasArrow>
      <info.Icon {...props} />
    </Tooltip>
  );
};
