import { Box, useBoolean } from '@metafam/ds';
import type { PropsWithChildren } from 'react';


type CollapsableTextProps = PropsWithChildren<{ title: string }>;

export const CollapsableText: React.FC<CollapsableTextProps> = ({
  title,
  children,
}) => {
  const [isOpen, { toggle }] = useBoolean(false);
  return (
    <>
      <Box onClick={toggle} my={4} cursor="pointer">
        <details>
          <summary>{title}</summary>
        </details>
      </Box>
      {isOpen && children}
    </>
  );
};
