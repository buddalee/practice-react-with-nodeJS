import './style.css';
import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import UserMenuItem from './components/UserMenuItem';
import classNames from 'classnames';
import Payments from '../Payments';

// to fix
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

const defaultLogoUrl = 'http://fakeimg.pl/150x50';
class Header extends Component {
  constructor() {
    super();
  }
  handleClick(locale, event) {
    event.preventDefault();
    if (this.props.onSwitchLocale) {
      this.props.onSwitchLocale(locale);
    }
  }
  renderContent() {
    const props = this.props;
    const { auth } = props;
    switch (auth) {
      case null:
       return;
      case false:
        return (
          <li onClick={this.props.onLogin}>
            <Link to="">
              <FormattedMessage
                id="rmsportal.Register"
                defaultMessage="登入"
              />
            </Link>
          </li>
        );
      default:
        return [
          <UserMenuItem key="4" auth={auth} />,
          <li key="1" className="visible-sm-block visible-xs-block"><a><Payments /></a></li>,
          <li key="3" className="visible-sm-block visible-xs-block"><a>Credits: {auth.credits}</a></li>,
          <li key="2" className="visible-sm-block visible-xs-block"><a href="/api/logout">Logout</a></li>
        ];
    }
  }
  render() {
    const {
      // userName,
      onLogout,
      logoUrl,
      isCollapseIn,
      companyId,
      locale,
      // locales,
      auth,
    } = this.props;
    console.log('auth: ', auth);
    let localeText = locales[0].name;
    locales.forEach((localeObj) => {
      if (localeObj.code === locale) {
        localeText = localeObj.name;
      }
    });
    const collapseClasses = classNames({
      'navbar-collapse': true,
      'collapse': true,
      'navigation': true,
      'in': isCollapseIn,
    });
    return (
      <div id="navbar"
        className="navbar navbar-default navbar-fixed-top"
        role="navigation"
      >
        <div className="container-fluid">
          <div className="navbar-header">
            <a
              className="company-logo"
              href={`/`}
            >
              <img src={ logoUrl ? logoUrl : defaultLogoUrl } />
            </a>
            <button type="button" className="navbar-toggle collaped navbar__navigation-button"
              onClick={this.props.onToggleCollapse}
            >
              <span><i className="fa fa-bars" /></span>
            </button>
            <button type="button" className="navbar-toggle collaped navbar__navigation-button"
              onClick={this.props.onToggleSearch}
            >
              <span><i className="fa fa-search"/></span>
            </button>
          </div>
          <div className={collapseClasses}>
            <ul className="nav navbar-nav navbar-right">
              {this.renderContent()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  history: PropTypes.object,
  userName: PropTypes.string,
  onLogout: PropTypes.func,
  isAdmin: PropTypes.bool,
  logoUrl: PropTypes.string,
  onToggleMask: PropTypes.func,
  onToggleSearch: PropTypes.func,
  isCollapseIn: PropTypes.bool,
  onToggleCollapse: PropTypes.func,
  companyId: PropTypes.string,
  locales: PropTypes.array,
  onSwitchLocale: PropTypes.func,
  locale: PropTypes.string,
};

export default Header;
