import jwt from 'jsonwebtoken';

type Payload = {
  id: number;
  username: string;
};

const SECRET = process.env.JWT_SECRET || 'secret';

function generate(payload: Payload): string {
  const token = jwt.sign(payload, SECRET);
  return token;
}

function verify(token: string): Payload {
  const payload = jwt.verify(token, SECRET) as Payload;
  return payload;
}

export default { generate, verify };
