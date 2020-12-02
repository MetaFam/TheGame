import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { AnyAction, applyMiddleware, compose, createStore } from 'redux';
import update from 'immutability-helper';
import thunk from 'redux-thunk';

import { State, InitialState, Actions } from './Reducer.state';

export function Reducer(state: State = InitialState, action: AnyAction): State {
  console.log(state, action);

  return Actions(state, action);
}

export type RootState = ReturnType<typeof Reducer>;

export const makeStore: MakeStore<State> = () => createStore(Reducer, InitialState, compose(applyMiddleware(thunk)));

export const wrapper = createWrapper(makeStore, { debug: false });