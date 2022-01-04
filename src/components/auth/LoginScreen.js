import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {


    const [formLoginValues, handleLoginInputChange] = useForm({
        login_Email: 'victor@gmail.com',
        login_Password: '123456'
    })

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        register_Name: 'Victor',
        register_Email: 'victor@gmail.com',
        register_Password1: '123456',
        register_Password2: '123456'
    })

    const { register_Name, register_Email, register_Password1, register_Password2} = formRegisterValues
    const { login_Email, login_Password } = formLoginValues;

    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(startLogin(login_Email, login_Password))
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if(register_Password1 !== register_Password2){
            return Swal.fire('Error', 'Las contraseñas deben ser iguales')
        }

        dispatch(startRegister(register_Name, register_Email, register_Password1))
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='login_Email'
                                value={login_Email}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='login_Password'
                                value={login_Password}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='register_Name'
                                value={register_Name}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='register_Email'
                                value={register_Email}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='register_Password1'
                                value={register_Password1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='register_Password2'
                                value={register_Password2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}