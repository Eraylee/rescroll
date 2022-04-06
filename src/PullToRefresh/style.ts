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
      background-color: whitesmoke;

      /* background-color: red; */
      &_info {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        box-sizing: border-box;
        height: 100%;
        padding-bottom: 8px;
        font-size: 12px;
      }
    }
    &_wrapper {
    }
  }
`;
