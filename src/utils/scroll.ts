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
