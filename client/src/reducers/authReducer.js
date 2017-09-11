import { FETCH_USER } from '../actions/types';
// import typeToReducer from 'type-to-reducer';
// import { REQUEST, SUCCESS } from '../configureStore';

// const initialState = {
//   isImgLoading: false,
// };

// export default typeToReducer({
//   [FETCH_USER]: {
//     [SUCCESS]: (state, action) => {
//       return Object.assign({}, action.payload, {
//         isImgLoading: false,
//       });
//     },
//   },
//   [UPDATE_PERSONAL_AVATAR]: {
//     [REQUEST]: (state) => {
//       return Object.assign({}, state, {
//         isImgLoading: true,
//       });
//     },
//     [SUCCESS]: (state, action) => {
//       return Object.assign({}, action.payload.data, {
//         isImgLoading: false,
//       });
//     },
//   },
// }, initialState);


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case 'UPDATE_PERSONAL_AVATAR_SUCCESS':
      return action.payload.data || false;
    default:
      return state;
  }
}