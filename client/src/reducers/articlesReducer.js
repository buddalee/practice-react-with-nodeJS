import { FETCH_ARTICLES } from '../actions/types';
import typeToReducer from 'type-to-reducer';
import { REQUEST, SUCCESS } from '../configureStore';

const initialState = {
  articles: [],
  isLoading: false,
};

export default typeToReducer({
  [FETCH_ARTICLES]: {
    [REQUEST]: (state) => {
      return Object.assign({}, state, {
        isLoading: true,
      });
    },
    [SUCCESS]: (state, action) => {
      return Object.assign({}, state, {
        articles: action.payload.data,
        isLoading: false,
      });
    },
  },
}, initialState);
