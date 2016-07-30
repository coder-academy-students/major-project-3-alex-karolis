import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import toastr from 'toastr';
import TinyMCE from 'react-tinymce';

// Nested Component inside Showdata
class EditData extends Component {

  handleEditorChange(post) {
    const postId = this.props.msgComments.data.id;
    this.props.updatePost(postId, post.target.getContent());
    toastr.success('Your post has been updated.')
  }

  render () {
    return (
      <TinyMCE
        className="push-from-top"
        content={this.props.post}
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
    msgComments: state.auth.msgComments,
    initialValues: state.auth.msgComments.data
  };
}

export default connect(mapStateToProps, actions)(EditData);



// import React, { Component } from 'react';
// import { reduxForm } from 'redux-form';
// import * as actions from '../../actions';
// import toastr from 'toastr';
//
// // Nested Component inside Showdata
// class EditData extends Component {
//
//   static handleFormSubmit({post}) {
//     const postId = this.props.msgComments.data.id;
//     this.props.updatePost(postId, post);
//     toastr.success('Your update has been saved.');
//   }
//
//   render () {
//     const { handleSubmit, fields: { post }} = this.props;
//     return (
//       <div className="push-from-top">
//         <form  onSubmit={handleSubmit(EditData.handleFormSubmit.bind(this))}>
//           <fieldset className="form-group">
//             <textarea
//               {...post}
//               rows="10"
//               className="form-control" />
//           </fieldset>
//           <button action="submit" className="btn btn-sm btn-success float-right">Update</button>
//         </form>
//       </div>
//     );
//   }
// }
//
// function mapStateToProps(state) {
//   return {
//     msgComments: state.auth.msgComments,
//     initialValues: state.auth.msgComments.data
//   };
// }
//
// export default reduxForm({
//   form: 'edit',
//   fields: ['post']
// }, mapStateToProps, actions)(EditData);
