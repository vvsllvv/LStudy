import axios from "axios";
import { BASE_URL, MODULE, CREATE } from "../../urls";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateModule = () => {
    const navigate = useNavigate();
    const [module, setModule] = useState({
        title: ''
    });

    function createModule(id) {
        axios.post(BASE_URL + MODULE + CREATE, module)
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