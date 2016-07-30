import { renderComponent, expect } from '../test_helper';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../src/actions';
import * as types from '../../src/actions/types';
import UserProfile from '../../src/components/user_profile';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('UserProfile async action, getUserProfile', () => {

  beforeEach(() => {

  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('gets the user profile from the api', () => {
    nock('http://example.com')
      .post('/getuserprofile', { headers: { authorization: 'token' }})
      .reply(200, { body: { data: 'data' }});

    const expectedActions = [
      { type: types.GET_USER_PROFILE, body: { data: 'data' }}
    ];

    const store = mockStore({ data: 'data' });

    return store.dispatch(actions.getUserProfile())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });
});