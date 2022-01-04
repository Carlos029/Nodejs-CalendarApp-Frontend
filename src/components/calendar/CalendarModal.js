import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal';  //documentacion = http://reactcommunity.org/react-modal/
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import Swal from 'sweetalert2'
import { uiClosedModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate  } from '../../actions/events';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};



// Make sure to bind modal to your appElement
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours'); //hora actual 2:45:30. resultado de esta linea = 3:00:00
const nowPlus_1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(), // lo mismo que el new Date
    end: nowPlus_1.toDate(),
}


export const CalendarModal = () => {

    const dispatch = useDispatch()
    const { modalOpen } = useSelector(state => state.ui)
    const { activeEvent } = useSelector(state => state.calendar)

    const [titleValid, setTitleValid] = useState(true)
    const [formValues, setFormValues] = useState(initEvent)
    const { notes, title, start: startDate, end: endDate } = formValues

    useEffect(() => {
        
    
        if(activeEvent){
            setFormValues(activeEvent)
        }else{
            setFormValues(initEvent) //al eliminar evento, los valores del formulario se reinician 
        }

    }, [activeEvent,setFormValues])

    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        })

    }

    const closeModal = () => {

        dispatch(uiClosedModal())
        dispatch(eventClearActiveEvent())
        setFormValues(initEvent)
    }

    const handleStartDateChange = (e) => {
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        const momentStart = moment(startDate)
        const momentEnd = moment(endDate)

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error')
        }

        if (title.trim().length < 2) {
            return setTitleValid(false)
        }

        if( activeEvent ){  //cuando se crea un nuevo evento el activeEvent = null. Si se presiona uno preexistente activeEvent = Object. si ya existe, se actualiza
            dispatch(eventStartUpdate(formValues))
        }else{

            dispatch(eventStartAddNew({
                ...formValues
            }))

        }

        setTitleValid(true)
        closeModal()
    }

    return (
        <Modal
            isOpen={modalOpen} //Boolean describing if the modal should be shown or not
            // onAfterOpen={afterOpenModal} //Function that will be run after the modal has opened
            onRequestClose={closeModal} //Function that will be run after the modal has closed (tocando afuera de la ventana)
            style={customStyles}
            closeTimeoutMS={200}  //Number indicating the milliseconds to wait before closingthe modal
            className='modal'
            overlayClassName='modal-fondo' //className to be applied to the overlay
        >

            {/* este html dentro de Modal, es todo el html de la ventana emergente */}

            <h1> {activeEvent ? 'Editar Evento' : 'Nuevo Evento'} </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={startDate}
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={endDate}
                        minDate={startDate}
                        className='form-control'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
