import { conversationReducers } from "./ conversations/conversation.reducer";
import { buildingsReducer } from "./buildings/building.reducer";
import { messagesReducers } from "./messages/message.reducer";
import { userReducers } from "./user/user.reducers";

export const rootReducer = {
  buildings: buildingsReducer,
  user: userReducers,
  conversations: conversationReducers,
  messages: messagesReducers,
};
