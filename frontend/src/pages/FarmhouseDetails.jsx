import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import AuthContext from '../context/AuthContext';
import './FarmhouseDetails.css';

const FarmhouseDetails = () => {
    const { id } = useParams();
    const [farmhouse, setFarmhouse] = useState(null);
    const [date, setDate] = useState('');
    const [guests, setGuests] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFarmhouse = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/farmhouses/${id}`);
                setFarmhouse(data);
            } catch (error) {
                console.error('Error fetching farmhouse:', error);
            }
        };
        fetchFarmhouse();
    }, [id]);

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to book');
            navigate('/login');
            return;
        }

        const totalPrice = farmhouse.price * guests; // Simplified calculation

        try {
            await axios.post(`${API_URL}/api/bookings`, {
                user: user._id,
                farmhouse: farmhouse._id,
                date,
                guests,
                totalPrice,
                phoneNumber,
            });
            alert('Booking request sent!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Booking failed');
        }
    };

    if (!farmhouse) return <div>Loading...</div>;

    return (
        <div className="details-container">
            <div className="details-header">
                <h1>{farmhouse.name}</h1>
                <p className="location">{farmhouse.location}</p>
            </div>

            <div className="images-grid">
                {farmhouse.images.map((img, index) => (
                    <img
                        key={index}
                        src={img.startsWith('http') ? img : `${API_URL}/${img}`}
                        alt={farmhouse.name}
                    />
                ))}
            </div>

            <div className="details-content">
                <div className="info">
                    <h2>Description</h2>
                    <p>{farmhouse.description}</p>
                    <h3>Amenities</h3>
                    <ul>
                        {farmhouse.amenities.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        ))}
                    </ul>
                    <h2 className="price">₹{farmhouse.price} / day</h2>
                </div>

                <div className="booking-form">
                    <h3>Book Now</h3>
                    <form onSubmit={handleBooking}>
                        <label>Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                        <label>Guests</label>
                        <input
                            type="number"
                            min="1"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            required
                        />
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                        <div className="total-price">
                            Total: ₹{farmhouse.price * guests}
                        </div>
                        {user ? (
                            <button type="submit">Confirm Booking</button>
                        ) : (
                            <button type="button" onClick={() => navigate('/login')} style={{ backgroundColor: '#e74c3c' }}>
                                Login to Book
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FarmhouseDetails;
