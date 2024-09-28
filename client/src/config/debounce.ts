export const debounce = (func: () => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
};
