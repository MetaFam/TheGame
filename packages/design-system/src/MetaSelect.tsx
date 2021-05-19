import { Select, SelectProps } from '@chakra-ui/react';
import React from 'react';

import { DropDownIcon } from './icons/DropDownIcon';

export const MetaSelect: React.FC<SelectProps> = (props) => (
  <Select
    textTransform="uppercase"
    maxW="48"
    bg="dark"
    iconColor="purple.400"
    iconSize="xs"
    icon={<DropDownIcon boxSize={2} />}
    borderColor="purple.400"
    borderWidth="2px"
    borderRadius="4px"
    {...props}
  />
);
