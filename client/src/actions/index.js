import axios from 'axios';
import {
  FETCH_USER,
  FETCH_SURVEYS,
  ADD_ARTICLES,
  SET_MESSAGE,
  RESET_MESSAGE,
  FETCH_ARTICLES,
  UPDATE_PERSONAL_AVATAR
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  if (res.data) {
    res.data.isInSufficient = false;
    if (res.data.credits === 0) {
      res.data.isInSufficient = true;
    }
  }
  console.log('payload: ', res.data);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export function fetchSurveys() {
  return {
    type: FETCH_SURVEYS,
    payload: axios.get('/api/surveys'),
  };
}

export function addArticles(data) {
  return {
    type: ADD_ARTICLES,
    payload: axios.post('/api/postArticle', data),
  };
}

export function fetchArticles() {
  return {
    type: FETCH_ARTICLES,
    payload: axios.get('/api/getArticles'),
  };
}

export function setMessage(props) {
  return {
    type: SET_MESSAGE,
    props,
  };
}

export function resetMessage() {
  return {
    type: RESET_MESSAGE,
  };
}

export function updatePersonalAvatar(link) {
  debugger;
  return {
    type: UPDATE_PERSONAL_AVATAR,
    payload: axios.put('/api/updateUserInfo', link),
  };
}