import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {

  renderLinks() {
    if (this.props.authenticated) {
      // show link to sign out
      return [
        <li className="nav-item" key={1}>
          <Link to="/search" className="nav-link">Search</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link to="/submit" className="nav-link">Submit</Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link to="/profile" className="nav-link">Profile</Link>
        </li>,
        <li className="nav-item" key={4}>
          <Link to="/help" className="nav-link">Help</Link>
        </li>,
        <li className="nav-item pull-sm-right" key={5}>
          <Link to="/signout" className="nav-link">Sign Out</Link>
        </li>
      ];
    } else {
      // show a link to sign in or sign up
      return [
        <li className="nav-item" key={1}>
          <Link to="/signin" className="nav-link">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </li>
      ];
    }
  }

  render () {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">suPerCooL</Link>
          </div>
          <ul className="nav navbar-nav">
            {this.renderLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps, null)(Header);