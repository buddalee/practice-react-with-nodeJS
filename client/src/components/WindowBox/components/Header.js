import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import IconButton from '../../Icons/components/IconButton';
import Close from '../../Icons/components/Close';

const propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  closeButton: PropTypes.object,
  align: PropTypes.string,
  onClose: PropTypes.func,
};

const defaultProps = {
  align: 'left',
};

class Header extends Component {
  constructor() {
    super();
  }

  render() {
    const props = this.props;
    const classes = {
      'windowbox__header--left': props.align === 'left',
      'windowbox__header--center': props.align === 'center',
    };

    return (
      <div className={cx('windowbox__header', props.className, classes)} style={props.style}>
        {props.children}
        <IconButton className="windowbox__close" onClick={this.props.onClose}>
          <Close />
        </IconButton>
      </div>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
