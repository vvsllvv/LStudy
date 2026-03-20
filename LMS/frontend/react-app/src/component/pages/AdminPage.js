import axios from "axios"
import { BASE_URL, ALL, ADMIN, DELETE, RIGHTS, ROLE } from "../../urls"
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import '../../css/user.css';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const { auth } = useContext(AuthContext);
    const [role, setRoles] = useState({
        role: ''
    });
    
    function getUsersList() {
        axios.get(BASE_URL + ADMIN + ALL, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }).then((response) => {
            setUsers(response.data);
            console.log(response)
        }).catch((error) => {
            console.log(error);
            console.log(error.response);
        }
        );
    }

    function handleUserDelete(id) {
        axios.delete(BASE_URL + ADMIN + id + "/" + DELETE, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }).then(
            getUsersList()
        ).catch(
            (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    function handleUserRights(id) {
        axios.get(BASE_URL + ADMIN + id + "/" + RIGHTS, {
            headers: {
                'Authorization': `Bearer ${auth.token}`,
                'Content-Type': 'text/plain'
            }
        }).then(
            getUsersList()
        ).catch(
            (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    function handleUserRoles(e, id) {
        e.preventDefault();

        axios.patch(BASE_URL + ADMIN + id + "/" + ROLE, role, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }).then(
            getUsersList()
        ).catch(
            (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }
    

     const handleChange = (e) => {
        const { name, value } = e.target;
        setRoles(prev => ({
            ...prev,
            [name]: value
        }));
    };
 
    const getRoleName = (role) => {
        const roles = {
            'ROLE_USER': 'Пользователь',
            'ROLE_ADMIN': 'Администратор',
            'ROLE_MENTOR': 'Наставник'
        };
        return roles[role] || role;
    };

    const getDepartmentName = (department) => {
        const departments = {
            'MINSK': 'Минск',
            'VITEBSK': 'Витебск',
            'BREST': 'Брест',
            'GOMEL': 'Гомель',
            'GRODNO': 'Гродно'
        };
        return departments[department] || department;
    };

    useEffect(() => {
        getUsersList();
    }, []);

    return (
        <div className="user-container">
            {users.map(user => (
                <div key={user.id} className="user-card">
                    <h3>
                        <span className="user-name">{user.firstname} {user.lastname}</span>
                    </h3>
                    
                    <p className="user-tags">
                        <span className="department-tag">
                            {getDepartmentName(user.department)}
                        </span>
                        
                        <span className={`enabled-tag ${user.isEnabled ? 'active' : 'inactive'}`}>
                            {user.isEnabled ? 'Активен' : 'Заблокирован'}
                        </span>
                        
                        <span className={`role-tag ${user.role.toLowerCase()}`}>
                            {getRoleName(user.role)}
                        </span>
                    </p>

                    <div className="user-actions" onClick={(e) => handleUserRoles(e, user.id)}>

                        <button 
                            type="button" 
                            className={`delete-btn ${user.isEnabled ? 'block-btn' : 'unblock-btn'}`}
                            onClick={() => handleUserRights(user.id)}
                        >
                            {user.isEnabled ? 'Заблокировать' : 'Разблокировать'}
                        </button>

                        <button 
                            type="button" 
                            className="delete-btn delete-user-btn"
                            onClick={() => handleUserDelete(user.id)}
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            ))}

                <div className="text-center">
                    <p><a href="/register" >Зарегистрировать пользователя</a></p>
                </div>
        </div>
    )

}

export default AdminPage;