import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        bookings: 0,
        farmhouses: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const usersRes = await axios.get('http://localhost:5000/api/users');
                const bookingsRes = await axios.get('http://localhost:5000/api/bookings');
                const farmhousesRes = await axios.get('http://localhost:5000/api/farmhouses');

                setStats({
                    users: usersRes.data.length,
                    bookings: bookingsRes.data.length,
                    farmhouses: farmhousesRes.data.length
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p>{stats.users}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Bookings</h3>
                    <p>{stats.bookings}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Farmhouses</h3>
                    <p>{stats.farmhouses}</p>
                </div>
            </div>

            <div className="admin-actions">
                <Link to="/admin/farmhouses" className="btn-admin">Manage Farmhouses</Link>
                <Link to="/admin/bookings" className="btn-admin">Manage Bookings</Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
