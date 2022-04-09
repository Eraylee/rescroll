import { css } from '@emotion/react';

export const prefix = 'rescroll-pull-to-refresh';

export const style = css`
  .${prefix} {
    position: relative;
    &_head {
      position: absolute;
      top: 0;
      width: 100%;
      overflow: hidden;
      background-color: var(--pull-to-refresh-head-bg-color);
      &_info {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        box-sizing: border-box;
        height: 100%;
        padding: var(--pull-to-refresh-head-info-padding);
        color: var(--pull-to-refresh-head-info-font-color);
        font-size: var(--pull-to-refresh-head-info-font-size);
      }
    }
    &_wrapper {
    }
  }
`;
