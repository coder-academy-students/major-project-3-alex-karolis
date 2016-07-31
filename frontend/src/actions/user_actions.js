import axios from 'axios';
import { browserHistory } from 'react-router';
import API_URL from './index'

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  GET_USER_PROFILE,
  GET_OTHER_USER_PROFILE
} from './types'


// USER CRUD ------------------------------------------------------------------

// SIGN IN USER

export function signinUser({ email, password }) {

  // This is how we get direct access to the dispatch function in Redux
  // Return a function from the action creator with the parameter 'dispatch'
  // This is enabled with the npm package 'redux-thunk'
  // which gives us arbitrary access to the dispatch method
  return function (dispatch) {

    // Submit email and password to server
    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });

        // - Save the JWT in localStorage
        localStorage.setItem('token', response.data.token);

        // - redirect to the route '/feature'
        browserHistory.push('/search');
      })
      .catch(() => {
        // If request is bad...
        // - show an error to the user
        dispatch(authError('Incorrect email or password!'));
      });
  };
}

// SIGN UP USER

export function signupUser({ email, password, firstname, lastname, bio} ,{ image }) {

  // Use redux-thunk
  return function(dispatch) {

    // Submit email and password to the server
    axios.post(`${API_URL}/signup`, { email, password, firstname, lastname, bio, image })
      .then(response => {
        // Good request
        dispatch({ type: AUTH_USER });

        // Update JWT
        localStorage.setItem('token', response.data.token);

        // redirect
        browserHistory.push('/search');
      })
      .catch(response => {
        // resonse from server has nested response object?
        dispatch(authError(response.response.data.error));
      });
  }
}

// RETURN AUTHORIZATION ERROR

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

// SIGN OUT USER

export function signoutUser() {
  // delete localStorage
  localStorage.removeItem('token');
  // run action
  return { type: UNAUTH_USER };
}

// GET USER PROFILE

export function getUserProfile(userEmail) {
  const notCurrentUser = userEmail ? true : false;
  return function(dispatch) {
    axios.post(`${API_URL}/getuserprofile`, {
      userEmail
    }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(result => {
        if (notCurrentUser) {
          dispatch({
            type: GET_OTHER_USER_PROFILE,
            payload: result
          });
        } else {
          dispatch({
            type: GET_USER_PROFILE,
            payload: result
          });
        }
      });
  }
}

// UPDATE USER PROFILE

export function updateUserProfile(bio) {
  return function(dispatch) {
    axios.post(`${API_URL}/updateuserprofile`, {
      bio
    },{
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(result => {
        dispatch({
          type: GET_USER_PROFILE,
          payload: result
        });
      });
  }
}