import { Status } from '../types/Status';

type SetStatus = {
  type: 'filter/setStatus',
  payload: Status,
};

const setStatus = (status: Status): SetStatus => {
  return {
    type: 'filter/setStatus',
    payload: status,
  };
}

type SetQuery = {
  type: 'filter/setQuery',
  payload: string,
}

const setQuery = (query: string): SetQuery => {
  return {
    type: 'filter/setQuery',
    payload: query,
  }
}

type FilterState = {
  query: string,
  status: Status,
}

const initialState: FilterState = {
  query: '',
  status: Status.ALL,
}

type Action = SetQuery | SetStatus;



const filterReducer = (state = initialState, action: Action): FilterState => {
  switch (action.type) {
    case 'filter/setStatus':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/setQuery':
      return {
        ...state,
        query: action.payload,
      }

    default:
      return state;
  }
};

export const actions = {
  setStatus,
  setQuery,
};
export default filterReducer;
