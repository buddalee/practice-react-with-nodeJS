import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    const props = this.props;
    const { auth } = props;
    switch (auth) {
      case null:
       return;
      case false:
        return <li><a href="/auth/google">Login with Google</a></li>;
      default:
        return [
          <li key="1"><Payments /></li>,
          <li key="3" style={{ margin: '0px 10px' }}>Credits: {auth.credits}</li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ];
    }
  }
  render() {
    const props = this.props;
    const { auth } = props;
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={auth ? '/surveys/' : '/'}
            className="brand-logo"
          >
            Emaily
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}
function mapstatetoprops({ auth }) {
  return { auth };
}
export default connect(mapstatetoprops)(Header);