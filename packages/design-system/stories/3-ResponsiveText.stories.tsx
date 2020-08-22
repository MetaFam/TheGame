import React from 'react';

import { Box, ResponsiveText } from '../src';

export default {
  title: 'ResponsiveText',
  component: ResponsiveText,
};

export const Default = () => {
  const content = [
    'Small Text for smaller screens',
    'Medium Length Text that will be visible for medium sized screens',
    'This text will be visible for devices which have a screen width similar to tablets',
    'This text is very long. It would need multiple lines for display on smaller screen sizes. Resize the screen to see the text changing for smaller screens',
  ];
  return (
    <Box>
      <ResponsiveText content={content} />
    </Box>
  );
};
