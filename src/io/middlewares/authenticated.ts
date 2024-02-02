/* eslint-disable no-param-reassign */
import { Socket } from 'socket.io';
import { jwt } from '../../utils/helper';

export default (socket: Socket, next: any) => {
  try {
    const { token } = socket.handshake.auth;
    if (!token) {
      next({ message: 'no token provided', status: 401 });
    } else {
      const verify = jwt.verify(token);
      if (!verify) {
        next({ message: 'invalid token', status: 401 });
      } else {
        const decode = jwt.decode(token)!;
        socket.user = {
          id: decode.sub as string,
        };
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};
