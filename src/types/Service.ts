export type Code = 'OK' | 'CREATED';
export type Result = {
  code: Code;
  data: unknown;
};

export type Return = Promise<Result>;
