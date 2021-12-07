import { Box, Text } from '@metafam/ds';
import React, { useEffect, useState } from 'react';
import { parse } from 'rss-to-json';
import useSWR from 'swr';

const url = 'http://localhost:3000/api/metagame/feed';

export const Read: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { data, error } = useSWR(url, parse);
  console.log(data);

  return (
    <Box>
      <Text>A feed of news and events</Text>
    </Box>
  );
};
