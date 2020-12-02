import update from 'immutability-helper';
import { AnyAction } from 'redux';

export interface State { 
  metamask: boolean;
  accounts: Array<string>;
}

export const InitialState: State = {
  metamask: false,
  accounts: [],
}

export function Actions(state: State, action: AnyAction): State {
  switch (action.type) {
    case 'METAMASK':
      return update(
        state,
        { metamask: { $set: action.value } },
      );
    case 'ACCOUNTS':
      return update(
        state,
        { accounts: { $set: action.value } },
      );
    default:
      return state;
  }
}