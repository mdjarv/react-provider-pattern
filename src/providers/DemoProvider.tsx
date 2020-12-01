import React from 'react';
import {api} from "../api";

export interface State {
  fetching: boolean
  fetched: boolean
  result?: string
  error?: string
}

export type Action =
  { type: 'start fetch' }
  | { type: 'finish fetch'; result: string }
  | { type: 'fail fetch', error: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "start fetch": {
      return {...state, fetching: true, fetched: false, result: undefined, error: undefined}
    }
    case "finish fetch": {
      return {...state, fetching: false, fetched: true, result: action.result}
    }
    case "fail fetch": {
      return {...state, fetching: false, fetched: false, error: action.error}
    }
    default: {
      console.error('invalid dispatch action: ', action);
      return state;
    }
  }
};

const DemoStateContext = React.createContext<State | undefined>(undefined);
const DemoDispatchContext = React.createContext<React.Dispatch<Action> | undefined>(undefined);

const DemoProvider: React.FC = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    fetching: false,
    fetched: false,
  });

  return (
    <DemoStateContext.Provider value={state}>
      <DemoDispatchContext.Provider value={dispatch}>
        {children}
      </DemoDispatchContext.Provider>
    </DemoStateContext.Provider>
  );
};

const useDemo = (): [State, React.Dispatch<Action>] => {
  const state = React.useContext(DemoStateContext);
  const dispatch = React.useContext(DemoDispatchContext);

  if (state === undefined || dispatch === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }

  return [state, dispatch];
};

const fetchDemo = (dispatch: React.Dispatch<Action>): Promise<void> => {
  dispatch({type: 'start fetch'})
  return api.fetch()
    .then(result => dispatch({type: "finish fetch", result: result}))
    .catch(e => dispatch({
      type: 'fail fetch',
      error: e
    }))
}

const fetchWithErrorDemo = (dispatch: React.Dispatch<Action>): Promise<void> => {
  dispatch({type: 'start fetch'})
  return api.failFetch()
    .then(result => dispatch({type: "finish fetch", result: result}))
    .catch(e => dispatch({
      type: 'fail fetch',
      error: e
    }))
}

const fetchAsync = async (dispatch: React.Dispatch<Action>): Promise<void> => {
  dispatch({type: 'start fetch'})

  try {
    const result = await api.fetch()
    dispatch({type: 'finish fetch', result: result})
  } catch (e) {
    dispatch({type: 'fail fetch', error: e})
  }
}

export {DemoProvider, useDemo, fetchDemo, fetchWithErrorDemo, fetchAsync}
