import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { InfiniteScroll } from './index';

describe('<InfiniteScroll />', () => {
  it('render Foo with dumi', () => {
    const msg = 'dumi';

    render(<InfiniteScroll />);
    expect(screen.queryByText(msg)).toBeInTheDocument();
  });
});
