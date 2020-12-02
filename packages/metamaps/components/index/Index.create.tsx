import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '../../redux/Reducer.state';

import { Input, Button } from '@chakra-ui/react';
import { IndexCreateContainer } from './styles/Index.create.styles';

export interface IndexCreateProps {
  dispatch: Dispatch;
}

export const IndexCreateComponent: FC<IndexCreateProps> = ({ dispatch }) => {
  return (
    <IndexCreateContainer>
      <Input
        size="lg"
        variant="filled"
        placeholder="Name of new map"
      />
      <Button
        size="lg"
        margin="0 0 0 15px"
        width="180px"
        colorScheme="purple">
        New Map
      </Button>
    </IndexCreateContainer>
  )
}

export const IndexCreate = connect(
  (state: State) => ({

  })
)(IndexCreateComponent);