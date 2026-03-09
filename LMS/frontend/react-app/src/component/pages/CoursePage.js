import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { BASE_URL, COURSE } from '../../urls';
import Theme from '../Theme';

const CoursePage = (params) => {
    const [course, setCourse] = useState([]);
    const { courseId } = useParams(); 

    function getCourse(id) {
        axios.get(BASE_URL + COURSE + id).then((response) => {
                console.log(response);
                setCourse(response.data);
            }).catch((error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

     useEffect(() => {
        getCourse(courseId);
    }, []);

    return(
        <div className='course-container'>
            <h2>{course.title}</h2>
            
            <div className='content-container'>
                <Theme courseId={course.id}/>
            </div>
        </div>
   )
}

export default CoursePage;