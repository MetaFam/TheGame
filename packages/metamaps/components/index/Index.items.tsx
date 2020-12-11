import { Alert, AlertIcon, CircularProgress } from '@chakra-ui/react';
import Link from 'next/link';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useQuery } from 'urql';

import { GetMapByAuthorQuery } from '../../graphql/getMap';
import { State } from '../../redux/Reducer.state';
import { IndexItemsContainer } from './styles/Index.items.styles';

export interface IndexItemsProps {
  dispatch: Dispatch;
  accounts: Array<string>;
}

export const IndexItemsComponent: FC<IndexItemsProps> = ({
  dispatch,
  accounts,
}) => {
  const [result, reexecuteQuery] = useQuery({
    query: GetMapByAuthorQuery,
    variables: {
      author: accounts[0],
    },
  });

  const { data, fetching, error } = result;

  useEffect(() => {
    reexecuteQuery();
  }, [dispatch, accounts, reexecuteQuery]);

  return (
    <IndexItemsContainer>
      {fetching || accounts.length === 0 ? (
        <div className="load-wrapper">
          <CircularProgress isIndeterminate color="purple.300" size="42px" />
        </div>
      ) : (
        ''
      )}

      {error && accounts.length > 0 ? (
        <Alert status="error" colorScheme="red" color="black">
          <AlertIcon />
          There was an error retrieving your maps
        </Alert>
      ) : (
        ''
      )}

      {data?.Map.length === 0 && !error ? (
        <h3>You have not created a map yet!</h3>
      ) : (
        data.Map.map((map) => {
          return (
            <Link href={`/${map.author_address}/map/${map.id}`}>
              <div className="map" key={map.id}>
                <img src="/image/logo.png" alt="metamaps-logo" />
                <div className="text">
                  <h4>{map.name}</h4>
                  <p>Owned by {map.author_address} (you)</p>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </IndexItemsContainer>
  );
};

export const IndexItems = connect((state: State) => ({
  accounts: state.accounts,
}))(IndexItemsComponent);
