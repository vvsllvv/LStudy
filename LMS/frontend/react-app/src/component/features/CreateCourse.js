import axios from "axios";
import { BASE_URL, COURSE, CREATE } from "../../urls";
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

const CreateCourse = () => {
    const navigate = useNavigate();
    const { moduleId } = useParams();
<<<<<<< HEAD
    const { auth } = useContext(AuthContext);
=======
>>>>>>> e05764a8297ba1dfd94ebaa117e7aed2e3e0b2d1
    const [course, setCourse] = useState({
        title: ''
    });

    function createModule(id) {
<<<<<<< HEAD
        axios.post(BASE_URL + COURSE + id + "/" + CREATE, course,
            {
                headers: {
                'Authorization': `Bearer ${auth.token}`
        }})
=======
        axios.post(BASE_URL + COURSE + id + "/" + CREATE, course)
>>>>>>> e05764a8297ba1dfd94ebaa117e7aed2e3e0b2d1
        .then()
        .catch((error) => {
            console.log(error);
            console.log(error.response);
        });

        navigate(`/module/all`);
    }

     const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return(
        <div className="create-course">
            <h2>Создание нового курса</h2>
            <form id="course-form" action={() => createModule(moduleId)}>
                <label>
                    Название:
                    <input type="text" name="title" value={course.title} onChange={handleChange} placeholder="Название курса"/>
                </label>

                <button type="submit">Создать</button>
            </form>
        </div>
    );

}

export default CreateCourse;