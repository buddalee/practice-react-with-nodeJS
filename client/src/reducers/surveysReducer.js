import { FETCH_SURVEYS } from '../actions/types';
import typeToReducer from 'type-to-reducer';
import { REQUEST, SUCCESS } from '../configureStore';

const initialState = {
  surveys: [],
  isLoading: false,
};

export default typeToReducer({
  [FETCH_SURVEYS]: {
    [REQUEST]: (state) => {
    return Object.assign({}, state, {
      isLoading: true,
    });
    },
    [SUCCESS]: (state, action) => {
      return Object.assign({}, state, {
        surveys: action.payload.data,
        isLoading: false,
      });
    },
  },
}, initialState);
