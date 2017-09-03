import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './style.css';

const defaultProps = {
  isUpperMenu: false,
  isCaret: false,
  isHiddenInXS: false,
  isHiddenInSM: false,
};
class HeaderDropDown extends Component {
  constructor() {
    super();
    this.state = {
      isOpened: false,
    };
    this.handleToggleDropDown = this.handleToggleDropDown.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick() {
    const { onItemClick } = this.props;
    if (onItemClick && typeof onItemClick === 'function') {
      onItemClick();
    }
  }

  handleToggleDropDown() {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  }
  renderMenuAngle() {
    const { isUpperMenu } = this.props;
    const { isOpened } = this.state;
    if (isUpperMenu) {
      if (isOpened) return <i className="fa fa-angle-down" />;
      return <i className="fa fa-angle-up" />;
    }
    if (isOpened) return <i className="fa fa-angle-up" />;
    return <i className="fa fa-angle-down" />;
  }
  render() {
    const {
      title,
      children,
      iconClass,
      isCaret,
      userPhotoURL,
      isUpperMenu,
      isHiddenInXS,
      isHiddenInSM,
      className,
    } = this.props;
    return (
      <li className={classNames(className, { dropdown: true, open: this.state.isOpened })}
        onClick={this.handleToggleDropDown}
      >
        <a
          className="dropdown-toggle"
          data-toggle="dropdown"
        >
          {
            userPhotoURL &&
            <img
              src={userPhotoURL}
              className="img-circle"
            />
          }
          <i className={iconClass} />
          <span className="dropdown-title">
            {title}
          </span>
          { isCaret ? this.renderMenuAngle() : null}
        </a>
        <ul
          className={classNames({
            'dropdown-menu': true,
            'hidden-xs': isHiddenInXS,
            'hidden-sm': isHiddenInSM,
            'upper-menu': isUpperMenu,
          })}
          onClick={this.handleItemClick}
        >
          {children}
        </ul>
      </li>
    );
  }
}
HeaderDropDown.defaultProps = defaultProps;
HeaderDropDown.propTypes = {
  children: PropTypes.array.isRequired,
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  iconClass: PropTypes.string,
  isCaret: PropTypes.bool,
  onItemClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  userPhotoURL: PropTypes.string,
  isUpperMenu: PropTypes.bool,
  isHiddenInXS: PropTypes.bool,
  isHiddenInSM: PropTypes.bool,
  className: PropTypes.string,
};

export default HeaderDropDown;
