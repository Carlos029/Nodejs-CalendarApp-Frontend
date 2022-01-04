import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from 'sweetalert2'


//LOGEAR AL USUARIO
export const startLogin = (email, password) => {

    return async (dispatch) => {

        const resp = await fetchSinToken('auth', { email, password }, 'POST')
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime()) //para saber a la hora q comenzo a usarse el token, para si conozco el tiempo de expiracion, poder saber cuando este token expira

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}


//REGISTRAR AL USUARIO
export const startRegister = (name, email, password) => {

    return async (dispatch) => {

        const resp = await fetchSinToken('auth/new', { name, email, password }, 'POST')
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime()) //para saber a la hora q comenzo a usarse el token, para si conozco el tiempo de expiracion, poder saber cuando este token expira

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}


//le doy un nuevo JWT al usuario
export const startChecking = () => {

    return async (dispatch) => {
        const resp = await fetchConToken('auth/renew')
        const body = await resp.json();

        //si el usuario ya tenia JWT => body.ok = true, si el usuario no se le ha dado un token en startLogin() o startRegister, o el token caduco body.ok => false
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime()) //para saber a la hora q comenzo a usarse el token, para si conozco el tiempo de expiracion, poder saber cuando este token expira

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            dispatch(checkingFinish())
        }
    }
}


const checkingFinish = () => {
    return {
        type: types.authCheckingFinish
    }
}

const login = (user) => {
    return {
        type: types.authLogin,
        payload: user
    }
}


export const starLogout = () => {
    return (dispatch) => {

        localStorage.clear();
        dispatch(logout());

    }
}


const logout = () => {
    return {
        type: types.authLogout
    }
}