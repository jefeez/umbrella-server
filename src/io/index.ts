import { Socket } from 'socket.io';

export default (socket: Socket) => {
  console.log('SOCKET: ', socket.id);
  console.log('USER: ', socket.user.id);
};
