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
      into: false,
      exit: false,
      hour: `${hour.getHours()}:${hour.getMinutes()}:${hour.getSeconds()}`,
      by: { avatar: socket.user.avatar, username: socket.user.username },
    };
    socket.emit('get-message', payload);
    socket.broadcast.emit('get-message', payload);
  });

  socket.broadcast.emit('get-message', {
    id: v4(),
    into: true,
    exit: false,
    by: { avatar: socket.user.avatar, username: socket.user.username },
  });

  socket.on('disconnect', async () => {
    socket.broadcast.emit('get-message', {
      id: v4(),
      into: false,
      exit: true,
      by: { avatar: socket.user.avatar, username: socket.user.username },
    });

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
