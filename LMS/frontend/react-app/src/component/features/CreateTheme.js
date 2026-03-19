import axios from "axios";
import { BASE_URL, THEME, CREATE } from "../../urls";
<<<<<<< HEAD
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
=======
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
>>>>>>> e05764a8297ba1dfd94ebaa117e7aed2e3e0b2d1

const CreateTheme = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
<<<<<<< HEAD
    const { auth } = useContext(AuthContext);
=======
>>>>>>> e05764a8297ba1dfd94ebaa117e7aed2e3e0b2d1
    const [theme, setTheme] = useState({
        title: ''
    });

    function createTheme(id) {
<<<<<<< HEAD
        axios.post(BASE_URL + THEME + id + "/" + CREATE, theme,
            {
                headers: {
                'Authorization': `Bearer ${auth.token}`
        }})
=======
        axios.post(BASE_URL + THEME + id + "/" + CREATE, theme)
>>>>>>> e05764a8297ba1dfd94ebaa117e7aed2e3e0b2d1
        .then()
        .catch((error) => {
            console.log(error);
            console.log(error.response);
        });

<<<<<<< HEAD
        navigate(-1);
=======
        navigate(`/course/${courseId}`);
>>>>>>> e05764a8297ba1dfd94ebaa117e7aed2e3e0b2d1
    }

     const handleChange = (e) => {
        const { name, value } = e.target;
        setTheme(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return(
        <div className="create-theme">
            <h2>Создание новой темы</h2>
            <form id="theme-form" action={() => createTheme(courseId)}>
                <label>
                    Название:
                    <input type="text" name="title" value={theme.title} onChange={handleChange} placeholder="Название темы"/>
                </label>

                <button type="submit">Создать</button>
            </form>
        </div>
    );

}

export default CreateTheme;