import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import './Auth.css'; // Reusing the auth styles

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/admin/login', { email, password });
            login(data);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Admin login failed');
        }
    };

    return (
        <div className="auth-container">
            <h2 style={{ color: '#e74c3c' }}>Admin Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Admin Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" style={{ backgroundColor: '#e74c3c' }}>Login as Admin</button>
            </form>
        </div>
    );
};

export default AdminLogin;
