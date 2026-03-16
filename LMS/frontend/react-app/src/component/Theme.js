import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { BASE_URL, THEME, ALL, PARAGRAPH, TEST, DELETE } from '../urls';
import { Link } from 'react-router-dom';

const Theme = (params) => {
    const [themes, setThemes] = useState([]);
    const { courseId } = useParams(); 

    function getAllCourseThemes(id) {
        axios.get(BASE_URL + THEME + id + "/" + ALL).then((response) => {
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
        axios.delete(BASE_URL + PARAGRAPH + id + "/" + DELETE).then(() => {
            getAllCourseThemes(courseId);
        }).catch(
            (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    function handleTestDelete(id) {
        axios.delete(BASE_URL + TEST + id + "/" + DELETE).then(
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
                    
                    <div className="paragraph-links">
                        {theme.paragraphs.map(paragraph => (     
                            <div key={paragraph.id}>
                                <Link to={`/paragraph/${paragraph.id}`} className="paragraph-link">
                                    <h4>{paragraph.title}</h4>          
                                </Link>

                                <button type="submit" className="delete-btn" onClick={() => handleParagraphDelete(paragraph.id)}>
                                    Удалить
                                </button>

                            </div>
                        ))
                        }
                    </div>

                    <Link to={`/paragraph/${theme.id}/create`} className="create-link">
                        <h4>cоздать главу</h4>          
                    </Link>


                    <div className="test-links">
                        {theme.tests.map(test => (
                            <div key={test.id}>
                                <Link to={`/test/${test.id}`} className="test-link">
                                    <h4>{test.title}</h4>          
                                </Link>

                                <button type="submit" className="delete-btn" onClick={() => handleTestDelete(test.id)}>
                                    Удалить
                                </button>
                            </div>
                        ))
                        }
                    </div>
                     
                     <Link to={`/test/${theme.id}/create`} className="create-link">
                        <h4>cоздать тест</h4>          
                    </Link>


                </div>   
             ))
            }

            <Link to={`/theme/${courseId}/create`}>
                <h4>создать тему</h4>          
            </Link>
        </div>
    );
}

export default Theme;