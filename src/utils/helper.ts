import jsonwebtoken from 'jsonwebtoken';
import Http from './Http';

const HttpExcept = (message: string, status: number) => {
  throw new Http(message, status);
};

const jwt = {
  sign: (sub: string) => {
    const { SECRET_JWT } = process.env;
    const { JWT_EXPIRE_IN } = process.env;
    const token = jsonwebtoken.sign({ sub }, SECRET_JWT!, { expiresIn: JWT_EXPIRE_IN });
    return token;
  },
  verify: (token: string) => {
    const { SECRET_JWT } = process.env;
    const payload = jsonwebtoken.verify(token, SECRET_JWT!);
    return payload;
  },
  decode: (token: string) => {
    const payload = jsonwebtoken.decode(token);
    return payload;
  },
};

export { HttpExcept, jwt };
