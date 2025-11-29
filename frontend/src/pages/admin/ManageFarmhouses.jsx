import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config';
import './ManageFarmhouses.css';

const ManageFarmhouses = () => {
    const [farmhouses, setFarmhouses] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price: '',
        description: '',
        amenities: '',
    });
    const [images, setImages] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchFarmhouses();
    }, []);

    const fetchFarmhouses = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/farmhouses`);
            setFarmhouses(data);
        } catch (error) {
            console.error('Error fetching farmhouses:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`${API_URL}/api/farmhouses/${id}`);
                fetchFarmhouses();
            } catch (error) {
                console.error('Error deleting farmhouse:', error);
            }
        }
    };

    const handleEdit = (farmhouse) => {
        setEditingId(farmhouse._id);
        setFormData({
            name: farmhouse.name,
            location: farmhouse.location,
            price: farmhouse.price,
            description: farmhouse.description,
            amenities: farmhouse.amenities.join(', '),
        });
        window.scrollTo(0, 0);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({
            name: '',
            location: '',
            price: '',
            description: '',
            amenities: '',
        });
        setImages([]);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('location', formData.location);
        data.append('price', formData.price);
        data.append('description', formData.description);
        data.append('amenities', formData.amenities);

        for (let i = 0; i < images.length; i++) {
            data.append('images', images[i]);
        }

        try {
            if (editingId) {
                await axios.put(`${API_URL}/api/farmhouses/${editingId}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                alert('Farmhouse updated successfully!');
            } else {
                await axios.post(`${API_URL}/api/farmhouses`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                alert('Farmhouse added successfully!');
            }

            fetchFarmhouses();
            handleCancelEdit();
        } catch (error) {
            console.error('Error saving farmhouse:', error);
            alert('Failed to save farmhouse');
        }
    };

    return (
        <div className="manage-container">
            <h1>Manage Farmhouses</h1>

            <div className="add-farmhouse-form">
                <h2>{editingId ? 'Edit Farmhouse' : 'Add New Farmhouse'}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
                    <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} required />
                    <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required />
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
                    <input type="text" name="amenities" placeholder="Amenities (comma separated)" value={formData.amenities} onChange={handleInputChange} required />
                    <input type="file" multiple onChange={handleFileChange} />
                    <div className="form-actions">
                        <button type="submit">{editingId ? 'Update Farmhouse' : 'Add Farmhouse'}</button>
                        {editingId && <button type="button" onClick={handleCancelEdit} className="btn-cancel">Cancel</button>}
                    </div>
                </form>
            </div>

            <div className="farmhouse-list">
                <h2>Existing Farmhouses</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {farmhouses.map(farmhouse => (
                            <tr key={farmhouse._id}>
                                <td>{farmhouse.name}</td>
                                <td>{farmhouse.location}</td>
                                <td>₹{farmhouse.price}</td>
                                <td>
                                    <button onClick={() => handleEdit(farmhouse)} className="btn-edit" style={{ marginRight: '10px', backgroundColor: '#f39c12' }}>Edit</button>
                                    <button onClick={() => handleDelete(farmhouse._id)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageFarmhouses;
