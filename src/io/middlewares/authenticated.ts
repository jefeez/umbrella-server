/* eslint-disable no-param-reassign */
import { Socket } from 'socket.io';
import { jwt } from '../../utils/helper';
import userRepository from '../../api/repositories/user.repository';

export default async (socket: Socket, next: any) => {
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
        const user = await userRepository.findOne({ id: decode.sub as string });
        if (!user) {
          next({ message: 'user not found', status: 404 });
        } else {
          socket.user = {
            id: decode.sub as string,
            avatar: user.avatar,
            username: user.username,
            email: user.email,
          };
          next();
        }
      }
    }
  } catch (error) {
    next(error);
  }
};
