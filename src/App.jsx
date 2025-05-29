import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import BookingForm from './Pages/BookingForm';
import ProviderLogin from './Pages/Providers/ProviderLogin';
import ProviderDashboard from './Pages/Providers/ProviderDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/provider/login" element={<ProviderLogin />} />
        <Route path="/provider/dashboard" element={<ProviderDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




