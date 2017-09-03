import React, { PropTypes, Component } from 'react';
import WindowBox, { Header, Body, Footer } from './WindowBox/';

const propTypes = {
  content: PropTypes.string,
  onClose: PropTypes.func,
};

class ArticleWin extends Component {
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
          新增文章
        </Header>
        <Body style={{ minHeight: '0' }}>
          <div style={{ marginBottom: '10px' }}>
            <input placeholder="請輸入標題"
              onChange={(e) => this.setState({ title: e.target.value })}
            />
          </div>
          <textarea
            onChange={(e) => this.setState({ content: e.target.value })}
          />
        </Body>
        <Footer align="right">
          <button
            onClick={() => this.handleAddArticle()}
          >
            送出
          </button>
          <button
            onClick={props.onClose}
          >
            取消
          </button>
        </Footer>
      </WindowBox>
    );
  }
}

ArticleWin.propTypes = propTypes;
export default ArticleWin;
