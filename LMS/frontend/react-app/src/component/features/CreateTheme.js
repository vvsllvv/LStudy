import axios from "axios";
import { BASE_URL, THEME, CREATE } from "../../urls";
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CreateTheme = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [theme, setTheme] = useState({
        title: ''
    });

    function createTheme(id) {
        axios.post(BASE_URL + THEME + id + "/" + CREATE, theme)
        .then()
        .catch((error) => {
            console.log(error);
            console.log(error.response);
        });

        navigate(`/course/${courseId}`);
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