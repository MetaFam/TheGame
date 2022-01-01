import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { Box, Heading } from '@metafam/ds';
import classnames from 'classnames';
import React from 'react';
import { ContainerQuery } from 'react-container-query';

import { containerQueries } from './Section';

export interface Params {
  [key: string]: boolean;
}

export type MetaBoxProps = {
  title?: string;
  sx?: Record<string, unknown>;
  p?: number;
  children: React.ReactNode;
};

export const GridItem: React.FC<MetaBoxProps> = ({
  title,
  sx,
  p = 6,
  children,
}) => (
  <Box borderBottomRadius="lg" borderTopRadius="lg" p={p} boxShadow="md">
    <ContainerQuery query={containerQueries}>
      {(params: Params) => (
        <Box className={classnames('container', params)} sx={sx}>
          {title && <Heading size="md">{title}</Heading>}
          {children}
        </Box>
      )}
    </ContainerQuery>
  </Box>
);
