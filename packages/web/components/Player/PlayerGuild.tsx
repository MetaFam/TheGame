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
  daoUrl: string | null;
  guildname: string | undefined;
};

export const getMolochImage = (title: string) => {
  title = title.toLowerCase(); // eslint-disable-line no-param-reassign
  if (title.includes('hausdao')) return hausdaoImage;
  if (title.includes('metacartel')) return metacartelImage;
  if (title.includes('metaclan')) return metaclanImage;
  if (title.includes('raid guild')) return raidGuildImage;
  if (title.includes('xdai')) return xDaiImage;
  if (title.includes('polygon')) return polygonImage;
  return ethereumImage;
};

const getHexChainId = (chain: string | undefined): string => {
  switch (chain?.toLowerCase()) {
    case 'xdai': return '0x64';
    case 'polygon': return '0x89';
    case 'ethereum': default: return '0x1';
  }
};

export const getDaoLink = (
  chain: string | undefined,
  address: string | undefined,
): string | null => {
  if (address && chain) {
    const hexChainId = getHexChainId(chain);
    address = address.toLowerCase(); // eslint-disable-line no-param-reassign
    return `https://app.daohaus.club/dao/${hexChainId}/${address}`;
  }
  return null;
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
