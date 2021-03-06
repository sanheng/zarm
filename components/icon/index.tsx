import React, { PureComponent, HTMLAttributes } from 'react';
import classnames from 'classnames/dedupe';
import PropTypes from 'prop-types';
import BasePropsType from './PropsType';
import createFromIconfont from './IconFont';

const INNER_SVG_PROPS = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  viewBox: '0 0 32 32',
};

export type IconPropsType = {
  prefixCls?: string;
} & BasePropsType & HTMLAttributes<HTMLElement>;


class Icon extends PureComponent<IconPropsType, {}> {
  static displayName = 'Icon';

  static defaultProps = {
    prefixCls: 'za-icon',
    theme: 'default',
    size: 'md',
    children: undefined,
    viewBox: INNER_SVG_PROPS.viewBox,
    onClick: undefined,
  };

  static propTypes = {
    /** 类名前缀 */
    prefixCls: PropTypes.string,

    /** 设置主题 */
    theme: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger']),

    /** 设置大小 */
    size: PropTypes.oneOf(['lg', 'md', 'sm']),

    /** SVG 内容 */
    children: PropTypes.node,

    /** viewBox */
    viewBox: PropTypes.string,

    /** 点击事件 */
    onClick: PropTypes.func,
  };

  static createFromIconfont = createFromIconfont;

  render() {
    const { className, type, style, prefixCls, theme, size, children, component: SvgComponent, viewBox, ...rest } = this.props;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${type}`]: !!type,
      [`${prefixCls}--${theme}`]: !!theme,
      [`${prefixCls}--${size}`]: !!size,
    });

    const newProps = {
      className: cls,
      style,
      type,
      theme,
      size,
      ...rest,
    };

    let iconNode: React.ReactNode;
    // svg component > children by iconfont > type
    if (SvgComponent) {
      delete INNER_SVG_PROPS.viewBox;
      iconNode = (
        <i {...newProps}>
          <SvgComponent {...INNER_SVG_PROPS} viewBox={viewBox}>{children}</SvgComponent>
        </i>
      );
    } else if (children) {
      iconNode = (
        <i {...newProps}>
          <svg {...INNER_SVG_PROPS}>
            {children}
          </svg>
        </i>
      );
    } else if (type) {
      const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_1285036_9ze0vm44z57.js');// generated by iconfont.cn
      iconNode = (
        <MyIcon {...newProps} />
      );
    }
    return iconNode;
  }
}

export default Icon;
