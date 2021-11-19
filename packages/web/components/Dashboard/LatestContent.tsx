import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@metafam/ds';
import React from 'react';

import { Listen } from './LatestContentTabs/Listen';
import { Read } from './LatestContentTabs/Read';
import { Watch } from './LatestContentTabs/Watch';

export const LatestContent: React.FC = () => (
  <Tabs mt={5} size="lg" variant="line" colorScheme="gray.600" isFitted>
    <TabList borderBottomWidth={0}>
      <Tab
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
        Read
      </Tab>
      <Tab
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
        Listen
      </Tab>
      <Tab
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
        Watch
      </Tab>
    </TabList>

    <TabPanels>
      <TabPanel className="chakra-tabs__tab-panel--read" p={0}>
        <Read />
      </TabPanel>
      <TabPanel className="chakra-tabs__tab-panel--listen" p={0}>
        <Listen />
      </TabPanel>
      <TabPanel className="chakra-tabs__tab-panel--watch" p={0}>
        <Watch />
      </TabPanel>
    </TabPanels>
  </Tabs>
);
