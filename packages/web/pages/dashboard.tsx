import { Grid, GridItem, Text } from '@metafam/ds';
import React from 'react';

const Dashboard: React.FC = () => (
  <>
    <Grid
      h="84vh"
      templateRows="repeat(4, 1fr)"
      templateColumns="repeat(4, 1fr)"
      gap={4}
      mt={4}
      ml={4}
      mr={4}
    >
      <GridItem rowSpan={4} colSpan={2} bg="#0F041A">
        <Text>Latest Content</Text>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1} bg="#0F041A">
        <Text>XP</Text>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1} bg="#0F041A">
        <Text>SEEDS</Text>
      </GridItem>
      <GridItem rowSpan={3} colSpan={1} bg="#0F041A">
        <Text>CALENDAR</Text>
      </GridItem>
      <GridItem rowSpan={3} colSpan={1} bg="#0F041A">
        <Text>LEADERBOARD</Text>
      </GridItem>
    </Grid>
  </>
);

export default Dashboard;
