import './stylesheets/bootstrap/css/bootstrap.css'
import './stylesheets/layout.css';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage, IntlProvider } from 'react-intl';
import cx from 'classnames';
import * as actions from './actions';

// To stop 
// import Header from './Header';
import Header from './components/Header/';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import ArticlesList from './components/ArticlesList';
import SurveyNew from './screens/surveys/SurveyNew';
import MessageBox from './components/MessageBox';
import LoginWin from './components/LoginWin';
import Personalinfo from './screens/Personalinfo';

// to fix
// const userDisplayName = '李冠誼';
const locales = [
  {
    code: 'zh-tw',
    name: '繁體中文'
  },
  {
    code: 'en-us',
    name: 'English'
  }
];

const locale = 'zh-tw';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isMaskDisplay: false,
      isSearhFormIn: false,
      isLoginWinShow: false,
      isCollapseIn: false,
    };
    this.handleToggleMask = this.handleToggleMask.bind(this);
    this.handleLogin = this.handleLogin.bind(this);    
    this.handleToggleCollapse = this.handleToggleCollapse.bind(this);
  }
  componentDidMount() {
    this.props.fetchUser();
  }
  handleToggleCollapse() {
    this.setState({
      isCollapseIn: !this.state.isCollapseIn,
      isSearhFormIn: false,
    });
    if (!this.state.isSearhFormIn) {
      this.handleToggleMask();
    }
  }
  handleToggleMask() {
    const { isMaskDisplay } = this.state;
    this.setState({ isMaskDisplay: !isMaskDisplay });
  }
  handleLogin() {
    const { isLoginWinShow } = this.state;
    this.setState({ isLoginWinShow: !isLoginWinShow });
  }
  render() {
    const props = this.props;
    const { message, auth } = props;
    const {
      isCollapseIn,
      isMaskDisplay,
      isLoginWinShow
    } = this.state;
    const maskClasses = cx({
      'mask': true,
      'mask--show': isMaskDisplay,
    });
    return (
      <div className="container">
        <IntlProvider locale={'en'} key={'en'} message={undefined}>
        <BrowserRouter>
          <div>
            <Header
              onLogin={this.handleLogin}
              auth={auth}
              // userName={userDisplayName}
              onToggleMask={this.handleToggleMask}
              onToggleSearch={this.handleToggleSearch}
              onToggleCollapse={this.handleToggleCollapse}
              isCollapseIn={isCollapseIn}
              // companyId={companyId}
              locale={locale}
              locales={locales}
              onSwitchLocale={this.handleSwitchLocale}            
            />
            <div className="container-fluid main">
              <div className={maskClasses} />
              { isLoginWinShow ? <LoginWin onClose={() => this.setState({ isLoginWinShow: false })}/> : null }
              <Route exact path="/" component={Landing}/>
              <Route exact path="/surveys" component={Dashboard}/>
              <Route exact path="/articles" component={ArticlesList}/>            
              <Route path="/surveys/new" component={SurveyNew}/>
              <Route path="/personalinfo" component={Personalinfo}/>              
              {
                (() => {
                  if (message.message) {
                    return (
                      <MessageBox
                        title={(
                          <FormattedMessage
                            id="msg"
                            defaultMessage="訊息"
                          />
                        )}
                        confirmText={(
                          <FormattedMessage
                            id="btn.Confirm"
                            defaultMessage="確定"
                          />
                        )}
                        cancelText={(
                          <FormattedMessage
                            id="btn.Cancel"
                            defaultMessage="取消"
                          />
                        )}
                        btnCls="rms-btn rms-btn--default"
                        {...message}
                        onConfirm={
                          () => {
                            if (message.onConfirm) {
                              message.onConfirm();
                            }
                            props.resetMessage();
                          }
                        }
                        onClose={
                          () => {
                            if (message.onClose) {
                              message.onClose();
                            }
                            props.resetMessage();
                          }
                        }
                      />
                    );
                  }
                })()
              }
            </div>
          </div>
        </BrowserRouter>
        </IntlProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    message,
    auth,
  } = state;
  return {
    message,
    auth,
  };
}
export default connect(mapStateToProps, actions)(App);
