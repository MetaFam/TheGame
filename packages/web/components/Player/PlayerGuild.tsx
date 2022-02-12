import { Link } from '@metafam/ds';
import React from 'react';

type LinkGuildProps = {
  daoUrl: string | null;
  guildname: string | undefined | null;
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
