export type Config = {
  lazyload?: LazyLoadConfig;
  throttle?: ThrottleConfig; // not added
  debounce?: DebounceConfig; // not added
  test?: boolean; // tentative and not added
};

export type LazyLoadConfig = {
  threshold?: number;
  once?: boolean;
  offset?: string;
};

export type ThrottleConfig = {
  delay: number;
  target?: string[];
};

export type DebounceConfig = {
  delay: number;
  target?: string[];
};