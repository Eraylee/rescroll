## Foo

Demo:

```tsx
/** @jsx jsx */
import React, { useState, useEffect, useCallback } from 'react';
import { PullUpLoading } from 'rescroll';
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
    if (id >= 100) {
      setNoMore(true);
    }
    setList([...list, ...data]);
  };

  return (
    <PullUpLoading onLoad={handleLoadMore} noMore={noMore}>
      {list.map((item) => (
        <div key={item} css={style}>
          {item}
        </div>
      ))}
    </PullUpLoading>
  );
};
```

<API></API>
