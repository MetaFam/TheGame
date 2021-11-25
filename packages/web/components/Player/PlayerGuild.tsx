import { Link } from '@metafam/ds';
import React from 'react';

import polygonImage from '../../assets/chains/polygon.png';
import xDaiImage from '../../assets/chains/xDai.png';
import ethereumImage from '../../assets/moloch/ethereum.png';
import hausdaoImage from '../../assets/moloch/hausdao.png';
import metacartelImage from '../../assets/moloch/metacartel.png';
import metaclanImage from '../../assets/moloch/metaclan.png';
import raidGuildImage from '../../assets/moloch/raid_guild.png';

type LinkGuildProps = {
  daoUrl: string;
  guildname: string | undefined;
};

const getHexChainId = (chain: string | undefined): string => {
  switch (chain?.toLowerCase()) {
    case 'xdai':
      return '0x64';
    case 'ethereum':
      return '0x1';
    case 'polygon':
      return '0x89';
    default:
      return '';
  }
};

export const getImageMoloch = (title: string): File => {
  if (title.toLowerCase().includes('hausdao')) return hausdaoImage;
  if (title.toLowerCase().includes('metacartel')) return metacartelImage;
  if (title.toLowerCase().includes('metaclan')) return metaclanImage;
  if (title.toLowerCase().includes('raid guild')) return raidGuildImage;
  if (title.toLowerCase().includes('xdai')) return xDaiImage;
  if (title.toLowerCase().includes('polygon')) return polygonImage;
  return ethereumImage;
};

export const getDaoLink = (
  chain: string | undefined,
  address: string | undefined,
): string => {
  const hexChainId = getHexChainId(chain);
  if (address && hexChainId) {
    return `https://app.daohaus.club/dao/${hexChainId}/${address.toLowerCase()}`;
  }
  return '';
};

export const LinkGuild: React.FC<LinkGuildProps> = ({
  daoUrl,
  guildname,
  children,
}) => {
  if (guildname != null) {
    return (
      <Link
        role="group"
        _hover={{ textDecoration: 'none' }}
        href={`/guild/${guildname}`}
      >
        {children}
      </Link>
    );
  }
  if (daoUrl != null) {
    return (
      <Link
        role="group"
        _hover={{ textDecoration: 'none' }}
        href={daoUrl}
        isExternal
      >
        {children}
      </Link>
    );
  }
  return <>{children}</>;
};
