import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { BASE_URL, THEME, ALL, PARAGRAPH, TEST, DELETE } from '../urls';
import { Link } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import RestrictView, { ROLES } from './Role';
import '../css/theme.css';

const Theme = (params) => {
    const [themes, setThemes] = useState([]);
    const { courseId } = useParams();
    const { auth } = useContext(AuthContext);

    function getAllCourseThemes(id) {
        axios.get(BASE_URL + THEME + id + "/" + ALL, {
                headers: {
                'Authorization': `Bearer ${auth.token}`
            }
            }).then((response) => {
                console.log(response);
                setThemes(response.data);
            },
                (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    function handleParagraphDelete(id) {
        axios.delete(BASE_URL + PARAGRAPH + id + "/" + DELETE, {
                headers: {
                'Authorization': `Bearer ${auth.token}`
            }
            }).then(() => {
            getAllCourseThemes(courseId);
        }).catch(
            (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    function handleTestDelete(id) {
        axios.delete(BASE_URL + TEST + id + "/" + DELETE, {
                headers: {
                'Authorization': `Bearer ${auth.token}`
            }
            }).then(
            getAllCourseThemes(courseId)
        ).catch(
            (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    useEffect(() => {
        getAllCourseThemes(courseId);
    }, [courseId]);


    return(
        <div className='themes-container'>
            {themes.map(theme => (
                <div key={theme.id} className="theme-card">
                    
                    <h3>{theme.title}</h3>
                    
                    { theme.paragraphs.length > 0 ? 
                    (<div className="paragraph-links">
                        {theme.paragraphs.map(paragraph => (     
                            <div key={paragraph.id}>
                                <Link to={`/paragraph/${paragraph.id}`} className="paragraph-link">
                                    <h4>{paragraph.title}</h4>          
                                </Link>

                                 <RestrictView allowedRoles={[ROLES.ADMIN, ROLES.MENTOR]} userRole={auth.role}>
                                    <button type="submit" className="delete-btn" onClick={() => handleParagraphDelete(paragraph.id)}>
                                        Удалить
                                    </button>
                                </RestrictView>
                            </div>
                            ))
                        }
                    </div>) : (<div className="paragraph-links"><h4>Главы к этой теме ещё не добавлены.</h4></div>)}

                    
                    <RestrictView allowedRoles={[ROLES.ADMIN, ROLES.MENTOR]} userRole={auth.role}>
                        <Link to={`/paragraph/${theme.id}/create`} className="create-link">
                            <button className='create-btn'>
                                <h4>cоздать главу</h4> 
                            </button>         
                        </Link>
                    </RestrictView>

                    
                    { theme.tests.length > 0 ? 
                    (<div className="test-links">
                        {theme.tests.map(test => (
                            <div key={test.id}>
                                <Link to={`/test/${test.id}`} className="test-link">
                                    <h4>{test.title}</h4>          
                                </Link>

                                <RestrictView allowedRoles={[ROLES.ADMIN, ROLES.MENTOR]} userRole={auth.role}>
                                    <button type="submit" className="delete-btn" onClick={() => handleTestDelete(test.id)}>
                                        Удалить
                                    </button>
                                </RestrictView>
                            </div>
                        ))
                        }
                    </div>) : (<div className="test-links"><h4>Тесты к этой теме ещё не добавлены.</h4></div>)} 
                    
                     
                    <RestrictView allowedRoles={[ROLES.ADMIN, ROLES.MENTOR]} userRole={auth.role}>
                        <Link to={`/test/${theme.id}/create`} className="create-link">
                            <button className='create-btn'>
                                <h4>cоздать тест</h4>
                            </button>        
                        </Link>
                    </RestrictView>


                </div>   
             ))
            }

            <RestrictView allowedRoles={[ROLES.ADMIN, ROLES.MENTOR]} userRole={auth.role}>
                <Link to={`/theme/${courseId}/create`}>
                    <h4>создать тему</h4>          
                </Link>
            </RestrictView>
        </div>
    );
}

export default Theme;