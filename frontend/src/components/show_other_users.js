import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import UserVoteTrends from './user_vote_trends'
import SearchResultsList from './data/search_result_list'
import toastr from 'toastr'
import TinyMCE from 'react-tinymce'

class Users extends Component {

  componentWillMount() {
    this.props.getUserProfile(this.props.params.email);
    this.props.readData({type: 'email', email: this.props.params.email});
  }

  static countVotes(votes) {
    return votes.reduce((total, votesForPost) => {
      if (typeof votesForPost === 'object') {
        return total + votesForPost.reduce((runningtotal, vote) => {
            if (vote.upVote) { return ++runningtotal }
            else { return --runningtotal }
          }, 0);
      } else {
        return 0;
      }
    }, 0)
  }

  render() {
    if (this.props.user) {
      const user = this.props.user.data;
      return (
        <div>
          <div className="card push-from-top">
            <img className="card-img-top float-right" src={user.image} width={256} height={256} />
            <div className="card-block">
              <h4 className="card-title">{user.firstname} {user.lastname}</h4>
              <p className="card-text text-muted">{user.email}</p>
              <h6 className="card-text">Votes: {Users.countVotes(user.votes)}</h6>
              <br />
              <div>
                <TinyMCE
                  content={user.bio}
                  config={{
                    contentEditable: false,
                    inline: true,
                    menubar: false,
                    toolbar: false,
                    readonly: 1
                  }} />
              </div>
            </div>
          </div>
          <UserVoteTrends data={user.votes} color="blue" />
          <h3 className="center-text">{user.firstname}'s Posts</h3>
          <SearchResultsList />
        </div>
      );
    } else {
      toastr.info('Looking for user profile...');
      return <div className="push-from-top">Loading....</div>;
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, actions)(Users)