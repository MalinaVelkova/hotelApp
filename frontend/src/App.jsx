import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login'; // Import the Login component
import ForgotPassword from './pages/ForgotPassword'; // Import the ForgotPassword component

const App = () => {
  return (
    <Router>
      
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<RestaurantMenu />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/:typeOfRoom" element={<RoomDetails />} />
        <Route path="/:typeOfRoom/booking" element={<Booking />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};
export default App;