import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

class Body extends Component {
  constructor() {
    super();
  }

  renderChildren(children) {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        className: cx(child.props.className),
      });
    });
  }

  render() {
    const props = this.props;
    return (
      <div className={cx('windowbox__body', props.className)} style={props.style}>
        {props.children}
      </div>
    );
  }
}

Body.propTypes = propTypes;

export default Body;
