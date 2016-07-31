import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_DATA,
  SUBMIT_DATA,
  CLEAR_SUBMIT_COMPONENT,
  DELETE_DATA,
  GET_COMMENT_DATA,
  UPDATE_COMMENT_DATA,
  DELETE_COMMENT,
  ADD_IMAGE_URL,
  DELETE_SUBMISSION,
  VOTE_ON_POST,
  GET_USER_PROFILE,
  GET_OTHER_USER_PROFILE
} from '../actions/types';

export default function(state={}, action) {
  switch (action.type) {
    case AUTH_USER:
      return {...state, error: '', authenticated: true};
    case UNAUTH_USER:
      return {...state, authenticated: false};
    case AUTH_ERROR:
      return {...state, error: action.payload};
    case GET_USER_PROFILE:
      return {...state, user: action.payload};
    case GET_OTHER_USER_PROFILE:
      console.log(action.payload);
      return {...state, otherUser: action.payload};
    case FETCH_DATA:
      return {...state, message: action.payload};
    case SUBMIT_DATA:
      return {...state, submission: action.payload, imageSubmission: ''};
    case DELETE_SUBMISSION:
      return {...state, submission: ''};
    case CLEAR_SUBMIT_COMPONENT:
      return {...state, submission: '', imageSubmission: ''};
    case ADD_IMAGE_URL:
      return {...state, imageSubmission: action.payload};
    case DELETE_DATA:
      const deleteIndex = state.message
        .findIndex(elem => elem.id === action.payload.id);
      return {
        ...state, message: [
          ...state.message.slice(0, deleteIndex),
          ...state.message.slice(deleteIndex + 1)
        ]
      };
    case GET_COMMENT_DATA:
      return {...state, msgComments: action.payload};
    case VOTE_ON_POST:
      return {...state, msgComments: action.payload};
    case UPDATE_COMMENT_DATA:
      return {...state, msgComments: action.payload};
    case DELETE_COMMENT:
      const deleteIndexComment = state.msgComments.data.comments
        .findIndex(elem => elem.id === action.payload);

      return {
        ...state, msgComments: {
          data: {
            email: state.msgComments.data.email,
            post: state.msgComments.data.post,
            title: state.msgComments.data.title,
            id: state.msgComments.data.id,
            image: state.msgComments.data.image,
            comments: [
              ...state.msgComments.data.comments.slice(0, deleteIndexComment),
              ...state.msgComments.data.comments.slice(deleteIndexComment + 1)
            ]
          }
        }
      };
  }
  return state;
}