import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_DATA,
  SUBMIT_DATA,
  DELETE_SUBMISSION,
  CLEAR_SUBMIT_COMPONENT,
  DELETE_DATA,
  GET_COMMENT_DATA,
  UPDATE_COMMENT_DATA,
  DELETE_COMMENT,
  ADD_IMAGE_URL,
  VOTE_ON_POST,
  GET_USER_PROFILE,
  GET_OTHER_USER_PROFILE
} from './types';

const API_URL = 'http://localhost:3090';

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

// DATA CRUD ---------------------------------------------------

// CREATE DATA

export function createData( title, post, image ) {

  return function(dispatch) {
    axios.post(`${API_URL}/datasave`, {
      title, post, image
    }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: SUBMIT_DATA,
          payload: response.data
        })
      })
  }
}

// READ DATA

export function readData({type, terms}) {
  return function(dispatch) {
    axios.post(`${API_URL}/datasearch`, {
      type, terms
    }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_DATA,
          payload: response.data
        })
      });
  }
}

// UPDATE DATA

export function updateData(postId, postText) {
  return function(dispatch) {
    axios.post(`${API_URL}/dataupdate`, {
      postId,
      postText
    }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(result => {
        dispatch({
          type: UPDATE_COMMENT_DATA,
          payload: result
        });
      });
  }
}

// DELETE DATA

// function to delete data when state does not contain comments, in submit.js
export function deleteSubmission(result) {
  return function(dispatch) {
    axios.post(`${API_URL}/datadelete`, {
      id: result.id
    }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(() => {
        dispatch({
          type: DELETE_SUBMISSION,
          payload: result
        });
      });
  }
}

export function deleteData(result) {
  return function(dispatch) {
    axios.post(`${API_URL}/datadelete`, {
      id: result.id
    }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(() => {
        dispatch({
          type: DELETE_DATA,
          payload: result
        });
      });
  }
}

// COMMENTS CRUD ---------------------------------------------------

// GET COMMENTS FOR POST

export function readDataWithComments(postId) {
  return function(dispatch) {
    axios.post(`${API_URL}/datacommentget`, {
      postId
    }, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(result => {
      dispatch({
        type: GET_COMMENT_DATA,
        payload: result
      });
    });
  }
}

// ADD COMMENT TO POST

export function createCommentForData(postId, comment) {
  return function(dispatch) {
    axios.post(`${API_URL}/datacommentsave`, {
      postId,
      comment
      },{
        headers: { authorization: localStorage.getItem('token') }
      })
      .then(result => {
        dispatch({
          type: UPDATE_COMMENT_DATA,
          payload: result
        });
      });
  }
}

// DELETE COMMENT FROM POST

export function deleteComment(commentId) {
  return function(dispatch) {
    axios.post(`${API_URL}/datacommentdelete`, {
      commentId
    },{
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(result => {
        dispatch({
          // add if result true/false to change payload
          type: DELETE_COMMENT,
          payload: commentId
        });
      })
  }
}

// SUBMIT IMAGE TO OSPRY AND GET IMAGE URL ----------------------------------

export function setImage(files) {
  const public_key = 'pk-test-ds1izdgdjeb5jeurr8m6gnip';
  var ospry = new Ospry(public_key);

  return function (dispatch) {
    ospry.up({
      files,
      imageReady: function(err, metadata, i) {
        if (err === null) {
          dispatch({
            type: ADD_IMAGE_URL,
            payload: metadata.url
          });
        } else {
          console.log('upload error', err);
        }
      }
    });
  }
}

// CLEAR SUBMISSIONS FROM FORM --------------------------------------------

export function clearSubmitComponent() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_SUBMIT_COMPONENT,
      payload: []
    });

  }
}

// VOTE ON DATA ------------------------------------------------------------

export function voteOnData(postId, voteType) {
  return function(dispatch) {
    axios.post(`${API_URL}/datavote`, {
      postId,
      voteType
    },{
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(result => {
        dispatch({
          type: VOTE_ON_POST,
          payload: result
        })
      })
  }
}
