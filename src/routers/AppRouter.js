import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { startChecking } from '../actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {


    const dispatch = useDispatch();

    const { checking, uid } = useSelector(state => state.auth)
    //El componente se renderiza cada vez q uno de los valores q estoy usando cambian, en este caso los del useSelector, 
    //entonces cuando en algun componente cambian estos valores, este componente se renderiza y como es el AppRouter = se recarga la pagina

    useEffect(() => {

        dispatch(startChecking()); //cada vez que recargo, le doy un nuevo JWT al usuario, si el usuario aun tiene un JWT y aun no ha caducado


    }, [dispatch])  //cada vez q se recargue alguna de las paginas dentro de este router


    if (checking) {
        return (<h5>Cargando....</h5>)
    }



    return (
        <div>
            <BrowserRouter>

                <Routes>

                    <Route path='/login' element={
                        <PublicRoute isAuthenticated={uid}>
                            <LoginScreen />
                        </PublicRoute>
                    } />
                    <Route path='/' element={
                        <PrivateRoute isAuthenticated={uid}>
                            <CalendarScreen />
                        </PrivateRoute>
                    } />



                    <Route path='/*' element={<Navigate to='/' />} />

                </Routes>

            </BrowserRouter>
        </div>
    )
}
