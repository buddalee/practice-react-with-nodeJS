import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import messageReducer from './messageReducer';
import articlesReducer from './articlesReducer';


export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer,
  message: messageReducer,
  articles: articlesReducer,
});
