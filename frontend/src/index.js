import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';

import App from './components/app';
import Help from './components/help';
import UserProfile from './components/user_profile';
import Users from './components/show_other_users';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Search from './components/data/search';
import Submit from './components/data/submit';
import ShowData from './components/data/show_data';
import EditData from './components/data/edit_data';
import Welcome from './components/welcome';

const createStoreWithMiddleware = compose(applyMiddleware(reduxThunk))(createStore);

// Create store
const store = createStoreWithMiddleware(reducers);

// Check for token and update application state if required
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="help" component={Help} />
        <Route path="users/:email" component={RequireAuth(Users)} />
        <Route path="profile" component={RequireAuth(UserProfile)} />
        <Route path="signin" component={Signin} />
        <Route path="signup" component={Signup} />
        <Route path="signout" component={Signout} />
        <Route path="search" component={RequireAuth(Search)} />
        <Route path="submit" component={RequireAuth(Submit)} />
        <Route path="data/:id" component={RequireAuth(ShowData)} />
        <Route path="edit/:id" component={RequireAuth(EditData)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
