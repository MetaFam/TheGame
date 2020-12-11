import update from 'immutability-helper';
import { AnyAction } from 'redux';

import { InitialMapState, MapActions, MapState } from './Reducer.map.state'; // eslint-disable-line

export interface State extends MapState {
  metamask: boolean;
  accounts: Array<string>;
  create: {
    input: string;
    fetching: boolean;
    error: any;
  };
}

export const InitialState: State = {
  metamask: true,
  accounts: [],
  create: {
    input: '',
    fetching: false,
    error: null,
  },
  ...InitialMapState,
};

export function Actions(_state: State, action: AnyAction): State {
  const state = MapActions(_state, action);

  switch (action.type) {
    case 'METAMASK':
      return update(state, { metamask: { $set: action.value } });
    case 'ACCOUNTS':
      return update(state, { accounts: { $set: action.value } });
    case 'CREATE_INPUT':
      return update(state, { create: { input: { $set: action.value } } });
    case 'CREATE_FETCHING':
      return update(state, { create: { fetching: { $set: action.value } } });
    case 'CREATE_ERROR':
      return update(state, { create: { error: { $set: action.value } } });
    default:
      return state;
  }
}
