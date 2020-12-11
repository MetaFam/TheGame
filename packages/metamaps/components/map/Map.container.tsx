import React, { FC, useEffect, useState } from 'react';
import ReactFlow, { Controls, ReactFlowProvider } from 'react-flow-renderer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../redux/Reducer.state';
import { MapContext } from './Map.context';
import { MapEdit } from './Map.edit';
import { MapPopover } from './Map.popover';
import { MapProfile } from './Map.profile';
import { MapTitle } from './Map.title';
import { MapContainer } from './styles/Map.container.styles';

export interface MapProps {
  dispatch: Dispatch;
  data: Array<any>;
  background: {
    type: string;
    url: string;
  };
}

export const MapComponent: FC<MapProps> = ({ dispatch, data, background }) => {
  const [dataState, setDataState] = useState(data);

  useEffect(() => {
    setDataState([]);
    setTimeout(() => {
      setDataState(data);
    }, 10);
  }, [dispatch, data]);

  return (
    <MapContainer
      onClick={(e: any) => {
        dispatch({ type: 'ACTIVATE_CONTEXT', active: false });
        if (e.target.className) {
          if (
            e.target.className.indexOf('item') === -1 &&
            e.target.className.indexOf('preserve-context') === -1
          ) {
            dispatch({ type: 'EDIT' });
          }
        }
      }}
    >
      {background.type === 'video' ? (
        <video autoPlay muted loop className="bg-video">
          <source src={background.url} />
        </video>
      ) : (
        ''
      )}

      <MapTitle />
      <MapContext />
      <MapPopover />
      <MapEdit />
      <MapProfile />

      <ReactFlowProvider>
        <ReactFlow
          elements={dataState ?? []}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
          }}
          onContextMenu={(e: any) => {
            e.preventDefault();
            if (e.target.className.indexOf('map-context') !== -1) {
              const activeIndex = e.target.getAttribute('data-id');
              const width = e.target.style.width.replace('px', '');
              const height = e.target.style.height.replace('px', '');
              const text = e.target.textContent;

              console.log(e.target);

              dispatch({ type: 'EDIT', width, height, text });

              if (e.target.className.indexOf('map-context-text') !== -1) {
                dispatch({
                  type: 'CONTEXT_TYPE',
                  menu: 'text',
                  activeIndex: Number(activeIndex),
                });
              } else {
                dispatch({
                  type: 'CONTEXT_TYPE',
                  menu: 'object',
                  activeIndex: Number(activeIndex),
                });
              }
            } else {
              dispatch({ type: 'CONTEXT_TYPE', menu: 'normal' });
            }
            dispatch({
              type: 'ACTIVATE_CONTEXT',
              x: e.clientX,
              y: e.clientY,
              active: true,
            });
          }}
          onElementClick={(e, element) => {
            if (element.data.url) {
              window.open(element.data.url);
            }
          }}
          nodesConnectable
          onConnect={(params) =>
            dispatch({ type: 'CONNECT_NODES', data: params })
          }
          onNodeDragStop={(e, node) =>
            dispatch({ type: 'UPDATE_POSITION', item: node })
          }
          onNodeMouseEnter={async (e, node) => {
            if (node.data.users) {
              const user = node.data.users[0];
              dispatch({
                type: 'POPULATE_PROFILES',
                value: node.data.users,
                x: e.clientX,
                y: e.clientY,
              });
            }
          }}
          onNodeMouseLeave={async (e, node) => {
            dispatch({
              type: 'POPULATE_PROFILES',
              value: [],
              x: e.clientX,
              y: e.clientY,
            });
          }}
        >
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </MapContainer>
  );
};

export const Map = connect((state: State) => ({
  data: state.map.data,
  background: {
    type: state.map.background.type,
    url: state.map.background.url,
  },
}))(MapComponent);
