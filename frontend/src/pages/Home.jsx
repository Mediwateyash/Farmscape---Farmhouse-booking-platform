import { useState, useEffect } from 'react';
import axios from 'axios';
import FarmhouseCard from '../components/FarmhouseCard';
import './Home.css';

const Home = () => {
    const [farmhouses, setFarmhouses] = useState([]);
    const [filteredFarmhouses, setFilteredFarmhouses] = useState([]);
    const [search, setSearch] = useState('');
    const [locationFilter, setLocationFilter] = useState('');

    useEffect(() => {
        const fetchFarmhouses = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/farmhouses');
                setFarmhouses(data);
                setFilteredFarmhouses(data);
            } catch (error) {
                console.error('Error fetching farmhouses:', error);
            }
        };
        fetchFarmhouses();
    }, []);

    useEffect(() => {
        let result = farmhouses;

        if (search) {
            result = result.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (locationFilter) {
            result = result.filter(f => f.location.toLowerCase().includes(locationFilter.toLowerCase()));
        }

        setFilteredFarmhouses(result);
    }, [search, locationFilter, farmhouses]);

    return (
        <div className="home-container">
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter by location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                />
            </div>
            <div className="farmhouse-grid">
                {filteredFarmhouses.map(farmhouse => (
                    <FarmhouseCard key={farmhouse._id} farmhouse={farmhouse} />
                ))}
            </div>
        </div>
    );
};

export default Home;
