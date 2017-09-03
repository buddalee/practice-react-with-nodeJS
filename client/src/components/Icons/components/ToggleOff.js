import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
};

class ToggleOff extends Component {
  constructor() {
    super();
  }

  render() {
    const props = this.props;
    return (
      <i {...props}
        className={cx('fa', 'fa-toggle-off', 'rms-icon__fa', props.className)}
        aria-hidden="true"
      />
    );
  }
}

ToggleOff.propTypes = propTypes;

export default ToggleOff;
