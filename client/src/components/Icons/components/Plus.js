import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
};

class Plus extends Component {
  constructor() {
    super();
  }

  render() {
    const props = this.props;
    return (
      <i {...props}
        className={cx('fa', 'fa-plus', 'rms-icon__fa', props.className)}
        aria-hidden="true"
      />
    );
  }
}

Plus.propTypes = propTypes;

export default Plus;
