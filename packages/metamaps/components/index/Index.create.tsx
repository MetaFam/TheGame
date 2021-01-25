import { Button, Input } from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useMutation } from 'urql';

import { CreateMap } from '../../graphql/insertMap';
import { State } from '../../redux/Reducer.state';
import { IndexCreateContainer } from './styles/Index.create.styles';

export interface IndexCreateProps {
  dispatch: Dispatch;
  accounts: Array<string>;
  create: {
    input: string;
    fetching: boolean;
    error: any;
    result: any;
  };
}

export const IndexCreateComponent: FC<IndexCreateProps> = ({
  dispatch,
  accounts,
  create,
}) => {
  const [state, executeMutation] = useMutation(CreateMap);

  useEffect(() => {
    dispatch({ type: 'CREATE_FETCHING', value: state.fetching });
    dispatch({ type: 'CREATE_ERROR', value: state.error });
  }, [dispatch, state]);

  async function insertMap(author, name) {
    await executeMutation({ author, name });
  }

  return (
    <IndexCreateContainer>
      <Input
        size="lg"
        variant="flushed"
        colorScheme="purple"
        placeholder="Name of new map"
        value={create.input}
        onChange={(e) =>
          dispatch({ type: 'CREATE_INPUT', value: e.target.value })
        }
      />
      <Button
        size="lg"
        margin="0 0 0 15px"
        width="180px"
        colorScheme="purple"
        isLoading={create.fetching}
        loadingText="Creating Map"
        onClick={(e) => {
          if (accounts.length > 0) {
            insertMap(accounts[0], create.input);
            dispatch({ type: 'CREATE_INPUT', value: '' });
          }
        }}
      >
        New Map
      </Button>
    </IndexCreateContainer>
  );
};

export const IndexCreate = connect((state: State) => ({
  accounts: state.accounts,
  create: {
    ...state.create,
  },
}))(IndexCreateComponent);
