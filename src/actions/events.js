import Swal from "sweetalert2"
import { fetchConToken } from "../helpers/fetch"
import { prepareEvents } from "../helpers/prepareEvents"
import { types } from "../types/types"


export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth

        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();

            if (body.ok) {

                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name
                }
                    dispatch(eventAddNew(event))
            }

        } catch (error) {
            console.log(error)
        }



    }
}

//accion se dipara unicamente guardo el nuevo evento en la db
const eventAddNew = (event) => {

    return {
        type: types.eventAddNew,
        payload: {
            event
        },
    }
}


//pone el evento en la variable activeEvent, si hay algo en activeEvent se muestra en pantalla
export const eventSetActive = (event) => {

    return {
        type: types.eventSetActive,
        payload: {
            event
        },
    }
}

//eliminar el activeEvent (), si no hay nada en activeEvent, desaparece la 2da pantalla
export const eventClearActiveEvent = () => {
    return {
        type: types.eventClearActiveEvent,
    }
}

export const eventStartUpdate = (event) => {
    return async (dispatch) => {

        try {

            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT')
            const body = await resp.json() //la respuesta del fetch

            if(body.ok){
                dispatch(eventUpdated(event))
            }else{
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {

            console.log(error)
        }
    }
}

const eventUpdated = (event) => {
    return {
        type: types.eventUpdate,
        payload: {
            event
        }
    }
}

export const eventStartDeleted = () => {
    return async (dispatch, getState) => {

        const {id} = getState().calendar.activeEvent

        try {

            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE')
            const body = await resp.json() //la respuesta del fetch

            if(body.ok){
                dispatch(eventDeleted())
            }else{
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {

            console.log(error)
        }
    }
}

const eventDeleted = () => {
    return {
        type: types.eventDeleted
    }
}

//obtener los eventos de la DB
export const eventStartLoading = () => {
    return async (dispatch) => {

        try {

            const resp = await fetchConToken('events')
            const body = await resp.json();

            const events = prepareEvents(body.eventos)

            dispatch(eventLoaded(events))

        } catch (error) {
            console.log(error)
        }

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})



export const eventLogout = () => ({

    type: types.eventLogout
    
})