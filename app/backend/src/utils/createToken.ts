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

const verifyToken = (token: string): TokenPayload => {
  const data = jwt.verify(token, secret) as TokenPayload;
  return data;
};

export default {
  sign,
  verifyToken,
};
