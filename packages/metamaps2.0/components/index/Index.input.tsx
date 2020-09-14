import React from 'react';
import { FC } from 'react';
import { connect } from 'react-redux';

import { State } from '../../redux/Reducer';
import { SaveNavigation } from './dispatch/Navigation.dispatch';

import { Input, Button } from "@chakra-ui/core";
import { IndexInputContainer } from './style/Index.input.style';

export interface IndexInputProps {
    dispatch: any;
    input: string;
    accounts: Array<string>;
    data: Array<any>;
    loading: boolean;
};

export const IndexInputComponent: FC<IndexInputProps> = ({ dispatch, input, accounts, data, loading }) => {
    return(
        <IndexInputContainer>
            <Input
                variant="flushed"
                value={input}
                onChange={e => dispatch({ type: 'UPDATE_NAVIGATION_INPUT', value: e.target.value })}
                placeholder="Name of New Metamap"
                size="lg"
                width="calc(100% - 195px)"/>
            <Button
                variantColor="purple"
                size="lg"
                margin="0 0 0 15px"
                width="180px"
                onClick={async e => {
                    const d = [{ name: input, image: '' }].concat(data);
                    dispatch(await SaveNavigation(accounts[0], d));
                }}
                isLoading={loading}
            >
                Create
            </Button>
        </IndexInputContainer>
    );
}

export const IndexInput = connect(
    (State: State) => ({
        input: State.navigation.maps.input,
        accounts: State.navigation.accounts,
        data: State.navigation.maps.data,
        loading: State.navigation.maps.loading,
    })
)(IndexInputComponent);