import React from 'react';
import { FC, useEffect } from 'react';
import ReactFlow, { ReactFlowProvider, Controls } from 'react-flow-renderer';
import { connect } from 'react-redux';

import { State } from '../../redux/Reducer';

import { CircularProgress } from '@chakra-ui/core';
import { MapContainerContainer } from './style/Map.container.style';

export interface MapContainerProps {
    dispatch: any;
    data: Array<any>;
    loading: boolean;
};

export const MapContainerComponent: FC<MapContainerProps> = ({ dispatch, data, loading }) => {
    useEffect(() => {

    }, [data]);

    return(
        <MapContainerContainer
            onContextMenu={e => {
                e.preventDefault();
                let menuType = 'normal';
                let itemIndex = -1;

                if (e.target['className'].indexOf('map-context') !== -1) {
                    menuType = 'object';
                    itemIndex = Number(e.target['className'].split('map-context-')[1][0]);
                    
                    if (e.target['className'].indexOf('context-with-text') !== -1) {
                        menuType = 'text';
                    }
                }

                dispatch({ type: 'ACTIVATE_CONTEXT', x: e.pageX, y: e.pageY, active: true, menuType, itemIndex });
            }}

            onClick={e => {
                dispatch({ type: 'ACTIVATE_CONTEXT', active: false });
                dispatch({ type: 'RESIZE_ITEM', value: false });
            }}
        >
            <div className={`loading-cover ${loading ? 'active' : ''}`}>
                <CircularProgress isIndeterminate color="purple"/>
            </div>
            <ReactFlowProvider>
                <ReactFlow
                    elements={data}
                    style={{ width: '100vw', height: '100vh' }}
                    nodesConnectable={true}
                    onConnect={params => dispatch({ type: 'MAP_CONNECT_NODES', data: params })}
                    onElementClick={(e, element) => {
                        if (element.data.url) {
                            window.open(element.data.url);
                        }
                    }}
                    onNodeDragStop={(e, node) => {
                        dispatch({ type: 'UPDATE_POSITION', item: node })
                    }}
                >
                        <Controls/>
                </ReactFlow>
            </ReactFlowProvider>
        </MapContainerContainer>
    );
}

export const MapContainer = connect(
    (State: State) => ({
        data: State.map.data,
        loading: State.map.loading,
    })
)(MapContainerComponent);