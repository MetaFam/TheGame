import update from 'immutability-helper';
import { AnyAction } from 'redux';

import { State } from './Reducer';

export interface NavigationState {
    navigation: {
        metamask: boolean;
        accounts: Array<string>;

        maps: {
            loading: boolean;
            error: boolean;
            errorMessage: string;

            input: string;
            data: Array<any>;
        };
    };
}

export const NavigationInitialState: NavigationState = {
    navigation: {
        metamask: false,
        accounts: [],

        maps: {
            loading: false,
            error: false,
            errorMessage: '',

            input: '',
            data: [],
        },
    },
}

export function NavigationActions(State: State, Action: AnyAction): State {
    switch (Action.type) {
        case 'METAMASK':
            return update(
                State,
                { navigation: { metamask: { $set: Action.value } } },
            );
        case 'LOADING_NAVIGATION':
            return update(
                State,
                { navigation: { maps: { loading: { $set: Action.value } } } },
            );
        case 'LOADED_NAVIGATION':
            return update(
                State,
                { navigation: { maps: { data: { $set: Action.data } } } },
            );
        case 'UPDATE_ACCOUNTS':
            return update(
                State,
                { navigation: { accounts: { $set: Action.accounts } } },
            );
        case 'UPDATE_NAVIGATION_INPUT':
            return update(
                State,
                { navigation: { maps: { input: { $set: Action.value } } } },
            );
        default:
            return State
    }
}