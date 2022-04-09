import { FC, useRef, TouchEventHandler, useState, useMemo } from 'react';
import clsx from 'clsx';
import { prefix, style } from './style';
import { useSpring, animated } from 'react-spring';
import { bem } from '../utils/bem';
import { useScrollTarget } from '../hooks/scroll';
import { getScrollTop } from '../utils/scroll';
import './var.css';

export enum RefreshStatus {
  None,
  Pulling,
  release,
  Refreshing,
}

export interface PullToRefreshProps {
  /**
   * @description.zh-CN 组件额外的 className
   * @description.en-US Extra className
   */
  className?: string;
  /**
   * @description.zh-CN 拖动触发更新距离
   * @description.en-US Pull to trigger update distance
   */
  distance?: number;
  /**
   * @description.zh-CN  是否禁用拖动功能
   * @description.en-US Whether to disable the drag function
   */
  disabled?: boolean;
  /**
   * @description.zh-CN  下拉状态提示文本
   * @description.en-US Pulling status prompt text
   */
  pullingText?: string | JSX.Element;
  /**
   * @description.zh-CN  释放状态提示文本
   * @description.en-US Release status prompt text
   */
  releaseText?: string | JSX.Element;
  /**
   * @description.zh-CN  刷新状态提示文本
   * @description.en-US Refreshing status prompt text
   */
  refreshingText?: string | JSX.Element;
  /**
   * @description.zh-CN  刷新事件
   * @description.en-US Refresh event
   */
  onRefresh?: () => Promise<void>;
}

export const PullToRefresh: FC<PullToRefreshProps> = ({
  className,
  disabled,
  onRefresh,
  distance,
  children,
  pullingText,
  releaseText,
  refreshingText,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState(RefreshStatus.None);
  const beginRef = useRef(0);
  // 滚动元素是否触顶
  const isReachTop = useRef(false);
  const scrollTarget = useScrollTarget(ref.current);
  const [{ y }, api] = useSpring(() => ({ y: 0 }));
  const pullable = useMemo(
    () => !disabled && status !== RefreshStatus.Refreshing,
    [status, disabled],
  );
  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    if (pullable) {
      setStatus(RefreshStatus.Pulling);
      isReachTop.current = getScrollTop(scrollTarget) === 0;
      if (isReachTop.current) {
        beginRef.current = e.touches[0].clientY;
      }
    }
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (pullable && isReachTop.current) {
      const moveY = e.touches[0].clientY - beginRef.current;
      const offset = moveY > (distance as number) ? distance || 0 : moveY;
      api.start({ y: offset });
      if (offset === distance) {
        setStatus(RefreshStatus.release);
      }
    }
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = async (e) => {
    if (pullable && isReachTop.current) {
      if (status === RefreshStatus.release) {
        setStatus(RefreshStatus.Refreshing);
        onRefresh && (await onRefresh());
      }
      api.start({ y: 0 });
      beginRef.current = 0;
      setStatus(RefreshStatus.None);
    }
  };
  // 提示内容
  const refreshHeaderInfo = useMemo(() => {
    const map = {
      [RefreshStatus.None]: '',
      [RefreshStatus.Pulling]: pullingText,
      [RefreshStatus.release]: releaseText,
      [RefreshStatus.Refreshing]: refreshingText,
    };
    return <div className={clsx(bem(prefix, 'head', 'info'))}>{map[status]}</div>;
  }, [status]);

  return (
    <div css={style} className={clsx(prefix, className)}>
      <animated.div style={{ height: y }} className={bem(prefix, 'head')}>
        {refreshHeaderInfo}
      </animated.div>
      <animated.div
        style={{ y }}
        ref={ref}
        className={clsx(bem(prefix, 'wrapper'))}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </animated.div>
    </div>
  );
};

PullToRefresh.defaultProps = {
  distance: 60,
  disabled: false,
  pullingText: '拉动以刷新...',
  releaseText: '松开以刷新...',
  refreshingText: '刷新中...',
};
