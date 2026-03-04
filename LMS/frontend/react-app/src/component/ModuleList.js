import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { BASE_URL, GET_ALL_MODULES } from '../urls';

const ModuleList = () => {
    const [modules, setModules] = useState([]);
    
    async function getAllModules() {
        await axios.get(BASE_URL + GET_ALL_MODULES).then((response) => {
                console.log(response);
                setModules(response.data);
            },
                (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }


    useEffect(() => {
        getAllModules();
        }, []);


    return (
        <div className="modules-container">
            <h2>СПИСОК МОДУЛЕЙ</h2>
            <div>
                {modules.map(module => (
                    <div key={module.id} className="module-card">
                        <h3>{module.title}</h3>
                    
                        {module.courses.map(course => (
                                
                            <Link key={course.id} to={`/course/${course.id}`} className="course-link">
                                <h4>{course.title}</h4>          
                            </Link>
                        ))

                    }
                    </div>   
                ))
                }
            </div>
        </div>
    )
};

export default ModuleList;