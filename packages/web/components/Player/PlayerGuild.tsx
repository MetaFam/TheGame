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
    return <InternalGuildLink guildName={guildname} children={children} />;
  }
  if (daoUrl != null) {
    return <DaoHausLink daoUrl={daoUrl} children={children} />;
  }
  return <>{children}</>;
};

type InternalGuildLinkProps = {
  guildName: string;
};

export const InternalGuildLink: React.FC<InternalGuildLinkProps> = ({
  guildName,
  children,
}) => (
  <Link
    role="group"
    _hover={{ textDecoration: 'none' }}
    href={`/guild/${guildName}`}
  >
    {children}
  </Link>
);

type DaoHausLinkProps = {
  daoUrl: string | null;
};

export const DaoHausLink: React.FC<DaoHausLinkProps> = ({ daoUrl, children }) =>
  daoUrl != null ? (
    <Link
      role="group"
      _hover={{ textDecoration: 'none' }}
      href={daoUrl}
      isExternal
    >
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
