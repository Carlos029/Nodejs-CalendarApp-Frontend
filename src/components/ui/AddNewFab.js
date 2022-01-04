import React from 'react'
import {useDispatch} from 'react-redux'
import { uiOpendModal } from '../../actions/ui'

//AddNewFab == add new floating action button

export const AddNewFab = () => {

    const dispatch = useDispatch()

    const handleClickNew = () => {
        dispatch(uiOpendModal())
    }

    return (
        <button
        className='btn btn-primary fab'
        onClick={handleClickNew}
        >
            <i className='fas fa-plus'></i>
            
        </button>
    )
}
