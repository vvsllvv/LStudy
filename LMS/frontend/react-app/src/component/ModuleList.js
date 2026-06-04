import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { BASE_URL, MODULE, COURSE, ALL, DELETE } from '../urls';
import AuthContext from './context/AuthContext';
import RestrictView, { ROLES } from './Role';
import '../css/moduleList.css';

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
            <div className='modules-listing'>
                {modules.map(module => (
                    <div key={module.id} className="module-card">
                        <h3>{module.title}</h3>
                    

                    {module.courses.length === 0 ? (
                        <div className="empty-courses-message">В этом модуле пока нет курсов</div>
                        ) : (
                            <div>
                                {module.courses.map(course => (
                                    <div key={course.id} className='course-cage'>    
                                        <Link to={`/course/${course.id}`} className="course-link">
                                            <h4>{course.title}</h4>          
                                        </Link>

                                        <RestrictView allowedRoles={[ROLES.ADMIN, ROLES.MENTOR]} userRole={auth.role}>
                                            <button type="submit" className="delete-btn" onClick={() => handleCourseDelete(course.id)}>
                                                Удалить
                                            </button>
                                        </RestrictView>
                                    </div>      
                                    ))
                                }
                            </div>)}
                    
                    <div id='wrapper'>
                        <RestrictView allowedRoles={[ROLES.ADMIN, ROLES.MENTOR]} userRole={auth.role}>
                            <div className='nav-btn'>
                                <Link to={`/course/${module.id}/create`}>
                                    <button className="create-btn-course">
                                        <h4 className="create-class-link">Cоздать</h4>
                                    </button>          
                                </Link>
                                <div className='btn-wrapper'>
                                    <button type="submit" className="delete-btn-course" onClick={() => handleModuleDelete(module.id)}>
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </RestrictView>
                        </div>
                    </div>
                ))
                }
            </div>
            <div className='after-modules'>
                <RestrictView allowedRoles={[ROLES.ADMIN, ROLES.MENTOR]} userRole={auth.role}>
                    <Link to={`/module/create`} className="big-create-link">
                        <h4>cоздать</h4>          
                    </Link>
                </RestrictView>
            </div>
        </div>
    )
};

export default ModuleList;