import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import auth from '@feathersjs/authentication-client';

const socket = io(process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:3030');
const feathersAPI = feathers();
feathersAPI.configure(socketio(socket));
feathersAPI.configure(auth({
  storageKey: 'QuizCoin-auth'
}));
export default feathersAPI;
