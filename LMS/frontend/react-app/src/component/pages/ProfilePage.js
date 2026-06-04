import React from 'react';
import AuthContext from '../context/AuthContext';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../../css/profile.css";
import { BASE_URL, PROFILE, USER } from '../../urls';


const ProfileInfo = ({ }) => {
    const { auth, logout } = useContext(AuthContext);
    const [profile, setProfile] = useState([]);
    const navigate = useNavigate();

    function profileInfo() {
        axios.get(BASE_URL + USER + PROFILE, {
                headers: {
                'Authorization': `Bearer ${auth.token}`
            }}).then((response) => {
                console.log(response);
                setProfile(response.data);
            },
                (error) => {
                console.log(error);
                console.log(error.response);
            });
    }
    
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const defaultProfilePic = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23E0E0E0'/%3E%3Cpath fill='%23999' d='M50 60c-8.5 0-15.5 3-21 8.5-3 3-5 7-5 11.5h52c0-4.5-2-8.5-5-11.5-5.5-5.5-12.5-8.5-21-8.5z'/%3E%3Ccircle cx='50' cy='35' r='12' fill='%23999'/%3E%3C/svg%3E";


    useEffect(() => {
        profileInfo();
    }, []);


    return (
        <div className="profile-card">
            <div className="profile-avatar">
                <img 
                    src={defaultProfilePic}
                    alt={`${profile.firstname} ${profile.lastname}`}
                    className="profile-image"
                />
            </div>
            
            <div className="profile-details">
                <h2 className="profile-name">
                    {profile.firstname} {profile.lastname}
                </h2>
                
               <div className="profile-info-item">
                    <span className="label">Отдел:</span>
                    <span className="value">
                        {
                            profile.department === 'MINSK' ? 'Минск' :
                            profile.department === 'VITEBSK' ? 'Витебск' :
                            profile.department === 'BREST' ? 'Брест' :
                            profile.department === 'GOMEL' ? 'Гомель' :
                            profile.department === 'GRODNO' ? 'Гродно' :
                            profile.department || 'Не указана'
                        }
                    </span>
                </div>
                
                <div className="profile-info-item">
                    <span className="label">Роль:</span>
                    <span className="value">
                        {
                            profile.role === 'ROLE_ADMIN' ? 'Администратор' :
                            profile.role === 'ROLE_MENTOR' ? 'Ментор' :
                            profile.role === 'ROLE_USER' ? 'Пользователь' :
                            profile.role || 'Не указана'
                         }
                    </span>
                </div>
                
                <div className="profile-info-item">
                    <span className="label">Статус:</span>
                    <span className={`status-badge ${profile.isEnabled ? 'active' : 'inactive'}`}>
                        {profile.isEnabled ? 'Активирован' : 'Заблокирован'}
                    </span>
                </div>
                
                <button onClick={handleLogout} className="logout-button">
                    Выйти
                </button>
     
            </div>
        </div>
    );
};

export default ProfileInfo;