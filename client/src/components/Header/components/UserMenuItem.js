import React, { Component, PropTypes } from 'react';
import HeaderDropDown from '../../HeaderDropDown/';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import userPhotoURL from './../fakeUserPhoto.png';

export default class UserMenuItem extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { onLogout } = this.props;
    if (onLogout && typeof onLogout === 'function') {
      onLogout();
    }
  }
  render() {
    const { userName, companyId, auth } = this.props;
    return (
      <HeaderDropDown
        title={
          <FormattedMessage
            id="SH_Welcome"
            defaultMessage="歡迎, {userName}"
            values={{
              userName,
            }}
          />
        }
        userPhotoURL={userPhotoURL}
        {...this.props}
        isHiddenInXS
        isHiddenInSM
      >
        <li>
          <Link to={ `${companyId}/user/tracking` } id="languageSetting" className=" ta__confirmation" onClick={() => Location.reload()}>
            <FormattedMessage
              id="rmsportal.JobApplyingRecords"
              defaultMessage="Add Credits"
            />
          </Link>
        </li>
        <li>
          <Link to={ `${companyId}/user/resume` } id="languageSetting" className=" ta__confirmation" onClick={() => Location.reload()}>
            Credits: {auth.credits}
          </Link>
        </li>
        <li className="divider"></li>
        <li>
          <a className="ta__confirmation" href="#" onClick={this.handleLogout} id="languageLogout">
            <FormattedMessage
              id="SH_Logout"
              defaultMessage="登出"
            />
          </a>
        </li>
      </HeaderDropDown>
    );
  }
}

UserMenuItem.propTypes = {
  userName: PropTypes.string,
  onLogout: PropTypes.func,
  companyId: PropTypes.string,
};
