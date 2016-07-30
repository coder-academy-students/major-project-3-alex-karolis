import React, { Component } from 'react';
import SearchResultList from './data/search_result_list';
import { connect } from 'react-redux'
import * as actions from '../actions';

class Welcome extends Component  {

  componentWillMount() {
    this.props.readData({type: 'recent', terms: ''});
  }

  render () {
    return (
      <div>
        <h1 className="welcome-component">Welcome to suPerCooL search</h1>
        <SearchResultList/>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { message: state.auth.message }
}

export default connect(mapStateToProps, actions)(Welcome)