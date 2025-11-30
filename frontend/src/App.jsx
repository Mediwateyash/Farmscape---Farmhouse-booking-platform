import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmhouseDetails from './pages/FarmhouseDetails';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageFarmhouses from './pages/admin/ManageFarmhouses';
import ManageBookings from './pages/admin/ManageBookings';
import AdminLogin from './pages/AdminLogin';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/farmhouse/:id" element={<FarmhouseDetails />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/farmhouses" element={<ManageFarmhouses />} />
                    <Route path="/admin/bookings" element={<ManageBookings />} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
