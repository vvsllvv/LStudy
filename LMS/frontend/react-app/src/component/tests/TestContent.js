import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { ATTEMPT, BASE_URL, PROFILE, TEST, USER } from '../../urls';
import AuthContext from '../context/AuthContext';
import '../../css/test.css';

const TestContent = (params) => {
    const navigate = useNavigate();
    const [test, setTest] = useState([]);
    const [user, setUser] = useState([]);
     const [selectedAnswers, setSelectedAnswers] = useState({});
    const { testId } = useParams(); 
    const { auth } = useContext(AuthContext);
    const [attempt, setAttempt] = useState({
            testId: testId,
            userId: 1,
            timeTaken: 0,
            answers: []
        });

    function getTest(id) {
        axios.get(BASE_URL + TEST + id, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }).then((response) => {
                console.log(response);
                setTest(response.data);
            }).catch((error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    function confirmAttempt() {
        axios.post(BASE_URL + TEST + testId + ATTEMPT, attempt, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }).then(
            navigate(-1)
        )
        .catch((error) => {
            console.log(error);
            console.log(error.response);
        });
    }

    function getProfile() {
        axios.get(BASE_URL + USER + PROFILE, {
            headers: {
                'Authorization': `Bearer ${auth.token}`,
                'Content-Type': 'text/plain'
            }
        }).then((response) => {
            console.log(`вот id пользователя ${user.id}`);
            setUser(response.data);
        }).catch((error) => 
            console.log(error)
        )
    }

    const handleAnswerChange = (questionId, answerId) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: answerId
        }));
    };

    useEffect(() => {
        getTest(testId);
        getProfile();

        const timer = setInterval(() => {});
    }, [testId]);

    return (
        <form action={() => confirmAttempt()}>
            <div className="test-container">
                
                    <div className="test-header">
                        <div className="test-info">
                            <h2>{test.title}</h2>
                            <p className="test-timeout"> Тест не ограничен по времени. </p>
                        </div>
                    </div>

                    <div className="test-questions">

                    <div className="answers-list">
                    {test.questions?.map((question, index) => (
                        <div key={question.id} className="question-card">

                            <div className="question-header">
                                <h3 className="question-number">Вопрос №{index + 1}</h3>
                            </div>

                            <div className="question-text">
                                <h4>{question.description}</h4>
                            </div>

                            <div>
                                {question.answers?.map((answer) => (
                                    <label key={answer.id} className="answer-option">
                                        <input
                                            type="radio"
                                            value={answer.id}
                                            checked={selectedAnswers[question.id] === answer.id}
                                            onChange={() => handleAnswerChange(question.id, answer.id)}
                                        />
                                        <span className="answer-text">{answer.content}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                <button type='submit' className="test-confirm">
                    Закончить тест
                </button>
            </div>
        </form>
    )


}

export default TestContent;