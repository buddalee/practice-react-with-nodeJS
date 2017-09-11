import {
  SET_MESSAGE,
  RESET_MESSAGE
} from '../actions/types';

export default function(state = {
  message: undefined,
  onConfirm: undefined,
  onCancel: undefined,
  onClose: undefined,
  status: '',
  httpStatus: null,  
}, action) {
  const {
    type,
    error,
    payload,
  } = action;
  if (type === SET_MESSAGE) {
    return Object.assign({}, state, action.props);
  } else if (type === RESET_MESSAGE) {
    return Object.assign({}, state, {
      message: undefined,
      onConfirm: undefined,
      onCancel: undefined,
      onClose: undefined,
      status: '',
      httpStatus: null,
    });
  } else if (error) {
    return Object.assign({}, state, {
      message: payload.response.statusText,
      onConfirm: undefined,
      onCancel: undefined,
      onClose: undefined,
      status: payload.response.status,
      httpStatus: error.httpStatus,
    });
  }
  return state;
} 