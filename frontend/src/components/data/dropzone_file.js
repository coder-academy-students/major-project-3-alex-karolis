import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import toastr from 'toastr';

class DropZoneFile extends Component {

  onDrop (files) {
    this.props.setImage(files);
    toastr.info('Picture saving...')
  }

  showImage() {
    if (this.props.imageSubmission) {
      return <img src={this.props.imageSubmission} height={196} width={196} />;
    }
  }

  render () {
    return (
      <div>
        <Dropzone onDrop={this.onDrop.bind(this)}>
          <div>{this.showImage() || "Drop file or click"}</div>
        </Dropzone>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { imageSubmission: state.auth.imageSubmission }
}

export default connect(mapStateToProps, actions)(DropZoneFile)