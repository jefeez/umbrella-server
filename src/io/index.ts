import { Server, Socket } from 'socket.io';

export default async (io: Server, socket: Socket) => {
  console.log('CONNECTION ID', socket.id);
  // console.log('CONNECTION USER: ', socket.user.id);

  socket.on('disconnect', async () => {
    console.log('DISCONNECTION ID', socket.id);
    // console.log('DISCONNECTION USER: ', socket.user.id);
  });
};
