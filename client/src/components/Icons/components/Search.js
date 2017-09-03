import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
};

class Spinner extends Component {
  constructor() {
    super();
  }

  render() {
    const props = this.props;
    return (
      <i {...props}
        className={cx('fa', 'fa-search', 'rms-icon__fa', props.className)}
        aria-hidden="true"
      />
    );
  }
}

Spinner.propTypes = propTypes;

export default Spinner;
