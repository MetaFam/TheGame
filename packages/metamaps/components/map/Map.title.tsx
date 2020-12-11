import { useToast } from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';
import { AiFillSave, AiOutlineFontSize } from 'react-icons/ai';
import { BiImage } from 'react-icons/bi';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useMutation } from 'urql';

import { UpdateMapData } from '../../graphql/updateMap';
import { State } from '../../redux/Reducer.state';
import { MapTitleContainer } from './styles/Map.title.styles';

export interface MapTitleProps {
  dispatch: Dispatch;
  toggle: boolean;

  id: string;
  counter: number;
  name: string;

  background: {
    type: string;
    url: string;
  };

  data: Array<any>;
}

export const MapTitleComponent: FC<MapTitleProps> = ({
  dispatch,
  toggle,
  id,
  counter,
  name,
  background,
  data,
}) => {
  const toast = useToast();
  const [state, executeMutation] = useMutation(UpdateMapData);

  useEffect(() => {
    dispatch({ type: 'UPDATE_DATA_FETCHING', value: state.fetching });
    dispatch({ type: 'UPDATE_DATA_ERROR', value: state.error });
    console.log(state);
  }, [dispatch, state]);

  async function updateMapData() {
    const elements = data.map((item) => {
      if (item.data.type === 'image' || item.data.type === 'video') {
        return {
          ...item,
          data: {
            ...item.data,
            label: null,
          },
        };
      }
      return item;
    });

    await executeMutation({
      id,
      data: JSON.stringify({ counter, background, elements }),
    });
  }

  return (
    <MapTitleContainer className={toggle ? 'expanded' : 'minimized'}>
      <button
        className="info"
        type="button"
        onClick={() => dispatch({ type: 'POPOVER_TOGGLE' })}
      >
        <img src="/image/logo.png" alt="metamaps-logo" />
        <h2>{name}</h2>
      </button>
      <div className="menu">
        <button
          type="button"
          className="link"
          onClick={() => dispatch({ type: 'POPOVER_BACKGROUND', value: true })}
        >
          <BiImage />
          <p>Change Background</p>
        </button>
        <button
          type="button"
          className="link"
          onClick={() => dispatch({ type: 'POPOVER_NAME', value: true })}
        >
          <AiOutlineFontSize />
          <p>Change Name</p>
        </button>
        <button
          type="button"
          className="link"
          onClick={async () => {
            await updateMapData();
            toast({
              position: `bottom-right`,
              title: `Map saved`,
              status: `success`,
              duration: 5000,
              isClosable: true,
            });
          }}
        >
          <AiFillSave />
          <p>Save Changes</p>
        </button>
      </div>
    </MapTitleContainer>
  );
};

export const MapTitle = connect((state: State) => ({
  toggle: state.map.popover.toggle,
  id: state.map.id,
  counter: state.map.counter,
  name: state.map.name,
  background: {
    type: state.map.background.type,
    url: state.map.background.url,
  },
  data: state.map.data,
}))(MapTitleComponent);
