/** @jsx jsx */
import React, { FC, useRef, useEffect, useCallback, useState } from 'react';
import clsx from 'clsx';
import { prefix, style } from './style';
import { jsx } from '@emotion/react';
import { useScrollTarget } from '../hooks/scroll';
import { LoadMore } from './LoadMore';
import { bem } from '../utils/bem';
import './var.css';

const isWindow = (node: Window | HTMLElement): node is Window => node === window;

export interface InfiniteScrollProps {
  /**
   * @description.zh-CN 组件额外的 className
   * @description.en-US Extra className
   * @default
   */
  className?: string;
  /**
   * @description.zh-CN 是否有更多数据
   * @description.en-US Is there no more data
   * @default           false
   */
  noMore?: boolean;
  /**
   * @description.zh-CN 加载事件
   * @description.en-US Load event
   * @default
   */
  onLoad?: () => Promise<void>;
  /**
   * @description.zh-CN 偏移量
   * @description.en-US Load event
   * @default           0
   */
  offset?: number;

  loadMoreContent?: JSX.Element;
}

export const InfiniteScroll: FC<InfiniteScrollProps> = ({
  noMore,
  className,
  onLoad,
  offset,
  children,
  loadMoreContent,
}) => {
  const loadMorerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const scrollTarget = useScrollTarget(loadMorerRef.current);

  // 如果列表没有平铺完整个滚动视口
  // 需要自动加载
  useEffect(() => {
    load();
  });

  const load = useCallback(async () => {
    if (loading || noMore) return;
    // loadMore 元素高度
    const loadMoreHeight = loadMorerRef.current?.clientHeight ?? 0;
    // loadMore 元素距离可视窗口顶部的距离
    const loadMoreRectTop = loadMorerRef.current?.getBoundingClientRect?.()?.top ?? 0;
    // 滚动元素容器底部位置
    const scrollTargetBottom = isWindow(scrollTarget)
      ? scrollTarget.innerHeight
      : scrollTarget.getBoundingClientRect().bottom;
    const shouldLoad = scrollTargetBottom >= loadMoreRectTop + loadMoreHeight + (offset as number);

    if (shouldLoad && onLoad) {
      setLoading(true);
      await onLoad();
      setLoading(false);
    }
  }, [offset, noMore, scrollTarget, loading]);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(load);
    };
    scrollTarget.addEventListener('scroll', handleScroll);
    return () => scrollTarget.removeEventListener('scroll', handleScroll);
  }, [load, scrollTarget]);

  return (
    <div css={style} className={clsx(prefix, className)}>
      {children}

      <div className={clsx(bem(prefix, 'load-more'))} ref={loadMorerRef}>
        {loadMoreContent ? loadMoreContent : <LoadMore noMore={noMore} />}
      </div>
    </div>
  );
};

InfiniteScroll.defaultProps = {
  noMore: false,
  offset: 0,
};
