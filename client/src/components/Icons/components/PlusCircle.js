import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
};

class PlusCircle extends Component {
  constructor() {
    super();
  }

  render() {
    const props = this.props;
    return (
      <i {...props}
        className={cx('fa', 'fa-plus-circle', 'rms-icon__fa', props.className)}
        aria-hidden="true"
      />
    );
  }
}

PlusCircle.propTypes = propTypes;

export default PlusCircle;
