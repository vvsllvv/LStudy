import React, { use, useContext, useState } from 'react';
import axios from 'axios';
import { AUTH, BASE_URL, LOGIN } from '../../../urls';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import '../../../css/login.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginData, setLogin] = useState({
        email: '',
        password: ''
    })
    const { setAuth } = useContext(AuthContext);

    function login() {

        axios.post(BASE_URL + AUTH + LOGIN, loginData).then((response) => {
            console.log("Sign-in successfully.");
            console.log(response);

            const { token, refreshToken, role } = response.data;
            setAuth({ token, refreshToken, role });

            navigate("/main");
        }).catch((error) => {
            console.log(error);
            console.log(error.response);

            
        });

    }


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLogin(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
        }));
    }; 

    return (
        <div className="login-container">
            <form id="theme-form" action={() => login()}>
                <h2 className="login-title">Вход</h2>
                <input placeholder='Email' id='email' name='email' value={loginData.email} type='email' onChange={handleChange} />

                <input placeholder='Пароль' id='password' name='password' type='password' value={loginData.password} onChange={handleChange}/>
                <button type="submit">Войти в аккаунт</button>
            </form>

        </div>
    );
}

export default LoginPage;