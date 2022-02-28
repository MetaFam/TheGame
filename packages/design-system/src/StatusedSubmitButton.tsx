import { ButtonProps, Flex, Spinner, Text } from '@chakra-ui/react';
import { Maybe } from '@metafam/utils';
import React, { ReactElement } from 'react';

import { MetaButton } from './MetaButton';

type StatusedSubmitProps = {
  label?: Maybe<string | ReactElement>;
  status?: Maybe<string | ReactElement>;
};

export const StatusedSubmitButton: React.FC<
  StatusedSubmitProps & ButtonProps
> = ({ label = 'Submit', status = null, ...props }) => (
  <MetaButton
    type="submit"
    border="2px solid transparent"
    transition="0.25s"
    _hover={{ filter: 'hue-rotate(-10deg)', border: '2px solid green' }}
    _focus={{ filter: 'brightness(1.75)' }}
    disabled={!!status}
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
