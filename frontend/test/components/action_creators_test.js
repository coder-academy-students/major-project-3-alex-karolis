import { expect } from '../test_helper';
import nock from 'nock';
import * as actions from '../../src/actions';
import * as types from '../../src/actions/types';

describe('Action Creators', () => {
  beforeEach(() => {
    localStorage = {
      getItem(token) {
        return token;
      }
    }
  });
  afterEach(() => {
    nock.cleanAll();
  });
  describe('Update User Profile', () => {
    it('gets the user profile from the api', () => {
      nock('http://example.com')
        .post('/getuserprofile', { headers: { authorization: 'token' }}, { body: { bio: 'bio' }})
        .reply(201, { body: { data: 'data' }});

      const expectedActions = [
        { type: types.GET_USER_PROFILE, body: { data: 'data' }}
      ];
      function mockDispatch(action) {
        const expectedAction = expectedActions.shift();
        expect(action).to.equal(expectedAction);
        if(!expectedActions.length) {
          done();
        }
      }
      actions.getUserProfile(mockDispatch)
    });
  });
  describe('Fetch Data', () => {
    it('gets the data from the api', () => {
      nock('http://example.com')
        .post('/fetchdata', { headers: { authorization: 'token' }})
        .reply(201, { body: { data: 'data' }});

      const expectedActions = [
        { type: types.FETCH_DATA, body: { data: 'data' }}
      ];
      function mockDispatch(action) {
        const expectedAction = expectedActions.shift();
        expect(action).to.equal(expectedAction);

        if(!expectedActions.length) {
          done();
        }
      }
      actions.fetchData(mockDispatch)
    });
  });
  describe('Submit Data', () => {
    it('submits data to the api', () => {
      nock('http://example.com')
        .post('/datasave', { headers: { authorization: 'token' }})
        .reply(201, { body: { data: 'data' }});

      const expectedActions = [
        { type: types.SUBMIT_DATA, body: { data: 'data' }}
      ];
      function mockDispatch(action) {
        const expectedAction = expectedActions.shift();
        expect(action).to.equal(expectedAction);

        if(!expectedActions.length) {
          done();
        }
      }
      actions.fetchData(mockDispatch)
    });
  });
  describe('Delete Data', () => {
    it('deletes data from the api', () => {
      nock('http://example.com')
        .post('/datadelete', { headers: { authorization: 'token' }})
        .reply(201, { body: { id: 'id' }});

      const expectedActions = [
        { type: types.FETCH_DATA, body: { data: 'data' }}
      ];
      function mockDispatch(action) {
        const expectedAction = expectedActions.shift();
        expect(action).to.equal(expectedAction);

        if(!expectedActions.length) {
          done();
        }
      }
      actions.fetchData(mockDispatch)
    });
  });
  describe('Delete Data', () => {
    it('deletes data from the api', () => {
      nock('http://example.com')
        .post('/datadelete', { headers: { authorization: 'token' }})
        .reply(201, { body: { id: 'id' }});

      const expectedActions = [
        { type: types.FETCH_DATA, body: { data: 'data' }}
      ];
      function mockDispatch(action) {
        const expectedAction = expectedActions.shift();
        expect(action).to.equal(expectedAction);

        if(!expectedActions.length) {
          done();
        }
      }
      actions.fetchData(mockDispatch)
    });
  });
});
