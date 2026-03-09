import { Link } from 'react-router-dom';

function Header(props) {

    return (
        <header>
            <div className='header-content'>
                <h1 id='header-name'>LSystem</h1>
            </div>
            {/* 
            <Link to={`/profile`} className="profile-link">
                Профиль        
            </Link>

            <Link to={`/admin`} className="admin-link">
                Управление        
            </Link> */}
        </header>
    );
}

export default Header;