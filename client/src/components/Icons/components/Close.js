import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
};

class Close extends Component {
  constructor() {
    super();
  }

  render() {
    const props = this.props;
    return (
      <span {...props} className={cx('fa-stack', 'fa-lg', props.className)}>
        <i className="fa fa-circle fa-stack-1x" style={{ color: '#8ABFE5' }} />
        <i className="fa fa-times fa-stack-1x" style={{ color: '#157FCC', fontSize: '0.59em' }} />
      </span>
    );
  }
}

Close.propTypes = propTypes;

export default Close;
