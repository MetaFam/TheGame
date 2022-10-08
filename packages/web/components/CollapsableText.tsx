import { Box, useBoolean } from '@metafam/ds';

export const CollapsableText: React.FC<{ title: string }> = ({
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
