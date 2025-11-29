import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config';
import './ManageBookings.css';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/bookings`);
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await axios.put(`${API_URL}/api/bookings/${id}/status`, { status });
            fetchBookings();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="manage-bookings-container">
            <h1>Manage Bookings</h1>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Farmhouse</th>
                        <th>Date</th>
                        <th>Guests</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking._id}>
                            <td>{booking.user?.name} ({booking.user?.email})</td>
                            <td>{booking.farmhouse?.name}</td>
                            <td>{new Date(booking.date).toLocaleDateString()}</td>
                            <td>{booking.guests}</td>
                            <td>₹{booking.totalPrice}</td>
                            <td className={`status ${booking.status.toLowerCase()}`}>{booking.status}</td>
                            <td>
                                {booking.status === 'Pending' && (
                                    <>
                                        <button onClick={() => handleStatusChange(booking._id, 'Approved')} className="btn-approve">Approve</button>
                                        <button onClick={() => handleStatusChange(booking._id, 'Rejected')} className="btn-reject">Reject</button>
                                    </>
                                )}
                                {booking.status === 'Approved' && (
                                    <button onClick={() => handleStatusChange(booking._id, 'Rejected')} className="btn-reject">Reject</button>
                                )}
                                {booking.status === 'Rejected' && (
                                    <button onClick={() => handleStatusChange(booking._id, 'Approved')} className="btn-approve">Approve</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageBookings;
