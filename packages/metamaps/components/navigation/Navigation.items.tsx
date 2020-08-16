import Link from 'next/link';
import { FC, useLayoutEffect } from 'react';
import { connect } from 'react-redux';

import { SaveNavigation } from './dispatch/Navigation';

import { Button } from '@chakra-ui/core';
import { NavigationItemsContainer } from './style/Navigation.items.style';

export interface NavigationItemsInterface {
    dispatch: any;
    navigationItems: Array<any>;
    ethAccounts: Array<string>;
};

export const NavigationItemsComponent: FC<NavigationItemsInterface> = ({ dispatch, navigationItems, ethAccounts }) => {
    return(
        <NavigationItemsContainer>
            {
                navigationItems.map((item, index) => {
                    return(
                        <div className="item" key={index}>
                            <div className="item-image">
                                <img src={require('../../image/logo.png')}/>
                            </div>
                            <div className="item-text">
                                <h3>{item ? item.name : 'N/A'}</h3>
                            </div>
                            <Button
                                position="absolute"
                                right="10px"
                                top="10px"
                                size="sm"
                                width="90px"
                                variantColor="red"
                                onClick={
                                    async e => {
                                        const data = navigationItems;
                                        data.splice(index, 1);
                                        dispatch(await SaveNavigation(ethAccounts[0], data));
                                        dispatch({ type: 'UPDATE_NAVIGATION_INPUT', value: '' });
                                    }
                                }
                            >
                                Delete
                            </Button>
                            <Link href={`/map/${item ? item.name : ''}`} key={index}>
                                <Button
                                    position="absolute"
                                    right="10px"
                                    bottom="10px"
                                    width="90px"
                                    size="sm"
                                    variantColor="green"
                                >
                                    View
                                </Button>
                            </Link>
                        </div>
                    )
                })
            }
        </NavigationItemsContainer>
    );
}

export const NavigationItems = connect(
    (state: any) => ({
        navigationItems: state.navigationItems,
        ethAccounts: state.ethAccounts,
    })
)(NavigationItemsComponent);