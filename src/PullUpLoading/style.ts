import { jsx, css } from '@emotion/react';

export const prefix = 'rescroll-pull-up-loading';

export const style = css`
  .${prefix} {
    &_load-more {
      margin: 0;
      padding: var(--pull-up-loading-load-more-bg-padding);
      text-align: center;
      background-color: var(--pull-up-loading-load-more-bg-color);
      & > span {
        color: var(--pull-up-loading-load-more-font-color);
        font-size: var(--pull-up-loading-load-more-font-size);
      }
    }
  }
`;
