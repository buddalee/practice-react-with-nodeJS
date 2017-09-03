import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  align: PropTypes.string,
};

const defaultProps = {
  align: 'left',
};

class Footer extends Component {
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
    const align = props.align;
    const classes = {
      'windowbox__footer--left': align === 'left',
      'windowbox__footer--center': align === 'center',
      'windowbox__footer--right': align === 'right',
    };

    return (
      <div className={cx('windowbox__footer', props.className, classes)} style={props.style}>
        {props.children}
      </div>
    );
  }
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
