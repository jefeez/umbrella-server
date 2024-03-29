import { Handshake } from 'socket.io/dist/socket';

declare module 'socket.io' {
  interface Socket {
    handshake: Handshake;
    user: {
      id: string;
      avatar: string;
      username: string;
      email: string;
    };
  }
}
