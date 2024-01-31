import Http from './Http';

const HttpExcept = (message: string, status: number) => {
  throw new Http(message, status);
};

export { HttpExcept };
