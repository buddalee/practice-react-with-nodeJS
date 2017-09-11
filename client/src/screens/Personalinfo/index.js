import React, { Component } from 'react';
import UploadFile from  'components/UploadFile';
import { updatePersonalAvatar } from 'actions';
import { connect } from 'react-redux';
// import postImgur from 'utils/postImgur';
import testImgur from 'utils/testImgur';


const acceptFileExtensions = ['jpg', 'jpeg', 'gif', 'png'];

class Personalinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      avatarSrc: props.avatarSrc,
    };
  }
  handleAttachmentChange(file) {
    const props = this.props;
    const {
      onBanUpload,
      updatePersonalAvatar,
      accountId,
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
    this.props.updatePersonalAvatar({ avatar: file.link, accountId });
  }
  render() {
    const { isUploading } = this.state;
    const { avatarSrc } = this.props;
    console.log('avatarSrc: ', avatarSrc);
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
function mapStateToProps(state) {
  if (state.auth) {
    return {
      avatarSrc: state.auth.avatar,
      accountId: state.auth._id,
    };
  }
}
export default connect(mapStateToProps, {
  updatePersonalAvatar,
})(Personalinfo);
