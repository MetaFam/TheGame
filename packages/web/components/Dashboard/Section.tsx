// import { Box, ChakraProps } from '@metafam/ds';
// import classnames from 'classnames';
// import React, { FC, ReactElement, ReactNode, Ref } from 'react';
// import { ContainerQuery } from 'react-container-query';

export interface Query {
  [key: string]: ContainerQueries;
}
export interface Params {
  [key: string]: boolean;
}
export interface ContainerQueries {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

export const containerQueries = {
  container__xxs: {
    minWidth: 0,
    maxWidth: 129,
  },
  container__xs: {
    minWidth: 130,
    maxWidth: 278,
  },
  container__sm: {
    minWidth: 278,
    maxWidth: 426,
  },
  container__md: {
    minWidth: 427,
    maxWidth: 575,
  },
  container__lg: {
    minWidth: 576,
    maxWidth: 725,
  },
  container__xl: {
    minWidth: 726,
    maxWidth: 875,
  },
};

// interface DashboardSectionInterface {
//   containerQuery: Query;
//   id: string;
//   // children: React.ReactElement;
// }

// export const DashboardSection = React.forwardRef<HTMLDivElement, DashboardSectionInterface>({ style = {}, className = '' }, { containerQuery, id }, ...props, ref) => {
//   const { containerQuery, id } = props;
//   console.log('Section: ', containerQuery, id);

//   return (
//     <Box key={`${id}`} className="gridItem" style={style}>
//       <Box borderBottomRadius="lg" borderTopRadius="lg" p={6} boxShadow="md">
//         <ContainerQuery query={containerQuery}>
//           {(params) => <Box className={classnames(params)}>{children}</Box>}
//         </ContainerQuery>
//       </Box>
//     </Box>
//   );
// }
