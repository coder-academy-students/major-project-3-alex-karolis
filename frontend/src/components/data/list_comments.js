import React, { Component} from 'react'
import moment from 'moment-timezone'
import { connect } from 'react-redux'
import SearchBarComments from './search_bar_comments'

class CommentList extends Component {

  listComments () {
    return this.props.comments.map(comment => {
      console.log(this.props.terms)
      console.log(this.props.terms == '')
      if (this.props.terms === undefined || comment.comment.indexOf(this.props.terms) !== -1) {
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
      }
    });
  }
  render () {
    return (
      <div>
        <br />
        <SearchBarComments />
        <br />
        <ul className="list-group">
          {this.listComments()}
        </ul>
      </div>
    );
  }
};

function mapStateToProps (state) {
  return { terms: state.auth.terms };
}

export default connect(mapStateToProps, null)(CommentList);