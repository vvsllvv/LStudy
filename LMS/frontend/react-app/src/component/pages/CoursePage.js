import React, { useEffect, useState } from 'react';
import axios from "axios";
import { BASE_URL, GET_COURSE } from '../../urls';
import Theme from '../Theme';

const CoursePage = (params) => {
    const [course, setCourse] = useState([]);
   

    async function getCourse(id) {
        axios.get(BASE_URL + GET_COURSE + id).then((response) => {
                console.log(response);
                setCourse(response.data);
            }).catch((error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

     useEffect(() => {
        getCourse();
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