import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
};

class Edit extends Component {
  constructor() {
    super();
  }

  render() {
    const props = this.props;
    return (
      <i {...props}
        className={cx('fa', 'fa-pencil-square-o', 'rms-icon__fa', props.className)}
        aria-hidden="true"
      />
    );
  }
}

Edit.propTypes = propTypes;

export default Edit;
