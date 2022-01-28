import { jsx, css } from '@emotion/react';

export const prefix = 'rescroll-pull-up-loading';

export const style = css`
  .${prefix} {
    &_load-more {
      margin: 0;
      padding: 12px 0;
      text-align: center;
      background-color: #f3f6f9;
      span {
        color: rgb(32, 38, 45);
        font-size: 12px;
      }
    }
  }
`;
