import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../redux/Reducer.state';
import { MapLoaderContainer } from './styles/Map.loader.styles';

export interface MapLoaderProps {
  dispatch: Dispatch;
  loading: boolean;
}

export const MapLoaderComponent: FC<MapLoaderProps> = ({
  dispatch,
  loading,
}) => {
  return (
    <MapLoaderContainer className={loading ? 'active' : ''}>
      <img src="/image/logo.png" alt="metamaps-logo" />
    </MapLoaderContainer>
  );
};

export const MapLoader = connect((state: State) => ({
  loading: state.map.loading,
}))(MapLoaderComponent);
