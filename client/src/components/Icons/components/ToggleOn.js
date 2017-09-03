import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
};

class ToggleOn extends Component {
  constructor() {
    super();
  }

  render() {
    const props = this.props;
    return (
      <i {...props}
        className={cx('fa', 'fa-toggle-on', 'rms-icon__fa', props.className)}
        aria-hidden="true"
      />
    );
  }
}

ToggleOn.propTypes = propTypes;

export default ToggleOn;
