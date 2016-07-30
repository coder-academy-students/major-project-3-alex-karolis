import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {

  // call action creator signoutUser
  componentWillMount() {
    this.props.signoutUser();
  }
  
  // Goodbye message
  render() {
    return <div className="push-from-top">Sorry to see you go...</div>;
  }
}


export default connect(null, actions)(Signout);