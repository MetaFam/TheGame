import React from 'react';
import { FC } from 'react';
import { connect } from 'react-redux';

import { State } from '../../redux/Reducer';

import { Input, Button } from '@chakra-ui/core';
import { MapAuxContainer } from './style/Map.aux.style';

export interface MapAuxMenuProps {
    dispatch: any;
    x: number;
    y: number;
    resize: boolean;
    url: boolean;
    text: boolean;
    itemIndex: number;
    data: Array<any>;
    width: number;
    height: number;
    itemUrlInput: string;
    itemTextInput: string;
};

export const MapAuxMenuComponent: FC<MapAuxMenuProps> = ({ dispatch, x, y, resize, url, text, itemIndex, data, width, height, itemUrlInput, itemTextInput }) => {
    return(
        <MapAuxContainer style={{ left: x, top: y, opacity: (resize || url || text) ? 1 : 0, pointerEvents: (resize || url || text) ? 'inherit' : 'none' }}>
            {
                resize ?
                <>
                    <div className="input">
                        <p>Width</p>
                        <Input
                            width="120px"
                            height="30px"
                            color="black"
                            value={width}
                            onChange={e => dispatch({ type: 'UPDATE_ITEM_KEY', key: 'width', value: e.target.value })}
                        />
                    </div>
                    <div className="input">
                        <p>Height</p>
                        <Input
                            width="120px"
                            height="30px"
                            color="black"
                            value={height}
                            onChange={e => dispatch({ type: 'UPDATE_ITEM_KEY', key: 'height', value: e.target.value })}
                        />
                    </div>                    
                    <Button
                        size="sm"
                        fontSize="14px"
                        marginRight="10px"
                        marginBottom="10px"
                        onClick={e => dispatch({ type: 'UPDATE_SIZE', width, height, itemIndex })}
                        variantColor="purple">
                        Update
                    </Button>
                </>
                : ''
            }

            {
                url ?
                <>
                    <div className="input">
                        <p>URL</p>
                        <Input
                            width="180px"
                            height="30px"
                            color="black"
                            value={itemUrlInput}
                            onChange={e => dispatch({ type: 'UPDATE_ITEM_URL', value: e.target.value })}
                        />
                    </div>                    
                    <Button
                        size="sm"
                        fontSize="14px"
                        marginRight="10px"
                        marginBottom="10px"
                        onClick={e => dispatch({ type: 'UPDATE_URL', itemUrlInput, itemIndex })}
                        variantColor="purple">
                        Update
                    </Button>
                </>
                : ''
            }

            {
                text ?
                <>
                    <div className="input">
                        <p>Text</p>
                        <Input
                            width="180px"
                            height="30px"
                            color="black"
                            value={itemTextInput}
                            onChange={e => dispatch({ type: 'UPDATE_ITEM_TEXT', value: e.target.value })}
                        />
                    </div>                    
                    <Button
                        size="sm"
                        fontSize="14px"
                        marginRight="10px"
                        marginBottom="10px"
                        onClick={e => dispatch({ type: 'UPDATE_TEXT', itemTextInput, itemIndex })}
                        variantColor="purple">
                        Update
                    </Button>
                </>
                : ''
            }
        </MapAuxContainer>
    )
}

export const MapAuxMenu = connect(
    (State: State) => ({
        x: State.map.context.x,
        y: State.map.context.y,
        resize: State.map.resize,
        url: State.map.url,
        text: State.map.text,
        itemIndex: State.map.itemIndex,
        data: State.map.data,
        width: State.map.activeItem.width,
        height: State.map.activeItem.height,
        itemUrlInput: State.map.itemUrlInput,
        itemTextInput: State.map.itemTextInput,
    })
)(MapAuxMenuComponent);