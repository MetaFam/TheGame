import { IconProps } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';
import React from 'react';

import { EthereumIcon } from './EthereumIcon';
// import { XDaiIcon } from './XDaiIcon'; // Replaced by GnosisIcon
import { GnosisIcon } from './GnosisIcon';
import { PolygonIcon } from './PolygonIcon';

type Props = {
  chain?: string;
};

export const ChainIcon: React.FC<Props & IconProps> = ({ chain, ...props }) => {
  const lower = chain?.toLowerCase();
  const info = (() => {
    // Figure out this part later
    // if (lower?.includes('gnosis')) {
    //  return { Icon: GnosisIcon, name: 'Gnosis' };
    // }
    if (lower?.includes('xdai')) {
      // return { Icon: XDaiIcon, name: 'xDAI' }; // Just replace it with the Gnosis icon
      return { Icon: GnosisIcon, name: 'Gnosis' }; // testing to see if this is enough to do it
    }
    if (lower?.includes('polygon')) {
      return { Icon: PolygonIcon, name: 'Polygon' };
    }
    return { Icon: EthereumIcon, name: 'Mainnet' };
  })();
  return (
    <Tooltip label={`on ${info.name}`} hasArrow>
      <info.Icon {...props} />
    </Tooltip>
  );
};
