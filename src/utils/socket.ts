import { io } from 'socket.io-client';
const host = process.env.REACT_APP_BE_HOST;
const socket = io(host);
socket.connect();

export default socket;
