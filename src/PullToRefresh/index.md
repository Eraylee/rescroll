# 下拉刷新组件

## 介绍

用于展示列表并刷新列表数据，当列表处于顶点，拉动列表并释放触发刷新事件。

## 使用示例:

```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { PullToRefresh } from 'rescroll';
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

export default () => {
  const [list, setList] = useState<string[]>([]);
  const [noMore, setNoMore] = useState(false);

  const getMockData = async () => {
    await sleep(500);
    setList([...Array(100).keys()].map(() => id++));
  };

  useEffect(() => {
    getMockData();
  }, []);

  return (
    <PullToRefresh onRefresh={getMockData}>
      {list.map((item) => (
        <div key={item} css={style}>
          {item}
        </div>
      ))}
    </PullToRefresh>
  );
};
```

<API></API>
