Demo:

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
