import Taro, { useEffect, useRef, useCallback } from '@tarojs/taro';

/**
 * @desc 防抖
 * @param { function } func 回调函数
 * @param { number } delay 延迟时间(毫秒)
 * @param { any[] } deps 依赖项数组
 * @return { function }
 */
const useDebounce = (func, delay = 1000, deps = []) => {
  const { current } = useRef({ func, timer: null });

  useEffect(() => {
    current.func = func;
  }, [func]);

  return useCallback((...rest) => {
    if (current.timer) {
      clearTimeout(current.timer);
    }

    current.timer = setTimeout(() => {
      current.func.call(this, rest);
    }, delay);
  }, deps);
};

export default useDebounce;
