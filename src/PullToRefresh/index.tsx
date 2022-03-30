/** @jsx jsx */
import { FC, useRef, TouchEventHandler, useState } from 'react';
import clsx from 'clsx';
import { prefix, style } from './style';
import { jsx } from '@emotion/react';
import { useSpring, animated } from 'react-spring';
import { bem } from '../utils/bem';
import { useScrollTarget } from '../hooks/scroll';
import { getScrollTop } from '../utils/scroll';
const isWindow = (node: Window | HTMLElement): node is Window => node === window;

export interface PullToRefreshProps {
  /**
   * @description.zh-CN 组件额外的 className
   * @description.en-US Extra className
   * @default
   */
  className?: string;
  distance?: number;
  onRefresh?: () => Promise<void>;
}

export const PullToRefresh: FC<PullToRefreshProps> = ({
  className,
  onRefresh,
  distance,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const beginRef = useRef(0);
  // 滚动元素是否触顶
  const isReachTop = useRef(false);
  const scrollTarget = useScrollTarget(ref.current);
  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
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
    }
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    if (isReachTop.current) {
      api.start({ y: 0 });
      beginRef.current = 0;
    }
  };

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
      {/* <div className={bem(prefix, 'head')}>刷新</div> */}
      <div>{children}</div>
    </animated.div>
  );
};

PullToRefresh.defaultProps = {
  distance: 100,
};
