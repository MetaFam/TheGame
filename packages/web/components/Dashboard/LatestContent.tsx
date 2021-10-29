import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@metafam/ds';
import React from 'react';

export const XP: React.FC = () => (
  <Tabs mt={5} size="lg" variant="line" colorScheme="gray.600" isFitted>
    <TabList borderBottomWidth={0}>
      <Tab
        color="gray.600"
        _selected={{ color: 'white', borderColor: 'white' }}
      >
        Read
      </Tab>
      <Tab
        color="gray.600"
        _selected={{ color: 'white', borderColor: 'white' }}
      >
        Listen
      </Tab>
      <Tab
        color="gray.600"
        _selected={{ color: 'white', borderColor: 'white' }}
      >
        Watch
      </Tab>
    </TabList>

    <TabPanels>
      <TabPanel className="chakra-tabs__tab-panel--read">
        <p>A feed of news and events</p>
      </TabPanel>
      <TabPanel className="chakra-tabs__tab-panel--listen">
        <p>A feed podcast episodes from Anchor or wherever.</p>
      </TabPanel>
      <TabPanel className="chakra-tabs__tab-panel--watch">
        <p>Feed of MetaMedia YouTube content</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
);
