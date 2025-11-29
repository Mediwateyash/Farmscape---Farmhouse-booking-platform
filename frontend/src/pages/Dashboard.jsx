import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API_URL from '../config';
import AuthContext from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const [bookings, setBookings] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/bookings/mybookings/${user._id}`);
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };
        if (user) {
            fetchBookings();
        }
    }, [user]);

    return (
        <div className="dashboard-container">
            <h1>My Dashboard</h1>
            <div className="profile-section">
                <h2>Profile</h2>
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
            </div>

            <div className="bookings-section">
                <h2>My Bookings</h2>
                {bookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    <table className="bookings-table">
                        <thead>
                            <tr>
                                <th>Farmhouse</th>
                                <th>Date</th>
                                <th>Guests</th>
                                <th>Total Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking._id}>
                                    <td>{booking.farmhouse?.name}</td>
                                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                                    <td>{booking.guests}</td>
                                    <td>₹{booking.totalPrice}</td>
                                    <td className={`status ${booking.status.toLowerCase()}`}>{booking.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
