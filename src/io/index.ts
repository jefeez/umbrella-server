/* eslint-disable @typescript-eslint/no-shadow */
import { Server, Socket } from 'socket.io';
import { v4 } from 'uuid';
import { redis } from '../services/redis';

export default async (io: Server, socket: Socket) => {
  console.log('CONNECTION ID', socket.id);

  // INSERT USERS FROM REDIS
  await redis.HSET(
    'app',
    socket.user.id,
    JSON.stringify({ avatar: socket.user.avatar, username: socket.user.username })
  );

  const onlines = await redis.HVALS('app');
  socket.emit(
    'onlines',
    onlines.map(on => JSON.parse(on))
  );
  socket.broadcast.emit(
    'onlines',
    onlines.map(on => JSON.parse(on))
  );

  socket.emit('user', socket.user);

  socket.on('set-message', body => {
    const hour = new Date();
    const payload = {
      id: v4(),
      body,
      hour: `${hour.getHours()}:${hour.getMinutes()}:${hour.getSeconds()}`,
      by: { avatar: socket.user.avatar, username: socket.user.username },
    };
    socket.emit('get-message', payload);
  });

  socket.on('disconnect', async () => {
    await redis.HDEL('app', socket.user.id);

    const onlines = await redis.HVALS('app');
    socket.emit(
      'onlines',
      onlines.map(on => JSON.parse(on))
    );
    socket.broadcast.emit(
      'onlines',
      onlines.map(on => JSON.parse(on))
    );
  });
};
