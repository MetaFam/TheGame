import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  list: {
    '--menu-bg': 'transparent',
  },
});

// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle });
