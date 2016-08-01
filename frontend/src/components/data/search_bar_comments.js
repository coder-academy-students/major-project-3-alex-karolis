import React, { Component } from 'react'

class SearchBarComment extends Component {
  constructor(props) {
    super(props);

    this.state = {terms: ''};
  }

  render () {
    return (
      <div className="search-bar">
        <label>Search Comments </label>
        <input
          className="form-control"
          value={this.state.terms}
          onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  }

  onInputChange(terms) {
    this.setState({terms});
    // this.props.onSearchTermChange(terms);
  }
}

export default SearchBarComment