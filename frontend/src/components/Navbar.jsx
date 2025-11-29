import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './Navbar.css'; // We will create this later or use inline styles

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">FarmScape</Link>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                {user ? (
                    <>
                        {user.role === 'admin' ? (
                            <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
                        ) : (
                            <li><Link to="/dashboard">My Dashboard</Link></li>
                        )}
                        <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
