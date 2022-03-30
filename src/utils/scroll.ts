// 获取滚动元素
export const getScrollTarget = (element: HTMLElement): HTMLElement | Window => {
  let node = element;

  while (node && !['HTML', 'BODY'].includes(node.tagName)) {
    const { overflowY } = window.getComputedStyle(node);
    if (['scroll', 'auto'].includes(overflowY)) {
      return node;
    }
    node = <HTMLElement>node.parentElement;
  }

  return window;
};
// 获取顶部距离
export const getScrollTop = (element: ReturnType<typeof getScrollTarget>) => {
  const top = 'scrollTop' in element ? element.scrollTop : element.pageYOffset;
  // iOS scroll bounce cause minus scrollTop
  return Math.max(top, 0);
};
