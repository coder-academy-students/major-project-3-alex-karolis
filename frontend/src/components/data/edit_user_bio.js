import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import toastr from 'toastr';
import TinyMCE from 'react-tinymce';

// Nested Component inside User Profile
class EditUserBio extends Component {

  handleEditorChange(bio) {
    this.props.updateUserProfile(bio.target.getContent());
    toastr.success('Your profile has been updated.')
  }

  render () {
    return (
      <TinyMCE
        content={this.props.bio}
        config={{
          inline: true,
          menubar: false,
          plugins: 'autolink link image lists print preview',
          toolbar: 'styleselect | bold italic | alignleft aligncenter alignright | link ',
          statusbar: false
        }}
        onBlur={this.handleEditorChange.bind(this)}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps, actions)(EditUserBio);