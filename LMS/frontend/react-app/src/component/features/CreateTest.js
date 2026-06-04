import axios from "axios";
import { BASE_URL, TEST, CREATE } from "../../urls";
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import '../../css/testform.css';

const CreateTest = () => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const { themeId } = useParams();
    const [test, setTest] = useState({
        title: '',
        active: true,
        timeout: 120,
        questions: []
    });
    
    const Method = {
    STRICT: 'STRICT',
    MAJORITY: 'MAJORITY'
    };


    const handleTestChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTest(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
        }));
    };  

    const addQuestion = () => {
        setTest(prev => ({
        ...prev,
        questions: [
            ...prev.questions,
            {
            description: '',
            method: Method.STRICT,
            answers: []
            }
        ]
        }));
    };

    const removeQuestion = (questionIndex) => {
            setTest(prev => ({
        ...prev,
        questions: prev.questions.filter((_, index) => index !== questionIndex)
        }));
    };

    const handleQuestionChange = (index, field, value) => {
        setTest(prev => {
        const updatedQuestions = [...prev.questions];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            [field]: value
        };
        return { ...prev, questions: updatedQuestions };
        });
    };

    const addAnswer = (questionIndex) => {
        setTest(prev => {
        const updatedQuestions = [...prev.questions];
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            answers: [
            ...updatedQuestions[questionIndex].answers,
            {
                content: '',
                isRight: false
            }
            ]
        };
        return { ...prev, questions: updatedQuestions };
        });
    };

    const removeAnswer = (questionIndex, answerIndex) => {
        setTest(prev => {
        const updatedQuestions = [...prev.questions];
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            answers: updatedQuestions[questionIndex].answers.filter(
            (_, index) => index !== answerIndex
            )
        };
        return { ...prev, questions: updatedQuestions };
        });
    };

    const handleAnswerChange = (questionIndex, answerIndex, field, value) => {
        setTest(prev => {
        const updatedQuestions = [...prev.questions];
        const updatedAnswers = [...updatedQuestions[questionIndex].answers];
        updatedAnswers[answerIndex] = {
            ...updatedAnswers[answerIndex],
            [field]: field === 'isRight' ? value : value
        };
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            answers: updatedAnswers
        };
        return { ...prev, questions: updatedQuestions };
        });
    };


    function createTest(id) {
        const submitData = {
        ...test,
        questions: test.questions.map(q => ({
            description: q.description,
            method: q.method,
            answers: q.answers.map(a => ({
                content: a.content,
                isRight: a.isRight
            }))
        }))
        };
        console.log(submitData);


        axios.post(BASE_URL + TEST + id + "/" + CREATE, submitData,
        {
            headers: {
            'Authorization': `Bearer ${auth.token}`
        }}).then(
            navigate(-1)
        )
        .catch((error) => {
                console.log(error);
                console.log(error.response);
            });
    };
    

    return(
        <div className="test-form-container">
            <form action={() => createTest(themeId)} className="test-form">

                <div className="form-group">
                    <label>Тема теста</label>
                        <input type="text" name="title" value={test.title} onChange={handleTestChange} placeholder="Тема теста"/>
                    {/* <label></label>
                        <input type="number" name="" value={test.timeout} onChange={handleTestChange} placeholder="Количество минут на тест" min="1" max="3600"/>
                    <label>Тест активен</label>
                        <input type="checkbox" name="active" value={test.title} onChange={handleTestChange} placeholder="Тема теста"/> */}
                </div>


            <div className="form-section">
                <div className="section-header">
                    <h2>Вопросы</h2>
                    <button type="button" onClick={addQuestion} className="add-button">
                    Добавить вопрос
                    </button>
                </div>

                {test.questions.length === 0 ? (
                    <p className="empty-message">Добавьте вопросы к тесту.</p>
                ) : (
                    test.questions.map((question, qIndex) => (
                    <div key={qIndex} className="question-card">
                        <div className="question-header">
                        <h3>Вопросы №{qIndex + 1}</h3>
                        <button type="button" onClick={() => removeQuestion(qIndex)} className="remove-button">
                            Удалить вопрос
                        </button>
                        </div>

                        <div className="form-group">
                        <label>Содержание:</label>
                        <textarea value={question.description}
                            onChange={(e) => handleQuestionChange(qIndex, 'description', e.target.value)} required
                            placeholder="Напишите содержание вопроса" rows="3"/>
                        </div>
                        
                        
                        <label>Метод:</label>
                        
                        <select name="method" value={question.method} onChange={(e) => handleQuestionChange(qIndex, 'method', e.target.value)}>
                            <option value={Method.STRICT}>Один вариант ответа</option>
                            <option value={Method.MAJORITY}>Несколько вариантов ответа</option>
                        </select>

                        <div className="answers-section">
                            <div className="section-header">
                                <h4>Ответы</h4>
                                <button type="button" onClick={() => addAnswer(qIndex)} className="add-button small">
                                Добавить ответ
                                </button>
                            </div>

                        {question.answers.length === 0 ? (
                            <p className="empty-message">Добавьте ответы на вопрос.</p>
                        ) : (
                            question.answers.map((answer, aIndex) => (
                            <div key={aIndex} className="answer-card">
                                <div className="answer-header">
                                <h5>Ответ №{aIndex + 1}</h5>
                                <button
                                    type="button" onClick={() => removeAnswer(qIndex, aIndex)}
                                    className="remove-button small"
                                >
                                    Убрать ответ
                                </button>
                                </div>

                                <div className="form-row">
                                <div className="form-group" style={{ flex: 1 }}>
                                    <input
                                    type="text" value={answer.content} 
                                    onChange={(e) => handleAnswerChange(qIndex, aIndex, 'content', e.target.value)}
                                    placeholder="Ответ"
                                    required
                                    />
                                </div>

                                <div className="form-group checkbox">
                                    <label>
                                    <input type="checkbox" checked={answer.isRight} 
                                    onChange={(e) => handleAnswerChange(qIndex, aIndex, 'isRight', e.target.checked)}/>
                                        Правильный ответ
                                    </label>
                                </div>
                                </div>
                            </div>
                            ))
                        )}
                        </div>
                    </div>
                ))
                )}
            </div>

            <button type="submit">Создать тест</button>
            </form>
        </div>
    );

}

export default CreateTest;

