/** @jsx jsx */
import { FC, useRef, TouchEventHandler, useState, useMemo } from 'react';
import clsx from 'clsx';
import { prefix, style } from './style';
import { jsx } from '@emotion/react';
import { useSpring, animated } from 'react-spring';
import { bem } from '../utils/bem';
import { useScrollTarget } from '../hooks/scroll';
import { getScrollTop } from '../utils/scroll';
const isWindow = (node: Window | HTMLElement): node is Window => node === window;

export enum RefreshStatus {
  None,
  Pulling,
  Disentangling,
  Refreshing,
}

const config = {
  [RefreshStatus.None]: '',
  [RefreshStatus.Pulling]: '继续下拉...',
  [RefreshStatus.Disentangling]: '松开以刷新...',
  [RefreshStatus.Refreshing]: '刷新中...',
};
export interface PullToRefreshProps {
  /**
   * @description.zh-CN 组件额外的 className
   * @description.en-US Extra className
   * @default
   */
  className?: string;
  distance?: number;
  onRefresh?: () => Promise<void>;
  refreshContent?: JSX.Element;
}

export const PullToRefresh: FC<PullToRefreshProps> = ({
  className,
  onRefresh,
  distance,
  children,
  refreshContent,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState(RefreshStatus.None);
  const beginRef = useRef(0);
  // 滚动元素是否触顶
  const isReachTop = useRef(false);
  const scrollTarget = useScrollTarget(ref.current);
  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    setStatus(RefreshStatus.Pulling);
    isReachTop.current = getScrollTop(scrollTarget) === 0;
    if (isReachTop.current) {
      beginRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (isReachTop.current) {
      const moveY = e.touches[0].clientY - beginRef.current;
      const offset = moveY > (distance as number) ? distance || 0 : moveY;
      api.start({ y: offset });
      if (offset === distance) {
        setStatus(RefreshStatus.Disentangling);
      }
    }
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = async (e) => {
    if (isReachTop.current) {
      setStatus(RefreshStatus.Refreshing);
      onRefresh && (await onRefresh());
      api.start({ y: 0 });
      beginRef.current = 0;
      setStatus(RefreshStatus.None);
    }
  };

  const _refreshContent = useMemo(() => {
    if (refreshContent) {
      return refreshContent;
    }
    return <span>{config[status]}</span>;
  }, [refreshContent, status]);
  return (
    <animated.div
      css={style}
      style={{ y }}
      ref={ref}
      className={clsx(prefix, className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <animated.div style={{ height: y }} className={bem(prefix, 'head')}>
        {_refreshContent}
      </animated.div>
      <div>{children}</div>
    </animated.div>
  );
};

PullToRefresh.defaultProps = {
  distance: 100,
};
