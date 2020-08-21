import { Link } from '@metafam/ds';
import NextLink, { LinkProps } from 'next/link';
import React from 'react';

type Props = Omit<React.ComponentProps<typeof Link>, keyof LinkProps> &
  LinkProps;

export const MetaLink: React.FC<Props> = ({
  children,
  href,
  as,
  passHref,
  prefetch,
  replace,
  scroll,
  shallow,
  ...props
}) => (
  <NextLink
    href={href}
    as={as}
    passHref={passHref || true}
    prefetch={prefetch}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
  >
    {/*  NextLink passes the href */}
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <Link color="cyan.400" {...props}>
      {children}
    </Link>
  </NextLink>
);
