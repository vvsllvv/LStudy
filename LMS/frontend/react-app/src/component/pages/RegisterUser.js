import React, { useState } from 'react';
import axios from 'axios';
import { AUTH, BASE_URL } from '../../urls';
import '../../css/register.css';

const RegisterUser= () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        department: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };


    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email неправильный';
        }

        if (!formData.password) {
            newErrors.password = 'Пароль - обязательное поле.';
        } else if (formData.password.length < 4) {
            newErrors.password = 'Пароль должен состоять более чем из 6 символов';
        }

        if (!formData.firstname) {
            newErrors.firstname = 'Имя - обязательное поле.';
        }

        if (!formData.lastname) {
            newErrors.lastname = 'Фамилия - обязательное поле.';
        }

        if (!formData.department) {
            newErrors.department = 'Регион - обязательное поле.';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            const response = await axios.post(
                BASE_URL + AUTH + 'registration',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            setSubmitStatus({
                type: 'success',
                message: 'Регистрация успешна.'
            });

            setFormData({
                email: '',
                password: '',
                firstname: '',
                lastname: '',
                department: ''
            });

            console.log('Registration successful:', response.data);

        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: error.response?.data?.message || 'Ошибка регистрации.'
            });
            console.error('Registration error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

        const departments = [
            { value: 'MINSK', label: 'Минск' },
            { value: 'VITEBSK', label: 'Витебск' },
            { value: 'BREST', label: 'Брест' },
            { value: 'GOMEL', label: 'Гомель' },
            { value: 'GRODNO', label: 'Гродно'}
        ];

    return (
        <div className="registration-form-container">
            <h2>Регистрация</h2>
            
            {submitStatus.message && (
                <div className={`alert alert-${submitStatus.type}`}>
                    {submitStatus.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="registration-form">

                <div className="form-group">
                    <label htmlFor="email">Почта</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="email"
                        disabled={isSubmitting}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Пароль *</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error' : ''}
                        placeholder="password"
                        disabled={isSubmitting}
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="firstname">Имя</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className={errors.firstname ? 'error' : ''}
                        placeholder=" "
                        disabled={isSubmitting}
                    />
                    {errors.firstname && <span className="error-message">{errors.firstname}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="lastname">Фамилия</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className={errors.lastname ? 'error' : ''}
                        placeholder=" "
                        disabled={isSubmitting}
                    />
                    {errors.lastname && <span className="error-message">{errors.lastname}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="department">Регион *</label>
                    <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className={errors.department ? 'error' : ''}
                        disabled={isSubmitting}
                    >
                        <option value="">Выбрать регион</option>
                        {departments.map(dept => (
                            <option key={dept.value} value={dept.value}>
                                {dept.label}
                            </option>
                        ))}
                    </select>
                    {errors.department && <span className="error-message">{errors.department}</span>}
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="submit-btn"
                >
                    {isSubmitting ? 'Запрос принят...' : 'Регистрация'}
                </button>
            </form>
        </div>
    );
};

export default RegisterUser;