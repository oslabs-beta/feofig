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
  delay?: number;
  target?: string[];
  minLength?: number;
};

export type DebounceConfig = {
  delay?: number;
  target?: string[];
  minLength?: number;
};

export type FigProps = {
  children: React.ReactElement;
  config: Config;
  placeholder?: React.ReactElement;
};

export type LazyLoadProps = {
  key: string;
  children: React.ReactElement;
  threshold?: number;
  placeholder?: React.ReactElement | null;
  once?: boolean;
  offset?: string;
};

export type DebounceProps = {
  onChange: (...args: any[]) => void;
  value?: string | null;
  minLength?: number;
  debounceTimeout?: number;
  children: React.ReactNode;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export type ThrottleProps = {
  onChange: (...args: any[]) => void;
  value?: string;
  minLength: number;
  throttleTimeout: number;
  children: React.ReactNode;
  inputRef?: React.RefObject<HTMLInputElement>;
}