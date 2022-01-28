import { jsx, css } from '@emotion/react';

export const prefix = 'rescroll-infinite-scroll';

export const style = css`
  .${prefix} {
    &_load-more {
      margin: 0;
      padding: var(--infinite-scroll-load-more-bg-padding);
      text-align: center;
      background-color: var(--infinite-scroll-load-more-bg-color);
      & > span {
        color: var(--infinite-scroll-load-more-font-color);
        font-size: var(--infinite-scroll-load-more-font-size);
      }
    }
  }
`;
