import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { BASE_URL, GET_THEMES } from '../urls';
import { Link } from 'react-router-dom';

const Theme = () => {
    const [themes, setThemes] = useState([]);
    const { courseId } = useParams(); 

    async function getAllCourseThemes(id) {
    await axios.get(BASE_URL + GET_THEMES + id + "/all").then((response) => {
                console.log(response);
                setThemes(response.data);
            },
                (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    useEffect(() => {
        getAllCourseThemes(courseId);
    }, []);


    return(
        <div className='themes-container'>
            {themes.map(theme => (
                <div key={theme.id} className="theme-card">
                    
                    <h3>{theme.title}</h3>
                    
                    {theme.paragraphs.map(paragraph => (     
                        <Link key={paragraph.id} to={`/paragraph/${paragraph.id}`} className="course-link">
                            <h4>{paragraph.title} -- {paragraph.id}</h4>          
                        </Link>
                    ))
                    }

                    {theme.tests.map(test => (
                        <Link key={test.id} to={`/test/${test.id}`} className="course-link">
                            <h4>{test.title}</h4>          
                        </Link>
                    ))
                    }                
                </div>   
             ))
            }
        </div>
    );
}

export default Theme;