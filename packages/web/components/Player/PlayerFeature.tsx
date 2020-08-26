import { Box, Text } from '@metafam/ds';
import React from 'react';

type Props = {
  title: string;
  value?: string | null | undefined;
} & React.ComponentProps<typeof Text>;

export const PlayerFeature: React.FC<Props> = ({
  title,
  value,
  children,
  ...props
}) => (
  <Box>
    <Text
      fontFamily="body"
      fontSize="sm"
      color="blueLight"
      textTransform="uppercase"
      mb="2"
    >
      {title}
    </Text>
    <Text fontFamily="body" fontSize="md" fontWeight="bold" {...props}>
      {value || children}
    </Text>
  </Box>
);
