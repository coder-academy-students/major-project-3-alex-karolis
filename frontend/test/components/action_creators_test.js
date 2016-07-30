import { expect } from '../test_helper';
import nock from 'nock';
import * as actions from '../../src/actions';
import * as types from '../../src/actions/types';

describe('Action Creators', () => {
  beforeEach(() => {
    localStorage = {
      getItem(token) {
        return token;
      },
      removeItem(token) {
        return null
      }
    }
  });
  afterEach(() => {
    nock.cleanAll();
  });
  // SIGN IN USER
  describe('Sign in User', () => {
    it('signs the user in to the api', () => {
      nock('http://example.com')
        .post('/signin', {
          body: { email: 'email', password: 'password' }
        })
        .reply(201, { body: { data: 'data' }});

      const expectedAction = [
        { type: types.AUTH_USER, body: { data: 'data' }}
      ];
      function mockDispatch(action) {
        expect(action).to.equal(expectedAction.shift());
        if(!expectedActions.length) {
          done();
        }
      }
      actions.signinUser(mockDispatch)
    });
  });
  // SIGN OUT USER
  describe('Sign out User', () => {
    it('signs the user out', () => {
      const expectedAction = [
        { type: types.UNAUTH_USER }
      ];
      expect(actions.signoutUser()).to.eql(expectedAction.shift())
    });
  });
  // RETURN AUTHORIZATION ERROR
  describe('Authorization error', () => {
    it('returns an error', () => {
      const expectedAction = [
        { type: types.AUTH_ERROR, payload: undefined }
      ];
      expect(actions.authError()).to.eql(expectedAction.shift())
    });
  });
  // GET USER PROFILE
  describe('Get User Profile', () => {
    it('gets the user profile from the api', () => {
      nock('http://example.com')
        .post('/getuserprofile', {
          headers: { authorization: 'token' }
        })
        .reply(201, { body: { data: 'data' }});

      const expectedAction = [
        { type: types.GET_USER_PROFILE, body: { data: 'data' }}
      ];
      function mockDispatch(action) {
        expect(action).to.equal(expectedAction.shift());
        if(!expectedActions.length) {
          done();
        }
      }
      actions.getUserProfile(mockDispatch)
    });
  });
  // UPDATE USER PROFILE
  describe('Update User Profile', () => {
    it('updates the user profile on the api', () => {
      nock('http://example.com')
        .post('/updateuserprofile', {
          headers: { authorization: 'token' }
        }, {
          body: { bio: 'bio' }
        })
        .reply(201, { body: { data: 'data' }});

      const expectedAction = [
        { type: types.GET_USER_PROFILE, body: { data: 'data' }}
      ];
      function mockDispatch(action) {
        expect(action).to.equal(expectedAction.shift());
        if(!expectedActions.length) {
          done();
        }
      }
      actions.updateUserProfile(mockDispatch)
    });
  });
  // FETCH DATA
  describe('Fetch Data', () => {
    it('gets the data from the api', () => {
      nock('http://example.com')
        .post('/fetchdata', { headers: { authorization: 'token' }})
        .reply(201, { body: { data: 'data' }});

      const expectedAction = [
        { type: types.FETCH_DATA, body: { data: 'data' }}
      ];
      function mockDispatch(action) {
        expect(action).to.equal(expectedAction.shift());
        if(!expectedActions.length) {
          done();
        }
      }
      actions.fetchData(mockDispatch)
    });
  });
  // SUBMIT DATA
  describe('Submit Data', () => {
    it('submits data to the api', () => {
      nock('http://example.com')
        .post('/datasave', { headers: { authorization: 'token' }})
        .reply(201, { body: { data: 'data' }});

      const expectedAction = [
        { type: types.SUBMIT_DATA, body: { data: 'data' }}
      ];
      function mockDispatch(action) {
        expect(action).to.equal(expectedAction.shift());
        if(!expectedActions.length) {
          done();
        }
      }
      actions.submitData(mockDispatch)
    });
  });
  // UPDATE DATA
  describe('Update Data', () => {
    it('updates data on the api', () => {
      nock('http://example.com')
        .post('/dataupdate', { headers: { authorization: 'token' }})
        .reply(201, { body: { id: 'id' }});

      const expectedAction = [
        { type: types.DELETE_DATA, body: { data: 'data' }}
      ];
      function mockDispatch(action) {
        expect(action).to.equal(expectedAction.shift());
        if(!expectedActions.length) {
          done();
        }
      }
      actions.updatePost(mockDispatch)
    });
  });
  // DELETE DATA
  describe('Delete Data', () => {
    it('deletes data from the api', () => {
      nock('http://example.com')
        .post('/datadelete', { headers: { authorization: 'token' }})
        .reply(201, { body: { id: 'id' }});

      const expectedAction = [
        { type: types.DELETE_DATA, body: { data: 'data' }}
      ];
      function mockDispatch(action) {
        expect(action).to.equal(expectedAction.shift());
        if(!expectedActions.length) {
          done();
        }
      }
      actions.deleteData(mockDispatch)
    });
  });
  // GET COMMENTS
  describe('Get Comment Data', () => {
    it('gets comment data from the api', () => {
      nock('http://example.com')
        .post('/datacommentget', { headers: { authorization: 'token' }})
        .reply(201, { body: { data: 'data' }});

      const expectedAction = [
        { type: types.GET_COMMENT_DATA, body: { data: 'data' }}
      ];
      function mockDispatch(action) {
        expect(action).to.equal(expectedAction.shift());
        if(!expectedActions.length) {
          done();
        }
      }
      actions.getCommentData(mockDispatch)
    });
  });
  // ADD COMMENT
  describe('Add Comment Data', () => {
    it('adds comment data to the api', () => {
      nock('http://example.com')
        .post('/datacommentsave', { headers: { authorization: 'token' }})
        .reply(201, { body: { data: 'data' }});

      const expectedAction = [
        { type: types.UPDATE_COMMENT_DATA, body: { data: 'data' }}
      ];
      function mockDispatch(action) {
        expect(action).to.equal(expectedAction.shift());
        if(!expectedActions.length) {
          done();
        }
      }
      actions.addCommentData(mockDispatch)
    });
  });
});
