export declare type ChangeEvent<T = string> = Event & {
  target: {
    value?: T | undefined
  }
};
