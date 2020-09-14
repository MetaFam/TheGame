import React from 'react';
import { FC, useLayoutEffect } from 'react';
import { connect } from 'react-redux';

import { State } from '../../redux/Reducer';
import { LoadMap, SaveMap } from './dispatch/Map.dispatch';

import { IoMdSave, IoMdShare } from 'react-icons/io';
import { Tooltip, Button } from '@chakra-ui/core';
import { MapMenuContainer } from './style/Map.menu.style';

export interface MapMenuProps {
    dispatch: any;
    name: string;
    data: Array<any>;
    counter: number;
    account: string;
};

export const MapMenuComponent: FC<MapMenuProps> = ({ dispatch, name, data, counter, account }) => {
    useLayoutEffect(() => {
        (async () => dispatch(await LoadMap(account, name)))();
    }, []);

    return(
        <MapMenuContainer>
            <div className="image">
                <img src={require('../../image/logo.png')}/>
            </div>
            <h2>{name}</h2>

            <Tooltip aria-label="Save Map" label="Save Map" placement="bottom">
                <Button
                    size="sm"
                    marginRight="10px"
                    fontSize="24px"
                    onClick={async e => dispatch(await SaveMap(account, name, data, counter))}
                    variantColor="purple">
                    <IoMdSave/>
                </Button>
            </Tooltip>
        </MapMenuContainer>
    );
}

export const MapMenu = connect(
    (State: State) => ({
        data: State.map.data,
        counter: State.map.counter,
    })
)(MapMenuComponent);