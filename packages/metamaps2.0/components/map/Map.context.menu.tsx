import React from 'react';
import { FC } from 'react';
import { connect } from 'react-redux';

import { State } from '../../redux/Reducer';

import { CgShapeSquare, CgShapeCircle, CgImage, CgFormatText, CgTrash, CgLink } from 'react-icons/cg';
import { IoMdResize } from 'react-icons/io';
import { Tooltip, Button } from '@chakra-ui/core';
import { MapContextMenuContainer } from './style/Map.context.menu.style';

export interface MapContextMenuProps {
    dispatch: any;
    x: number;
    y: number;
    active: boolean;
    type: string;
    itemIndex: number;
};

export const MapContextMenuComponent: FC<MapContextMenuProps> = ({ dispatch, x, y, active, type, itemIndex }) => {
    return(
        <MapContextMenuContainer style={{ left: x, top: y, opacity: active ? 1 : 0, pointerEvents: active ? 'inherit' : 'none' }}>
            {
                type === 'normal' ?
                (
                    <>
                        <Tooltip aria-label="Add Text" label="Add Text" placement="bottom">
                            <Button
                                size="sm"
                                marginRight="10px"
                                fontSize="24px"
                                onClick={e => dispatch({ type: 'MAP_ADD_TEXT' })}
                                variantColor="purple">
                                <CgFormatText/>
                            </Button>
                        </Tooltip>

                        <Tooltip aria-label="Add an Image" label="Add an Image" placement="bottom">
                            <Button
                                size="sm"
                                marginRight="10px"
                                fontSize="24px"
                                onClick={e => {
                                    const el: any = document.querySelector('input#file-input');
                                    el.click();
                                }}
                                variantColor="purple">
                                <CgImage/>
                            </Button>
                        </Tooltip>

                        <input
                            style={{ display: 'none' }}
                            id="file-input"
                            type="file"
                            accept="image/*"
                            onChange={(e: any) => {
                                const el: any = document.querySelector('input#file-input');
                                const file = el.files[0];
                                const reader = new FileReader();
                                reader.onload = (e2: any) => {
                                    dispatch({ type: 'MAP_ADD_IMAGE', value: e2.target.result });
                                }
                                reader.readAsDataURL(file);
                            }}
                        />

                        <Tooltip aria-label="Add a Circle" label="Add a Circle" placement="bottom">
                            <Button
                                size="sm"
                                marginRight="10px"
                                fontSize="24px"
                                onClick={e => dispatch({ type: 'MAP_ADD_CIRCLE' })}
                                variantColor="purple">
                                <CgShapeCircle/>
                            </Button>
                        </Tooltip>

                        <Tooltip aria-label="Add a Square" label="Add a Square" placement="bottom">
                            <Button
                                size="sm"
                                fontSize="24px"
                                onClick={e => dispatch({ type: 'MAP_ADD_SQUARE' })}
                                variantColor="purple">
                                <CgShapeSquare/>
                            </Button>
                        </Tooltip>
                    </>
                ) : ''
            }

            {
                type === 'object' || type === 'text' ?
                (
                    <>
                        <Tooltip aria-label="Resize" label="Resize" placement="bottom">
                            <Button
                                size="sm"
                                marginRight="10px"
                                fontSize="24px"
                                onClick={e => dispatch({ type: 'ITEM_AUX_CONTEXT', key: 'resize', value: true })}
                                variantColor="purple">
                                <IoMdResize/>
                            </Button>
                        </Tooltip>

                        {
                            type === 'text' ?
                            <Tooltip aria-label="Edit Text" label="Edit Text" placement="bottom">
                                <Button
                                    size="sm"
                                    marginRight="10px"
                                    fontSize="24px"
                                    onClick={e => dispatch({ type: 'ITEM_AUX_CONTEXT', key: 'text', value: true })}
                                    variantColor="purple">
                                    <CgFormatText/>
                                </Button>
                            </Tooltip>
                            : ''
                        }

                        <Tooltip aria-label="Add URL" label="Add URL" placement="bottom">
                            <Button
                                size="sm"
                                marginRight="10px"
                                fontSize="24px"
                                onClick={e => dispatch({ type: 'ITEM_AUX_CONTEXT', key: 'url', value: true })}
                                variantColor="purple">
                                <CgLink/>
                            </Button>
                        </Tooltip>

                        <Tooltip aria-label="Remove" label="Remove" placement="bottom">
                            <Button
                                size="sm"
                                fontSize="24px"
                                onClick={e => dispatch({ type: 'REMOVE_ITEM' })}
                                variantColor="purple">
                                <CgTrash/>
                            </Button>
                        </Tooltip>
                    </>
                ) : ''
            }
        </MapContextMenuContainer>
    )
}

export const MapContextMenu = connect(
    (State: State) => ({
        x: State.map.context.x,
        y: State.map.context.y,
        active: State.map.context.active,
        type: State.map.context.type,
        itemIndex: State.map.itemIndex,
    })
)(MapContextMenuComponent);