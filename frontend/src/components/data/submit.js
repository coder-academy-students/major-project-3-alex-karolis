import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import moment from 'moment-timezone';
import * as actions from '../../actions';
import DropZoneFile from './dropzone_file';
import toastr from 'toastr';

class Submit extends Component {

  static handleFormSubmit({title, post}) {
    const image = this.props.imageSubmission;
    this.props.submitData(title, post, image);
    this.props.resetForm();
    this.props.clearSubmitComponent();
  }

  deleteItem(result) {
    this.props.deleteSubmission(result);
    toastr.warning('Post Deleted')
  }

  listResults() {
    if (this.props.submission) {
      const result = this.props.submission;
      return (
        <li key={result.id}
            className="list-group-item">
          <img
            className="float-right"
            src={result.image}
            width={52}
            height={52}
          />
          <h4 className="list-group-item-heading"> {result.title} </h4>
          <p className="text-muted"> {result.email} </p>
          <p className="text-muted">
            {moment(result.createdAt).tz("Australia/Sydney").format('MMMM Do YYYY, h:mm:ss a')}
          </p>
          <p className="list-group-item-text message-post"> {result.post} </p>
          <Link
            to={`/data/${result.id}`}
            className="btn btn-primary btn-sm">
            Comments
          </Link>
          <span
            value={result}
            onClick={() => this.deleteItem(result)}
            className="btn btn-danger btn-sm float-right">
              Delete Post
          </span>
        </li>
      );
    }
  }

  render () {
    const { handleSubmit, fields: { title, post }} = this.props;
    return (
      <div >
        <div className="search-result-list">
          <ul className="list-group">
            {this.listResults()}
          </ul>
        </div>
        <form className="clearfix" onSubmit={handleSubmit(Submit.handleFormSubmit.bind(this))} >
          <fieldset className="form-group">
            <label>Title:</label>
            <input {...title} className="form-control" />
          </fieldset>
          <fieldset className="form-group">
            <label>Post:</label>
            <textarea {...post} rows="10" className="form-control" />
          </fieldset>
          <button action="submit" className="btn btn-primary float-right">Submit</button>
        </form>
        <DropZoneFile />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    submission: state.auth.submission,
    imageSubmission: state.auth.imageSubmission
  }
}

export default reduxForm({
  form: 'submit',
  fields: ['title', 'post', 'image']
}, mapStateToProps, actions)(Submit);