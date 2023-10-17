export type Code = 'OK' | 'CREATED' | 'UNAUTHORIZED' | 'BAD_REQUEST';
export type Result = {
  code: Code;
  data?: unknown;
};

export type Return = Promise<Result>;
