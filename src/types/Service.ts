export type Code = 'OK' | 'CREATED' | 'UNAUTHORIZED' | 'BAD_REQUEST' | 'NOT_FOUND';
export type Result = {
  code: Code;
  data?: unknown;
};

export type Return = Promise<Result>;
