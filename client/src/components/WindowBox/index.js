import './style.css';
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onClose: PropTypes.func,
  className: PropTypes.string,
  dialogClassName: PropTypes.string,
  contentClassName: PropTypes.string,
};

const defaultProps = {
  title: '',
  className: '',
  dialogClassName: '',
  contentClassName: '',
};

class WindowBox extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.handleWindowBoxShow('hidden');
  }

  componentDidUpdate() {
    this.handleWindowBoxShow('hidden');
  }

  componentWillUnmount() {
    this.handleWindowBoxShow('visible');
  }

  handleWindowBoxShow(param) {
    const body = document.getElementsByTagName('body')[0];
    const winBoxs = document.getElementsByClassName('windowbox');
    const winBoxsLength = winBoxs.length;

    if (winBoxsLength > 0) {
      body.style.overflow = param;
    }

    if (winBoxsLength > 1) {
      for (let idx = 0; idx < winBoxsLength; idx += 1) {
        const winBox = winBoxs[idx];
        if (idx === winBoxsLength - 1) {
          break;
        }

        winBox.style.backgroundColor = 'transparent';
      }
    } else if (winBoxsLength !== 0) {
      winBoxs[0].style.backgroundColor = 'rgba(0,0,0,.5)';
    }
  }

  renderChildren(children) {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        className: cx(child.props.className),
        onClose: this.props.onClose,
      });
    });
  }

  render() {
    const props = this.props;
    return (
      <div className={cx('windowbox', props.className)}>
        <div className={cx('windowbox__dialog', props.dialogClassName)}>
          <div className={cx('windowbox__content', props.contentClassName)}>
            {this.renderChildren(props.children)}
          </div>
        </div>
      </div>
    );
  }
}

WindowBox.propTypes = propTypes;
WindowBox.defaultProps = defaultProps;

export {
  Header,
  Body,
  Footer,
};
export default WindowBox;
