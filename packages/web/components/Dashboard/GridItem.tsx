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
  title: string;
  children: React.ReactNode;
  sx: Record<string, unknown>;
};

export const GridItem: React.FC<MetaBoxProps> = ({
  children,
  title,
  ...props
}) => (
  <Box borderBottomRadius="lg" borderTopRadius="lg" p={6} boxShadow="md">
    <ContainerQuery
      query={containerQueries}
      initialSize={{ width: 100, height: 100 }}
    >
      {(params: Params) => (
        <Box className={classnames('container', params)} {...props}>
          <Heading size="md">{title}</Heading>
          {children}
        </Box>
      )}
    </ContainerQuery>
  </Box>
);
