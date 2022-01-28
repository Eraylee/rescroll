import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { PullUpLoading } from './index';

describe('<PullUpLoading />', () => {
  it('render Foo with dumi', () => {
    const msg = 'dumi';

    render(<PullUpLoading />);
    expect(screen.queryByText(msg)).toBeInTheDocument();
  });
});
