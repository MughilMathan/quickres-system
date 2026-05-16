import { io } from 'socket.io-client';
import { SOCKET_URL } from '../constants';

const socket = io(SOCKET_URL);

socket.on('connect', () => {
  console.log('Connected to socket server');
  const tid = localStorage.getItem('table_id');
  if (tid) {
    socket.emit('join_table', tid);
  }
});

export default socket;
