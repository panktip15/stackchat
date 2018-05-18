import { createStore, applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

// TYPES
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const CHANGE_NAME = 'CHANGE_NAME';

//ACTION CREATOR

export const gotMessagesFromServer = messages => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages,
  };
};

export const fetchMessages = () => {
  return async dispatch => {
    const response = await axios.get('/api/messages');
    const messages = response.data;
    const action = gotMessagesFromServer(messages);
    console.log(action);
    dispatch(action);
  };
};
export const writeMessage = inputContent => {
  return {
    type: WRITE_MESSAGE,
    newMessageEntry: inputContent,
  };
};

export const gotNewMessageFromServer = message => {
  return {
    type: GOT_NEW_MESSAGE_FROM_SERVER,
    message,
  };
};
export const postMessage = message => {
  return async dispatch => {
    const response = await axios.post('/api/messages', message);
    const newMessage = response.data;
    const action = gotNewMessageFromServer(newMessage);
    dispatch(action);
    socket.emit('new-message', newMessage);
  };
};

export const changeName = name => {
  return {
    type: CHANGE_NAME,
    name,
  };
};

//initial state

const initialState = {
  messages: [],
  newMessageEntry: '',
  name: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    case WRITE_MESSAGE:
      return {
        ...state,
        newMessageEntry: action.newMessageEntry,
      };
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return { ...state, messages: [...state.messages, action.message] };
    case CHANGE_NAME:
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  applyMiddleware(reduxLogger, thunkMiddleware)
);

export default store;
