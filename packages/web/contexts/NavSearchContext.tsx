import { useRouter } from 'next/router';
import React, { useContext, useReducer } from 'react';

enum ActionKind {
  SET_SEARCH = 'SET_SEARCH',
  CLEAR_SEARCH = 'CLEAR_SEARCH',
}

const INITIAL_STATE = {
  search: '',
};

type NavSearchContextType = {
  search: string;
  setSearch: (search: string) => void;
  clearSearch: () => void;
};

type State = {
  search: string;
};

interface Action {
  type: string;
  payload: string;
}

function searchReducer(state: State, action: Action) {
  switch (action.type) {
    case ActionKind.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
}

export const NavSearchContext = React.createContext<NavSearchContextType>({
  search: '',
  setSearch: () => {},
  clearSearch: () => {},
});

export const NavSearchContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE);
  const router = useRouter();

  const setSearch = (search: string) => {
    dispatch({ type: ActionKind.SET_SEARCH, payload: search });
    router.push('/players');
  };

  const clearSearch = () => {
    dispatch({ type: ActionKind.SET_SEARCH, payload: '' });
  };

  return (
    <NavSearchContext.Provider
      value={{ search: state.search, setSearch, clearSearch }}
    >
      {children}
    </NavSearchContext.Provider>
  );
};

export const useNavSearch = (): NavSearchContextType =>
  useContext(NavSearchContext);
