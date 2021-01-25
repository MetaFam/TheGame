import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../redux/Reducer.state';
import { MapProfileContainer } from './styles/Map.profile.styles';

export interface Profile {
  emoji: string;
  name: string;
}

export interface MapProfileProps {
  profiles: {
    data: Array<Profile>;
    x: number;
    y: number;
  };
}

export const MapProfileComponent: FC<MapProfileProps> = ({ profiles }) => {
  return (
    <MapProfileContainer
      style={{
        top: profiles.y - 75,
        left: profiles.x + 25,
        opacity: profiles.data.length > 0 ? 1 : 0,
      }}
    >
      <p>Assigned To:</p>
      <ul>
        {profiles.data.map((profile) => {
          return (
            <li className="profile">
              {profile.emoji} {profile.name}
            </li>
          );
        })}
      </ul>
    </MapProfileContainer>
  );
};

export const MapProfile = connect((state: State) => ({
  profiles: {
    data: state.map.profiles.data,
    x: state.map.profiles.x,
    y: state.map.profiles.y,
  },
}))(MapProfileComponent);
