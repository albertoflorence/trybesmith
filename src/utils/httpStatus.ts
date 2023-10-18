import { Code } from '../types/Service';

const codes: Record<Code, number> = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

export default function httpStatus(code: Code): number {
  return codes[code];
}
