import axios from "axios"

import { SEND_PROPUESTA, CLEAN_PROPUESTA, GET_PROPUESTAS, GET_PROPUESTA_BY_ANUNCIO } from './types'


export const sendPropuesta = (data) => async (dispatch) => {

    const respuesta = await axios.post('/propuesta', data)

    dispatch({
        type: SEND_PROPUESTA,
        payload: respuesta.data.message
    })
}

export const cleanPropuesta = () =>  {

    return {
        type: CLEAN_PROPUESTA
    }
}

export const getPropuestas = (id) => async (dispatch) => {
    let data = await axios.get(`/propuesta/${id}`)

    dispatch({
        type: GET_PROPUESTAS,
        payload: data.data.propuestas
    })
}

export const getPropuestaByAnuncio = (id) =>  async (dispatch) => {

    let data = await axios.get(`/propuestabyanuncio/${id}`)

    dispatch({
        type: GET_PROPUESTA_BY_ANUNCIO,
        payload: data.data.propuestas
    })

}