import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Header(props) {
    
    const { auth } = useContext(AuthContext);

    return (
        <header>
            <div className='header-content'>
                <h1 id='header-name'>LSystem</h1>
            </div>
            
                <Link to={`/admin`} className="admin-link">
                    Управление        
                </Link>

        </header>
    );
}

export default Header;


            {/* <Link to={`/profile`} className="profile-link">
                Профиль        
            </Link> */}