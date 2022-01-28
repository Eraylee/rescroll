/**
 * 创建 bem className
 * @param args
 * @returns
 */
export const bem = (...args: string[]) => {
  if (Array.isArray(args)) {
    return args.reduce((pre, current) => (pre ? `${pre}_${current}` : current), '');
  }
  return '';
};
