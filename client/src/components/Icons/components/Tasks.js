import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
};

class Tasks extends Component {
  constructor() {
    super();
  }

  render() {
    const props = this.props;
    return (
      <i {...props}
        className={cx('fa', 'fa-tasks', 'rms-icon__fa', props.className)}
        aria-hidden="true"
      />
    );
  }
}

Tasks.propTypes = propTypes;

export default Tasks;
