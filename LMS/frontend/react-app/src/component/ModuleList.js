import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { BASE_URL, MODULE, COURSE, ALL, DELETE } from '../urls';

const ModuleList = () => {
    const [modules, setModules] = useState([]);
    
    function getAllModules() {
        axios.get(BASE_URL + MODULE + ALL).then((response) => {
                console.log(response);
                setModules(response.data);
            },
                (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    function handleCourseDelete(id) {
        axios.delete(BASE_URL + COURSE + id + "/" + DELETE).then(
            getAllModules()
        ).catch(
            (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    function handleModuleDelete(id) {
        axios.delete(BASE_URL + MODULE + id + "/" + DELETE).then(
            getAllModules()
        ).catch(
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
                        <div key={course.id} >    
                            <Link to={`/course/${course.id}`} className="course-link">
                                <h4>{course.title}</h4>          
                            </Link>

                                
                            <button type="submit" className="delete-btn" onClick={() => handleCourseDelete(course.id)}>
                                Удалить
                            </button>
                        </div>      
                        ))

                        
                    }
                        <Link to={`/course/${module.id}/create`}>
                            <h4>создать курс</h4>          
                        </Link>

                        <button type="submit" className="delete-btn" onClick={() => handleModuleDelete(module.id)}>
                            Удалить
                        </button>
                    </div>   
                ))
                }
            </div>

            <Link to={`/module/create`} className="create-link">
                <h4>cоздать </h4>          
            </Link>
        </div>
    )
};

export default ModuleList;