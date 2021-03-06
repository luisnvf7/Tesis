import axios from "axios";

import { CREATE_CHAT, GET_CHAT_BY_ID, SEND_MESSAGE, GET_CHATS_BY_USER, PUSH_LAST_MESSAGE, CLEAN_CHAT , PUSH_CHAT_IF_NOT_EXIST } from "./types";

export const createChat = (data) => async (dispatch) => {

   const res = await axios.post('/createChat', data)

       dispatch({
           type: CREATE_CHAT,
           payload : res.data.chatId
       })
}

export const getChat = (id) => async (dispatch) => {

    const res = await axios.get(`/chatback/${id}`)

    const messages = await axios.get(`/messages/${id}`)

    dispatch({
        type: GET_CHAT_BY_ID,
        payload: { ...res.data, ...messages.data  }
    })
}

export const pushMessage = message => {

    return {
        type: SEND_MESSAGE,
        payload: message
    }
}

export const getChatsByUser = (id) => async (dispatch) => {
   
     
    const resp = await axios.get(`/chatuser`)

    dispatch({
        type: GET_CHATS_BY_USER,
        payload: resp.data.mensajeInfo
    })

}

export const pushLastMessage = (chat_id) => (dispatch, getState) => {


    let index = getState().chat.chatsUser.findIndex(valor => valor.chat_id == chat_id)

    let value = { lastMessage: getState().chat.messages[ getState().chat.messages.length - 1 ] }

    delete value.chat_id

    dispatch({
        type: PUSH_LAST_MESSAGE,
        payload: { index , value  }
    })
}

export const cleanChat  = () => {
    return {
        type: CLEAN_CHAT
    }
}

export const pushChatIfNotExist = (chatInfo) => {

    console.log("CHAT INFO", chatInfo)

    return {
        type : PUSH_CHAT_IF_NOT_EXIST,
        payload: chatInfo
    }
    
}
