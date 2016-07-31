import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment-timezone';
import toastr from 'toastr';
import TinyMCE from 'react-tinymce';

class SearchResultList extends Component {

  deleteItem(result) {
    this.props.deleteData(result);
    toastr.warning('Post Deleted');
  }


  countVotes(votes) {
    return votes.reduce((total, vote) => {
      if (vote.upVote) { return ++total }
      else { return --total }
    }, 0);
  }


  listResults() {
    if (this.props.message) {
      return this.props.message.map(result => {
        if (this.props.askingUser === 'all' || this.props.askingUser.email === result.email)
        return (
          <li key={result.id}
              className="list-group-item">
            <h4 className="list-group-item-heading"> {result.title} </h4>
            <img
              className="float-right"
              src={result.image || ''}
              width={104}
              height={104}
            />
            <Link to={`/users/${result.email}`}>
              <p className="text-muted"> {result.email} </p>
            </Link>
            <p className="text-muted">
              {moment(result.createdAt).tz("Australia/Sydney")
                .format('MMMM Do YYYY, h:mm:ss a')}
            </p>
            <TinyMCE
              content={result.post}
              config={{
                contentEditable: false,
                inline: true,
                menubar: false,
                toolbar: false,
                readonly: 1
              }}
              className="list-group-item-text message-post" />
            <p className="text-muted">Votes: {this.countVotes(result.votes)} </p>
            <Link
              to={`/data/${result.id}`}
              className="btn btn-primary btn-sm">
              View Post
            </Link>
            <span
              value={result}
              onClick={() => this.deleteItem(result)}
              className="btn btn-danger btn-sm float-right">
              Delete Post
            </span>
          </li>
        );
      });
    }
  }


  render() {
    return (
      <div className="search-result-list">
        <ul className="list-group">
          {this.listResults()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message }
}

export default connect(null, actions)(SearchResultList);