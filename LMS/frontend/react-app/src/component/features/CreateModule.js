import axios from "axios";
import { BASE_URL, MODULE, CREATE } from "../../urls";
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";

const CreateModule = () => {
    const navigate = useNavigate();
    const { auth, logout } = useContext(AuthContext);
    const [module, setModule] = useState({
        title: ''
    });

    function createModule(id) {
        axios.post(BASE_URL + MODULE + CREATE, module,
        {
            headers: {
            'Authorization': `Bearer ${auth.token}`
        }})
        .then()
        .catch((error) => {
            console.log(error);
            console.log(error.response);
        });

        navigate(`/module/all`);
    }

     const handleChange = (e) => {
        const { name, value } = e.target;
        setModule(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return(
        <div className="create-module">
            <h2>Создание новой главы</h2>
            <form id="module-form" action={() => createModule()}>
                <label>
                    Название:
                    <input type="text" name="title" value={module.title} onChange={handleChange} placeholder="Название модуля"/>
                </label>

                <button type="submit">Создать</button>
            </form>
        </div>
    );

}

export default CreateModule;