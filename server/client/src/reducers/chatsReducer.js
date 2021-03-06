import { CREATE_CHAT, GET_CHAT_BY_ID, GET_MESSAGES, SEND_MESSAGE, GET_CHATS_BY_USER, PUSH_LAST_MESSAGE, CLEAN_CHAT, PUSH_CHAT_IF_NOT_EXIST } from '../actions/types'

const initialState = {
    chatId: null,
    messages: null,
    chatsUser: null,
    msg: null
};
  
export default function (state = initialState, action) {

    switch (action.type) {

        case CREATE_CHAT: {
            return {
                chatId: action.payload
            }
        }
        case GET_CHAT_BY_ID: 
            return {
                ...state,
                chatInfo: action.payload.chat,
                messages: action.payload.messages
            }
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case GET_CHATS_BY_USER:
            return {
                ...state,
                chatsUser: action.payload
            }
        case PUSH_LAST_MESSAGE:
            if (state.chatsUser[action.payload.index] !== undefined) {
                state.chatsUser[action.payload.index].lastMessage = action.payload.value.lastMessage
            }
            return {
                ...state
            }
        case CLEAN_CHAT:
            return {
            chatId: null,
            messages: null,
            chatsUser: null,
            msg: null  
            }
        case PUSH_CHAT_IF_NOT_EXIST:
            return {
                ...state,
                chatsUser : [action.payload, ...state.chatsUser]
            }
        default: 
            return state
    }


} 