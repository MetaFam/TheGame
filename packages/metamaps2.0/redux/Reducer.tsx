import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { AnyAction, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import update from 'immutability-helper';

import { NavigationState, NavigationInitialState, NavigationActions } from './Reducer.navigation';
import { MapState, MapInitialState, MapActions } from './Reducer.map';

export interface State extends NavigationState, MapState {
    LastAction: string;
}

export const InitialState = {
    LastAction: '',
    ...NavigationInitialState,
    ...MapInitialState,
}

export function Reducer(State: State = InitialState, Action: AnyAction): State {
    if (Action.type !== 'MOUSE_MOVE') {
        console.log(State, Action);
    }

    State = NavigationActions(State, Action);
    State = MapActions(State, Action);

    State = update(
        State,
        { LastAction: { $set: Action.type } }
    );

    return State;
}

export type RootState = ReturnType<typeof Reducer>;

export const makeStore: MakeStore<State> = () => createStore(Reducer, InitialState, compose(applyMiddleware(thunk)));

export const wrapper = createWrapper(makeStore, { debug: false });