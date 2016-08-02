import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './../../actions'

class SearchBarComment extends Component {

  render () {
    return (
      <div className="search-bar">
        <label><strong className="text-color-blue">Search Comments: </strong></label>
        <input
          className="form-control"
          value={this.props.terms}
          onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  }

  onInputChange(terms) {
    this.props.updateCommentSearch(terms);
  }
}

function mapStateToProps (state) {
  return { terms: state.auth.terms };
}

export default connect(mapStateToProps, actions)(SearchBarComment)