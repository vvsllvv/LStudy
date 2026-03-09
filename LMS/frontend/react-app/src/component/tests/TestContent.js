import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { BASE_URL, TEST } from '../../urls';
import Question from '../Question';

const TestContent = (params) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [test, setTest] = useState([]);
    const { testId } = useParams(); 

    function getTest(id) {
        axios.get(BASE_URL + TEST + id).then((response) => {
                console.log(response);
                setTest(response.data);
            }).catch((error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    useEffect(() => {
        getTest(testId);

        const timer = setInterval(() => {});
    }, [testId]);

    return (
        <div className="test-container">
            
            <div className="test-header">
                <div className="test-info">
                    <h2>{test.title}</h2>
                    <p className="test-timeout">Осталось времени: {test.timeout}</p>
                </div>
            </div>

            <div className="test-questions">

                
                {test.questions?.map((question, index) => (
                    <Question
                        key={question.id}
                        question={question}
                        index={index}
                    />
                ))}
            </div>

            <button type='submit' className="test-confirm">
                Закончить тест
            </button>
        </div>
    )


}

export default TestContent;