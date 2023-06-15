import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'senhasupersecretamesmo';

export type TokenPayload = {
  id: number,
  email: string,
};

export type Token = {
  token: string
};

const sign = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

export default {
  sign,
};
