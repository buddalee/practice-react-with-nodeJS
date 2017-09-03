import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleWin from './ArticleWin';
import { addArticles, fetchArticles } from '../actions';
import Loading from './Loading';
import io from 'socket.io-client'

class ArticlesList extends Component {
  constructor() {
    super();
    this.state = {
      isArticleWinShow: false,
      messages: [],
      ddd: '',
    }
  }
  componentWillMount() {
    this.props.fetchArticles();
  }
  componentDidMount () {
    this.socket = io('/');
    this.socket.on('message', message => {
      this.setState({ messages: [message, ...this.state.messages] })
    });
    this.socket.on('updateArticle', datas => {
      this.props.fetchArticles();
      // const payload = datas[datas.length-1];
      // this.props.addArticles({
      //   title: payload.title,
      //   content: payload.content
      // });
      this.setState({ ddd: datas });
    });
  }
  renderArticleWin() {
    return (
      <ArticleWin
        onClose={() => this.setState({ isArticleWinShow: false })}
        onAddArticles={this.handleAddArticle.bind(this)}
      />
    );
  }
  postArticle() {
    this.setState({ isArticleWinShow: true });
  }
  handleAddArticle(data) {
    this.props.addArticles(data).then((res) => {
      this.setState({ isArticleWinShow: false });
      this.socket.emit('postArticle', { data: res.value.data });
    });
  }

  handleSubmit = event => {
    const body = event.target.value
    if (event.keyCode === 13 && body) {
      const message = {
        body,
        from: 'Me'
      }
      this.setState({ messages: [message, ...this.state.messages] })
      this.socket.emit('message', body);
      event.target.value = ''
    }
  }
  renderArticles(datas) {
    return datas.map((_data, index) => {
      const { title, content } = _data;
      return (
        <div style={{ border: '1px solid #ccc' }} key={index}>
          <div>
          <h5>{title}</h5>
          </div>
          <div>
            {content}
          </div>
        </div>
      );
    })
  }
  render() {
    console.log('ddd: ', this.state.ddd);
    const props = this.props;
    const { articles, isLoading } = props;
    const messages = this.state.messages.map((message, index) => {
      return <li key={index}><b>{message.from}:</b>{message.body}</li>
    })
    return (
      <div>
        {this.state.isArticleWinShow ? this.renderArticleWin() : null}
        <button
          onClick={() => this.postArticle()}
        >
        Add New Article
        </button>
        <div style={{ border: '1px solid #ccc', minHeight: '480px', padding: '15px 5px'}}>
          { isLoading ? <Loading /> : this.renderArticles(articles)}
        </div>
        <input type='text' placeholder='Enter a message...' onKeyUp={this.handleSubmit} />
        {messages}
      </div>
    );
  }
}
function mapstatetoprops(state) {
  const { articles: { articles, isLoading } } = state;
  return {
    articles,
    isLoading,
  };
}
export default connect(mapstatetoprops, {
  addArticles,
  fetchArticles,
})(ArticlesList);
