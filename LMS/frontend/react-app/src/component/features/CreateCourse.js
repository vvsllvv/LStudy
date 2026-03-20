import axios from "axios";
import { BASE_URL, COURSE, CREATE } from "../../urls";
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import '../../css/courseform.css';

const CreateCourse = () => {
    const navigate = useNavigate();
    const { moduleId } = useParams();
    const { auth } = useContext(AuthContext);
    const [course, setCourse] = useState({
        title: ''
    });

    function createModule(id) {
        axios.post(BASE_URL + COURSE + id + "/" + CREATE, course,
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