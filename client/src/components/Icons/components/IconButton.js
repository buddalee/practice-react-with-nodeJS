import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isHidden: PropTypes.bool,
};

const defaultProps = {
  disabled: false,
  isHidden: false,
};

class IconButton extends Component {
  constructor() {
    super();
  }

  render() {
    const props = this.props;
    const {
      children,
      className,
      disabled,
      isHidden,
    } = props;

    const iconBtnCls = cx({
      'rms-icon-button': true,
      'rms-icon-button--is-disabled': disabled,
      'rms-icon-button--is-hidden': isHidden,
    }, className);
    return (
      <button {...props} className={iconBtnCls}
        disabled={isHidden || disabled}
      >
        {children}
      </button>
    );
  }
}

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export default IconButton;
