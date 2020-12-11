import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useQuery } from 'urql';

import { Map } from '../../../components/map/Map.container';
import { MapLoader } from '../../../components/map/Map.loader';
import { GetMapQuery } from '../../../graphql/getMap';
import { State } from '../../../redux/Reducer.state';
import { AppContainer } from '../../../theme/Theme.components';

export interface MapPageProps {
  dispatch: Dispatch;
}

export const MapPageComponent: FC<MapPageProps> = ({ dispatch }) => {
  const router = useRouter();
  const { id } = router.query;

  const [result] = useQuery({
    query: GetMapQuery,
    variables: { id },
  });

  const { data, fetching, error } = result;

  dispatch({ type: 'MAP_LOADING', value: fetching });

  const items = data?.Map_by_pk.data
    ? JSON.parse(data?.Map_by_pk.data)
    : {
        counter: 0,
        elements: [],
        background: {
          type: 'color',
          url: 'default',
        },
      };

  items.elements = items.elements.map((item) => {
    if (item.data.type === 'image') {
      return {
        ...item,
        data: {
          ...item.data,
          label: (
            <img
              src={item.data.base64}
              alt="metamaps-content"
              className="map-context-video"
            />
          ),
        },
      };
    }
    if (item.data.type === 'video') {
      return {
        ...item,
        data: {
          ...item.data,
          label: (
            <video controls className="map-context-video">
              <source src={item.data.base64} />
            </video>
          ), // eslint-disable-line
        },
      };
    }
    return item;
  });

  dispatch({
    type: 'MAP_DATA',
    id: data?.Map_by_pk.id,
    owner: data?.Map_by_pk.author_address,
    name: data?.Map_by_pk.name,
    data: items,
  });

  return (
    <AppContainer>
      <Map />
      <MapLoader />
    </AppContainer>
  );
};

export default connect((state: State) => ({}))(MapPageComponent);
