# 无限滚动组件

## 介绍

用于展示列表并加载分页数据，当列表滚动触底时，触发加载事件。

## 使用示例:

```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { InfiniteScroll } from 'rescroll';
import { css, jsx } from '@emotion/react';

let id = 0;

const style = css`
  padding: 16px;
  border-bottom: 1px solid #888;
`;

const sleep = (time) =>
  new Promise((res) => {
    setTimeout(res, time);
  });

const getMockData = async () => {
  await sleep(500);
  return [...Array(10).keys()].map(() => id++);
};

export default () => {
  const [list, setList] = useState<string[]>([]);
  const [noMore, setNoMore] = useState(false);

  const handleLoadMore = async () => {
    const data = await getMockData();
    if (id >= 40) {
      setNoMore(true);
    }
    setList([...list, ...data]);
  };

  return (
    <InfiniteScroll onLoad={handleLoadMore} noMore={noMore}>
      {list.map((item) => (
        <div key={item} css={style}>
          {item}
        </div>
      ))}
    </InfiniteScroll>
  );
};
```

<API></API>
