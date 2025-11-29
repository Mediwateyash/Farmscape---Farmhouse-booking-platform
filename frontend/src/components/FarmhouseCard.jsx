import { Link } from 'react-router-dom';
import API_URL from '../config';
import './FarmhouseCard.css';

const FarmhouseCard = ({ farmhouse }) => {
    return (
        <div className="farmhouse-card">
            <img
                src={farmhouse.images[0]?.startsWith('http') ? farmhouse.images[0] : `${API_URL}/${farmhouse.images[0]}`}
                alt={farmhouse.name}
                className="card-image"
            />
            <div className="card-content">
                <h3>{farmhouse.name}</h3>
                <p className="location">{farmhouse.location}</p>
                <p className="price">₹{farmhouse.price} / day</p>
                <Link to={`/farmhouse/${farmhouse._id}`} className="btn-details">View Details</Link>
            </div>
        </div>
    );
};

export default FarmhouseCard;
