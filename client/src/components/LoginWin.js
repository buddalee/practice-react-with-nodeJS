import React, { PropTypes, Component } from 'react';
import WindowBox, { Header, Body } from './WindowBox/';
import { FBbtn, Googlebtn } from './Loginbtns';

const propTypes = {
  content: PropTypes.string,
  onClose: PropTypes.func,
};

class LoginWin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      title: '',
    };
  }
  handleAddArticle() {
    const props = this.props;
    const { content, title } = this.state;
    const { onAddArticles } = props; 
    onAddArticles({ content, title });   
  }
  render() {
    const props = this.props;
    return (
      <WindowBox onClose={props.onClose} className="rmsPortal-modal">
        <Header>
          請選擇以下的驗證登入方式
        </Header>
        <Body style={{ minHeight: '0' }}>
          <FBbtn />
          <Googlebtn />
        </Body>
      </WindowBox>
    );
  }
}

LoginWin.propTypes = propTypes;
export default LoginWin;
