import './style.css';
import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

const propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  accept: PropTypes.string,
  maxFileSize: PropTypes.number,
};

const defaultProps = {
  accept: '',
  disabled: false,
  maxFileSize: 0, // bytes
  uploadText: '上傳附件',
  loadingIcon: (<i className="fa fa-spinner fa-pulse"></i>),
  btnText: (
    <FormattedMessage
      id="resume.UploadAttachment"
      defaultMessage="上傳附件"
    />
  ),
};

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event) {
    const {
      accept,
    } = this.props;
    const files = event.target.files;
    const acceptFileArray = accept;
    if (this.props.onChange && files.length > 0) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        const fileName = files[0].name.split('.');
        const fileType = fileName[fileName.length - 1];
        const fileInformation = {
          value: files[0] || null,
          link: e.target.result || '',
          isTypeCorrect: false,
          isSizeCorrect: false,
        };
        if (acceptFileArray.indexOf(fileType.toLowerCase()) > -1) {
          fileInformation.isTypeCorrect = true;
        }
        if (files[0].size <= this.props.maxFileSize) {
          fileInformation.isSizeCorrect = true;
        }
        return this.props.onChange(fileInformation);
      };
      fileReader.readAsDataURL(files[0]);
    }
  }
  handleClick() { // for the same file onChange not fired
    this.refs.fileUpload.value = null;
  }
  
  render() {
    const props = this.props;
    const {
      disabled,
      loadingIcon,
      btnText,
      isLoading,
    } = props;
    let content = btnText;
    if (isLoading) {
      content = loadingIcon;
    }
    return (
      <label className="fileupload">
        <button
          className="rms-btn rms-btn--default"
          disabled={disabled}
          onClick={(event) => event.preventDefault()}
        >
        {content}
        </button>
        <input
          type="file"
          disabled={disabled}
          className="fileuplload__input"
          onChange={this.handleChange}
          onClick={this.handleClick}
          ref="fileUpload"
        />
      </label>
    );
  }
}

FileUpload.propTypes = propTypes;
FileUpload.defaultProps = defaultProps;
export default FileUpload;
