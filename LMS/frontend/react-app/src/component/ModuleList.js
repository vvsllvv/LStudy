import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { BASE_URL, MODULE, COURSE, ALL, DELETE } from '../urls';
import AuthContext from './context/AuthContext';

const ModuleList = () => {
    const [modules, setModules] = useState([]);
    const { auth } = useContext(AuthContext);
    
    function getAllModules() {
        axios.get(BASE_URL + MODULE + ALL, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }).then((response) => {
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
        axios.delete(BASE_URL + COURSE + id + "/" + DELETE, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }).then(
            getAllModules()
        ).catch(
            (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    function handleModuleDelete(id) {
        axios.delete(BASE_URL + MODULE + id + "/" + DELETE, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }).then(
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
<<<<<<< HEAD
                    
=======
>>>>>>> e05764a8297ba1dfd94ebaa117e7aed2e3e0b2d1
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