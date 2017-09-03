import React, { Component } from 'react';
import UploadFile from  'src/components/UploadFile';
import { updatePersonalAvatar } from '../../actions';
import { connect } from 'react-redux';
// import postImgur from '../../../utils/postImgur';

const acceptFileExtensions = ['jpg', 'jpeg', 'gif', 'png'];

class Personalinfo extends Component {
  constructor() {
    super();
    this.state = {
      isUploading: false,
      avatarSrc: '',
    };
    this.onPersonalImageUpload = this.onPersonalImageUpload.bind(this);
  }
  onPersonalImageUpload(link) {
    let base64 = link.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST','https://api.imgur.com/3/image',true)
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", `Client-ID 3d4890153c2eea4`);
    xhttp.send(JSON.stringify({'image': base64}));
    xhttp.onreadystatechange = function(x) {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        const avatarSrc = JSON.parse(xhttp.responseText).data.link;
        return avatarSrc;
      }
      return null;
    }
  }
  handleAttachmentChange(file) {
    const props = this.props;
    const {
      onBanUpload,
      // onPersonalImageUpload,
    } = props;
    this.setState({ isUploading: true });
    if (!file.isSizeCorrect && !file.isTypeCorrect) {
      this.setState({ isUploading: false });
      return onBanUpload('uploadPersonalPictureFilesByBoth');
    } else if (!file.isSizeCorrect) {
      this.setState({ isUploading: false });
      return onBanUpload('uploadBySize', '300KB');
    } else if (!file.isTypeCorrect) {
      this.setState({ isUploading: false });
      return onBanUpload('uploadPersonalPictureFilesByFormat');
    }
    this.setState({ isUploading: false });
    console.log('file: ', file);
    // return onPersonalImageUpload(file);
    // postImgur(file.link);
    // return this.onPersonalImageUpload(file.link);    
  }
  render() {
    const { isUploading, avatarSrc } = this.state;
    return (
      <div>
        <img
          src={avatarSrc}
        />
        <UploadFile
          maxFileSize={3072000}
          // maxFileSize={307200}          
          onChange={this.handleAttachmentChange.bind(this)}
          disabled={isUploading}
          // btnText={logoFileLink ? reloadFileText : chooseFileText}
          isLoading={isUploading}
          accept={acceptFileExtensions.join()}
        />
      </div>
    );
  }
}

export default connect(null, {
  updatePersonalAvatar,
})(Personalinfo);
