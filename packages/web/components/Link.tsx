import { Link } from '@metafam/ds';
import NextLink, { LinkProps } from 'next/link';
import React from 'react';

type Props = LinkProps;

export const MetaLink: React.FC<Props> = ({ children, ...props }) => (
  <NextLink {...props} passHref>
    {/*  NextLink passes the href */}
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <Link>{children}</Link>
  </NextLink>
);
