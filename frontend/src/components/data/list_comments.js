import React, { Component} from 'react'
import moment from 'moment-timezone'
import SearchBarComments from './search_bar_comments'

class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = { terms: '' }
  }

  onSearchTermChange(terms) {
    this.setState({terms});
  }

  listComments () {
    console.log(this.state.terms)
    return this.props.comments.map(comment => {
      return (
        <li key={comment.id}
            className="list-group-item overflow-hidden comment-list">
          <p className="text-muted comment-list-header">
            {comment.email}
          </p>
          <p className="text-muted comment-list-header">
            {moment(comment.createdAt).tz("Australia/Sydney")
              .format('MMMM Do YYYY, h:mm:ss a')}
          </p>
          <p className="bottom-margin-30px">{comment.comment}</p>
          <span
            value={comment.id}
            onClick={() => this.deleteComment(comment.id)}
            className="btn btn-danger btn-sm float-right">
            Delete comment
          </span>
        </li>
      );
    });
  }
  render () {
    return (
      <div>
        <SearchBarComments onInputChange={onSearchTermChange} />
        <ul className="list-group">
          {this.listComments()}
        </ul>
      </div>
    );
  }
};

export default CommentList;