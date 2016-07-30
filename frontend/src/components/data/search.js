import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import SearchResultList from './search_result_list';

class Search extends Component {

  static handleFormSubmit({type, terms}) {
    this.props.fetchData({type, terms});
    const search = this.props.fields;
    search.type.value = '';
    search.terms.value = '';
  }

  render () {
    const { handleSubmit, fields: { type, terms }} = this.props;
    return (
      <div className="push-from-top">
        <form onSubmit={handleSubmit(Search.handleFormSubmit.bind(this))} >
          <fieldset className="form-group">
            <label>Search type:</label>
            <select
              {...type}
              value={type.value || ''}
              className="form-control" >
              <option></option>
              <option value="email">email</option>
              <option value="title">title</option>
              <option value="post">post</option>
            </select>
          </fieldset>
          <fieldset className="form-group">
            <label>Search terms:</label>
            <input {...terms} className="form-control" />
          </fieldset>
          <button action="submit" className="btn btn-primary">Search</button>
        </form>
        <SearchResultList/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default reduxForm({
  form: 'search',
  fields: ['type', 'terms']
}, mapStateToProps, actions)(Search);