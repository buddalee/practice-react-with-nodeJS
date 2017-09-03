import './style.css';
import React, {
  Component,
  PropTypes,
  cloneElement,
  isValidElement,
} from 'react';
import cx from 'classnames';

const propTypes = {
  title: PropTypes.node,
  message: PropTypes.node,
  prefixCls: PropTypes.string,
  btnCls: PropTypes.string,
  confirmText: PropTypes.node,
  cancelText: PropTypes.node,
  closeIcon: PropTypes.element,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

const defaultProps = {
  prefixCls: 'rms-messagebox',
  title: '訊息',
  confirmText: '確定',
  cancelText: '取消',
};

class MessageBox extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.handleMessageBoxShow('hidden');
  }

  componentDidUpdate() {
    this.handleMessageBoxShow('hidden');
  }

  componentWillUnmount() {
    this.handleMessageBoxShow('visible');
  }

  handleMessageBoxShow(param) {
    const { prefixCls } = this.props;
    const body = document.getElementsByTagName('body')[0];
    const msgBoxs = document.getElementsByClassName(prefixCls);
    const msgBoxsLength = msgBoxs.length;

    if (msgBoxsLength > 0) {
      body.style.overflow = param;
    }

    if (msgBoxsLength > 1) {
      for (let idx = 0; idx < msgBoxsLength; idx += 1) {
        const msgBox = msgBoxs[idx];
        if (idx === msgBoxsLength - 1) {
          break;
        }

        msgBox.className = cx(msgBox.className, `${prefixCls}--single`);
      }
    } else if (msgBoxsLength !== 0) {
      msgBoxs[0].className = cx(msgBoxs[0].className, `${prefixCls}--multi`);
    }
  }

  handleConfirm(event) {
    event.preventDefault();
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  handleCancel(event) {
    event.preventDefault();
    if (this.props.onCancel) {
      this.props.onCancel();
    } else if (this.props.onClose) {
      this.props.onClose();
    }
  }

  handleClose(event) {
    event.preventDefault();
    if (this.props.onClose) {
      this.props.onClose();
    } else if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  renderCloseButton(prefixCls, closeIcon) {
    const closeBtnCls = `${prefixCls}__close`;
    if (closeIcon && isValidElement(closeIcon)) {
      return cloneElement(closeIcon, {
        className: cx(closeIcon.props.className, closeBtnCls),
      });
    }

    return (
      <button className={closeBtnCls}
        onClick={this.handleClose.bind(this)}
      >
        <span className={cx('fa-stack', 'fa-lg', `${prefixCls}__close-icon`)}>
          <i className="fa fa-circle fa-stack-1x" />
          <i className="fa fa-times fa-stack-1x" />
        </span>
      </button>
    );
  }

  render() {
    const props = this.props;
    const {
      prefixCls,
      btnCls,
      closeIcon,
      onCancel,
    } = props;
    // 詳細錯誤訊息的分隔字串
    const detailRule = /\\detail/i;

    const cancelBtn = (
      <button className={cx(`${prefixCls}__btn`, `${prefixCls}__btn--cancel`, btnCls)}
        onClick={this.handleCancel.bind(this)}
      >
        {props.cancelText}
      </button>
    );

    let message = props.message;
    let detail = null;
    if (typeof(message) === 'string' && detailRule.test(message)) {
      const splited = message.split(detailRule);
      message = splited[0];
      detail = splited[1];
    }

    return (
      <div className={cx(prefixCls, props.className)}>
        <div className={`${prefixCls}__dialog`}>
          <div className={`${prefixCls}__content`}>
            <div className={`${prefixCls}__header`}>
              {props.title}
              {this.renderCloseButton(prefixCls, closeIcon)}
            </div>
            <div className={`${prefixCls}__body`}>
              {message}
              {
                (() => {
                  if (detail) {
                    return (
                      <div className={`${prefixCls}__detail`}>
                        {detail}
                      </div>
                    );
                  }
                })()
              }
            </div>
            <div className={`${prefixCls}__footer`}>
              <button className={cx(`${prefixCls}__btn`, `${prefixCls}__btn--confirm`, btnCls)}
                onClick={this.handleConfirm.bind(this)}
              >
                {props.confirmText}
              </button>
              {
                onCancel
                && cancelBtn
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MessageBox.propTypes = propTypes;
MessageBox.defaultProps = defaultProps;

export default MessageBox;
