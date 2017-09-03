import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
};

class Trash extends Component {
  constructor() {
    super();
  }

  render() {
    const props = this.props;
    return (
      <i {...props}
        className={cx('fa', 'fa-trash-o', 'rms-icon__fa', props.className)}
        aria-hidden="true"
      />
    );
  }
}

Trash.propTypes = propTypes;

export default Trash;
