// import moment from 'moment'
import { types } from '../types/types';

// {
        //     id: 'sdgdsf',
        //     title: 'cumpleaños del jefe',
        //     start: moment().toDate(), //lo mismo que poner un = new Date
        //     end: moment().add(2, 'hours').toDate(),
        //     notes: 'Comprar el pastel',
        //     user: {
        //         _id: '123',
        //         name: 'Carlos'
        //     }
        // }


const initialState = {
    events: [

    ],
    activeEvent: null,
}



export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.eventSetActive:

            return {
                ...state,
                activeEvent: action.payload.event
            };

        case types.eventAddNew:

            return {
                ...state,
                events: [...state.events, action.payload.event],
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map(event =>
                    (event.id === action.payload.event.id)
                        ? action.payload.event
                        : event
                )
            }

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(event =>
                    (event.id !== state.activeEvent.id)  //regresa los eventos que NO estan activos 
                        && event
                ),
                activeEvent: null
            }

            case types.eventLoaded:

            return {
                ...state,
                events: [...action.payload]
            };

            case types.eventLogout:

            return {
                ...state,
                events: []
            };

        default:
            return {
                ...state
            };
    }

}
