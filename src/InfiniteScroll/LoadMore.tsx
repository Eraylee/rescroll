import React, { FC } from 'react';

export interface LoadMoreProps {
  noMore?: boolean;
}

export const LoadMore: FC<LoadMoreProps> = ({ noMore }) => {
  return noMore ? (
    <>
      <span>没有更多</span>
    </>
  ) : (
    <>
      <span>正在加载...</span>
    </>
  );
};
