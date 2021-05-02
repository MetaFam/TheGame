import { Box } from '@metafam/ds';
import React from 'react';
import ReactMarkdown from 'react-markdown';

export type FormattedTextProps = {
  children: string | React.ReactNode | any;
};

export const FormattedText: React.FC<FormattedTextProps> = ({ children }) => (
  <Box
    sx={{
      fontSize: { base: '14px' },
      'h2, h3, h4': { fontWeight: 900, mt: 3 },
      a: {
        color: '#ff1f82',
        opacity: 0.7,
        transition: 'all 0.2s ease',
        '&:hover': { opacity: 1 },
      },
      'ul, ol': { mt: 2, listStylePos: 'inside' },
    }}
  >
    <ReactMarkdown>{children}</ReactMarkdown>
  </Box>
);
