import React from 'react';
import Link from 'next/link';
import { FC } from 'react';
import { connect } from 'react-redux';

import { State } from '../../redux/Reducer';
import { SaveNavigation } from './dispatch/Navigation.dispatch';

import { HiOutlineTrash } from 'react-icons/hi';
import { CircularProgress } from "@chakra-ui/core";
import { IndexItemsContainer } from './style/Index.items.style';

export interface IndexItemsProps {
    dispatch: any;
    accounts: Array<string>;
    data: Array<any>;
    loading: boolean;
};

export const IndexItemsComponent: FC<IndexItemsProps> = ({ dispatch, accounts, data, loading }) => {
    return(
        <IndexItemsContainer>
            <div className={`loading-cover ${loading ? 'active' : ''}`}>
                <CircularProgress isIndeterminate color="purple"/>
            </div>

            {
                data.map((item, index) => {
                    return(
                        <Link href={`${accounts[0]}/map/${item.name}`}>
                            <div className="item" key={index}>
                                <div className="item-image">
                                    <img src={require('../../image/logo.png')}/>
                                </div>
                                <h3>{item.name}</h3>

                                <a
                                    className="remove"
                                    onClick={async e => {
                                        e.preventDefault();
                                        const d = data.splice(index, 1);
                                        dispatch(await SaveNavigation(accounts[0], d));
                                    }}
                                >
                                    <HiOutlineTrash/>
                                </a>
                            </div>
                        </Link>
                    )
                })
            }
        </IndexItemsContainer>
    );
}

export const IndexItems = connect(
    (State: State) => ({
        accounts: State.navigation.accounts,
        data: State.navigation.maps.data,
        loading: State.navigation.maps.loading,
    })
)(IndexItemsComponent);