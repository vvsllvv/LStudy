import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import RestrictView, { ROLES } from '../Role';

function Header(props) {
    
    const { auth } = useContext(AuthContext);

    return (
        <header>
            <div className='header-content'>
                <h1 id='header-name'>LSystem</h1>
            </div>
            
                    
            <RestrictView allowedRoles={[ROLES.ADMIN, ROLES.MENTOR]} userRole={auth.role}>
                <Link to={`/admin`} className="admin-link">
                    Управление        
                </Link>
            </RestrictView>

        </header>
    );
}

export default Header;


            {/* <Link to={`/profile`} className="profile-link">
                Профиль        
            </Link> */}