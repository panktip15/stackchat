import { createStore, applyMiddleware } from "redux";
import reduxLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

// TYPES
const GOT_MESSAGES_FROM_SERVER = "GOT_MESSAGES_FROM_SERVER";

//ACTION CREATOR

export const gotMessagesFromServer = messages => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages
  };
};

export const fetchMessages = () => {
  return async dispatch => {
    const response = await axios.get("/api/messages");
    const messages = response.data;
    const action = gotMessagesFromServer(messages);
    console.log(action);
    dispatch(action);
  };
};

//initial state

const initialState = {
  messages: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  applyMiddleware(reduxLogger, thunkMiddleware)
);

export default store;
