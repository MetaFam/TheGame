import { Flex, Spinner, Text } from '@chakra-ui/react';
import { Maybe } from '@metafam/utils';
import React, { ReactElement } from 'react';

import { MetaButton } from './MetaButton';

export const StatusedSubmitButton = ({
  label = 'Submit',
  status = null,
  ...props
}: {
  label?: Maybe<string>;
  status?: Maybe<string | ReactElement>;
}) => (
  <MetaButton
    type="submit"
    _focus={{ filter: 'brightness(1.75)' }}
    sx={{ ':hover': { filter: 'rotate-hue(-90)', border: '2px solid green' } }}
    disabled={!!status}
    mt={10}
    {...props}
  >
    {status == null ? (
      label
    ) : (
      <Flex align="center">
        <Spinner mr={3} />
        {typeof status === 'string' ? <Text>{status}</Text> : status}
      </Flex>
    )}
  </MetaButton>
);
