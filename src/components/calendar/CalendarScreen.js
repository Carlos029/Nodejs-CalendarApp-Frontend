import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'  // Documentacion = https://jquense.github.io/react-big-calendar/examples/index.html#intro
import moment from 'moment'
import 'moment/locale/es'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { uiOpendModal } from '../../actions/ui'
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'


moment.locale('es'); //poner las fechas en español

// Setup the localizer by providing the moment
const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector(state => state.calendar)
    const { uid } = useSelector(state => state.auth)

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')  //para que cuando recargue la pagina, se ponga el calendario en el ultimo "view" en el q estaba

    useEffect(() => {
        
        dispatch(eventStartLoading())
        
    }, [dispatch])

    const onDoubleClick = (e) => {
        dispatch(uiOpendModal())
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e))
    }

    const onViewChange = (e) => {

        // console.log(e)
        setLastView(e)
        localStorage.setItem('lastView', e)
    }

    const onSelectSlot = () => {
        dispatch(eventClearActiveEvent())
    }

    const eventStyleGetter = (event, start, end, isSelected) => {


        const style = {
            backgroundColor:  (uid === event.user._id) ?  '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }

    }

    return (
        <div className='calendar-screen'>
            <Navbar />

            <Calendar
                localizer={localizer}   //inicializa el calendario 
                events={events}    //lista de los eventos q se ponegan en el calendario 
                startAccessor="start"
                endAccessor="end"
                messages={messages} //messages used throughout the component, override to provide localizations
                eventPropGetter={eventStyleGetter} ////regresa el estilo que le aplica a un evento en particular
                onDoubleClickEvent={onDoubleClick} //Callback fired when a calendar event is clicked twice.
                onSelectEvent={onSelectEvent} //Callback fired when a calendar event is selected.
                onView={onViewChange} //Callback fired when the view (dia, semana, mes, agenda) value changes.
                view={lastView} //The current view of the calendar.
                onSelectSlot={onSelectSlot}//A callback fired when a date selection is made. Only fires when selectable is true
                selectable={true}
                components={{  //Customize how different sections of the calendar render by providing custom Components
                    event: CalendarEvent   //como se ve el uno de los eventos en especifico
                }}
            />

            <CalendarModal />

            <AddNewFab />

            {activeEvent && <DeleteEventFab />}

        </div>
    )
}
