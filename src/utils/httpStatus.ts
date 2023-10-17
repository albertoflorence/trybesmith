import { Code } from '../types/Service';

const codes: Record<Code, number> = {
  OK: 200,
  CREATED: 201,
};

export default function httpStatus(code: Code): number {
  return codes[code];
}
