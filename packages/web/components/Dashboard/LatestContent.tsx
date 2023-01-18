import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@metafam/ds';
import React from 'react';

import { Listen } from './LatestContentTabs/Listen';
import { Read } from './LatestContentTabs/Read';
import { Watch } from './LatestContentTabs/Watch';

export const LatestContent: React.FC = () => (
  <Flex direction="column" p={6} pr={4} minH="100%" w="100%">
    <Text fontSize="lg" fontWeight="bold" textTransform="uppercase">
      Latest Content
    </Text>
    <Flex h="100%" w="100%" mt={4} overflowY="hidden" grow={1}>
      <Tabs
        size="lg"
        variant="line"
        colorScheme="gray.600"
        isFitted
        w="100%"
        sx={{
          p: {
            fontSize: 'md',
            pb: 2,
            mr: 'auto',
          },
          ul: {
            fontSize: 'sm',
            pb: 2,
            pl: 6,
          },
        }}
      >
        <Flex direction="column" w="100%" h="100%">
          <TabList borderBottomWidth={0} pr={4} pl={0}>
            {['Read', 'Listen', 'Watch'].map((title) => (
              <Tab
                key={title}
                color="gray.600"
                _selected={{ color: 'white', borderBottomColor: 'white' }}
                _focus={{
                  boxShadow: 'none',
                  backgroundColor: 'transparent',
                }}
                _active={{
                  boxShadow: 'none',
                  backgroundColor: 'transparent',
                }}
              >
                {title}
              </Tab>
            ))}
          </TabList>

          <Flex grow={1} w="100%" overflowY="auto" mt={1}>
            <TabPanels w="100%" h="100%">
              <TabPanel p={0}>
                <Read />
              </TabPanel>
              <TabPanel p={0}>
                <Listen />
              </TabPanel>
              <TabPanel p={0}>
                <Watch />
              </TabPanel>
            </TabPanels>
          </Flex>
        </Flex>
      </Tabs>
    </Flex>
  </Flex>
);
