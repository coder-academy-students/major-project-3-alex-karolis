import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import toastr from 'toastr'
import UserVoteTrends from './user_vote_trends';
import EditUserBio from './data/edit_user_bio';
import SearchResultsList from './data/search_result_list'

class UserProfile extends Component {

  componentWillMount() {
    this.props.getUserProfile();
    this.setState({ auth: { message: []}})
    if (this.props.user) this.props.readData({ type: 'email', terms: this.props.user.data.email});
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.message &&
        this.props.user &&
        this.props.message.length === nextProps.message.length &&
        this.props.user === nextProps.user) return false;
    return true;
  }

  componentWillUpdate(nextProps) {
   const email = nextProps.user.data.email;
    this.props.readData({ type: 'email', terms: email});
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
        <div className="user-profile">
          <div className="card push-from-top">
            <img className="card-img-top float-right" src={user.image} width={256} height={256} />
              <div className="card-block">
                <h4 className="card-title">{user.firstname} {user.lastname}</h4>
                <p className="card-text text-muted">{user.email}</p>
                <h6 className="card-text">Votes: {UserProfile.countVotes(user.votes)}</h6>
                <br />
                <div>
                  <EditUserBio bio={this.props.user.data.bio} />
                </div>
              </div>
          </div>
          <UserVoteTrends data={user.votes} color="blue" />
          <h3 className="center-text">My Posts</h3>
          <SearchResultsList message={this.props.message} askingUser={this.props.user.data} />
        </div>
      );
    } else {
      toastr.info('Looking for your profile');
      return <div className="push-from-top">Loading....</div>;
    }
  }
}

function mapStateToProps (state) {
  return {
    user: state.auth.user,
    message: state.auth.message
  }
}

export default connect(mapStateToProps, actions)(UserProfile);