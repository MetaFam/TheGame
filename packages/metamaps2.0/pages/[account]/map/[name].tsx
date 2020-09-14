import React from 'react';
import { useRouter } from 'next/router';
import { FC, useLayoutEffect } from 'react';
import { connect } from 'react-redux';

import { State } from '../../../redux/Reducer';

import { AppContainer } from '../../../theme/Theme.components';
import { Metamask } from '../../../components/shared/Metamask';
import { MapMenu } from '../../../components/map/Map.menu';
import { MapContextMenu } from '../../../components/map/Map.context.menu';
import { MapContainer } from '../../../components/map/Map.container';
import { MapAuxMenu } from '../../../components/map/Map.aux.menu';

export interface MapProps {
  dispatch: any;
  accounts: Array<string>;
}

export const MapComponent: FC<MapProps> = ({ dispatch, accounts }) => {
    const router = useRouter();
    const { account, name } = router.query;

    return(
        <AppContainer>
          <Metamask/>
          <MapMenu name={name} account={account}/>
          <MapContextMenu/>
          <MapAuxMenu/>
          <MapContainer/>
        </AppContainer>
    )
}

export default connect(
  (State: State) => ({
    accounts: State.navigation.accounts,
  })
)(MapComponent);
