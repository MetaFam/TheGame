import { IconProps } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';
import React from 'react';

import { EthereumIcon } from './EthereumIcon';
import { GnosisIcon } from './GnosisIcon';
import { PolygonIcon } from './PolygonIcon';

type Props = {
  chain?: string;
  tooltip?: boolean;
};

export const ChainIcon: React.FC<Props & IconProps> = ({
  chain,
  tooltip = true,
  ...props
}) => {
  const lower = chain?.toLowerCase();
  const info = (() => {
    if (lower?.includes('gnosis')) {
      return { Icon: GnosisIcon, name: 'Gnosis' };
    }
    if (lower?.includes('xdai')) {
      // Prior to 2022/09 an xDai icon was used, with the chain identified by 'xdai'
      // Now using a Gnosis Chain icon, with the chain identified by 'gnosis'
      // Guilds added before we switched icons/values from xDai to Gnosis will
      // still have 'xdai' values for their chain in the database.
      // This conditional can be removed after/if the database is patched to change
      // all those from 'xdai' to 'gnosis'
      // See issue #1170 / PR 31336 for more
      return { Icon: GnosisIcon, name: 'Gnosis' };
    }
    if (lower?.includes('polygon')) {
      return { Icon: PolygonIcon, name: 'Polygon' };
    }
    return { Icon: EthereumIcon, name: 'Mainnet' };
  })();

  const icon = <info.Icon {...props} />;

  if (tooltip) {
    return (
      <Tooltip label={`on ${info.name}`} hasArrow>
        {icon}
      </Tooltip>
    );
  }

  return icon;
};
